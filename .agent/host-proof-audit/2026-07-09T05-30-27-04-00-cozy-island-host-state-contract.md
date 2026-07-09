# Host Proof Audit: CozyIslandHost State Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

## Problem

`globalThis.CozyIsland` is useful as a quick manual diagnostic surface, but it is too narrow to serve as an internal proof contract. It does not expose route source, action results, movement decisions, camera rail snapshots, grass consumption, cloud drift, or render host snapshots.

## Required additive host

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      source,
      input,
      movement,
      camera,
      grass,
      clouds,
      render,
      validation
    }
  }
}
```

## Required state shape

```txt
route:
  name: My Cozy Island
  entryScript: ./src/main-cloudform.js?v=hero-cloud-4
  routeToken: hero-cloud-4

source:
  profile
  fingerprint
  sceneSourceSnapshot

input:
  latestActionFrame
  latestActionResult
  journalTail

movement:
  latestMovementPolicyResult
  firstPersonThreshold: 0.985
  clearingRadius
  campfireKeepoutRadius: 2.35

camera:
  mode: rail | first-person
  progress
  easedProgress
  railSnapshot

grass:
  placementSnapshot
  instanceSnapshot
  parityResult

clouds:
  descriptorSnapshot
  cacheSnapshot
  latestDriftResults

render:
  renderHostSnapshot

validation:
  runtimeSourceChanged: false for docs pass
  fixtureAvailable: false until implementation lands
```

## Consumer rules

```txt
legacy globalThis.CozyIsland must remain unchanged
CozyIslandHost must be additive
getState() must be safe after main() initializes
getState() must not allocate massive geometry arrays
snapshots should summarize, not expose raw Float32Array contents
fixture modules should be importable without DOM/WebGL
```

## Fixture acceptance

```txt
fixture can construct source profile and fingerprint
fixture can evaluate action/movement reason catalog
fixture can evaluate camera rail sample rows
fixture can compare grass placement count to render instance count using normalized inputs
fixture can summarize cloud descriptors and expected cache geometry counts
browser route can expose the same shape through CozyIslandHost.getState()
```
