export function createSmokeParticleDescriptor(options = {}) {
  const windSource = options.wind || {};
  const direction = windSource.direction || { x: 0.8, z: 0.25 };
  const len = Math.hypot(direction.x ?? 0.8, direction.z ?? 0.25) || 1;
  return {
    id: options.id || "smoke-emitter:central-001",
    type: "smoke-particle-emitter",
    parentId: options.parentId || "campfire:central-001",
    position: options.position || { x: 0, y: 1.4, z: 0 },
    particleCount: Math.round(Number(options.particleCount ?? options.count ?? 96)),
    spawnRadius: Number(options.spawnRadius ?? 0.35),
    lifespanSeconds: Number(options.lifespanSeconds ?? 4.5),
    riseSpeed: Number(options.riseSpeed ?? 1.2),
    turbulence: Number(options.turbulence ?? 0.42),
    wind: { direction: { x: direction.x / len, z: direction.z / len }, response: Number(windSource.response ?? 0.75), gustStrength: Number(windSource.gustStrength ?? 0.34) },
    render: { meshType: "soft-smoke-particles", material: "soft-alpha-smoke" }
  };
}
