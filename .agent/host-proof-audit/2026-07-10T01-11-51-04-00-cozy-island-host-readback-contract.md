# Host Proof Audit: CozyIslandHost Readback Contract

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Problem

The current host object exposes useful debug state, but it is not a full source/consumer proof surface.

`cloudPointCache` exposes live Three.js BufferGeometry objects and is not a stable serialized contract.

## Additive host surface

Add this without removing or changing the legacy object:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Required host state

```txt
route token
source profile
source fingerprints
scene source snapshot
input result journal
movement result rows
camera rail snapshots
grass placement snapshot
grass instance snapshot
cloud descriptor snapshot
cloud cache snapshot
cloud drift result rows
render consumption ledger
renderer snapshot
legacy compatibility snapshot
```

## Host proof finding

The next implementation should be additive and compatibility-safe. Keep `globalThis.CozyIsland` working, then add serializable `CozyIslandHost` proof readback for fixtures and future agents.
