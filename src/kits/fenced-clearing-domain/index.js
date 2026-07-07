export function createFencedClearingGraph(options = {}) {
  const id = "central-clearing:campfire";
  const center = options.position || { x: 0, y: 0, z: 0 };
  const radius = Number(options.fenceRadiusMeters || 12);
  const objects = [];
  for (let i = 0; i < 24; i += 1) {
    const angle = i / 24 * Math.PI * 2;
    objects.push({ id: id + ":fence-post-" + i, type: "fence-post", transform: { position: { x: center.x + Math.cos(angle) * radius, y: center.y, z: center.z + Math.sin(angle) * radius }, rotation: { y: angle }, scale: { x: 1, y: 1, z: 1 } }, state: { heightMeters: 1.25 } });
  }
  const avatar = { id: id + ":player-avatar-anchor", type: "player-avatar-anchor", transform: { position: { x: center.x, y: center.y, z: center.z + 6 }, rotation: { y: Number(options.playerYaw || 0) }, scale: { x: 1, y: 1, z: 1 } }, state: { eyeHeightMeters: 1.7, dataOnly: true, visible: false } };
  const boundary = { id: id + ":collision-boundary", type: "clearing-collision-boundary", state: { radiusMeters: radius - 0.8 } };
  const all = [avatar, boundary].concat(objects);
  return { id, rootId: id, objects: all, byId: { [avatar.id]: avatar, [boundary.id]: boundary }, clearanceZones: [{ center: { x: center.x, z: center.z }, radius: 4.5 }], objectExclusionZones: [{ center: { x: center.x, z: center.z }, radius: radius - 0.8 }] };
}
