function disposeMaterial(material, sharedResources) {
  if (!material || sharedResources.has(material)) return;
  for (const value of Object.values(material)) {
    if (value?.isTexture && !sharedResources.has(value)) value.dispose?.();
  }
  material.dispose?.();
}

export function disposeRendererObject(root, { sharedResources = new Set() } = {}) {
  if (!root) return { objects: 0, geometries: 0, materials: 0 };
  const stats = { objects: 0, geometries: 0, materials: 0 };
  const visit = typeof root.traverse === "function" ? (callback) => root.traverse(callback) : (callback) => callback(root);
  visit((object) => {
    stats.objects += 1;
    if (object.geometry && !sharedResources.has(object.geometry)) {
      object.geometry.dispose?.();
      stats.geometries += 1;
    }
    const materials = Array.isArray(object.material) ? object.material : object.material ? [object.material] : [];
    for (const material of materials) {
      if (!sharedResources.has(material)) stats.materials += 1;
      disposeMaterial(material, sharedResources);
    }
  });
  root.removeFromParent?.();
  return stats;
}
