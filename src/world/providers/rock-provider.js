import { createIndexedPopulationProvider } from "./population-provider-utils.js";

export function createRockProvider({ defineWorldEffectProvider, rocks } = {}) {
  return createIndexedPopulationProvider({ defineWorldEffectProvider, id: "rock-provider", kind: "rocks", schema: "cozy.rock-cell.v1", phase: "population", requires: ["terrain-descriptor", "shoreline-distance"], provides: ["rock-instances"], worldItems: rocks.instances });
}
