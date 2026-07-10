import * as THREE from "three/webgpu";
import {
  Break,
  Fn,
  If,
  float,
  instanceIndex,
  mx_noise_vec3,
  screenCoordinate,
  smoothstep,
  texture3D,
  textureStore,
  time,
  uniform,
  vec3,
  vec4
} from "three/tsl";
import { RaymarchingBox } from "three/addons/tsl/utils/Raymarching.js";
import { bayer16 } from "three/addons/tsl/math/Bayer.js";
import { clamp01, fbm3D } from "./determinism.js";

function buildCpuVolume({ size, seed, kind, recipe }) {
  const data = new Uint8Array(size * size * size);
  let cursor = 0;
  for (let z = 0; z < size; z += 1) {
    for (let y = 0; y < size; y += 1) {
      for (let x = 0; x < size; x += 1) {
        const nx = x / (size - 1);
        const ny = y / (size - 1);
        const nz = z / (size - 1);
        const px = nx - 0.5;
        const py = ny - 0.5;
        const pz = nz - 0.5;
        const base = fbm3D(`${seed}:base`, nx * 3.2, ny * 3.2, nz * 3.2, { octaves: 4, amplitude: 0.56 });
        const detail = fbm3D(`${seed}:detail`, nx * 11.3, ny * 11.3, nz * 11.3, { octaves: 3, amplitude: 0.52 });
        let density;
        if (kind === "cloud") {
          const ellipsoid = clamp01(1 - Math.hypot(px / 0.52, py / 0.47, pz / 0.52));
          const bottom = clamp01(ny / 0.18);
          const top = clamp01((1 - ny) / 0.28);
          density = clamp01(ellipsoid * ellipsoid * (0.64 + base * 0.28 + detail * 0.12) * bottom * top);
        } else {
          const vertical = clamp01((1 - ny) * 1.42);
          density = clamp01((0.5 + base * 0.34 + detail * 0.16) * vertical);
        }
        data[cursor++] = Math.round(density * 255);
      }
    }
  }
  const texture = new THREE.Data3DTexture(data, size, size, size);
  texture.format = THREE.RedFormat;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.wrapS = kind === "fog" ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.wrapT = kind === "fog" ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.wrapR = kind === "fog" ? THREE.RepeatWrapping : THREE.ClampToEdgeWrapping;
  texture.unpackAlignment = 1;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;
  texture.name = `${kind}-density-cpu`;
  return texture;
}

function createComputeVolumeNode(storageTexture, size, kind) {
  const sizeFloat = float(size);
  const computeVolume = Fn(() => {
    const id = instanceIndex;
    const x = id.mod(size);
    const y = id.div(size).mod(size);
    const z = id.div(size * size);
    const coord = vec3(x, y, z);
    const uv = coord.div(sizeFloat);
    const centered = uv.sub(0.5);
    const base = mx_noise_vec3(coord.mul(kind === "cloud" ? 0.052 : 0.075)).x.mul(0.5).add(0.5);
    const detail = mx_noise_vec3(coord.mul(kind === "cloud" ? 0.145 : 0.19).add(vec3(17.3, 9.1, 4.7))).y.mul(0.5).add(0.5);
    let density;
    if (kind === "cloud") {
      const ellipsoid = float(1).sub(centered.div(vec3(0.52, 0.47, 0.52)).length()).max(0);
      const bottom = smoothstep(0.01, 0.2, uv.y);
      const top = float(1).sub(smoothstep(0.68, 1, uv.y));
      density = ellipsoid.mul(ellipsoid).mul(base.mul(0.72).add(detail.mul(0.28))).mul(bottom).mul(top);
    } else {
      const vertical = float(1).sub(uv.y).mul(1.42).clamp(0, 1);
      density = base.mul(0.68).add(detail.mul(0.32)).mul(vertical);
    }
    textureStore(storageTexture, vec3(x, y, z), vec4(vec3(density), 1));
  });
  return computeVolume().compute(size * size * size, [8, 8, 4]).setName(`compute-${kind}-density`);
}

export async function createAtmosphereVolumeTextures({ renderer, cloudRecipe, fogRecipe, backend = "webgpu" } = {}) {
  if (backend === "webgpu" && renderer) {
    const cloudSize = cloudRecipe.textureSize;
    const fogSize = fogRecipe.textureSize;
    const cloudTexture = new THREE.Storage3DTexture(cloudSize, cloudSize, cloudSize);
    cloudTexture.name = "cloud-density-compute";
    cloudTexture.generateMipmaps = false;
    const fogTexture = new THREE.Storage3DTexture(fogSize, fogSize, fogSize);
    fogTexture.name = "fog-density-compute";
    fogTexture.generateMipmaps = false;
    const cloudNode = createComputeVolumeNode(cloudTexture, cloudSize, "cloud");
    const fogNode = createComputeVolumeNode(fogTexture, fogSize, "fog");
    renderer.compute(cloudNode);
    renderer.compute(fogNode);
    return Object.freeze({ cloudTexture, fogTexture, source: "webgpu-storage3d-compute", cloudNode, fogNode });
  }

  const cloudTexture = buildCpuVolume({ size: cloudRecipe.textureSize, seed: cloudRecipe.seed, kind: "cloud", recipe: cloudRecipe });
  const fogTexture = buildCpuVolume({ size: fogRecipe.textureSize, seed: fogRecipe.seed, kind: "fog", recipe: fogRecipe });
  return Object.freeze({ cloudTexture, fogTexture, source: "cpu-fallback" });
}

function createCloudRaymarchMaterial({ densityTexture, recipe, lighting, stepsValue, opacityScale = 1 }) {
  const textureNode = texture3D(densityTexture, null, 0);
  const steps = uniform(stepsValue);
  const threshold = uniform(recipe.threshold);
  const softness = uniform(recipe.softness);
  const opacity = uniform(recipe.opacity * opacityScale);
  const earlyExit = uniform(0.965);
  const topColor = uniform(new THREE.Color(lighting.topColor));
  const midColor = uniform(new THREE.Color(lighting.midColor));
  const undersideColor = uniform(new THREE.Color(lighting.undersideColor));
  const liningColor = uniform(new THREE.Color(lighting.silverLiningColor));
  const shadowStrength = uniform(lighting.densityShadowStrength);

  const raymarch = Fn(() => {
    const finalColor = vec4(0).toVar();
    RaymarchingBox(steps, ({ positionRay }) => {
      const uv = positionRay.add(0.5);
      const base = float(textureNode.sample(uv).r).toVar();
      const detailUv = uv.mul(1.67).add(vec3(time.mul(0.0017), time.mul(0.00045), time.mul(0.0011))).mod(1);
      const detail = textureNode.sample(detailUv).r;
      const densitySource = base.mul(0.86).add(detail.mul(0.14));
      const density = smoothstep(threshold.sub(softness), threshold.add(softness), densitySource).mul(opacity).toVar();
      const sunSample = textureNode.sample(uv.add(vec3(-0.025, 0.045, -0.018)).clamp(0, 1)).r;
      const transmittance = float(1).sub(sunSample.mul(shadowStrength)).clamp(0.18, 1);
      const heightMix = smoothstep(0.05, 0.88, uv.y);
      const lowerToMid = undersideColor.mix(midColor, smoothstep(0.02, 0.54, uv.y));
      const cloudColor = lowerToMid.mix(topColor, heightMix).mul(transmittance).toVar();
      const edge = float(1).sub(base).clamp(0, 1).pow(2.4).mul(lighting.silverLining);
      cloudColor.addAssign(liningColor.mul(edge));
      finalColor.rgb.addAssign(finalColor.a.oneMinus().mul(density).mul(cloudColor));
      finalColor.a.addAssign(finalColor.a.oneMinus().mul(density));
      If(finalColor.a.greaterThanEqual(earlyExit), () => Break());
    });
    return finalColor;
  });

  const material = new THREE.NodeMaterial();
  material.colorNode = raymarch();
  material.transparent = true;
  material.side = THREE.BackSide;
  material.depthWrite = false;
  material.depthTest = true;
  material.fog = false;
  return { material, steps };
}

export function createVolumetricCloudRenderer({ densityTexture, recipe, lighting, lod, horizon } = {}) {
  const group = new THREE.Group();
  group.name = "volumetric-cloud-bank";
  group.renderOrder = -5;
  const hero = createCloudRaymarchMaterial({ densityTexture, recipe, lighting, stepsValue: lod.steps, opacityScale: 1 });
  const horizonMaterial = createCloudRaymarchMaterial({ densityTexture, recipe, lighting, stepsValue: Math.max(7, Math.round(lod.steps * 0.38)), opacityScale: 0.56 });
  const geometry = new THREE.BoxGeometry(1, 1, 1);

  const heroLobes = [
    { p: [-190, 240, -330], s: [390, 190, 230] },
    { p: [30, 280, -365], s: [430, 260, 250] },
    { p: [230, 238, -340], s: [320, 175, 210] },
    { p: [-35, 370, -395], s: [265, 205, 190] },
    { p: [345, 205, -430], s: [255, 135, 170] }
  ].slice(0, lod.heroVolumeCount);
  for (const [index, lobe] of heroLobes.entries()) {
    const mesh = new THREE.Mesh(geometry, hero.material);
    mesh.name = `hero-volumetric-cloud:${index}`;
    mesh.position.set(...lobe.p);
    mesh.scale.set(...lobe.s);
    mesh.frustumCulled = false;
    mesh.renderOrder = -4;
    group.add(mesh);
  }

  for (const [index, cloud] of (horizon?.clouds ?? []).slice(0, lod.horizonVolumeCount).entries()) {
    const mesh = new THREE.Mesh(geometry, horizonMaterial.material);
    mesh.name = `horizon-volumetric-cloud:${index}`;
    mesh.position.set(cloud.position.x, cloud.position.y, cloud.position.z);
    mesh.scale.set(cloud.scale.x, cloud.scale.y, cloud.scale.z);
    mesh.frustumCulled = false;
    mesh.renderOrder = -6;
    group.add(mesh);
  }

  function setStepScale(scale = 1) {
    hero.steps.value = Math.max(8, Math.round(lod.steps * scale));
    horizonMaterial.steps.value = Math.max(5, Math.round(lod.steps * 0.38 * scale));
  }
  return Object.freeze({
    group,
    setStepScale,
    getSteps() { return Math.round(hero.steps.value); }
  });
}

export function createRollingFogRenderer({ fogTexture, recipe, advection, placement, quality } = {}) {
  const layer = 10;
  const textureNode = texture3D(fogTexture, null, 0);
  const densityScale = uniform(recipe.densityScale);
  const threshold = uniform(recipe.threshold);
  const softness = uniform(recipe.softness);
  const wind = uniform(new THREE.Vector3(advection.direction.x, 0, advection.direction.z));
  const speed = uniform(advection.speed);
  const baseColor = uniform(new THREE.Color(0xb7d7cf));
  const warmColor = uniform(new THREE.Color(0xf1d1b1));
  const readabilityRadius = uniform(placement.islandReadabilityRadius);
  const readabilityFeather = uniform(placement.islandReadabilityFeather);

  const material = new THREE.VolumeNodeMaterial();
  material.steps = Math.max(4, Math.round(quality.fogSteps));
  material.offsetNode = bayer16(screenCoordinate);
  material.scatteringNode = Fn(({ positionRay }) => {
    const offset = wind.mul(time.mul(speed));
    const uvA = positionRay.mul(vec3(0.0065, 0.021, 0.0065)).add(offset).mod(1);
    const uvB = positionRay.mul(vec3(0.015, 0.034, 0.015)).add(offset.mul(-0.42)).add(vec3(0.17, 0.31, 0.23)).mod(1);
    const noiseA = textureNode.sample(uvA).r;
    const noiseB = textureNode.sample(uvB).r;
    const noise = noiseA.mul(0.72).add(noiseB.mul(0.28));
    const shaped = smoothstep(threshold.sub(softness), threshold.add(softness), noise);
    const heightBottom = smoothstep(placement.bottomHeight, placement.bottomHeight + 18, positionRay.y);
    const heightTop = float(1).sub(smoothstep(placement.topHeight * 0.52, placement.topHeight, positionRay.y));
    const radial = positionRay.xz.length();
    const islandMask = smoothstep(readabilityRadius, readabilityRadius.add(readabilityFeather), radial);
    const readability = float(0.34).add(islandMask.mul(0.66));
    return shaped.mul(heightBottom).mul(heightTop).mul(readability).mul(densityScale);
  });
  material.scatteringEmissiveNode = Fn(({ positionRay }) => {
    const warmMix = smoothstep(12, 58, positionRay.y);
    return baseColor.mix(warmColor, warmMix).mul(0.13);
  });

  const mesh = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), material);
  mesh.name = "rolling-volumetric-fog";
  mesh.position.set(placement.position.x, placement.position.y, placement.position.z);
  mesh.scale.set(placement.scale.x, placement.scale.y, placement.scale.z);
  mesh.receiveShadow = true;
  mesh.layers.disableAll();
  mesh.layers.enable(layer);
  mesh.frustumCulled = false;

  const group = new THREE.Group();
  group.name = "rolling-fog-volume-group";
  group.add(mesh);
  function setStepScale(scale = 1) {
    material.steps = Math.max(4, Math.round(quality.fogSteps * scale));
    material.needsUpdate = true;
  }
  return Object.freeze({
    group,
    mesh,
    material,
    layer,
    setStepScale,
    getSteps() { return material.steps; }
  });
}
