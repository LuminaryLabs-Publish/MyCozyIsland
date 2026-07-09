# Host Proof Audit: Cozy Island Host Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Host gaps

```txt
No globalThis.CozyIslandHost surface exists.
No serializable state snapshot exists.
No source profile or source fingerprint readback exists.
No input journal readback exists.
No render-consumption ledger readback exists.
No proof reset/restart path exists.
Legacy cloudPointCache exposes live Three.js BufferGeometry objects.
```

## Additive host contract

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Required snapshot sections

```txt
route
sourceProfile
sourceFingerprint
sceneSource
inputJournal
movementPolicy
cameraRail
grass
clouds
renderConsumption
renderer
legacyCompatibility
```

## Compatibility rule

Do not remove or rename `globalThis.CozyIsland`. The new host surface must be additive, JSON-serializable, and fixture-readable without exposing live Three.js objects.