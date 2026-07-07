const TAU = Math.PI * 2;
function makeRandom(seedText) {
  let state = 1234567;
  for (let i = 0; i < seedText.length; i += 1) state = (state * 31 + seedText.charCodeAt(i)) >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 4294967295;
  };
}
function pathDistance(point, pathNetwork) {
  if (!pathNetwork || !pathNetwork.segments) return 999999;
  let best = 999999;
  for (const segment of pathNetwork.segments) {
    const a = segment.from;
    const b = segment.to;
    const px = point.x - a.x;
    const pz = point.z - a.z;
    const vx = b.x - a.x;
    const vz = b.z - a.z;
    const len = vx * vx + vz * vz || 1;
    const t = Math.max(0, Math.min(1, (px * vx + pz * vz) / len));
    best = Math.min(best, Math.hypot(px - vx * t, pz - vz * t));
  }
  return best;
}
function blocked(point, zones) {
  for (const zone of zones || []) {
    const center = zone.center || zone.position || { x: 0, z: 0 };
    const radius = Number(zone.radius || zone.radiusMeters || 0);
    if (Math.hypot(point.x - center.x, point.z - center.z) < radius) return true;
  }
  return false;
}
export function createGrassPatchPlacementContract(options = {}) {
  const random = makeRandom(String(options.seed || "cozy-island-grass"));
  const count = Math.max(0, Math.min(220, Math.round(Number(options.count || 140))));
  const radius = Number(options.radiusMeters || 100);
  const sampleHeight = options.sampleHeight || (() => 0);
  const sampleMasks = options.sampleMasks || (() => ({ grass: 1 }));
  const patches = [];
  let tries = 0;
  while (patches.length < count && tries < count * 80 + 500) {
    tries += 1;
    const angle = random() * TAU;
    const r = 12 + (radius * 0.78 - 12) * Math.sqrt(random());
    const point = { x: Math.cos(angle) * r, z: Math.sin(angle) * r };
    const masks = sampleMasks(point) || {};
    if (masks.water || masks.beach || masks.wetSand || masks.rock || masks.cliff) continue;
    if (blocked(point, options.exclusionZones || [])) continue;
    if (pathDistance(point, options.pathNetwork) < Number(options.pathClearance || 3.6)) continue;
    const template = patches.length % 3 === 0 ? "dense-a" : patches.length % 3 === 1 ? "dense-b" : "dense-c";
    const scale = 0.75 + random() * 0.85;
    patches.push({
      id: "grass-patch:" + patches.length,
      type: "grass-patch",
      parentId: "groundcover:cozy-001",
      transform: {
        position: { x: point.x, y: sampleHeight(point), z: point.z },
        rotation: { x: 0, y: angle + random() * 0.8, z: 0 },
        scale: { x: scale, y: 1, z: scale }
      },
      state: { bladeCount: 220, patchRadius: 1.2 + random() * 1.6 },
      render: { meshType: "procedural-grass-patch", batchKey: "dense-cozy-grass-" + template, geometryTemplateKey: template }
    });
  }
  return { id: "cozy-grass-placement", type: "grass-patch-placement-contract", requestedCount: count, patchCount: patches.length, patches };
}
export function createGrassPatchBatchDescriptors(patches = []) {
  const counts = new Map();
  for (const patch of patches) counts.set(patch.render.batchKey, (counts.get(patch.render.batchKey) || 0) + 1);
  return Array.from(counts.entries()).map(([batchKey, instanceCount]) => ({ id: batchKey + ":batch", type: "grass-static-batch-descriptor", batchKey, instanceCount }));
}
