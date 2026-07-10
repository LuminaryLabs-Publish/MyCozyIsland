# Host Proof Audit: Cozy Island WebGPU Host Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

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

`getState()` returns backend, quality, camera descriptor, clock state, performance state, volumetric steps, active scale, and kit count.

## Host gap

The current host is useful for live debugging, but it exposes non-serializable live objects. It does not provide stable source fingerprints, input journals, render consumption rows, performance event rows, or fixture-friendly restart/readback controls.

## Add next

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getKitCatalogStatus(),
  getInputJournal(),
  getScenarioJournal(),
  getPerformanceJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Contract rules

```txt
Do not remove globalThis.CozyIsland.
Do not expose live Three.js/WebGPU objects from CozyIslandHost.
All CozyIslandHost methods must be JSON-serializable.
Host rows must preserve current visible behavior.
Host rows must be consumable by a Node fixture where possible and browser smoke where GPU state is required.
```

## Recommendation

Add the host proof surface as an adapter over the current runtime. Do not refactor renderer ownership before host readback is stable.
