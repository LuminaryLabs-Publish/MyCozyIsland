# Host Proof Audit: Host State Projection Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T02-31-41-04-00`

## Current host surface

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
};
```

This compatibility surface should remain unchanged.

## Needed additive host surface

```js
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      source,
      action,
      movement,
      rail,
      grass,
      cloud,
      render,
      validation
    };
  }
};
```

## Required sections

```txt
route:
  routeToken
  scriptPath
  accepted
  reason

source:
  sourceProfile
  sourceFingerprint
  sceneSourceSnapshot

action:
  lastActionResult
  inputJournalTail

movement:
  lastMovementPolicyResult
  unlockThreshold
  speedMetersPerSecond
  clearingRadius
  campfireKeepoutRadius

rail:
  progress
  cameraRailSnapshot

grass:
  grassPlacementSnapshot
  grassInstanceSnapshot

cloud:
  heroCloudDescriptorSnapshot
  heroCloudCacheSnapshot
  lastCloudDriftResult

render:
  renderHostSnapshot

validation:
  fixtureRows
  lastFixtureStatus
  runtimeSourceChanged
```

## Fixture acceptance

```txt
host_01_get_state_exists
host_02_get_state_has_all_sections
host_03_legacy_CozyIsland_still_has_cloudContract
host_04_legacy_CozyIsland_still_has_cloudPointCache
host_05_legacy_CozyIsland_still_has_getScrollProgress
host_06_host_state_route_token_is_hero_cloud_4
host_07_host_state_grass_and_cloud_sections_match_source_counts
```

## Stop line

Do not remove or rename `globalThis.CozyIsland`. Do not require browser/WebGL for the first fixture pass. The pure fixture should prove state shapes before live route integration.
