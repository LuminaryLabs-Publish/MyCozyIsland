const TAU = Math.PI * 2;

function hashUnit(seed = "seed", ...parts) {
  let hash = 2166136261;
  for (const char of [seed, ...parts].join(":").toString()) {
    hash ^= char.charCodeAt(0);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4294967295;
}

function rng(seed) {
  let state = Math.floor(hashUnit(seed) * 0xffffffff) || 1;
  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return (state >>> 0) / 0xffffffff;
  };
}

function stableId(type, seed, index) {
  return `${type}:${Math.floor(hashUnit(seed, type, index) * 1e9).toString(36)}`;
}

export function createIslandPathNetwork(options = {}) {
  const radius = Number(options.radiusMeters ?? 100);
  const pathWidth = Number(options.pathWidth ?? 2.4);
  const clearance = Number(options.pathClearance ?? 1.2);
  const entry = { x: 0, z: radius * 0.88 };
  const bend = { x: -radius * 0.2, z: radius * 0.28 };
  const center = { x: 0, z: 0 };
  const loop = Array.from({ length: 16 }, (_, i) => ({ x: Math.cos(i / 16 * TAU) * radius * 0.23, z: Math.sin(i / 16 * TAU) * radius * 0.23 }));
  return {
    id: "path-network:cozy-island",
    pathWidth,
    clearance,
    segments: [
      { id: "beach-to-bend", from: entry, to: bend, width: pathWidth, clearance },
      { id: "bend-to-grove", from: bend, to: center, width: pathWidth, clearance },
      ...loop.map((point, index) => ({ id: `grove-loop-${index}`, from: point, to: loop[(index + 1) % loop.length], width: pathWidth, clearance }))
    ]
  };
}

function object(type, parentId, index, position, extra = {}) {
  const id = stableId(type, extra.seed ?? "cozy", index);
  const scale = Number(extra.scale ?? 1);
  return {
    id,
    type,
    parentId,
    transform: {
      position,
      rotation: { x: 0, y: Number(extra.rotation ?? index * 2.399), z: 0 },
      scale: { x: scale, y: scale, z: scale }
    },
    state: {
      heightMeters: extra.heightMeters,
      canopyRadiusMeters: extra.canopyRadiusMeters,
      reason: extra.reason ?? "procedural"
    },
    render: { meshType: `procedural-${type}` },
    children: []
  };
}

export function createDenseCozyIslandObjectGraph(options = {}) {
  const seed = String(options.seed ?? "cozy-island");
  const radius = Number(options.radiusMeters ?? 100);
  const sampleHeight = options.sampleHeight ?? (() => 0);
  const random = rng(`${seed}:foliage`);
  const pathNetwork = createIslandPathNetwork({ radiusMeters: radius });
  const objects = [];
  const rootId = "island:cozy-001";

  function place(type, count, minR, maxR, parentId, extra = {}) {
    for (let i = 0; i < count; i += 1) {
      const angle = random() * TAU;
      const r = minR + (maxR - minR) * Math.sqrt(random());
      const p = { x: Math.cos(angle) * r, z: Math.sin(angle) * r };
      objects.push(object(type, parentId, objects.length, { x: p.x, y: sampleHeight(p), z: p.z }, { ...extra, seed, rotation: angle, scale: extra.scale ?? (0.7 + random() * 0.55) }));
    }
  }

  place("broadleaf-tree", 34, 10, radius * 0.42, "grove:central-001", { heightMeters: 7.5, canopyRadiusMeters: 3.2 });
  place("young-tree", 18, 24, radius * 0.62, "grove:central-001", { heightMeters: 4.4, canopyRadiusMeters: 1.5, scale: 0.7 });
  place("palm-tree", 12, radius * 0.58, radius * 0.88, "coastal-band:cozy-001", { heightMeters: 6.6, scale: 0.9 });
  place("bush", 42, 15, radius * 0.74, "understory:central-001", { scale: 0.65 });
  place("fern", 38, 10, radius * 0.68, "understory:central-001", { scale: 0.55 });
  place("fallen-log", 5, 16, radius * 0.5, "grove:central-001", { scale: 1.0 });
  place("rock", 18, radius * 0.18, radius * 0.9, "coastal-band:cozy-001", { scale: 0.7 });
  place("driftwood", 6, radius * 0.78, radius * 0.98, "coastal-band:cozy-001", { scale: 0.8 });
  place("reef", 8, radius * 1.02, radius * 1.24, "water-interface:cozy-001", { scale: 1.0 });

  return { id: rootId, rootId, pathNetwork, objects, byId: Object.fromEntries(objects.map((item) => [item.id, item])) };
}

export function createDenseCozyIslandRenderContract(options = {}) {
  const graph = options.graph ?? createDenseCozyIslandObjectGraph(options);
  return { id: `${graph.id}:render-contract`, type: "dense-cozy-island-render-contract", rootId: graph.rootId, objects: graph.objects, pathNetwork: graph.pathNetwork };
}
