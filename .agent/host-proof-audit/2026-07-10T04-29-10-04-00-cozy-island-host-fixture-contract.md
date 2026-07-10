# Host Proof Audit: CozyIslandHost Fixture Contract

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress()
}
```

This legacy surface is useful for manual inspection but not enough for fixture proof. It exposes live geometry and does not include source fingerprints, input results, render consumption, or movement outcomes.

## Additive host contract

Add a new surface without removing the legacy object:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Contract rules

```txt
All returned values are JSON-serializable.
No live Three.js objects are exposed.
Legacy globalThis.CozyIsland remains compatible.
The host includes route token and source fingerprint.
The host includes source snapshot, input journal, movement results, camera snapshot, grass parity, cloud parity, render ledger, and validation metadata.
```

## Fixture gate

`scripts/cozy-island-browser-consumer-fixture.mjs` should run without browser or GPU and assert stable source/consumer rows before any visual change.
