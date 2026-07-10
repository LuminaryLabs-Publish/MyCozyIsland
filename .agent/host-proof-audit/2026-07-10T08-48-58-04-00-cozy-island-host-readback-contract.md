# Host proof audit: CozyIsland host readback contract

Timestamp: `2026-07-10T08-48-58-04-00`

## Current host surface

`main-cloudform.js` exposes:

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

## Current problem

This is useful for live debugging but not safe as a fixture contract. It exposes live WebGPU/Three objects and aggregate state rather than source-backed proof rows.

## Required additive surface

Add a separate JSON-safe host surface while preserving the legacy object:

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

## Required JSON-safe records

```txt
WebGpuRouteProfile
WebGpuSourceFingerprint
KitCatalogReadback
RenderSnapshotReadback
InputResultRow
ScenarioTickResultRow
CameraFrameReadback
VolumeTextureResultRow
PerformanceLevelResultRow
RenderConsumptionLedgerRow
CozyIslandHostSnapshot
```

## Compatibility rule

Do not remove `globalThis.CozyIsland`. Add `globalThis.CozyIslandHost` beside it so browser debugging and future tests can coexist.

## Fixture rule

A Node fixture should be able to import proof helpers without creating a real browser WebGPU renderer.
