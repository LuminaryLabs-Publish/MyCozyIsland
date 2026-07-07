export function createGrassWindDescriptor(options = {}) {
  const direction = options.direction ?? { x: 0.8, z: 0.25 };
  const len = Math.hypot(direction.x ?? 0.8, direction.z ?? 0.25) || 1;
  return {
    id: options.id ?? "central-grove-soft-wind",
    type: "grass-wind-descriptor",
    direction: { x: (direction.x ?? 0.8) / len, z: (direction.z ?? 0.25) / len },
    baseSway: Number(options.baseSway ?? 0.16),
    gustStrength: Number(options.gustStrength ?? 0.34),
    gustFrequency: Number(options.gustFrequency ?? 0.08),
    phaseSeed: String(options.phaseSeed ?? "cozy-island-grass")
  };
}
