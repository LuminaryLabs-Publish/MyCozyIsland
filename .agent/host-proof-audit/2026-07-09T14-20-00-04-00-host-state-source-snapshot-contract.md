# Host Proof Audit: Host State Source Snapshot Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T14-20-00-04-00`

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
}
```

This legacy surface should remain intact.

## Missing additive host surface

```txt
globalThis.CozyIslandHost = {
  getState: () => CozyIslandHostSnapshot
}
```

## Required snapshot shape

```txt
CozyIslandHostSnapshot:
  routeToken
  sourceProfile
  sourceFingerprint
  sceneSourceSnapshot
  latestInputActionFrame
  latestActionResult
  latestMovementPolicyResult
  latestCameraRailSnapshot
  grassPlacementSnapshot
  grassInstanceSnapshot
  heroCloudDescriptorSnapshot
  heroCloudCacheSnapshot
  latestCloudDriftResult
  renderHostSnapshot
  legacyCompatibility
```

## Compatibility requirements

```txt
Do not remove globalThis.CozyIsland.
Do not change getScrollProgress semantics.
Do not change cloudContract shape.
Do not change cloudPointCache identity unless wrapped additively.
Do not make fixture modules import DOM globals.
```

## Main host-proof finding

The route has enough live data to produce durable host snapshots. The next implementation should expose snapshots additively and make fixture assertions consume those snapshots rather than scraping live Three.js objects.
