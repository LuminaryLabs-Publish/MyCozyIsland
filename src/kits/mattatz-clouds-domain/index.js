export function createMattatzCloudsState(options = {}) {
  return { seed: String(options.seed || "cozy-clouds"), weather: options.weather || "sunrise-haze", cloudCount: Number(options.cloudCount || 4) };
}
export function createMattatzCloudRenderContract(state = createMattatzCloudsState()) {
  return {
    id: "cloud-render-contract",
    clouds: [
      { id: "cloud-0", layerId: "low", position: { x: -180, y: 92, z: -110 }, scale: { x: 300, y: 90, z: 230 }, drift: { x: 0.7, z: 0.12 }, driftSpeed: 0.028 },
      { id: "cloud-1", layerId: "low", position: { x: 145, y: 108, z: 55 }, scale: { x: 290, y: 86, z: 220 }, drift: { x: 0.55, z: -0.08 }, driftSpeed: 0.022 },
      { id: "cloud-2", layerId: "high", position: { x: -320, y: 255, z: -220 }, scale: { x: 360, y: 105, z: 280 }, drift: { x: 0.4, z: 0.06 }, driftSpeed: 0.016 },
      { id: "cloud-3", layerId: "high", position: { x: 280, y: 285, z: 180 }, scale: { x: 390, y: 110, z: 300 }, drift: { x: 0.36, z: -0.05 }, driftSpeed: 0.014 }
    ].slice(0, state.cloudCount || 4)
  };
}
