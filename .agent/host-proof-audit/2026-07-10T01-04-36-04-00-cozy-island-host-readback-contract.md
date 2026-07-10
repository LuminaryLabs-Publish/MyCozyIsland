# Host proof audit: CozyIsland host readback contract

Timestamp: `2026-07-10T01-04-36-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

## Current limitations

- `cloudPointCache` exposes live Three.js `BufferGeometry` objects.
- No source profile or source fingerprint is exposed.
- No scene source snapshot is exposed.
- No input or movement result journal is exposed.
- No render consumption ledger is exposed.
- No grass or cloud parity rows are exposed.
- No reset/restart method exists for proof state.

## Additive host surface target

Do not remove `globalThis.CozyIsland`.

Add:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Required `getState()` shape

```txt
{
  route: {
    script: "./src/main-cloudform.js?v=hero-cloud-4",
    routeToken: "hero-cloud-4"
  },
  source: {
    profile,
    fingerprint,
    sceneSnapshot
  },
  input: {
    latestResult,
    journalCount
  },
  movement: {
    latestPolicyResult,
    playerPose
  },
  camera: {
    mode,
    progress,
    railSnapshot
  },
  render: {
    consumptionLedgerSummary,
    rendererSnapshot
  },
  grass: {
    placementCount,
    instanceCount,
    parity
  },
  clouds: {
    descriptorFingerprint,
    cacheSnapshot,
    driftResult
  },
  legacyCompatibility: {
    cozyIslandPresent: true
  }
}
```

## Compatibility rule

All new outputs must be JSON-serializable and must not expose live Three.js objects.

## Main finding

A stable `CozyIslandHost` readback surface is the right next control surface for human and agent validation. It should be additive and fixture-first.
