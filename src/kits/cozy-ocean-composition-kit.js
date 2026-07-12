import { COZY_RENDER_LAYERS } from "./render-layers.js";

const freezeStrings = values => Object.freeze([...(values ?? [])].map(String));

function pass(config) {
  return Object.freeze({
    id: String(config.id),
    passId: String(config.passId ?? config.id),
    semanticLayer: String(config.semanticLayer ?? config.id),
    stage: String(config.stage ?? "scene-content"),
    order: Number(config.order ?? 0),
    sceneContent: config.sceneContent !== false,
    technical: config.technical === true,
    transparent: config.transparent === true,
    reads: freezeStrings(config.reads),
    writes: freezeStrings(config.writes),
    requires: freezeStrings(config.requires),
    mustRunAfter: freezeStrings(config.mustRunAfter),
    mustRunBefore: freezeStrings(config.mustRunBefore),
    depth: Object.freeze({
      test: config.depth?.test !== false,
      write: config.depth?.write === true,
      source: config.depth?.source ?? null
    }),
    blend: Object.freeze({
      mode: config.blend?.mode ?? "none",
      premultipliedAlpha: config.blend?.premultipliedAlpha === true
    }),
    metadata: Object.freeze({ ...(config.metadata ?? {}) })
  });
}

export function createCozyOceanLayerGraph() {
  return Object.freeze({
    id: "cozy-ocean-render-layer-graph",
    version: "1.0.0",
    finalScenePassId: "foam-overlay",
    metadata: Object.freeze({
      terrainHandoff: Object.freeze({
        islandShelfDepth: -5,
        seaFloorMinimumDepth: -7,
        minimumVerticalGap: 1
      }),
      finalSceneContent: "foam-overlay"
    }),
    externalInputs: Object.freeze([
      "sky-environment",
      "ocean-wave-state",
      "seafloor-height",
      "shoreline-distance",
      "foam-state",
      "fog-density",
      "lighting-state"
    ]),
    passes: Object.freeze([
      pass({
        id: "background",
        order: 0,
        semanticLayer: "sky-and-clouds",
        reads: ["sky-environment", "lighting-state"],
        writes: ["background-color", "environment-reflection"],
        depth: { test: false, write: false },
        metadata: { layer: COZY_RENDER_LAYERS.CLOUD_VOLUME }
      }),
      pass({
        id: "opaque-world",
        order: 10,
        semanticLayer: "island-and-seafloor",
        reads: ["background-color", "seafloor-height", "lighting-state"],
        writes: ["opaque-color", "opaque-depth", "opaque-normal", "opaque-material-id"],
        requires: ["background"],
        depth: { test: true, write: true },
        metadata: { layer: COZY_RENDER_LAYERS.OPAQUE_WORLD }
      }),
      pass({
        id: "water-composite",
        order: 20,
        semanticLayer: "anime-ocean-surface",
        reads: [
          "opaque-color",
          "opaque-depth",
          "opaque-normal",
          "environment-reflection",
          "ocean-wave-state",
          "seafloor-height"
        ],
        writes: ["water-composited-color", "water-mask", "water-surface-depth"],
        requires: ["opaque-world"],
        transparent: true,
        depth: { test: true, write: false, source: "opaque-depth" },
        blend: { mode: "premultiplied-alpha", premultipliedAlpha: true },
        metadata: { layer: COZY_RENDER_LAYERS.WATER_SURFACE }
      }),
      pass({
        id: "atmosphere-composite",
        order: 30,
        semanticLayer: "rolling-fog-and-aerial-perspective",
        reads: ["water-composited-color", "opaque-depth", "water-mask", "fog-density", "lighting-state"],
        writes: ["atmosphere-composited-color", "fog-transmittance"],
        requires: ["water-composite"],
        transparent: true,
        depth: { test: false, write: false, source: "opaque-depth" },
        blend: { mode: "additive" },
        metadata: { layer: COZY_RENDER_LAYERS.FOG_VOLUME }
      }),
      pass({
        id: "foam-overlay",
        order: 40,
        semanticLayer: "shoreline-foam",
        reads: [
          "atmosphere-composited-color",
          "water-mask",
          "water-surface-depth",
          "shoreline-distance",
          "foam-state",
          "fog-transmittance"
        ],
        writes: ["final-scene-color"],
        requires: ["atmosphere-composite"],
        mustRunAfter: ["water-composite", "atmosphere-composite"],
        mustRunBefore: ["output-transform"],
        transparent: true,
        depth: { test: true, write: false, source: "opaque-depth" },
        blend: { mode: "premultiplied-alpha", premultipliedAlpha: true },
        metadata: {
          layer: COZY_RENDER_LAYERS.FOAM_OVERLAY,
          finalSceneContent: true,
          forbiddenWrites: ["terrain", "physics", "fog-density"]
        }
      }),
      pass({
        id: "output-transform",
        order: 90,
        semanticLayer: "technical-output",
        stage: "output",
        sceneContent: false,
        technical: true,
        reads: ["final-scene-color"],
        writes: ["display-color"],
        requires: ["foam-overlay"],
        depth: { test: false, write: false }
      })
    ])
  });
}

function orderedPasses(graph) {
  return [...graph.passes].sort((a, b) => a.order - b.order || a.id.localeCompare(b.id));
}

export function validateCozyOceanLayerGraph(graph = createCozyOceanLayerGraph()) {
  const issues = [];
  const ordered = orderedPasses(graph);
  const ids = new Set();
  const byId = new Map();

  for (const layer of ordered) {
    if (ids.has(layer.id)) issues.push(`duplicate-pass:${layer.id}`);
    ids.add(layer.id);
    byId.set(layer.id, layer);
    if (layer.transparent && layer.depth.write) issues.push(`transparent-depth-write:${layer.id}`);
  }

  for (const layer of ordered) {
    for (const required of [...layer.requires, ...layer.mustRunAfter, ...layer.mustRunBefore]) {
      if (!byId.has(required)) issues.push(`missing-pass-dependency:${layer.id}:${required}`);
    }
  }

  const positions = new Map(ordered.map((layer, index) => [layer.id, index]));
  const water = byId.get("water-composite");
  const fog = byId.get("atmosphere-composite");
  const foam = byId.get("foam-overlay");
  const output = byId.get("output-transform");

  if (!water || !fog || !foam || !output) issues.push("missing-required-cozy-ocean-pass");
  if (water && water.depth.write) issues.push("water-writes-main-depth");
  if (foam && foam.depth.write) issues.push("foam-writes-main-depth");
  if (water && water.reads.some(resource => ["water-mask", "foam-state", "final-scene-color"].includes(resource))) {
    issues.push("water-recursive-or-overlay-read");
  }
  if (water && fog && positions.get(fog.id) <= positions.get(water.id)) issues.push("fog-must-run-after-water");
  if (foam && fog && positions.get(foam.id) <= positions.get(fog.id)) issues.push("foam-must-run-after-fog");
  if (foam && graph.finalScenePassId !== foam.id) issues.push("foam-not-final-scene-pass");
  if (foam) {
    for (const layer of ordered.slice(positions.get(foam.id) + 1)) {
      if (!layer.technical || layer.sceneContent) issues.push(`scene-content-after-foam:${layer.id}`);
    }
    for (const required of ["water-mask", "shoreline-distance", "fog-transmittance"]) {
      if (!foam.reads.includes(required)) issues.push(`foam-missing-read:${required}`);
    }
  }

  const opaque = byId.get("opaque-world");
  if (!opaque?.depth.write) issues.push("opaque-world-must-write-depth");

  const handoff = graph.metadata?.terrainHandoff ?? {};
  const islandShelfDepth = Number(handoff.islandShelfDepth);
  const seaFloorDepth = Number(handoff.seaFloorMinimumDepth);
  const minimumGap = Math.max(0, Number(handoff.minimumVerticalGap ?? 0));
  if (!Number.isFinite(islandShelfDepth) || !Number.isFinite(seaFloorDepth)) {
    issues.push("missing-terrain-handoff-depths");
  } else if (islandShelfDepth - seaFloorDepth < minimumGap) {
    issues.push("island-seafloor-handoff-overlap");
  }

  if (foam) {
    const forbidden = new Set(foam.metadata?.forbiddenWrites ?? []);
    for (const write of foam.writes) {
      if (forbidden.has(write)) issues.push(`foam-forbidden-write:${write}`);
    }
  }

  return Object.freeze({
    valid: issues.length === 0,
    issues: Object.freeze(issues),
    orderedPasses: Object.freeze(ordered),
    graph
  });
}

export function createCozyOceanCompositionKit() {
  const graph = createCozyOceanLayerGraph();
  const validation = validateCozyOceanLayerGraph(graph);
  if (!validation.valid) throw new TypeError(`Invalid Cozy Ocean layer graph: ${validation.issues.join(", ")}`);
  return Object.freeze({
    id: "cozy-ocean-composition-kit",
    extendsBase: "DomainServiceKit",
    graph,
    validation,
    layers: COZY_RENDER_LAYERS,
    contracts: Object.freeze({
      islandTerrain: Object.freeze({ opaque: true, depthTest: true, depthWrite: true, blend: "none", layer: COZY_RENDER_LAYERS.OPAQUE_WORLD }),
      seaFloorTerrain: Object.freeze({ opaque: true, depthTest: true, depthWrite: true, blend: "none", layer: COZY_RENDER_LAYERS.OPAQUE_WORLD }),
      water: Object.freeze({ transparent: true, depthTest: true, depthWrite: false, blend: "premultiplied-alpha", layer: COZY_RENDER_LAYERS.WATER_SURFACE }),
      fog: Object.freeze({ transparent: true, depthWrite: false, layer: COZY_RENDER_LAYERS.FOG_VOLUME }),
      foam: Object.freeze({ transparent: true, depthTest: true, depthWrite: false, blend: "premultiplied-alpha", finalSceneContent: true, layer: COZY_RENDER_LAYERS.FOAM_OVERLAY })
    })
  });
}
