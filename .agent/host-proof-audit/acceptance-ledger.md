# My Cozy Island Host Proof Acceptance Ledger

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Created:** `2026-07-08T07:30:30-04:00`

## Purpose

This ledger narrows the next implementation slice for `MyCozyIsland` from a broad host-proof idea into concrete acceptance cases.

The app already has a stable public visual route, local source descriptor kits, and a coherent hero-cloud scene. The next high-value pass should not change art direction. It should make route, source, action, movement, camera, and cloud facts inspectable without opening a browser.

## Current source facts

```txt
public route:
  index.html
  -> ./src/main-cloudform.js?v=hero-cloud-3

entry runtime:
  src/main-cloudform.js
  -> Three.js CDN import
  -> local domain-kit imports
  -> inline Three.js adapters
  -> inline scroll/pointer/keyboard handling
  -> inline cloud cache/drift
  -> limited globalThis.CozyIsland compatibility diagnostics
```

## Acceptance target

```txt
MyCozyIsland Host Proof Fixture Matrix
```

This target is accepted only when the repo has a DOM-free fixture path that can prove the same source facts the browser route uses.

## Required contracts

```txt
RouteVersionResult
  id: hero-cloud-3
  source: index.html script token
  status: accepted | rejected
  reason: matched-route-token | missing-route-token | mismatched-route-token

SourceProfile
  islandSeed
  islandRadiusMeters
  maxHeightMeters
  beachWidthMeters
  shelfWidthMeters
  floorSeed
  cloudProfileId
  movementProfileId
  cameraRailProfileId

SourceFingerprint
  profileId
  routeVersion
  stableHash
  inputs

SceneSourceSnapshot
  landform
  floor
  foliage
  grass
  wind
  clearing
  campfire
  smoke
  clouds

ActionFrame
  id
  type: wheel | pointer-drag | keyboard-move | tick
  input
  previousState
  timestampOrTick

ActionResult
  actionId
  accepted
  reason
  changedFields
  nextState
  journalEntry

MovementPolicyResult
  actionId
  accepted
  reason: inside-clearing | clearing-boundary | campfire-keepout | locked-before-first-person
  requestedPosition
  resolvedPosition
  distanceFromCampfire
  distanceFromClearingCenter

CameraRailSnapshot
  progress
  cameraPosition
  lookTarget
  yaw
  pitch
  firstPersonUnlocked

HeroCloudDescriptorSnapshot
  cloudIds
  pointCounts
  lobeCounts
  placements
  opacity
  drift

HeroCloudCacheSnapshot
  geometryCount
  savedPointCloudCount
  totalPointCount
  cacheKeys

CloudDriftResult
  cloudId
  dt
  time
  baseY
  resolvedY
  driftPhase

CozyIslandHostSnapshot
  route
  sourceFingerprint
  sceneSourceSnapshot
  cameraRailSnapshot
  cloudSnapshots
  latestActionResult
  journals
```

## Fixture cases

```txt
cozy-route-version-001
  Given index.html references ./src/main-cloudform.js?v=hero-cloud-3
  Expect RouteVersionResult.id == hero-cloud-3
  Expect status == accepted

cozy-source-profile-001
  Given fixed runtime seeds and island parameters
  Expect SourceProfile contains island, ocean floor, cloud, movement, and rail profile constants

cozy-source-fingerprint-001
  Given the same SourceProfile twice
  Expect identical stableHash values

cozy-scene-source-001
  Given source descriptors are built with fixed seeds
  Expect SceneSourceSnapshot includes landform, floor, foliage, grass, wind, clearing, campfire, smoke, and clouds

cozy-wheel-action-001
  Given scroll progress 0.25 and wheel delta input
  Expect ActionResult.accepted == true
  Expect changedFields includes scrollProgress or cameraRail

cozy-pointer-action-001
  Given pointer drag input
  Expect ActionResult.accepted == true
  Expect changedFields includes yaw/look state

cozy-keyboard-before-fp-001
  Given keyboard movement before first-person threshold
  Expect MovementPolicyResult.accepted == false
  Expect reason == locked-before-first-person

cozy-keyboard-clearing-001
  Given movement inside clearing and away from campfire keepout
  Expect MovementPolicyResult.accepted == true
  Expect reason == inside-clearing

cozy-keyboard-boundary-001
  Given movement outside clearing radius
  Expect MovementPolicyResult.accepted == false
  Expect reason == clearing-boundary

cozy-keyboard-campfire-001
  Given movement into campfire keepout radius
  Expect MovementPolicyResult.accepted == false
  Expect reason == campfire-keepout

cozy-camera-rail-001
  Given progress samples 0, 0.5, and 1
  Expect deterministic CameraRailSnapshot records

cozy-cloud-descriptor-001
  Given hero-cloud source descriptors
  Expect point count, lobe count, placement, opacity, and drift descriptors are stable

cozy-cloud-cache-001
  Given cached hero-cloud geometries
  Expect HeroCloudCacheSnapshot reports geometry count and total point count

cozy-cloud-drift-001
  Given fixed dt/time
  Expect deterministic CloudDriftResult for each cloud

cozy-host-snapshot-001
  Given fixture replay completion
  Expect CozyIslandHostSnapshot includes route, source, camera, cloud, movement, and journal summaries
```

## Implementation order

```txt
1. Add src/host-proof/route-version.js.
2. Add src/host-proof/source-profile.js.
3. Add src/host-proof/source-fingerprint.js.
4. Add src/host-proof/scene-source-snapshot.js.
5. Add src/host-proof/action-frame.js.
6. Add src/host-proof/action-result.js.
7. Add src/host-proof/movement-policy-result.js.
8. Add src/host-proof/camera-rail-snapshot.js.
9. Add src/host-proof/hero-cloud-snapshot.js.
10. Add src/host-proof/cloud-drift-result.js.
11. Add src/host-proof/fixture-cases.mjs.
12. Wire src/main-cloudform.js additively to expose globalThis.CozyIslandHost.
13. Keep globalThis.CozyIsland compatibility unchanged.
```

## Stop line

Stop when the fixture matrix proves host facts and the public route still loads.

Do not start a visual upgrade, cloud redesign, terrain rewrite, save system, deploy workflow rewrite, or external kit extraction in the same pass.
