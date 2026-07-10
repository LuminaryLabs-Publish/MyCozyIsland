import * as THREE from "three/webgpu";
import { createStylizedWorldRenderer as createBaseStylizedWorldRenderer } from "./renderer-world.js";

const GRASS_LAYER_COUNT = 3;
const GRASS_ALPHA_CLIP = 0.52;
const GRASS_LAYER_COLORS = Object.freeze([
  new THREE.Color("#4f963f"),
  new THREE.Color("#69b84f"),
  new THREE.Color("#84ca63")
]);

function hash01(value) {
  let hash = (value | 0) ^ 0x9e3779b9;
  hash = Math.imul(hash ^ (hash >>> 16), 0x21f0aaad);
  hash = Math.imul(hash ^ (hash >>> 15), 0x735a2d97);
  return ((hash ^ (hash >>> 15)) >>> 0) / 4294967295;
}

function createGrassAlphaAtlas() {
  const panelWidth = 64;
  const height = 128;
  const canvas = document.createElement("canvas");
  canvas.width = panelWidth * GRASS_LAYER_COUNT;
  canvas.height = height;

  const context = canvas.getContext("2d", { alpha: true });
  if (!context) throw new Error("Could not create the grass alpha-atlas context.");

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#ffffff";

  for (let layer = 0; layer < GRASS_LAYER_COUNT; layer += 1) {
    const panelX = layer * panelWidth;
    const bladeCount = 15 + layer * 2;

    for (let blade = 0; blade < bladeCount; blade += 1) {
      const seed = layer * 101 + blade * 17;
      const baseX = panelX + 3 + hash01(seed) * (panelWidth - 6);
      const bladeHeight = height * (0.38 + hash01(seed + 1) * 0.58);
      const halfWidth = 0.8 + hash01(seed + 2) * 1.75;
      const lean = (hash01(seed + 3) - 0.5) * 13;
      const shoulder = height - bladeHeight * (0.45 + hash01(seed + 4) * 0.18);
      const tipY = height - bladeHeight;

      context.beginPath();
      context.moveTo(baseX - halfWidth, height);
      context.quadraticCurveTo(baseX - halfWidth * 0.4, shoulder, baseX + lean, tipY);
      context.quadraticCurveTo(baseX + halfWidth * 0.45, shoulder + 2, baseX + halfWidth, height);
      context.closePath();
      context.fill();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.name = "grass-three-layer-alpha-atlas";
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.wrapS = THREE.ClampToEdgeWrapping;
  texture.wrapT = THREE.ClampToEdgeWrapping;
  texture.minFilter = THREE.LinearMipmapLinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.generateMipmaps = true;
  texture.needsUpdate = true;
  return texture;
}

function createLayeredGrassGeometry() {
  const positions = [];
  const uvs = [];
  const colors = [];
  const indices = [];
  const panelInset = 1 / (64 * GRASS_LAYER_COUNT);

  const layers = [
    { angle: 0, width: 0.82, height: 0.92, offset: -0.025 },
    { angle: Math.PI / 3, width: 0.94, height: 1.08, offset: 0.018 },
    { angle: Math.PI * 2 / 3, width: 0.76, height: 0.84, offset: 0.04 }
  ];

  layers.forEach((layer, layerIndex) => {
    const vertexOffset = positions.length / 3;
    const halfWidth = layer.width * 0.5;
    const cosine = Math.cos(layer.angle);
    const sine = Math.sin(layer.angle);
    const uMin = layerIndex / GRASS_LAYER_COUNT + panelInset;
    const uMax = (layerIndex + 1) / GRASS_LAYER_COUNT - panelInset;
    const color = GRASS_LAYER_COLORS[layerIndex];

    for (const [localX, localY, u, v] of [
      [-halfWidth, 0, uMin, 0],
      [halfWidth, 0, uMax, 0],
      [-halfWidth, layer.height, uMin, 1],
      [halfWidth, layer.height, uMax, 1]
    ]) {
      const x = localX * cosine + layer.offset * sine;
      const z = -localX * sine + layer.offset * cosine;
      positions.push(x, localY, z);
      uvs.push(u, v);
      colors.push(color.r, color.g, color.b);
    }

    indices.push(
      vertexOffset,
      vertexOffset + 1,
      vertexOffset + 2,
      vertexOffset + 2,
      vertexOffset + 1,
      vertexOffset + 3
    );
  });

  const geometry = new THREE.BufferGeometry();
  geometry.name = "grass-three-layer-alpha-cutout-geometry";
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeBoundingBox();
  geometry.computeBoundingSphere();
  return geometry;
}

function createUnlitGrassMaterial() {
  const material = new THREE.MeshBasicNodeMaterial({
    color: 0xffffff,
    map: createGrassAlphaAtlas(),
    vertexColors: true,
    side: THREE.DoubleSide
  });

  material.name = "unlit-three-layer-alpha-cutout-grass";
  material.transparent = false;
  material.alphaTest = GRASS_ALPHA_CLIP;
  material.alphaToCoverage = true;
  material.depthTest = true;
  material.depthWrite = true;
  material.toneMapped = false;
  material.fog = true;
  return material;
}

function createLayeredGrassRenderer(snapshot) {
  const instances = snapshot.vegetation.byType["grass-patch"] ?? [];
  const group = new THREE.Group();
  group.name = "unlit-layered-alpha-grass";

  if (!instances.length) return Object.freeze({ group, update() {} });

  const mesh = new THREE.InstancedMesh(
    createLayeredGrassGeometry(),
    createUnlitGrassMaterial(),
    instances.length
  );
  const dummy = new THREE.Object3D();

  mesh.name = "grass-alpha-cutout-layers";
  mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
  mesh.castShadow = false;
  mesh.receiveShadow = false;
  mesh.frustumCulled = true;

  instances.forEach((instance, index) => {
    const heightVariation = 0.78 + ((instance.phase / (Math.PI * 2)) % 1) * 0.24;
    dummy.position.set(instance.position.x, instance.position.y + 0.012, instance.position.z);
    dummy.rotation.set(0, instance.rotation, 0);
    dummy.scale.set(instance.scale, instance.scale * heightVariation, instance.scale);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    mesh.setColorAt(index, new THREE.Color(0xffffff).multiplyScalar(instance.tint ?? 1));
  });

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.userData.grassRenderPolicy = Object.freeze({
    lighting: "unlit",
    layerCount: GRASS_LAYER_COUNT,
    alphaClip: GRASS_ALPHA_CLIP,
    depthTest: true,
    depthWrite: true,
    blending: "none"
  });
  group.add(mesh);

  return Object.freeze({ group, mesh, update() {} });
}

function createSnapshotWithoutLegacyGrass(snapshot) {
  return {
    ...snapshot,
    vegetation: {
      ...snapshot.vegetation,
      byType: {
        ...snapshot.vegetation.byType,
        "grass-patch": []
      }
    }
  };
}

export function createStylizedWorldRenderer(snapshot) {
  const baseRenderer = createBaseStylizedWorldRenderer(createSnapshotWithoutLegacyGrass(snapshot));
  const grassRenderer = createLayeredGrassRenderer(snapshot);
  baseRenderer.group.add(grassRenderer.group);

  return Object.freeze({
    group: baseRenderer.group,
    update(elapsedSeconds = 0) {
      baseRenderer.update(elapsedSeconds);
      grassRenderer.update(elapsedSeconds);
    }
  });
}
