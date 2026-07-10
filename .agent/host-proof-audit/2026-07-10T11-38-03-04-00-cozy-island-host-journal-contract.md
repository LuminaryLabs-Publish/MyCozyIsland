# Host proof audit: CozyIslandHost journal contract

Timestamp: `2026-07-10T11-38-03-04-00`

## Current host surface

```txt
globalThis.CozyIsland = Object.freeze({
  renderer,
  scene,
  camera,
  backend,
  quality,
  kitCatalog,
  kitCatalogStatus,
  snapshot,
  scenario,
  volumeTextures,
  cloudRenderer,
  fogRenderer,
  oceanRenderer,
  foamRenderer,
  postPipeline,
  performanceBudget,
  getState()
})
```

## Problem

This is useful for manual debugging, but it exposes live WebGPU/Three objects and only aggregate state. It is not a JSON-safe host proof surface.

## Additive target

Keep `globalThis.CozyIsland` intact.

Add:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getSourceFingerprint(),
  getKitCatalogStatus(),
  getInputJournal(),
  getScenarioJournal(),
  getCameraJournal(),
  getVolumeTextureJournal(),
  getPerformanceJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Contract requirements

- All return values are JSON-safe.
- Rows use stable ids and frame ids.
- Source rows link to consumer rows.
- Input rows include accepted/rejected/no-change/clamped reasons.
- Scenario and camera rows can be fixture-sampled.
- Volume texture and performance rows can use deterministic stubs in Node.
- Render-consumption ledger proves each major source family is consumed or intentionally skipped.

## Safe next target

Build host proof as an additive adapter and fixture layer. Do not replace renderer, route token, visuals, camera, clouds, fog, or ocean first.
