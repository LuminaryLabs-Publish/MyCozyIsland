function objectRecord(id, type, parentId, position, state = {}, render = {}, children = []) {
  return {
    id,
    type,
    parentId,
    children,
    transform: { position, rotation: { x: 0, y: 0, z: 0 }, scale: { x: 1, y: 1, z: 1 } },
    state,
    render,
    collision: null,
    affordances: []
  };
}
export function createCampfireObjectGraph(options = {}) {
  const id = options.id || "campfire:central-001";
  const parentId = options.parentId || "island:cozy-001";
  const position = options.position || { x: 0, y: 0, z: 0 };
  const radiusMeters = Number(options.radiusMeters || 1.45);
  const intensity = Number(options.intensity || 0.86);
  const children = [id + ":firewood-ring", id + ":ember-bed", id + ":flame-emitter", id + ":smoke-emitter", id + ":warm-light"];
  const root = objectRecord(id, "campfire", parentId, position, { lit: true, fuel: 1, heat: intensity, radiusMeters }, { meshType: "procedural-campfire" }, children);
  root.collision = { shape: "circle", radius: radiusMeters + 0.65, blocksMovement: true };
  const objects = [
    root,
    objectRecord(children[0], "firewood-ring", id, position, { logCount: 7, radiusMeters }, { meshType: "campfire-firewood-ring" }),
    objectRecord(children[1], "ember-bed", id, { x: position.x, y: position.y + 0.08, z: position.z }, { heat: intensity }, { meshType: "campfire-ember-bed", emissive: true }),
    objectRecord(children[2], "flame-emitter", id, { x: position.x, y: position.y + 0.32, z: position.z }, { intensity, flameCount: 5 }, { meshType: "campfire-flame-emitter", emissive: true }),
    objectRecord(children[3], "smoke-emitter-anchor", id, { x: position.x, y: position.y + 1.15, z: position.z }, { enabled: true }, { meshType: "smoke-emitter-anchor" }),
    objectRecord(children[4], "warm-light", id, { x: position.x, y: position.y + 1.0, z: position.z }, { color: "#ff9d43", intensity, rangeMeters: 18 }, { meshType: "point-light-descriptor" })
  ];
  return { id, rootId: id, objects, byId: Object.fromEntries(objects.map((item) => [item.id, item])) };
}
export function createCampfireObject(options = {}) { return createCampfireObjectGraph(options).objects[0]; }
