# Host proof audit: CozyIslandHost proof contract

Timestamp: `2026-07-09T23-41-15-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Problem

The existing host surface is useful for quick manual inspection but not for durable validation. It exposes live Three.js geometries and does not include route token, source fingerprint, input journal, movement results, grass parity, cloud cache status, render consumption, or a serializable renderer snapshot.

## Additive target

Keep the existing object and add:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Required state fields

```txt
routeToken
sourceProfile
sourceFingerprint
sceneSourceSnapshot
inputJournal
movementPolicyResults
cameraRailSamples
grassPlacementSnapshot
grassInstanceSnapshot
cloudDescriptorSnapshot
cloudCacheSnapshot
cloudDriftResults
renderConsumptionLedger
rendererSnapshot
legacyCompatibility
```

## Compatibility constraints

- Do not remove `globalThis.CozyIsland`.
- Do not expose live Three.js objects in the new proof surface.
- All `CozyIslandHost` output must be JSON-serializable.
- Preserve visible route behavior while adding proof.
