import * as THREE from "three/webgpu";
import {
  attribute,
  color,
  float,
  instancedBufferAttribute,
  mix,
  positionLocal,
  shapeCircle,
  smoothstep,
  time,
  uniform,
  vec3
} from "three/tsl";
import { chooseMenuQuality } from "./menu-scene-recipe.js";
import { createFlowerAtlas, createPalmFrondAtlas } from "./menu-textures.js";

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const rng = (seed) => () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296);

function sky(recipe) {
  const material = new THREE.MeshBasicNodeMaterial({ side: THREE.BackSide, depthWrite: false, fog: false });
  const h = positionLocal.normalize().y.mul(0.5).add(0.5);
  const lower = mix(color(recipe.lower), color(recipe.horizon), smoothstep(0.02, 0.44, h));
  const band = smoothstep(0.08, 0.3, h).mul(float(1).sub(smoothstep(0.46, 0.7, h)));
  const middle = mix(mix(lower, color(recipe.sunsetBand), band.mul(0.58)), color(recipe.upper), smoothstep(0.34, 0.76, h));
  material.colorNode = mix(middle, color(recipe.zenith), smoothstep(0.7, 1, h));
  const mesh = new THREE.Mesh(new THREE.SphereGeometry(48, 40, 20), material);
  mesh.name = "menu-sky";
  mesh.frustumCulled = false;
  mesh.renderOrder = -30;
  return mesh;
}

function sun(recipe) {
  const group = new THREE.Group();
  group.name = "menu-sunset-sun";
  const glowMaterial = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false
  });
  glowMaterial.colorNode = color(recipe.sunGlow).mul(1.85);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(recipe.glowRadius, 40), glowMaterial);
  glow.position.set(...recipe.sunPosition);
  group.add(glow);
  const discMaterial = new THREE.MeshBasicNodeMaterial({ depthWrite: false, side: THREE.DoubleSide, fog: false });
  discMaterial.colorNode = color(recipe.sunColor).mul(1.28);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(recipe.sunRadius, 40), discMaterial);
  disc.position.set(...recipe.sunPosition);
  disc.position.z += 0.06;
  group.add(disc);
  return group;
}

function stripGeometry(width, depth, segments, curve = 0) {
  const positions = [];
  const indices = [];
  for (let i = 0; i <= segments; i += 1) {
    const t = i / segments;
    const x = (t - 0.5) * width;
    const front = Math.sin((t - 0.5) * Math.PI) * curve + Math.sin(t * Math.PI * 7.5) * 0.035;
    positions.push(x, 0, front, x, 0, front - depth);
  }
  for (let i = 0; i < segments; i += 1) {
    const o = i * 2;
    indices.push(o, o + 1, o + 2, o + 1, o + 3, o + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  return geometry;
}

function horizon(recipe, quality) {
  const group = new THREE.Group();
  group.name = "menu-deep-horizon";
  for (const layer of recipe.layers) {
    const geometry = stripGeometry(layer.width, layer.depth, quality.horizonSegments, layer.amplitude);
    const material = new THREE.MeshBasicNodeMaterial({
      color: layer.color,
      transparent: true,
      opacity: layer.opacity,
      depthWrite: false,
      fog: true,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = `menu-horizon-${layer.id}`;
    mesh.position.set(0, layer.y, layer.z);
    group.add(mesh);
  }
  return group;
}

function shoreline(recipe) {
  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: recipe.opacity,
    depthWrite: false,
    fog: true,
    side: THREE.DoubleSide
  });
  material.colorNode = mix(
    color(recipe.highlight),
    color(recipe.color),
    positionLocal.z.add(recipe.depth).div(recipe.depth).clamp(0, 1)
  );
  const mesh = new THREE.Mesh(stripGeometry(recipe.width, recipe.depth, recipe.segments, recipe.curvature), material);
  mesh.name = "menu-distant-shoreline";
  mesh.position.set(...recipe.position);
  return mesh;
}

function water(recipe, quality) {
  const group = new THREE.Group();
  group.name = "menu-water-composition";
  const [sx, sz] = quality.waterSegments;
  const geometry = new THREE.PlaneGeometry(recipe.width, recipe.depth, sx, sz);
  geometry.rotateX(-Math.PI * 0.5);
  const material = new THREE.MeshPhysicalNodeMaterial({
    roughness: recipe.roughness,
    clearcoat: recipe.clearcoat,
    clearcoatRoughness: 0.34,
    ior: 1.333,
    transparent: false,
    depthWrite: true
  });
  const wave = positionLocal.x.mul(recipe.waveA.frequency).add(time.mul(recipe.waveA.speed)).sin().mul(recipe.waveA.amplitude)
    .add(positionLocal.z.mul(recipe.waveB.frequency).add(time.mul(recipe.waveB.speed)).sin().mul(recipe.waveB.amplitude));
  material.positionNode = positionLocal.add(vec3(0, wave, 0));
  material.colorNode = mix(
    color(recipe.nearColor),
    color(recipe.farColor),
    positionLocal.z.add(recipe.depth * 0.5).div(recipe.depth).clamp(0, 1)
  ).add(color(recipe.highlightColor).mul(wave.max(0).mul(1.5)));
  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "menu-water-strip";
  mesh.position.set(...recipe.position);
  group.add(mesh);

  const foamMaterial = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: recipe.foam.opacity,
    depthWrite: false,
    fog: true,
    side: THREE.DoubleSide
  });
  foamMaterial.positionNode = positionLocal.add(vec3(0, positionLocal.x.mul(0.72).add(time.mul(0.22)).sin().mul(0.03), 0));
  foamMaterial.colorNode = color("#fff5d6").mul(1.06);
  const foam = new THREE.Mesh(stripGeometry(recipe.foam.width, recipe.foam.depth, Math.max(24, sx), 0.32), foamMaterial);
  foam.name = "menu-cozy-wave-foam";
  foam.position.set(...recipe.foam.position);
  group.add(foam);
  return group;
}

function frondGeometry(recipe) {
  const positions = [];
  const uvs = [];
  const indices = [];
  const along = [];
  const phases = [];
  for (let frond = 0; frond < recipe.count; frond += 1) {
    const length = recipe.length + (frond % 3) * 0.18;
    const width = recipe.width + (frond % 2) * 0.12;
    const droop = recipe.droop + (frond % 3) * 0.075;
    const angle = frond / recipe.count * Math.PI * 2;
    const matrix = new THREE.Matrix4().makeRotationFromEuler(
      new THREE.Euler(-0.18 + (frond % 3) * 0.075, angle, -0.04 + Math.sin(angle) * 0.07)
    );
    const base = positions.length / 3;
    for (let segment = 0; segment <= recipe.cardSegments; segment += 1) {
      const t = segment / recipe.cardSegments;
      const x = length * t;
      const y = -droop * t * t;
      const center = Math.sin(t * Math.PI) * 0.085;
      const half = width * (0.18 + Math.sin(Math.PI * t) * 0.82) * 0.5;
      const u = ((frond % recipe.variants) + t) / recipe.variants;
      for (const z of [center - half, center + half]) {
        const point = new THREE.Vector3(x, y, z).applyMatrix4(matrix);
        positions.push(point.x, point.y, point.z);
        along.push(t);
        phases.push(frond * 0.83);
      }
      uvs.push(u, 0, u, 1);
    }
    for (let segment = 0; segment < recipe.cardSegments; segment += 1) {
      const o = base + segment * 2;
      indices.push(o, o + 2, o + 1, o + 1, o + 2, o + 3);
    }
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute("frondAlong", new THREE.Float32BufferAttribute(along, 1));
  geometry.setAttribute("frondPhase", new THREE.Float32BufferAttribute(phases, 1));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function palm(recipe, atlas, windBoost, reducedMotion) {
  const group = new THREE.Group();
  group.name = "menu-hero-palm";
  group.position.set(...recipe.position);
  group.rotation.set(...recipe.rotation);
  group.scale.setScalar(recipe.scale);
  const curve = new THREE.CatmullRomCurve3(recipe.trunkPoints.map((p) => new THREE.Vector3(...p)));

  const trunkMaterial = new THREE.MeshStandardNodeMaterial({ roughness: 0.9 });
  const height = positionLocal.y.div(4.6).clamp(0, 1);
  const rings = positionLocal.y.mul(10.5).add(positionLocal.x.mul(3.4)).sin().mul(0.5).add(0.5);
  trunkMaterial.colorNode = mix(color("#5d3825"), color("#ad7547"), rings.mul(0.48).add(height.mul(0.22)));
  const sway = time.mul(0.31).sin().mul(height.pow(2)).mul(reducedMotion ? 0 : 0.021).mul(windBoost);
  trunkMaterial.positionNode = positionLocal.add(vec3(sway, 0, sway.mul(0.2)));
  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(curve, recipe.trunkSegments, recipe.trunkRadius, recipe.radialSegments, false),
    trunkMaterial
  );
  trunk.name = "menu-palm-trunk";
  group.add(trunk);

  const crown = new THREE.Group();
  crown.name = "menu-palm-crown";
  crown.position.copy(curve.getPoint(1));
  group.add(crown);
  const hub = new THREE.Mesh(
    new THREE.SphereGeometry(recipe.hubRadius, 16, 10),
    new THREE.MeshStandardNodeMaterial({ color: "#6e4b36", roughness: 0.88 })
  );
  hub.name = "menu-palm-crown-hub";
  hub.scale.set(1.08, 0.74, 1);
  crown.add(hub);

  const frondMaterial = new THREE.MeshPhysicalNodeMaterial({
    map: atlas,
    alphaTest: recipe.fronds.alphaTest,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true,
    roughness: 0.64,
    clearcoat: 0.03,
    alphaToCoverage: true
  });
  const along = attribute("frondAlong");
  const phase = attribute("frondPhase");
  const gust = time.mul(0.46).add(phase).sin()
    .add(time.mul(0.17).add(phase.mul(1.37)).sin().mul(0.28))
    .mul(reducedMotion ? 0 : recipe.fronds.windStrength)
    .mul(along.pow(1.55))
    .mul(windBoost);
  frondMaterial.positionNode = positionLocal.add(vec3(gust.mul(0.04), gust.mul(0.075), gust.mul(0.29)));
  const fronds = new THREE.Mesh(frondGeometry(recipe.fronds), frondMaterial);
  fronds.name = "menu-palm-frond-batch";
  crown.add(fronds);

  const shadow = new THREE.Mesh(
    new THREE.CircleGeometry(0.82, 28),
    new THREE.MeshBasicNodeMaterial({ color: "#31554a", transparent: true, opacity: 0.14, depthWrite: false })
  );
  shadow.name = "menu-palm-contact-shadow";
  shadow.rotation.x = -Math.PI * 0.5;
  shadow.position.set(0.03, 0.01, 0.02);
  shadow.scale.set(1.45, 0.72, 1);
  group.add(shadow);
  return group;
}

function flowers(recipe, texture) {
  const positions = [];
  const uvs = [];
  const indices = [];
  for (const [index, cluster] of recipe.clusters.entries()) {
    const w = 1.125 * cluster.scale;
    const h = 0.46 * cluster.scale;
    const matrix = new THREE.Matrix4().makeRotationY(cluster.rotationY).setPosition(new THREE.Vector3(...cluster.position));
    const base = positions.length / 3;
    for (const corner of [[-w, -h, 0], [w, -h, 0], [-w, h, 0], [w, h, 0]]) {
      const p = new THREE.Vector3(...corner).applyMatrix4(matrix);
      positions.push(p.x, p.y, p.z);
    }
    const a = cluster.variant / 4;
    const b = (cluster.variant + 1) / 4;
    uvs.push(a, 0, b, 0, a, 1, b, 1);
    indices.push(base, base + 1, base + 2, base + 1, base + 3, base + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  const mesh = new THREE.Mesh(
    geometry,
    new THREE.MeshBasicNodeMaterial({ map: texture, alphaTest: 0.04, transparent: true, opacity: recipe.opacity, depthWrite: false, side: THREE.DoubleSide, fog: true })
  );
  mesh.name = "menu-flower-batch";
  return mesh;
}

function particles(recipe, counts, windBoost) {
  const random = rng(0x5f3759df);
  const total = counts.wind + counts.sparkles + counts.petals;
  const positions = new Float32Array(total * 3);
  const colors = new Float32Array(total * 3);
  const phases = new Float32Array(total);
  const speeds = new Float32Array(total);
  const sizes = new Float32Array(total);
  const opacities = new Float32Array(total);
  const motions = new Float32Array(total * 3);
  let cursor = 0;
  const add = (layer, count) => {
    for (let i = 0; i < count; i += 1, cursor += 1) {
      const o = cursor * 3;
      positions[o] = THREE.MathUtils.lerp(...layer.bounds.x, random());
      positions[o + 1] = THREE.MathUtils.lerp(...layer.bounds.y, random());
      positions[o + 2] = THREE.MathUtils.lerp(...layer.bounds.z, random());
      const tint = new THREE.Color(layer.colors[Math.floor(random() * layer.colors.length)]);
      colors.set([tint.r, tint.g, tint.b], o);
      phases[cursor] = random() * Math.PI * 2;
      speeds[cursor] = THREE.MathUtils.lerp(...layer.speed, random());
      sizes[cursor] = THREE.MathUtils.lerp(...layer.size, random());
      opacities[cursor] = THREE.MathUtils.lerp(...layer.opacity, random());
      motions.set(layer.motion, o);
    }
  };
  add(recipe.wind, counts.wind);
  add(recipe.sparkles, counts.sparkles);
  add(recipe.petals, counts.petals);

  const pos = instancedBufferAttribute(new THREE.InstancedBufferAttribute(positions, 3));
  const tint = instancedBufferAttribute(new THREE.InstancedBufferAttribute(colors, 3));
  const phase = instancedBufferAttribute(new THREE.InstancedBufferAttribute(phases, 1));
  const speed = instancedBufferAttribute(new THREE.InstancedBufferAttribute(speeds, 1));
  const size = instancedBufferAttribute(new THREE.InstancedBufferAttribute(sizes, 1));
  const opacity = instancedBufferAttribute(new THREE.InstancedBufferAttribute(opacities, 1));
  const motion = instancedBufferAttribute(new THREE.InstancedBufferAttribute(motions, 3));
  const drift = time.mul(speed).mul(windBoost).add(phase);
  const offset = vec3(
    drift.sin().mul(motion.x).add(drift.mul(0.37).sin().mul(motion.x.mul(0.35))),
    drift.mul(0.61).sin().mul(motion.y),
    drift.mul(0.29).cos().mul(motion.z)
  );
  const material = new THREE.PointsNodeMaterial({
    colorNode: tint,
    opacityNode: shapeCircle().mul(opacity).mul(drift.mul(0.72).sin().mul(0.18).add(0.82)),
    positionNode: pos.add(offset),
    sizeNode: size,
    sizeAttenuation: false,
    transparent: true,
    depthWrite: false,
    alphaToCoverage: true
  });
  const sprite = new THREE.Sprite(material);
  sprite.name = "menu-atmosphere-particles";
  sprite.count = total;
  return sprite;
}

function lighting(scene, recipe) {
  scene.add(new THREE.HemisphereLight(recipe.hemisphere.sky, recipe.hemisphere.ground, recipe.hemisphere.intensity));
  for (const light of [recipe.sun, recipe.fill, recipe.rim]) {
    const directional = new THREE.DirectionalLight(light.color, light.intensity);
    directional.position.set(...light.position);
    scene.add(directional);
  }
}

export async function createMenuThreeRenderer({ canvas, recipe, reducedMotion = false }) {
  if (!canvas) throw new Error("Missing menu canvas.");
  const renderer = new THREE.WebGPURenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
  await renderer.init();
  const backend = renderer.backend?.isWebGPUBackend ? "webgpu" : "webgl2";
  const quality = chooseMenuQuality({ backend, width: innerWidth, height: innerHeight, devicePixelRatio, hardwareConcurrency: navigator.hardwareConcurrency ?? 4 });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = recipe.post.exposure;
  renderer.shadowMap.enabled = false;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(recipe.sky.background);
  scene.fog = new THREE.Fog(recipe.horizon.fogColor, recipe.horizon.fogNear, recipe.horizon.fogFar);
  const camera = new THREE.PerspectiveCamera(recipe.camera.fov, 1, recipe.camera.near, recipe.camera.far);
  const basePosition = new THREE.Vector3(...recipe.camera.position);
  const baseTarget = new THREE.Vector3(...recipe.camera.target);
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const windBoost = uniform(1);
  let targetWindBoost = 1;
  let active = true;
  let disposed = false;
  let preloading = true;
  let interactionUntil = 0;
  let lastFrame = 0;
  let fps = quality.frameRate.preload;

  scene.add(sky(recipe.sky), sun(recipe.sky), horizon(recipe.horizon, quality), water(recipe.water, quality), shoreline(recipe.shoreline));
  const flowerAtlas = createFlowerAtlas();
  scene.add(flowers(recipe.flowers, flowerAtlas));
  lighting(scene, recipe.lighting);
  const frondAtlas = createPalmFrondAtlas({ variants: recipe.palm.fronds.variants });
  const heroPalm = palm(recipe.palm, frondAtlas, windBoost, reducedMotion);
  scene.add(heroPalm);
  const atmosphere = particles(recipe.particles, quality.particles, windBoost);
  scene.add(atmosphere);

  const resize = () => {
    const width = Math.max(1, innerWidth);
    const height = Math.max(1, innerHeight);
    const aspect = width / height;
    const profile = aspect < 0.82 ? recipe.camera.portrait : aspect > 1.45 && height < 700 ? recipe.camera.shortLandscape : null;
    basePosition.set(...(profile?.position ?? recipe.camera.position));
    baseTarget.set(...(profile?.target ?? recipe.camera.target));
    camera.fov = profile?.fov ?? recipe.camera.fov;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();
    heroPalm.position.set(...recipe.palm.position).add(new THREE.Vector3(...(profile?.palmOffset ?? [0, 0, 0])));
    heroPalm.scale.setScalar(recipe.palm.scale * (profile?.palmScale ?? 1));
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, preloading ? Math.min(1, quality.dprCap) : quality.dprCap));
    renderer.setSize(width, height, false);
  };

  const render = (now = performance.now()) => {
    if (!active || disposed) return;
    fps = now < interactionUntil ? quality.frameRate.interactive : preloading ? quality.frameRate.preload : quality.frameRate.idle;
    if (lastFrame && now - lastFrame < 1000 / fps) return;
    lastFrame = now;
    pointerCurrent.lerp(pointerTarget, recipe.interaction.pointerDamping);
    targetWindBoost = THREE.MathUtils.lerp(targetWindBoost, 1, recipe.interaction.windBoostDecay);
    windBoost.value = THREE.MathUtils.lerp(windBoost.value, targetWindBoost, recipe.interaction.pointerDamping);
    camera.position.lerp(basePosition.clone().add(new THREE.Vector3(pointerCurrent.x * recipe.camera.parallax[0], pointerCurrent.y * recipe.camera.parallax[1], 0)), 0.085);
    camera.lookAt(baseTarget.clone().add(new THREE.Vector3(pointerCurrent.x * recipe.camera.lookParallax[0], pointerCurrent.y * recipe.camera.lookParallax[1], 0)));
    renderer.render(scene, camera);
  };

  const wake = () => { interactionUntil = performance.now() + quality.frameRate.interactionMs; };
  const setPointer = (x, y, energy = 0) => {
    pointerTarget.set(clamp(x, -1, 1), clamp(y, -1, 1));
    if (energy > 0.01) wake();
    targetWindBoost = Math.max(targetWindBoost, THREE.MathUtils.lerp(1, recipe.interaction.pointerWindBoost, clamp(energy, 0, 1)));
  };
  const setFocus = (focused) => {
    if (!focused) return;
    wake();
    targetWindBoost = Math.max(targetWindBoost, recipe.interaction.hoverWindBoost);
  };
  const setPreloading = (value) => {
    preloading = Boolean(value);
    lastFrame = 0;
    resize();
  };
  const setActive = (value) => {
    active = Boolean(value);
    renderer.setAnimationLoop(active ? render : null);
    if (active) { lastFrame = 0; render(); }
  };
  const dispose = () => {
    if (disposed) return;
    disposed = true;
    renderer.setAnimationLoop(null);
    const geometries = new Set();
    const materials = new Set();
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      for (const material of Array.isArray(object.material) ? object.material : [object.material]) if (material) materials.add(material);
    });
    for (const geometry of geometries) geometry.dispose?.();
    for (const material of materials) material.dispose?.();
    frondAtlas.dispose();
    flowerAtlas.dispose();
    removeEventListener("resize", resize);
    renderer.dispose();
  };

  addEventListener("resize", resize);
  resize();
  camera.position.copy(basePosition);
  camera.lookAt(baseTarget);
  renderer.setAnimationLoop(render);

  return Object.freeze({
    renderer,
    scene,
    camera,
    palm: heroPalm,
    particles: atmosphere,
    backend,
    quality,
    setPointer,
    setFocus,
    setPreloading,
    setActive,
    resize,
    dispose,
    getState: () => ({
      recipeId: recipe.id,
      backend,
      quality: quality.tier,
      frondDrawCalls: 1,
      particleDrawCalls: 1,
      particleCounts: quality.particles,
      frameRate: fps,
      preloading,
      bloom: false,
      dynamicShadows: false
    })
  });
}
