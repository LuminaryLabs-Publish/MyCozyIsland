# Host Proof Audit: CozyIsland Host Readback Contract

Timestamp: `2026-07-10T13-08-51-04-00`

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

This surface is useful for live inspection, but it is not a JSON-safe fixture contract. It exposes live renderer objects and aggregate state rather than durable proof rows.

## Required additive surface

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getSourceFingerprint(),
  getKitCatalogStatus(),
  getInputReadback(),
  getScenarioReadback(),
  getCameraReadback(),
  getVolumeTextureReadback(),
  getPerformanceReadback(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Contract rules

- Preserve legacy `globalThis.CozyIsland`.
- Do not expose live renderer objects through `CozyIslandHost`.
- Every returned object must be JSON-safe.
- Each row should include a stable source id or frame id.
- Rows must identify accepted, rejected, clamped, no-change, fallback, degraded, and recovered decisions.
- Node fixture should prove the same vocabulary without browser WebGPU capture.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Readback Ledger Refresh + Node Consumer Fixture Gate
```
