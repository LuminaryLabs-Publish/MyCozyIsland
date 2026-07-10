# Next Steps: MyCozyIsland

Last updated: 2026-07-10T11-38-03-04-00

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Journal Readback Refresh + Node Consumer Fixture Gate
```

## Goal

Add a stable, additive host journal readback layer around the existing WebGPU route without changing visuals, retuning camera, or replacing renderers.

## Implementation order

1. Add a route/source profile helper.
2. Add stable source fingerprints.
3. Add kit catalog readback rows.
4. Add a render snapshot normalizer.
5. Wrap wheel, pointer, keyboard, blur, debug, and resize inputs with result rows.
6. Add scenario tick result rows.
7. Add camera frame readback rows.
8. Add volume texture result rows for atmosphere, cloud, and fog surfaces.
9. Add performance degrade/recover rows.
10. Add render-consumption ledger rows.
11. Add additive JSON-safe `globalThis.CozyIslandHost` while preserving legacy `globalThis.CozyIsland`.
12. Add a Node fixture and wire it into `npm test`.

## Candidate files

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
scripts/cozy-island-webgpu-journal-fixture.mjs
```

## Required result vocabulary

```txt
accepted
rejected_no_active_renderer
rejected_invalid_payload
no_change_duplicate_input
no_change_disabled
clamped_scroll
clamped_pitch
accepted_quality_degraded
accepted_quality_recovered
accepted_resize
accepted_debug_toggle
accepted_blur_clear
```

## Desired host surface

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

## Fixture requirements

- Does not require a browser GPU.
- Does not require screenshot or capture.
- Asserts route token and source fingerprint.
- Asserts kit catalog status.
- Asserts representative accepted, rejected, clamped, and no-change input rows.
- Asserts scenario/camera rows.
- Asserts render-consumption rows.
- Asserts texture/performance rows or deterministic stubs.
- Asserts `CozyIslandHost.getState()` is JSON-safe.

## Not next

- Visual polish.
- Cloud/ocean/fog rewrite.
- Renderer extraction.
- Camera retune.
- Route expansion.
