# My Cozy Island Additive Host Snapshot Contract

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Existing surface

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
};
```

This surface must remain available and behavior-compatible.

## Proposed additive surface

```js
globalThis.CozyIslandHost = {
  getState(),
  getSourceProfile(),
  getInputJournal(),
  getRenderConsumptionLedger()
};
```

## Proposed `getState()` shape

```js
{
  schemaVersion,
  route: {
    html: "index.html",
    source: "src/main-cloudform.js",
    token: "hero-cloud-4",
    threeVersion: "0.160.0"
  },
  source: {
    fingerprint,
    island,
    floor,
    clearing,
    foliage,
    grass,
    wind,
    campfire,
    smoke,
    clouds
  },
  interaction: {
    progress,
    cameraMode,
    playerPose,
    lastInputResult,
    journalCount
  },
  render: {
    sceneChildCount,
    renderer,
    camera,
    grassParity,
    cloudParity,
    consumptionLedger
  },
  compatibility: {
    legacySurfacePresent,
    legacyProgressMatches,
    legacyCloudContractMatches,
    legacyCloudCacheCountMatches
  }
}
```

## Invariants

```txt
CozyIsland remains unchanged
CozyIslandHost is additive
getState returns serializable normalized data
no Three.js object is returned directly
source snapshots do not mutate source descriptors
input results identify accepted/rejected/no-change reasons
render consumption rows identify source id and consumer output
fixed state produces stable fingerprints
fixture can run without DOM or WebGL
```

## Consumer order

1. Create pure snapshot/fingerprint modules.
2. Create pure input and movement result helpers.
3. Create grass/cloud/render readback adapters.
4. Compose normalized host state.
5. Install additive global surface after scene creation.
6. Run legacy parity fixture rows.

## Failure policy

A missing proof adapter should report `unsupported` in the ledger rather than fabricate a successful consumption row.
