import * as THREE from "three/webgpu";
import {
  Fn,
  cos,
  float,
  positionLocal,
  sin,
  time,
  transformNormalToView,
  vec3
} from "three/tsl";

export function createWebGPUOceanRenderer({ waveState, optics, quality } = {}) {
  const segments = Number(quality.oceanSegments ?? 96);
  const geometry = new THREE.PlaneGeometry(2400, 2400, segments, segments);
  geometry.rotateX(-Math.PI / 2);
  const material = new THREE.MeshPhysicalNodeMaterial({
    color: new THREE.Color(optics.midColor),
    roughness: optics.roughness,
    metalness: optics.metalness,
    transparent: true,
    opacity: optics.opacity,
    side: THREE.DoubleSide,
    depthWrite: false,
    clearcoat: optics.clearcoat,
    clearcoatRoughness: optics.clearcoatRoughness
  });

  const waveNodes = waveState.waves.map(wave => ({
    dx: float(wave.direction.x),
    dz: float(wave.direction.z),
    amplitude: float(wave.amplitude),
    frequency: float(Math.PI * 2 / wave.wavelength),
    speed: float(wave.speed)
  }));
  const waveHeight = Fn(() => {
    let result = float(0).toVar();
    for (const wave of waveNodes) {
      const phase = positionLocal.x.mul(wave.dx).add(positionLocal.z.mul(wave.dz)).mul(wave.frequency).add(time.mul(wave.speed));
      result.addAssign(sin(phase).mul(wave.amplitude));
    }
    return result;
  });
  material.positionNode = Fn(() => vec3(positionLocal.x, positionLocal.y.add(waveHeight()), positionLocal.z))();
  material.normalNode = Fn(() => {
    let slopeX = float(0).toVar();
    let slopeZ = float(0).toVar();
    for (const wave of waveNodes) {
      const phase = positionLocal.x.mul(wave.dx).add(positionLocal.z.mul(wave.dz)).mul(wave.frequency).add(time.mul(wave.speed));
      const derivative = cos(phase).mul(wave.amplitude).mul(wave.frequency);
      slopeX.addAssign(derivative.mul(wave.dx));
      slopeZ.addAssign(derivative.mul(wave.dz));
    }
    return transformNormalToView(vec3(slopeX.negate(), 1, slopeZ.negate()).normalize()).toVertexStage();
  })();

  const mesh = new THREE.Mesh(geometry, material);
  mesh.name = "webgpu-ocean-surface";
  mesh.position.y = waveState.seaLevel;
  mesh.receiveShadow = true;
  mesh.renderOrder = 2;
  return Object.freeze({ mesh, material });
}

function foamRibbonGeometry(points, width) {
  const vertexCount = points.length * 2;
  const positions = new Float32Array(vertexCount * 3);
  const uvs = new Float32Array(vertexCount * 2);
  const indices = new Uint32Array(points.length * 6);
  for (let index = 0; index < points.length; index += 1) {
    const previous = points[(index - 1 + points.length) % points.length];
    const current = points[index];
    const next = points[(index + 1) % points.length];
    const tx = next.x - previous.x;
    const tz = next.z - previous.z;
    const length = Math.hypot(tx, tz) || 1;
    const nx = -tz / length;
    const nz = tx / length;
    const inner = index * 2;
    const outer = inner + 1;
    positions[inner * 3] = current.x - nx * width * 0.5;
    positions[inner * 3 + 1] = current.y;
    positions[inner * 3 + 2] = current.z - nz * width * 0.5;
    positions[outer * 3] = current.x + nx * width * 0.5;
    positions[outer * 3 + 1] = current.y + 0.015;
    positions[outer * 3 + 2] = current.z + nz * width * 0.5;
    uvs[inner * 2] = index / points.length;
    uvs[inner * 2 + 1] = 0;
    uvs[outer * 2] = index / points.length;
    uvs[outer * 2 + 1] = 1;
    const nextInner = ((index + 1) % points.length) * 2;
    const nextOuter = nextInner + 1;
    const cursor = index * 6;
    indices[cursor] = inner;
    indices[cursor + 1] = outer;
    indices[cursor + 2] = nextInner;
    indices[cursor + 3] = nextInner;
    indices[cursor + 4] = outer;
    indices[cursor + 5] = nextOuter;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
  geometry.setIndex(new THREE.BufferAttribute(indices, 1));
  geometry.computeVertexNormals();
  return geometry;
}

export function createWebGPUFoamRenderer(foamDescriptor) {
  const group = new THREE.Group();
  group.name = "animated-shoreline-foam";
  const meshes = [];
  for (const band of foamDescriptor.bands) {
    const material = new THREE.MeshBasicNodeMaterial({
      color: 0xfff5dc,
      transparent: true,
      opacity: band.opacity,
      side: THREE.DoubleSide,
      depthWrite: false
    });
    const mesh = new THREE.Mesh(foamRibbonGeometry(band.points, band.width), material);
    mesh.name = band.id;
    mesh.renderOrder = 4;
    mesh.userData.band = band;
    meshes.push(mesh);
    group.add(mesh);
  }
  function update(elapsedSeconds = 0) {
    for (const mesh of meshes) {
      const band = mesh.userData.band;
      mesh.material.opacity = band.opacity * (0.78 + Math.sin(elapsedSeconds * band.speed * 2.3 + band.phase) * 0.16);
      mesh.position.y = Math.sin(elapsedSeconds * band.speed + band.phase) * 0.055;
    }
  }
  return Object.freeze({ group, update });
}
