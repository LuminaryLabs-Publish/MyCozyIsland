import { createIndexedPopulationProvider } from "./population-provider-utils.js";

export function createVegetationProvider({ defineWorldEffectProvider, vegetation } = {}) {
  return createIndexedPopulationProvider({ defineWorldEffectProvider, id: "vegetation-provider", kind: "vegetation", schema: "cozy.vegetation-cell.v1", phase: "population", requires: ["terrain-descriptor", "biome-weights"], provides: ["vegetation-instances"], worldItems: vegetation.instances });
}
