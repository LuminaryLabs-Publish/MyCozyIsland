import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js";
import { createOceanIslandLandformState, createOceanIslandLandformRenderContract, sampleIslandHeight, sampleIslandMasks } from "./kits/ocean-island-landform-domain/index.js";
import { createDenseCozyIslandObjectGraph } from "./kits/island-foliage-domain/index.js";
import { createOceanFloorState, createOceanFloorRenderContract } from "./kits/ocean-floor-domain/index.js";
import { createGrassPatchPlacementContract } from "./kits/grass-object-domain/index.js";
import { createGrassWindDescriptor } from "./kits/grass-wind-domain/index.js";
import { createCampfireObjectGraph } from "./kits/campfire-object-domain/index.js";
import { createSmokeParticleDescriptor } from "./kits/smoke-particle-domain/index.js";
import { createFencedClearingGraph } from "./kits/fenced-clearing-domain/index.js";
import { createMattatzCloudsState, createMattatzCloudRenderContract } from "./kits/mattatz-clouds-domain/index.js";

const canvas = document.querySelector("#game");
const loader = document.querySelector("#cloud-loader");
const fill = document.querySelector("#cloud-loader-fill");
const err = document.querySelector("#error");
const setLoad = v => { if (fill) fill.style.width = `${Math.max(0, Math.min(100, v))}%`; };
const clamp01 = v => Math.max(0, Math.min(1, v));
const ease = v => { const t = clamp01(v); return t * t * (3 - 2 * t); };

function fail(e) {
  if (err) {
    err.hidden = false;
    err.textContent = String(e?.stack || e?.message || e);
  }
}

function meshGrid(samples, resolution, colorFor, material) {
  const p = [], c = [], idx = [];
  for (const s of samples) {
    p.push(s.x, s.y, s.z);
    const col = colorFor(s);
    c.push(col.r, col.g, col.b);
  }
  for (let z = 0; z < resolution - 1; z++) {
    for (let x = 0; x < resolution - 1; x++) {
      const a = z * resolution + x;
      idx.push(a, a + resolution, a + 1, a + 1, a + resolution, a + resolution + 1);
    }
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
  g.setAttribute("color", new THREE.Float32BufferAttribute(c, 3));
  g.setIndex(idx);
  g.computeVertexNormals();
  return new THREE.Mesh(g, material);
}

function terrainMesh(h) {
  return meshGrid(
    h.samples,
    h.resolution,
    s => {
      const m = s.masks || {};
      return new THREE.Color(m.beach ? 0xe7ca91 : m.wetSand ? 0xcaa46b : m.rock || m.cliff ? 0x817d6d : 0x4f8d4d);
    },
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.92 })
  );
}

function floorMesh(h) {
  return meshGrid(
    h.samples,
    h.resolution,
    s => new THREE.Color(s.masks?.shallowShelf ? 0x4b8b7a : 0x235b67),
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.96 })
  );
}

function waterMesh(mat = {}) {
  const m = new THREE.Mesh(
    new THREE.PlaneGeometry(3600, 3600, 32, 32).rotateX(-Math.PI / 2),
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color(mat.color || "#22b9c9"),
      transparent: true,
      opacity: 0.75,
      roughness: 0.16,
      metalness: 0.12,
      clearcoat: 0.72
    })
  );
  m.position.y = -0.08;
  return m;
}

function foamMesh(shoreline) {
  const pts = shoreline.map(p => new THREE.Vector3(p.x, (p.y || 0) + 0.08, p.z));
  pts.push(pts[0].clone());
  return new THREE.Mesh(
    new THREE.TubeGeometry(new THREE.CatmullRomCurve3(pts, true), shoreline.length, 0.65, 5, true),
    new THREE.MeshBasicMaterial({ color: 0xfff1d4, transparent: true, opacity: 0.36, depthWrite: false })
  );
}

function pathMesh(path, sampleHeight) {
  const group = new THREE.Group();
  const mat = new THREE.MeshStandardMaterial({ color: 0xb89564, roughness: 0.96, transparent: true, opacity: 0.86 });
  for (const s of path.segments) {
    const a = new THREE.Vector3(s.from.x, sampleHeight(s.from) + 0.12, s.from.z);
    const b = new THREE.Vector3(s.to.x, sampleHeight(s.to) + 0.12, s.to.z);
    const d = new THREE.Vector3().subVectors(b, a);
    const side = new THREE.Vector3(-d.z, 0, d.x).normalize().multiplyScalar(s.width * 0.5);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.Float32BufferAttribute([
      a.x + side.x, a.y, a.z + side.z,
      a.x - side.x, a.y, a.z - side.z,
      b.x + side.x, b.y, b.z + side.z,
      b.x - side.x, b.y, b.z - side.z
    ], 3));
    g.setIndex([0, 1, 2, 2, 1, 3]);
    g.computeVertexNormals();
    group.add(new THREE.Mesh(g, mat));
  }
  return group;
}

function objGroup(graph, exclusions) {
  const group = new THREE.Group();
  const trunkMat = new THREE.MeshStandardMaterial({ color: 0x7b4b2a, roughness: 0.9 });
  const leafMat = new THREE.MeshStandardMaterial({ color: 0x4fa84d, roughness: 0.88 });
  const rockMat = new THREE.MeshStandardMaterial({ color: 0x77756a, roughness: 0.9 });

  for (const o of graph.objects) {
    const p = o.transform.position;
    if ((exclusions || []).some(z => Math.hypot(p.x - z.center.x, p.z - z.center.z) < z.radius)) continue;

    const scale = o.transform.scale?.x || 1;
    const isTree = o.type.includes("tree") || o.type === "palm-tree";

    if (isTree) {
      const h = (o.state?.heightMeters || 6) * scale;
      const tree = new THREE.Group();

      const trunk = new THREE.Mesh(
        new THREE.CylinderGeometry(0.14 * scale, 0.22 * scale, h, 8),
        trunkMat
      );
      trunk.position.y = h * 0.5;
      tree.add(trunk);

      const canopyRadius = Math.max(0.9, h * 0.22);
      const canopyMain = new THREE.Mesh(new THREE.DodecahedronGeometry(canopyRadius, 0), leafMat);
      canopyMain.position.set(0, h * 0.9, 0);
      canopyMain.scale.set(1.15, 0.95, 1.05);
      tree.add(canopyMain);

      const canopyLeft = new THREE.Mesh(new THREE.DodecahedronGeometry(canopyRadius * 0.78, 0), leafMat);
      canopyLeft.position.set(-canopyRadius * 0.45, h * 0.84, canopyRadius * 0.12);
      tree.add(canopyLeft);

      const canopyRight = new THREE.Mesh(new THREE.DodecahedronGeometry(canopyRadius * 0.72, 0), leafMat);
      canopyRight.position.set(canopyRadius * 0.48, h * 0.82, -canopyRadius * 0.08);
      tree.add(canopyRight);

      tree.position.set(p.x, p.y, p.z);
      group.add(tree);
      continue;
    }

    const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(0.35, 0), rockMat);
    rock.position.set(p.x, p.y + 0.2, p.z);
    rock.scale.setScalar(scale);
    group.add(rock);
  }

  return group;
}

function fenceGroup(clearing) {
  const group = new THREE.Group();
  const postMat = new THREE.MeshStandardMaterial({ color: 0x7c5738, roughness: 0.9 });
  const railMat = new THREE.MeshStandardMaterial({ color: 0x855d3b, roughness: 0.92 });
  const posts = [];

  for (const o of clearing.objects) {
    if (o.type !== "fence-post") continue;
    const h = o.state.heightMeters || 1.25;
    const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, h, 7), postMat);
    mesh.position.set(o.transform.position.x, o.transform.position.y + h * 0.5, o.transform.position.z);
    group.add(mesh);
    posts.push({ x: o.transform.position.x, y: o.transform.position.y, z: o.transform.position.z, height: h });
  }

  if (posts.length < 2) return group;

  const center = posts.reduce((acc, post) => {
    acc.x += post.x;
    acc.z += post.z;
    return acc;
  }, { x: 0, z: 0 });
  center.x /= posts.length;
  center.z /= posts.length;

  posts.sort((a, b) => Math.atan2(a.z - center.z, a.x - center.x) - Math.atan2(b.z - center.z, b.x - center.x));

  for (let i = 0; i < posts.length; i++) {
    const a = posts[i];
    const b = posts[(i + 1) % posts.length];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    if (len <= 0.001) continue;

    const yaw = Math.atan2(dz, dx);
    const midX = (a.x + b.x) * 0.5;
    const midZ = (a.z + b.z) * 0.5;
    const topY = Math.min(a.y + a.height, b.y + b.height);

    [0.82, 0.56].forEach(heightFactor => {
      const rail = new THREE.Mesh(new THREE.BoxGeometry(len * 0.9, 0.08, 0.08), railMat);
      rail.position.set(midX, topY * heightFactor, midZ);
      rail.rotation.y = -yaw;
      group.add(rail);
    });
  }

  return group;
}

function campfireMesh(graph) {
  const root = graph.byId[graph.rootId];
  const group = new THREE.Group();
  group.position.set(root.transform.position.x, root.transform.position.y, root.transform.position.z);
  const logMat = new THREE.MeshStandardMaterial({ color: 0x70462a, roughness: 0.88 });
  for (let i = 0; i < 7; i++) {
    const log = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 2, 8), logMat);
    log.position.y = 0.22 + (i % 2) * 0.1;
    log.rotation.z = Math.PI / 2;
    log.rotation.y = i / 7 * Math.PI * 2;
    group.add(log);
  }
  const flame = new THREE.Mesh(new THREE.ConeGeometry(0.5, 1.15, 6), new THREE.MeshBasicMaterial({ color: 0xffb23a, transparent: true, opacity: 0.72 }));
  flame.position.y = 0.7;
  group.add(flame);
  const light = new THREE.PointLight(0xff9d43, 1.8, 22, 2);
  light.position.set(0, 1.2, 0);
  group.add(light);
  group.userData = { flame, light };
  return group;
}

function smokeMesh(d) {
  const p = new Float32Array(d.particleCount * 3);
  const ages = new Float32Array(d.particleCount);
  const seeds = new Float32Array(d.particleCount);
  for (let i = 0; i < d.particleCount; i++) {
    ages[i] = Math.random() * d.lifespanSeconds;
    seeds[i] = Math.random() * Math.PI * 2;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(p, 3));
  const pts = new THREE.Points(g, new THREE.PointsMaterial({ color: 0xcac3b8, size: 1.15, transparent: true, opacity: 0.38, depthWrite: false, sizeAttenuation: true }));
  pts.userData = { d, ages, seeds, origin: new THREE.Vector3(d.position.x, d.position.y, d.position.z) };
  return pts;
}

function updateSmoke(pts, dt, now) {
  const { d, ages, seeds, origin } = pts.userData;
  const p = pts.geometry.attributes.position;
  const wind = d.wind;
  for (let i = 0; i < ages.length; i++) {
    ages[i] = (ages[i] + dt) % d.lifespanSeconds;
    const t = ages[i] / d.lifespanSeconds;
    const r = d.spawnRadius + t * 2.2;
    const swirl = Math.sin(now * 0.0015 + seeds[i] + t * 9) * d.turbulence;
    p.setXYZ(
      i,
      origin.x + wind.direction.x * wind.response * t * 5.5 + Math.cos(seeds[i]) * r * 0.35 + swirl * 0.25,
      origin.y + t * d.riseSpeed * d.lifespanSeconds,
      origin.z + wind.direction.z * wind.response * t * 5.5 + Math.sin(seeds[i]) * r * 0.35 + swirl * 0.18
    );
  }
  p.needsUpdate = true;
}

function grassMesh(placement) {
  const mesh = new THREE.InstancedMesh(new THREE.ConeGeometry(0.08, 0.5, 4), new THREE.MeshStandardMaterial({ color: 0x75b84d, roughness: 0.86 }), placement.patches.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), p = new THREE.Vector3(), s = new THREE.Vector3();
  placement.patches.forEach((patch, i) => {
    p.set(patch.transform.position.x, patch.transform.position.y + 0.25, patch.transform.position.z);
    q.setFromEuler(new THREE.Euler(0, patch.transform.rotation.y, 0));
    s.setScalar(patch.transform.scale.x || 1);
    m.compose(p, q, s);
    mesh.setMatrixAt(i, m);
  });
  mesh.instanceMatrix.needsUpdate = true;
  return mesh;
}

const cloudCache = new Map();
function rand(seed) {
  let s = 2166136261;
  for (const ch of seed) s = Math.imul(s ^ ch.charCodeAt(0), 16777619);
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967295;
  };
}

function cloudMaterial(opacity = 0.62) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    uniforms: { uOpacity: { value: opacity } },
    vertexShader: `attribute float size;attribute float alpha;attribute vec3 tint;varying float vAlpha;varying vec3 vTint;void main(){vAlpha=alpha;vTint=tint;vec4 mv=modelViewMatrix*vec4(position,1.0);gl_PointSize=size*(360.0/-mv.z);gl_Position=projectionMatrix*mv;}`,
    fragmentShader: `varying float vAlpha;varying vec3 vTint;uniform float uOpacity;void main(){vec2 p=gl_PointCoord-.5;float d=dot(p,p);float a=smoothstep(.25,.018,d)*vAlpha*uOpacity;if(a<.02)discard;gl_FragColor=vec4(vTint,a);}`
  });
}

function heroCloudGeometry(cloud) {
  const key = cloud.id;
  if (cloudCache.has(key)) return cloudCache.get(key);
  const random = rand(key);
  const count = cloud.pointCloud?.pointCount || 420;
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const alphas = new Float32Array(count);
  const tints = new Float32Array(count * 3);
  const scale = cloud.placement.scale;
  const lobeCount = cloud.silhouette.lobeCount || 7;

  for (let i = 0; i < count; i++) {
    const lobe = i % lobeCount;
    const angle = lobe / lobeCount * Math.PI * 2;
    const lobeRadius = 0.18 + random() * 0.72;
    const cx = Math.cos(angle) * scale.x * 0.22 * lobeRadius;
    const cz = Math.sin(angle) * scale.z * 0.22 * lobeRadius;
    const cy = Math.sin(lobe * 1.7) * scale.y * 0.08;
    let x, y, z;
    do {
      x = random() * 2 - 1;
      y = random() * 2 - 1;
      z = random() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    positions[i * 3] = cx + x * scale.x * (0.13 + random() * 0.09);
    positions[i * 3 + 1] = cy + y * scale.y * (0.14 + random() * 0.15) + Math.max(0, y) * scale.y * 0.12;
    positions[i * 3 + 2] = cz + z * scale.z * (0.13 + random() * 0.09);
    sizes[i] = cloud.pointCloud.pointSizeMin + random() * (cloud.pointCloud.pointSizeMax - cloud.pointCloud.pointSizeMin);
    alphas[i] = 0.25 + random() * 0.55;
    const shade = 0.91 + random() * 0.09;
    tints[i * 3] = shade;
    tints[i * 3 + 1] = shade * 0.98;
    tints[i * 3 + 2] = shade * 0.92;
  }

  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  g.setAttribute("alpha", new THREE.BufferAttribute(alphas, 1));
  g.setAttribute("tint", new THREE.BufferAttribute(tints, 3));
  g.computeBoundingSphere();
  cloudCache.set(key, g);
  return g;
}

function heroCloudGroup(contract) {
  const group = new THREE.Group();
  group.userData.savedPointClouds = [];
  for (const cloud of contract.clouds) {
    const pts = new THREE.Points(heroCloudGeometry(cloud), cloudMaterial(cloud.pointCloud.opacity));
    const p = cloud.placement.position;
    pts.position.set(p.x, p.y, p.z);
    pts.userData = { baseY: p.y, drift: cloud.drift, speed: cloud.driftSpeed, pointCount: pts.geometry.attributes.position.count };
    group.userData.savedPointClouds.push(pts.geometry);
    group.add(pts);
  }
  return group;
}

async function main() {
  setLoad(24);
  const islandState = createOceanIslandLandformState({ id: "cozy-island-001", seed: "cozy-island-standalone", radius: 100, maxHeight: 18, beachWidth: 10, shelfWidth: 36 });
  const landform = createOceanIslandLandformRenderContract(islandState, { heightfield: { resolution: 129 }, shoreline: { segments: 128 }, objects: { densityScale: 0 } });
  const h = p => sampleIslandHeight(islandState, { x: p.x, z: p.z });
  const masks = p => sampleIslandMasks(islandState, { x: p.x, z: p.z });
  const campfireY = h({ x: 0, z: 0 });

  setLoad(42);
  const clearing = createFencedClearingGraph({ parentId: "island:cozy-001", position: { x: 0, y: campfireY, z: 0 }, fenceRadiusMeters: 12, campfireRadiusMeters: 2.25, playerYaw: 0 });
  const anchor = clearing.byId["central-clearing:campfire:player-avatar-anchor"] || {};
  const anchorPosition = anchor.transform?.position || { x: 0, y: campfireY, z: 6 };
  const anchorRotation = anchor.transform?.rotation || { x: 0, y: 0, z: 0 };
  const graph = createDenseCozyIslandObjectGraph({ seed: "cozy-island-standalone", radiusMeters: 100, sampleHeight: h, sampleMasks: masks });
  const floorState = createOceanFloorState({ seed: "cozy-island-ocean-floor", size: 3600, resolution: 53, baseDepth: -128, islandRadius: 100, islandShelfRadius: 145, islandInfluenceRadius: 260, shelfDepth: -16, moundDepth: -42, noiseAmplitude: 9 });
  const floor = createOceanFloorRenderContract(floorState, { heightfield: { resolution: 53 }, objects: {} });

  setLoad(66);
  const wind = createGrassWindDescriptor({ id: "central-grove-soft-wind" });
  const fireGraph = createCampfireObjectGraph({ parentId: graph.rootId, position: { x: 0, y: campfireY, z: 0 }, radiusMeters: 1.45 });
  const smokeD = createSmokeParticleDescriptor({ parentId: fireGraph.rootId, position: { x: 0, y: campfireY + 1.25, z: 0 }, wind: { ...wind, response: 0.78 }, particleCount: 96 });
  const grass = createGrassPatchPlacementContract({ seed: "cozy-island-grass", count: 140, radiusMeters: 100, sampleHeight: h, sampleMasks: masks, pathNetwork: graph.pathNetwork, exclusionZones: clearing.clearanceZones });
  const cloudContract = createMattatzCloudRenderContract(createMattatzCloudsState({ seed: "cozy-island-clouds" }));

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, powerPreference: "high-performance" });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 1.5));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf3cfa6);
  scene.fog = new THREE.FogExp2(0xf3cfa6, 0.00072);

  const camera = new THREE.PerspectiveCamera(58, 1, 0.1, 6800);
  scene.add(new THREE.HemisphereLight(0xfff7e9, 0x2d5b64, 1.55));
  const sun = new THREE.DirectionalLight(0xffe1a3, 4.1);
  sun.position.set(-320, 520, 260);
  scene.add(sun);

  setLoad(86);
  const sea = waterMesh(floor.waterMaterial);
  const fire = campfireMesh(fireGraph);
  const smoke = smokeMesh(smokeD);
  const grassObj = grassMesh(grass);
  const clouds = heroCloudGroup(cloudContract);

  scene.add(
    floorMesh(floor.heightfield),
    terrainMesh(landform.heightfield),
    sea,
    foamMesh(landform.shoreline),
    pathMesh(graph.pathNetwork, h),
    objGroup(graph, clearing.objectExclusionZones || []),
    fenceGroup(clearing),
    fire,
    smoke,
    grassObj,
    clouds
  );

  setLoad(100);
  setTimeout(() => {
    if (loader) loader.style.opacity = "0";
    setTimeout(() => { if (loader) loader.hidden = true; }, 450);
  }, 200);

  const keys = new Set();
  const player = {
    position: new THREE.Vector3(anchorPosition.x, anchorPosition.y, anchorPosition.z),
    yaw: anchorRotation.y || 0,
    pitch: 0,
    eyeHeight: anchor.state?.eyeHeightMeters || 1.7,
    forward() { return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)); },
    eye() { return new THREE.Vector3(this.position.x, h(this.position) + this.eyeHeight, this.position.z); },
    look() { return new THREE.Vector3(-Math.sin(this.yaw) * Math.cos(this.pitch), Math.sin(this.pitch), -Math.cos(this.yaw) * Math.cos(this.pitch)); }
  };

  let progress = 0;
  let drag = null;
  let last = performance.now();

  function resize() {
    renderer.setSize(innerWidth, innerHeight, false);
    camera.aspect = innerWidth / innerHeight;
    camera.updateProjectionMatrix();
  }
  resize();
  addEventListener("resize", resize);
  addEventListener("keydown", e => keys.add(e.code));
  addEventListener("keyup", e => keys.delete(e.code));
  canvas.addEventListener("wheel", e => { e.preventDefault(); progress = clamp01(progress + e.deltaY * -0.0014); }, { passive: false });
  canvas.addEventListener("pointerdown", e => { drag = { x: e.clientX, y: e.clientY }; });
  canvas.addEventListener("pointerup", () => drag = null);
  canvas.addEventListener("pointermove", e => {
    if (!drag) return;
    const dx = e.clientX - drag.x;
    const dy = e.clientY - drag.y;
    if (progress >= 0.985) {
      player.yaw -= dx * 0.0025;
      player.pitch = Math.max(-1.1, Math.min(1, player.pitch - dy * 0.0025));
    } else if (progress < 0.85) {
      player.yaw -= dx * 0.0045;
    }
    drag = { x: e.clientX, y: e.clientY };
  });

  function rail() {
    const up = new THREE.Vector3(0, 1, 0);
    const base = player.position.clone();
    const f = player.forward();
    const eye = player.eye();
    const pts = [
      base.clone().sub(f.clone().multiplyScalar(520)).add(up.clone().multiplyScalar(155)),
      base.clone().sub(f.clone().multiplyScalar(260)).add(up.clone().multiplyScalar(105)),
      base.clone().sub(f.clone().multiplyScalar(95)).add(up.clone().multiplyScalar(42)),
      base.clone().sub(f.clone().multiplyScalar(12)).add(up.clone().multiplyScalar(7)),
      base.clone().sub(f.clone().multiplyScalar(3.2)).add(up.clone().multiplyScalar(2.2)),
      eye.clone()
    ];
    const looks = [
      new THREE.Vector3(0, campfireY + 4.8, 0),
      new THREE.Vector3(0, campfireY + 2.4, 0),
      base.clone().add(up.clone().multiplyScalar(1.2)),
      base.clone().add(up.clone().multiplyScalar(1.65)),
      eye.clone().add(f),
      eye.clone().add(f)
    ];
    return {
      position: new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.35).getPoint(ease(progress)),
      look: new THREE.CatmullRomCurve3(looks, false, "catmullrom", 0.35).getPoint(ease(progress))
    };
  }

  function valid(next) {
    const max = clearing.byId["central-clearing:campfire:collision-boundary"].state.radiusMeters;
    return Math.hypot(next.x, next.z) <= max && Math.hypot(next.x, next.z) >= 2.35;
  }

  function fp(dt) {
    const f = player.forward();
    const r = new THREE.Vector3(Math.cos(player.yaw), 0, -Math.sin(player.yaw));
    const m = new THREE.Vector3();
    if (keys.has("KeyW")) m.add(f);
    if (keys.has("KeyS")) m.sub(f);
    if (keys.has("KeyD")) m.add(r);
    if (keys.has("KeyA")) m.sub(r);
    if (m.lengthSq()) {
      const n = player.position.clone().add(m.normalize().multiplyScalar(2.6 * dt));
      n.y = h(n);
      if (valid(n)) player.position.copy(n);
    }
    const eye = player.eye();
    camera.position.copy(eye);
    camera.lookAt(eye.clone().add(player.look()));
  }

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    sea.position.y = -0.08 + Math.sin(now * 0.0012) * 0.18;
    if (progress >= 0.985) fp(dt);
    else {
      const p = rail();
      camera.position.copy(p.position);
      camera.lookAt(p.look);
    }
    updateSmoke(smoke, dt, now);
    fire.userData.flame.scale.setScalar(1 + Math.sin(now * 0.011) * 0.1);
    clouds.children.forEach(c => {
      c.position.x += (c.userData.drift?.x || 0) * c.userData.speed * dt * 18;
      c.position.z += (c.userData.drift?.z || 0) * c.userData.speed * dt * 18;
      c.position.y = c.userData.baseY + Math.sin(now * 0.00035) * 3.5;
    });
    renderer.render(scene, camera);
    requestAnimationFrame(frame);
  }

  globalThis.CozyIsland = { cloudContract, cloudPointCache: clouds.userData.savedPointClouds, getScrollProgress: () => progress };
  requestAnimationFrame(frame);
}

main().catch(fail);
