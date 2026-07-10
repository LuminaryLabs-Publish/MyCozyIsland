# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-10T05-49-25-04-00`

## Next safe ledge

```txt
MyCozyIsland WebGPU Source Consumer Readback Refresh + Node Fixture Gate
```

Build an additive proof layer around the current WebGPU route. Do not rewrite the visible scene, change `webgpu-volumetric-2`, or replace the existing kit catalog.

## Preserve

```txt
index.html shell
./src/main-cloudform.js?v=webgpu-volumetric-2 route token
Three.js/WebGPU 0.185.0 importmap
50-kit DomainServiceKit catalog
npm test static/domain smoke checks
globalThis.CozyIsland legacy surface
current WebGPU renderer, volume texture, cloud/fog/ocean/foam/post pipeline behavior
current scenario/camera behavior
```

## Add

```txt
src/host-proof/webgpu-route-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/kit-catalog-readback.js
src/host-proof/render-snapshot-normalizer.js
src/host-proof/input-action-frame.js
src/host-proof/input-result.js
src/host-proof/input-result-journal.js
src/host-proof/scenario-tick-result.js
src/host-proof/camera-frame-readback.js
src/host-proof/volume-texture-result.js
src/host-proof/performance-level-result.js
src/host-proof/render-consumption-ledger.js
src/host-proof/cozy-island-host-snapshot.js
scripts/cozy-island-webgpu-consumer-fixture.mjs
```

## Required result vocabulary

```txt
status: accepted | rejected | no-change
reason:
  route-token-read
  kit-catalog-valid
  kit-catalog-invalid
  wheel-progress-updated
  wheel-progress-clamped
  pointer-drag-started
  pointer-drag-updated
  pointer-not-dragging
  pointer-drag-ended
  key-state-updated
  key-debug-toggle
  input-cleared-on-blur
  scenario-ticked
  scenario-dt-clamped
  camera-frame-copied
  volume-texture-created
  volume-texture-fallback-created
  performance-level-stable
  performance-level-degraded
  performance-level-recovered
  render-submitted
```

## Fixture rows

```txt
route token and source fingerprint
kit catalog valid row with 50 kits
static source/importmap row for Three.js 0.185.0
stable domain source snapshot
scenario tick at fixed dt
camera readback after tick
wheel/pointer/key/blur result rows
volume texture source/size rows
cloud/fog step-scale rows
performance degrade/recover rows
render-consumption ledger for source families
legacy CozyIsland compatibility row
CozyIslandHost JSON serialization row
```

## Host surface

Add an additive surface without removing the current legacy object:

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

All outputs must be JSON-serializable and must not expose live Three.js/WebGPU objects.

## Validation gate

Add:

```txt
npm run fixture:webgpu-consumer
npm run check
npm test
```

`npm run check` should run the existing `npm test` plus the new fixture without requiring a browser or GPU.

## Stop condition

Stop the ledge when the Node fixture passes, `CozyIslandHost.getState()` is JSON-safe and additive, source-to-render rows reconcile, input/scenario/performance reasons are stable, legacy diagnostics remain compatible, and no visible WebGPU behavior has changed.
