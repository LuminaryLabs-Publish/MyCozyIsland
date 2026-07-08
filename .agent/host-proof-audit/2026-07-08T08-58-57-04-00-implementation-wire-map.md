# My Cozy Island Host Proof Implementation Wire Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Created:** `2026-07-08T08:58:57-04:00`

## Purpose

This map turns the existing host-proof fixture matrix and acceptance ledger into a source-edit plan.

The next implementation pass should not redesign the island, clouds, grass, trees, water, smoke, camera style, or route. It should add proofable records around the current host facts and wire those records into `src/main-cloudform.js` additively.

## Current source anchors

```txt
index.html
  script token: ./src/main-cloudform.js?v=hero-cloud-3

src/main-cloudform.js
  imports Three.js from CDN
  imports local domain kits from src/kits/*
  owns source construction
  owns renderer construction
  owns DOM input
  owns smoke and cloud animation
  owns movement policy
  owns legacy globalThis.CozyIsland diagnostics
```

## Implementation boundary

```txt
allowed:
  add src/host-proof/*.js pure helpers
  add src/host-proof/fixture-cases.mjs
  add package script for the fixture only after the fixture exists
  import helpers into src/main-cloudform.js additively
  expose globalThis.CozyIslandHost additively
  preserve globalThis.CozyIsland

not allowed in this ledge:
  visual redesign
  cloud redesign
  terrain rewrite
  grass rewrite
  save system
  deploy workflow rewrite
  external kit extraction
  route token rename
```

## Files to add

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/fixture-cases.mjs
```

## File responsibilities

```txt
route-version.js
  extract hero-cloud-3 from route token
  emit RouteVersionResult
  reasons: matched-route-token, missing-route-token, mismatched-route-token

source-profile.js
  centralize fixed source constants currently embedded in main-cloudform.js
  include island seed/radius/height, floor seed, cloud profile, movement profile, rail profile

source-fingerprint.js
  stable stringify SourceProfile inputs
  emit deterministic SourceFingerprint.stableHash

scene-source-snapshot.js
  summarize descriptor outputs from local source kits
  do not serialize Three.js meshes
  include landform, floor, foliage, grass, wind, clearing, campfire, smoke, clouds

action-frame.js
  normalize wheel, pointer-drag, keyboard-move, and tick actions
  assign action ids and preserve previous state references

action-result.js
  convert accepted/rejected action outcomes into records
  report changedFields, reason, nextState, and journalEntry

movement-policy-result.js
  preserve movement decision reasons
  reasons: locked-before-first-person, inside-clearing, clearing-boundary, campfire-keepout

camera-rail-snapshot.js
  sample rail progress into camera position, look target, yaw, pitch, first-person unlock state
  no Camera object dependency

hero-cloud-snapshot.js
  summarize cloud descriptor, lobe count, point count, placement, opacity, drift, cache counts, and cache keys
  no WebGL dependency

cloud-drift-result.js
  reduce fixed dt/time/baseY/drift inputs to deterministic resolvedY and driftPhase

fixture-cases.mjs
  runs the required fixture ids with Node
  imports only pure helpers and source descriptor kits where possible
  does not require DOM, canvas, static server, browser, or Three.js
```

## Browser attach points

```txt
src/main-cloudform.js import block
  add pure host-proof imports only after helpers exist

main() source construction block
  build SourceProfile
  build SourceFingerprint
  build SceneSourceSnapshot from descriptor outputs

scroll handler
  wrap wheel input into ActionFrame
  emit ActionResult
  append action journal row

pointer handler
  wrap pointer delta into ActionFrame
  emit ActionResult
  append action journal row

keyboard/movement block
  wrap keyboard intent into ActionFrame
  emit MovementPolicyResult
  emit ActionResult
  append action journal row

camera update block
  emit CameraRailSnapshot using pure sampler

hero cloud construction block
  emit HeroCloudDescriptorSnapshot and HeroCloudCacheSnapshot

animation tick
  emit CloudDriftResult for deterministic cloud drift inputs

global diagnostics block
  preserve globalThis.CozyIsland
  add globalThis.CozyIslandHost = { getSnapshot, getJournal, getLatestActionResult }
```

## Fixture order

```txt
1. cozy-route-version-001
2. cozy-source-profile-001
3. cozy-source-fingerprint-001
4. cozy-scene-source-001
5. cozy-camera-rail-001
6. cozy-cloud-descriptor-001
7. cozy-cloud-cache-001
8. cozy-cloud-drift-001
9. cozy-keyboard-before-fp-001
10. cozy-keyboard-clearing-001
11. cozy-keyboard-boundary-001
12. cozy-keyboard-campfire-001
13. cozy-wheel-action-001
14. cozy-pointer-action-001
15. cozy-host-snapshot-001
```

## Required result shape

```txt
HostProofFixtureSummary
  routeVersionResult
  sourceProfile
  sourceFingerprint
  sceneSourceSnapshot
  cameraRailSamples[]
  cloudDescriptorSnapshot
  cloudCacheSnapshot
  cloudDriftResults[]
  movementPolicyResults[]
  actionResults[]
  hostSnapshot
  passedFixtureIds[]
  failedFixtureIds[]
```

## Stop line

Stop when:

```txt
- fixture-cases.mjs can run without a browser
- all required fixture ids are represented
- RouteVersionResult.id is hero-cloud-3
- SourceFingerprint is deterministic across two runs
- movement rejection reasons remain distinct
- camera and cloud snapshots are deterministic
- globalThis.CozyIsland remains compatible
- globalThis.CozyIslandHost is additive only
```

Do not start render polish until this host-proof gate exists.
