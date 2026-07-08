import { createCozyHeroCloudRenderContract } from "../cozy-hero-cloud-form-kit/index.js";

export function createMattatzCloudsState(options = {}) {
  return {
    seed: String(options.seed || "cozy-clouds"),
    weather: options.weather || "sunrise-haze",
    cloudCount: 1,
    focus: "cozy-hero-cloud-form-kit"
  };
}

export function createMattatzCloudRenderContract(state = createMattatzCloudsState()) {
  const hero = createCozyHeroCloudRenderContract({
    id: "cozy-island-cloud-render-contract",
    pointCount: 420,
    lobeCount: 7,
    position: { x: 0, y: 132, z: -26 },
    scale: { x: 360, y: 118, z: 260 },
    drift: { x: 0.32, z: 0.05 },
    driftSpeed: 0.012
  });
  return {
    id: "cloud-render-contract",
    type: "mattatz-cloud-render-contract",
    weather: state.weather,
    cloudCount: 1,
    clouds: hero.clouds.map((cloud) => ({
      ...cloud,
      id: "cozy-hero-cloud-main",
      layerId: "cozy-hero-cloud-layer",
      position: cloud.placement.position,
      scale: cloud.placement.scale,
      drift: cloud.drift,
      driftSpeed: cloud.driftSpeed
    })),
    layers: hero.layers,
    horizonBand: null,
    sourceKit: "cozy-hero-cloud-form-kit"
  };
}
