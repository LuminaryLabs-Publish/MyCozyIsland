# Host Proof Audit: Cozy Island Host Proof Ledger Contract

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Existing host surface

`globalThis.CozyIsland` is useful for legacy live diagnostics, but it exposes live runtime objects and aggregate state. It is not a stable JSON-safe proof contract.

## Required additive host surface

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
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

## Required `getState()` blocks

- `route`: route token, script token, Three/WebGPU version, backend, quality.
- `source`: source profile ID, source fingerprint, kit catalog revision, render snapshot ID.
- `kits`: count, valid flag, warnings, capabilities.
- `input`: latest action rows and accepted/rejected/no-change counts.
- `scenario`: latest tick rows and emitted events.
- `camera`: latest camera frame readback.
- `textures`: cloud/fog/atmosphere texture result rows.
- `performance`: budget level, degrade/recover decisions, sample rows.
- `render`: consumer ledger and frame linkage.
- `validation`: fixture expectations.

## Compatibility rule

Do not remove or rename current `globalThis.CozyIsland` fields. Add `globalThis.CozyIslandHost` beside it and make the new surface serializable.

## Main finding

The route needs a host proof ledger before runtime visual work. This contract should provide stable rows that can be asserted in Node without requiring browser WebGPU capture.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
