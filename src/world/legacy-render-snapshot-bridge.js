import { createRenderSnapshot } from "../kits/render-descriptors.js";
import { activeCellIdsFromSnapshot, flattenIndexedCellItems, groupByType } from "./cell-utils.js";

function recordsForActiveCells(store, activeCellIds) {
  return activeCellIds.map(cellId => store.get(cellId)).filter(Boolean);
}

export function createLegacyRenderSnapshotBridge({ composition, providerRuntime, getWorldSnapshot } = {}) {
  if (!composition || !providerRuntime || !getWorldSnapshot) {
    throw new TypeError("createLegacyRenderSnapshotBridge requires composition, providerRuntime, and getWorldSnapshot.");
  }

  function createSnapshot() {
    const activeCellIds = activeCellIdsFromSnapshot(getWorldSnapshot() ?? { activeCells: [] });
    const vegetationInstances = flattenIndexedCellItems(recordsForActiveCells(providerRuntime.vegetation, activeCellIds));
    const rockInstances = flattenIndexedCellItems(recordsForActiveCells(providerRuntime.rocks, activeCellIds));
    const propRecords = recordsForActiveCells(providerRuntime.props, activeCellIds);
    const propObjects = flattenIndexedCellItems(propRecords);
    const campfire = propRecords.find(record => record.campfire)?.campfire ?? composition.campfire;
    const vegetation = vegetationInstances.length === composition.vegetation.instances.length
      ? Object.freeze({ ...composition.vegetation, instances: Object.freeze(vegetationInstances), byType: groupByType(vegetationInstances) })
      : composition.vegetation;
    const rocks = rockInstances.length === composition.rocks.instances.length
      ? Object.freeze({ ...composition.rocks, instances: Object.freeze(rockInstances) })
      : composition.rocks;
    const props = propObjects.length === composition.props.objects.length
      ? Object.freeze({ ...composition.props, objects: Object.freeze(propObjects) })
      : composition.props;

    return createRenderSnapshot({
      seed: composition.seed,
      quality: composition.quality,
      terrain: composition.terrain,
      terrainShelf: composition.terrainShelf,
      terrainLod: composition.terrainLod,
      biomeField: composition.biomeField,
      shoreline: composition.shoreline,
      oceanFloor: composition.oceanFloor,
      oceanWaves: composition.oceanWaves,
      oceanOptics: composition.oceanOptics,
      underwater: composition.underwater,
      caustics: composition.caustics,
      sunGlitter: composition.sunGlitter,
      foam: composition.foam,
      vegetation,
      vegetationArchetypes: composition.vegetationArchetypes,
      vegetationWind: composition.vegetationWind,
      vegetationLod: composition.vegetationLod,
      rocks,
      props,
      campfire,
      cloudWeather: composition.cloudWeather,
      cloudDensity: composition.cloudDensity,
      cloudLighting: composition.cloudLighting,
      cloudLod: composition.cloudLod,
      cloudShadow: composition.cloudShadow,
      cloudHorizon: composition.cloudHorizon,
      fogDensity: composition.fogDensity,
      fogAdvection: composition.fogAdvection,
      fogPlacement: composition.fogPlacement,
      illumination: composition.illumination,
      aerialPerspective: composition.aerialPerspective,
      materials: composition.materials,
      renderArchetypes: composition.renderArchetypes,
      fallbackPolicy: composition.fallbackPolicy
    });
  }

  return Object.freeze({ createSnapshot });
}
