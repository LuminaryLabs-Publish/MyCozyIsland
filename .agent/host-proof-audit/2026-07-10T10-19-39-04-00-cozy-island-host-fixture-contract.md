# Host Proof Audit: CozyIsland Host Fixture Contract

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current host surface

`globalThis.CozyIsland` is useful for manual debugging, but it exposes live renderer objects and aggregate state. It is not a stable JSON-safe fixture surface.

## Required additive host surface

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

## Contract rules

- Preserve legacy `globalThis.CozyIsland`.
- Keep host rows JSON-safe.
- Do not expose live renderer, scene, camera, texture, or pipeline objects from the proof host.
- Use stable reason vocabulary.
- Make fixture rows deterministic without requiring browser WebGPU capture.
- Add rows as proof only. Do not retune visuals in the host-proof pass.

## Minimum fixture assertions

```txt
route token matches webgpu-volumetric-2
source fingerprint exists
kit catalog status is readable
input journal contains accepted/rejected/no-change rows
scenario journal contains tick rows
camera journal contains frame rows
volume texture journal contains deterministic rows or stubs
performance journal contains degrade/recover rows or stable no-change rows
render consumption ledger maps source families to consumers
getState() is JSON-safe
```
