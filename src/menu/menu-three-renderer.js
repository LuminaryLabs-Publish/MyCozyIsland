import * as THREE from "three/webgpu";
import {
  color,
  float,
  Fn,
  instanceIndex,
  instancedBufferAttribute,
  mix,
  pass,
  positionLocal,
  shapeCircle,
  smoothstep,
  storage,
  time,
  uniform,
  vec3
} from "three/tsl";
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { chooseMenuQuality } from "./menu-scene-recipe.js";
import { createFlowerAtlas, createPalmFrondAtlas } from "./menu-textures.js";

const clamp = (value, minimum, maximum) => Math.max(minimum, Math.min(maximum, value));
const seededRandom = (seed) => {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967296;
  };
};

function createSky(recipe) {
  const material = new THREE.MeshBasicNodeMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    fog: false
  });

  const height = positionLocal.normalize().y.mul(0.5).add(0.5);
  const lowerBase = mix(
    color(recipe.lower),
    color(recipe.horizon),
    smoothstep(float(0.02), float(0.44), height)
  );
  const sunsetWeight = smoothstep(float(0.08), float(0.3), height)
    .mul(float(1).sub(smoothstep(float(0.46), float(0.7), height)));
  const lower = mix(lowerBase, color(recipe.sunsetBand), sunsetWeight.mul(0.58));
  const middle = mix(
    lower,
    color(recipe.upper),
    smoothstep(float(0.34), float(0.76), height)
  );
  material.colorNode = mix(
    middle,
    color(recipe.zenith),
    smoothstep(float(0.7), float(1), height)
  );

  const sky = new THREE.Mesh(new THREE.SphereGeometry(48, 56, 28), material);
  sky.name = "menu-sky";
  sky.frustumCulled = false;
  sky.renderOrder = -30;
  return sky;
}

function createSun(recipe) {
  const group = new THREE.Group();
  group.name = "menu-sunset-sun";

  const glowMaterial = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: 0.16,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    fog: false
  });
  glowMaterial.colorNode = color(recipe.sunGlow).mul(2.1);
  const glow = new THREE.Mesh(new THREE.CircleGeometry(recipe.glowRadius, 64), glowMaterial);
  glow.position.set(...recipe.sunPosition);
  glow.renderOrder = -28;
  group.add(glow);

  const discMaterial = new THREE.MeshBasicNodeMaterial({
    depthWrite: false,
    side: THREE.DoubleSide,
    fog: false
  });
  discMaterial.colorNode = color(recipe.sunColor).mul(1.35);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(recipe.sunRadius, 64), discMaterial);
  disc.position.set(...recipe.sunPosition);
  disc.position.z += 0.06;
  disc.renderOrder = -27;
  group.add(disc);

  return group;
}

function createHorizonGeometry(layer, segments) {
  const positions = [];
  const indices = [];
  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const x = (t - 0.5) * layer.width;
    const top = Math.sin(t * Math.PI * 2 * layer.frequency + layer.phase) * layer.amplitude
      + Math.sin(t * Math.PI * 5.1 + layer.phase * 0.7) * layer.amplitude * 0.34;
    positions.push(x, top, 0, x, top - layer.depth, 0);
  }
  for (let index = 0; index < segments; index += 1) {
    const offset = index * 2;
    indices.push(offset, offset + 2, offset + 1, offset + 1, offset + 2, offset + 3);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createDeepHorizon(recipe, quality) {
  const group = new THREE.Group();
  group.name = "menu-deep-horizon";

  for (const layer of recipe.layers) {
    const material = new THREE.MeshBasicNodeMaterial({
      color: layer.color,
      transparent: true,
      opacity: layer.opacity,
      depthWrite: false,
      fog: true,
      side: THREE.DoubleSide
    });
    const mesh = new THREE.Mesh(createHorizonGeometry(layer, quality.horizonSegments), material);
    mesh.name = `menu-horizon-${layer.id}`;
    mesh.position.set(0, layer.y, layer.z);
    mesh.renderOrder = -18;
    group.add(mesh);
  }

  return group;
}

function createCurvedBandGeometry({ width, depth, segments, curvature }) {
  const positions = [];
  const indices = [];
  for (let index = 0; index <= segments; index += 1) {
    const t = index / segments;
    const x = (t - 0.5) * width;
    const arc = Math.sin((t - 0.5) * Math.PI) * curvature;
    const ripple = Math.sin(t * Math.PI * 7.5) * 0.035;
    const front = arc + ripple;
    const back = front - depth * (0.84 + Math.sin(t * Math.PI) * 0.16);
    positions.push(x, 0, front, x, 0, back);
  }
  for (let index = 0; index < segments; index += 1) {
    const offset = index * 2;
    indices.push(offset, offset + 1, offset + 2, offset + 1, offset + 3, offset + 2);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  return geometry;
}

function createShoreline(recipe) {
  const material = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: recipe.opacity,
    depthWrite: false,
    fog: true,
    side: THREE.DoubleSide
  });
  const edge = positionLocal.z.add(recipe.depth).div(recipe.depth).clamp(0, 1);
  material.colorNode = mix(color(recipe.highlight), color(recipe.color), edge);

  const shoreline = new THREE.Mesh(
    createCurvedBandGeometry(recipe),
    material
  );
  shoreline.name = "menu-distant-shoreline";
  shoreline.position.set(...recipe.position);
  shoreline.renderOrder = -8;
  return shoreline;
}

function createWater(recipe, quality) {
  const group = new THREE.Group();
  group.name = "menu-water-composition";

  const [segmentsX, segmentsZ] = quality.waterSegments;
  const geometry = new THREE.PlaneGeometry(recipe.width, recipe.depth, segmentsX, segmentsZ);
  geometry.rotateX(-Math.PI * 0.5);

  const material = new THREE.MeshPhysicalNodeMaterial({
    roughness: recipe.roughness,
    metalness: 0,
    clearcoat: recipe.clearcoat,
    clearcoatRoughness: 0.3,
    ior: 1.333,
    transparent: true,
    opacity: recipe.opacity,
    depthWrite: false
  });
  const waveA = positionLocal.x
    .mul(recipe.waveA.frequency)
    .add(time.mul(recipe.waveA.speed))
    .sin()
    .mul(recipe.waveA.amplitude);
  const waveB = positionLocal.z
    .mul(recipe.waveB.frequency)
    .add(time.mul(recipe.waveB.speed))
    .sin()
    .mul(recipe.waveB.amplitude);
  const crossWave = positionLocal.x
    .add(positionLocal.z.mul(0.7))
    .mul(0.42)
    .sub(time.mul(0.12))
    .sin()
    .mul(0.012);
  const wave = waveA.add(waveB).add(crossWave);
  material.positionNode = positionLocal.add(vec3(0, wave, 0));
  material.colorNode = mix(
    color(recipe.nearColor),
    color(recipe.farColor),
    positionLocal.z.add(recipe.depth * 0.5).div(recipe.depth).clamp(0, 1)
  ).add(color(recipe.highlightColor).mul(wave.max(0).mul(1.8)));
  material.roughnessNode = float(recipe.roughness).add(wave.abs().mul(1.35));

  const water = new THREE.Mesh(geometry, material);
  water.name = "menu-water-strip";
  water.position.set(...recipe.position);
  water.receiveShadow = true;
  water.renderOrder = -10;
  group.add(water);

  const foamGeometry = createCurvedBandGeometry({
    width: recipe.foam.width,
    depth: recipe.foam.depth,
    segments: Math.max(32, Math.floor(segmentsX * 0.9)),
    curvature: 0.32
  });
  const foamMaterial = new THREE.MeshBasicNodeMaterial({
    transparent: true,
    opacity: recipe.foam.opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    fog: true,
    side: THREE.DoubleSide
  });
  const foamWave = positionLocal.x.mul(0.72).add(time.mul(0.22)).sin().mul(0.035);
  foamMaterial.positionNode = positionLocal.add(vec3(0, foamWave, 0));
  foamMaterial.colorNode = color("#fff5d6").mul(1.18);
  const foam = new THREE.Mesh(foamGeometry, foamMaterial);
  foam.name = "menu-cozy-wave-foam";
  foam.position.set(...recipe.foam.position);
  foam.renderOrder = -7;
  group.add(foam);

  return group;
}

function createFrondCardGeometry({ length, width, droop, variant, variants, segments }) {
  const positions = [];
  const uvs = [];
  const indices = [];

  for (let segment = 0; segment <= segments; segment += 1) {
    const t = segment / segments;
    const x = length * t;
    const y = -droop * t * t;
    const centerZ = Math.sin(t * Math.PI) * 0.085;
    const halfWidth = width * (0.18 + Math.sin(Math.PI * t) * 0.82) * 0.5;
    const u = (variant + t) / variants;
    positions.push(x, y, centerZ - halfWidth, x, y, centerZ + halfWidth);
    uvs.push(u, 0, u, 1);
  }

  for (let segment = 0; segment < segments; segment += 1) {
    const offset = segment * 2;
    indices.push(offset, offset + 2, offset + 1, offset + 1, offset + 2, offset + 3);
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
  geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  geometry.setIndex(indices);
  geometry.computeVertexNormals();
  geometry.computeBoundingSphere();
  return geometry;
}

function createWindField(count) {
  const buffer = new THREE.StorageBufferAttribute(count, 1);
  const values = storage(buffer, "float", count);
  const compute = Fn(() => {
    const phase = float(instanceIndex).mul(0.83);
    const gust = time
      .mul(0.46)
      .add(phase)
      .sin()
      .add(time.mul(0.17).add(phase.mul(1.37)).sin().mul(0.28));
    values.element(instanceIndex).assign(gust);
  })().compute(count).setName("Menu Hero Palm Wind Field");
  return { values, compute };
}

function createTrunkMaterial({ reducedMotion, windBoost }) {
  const material = new THREE.MeshStandardNodeMaterial({ roughness: 0.9, metalness: 0 });
  const height = positionLocal.y.div(4.6).clamp(0, 1);
  const rings = positionLocal.y.mul(10.5).add(positionLocal.x.mul(3.4)).sin().mul(0.5).add(0.5);
  const fibers = positionLocal.x.mul(19).add(positionLocal.z.mul(13)).sin().abs();
  material.colorNode = mix(
    color("#5d3825"),
    color("#ad7547"),
    rings.mul(0.48).add(height.mul(0.22))
  );
  material.roughnessNode = float(0.76).add(rings.mul(0.13)).add(fibers.mul(0.06));
  const sway = time
    .mul(0.31)
    .sin()
    .mul(height.pow(2))
    .mul(reducedMotion ? 0 : 0.021)
    .mul(windBoost);
  material.positionNode = positionLocal.add(vec3(sway, 0, sway.mul(0.2)));
  return material;
}

function createFrondMaterial({ atlas, index, length, alphaTest, windValues, windBoost, reducedMotion }) {
  const material = new THREE.MeshPhysicalNodeMaterial({
    map: atlas,
    alphaTest,
    transparent: false,
    side: THREE.DoubleSide,
    depthWrite: true,
    roughness: 0.64,
    metalness: 0,
    clearcoat: 0.035,
    clearcoatRoughness: 0.84,
    sheen: 0.08,
    sheenColor: new THREE.Color("#e4efaf"),
    sheenRoughness: 0.8,
    alphaToCoverage: true
  });

  const along = positionLocal.x.div(length).clamp(0, 1);
  const phase = index * 0.83;
  const signal = windValues
    ? windValues.element(index)
    : time.mul(0.46).add(phase).sin().add(time.mul(0.17).add(phase * 1.37).sin().mul(0.28));
  const gust = signal
    .mul(reducedMotion ? 0 : 0.095)
    .mul(along.pow(1.55))
    .mul(windBoost);
  material.positionNode = positionLocal.add(vec3(
    gust.mul(0.04),
    gust.mul(0.075),
    gust.mul(0.29)
  ));
  material.roughnessNode = float(0.61).add(positionLocal.x.mul(5.7).sin().abs().mul(0.09));
  return material;
}

function createPalm({ recipe, atlas, windValues, windBoost, reducedMotion }) {
  const palm = new THREE.Group();
  palm.name = "menu-hero-palm";
  palm.position.set(...recipe.position);
  palm.rotation.set(...recipe.rotation);
  palm.scale.setScalar(recipe.scale);

  const trunkCurve = new THREE.CatmullRomCurve3(
    recipe.trunkPoints.map((point) => new THREE.Vector3(...point))
  );
  const trunk = new THREE.Mesh(
    new THREE.TubeGeometry(
      trunkCurve,
      recipe.trunkSegments,
      recipe.trunkRadius,
      recipe.radialSegments,
      false
    ),
    createTrunkMaterial({ reducedMotion, windBoost })
  );
  trunk.name = "menu-palm-trunk";
  trunk.castShadow = true;
  trunk.receiveShadow = true;
  palm.add(trunk);

  const crown = new THREE.Group();
  crown.name = "menu-palm-crown";
  crown.position.copy(trunkCurve.getPoint(1));
  palm.add(crown);

  const hub = new THREE.Mesh(
    new THREE.SphereGeometry(recipe.hubRadius, 18, 12),
    new THREE.MeshStandardNodeMaterial({ color: "#6e4b36", roughness: 0.88, metalness: 0 })
  );
  hub.name = "menu-palm-crown-hub";
  hub.scale.set(1.08, 0.74, 1);
  hub.castShadow = true;
  crown.add(hub);

  const { count, variants, cardSegments, length, width, droop, alphaTest } = recipe.fronds;
  for (let index = 0; index < count; index += 1) {
    const cardLength = length + (index % 3) * 0.18;
    const card = new THREE.Mesh(
      createFrondCardGeometry({
        length: cardLength,
        width: width + (index % 2) * 0.12,
        droop: droop + (index % 3) * 0.075,
        variant: index % variants,
        variants,
        segments: cardSegments
      }),
      createFrondMaterial({
        atlas,
        index,
        length: cardLength,
        alphaTest,
        windValues,
        windBoost,
        reducedMotion
      })
    );
    const angle = index / count * Math.PI * 2;
    const tier = index % 3;
    card.name = `menu-palm-frond-card-${index}`;
    card.rotation.set(-0.18 + tier * 0.075, angle, -0.04 + Math.sin(angle) * 0.07);
    card.castShadow = true;
    crown.add(card);
  }

  const contactMaterial = new THREE.MeshBasicNodeMaterial({
    color: "#31554a",
    transparent: true,
    opacity: 0.14,
    depthWrite: false,
    fog: true
  });
  const contactShadow = new THREE.Mesh(new THREE.CircleGeometry(0.82, 40), contactMaterial);
  contactShadow.name = "menu-palm-contact-shadow";
  contactShadow.rotation.x = -Math.PI * 0.5;
  contactShadow.position.set(0.03, 0.01, 0.02);
  contactShadow.scale.set(1.45, 0.72, 1);
  palm.add(contactShadow);

  return palm;
}

function createBackgroundFlowers(recipe, texture) {
  const group = new THREE.Group();
  group.name = "menu-background-flowers";
  const variants = 4;

  for (const [index, cluster] of recipe.clusters.entries()) {
    const geometry = new THREE.PlaneGeometry(2.25, 0.92);
    const uv = geometry.getAttribute("uv");
    const start = cluster.variant / variants;
    const end = (cluster.variant + 1) / variants;
    for (let vertex = 0; vertex < uv.count; vertex += 1) {
      uv.setX(vertex, start + uv.getX(vertex) * (end - start));
    }
    uv.needsUpdate = true;

    const material = new THREE.MeshBasicNodeMaterial({
      map: texture,
      alphaTest: 0.04,
      transparent: true,
      opacity: cluster.opacity,
      depthWrite: false,
      side: THREE.DoubleSide,
      fog: true
    });
    const card = new THREE.Mesh(geometry, material);
    card.name = `menu-flower-card-${index}`;
    card.position.set(...cluster.position);
    card.rotation.y = cluster.rotationY;
    card.scale.setScalar(cluster.scale);
    group.add(card);
  }

  return group;
}

function createWindParticles({ recipe, count, windBoost }) {
  const random = seededRandom(0x5f3759df);
  const positions = new Float32Array(count * 3);
  const phases = new Float32Array(count);
  const speeds = new Float32Array(count);
  const sizes = new Float32Array(count);

  for (let index = 0; index < count; index += 1) {
    positions[index * 3] = THREE.MathUtils.lerp(recipe.bounds.x[0], recipe.bounds.x[1], random());
    positions[index * 3 + 1] = THREE.MathUtils.lerp(recipe.bounds.y[0], recipe.bounds.y[1], random());
    positions[index * 3 + 2] = THREE.MathUtils.lerp(recipe.bounds.z[0], recipe.bounds.z[1], random());
    phases[index] = random() * Math.PI * 2;
    speeds[index] = THREE.MathUtils.lerp(recipe.baseSpeed, recipe.gustSpeed, random());
    sizes[index] = THREE.MathUtils.lerp(recipe.minSize, recipe.maxSize, random());
  }

  const positionAttribute = new THREE.InstancedBufferAttribute(positions, 3);
  const phaseAttribute = new THREE.InstancedBufferAttribute(phases, 1);
  const speedAttribute = new THREE.InstancedBufferAttribute(speeds, 1);
  const sizeAttribute = new THREE.InstancedBufferAttribute(sizes, 1);

  const basePosition = instancedBufferAttribute(positionAttribute);
  const phase = instancedBufferAttribute(phaseAttribute);
  const speed = instancedBufferAttribute(speedAttribute);
  const size = instancedBufferAttribute(sizeAttribute);
  const drift = time.mul(speed).mul(windBoost).add(phase);
  const horizontal = drift.sin().mul(0.42).add(drift.mul(0.37).sin().mul(0.16));
  const vertical = drift.mul(0.61).sin().mul(0.18);
  const depth = drift.mul(0.29).cos().mul(0.32);
  const colorPhase = phase.sin().mul(0.5).add(0.5);
  const particleColor = mix(
    color(recipe.colors[0]),
    mix(color(recipe.colors[1]), color(recipe.colors[2]), colorPhase),
    drift.mul(0.21).sin().mul(0.5).add(0.5)
  );

  const material = new THREE.PointsNodeMaterial({
    colorNode: particleColor,
    opacityNode: shapeCircle().mul(recipe.opacity).mul(drift.mul(0.72).sin().mul(0.18).add(0.82)),
    positionNode: basePosition.add(vec3(horizontal, vertical, depth)),
    sizeNode: size,
    sizeAttenuation: false,
    transparent: true,
    depthWrite: false,
    alphaToCoverage: true,
    blending: THREE.NormalBlending
  });

  const particles = new THREE.Sprite(material);
  particles.name = "menu-wind-particles";
  particles.count = count;
  particles.renderOrder = 2;
  return particles;
}

function addLighting(scene, recipe, shadowMapSize) {
  const hemisphere = new THREE.HemisphereLight(
    recipe.hemisphere.sky,
    recipe.hemisphere.ground,
    recipe.hemisphere.intensity
  );
  scene.add(hemisphere);

  const sun = new THREE.DirectionalLight(recipe.sun.color, recipe.sun.intensity);
  sun.position.set(...recipe.sun.position);
  sun.castShadow = true;
  sun.shadow.mapSize.set(shadowMapSize, shadowMapSize);
  sun.shadow.camera.left = -8;
  sun.shadow.camera.right = 8;
  sun.shadow.camera.top = 8;
  sun.shadow.camera.bottom = -8;
  sun.shadow.camera.near = 0.1;
  sun.shadow.camera.far = 34;
  sun.shadow.bias = -0.00012;
  sun.shadow.normalBias = 0.028;
  scene.add(sun);

  const fill = new THREE.DirectionalLight(recipe.fill.color, recipe.fill.intensity);
  fill.position.set(...recipe.fill.position);
  scene.add(fill);

  const rim = new THREE.DirectionalLight(recipe.rim.color, recipe.rim.intensity);
  rim.position.set(...recipe.rim.position);
  scene.add(rim);
}

export async function createMenuThreeRenderer({ canvas, recipe, reducedMotion = false }) {
  if (!canvas) throw new Error("Missing menu canvas.");

  const renderer = new THREE.WebGPURenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: "high-performance",
    outputBufferType: THREE.HalfFloatType
  });
  await renderer.init();

  const backend = renderer.backend?.isWebGPUBackend ? "webgpu" : "webgl2";
  const quality = chooseMenuQuality({
    backend,
    width: innerWidth,
    height: innerHeight,
    devicePixelRatio,
    hardwareConcurrency: navigator.hardwareConcurrency ?? 4
  });

  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = recipe.post.exposure;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(recipe.sky.background);
  scene.fog = new THREE.Fog(recipe.horizon.fogColor, recipe.horizon.fogNear, recipe.horizon.fogFar);

  const camera = new THREE.PerspectiveCamera(recipe.camera.fov, 1, recipe.camera.near, recipe.camera.far);
  const baseCameraPosition = new THREE.Vector3(...recipe.camera.position);
  const baseCameraTarget = new THREE.Vector3(...recipe.camera.target);
  const currentCameraPosition = baseCameraPosition.clone();
  const currentCameraTarget = baseCameraTarget.clone();
  const pointerTarget = new THREE.Vector2();
  const pointerCurrent = new THREE.Vector2();
  const cameraOffset = new THREE.Vector3();
  const targetOffset = new THREE.Vector3();
  const responsivePalmOffset = new THREE.Vector3();
  const windBoost = uniform(1);
  let targetWindBoost = 1;
  let running = true;
  let disposed = false;

  let windValues = null;
  let windCompute = null;
  if (backend === "webgpu") {
    const windField = createWindField(recipe.palm.fronds.count);
    windValues = windField.values;
    windCompute = windField.compute;
  }

  scene.add(createSky(recipe.sky));
  scene.add(createSun(recipe.sky));
  scene.add(createDeepHorizon(recipe.horizon, quality));
  scene.add(createWater(recipe.water, quality));
  scene.add(createShoreline(recipe.shoreline));

  const flowerAtlas = createFlowerAtlas();
  scene.add(createBackgroundFlowers(recipe.flowers, flowerAtlas));

  addLighting(scene, recipe.lighting, quality.shadowMapSize);

  const frondAtlas = createPalmFrondAtlas({ variants: recipe.palm.fronds.variants });
  const palm = createPalm({
    recipe: recipe.palm,
    atlas: frondAtlas,
    windValues,
    windBoost,
    reducedMotion
  });
  scene.add(palm);

  const windParticles = createWindParticles({
    recipe: recipe.windParticles,
    count: quality.particleCount,
    windBoost
  });
  scene.add(windParticles);

  const renderPipeline = new THREE.RenderPipeline(renderer);
  const scenePass = pass(scene, camera);
  const sceneColor = scenePass.getTextureNode("output");
  const bloomPass = bloom(
    sceneColor,
    recipe.post.bloom.strength,
    recipe.post.bloom.radius,
    recipe.post.bloom.threshold
  );
  bloomPass.setResolutionScale(recipe.post.bloom.resolutionScale);
  renderPipeline.outputNode = sceneColor.add(bloomPass);

  function applyResponsiveComposition(width, height) {
    const aspect = width / Math.max(1, height);
    const portrait = aspect < 0.82;
    const shortLandscape = aspect > 1.45 && height < 700;
    const profile = portrait
      ? recipe.camera.portrait
      : shortLandscape
        ? recipe.camera.shortLandscape
        : null;

    baseCameraPosition.set(...(profile?.position ?? recipe.camera.position));
    baseCameraTarget.set(...(profile?.target ?? recipe.camera.target));
    camera.fov = profile?.fov ?? recipe.camera.fov;
    camera.aspect = aspect;
    camera.updateProjectionMatrix();

    palm.position.set(...recipe.palm.position);
    const offset = profile?.palmOffset ?? [0, 0, 0];
    responsivePalmOffset.set(...offset);
    palm.position.add(responsivePalmOffset);
    palm.scale.setScalar(recipe.palm.scale * (profile?.palmScale ?? 1));
  }

  function resize() {
    const width = Math.max(1, innerWidth);
    const height = Math.max(1, innerHeight);
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, quality.dprCap));
    renderer.setSize(width, height, false);
    applyResponsiveComposition(width, height);
  }

  function render() {
    if (!running || disposed) return;

    pointerCurrent.lerp(pointerTarget, recipe.interaction.pointerDamping);
    targetWindBoost = THREE.MathUtils.lerp(
      targetWindBoost,
      1,
      recipe.interaction.windBoostDecay
    );
    windBoost.value = THREE.MathUtils.lerp(
      windBoost.value,
      targetWindBoost,
      recipe.interaction.pointerDamping
    );

    cameraOffset.set(
      pointerCurrent.x * recipe.camera.parallax[0],
      pointerCurrent.y * recipe.camera.parallax[1],
      0
    );
    targetOffset.set(
      pointerCurrent.x * recipe.camera.lookParallax[0],
      pointerCurrent.y * recipe.camera.lookParallax[1],
      0
    );
    currentCameraPosition.copy(baseCameraPosition).add(cameraOffset);
    currentCameraTarget.copy(baseCameraTarget).add(targetOffset);
    camera.position.lerp(currentCameraPosition, 0.085);
    camera.lookAt(currentCameraTarget);

    if (windCompute) renderer.compute(windCompute);
    renderPipeline.render();
  }

  function setPointer(normalizedX, normalizedY, energy = 0) {
    pointerTarget.set(clamp(normalizedX, -1, 1), clamp(normalizedY, -1, 1));
    targetWindBoost = Math.max(
      targetWindBoost,
      THREE.MathUtils.lerp(1, recipe.interaction.pointerWindBoost, clamp(energy, 0, 1))
    );
  }

  function setFocus(focused) {
    if (focused) targetWindBoost = Math.max(targetWindBoost, recipe.interaction.hoverWindBoost);
  }

  function setActive(active) {
    if (disposed) return;
    running = Boolean(active);
    renderer.setAnimationLoop(running ? render : null);
    if (running) render();
  }

  function dispose() {
    if (disposed) return;
    disposed = true;
    running = false;
    renderer.setAnimationLoop(null);

    const geometries = new Set();
    const materials = new Set();
    const textures = new Set([frondAtlas, flowerAtlas]);
    scene.traverse((object) => {
      if (object.geometry) geometries.add(object.geometry);
      const objectMaterials = Array.isArray(object.material) ? object.material : [object.material];
      for (const material of objectMaterials) {
        if (!material) continue;
        materials.add(material);
        if (material.map) textures.add(material.map);
      }
    });
    for (const geometry of geometries) geometry.dispose?.();
    for (const material of materials) material.dispose?.();
    for (const texture of textures) texture?.dispose?.();
    removeEventListener("resize", resize);
    renderPipeline.dispose?.();
    renderer.dispose();
  }

  addEventListener("resize", resize);
  resize();
  renderer.setAnimationLoop(render);

  return Object.freeze({
    renderer,
    scene,
    camera,
    palm,
    windParticles,
    backend,
    quality,
    setPointer,
    setFocus,
    setActive,
    resize,
    dispose,
    getState: () => ({
      recipeId: recipe.id,
      backend,
      quality: quality.tier,
      frondCards: recipe.palm.fronds.count,
      particleCount: quality.particleCount,
      windCompute: Boolean(windCompute),
      negativeSpace: recipe.composition.negativeSpace
    })
  });
}
