# Host Proof Audit: CozyIslandHost State Splice Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Current host surface

The current host surface is:

```js
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache: clouds.userData.savedPointClouds,
  getScrollProgress: () => progress
};
```

This is useful for compatibility but too small for fixture proof.

## Required compatibility rule

```txt
Keep globalThis.CozyIsland unchanged.
Add globalThis.CozyIslandHost beside it.
Do not change route token.
Do not change visible camera, movement, cloud, grass, or render behavior while adding proof records.
```

## Target host shape

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      source,
      fingerprint,
      sceneSource,
      action,
      movement,
      rail,
      grass,
      cloud,
      render,
      validation,
      legacy
    };
  }
}
```

## Projection sections

```txt
route:
  routeToken
  entryScript
  status

source:
  descriptorKitNames
  descriptorCounts
  seeds
  sourceProfileVersion

fingerprint:
  value
  stableFields

sceneSource:
  landform
  floor
  foliage
  clearing
  campfire
  smoke
  grass
  clouds

action:
  latestActionFrame
  latestActionResult
  inputJournalLength

movement:
  latestMovementPolicyResult
  firstPersonUnlocked
  playerPosition
  playerYaw
  playerPitch

rail:
  latestCameraRailSnapshot
  progress

grass:
  latestGrassInstanceSnapshot

cloud:
  descriptorSnapshot
  cacheSnapshot
  latestDriftResults

render:
  latestRenderHostSnapshot

validation:
  fixtureRowsKnown
  localValidationRun
  browserValidationRun

legacy:
  cozyIslandPresent
  cloudContractPresent
  cloudPointCachePresent
  getScrollProgressPresent
```

## Pure modules first

```txt
src/host-proof/route-version-result.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
```

## Browser splice order

```txt
1. Build source records immediately after descriptor construction.
2. Build scene source snapshot before Three.js objects are created.
3. Build grass/cloud/render snapshots after consumer creation.
4. Build action/movement/rail snapshots inside handlers and frame loop.
5. Build CozyIslandHostSnapshot from latest records.
6. Assign globalThis.CozyIslandHost after globalThis.CozyIsland.
```

## Acceptance gate

```txt
DOM-free fixture rows pass.
legacy global remains available.
CozyIslandHost exposes every section.
source fingerprint is stable.
movement rejection reasons are distinct.
grass placement count equals render instance count.
cloud descriptor/cache/drift rows are available.
render snapshot reports route and consumer facts.
```
