import { createIndexedPopulationProvider } from "./population-provider-utils.js";

export function createPropProvider({ defineWorldEffectProvider, props, campfire } = {}) {
  return createIndexedPopulationProvider({
    defineWorldEffectProvider,
    id: "prop-provider",
    kind: "props",
    schema: "cozy.prop-cell.v1",
    phase: "population",
    requires: ["terrain-height"],
    provides: ["prop-instances", "campfire-descriptor"],
    worldItems: props.objects,
    extraForCell({ cell, pointInBounds }) {
      const ownsCampfire = pointInBounds(campfire.position, cell.bounds);
      return { descriptor: { ownsCampfire }, runtime: { campfire: ownsCampfire ? campfire : null } };
    }
  });
}
