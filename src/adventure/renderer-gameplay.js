import * as THREE from "three/webgpu";
import { assignRenderLayer, COZY_RENDER_LAYERS } from "../kits/index.js";
import { CROP_DEFINITIONS, clamp01 } from "./definitions.js";

function toon(color, options = {}) {
  const material = new THREE.MeshToonNodeMaterial({
    color,
    transparent: Boolean(options.transparent),
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide
  });
  material.roughness = options.roughness ?? 0.9;
  material.depthTest = options.depthTest !== false;
  material.depthWrite = options.depthWrite ?? !options.transparent;
  return material;
}

function shadow(mesh, cast = true, receive = true) {
  mesh.castShadow = cast;
  mesh.receiveShadow = receive;
  return mesh;
}

function disposeObject(root) {
  root.traverse((object) => {
    object.geometry?.dispose?.();
    if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose?.());
    else object.material?.dispose?.();
  });
}

function createHut(landmark) {
  const group = new THREE.Group();
  group.name = landmark.id;
  group.position.set(landmark.position.x, landmark.position.y, landmark.position.z);
  group.rotation.y = landmark.rotation ?? 0;
  const wood = toon(0xb47a4d);
  const trim = toon(0x6f4b35);
  const roof = toon(0xd98658, { side: THREE.DoubleSide });
  const door = toon(0x5b493f);

  const floor = shadow(new THREE.Mesh(new THREE.BoxGeometry(6.4, 0.35, 5.2), trim));
  floor.position.y = 0.2;
  group.add(floor);
  const walls = shadow(new THREE.Mesh(new THREE.BoxGeometry(5.8, 3.4, 4.6), wood));
  walls.position.y = 2.05;
  group.add(walls);
  const roofMesh = shadow(new THREE.Mesh(new THREE.ConeGeometry(4.8, 2.1, 4), roof));
  roofMesh.position.y = 4.55;
  roofMesh.rotation.y = Math.PI * 0.25;
  roofMesh.scale.z = 0.82;
  group.add(roofMesh);
  const doorMesh = new THREE.Mesh(new THREE.BoxGeometry(1.45, 2.45, 0.18), door);
  doorMesh.position.set(0.7, 1.55, 2.38);
  group.add(doorMesh);
  for (const x of [-1.7, 1.7]) {
    const windowFrame = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.05, 0.16), trim);
    windowFrame.position.set(x, 2.25, 2.39);
    group.add(windowFrame);
    const glass = new THREE.Mesh(new THREE.PlaneGeometry(0.82, 0.74), toon(0xaee1db, { transparent: true, opacity: 0.72, depthWrite: false }));
    glass.position.set(x, 2.25, 2.49);
    group.add(glass);
  }
  return group;
}

function createWaterBarrel(landmark) {
  const group = new THREE.Group();
  group.name = landmark.id;
  group.position.set(landmark.position.x, landmark.position.y, landmark.position.z);
  group.rotation.y = landmark.rotation ?? 0;
  const barrel = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.78, 0.68, 1.55, 10), toon(0x9b6a43)));
  barrel.position.y = 0.8;
  group.add(barrel);
  for (const y of [0.28, 0.8, 1.32]) {
    const band = new THREE.Mesh(new THREE.TorusGeometry(0.74, 0.055, 6, 18), toon(0x4f5552));
    band.position.y = y;
    band.rotation.x = Math.PI * 0.5;
    group.add(band);
  }
  const water = new THREE.Mesh(new THREE.CircleGeometry(0.64, 18), toon(0x5da5b1, { transparent: true, opacity: 0.76, depthWrite: false, side: THREE.DoubleSide }));
  water.position.y = 1.585;
  water.rotation.x = -Math.PI * 0.5;
  group.add(water);
  return group;
}

function createPlantMesh(cropId, stage, ready) {
  const crop = CROP_DEFINITIONS[cropId];
  const group = new THREE.Group();
  if (!crop) return group;
  const fraction = clamp01((stage + 1) / crop.stageCount);
  const leaf = toon(crop.color, { side: THREE.DoubleSide });
  const stem = toon(0x5e8d45);
  const fruit = toon(crop.fruitColor);
  const offsets = [
    [-0.78, -0.58], [0.65, -0.52], [-0.58, 0.65], [0.72, 0.64], [0, 0.06]
  ];

  offsets.forEach(([x, z], index) => {
    const plant = new THREE.Group();
    plant.position.set(x, 0, z);
    plant.rotation.y = index * 1.31;
    if (cropId === "coconut") {
      const trunkHeight = 0.45 + fraction * 3.4;
      const trunk = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.08 + fraction * 0.05, 0.11 + fraction * 0.06, trunkHeight, 7), toon(0x8b6548)));
      trunk.position.y = trunkHeight * 0.5;
      plant.add(trunk);
      const crown = new THREE.Mesh(new THREE.SphereGeometry(0.45 + fraction * 0.45, 7, 4), leaf);
      crown.position.y = trunkHeight;
      crown.scale.y = 0.28;
      plant.add(crown);
      if (ready && index < 3) {
        const nut = new THREE.Mesh(new THREE.SphereGeometry(0.12, 7, 5), fruit);
        nut.position.set(0.14 * (index - 1), trunkHeight - 0.22, 0.12);
        plant.add(nut);
      }
    } else if (cropId === "pineapple") {
      const bodyHeight = 0.22 + fraction * 0.72;
      for (let leafIndex = 0; leafIndex < 7; leafIndex += 1) {
        const blade = new THREE.Mesh(new THREE.ConeGeometry(0.08 + fraction * 0.06, 0.48 + fraction * 0.55, 4), leaf);
        blade.position.y = bodyHeight * 0.55;
        blade.rotation.z = (leafIndex - 3) * 0.09;
        blade.rotation.y = leafIndex / 7 * Math.PI * 2;
        plant.add(blade);
      }
      if (ready) {
        const fruitMesh = shadow(new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.24, 0.55, 8), fruit));
        fruitMesh.position.y = 0.7 + fraction * 0.25;
        plant.add(fruitMesh);
      }
    } else {
      const stemHeight = 0.16 + fraction * (cropId === "taro" ? 0.95 : 0.5);
      const stemMesh = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.055, stemHeight, 6), stem);
      stemMesh.position.y = stemHeight * 0.5;
      plant.add(stemMesh);
      const leafCount = 2 + Math.round(fraction * 3);
      for (let leafIndex = 0; leafIndex < leafCount; leafIndex += 1) {
        const leafMesh = new THREE.Mesh(
          cropId === "taro" ? new THREE.SphereGeometry(0.22 + fraction * 0.23, 7, 4) : new THREE.PlaneGeometry(0.35 + fraction * 0.35, 0.18 + fraction * 0.18),
          leaf
        );
        leafMesh.position.set(
          Math.cos(leafIndex / leafCount * Math.PI * 2) * 0.14,
          stemHeight * (0.55 + leafIndex * 0.08),
          Math.sin(leafIndex / leafCount * Math.PI * 2) * 0.14
        );
        leafMesh.rotation.set(-0.55, leafIndex / leafCount * Math.PI * 2, 0);
        if (cropId === "taro") leafMesh.scale.set(1, 0.38, 1);
        plant.add(leafMesh);
      }
      if (ready) {
        const root = new THREE.Mesh(new THREE.SphereGeometry(cropId === "taro" ? 0.19 : 0.15, 7, 5), fruit);
        root.position.y = 0.16;
        root.scale.set(1.35, 0.7, 1);
        plant.add(root);
      }
    }
    plant.scale.setScalar(0.55 + fraction * 0.7);
    group.add(plant);
  });
  return group;
}

function plotColor(state) {
  if (state.status === "untilled") return 0x79a759;
  if (state.status === "tilled") return 0x78553d;
  if (state.status === "growing") return state.watered ? 0x604a3b : 0x72513b;
  if (state.status === "ready") return 0x6a4b37;
  return 0x78553d;
}

export function createCozyGameplayRenderer(staticSnapshot) {
  const group = new THREE.Group();
  group.name = "cozy-adventure-gameplay-presentation";
  const plotEntries = new Map();
  const forageEntries = new Map();
  const cropGroups = new Map();
  const sharedBorderMaterial = toon(0x8b6548);

  for (const descriptor of staticSnapshot.farmLayout ?? []) {
    const plotGroup = new THREE.Group();
    plotGroup.name = descriptor.id;
    plotGroup.position.set(descriptor.position.x, descriptor.position.y, descriptor.position.z);
    plotGroup.rotation.y = descriptor.rotation ?? 0;
    const soilMaterial = toon(0x79a759);
    const soil = shadow(new THREE.Mesh(new THREE.BoxGeometry(descriptor.size.x, 0.16, descriptor.size.z), soilMaterial), false, true);
    soil.position.y = 0.01;
    plotGroup.add(soil);
    for (const x of [-descriptor.size.x * 0.5, descriptor.size.x * 0.5]) {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.18, descriptor.size.z + 0.2), sharedBorderMaterial);
      edge.position.set(x, 0.08, 0);
      plotGroup.add(edge);
    }
    for (const z of [-descriptor.size.z * 0.5, descriptor.size.z * 0.5]) {
      const edge = new THREE.Mesh(new THREE.BoxGeometry(descriptor.size.x + 0.2, 0.18, 0.1), sharedBorderMaterial);
      edge.position.set(0, 0.08, z);
      plotGroup.add(edge);
    }
    const cropRoot = new THREE.Group();
    cropRoot.position.y = 0.12;
    plotGroup.add(cropRoot);
    group.add(plotGroup);
    plotEntries.set(descriptor.id, { descriptor, plotGroup, soil, soilMaterial, cropRoot, signature: "" });
  }

  for (const descriptor of staticSnapshot.forageLayout ?? []) {
    const cluster = new THREE.Group();
    cluster.name = `visual:${descriptor.id}`;
    cluster.position.set(descriptor.position.x, descriptor.position.y + descriptor.crownHeight - 0.25, descriptor.position.z);
    const nutMaterial = toon(0x8b6848);
    for (let index = 0; index < descriptor.capacity; index += 1) {
      const nut = shadow(new THREE.Mesh(new THREE.SphereGeometry(0.24, 8, 6), nutMaterial), true, true);
      nut.position.set((index - (descriptor.capacity - 1) * 0.5) * 0.32, -0.1 - (index % 2) * 0.18, (index % 2 ? 0.15 : -0.08));
      nut.scale.set(0.86, 1.12, 0.86);
      cluster.add(nut);
    }
    group.add(cluster);
    forageEntries.set(descriptor.id, { descriptor, cluster });
  }

  for (const landmark of staticSnapshot.landmarks ?? []) {
    if (landmark.type === "island-hut") group.add(createHut(landmark));
    if (landmark.type === "water-barrel") group.add(createWaterBarrel(landmark));
  }

  const targetMarker = new THREE.Mesh(
    new THREE.TorusGeometry(0.58, 0.055, 8, 30),
    toon(0xffe9a8, { transparent: true, opacity: 0.82, depthWrite: false })
  );
  targetMarker.name = "cozy-interaction-target-marker";
  targetMarker.rotation.x = Math.PI * 0.5;
  targetMarker.visible = false;
  group.add(targetMarker);

  assignRenderLayer(group, COZY_RENDER_LAYERS.OPAQUE_WORLD, true);

  function update(frame) {
    const farmState = frame.farming?.plots ?? {};
    for (const [plotId, entry] of plotEntries) {
      const state = farmState[plotId];
      if (!state) continue;
      entry.soilMaterial.color.setHex(plotColor(state));
      const signature = `${state.status}:${state.cropId ?? "none"}:${state.stage}:${state.watered ? 1 : 0}`;
      if (signature !== entry.signature) {
        while (entry.cropRoot.children.length) {
          const child = entry.cropRoot.children.pop();
          disposeObject(child);
        }
        if (state.cropId && (state.status === "growing" || state.status === "ready")) {
          const crops = createPlantMesh(state.cropId, state.stage, state.status === "ready");
          entry.cropRoot.add(crops);
          cropGroups.set(plotId, crops);
        }
        entry.signature = signature;
      }
      entry.soil.scale.y = state.watered ? 1.16 : 1;
    }

    const forageState = frame.foraging?.nodes ?? {};
    for (const [nodeId, entry] of forageEntries) {
      const state = forageState[nodeId];
      const ratio = state ? clamp01(state.available / Math.max(1, state.capacity)) : 0;
      entry.cluster.visible = ratio > 0;
      entry.cluster.scale.setScalar(0.72 + ratio * 0.28);
    }

    const target = frame.interaction?.target;
    if (!target) {
      targetMarker.visible = false;
    } else if (target.kind === "plot") {
      const entry = plotEntries.get(target.id);
      targetMarker.visible = Boolean(entry);
      if (entry) targetMarker.position.set(entry.descriptor.position.x, entry.descriptor.position.y + 0.2, entry.descriptor.position.z);
    } else if (target.kind === "forage") {
      const entry = forageEntries.get(target.id);
      targetMarker.visible = Boolean(entry);
      if (entry) targetMarker.position.set(entry.descriptor.position.x, entry.descriptor.position.y + 0.12, entry.descriptor.position.z);
    }
    if (targetMarker.visible) {
      const pulse = 1 + Math.sin(Number(frame.clock?.elapsedSeconds ?? 0) * 3.2) * 0.08;
      targetMarker.scale.setScalar(pulse);
    }
  }

  function dispose() {
    disposeObject(group);
    plotEntries.clear();
    forageEntries.clear();
    cropGroups.clear();
  }

  return Object.freeze({ group, update, dispose });
}
