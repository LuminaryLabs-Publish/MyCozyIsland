# Host Proof Audit: CozyIslandHost State Readback Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-38-20-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

This is useful for lightweight diagnostics, but it is too narrow for fixture-backed DSK proof.

## Required additive host surface

```txt
globalThis.CozyIslandHost = {
  getState()
}
```

The new surface must be additive. It must not replace or rename `globalThis.CozyIsland`.

## Required getState shape

```txt
{
  route: {
    entryPath,
    routeToken,
    sourceScript
  },
  source: {
    profile,
    fingerprint,
    sceneSnapshot
  },
  input: {
    latestAction,
    journalSummary
  },
  movement: {
    latestResult,
    policySummary
  },
  camera: {
    mode,
    railSnapshot
  },
  grass: {
    placementSnapshot,
    instanceSnapshot
  },
  clouds: {
    descriptorSnapshot,
    cacheSnapshot,
    latestDriftResult
  },
  render: {
    hostSnapshot
  },
  compatibility: {
    legacyCozyIslandPresent: true
  }
}
```

## Host proof services

```txt
read route token from source profile
create source fingerprint from deterministic route descriptors
summarize source scene descriptors
record latest input action frame
record latest movement policy result
snapshot camera rail / first-person state
snapshot grass placement and instance state
snapshot cloud descriptor and cache state
snapshot render host state
project everything through getState()
run DOM-free fixture rows against pure helpers
```

## Fixture rows

```txt
route token row
source fingerprint stability row
scene snapshot descriptor count row
wheel action row
pointer action row
keyboard before-unlock skipped row
movement accepted row
movement rejected outside clearing row
movement rejected near campfire row
camera rail start/mid/near/first-person rows
grass patch/instance parity row
cloud descriptor/cache row
cloud drift row
render host snapshot row
legacy CozyIsland compatibility row
```

## Non-goals

```txt
Do not change the visual route.
Do not change the cloud look.
Do not change the grass look.
Do not change camera rail thresholds.
Do not remove legacy globalThis.CozyIsland.
Do not create a new branch.
```
