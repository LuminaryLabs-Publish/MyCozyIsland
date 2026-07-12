export const COZY_RENDER_LAYERS = Object.freeze({
  OPAQUE_WORLD: 0,
  WATER_SURFACE: 1,
  FOAM_OVERLAY: 2,
  CLOUD_VOLUME: 3,
  FOG_VOLUME: 10,
  DEBUG: 30
});

export function createLayerMask(...layers) {
  return Object.freeze([...new Set(layers.flat().map(value => Number(value)))].filter(Number.isInteger));
}

export function assignRenderLayer(object, layer, recursive = true) {
  if (!object?.layers) return object;
  const apply = target => {
    target.layers.disableAll();
    target.layers.enable(layer);
  };
  if (recursive && typeof object.traverse === "function") object.traverse(apply);
  else apply(object);
  return object;
}
