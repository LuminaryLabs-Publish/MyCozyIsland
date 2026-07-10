# Host proof audit: CozyIslandHost fixture contract

**Timestamp:** `2026-07-10T02-31-58-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

This is useful for quick inspection, but it exposes live Three.js geometry objects and does not explain source/consumer parity.

## Required additive host

Do not remove the legacy surface. Add an additive proof surface:

```txt
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger(),
  restartProofState()
}
```

## Required state shape

```txt
{
  routeToken,
  sourceFingerprint,
  sourceProfile,
  sceneSourceSnapshot,
  inputJournal,
  movementResults,
  cameraRailSnapshots,
  grass: {
    placementSnapshot,
    batchSnapshot,
    instanceSnapshot,
    consumptionRows
  },
  clouds: {
    descriptorSnapshot,
    cacheSnapshot,
    driftResults,
    consumptionRows
  },
  render: {
    ledger,
    rendererSnapshot,
    cameraSnapshot
  },
  legacyCompatibility
}
```

## Compatibility requirements

```txt
preserve globalThis.CozyIsland
preserve route token hero-cloud-4
preserve progress thresholds 0.85 and 0.985
preserve clearing radius and campfire keepout
preserve current visible behavior
return JSON-serializable proof state
```

## Fixture gate

`scripts/cozy-island-browser-consumer-fixture.mjs` should validate host state without requiring DOM, WebGL, or GPU.
