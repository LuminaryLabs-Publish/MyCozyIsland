import * as THREE from "three/webgpu";
import { clamp01, lerp, smoothstep } from "./determinism.js";
import { COZY_RENDER_LAYERS, assignRenderLayer } from "./render-layers.js";

function toonMaterial(color, options = {}) {
  const material = new THREE.MeshToonNodeMaterial({
    color,
    vertexColors: Boolean(options.vertexColors),
    transparent: Boolean(options.transparent),
    opacity: options.opacity ?? 1,
    side: options.side ?? THREE.FrontSide
  });
  material.roughness = options.roughness ?? 0.86;
  material.depthTest = options.depthTest !== false;
  material.depthWrite = options.depthWrite ?? !options.transparent;
  return material;
}

function colorBlend(weights, palette) {
  const result = new THREE.Color(0, 0, 0);
  let total = 0;
  for (const [key, weight] of Object.entries(weights)) {
    const value = Number(weight) || 0;
    if (value <= 0 || !palette[key]) continue;
    result.r += palette[key].r * value;
    result.g += palette[key].g * value;
    result.b += palette[key].b * value;
    total += value;
  }
  if (total > 0) result.multiplyScalar(1 / total);
  return result;
}

function createGridGeometry({ resolution, extent, sampleVertex }) {
  const positions = new Float32Array(resolution * resolution * 3);
  const colors = new Float32Array(resolution * resolution * 3);
  const active = new Uint8Array(resolution * resolution);
  let vertex = 0;

  for (let zIndex = 0; zIndex < resolution; zIndex += 1) {
    const z = (zIndex / (resolution - 1) * 2 - 1) * extent;
    for (let xIndex = 0; xIndex < resolution; xIndex += 1) {
      const x = (xIndex / (resolution - 1) * 2 - 1) * extent;
      const sample = sampleVertex({ x, z });
      const color = sample.color ?? new THREE.Color(0xffffff);
      positions[vertex * 3] = x;
      positions[vertex * 3 + 1] = Number(sample.y ?? 0);
      positions[vertex * 3 + 2] = z;
      colors[vertex * 3] = color.r;
      colors[vertex * 3 + 1] = color.g;
      colors[vertex * 3 + 2] = color.b;
      active[vertex] = sample.active === false ? 0 : 1;
      vertex += 1;
    }
  }

  const indices = [];
  const addTriangle = (a, b, c) => {
    if (!active[a] && !active[b] && !active[c]) return;
    indices.push(a, b, c);
  };
  for (let z = 0; z < resolution - 1; z += 1) {
    for (let x = 0; x < resolution - 1; x += 1) {
      const a = z * resolution + x;
      const b = a + 1;
      const c = a + resolution;
      const d = c + 1;
      addTriangle(a, c, b);
      addTriangle(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  geometry.userData.activeVertexCount = active.reduce((sum, value) => sum + value, 0);
  geometry.userData.totalVertexCount = active.length;
  return geometry;
}

function createPathGroup(pathNetwork, terrain) {
  const group = new THREE.Group();
  group.name = "cozy-island-paths";
  group.renderOrder = 20;
  const material = toonMaterial(0xb6976f, {
    roughness: 0.96,
    transparent: true,
    opacity: 0.92,
    depthWrite: false,
    side: THREE.DoubleSide
  });
  for (const segment of pathNetwork?.segments ?? []) {
    const from = new THREE.Vector3(segment.from.x, terrain.sampleHeight(segment.from) + 0.11, segment.from.z);
    const to = new THREE.Vector3(segment.to.x, terrain.sampleHeight(segment.to) + 0.11, segment.to.z);
    const direction = new THREE.Vector3().subVectors(to, from);
    const side = new THREE.Vector3(-direction.z, 0, direction.x).normalize().multiplyScalar(segment.width * 0.5);
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.Float32BufferAttribute([
      from.x + side.x, from.y, from.z + side.z,
      from.x - side.x, from.y, from.z - side.z,
      to.x + side.x, to.y, to.z + side.z,
      to.x - side.x, to.y, to.z - side.z
    ], 3));
    geometry.setIndex([0, 1, 2, 2, 1, 3]);
    geometry.computeVertexNormals();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.receiveShadow = true;
    mesh.renderOrder = 20;
    group.add(mesh);
  }
  return group;
}

function createInstancedVegetation(snapshot) {
  const group = new THREE.Group();
  group.name = "instanced-vegetation";
  group.renderOrder = 30;
  const archetypes = snapshot.vegetationArchetypes;
  const byType = snapshot.vegetation.byType;
  const dummy = new THREE.Object3D();

  function makeMesh(geometry, material, instances, transform) {
    if (!instances?.length) return null;
    const mesh = new THREE.InstancedMesh(geometry, material, instances.length);
    mesh.instanceMatrix.setUsage(THREE.StaticDrawUsage);
    instances.forEach((instance, index) => {
      transform(dummy, instance, archetypes[instance.type]);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);
      const tint = new THREE.Color(material.color ?? 0xffffff).multiplyScalar(instance.tint ?? 1);
      mesh.setColorAt(index, tint);
    });
    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.renderOrder = 30;
    return mesh;
  }

  const trunkMaterial = toonMaterial(0x76503a, { vertexColors: true });
  const leafMaterial = toonMaterial(0x4f9e59, { vertexColors: true });
  const palmMaterial = toonMaterial(0x58a85e, { vertexColors: true, side: THREE.DoubleSide });
  const grassMaterial = toonMaterial(0x71b958, { vertexColors: true, side: THREE.DoubleSide });

  const treeInstances = [...(byType["broadleaf-tree"] ?? []), ...(byType.sapling ?? [])];
  const treeTrunks = makeMesh(new THREE.CylinderGeometry(0.18, 0.31, 1, 7), trunkMaterial, treeInstances, (object, instance, archetype) => {
    const height = archetype.height * instance.scale;
    object.position.set(instance.position.x, instance.position.y + height * 0.5, instance.position.z);
    object.rotation.set(0, instance.rotation, 0);
    object.scale.set(instance.scale, height, instance.scale);
  });
  if (treeTrunks) { treeTrunks.name = "tree-trunks"; group.add(treeTrunks); }

  const treeCanopies = makeMesh(new THREE.DodecahedronGeometry(1, 1), leafMaterial, treeInstances, (object, instance, archetype) => {
    const height = archetype.height * instance.scale;
    const canopy = archetype.canopy * instance.scale;
    object.position.set(instance.position.x, instance.position.y + height * 0.82, instance.position.z);
    object.rotation.set(instance.phase * 0.03, instance.rotation, 0);
    object.scale.set(canopy * 1.1, canopy * 0.8, canopy);
  });
  if (treeCanopies) { treeCanopies.name = "tree-canopies"; group.add(treeCanopies); }

  const palms = byType["palm-tree"] ?? [];
  const palmTrunks = makeMesh(new THREE.CylinderGeometry(0.14, 0.3, 1, 8), trunkMaterial, palms, (object, instance, archetype) => {
    const height = archetype.height * instance.scale;
    object.position.set(instance.position.x, instance.position.y + height * 0.5, instance.position.z);
    object.rotation.set(0.05, instance.rotation, 0.08 * Math.sin(instance.phase));
    object.scale.set(instance.scale, height, instance.scale);
  });
  if (palmTrunks) { palmTrunks.name = "palm-trunks"; group.add(palmTrunks); }

  const palmCrowns = makeMesh(new THREE.SphereGeometry(1, 7, 4), palmMaterial, palms, (object, instance, archetype) => {
    const height = archetype.height * instance.scale;
    const canopy = archetype.canopy * instance.scale;
    object.position.set(instance.position.x, instance.position.y + height * 0.94, instance.position.z);
    object.rotation.set(0.15, instance.rotation, 0);
    object.scale.set(canopy * 1.45, canopy * 0.22, canopy * 1.45);
  });
  if (palmCrowns) { palmCrowns.name = "palm-crowns"; group.add(palmCrowns); }

  const shrubs = [...(byType.bush ?? []), ...(byType.fern ?? [])];
  const shrubMesh = makeMesh(new THREE.IcosahedronGeometry(0.7, 0), leafMaterial, shrubs, (object, instance, archetype) => {
    const size = archetype.canopy * instance.scale;
    object.position.set(instance.position.x, instance.position.y + archetype.height * instance.scale * 0.46, instance.position.z);
    object.rotation.set(0, instance.rotation, 0);
    object.scale.set(size, size * (instance.type === "fern" ? 0.35 : 0.72), size);
  });
  if (shrubMesh) { shrubMesh.name = "shrubs-and-ferns"; shrubMesh.castShadow = false; group.add(shrubMesh); }

  const grass = byType["grass-patch"] ?? [];
  const grassGeometry = new THREE.ConeGeometry(0.33, 1.1, 5, 1, true);
  grassGeometry.translate(0, 0.55, 0);
  const grassMesh = makeMesh(grassGeometry, grassMaterial, grass, (object, instance) => {
    object.position.set(instance.position.x, instance.position.y, instance.position.z);
    object.rotation.set(0, instance.rotation, 0.05 * Math.sin(instance.phase));
    object.scale.set(instance.scale, instance.scale * (0.72 + (instance.phase % 1) * 0.25), instance.scale);
  });
  if (grassMesh) { grassMesh.name = "grass-patches"; grassMesh.castShadow = false; group.add(grassMesh); }
  group.userData.swayTargets = [treeCanopies, palmCrowns, shrubMesh].filter(Boolean);
  return group;
}

function createRockMeshes(snapshot) {
  const instances = snapshot.rocks.instances;
  const geometry = new THREE.DodecahedronGeometry(0.8, 1);
  const material = toonMaterial(0x747a75, { vertexColors: true });
  const mesh = new THREE.InstancedMesh(geometry, material, instances.length);
  const dummy = new THREE.Object3D();
  instances.forEach((instance, index) => {
    dummy.position.set(instance.position.x, instance.position.y + 0.45 * instance.scale.y, instance.position.z);
    dummy.rotation.set(instance.rotation.x, instance.rotation.y, instance.rotation.z);
    dummy.scale.set(instance.scale.x, instance.scale.y, instance.scale.z);
    dummy.updateMatrix();
    mesh.setMatrixAt(index, dummy.matrix);
    const tint = new THREE.Color(instance.wetness > 0.5 ? 0x5e7675 : 0x7e8078).multiplyScalar(0.88 + (index % 5) * 0.035);
    mesh.setColorAt(index, tint);
  });
  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  mesh.name = "instanced-rocks";
  mesh.renderOrder = 35;
  return mesh;
}

function createProps(snapshot) {
  const group = new THREE.Group();
  group.name = "cozy-island-props";
  group.renderOrder = 40;
  const wood = toonMaterial(0x80583b);
  const posts = snapshot.props.objects.filter(object => object.type === "fence-post");
  const postGeometry = new THREE.CylinderGeometry(0.12, 0.16, 1.5, 7);
  const postMesh = new THREE.InstancedMesh(postGeometry, wood, posts.length);
  const dummy = new THREE.Object3D();
  posts.forEach((post, index) => {
    dummy.position.set(post.position.x, post.position.y + 0.75 * post.scale, post.position.z);
    dummy.rotation.set(0, post.rotation, 0);
    dummy.scale.set(post.scale, post.scale, post.scale);
    dummy.updateMatrix();
    postMesh.setMatrixAt(index, dummy.matrix);
  });
  postMesh.instanceMatrix.needsUpdate = true;
  postMesh.castShadow = true;
  postMesh.renderOrder = 40;
  group.add(postMesh);

  for (let index = 0; index < posts.length; index += 1) {
    const a = posts[index];
    const b = posts[(index + 1) % posts.length];
    const length = Math.hypot(b.position.x - a.position.x, b.position.z - a.position.z) * 0.94;
    const yaw = Math.atan2(b.position.z - a.position.z, b.position.x - a.position.x);
    for (const height of [0.62, 1.08]) {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(length, 0.09, 0.1), wood);
      rail.position.set((a.position.x + b.position.x) * 0.5, Math.min(a.position.y, b.position.y) + height, (a.position.z + b.position.z) * 0.5);
      rail.rotation.y = -yaw;
      rail.castShadow = true;
      rail.renderOrder = 40;
      group.add(rail);
    }
  }

  for (const driftwood of snapshot.props.objects.filter(object => object.type === "driftwood")) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.24, 2.7 * driftwood.scale, 8), wood);
    log.position.set(driftwood.position.x, driftwood.position.y + 0.18, driftwood.position.z);
    log.rotation.set(Math.PI / 2, driftwood.rotation, 0.12);
    log.castShadow = true;
    log.renderOrder = 40;
    group.add(log);
  }
  return group;
}

function createCampfire(snapshot) {
  const descriptor = snapshot.campfire;
  const group = new THREE.Group();
  group.name = "central-campfire";
  group.position.set(descriptor.position.x, descriptor.position.y, descriptor.position.z);
  group.renderOrder = 45;
  const logMaterial = toonMaterial(0x6f452c);
  for (let index = 0; index < 7; index += 1) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2.2, 8), logMaterial);
    log.position.y = 0.24 + (index % 2) * 0.08;
    log.rotation.z = Math.PI / 2;
    log.rotation.y = index / 7 * Math.PI * 2;
    log.castShadow = true;
    group.add(log);
  }
  const flameMaterial = new THREE.MeshBasicNodeMaterial({ color: 0xffa238, transparent: true, opacity: 0.86, depthWrite: false });
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.52, descriptor.flameHeight, 8), flameMaterial);
  flame.position.y = descriptor.flameHeight * 0.5;
  group.add(flame);
  const light = new THREE.PointLight(descriptor.light.color, descriptor.light.intensity, descriptor.light.distance, 2);
  light.position.set(0, 1.4, 0);
  group.add(light);

  const smokePositions = new Float32Array(descriptor.smoke.particleCount * 3);
  const smokeSeeds = new Float32Array(descriptor.smoke.particleCount);
  for (let index = 0; index < descriptor.smoke.particleCount; index += 1) smokeSeeds[index] = (index * 0.61803398875) % 1;
  const smokeGeometry = new THREE.BufferGeometry();
  smokeGeometry.setAttribute("position", new THREE.BufferAttribute(smokePositions, 3));
  const smokeMaterial = new THREE.PointsMaterial({ color: 0xb8b7ae, size: 0.72, transparent: true, opacity: 0.22, depthWrite: false, sizeAttenuation: true });
  const smoke = new THREE.Points(smokeGeometry, smokeMaterial);
  group.add(smoke);
  group.userData = { flame, light, smoke, smokeSeeds, descriptor };
  return group;
}

export function createStylizedWorldRenderer(snapshot) {
  const group = new THREE.Group();
  group.name = "stylized-cozy-island-world";
  const palette = {
    wetSand: new THREE.Color(snapshot.materials["terrain-wet-sand"].color),
    drySand: new THREE.Color(snapshot.materials["terrain-sand"].color),
    grass: new THREE.Color(snapshot.materials["terrain-grass"].color),
    soil: new THREE.Color(snapshot.materials["terrain-soil"].color),
    forestFloor: new THREE.Color(0x587b4f),
    moss: new THREE.Color(0x4f8f58),
    rock: new THREE.Color(snapshot.materials["terrain-rock"].color)
  };
  const shelfWidth = Number(snapshot.terrainShelf?.width ?? 6);
  const shelfDepth = Number(snapshot.terrainShelf?.depth ?? -5);
  const wetSandColor = palette.wetSand;
  const submergedColor = new THREE.Color(0x6cb8a1);

  const terrainGeometry = createGridGeometry({
    resolution: snapshot.terrainLod.resolution,
    extent: snapshot.terrain.radius * 1.18,
    sampleVertex: point => {
      const fields = snapshot.terrain.sampleFields(point);
      const active = fields.shoreDistance >= -shelfWidth;
      if (fields.shoreDistance >= 0) {
        return {
          y: fields.height,
          color: colorBlend(snapshot.biomeField.sample(point), palette),
          active
        };
      }
      const shelf = smoothstep(0, shelfWidth, -fields.shoreDistance);
      return {
        y: lerp(snapshot.terrain.seaLevel - 0.08, shelfDepth, shelf),
        color: wetSandColor.clone().lerp(submergedColor, clamp01(shelf)),
        active
      };
    }
  });
  terrainGeometry.name = "coast-clipped-island-terrain-geometry";
  terrainGeometry.userData.semanticTerrain = "island";
  terrainGeometry.userData.submergedShelfWidth = shelfWidth;
  terrainGeometry.userData.submergedShelfDepth = shelfDepth;
  const terrainMaterial = toonMaterial(0xffffff, { vertexColors: true, roughness: 0.9 });
  const terrainMesh = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrainMesh.name = "toon-island-terrain";
  terrainMesh.castShadow = true;
  terrainMesh.receiveShadow = true;
  terrainMesh.renderOrder = 10;

  const floorResolution = Math.max(49, Math.round(snapshot.terrainLod.resolution * 0.34));
  const floorGeometry = createGridGeometry({
    resolution: floorResolution,
    extent: snapshot.oceanFloor.size * 0.5,
    sampleVertex: point => {
      const height = snapshot.oceanFloor.sampleHeight(point);
      const depth = snapshot.oceanFloor.seaLevel - height;
      const color = new THREE.Color(
        depth < 12 ? 0x83c9b5
          : depth < 34 ? 0x47978f
            : depth < 68 ? 0x2f727d
              : 0x1d536b
      );
      return { y: height, color, active: true };
    }
  });
  floorGeometry.name = "independent-seafloor-terrain-geometry";
  floorGeometry.userData.semanticTerrain = "sea-floor";
  const floorMaterial = toonMaterial(0xffffff, { vertexColors: true, roughness: 0.95 });
  const floorMesh = new THREE.Mesh(floorGeometry, floorMaterial);
  floorMesh.name = "toon-sea-floor-terrain";
  floorMesh.receiveShadow = true;
  floorMesh.renderOrder = 0;

  group.add(floorMesh);
  group.add(terrainMesh);
  group.add(createPathGroup(snapshot.vegetation.pathNetwork, snapshot.terrain));
  const vegetation = createInstancedVegetation(snapshot);
  group.add(vegetation);
  group.add(createRockMeshes(snapshot));
  group.add(createProps(snapshot));
  const campfire = createCampfire(snapshot);
  group.add(campfire);
  assignRenderLayer(group, COZY_RENDER_LAYERS.OPAQUE_WORLD, true);
  group.userData.renderLayerContract = Object.freeze({
    passId: "opaque-world",
    islandTerrain: terrainMesh.name,
    seaFloorTerrain: floorMesh.name,
    depthWrite: true,
    separateTerrains: true
  });

  function update(elapsedSeconds = 0) {
    const sway = Math.sin(elapsedSeconds * 0.72) * 0.006 + Math.sin(elapsedSeconds * 1.83) * 0.003;
    for (const target of vegetation.userData.swayTargets ?? []) target.rotation.z = sway;
    const { flame, light, smoke, smokeSeeds, descriptor } = campfire.userData;
    const pulse = 1 + Math.sin(elapsedSeconds * 10.7) * 0.08 + Math.sin(elapsedSeconds * 16.3) * 0.035;
    flame.scale.set(pulse * 0.92, pulse, pulse * 0.92);
    light.intensity = descriptor.light.intensity * (0.88 + Math.sin(elapsedSeconds * 12.1) * 0.08);
    const positions = smoke.geometry.attributes.position;
    for (let index = 0; index < smokeSeeds.length; index += 1) {
      const seed = smokeSeeds[index];
      const age = (elapsedSeconds * 0.13 + seed) % 1;
      const swirl = Math.sin(elapsedSeconds * 1.8 + seed * 19) * descriptor.smoke.windResponse;
      positions.setXYZ(
        index,
        descriptor.smoke.windDirection.x * age * 3.2 + Math.cos(seed * Math.PI * 2) * age * 0.65 + swirl * 0.25,
        0.7 + age * descriptor.smoke.riseSpeed * descriptor.smoke.lifespan,
        descriptor.smoke.windDirection.z * age * 3.2 + Math.sin(seed * Math.PI * 2) * age * 0.65 + swirl * 0.18
      );
    }
    positions.needsUpdate = true;
  }

  return Object.freeze({ group, terrainMesh, floorMesh, update });
}
