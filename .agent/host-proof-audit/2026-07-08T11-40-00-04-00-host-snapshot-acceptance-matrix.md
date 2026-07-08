# MyCozyIsland Host Snapshot Acceptance Matrix

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T11-40-00-04-00`

## Purpose

Convert the current route/source/input/render facts into a fixture-readable host proof surface.

This is the direct bridge between the current browser-only route and future reusable kits.

## Current host surface

```txt
globalThis.CozyIsland = {
  cloudContract,
  cloudPointCache,
  getScrollProgress
}
```

This is useful compatibility state, but it is not enough proof state.

It does not expose:

```txt
route version result
source profile
source fingerprint
scene source snapshot
action frame/action result journal
movement policy results
camera rail snapshot
hero cloud descriptor/cache snapshot
cloud drift result
render proof summary
```

## Target additive host surface

```txt
globalThis.CozyIslandHost = {
  getRouteVersionResult,
  getSourceProfile,
  getSourceFingerprint,
  getSceneSourceSnapshot,
  getLastActionResult,
  getActionJournal,
  getInputJournal,
  getMovementPolicyResult,
  getCameraRailSnapshot,
  getHeroCloudDescriptorSnapshot,
  getHeroCloudCacheSnapshot,
  getCloudDriftResult,
  getHostSnapshot
}
```

`globalThis.CozyIsland` must remain unchanged.

## Host snapshot shape

```txt
CozyIslandHostSnapshot
  schemaVersion
  route:
    scriptPath
    queryVersion
    activeVersion
    accepted
    reason
  source:
    sourceProfileId
    sourceFingerprint
    sceneSourceSnapshotId
  interaction:
    lastActionFrame
    lastActionResult
    actionJournalLength
    inputJournalLength
  movement:
    firstPersonUnlocked
    lastMovementPolicyResult
    clearingBoundary
    campfireKeepout
  camera:
    progress
    railSnapshot
    mode
  cloud:
    descriptorSnapshot
    cacheSnapshot
    lastDriftResult
  render:
    canvasPresent
    rendererKind
    frameCount
  compatibility:
    legacyCozyIslandPresent
```

## Acceptance matrix

```txt
cozy-host-route-001:
  assert route version is hero-cloud-4
  assert accepted true

cozy-host-route-stale-001:
  input hero-cloud-3
  assert accepted false
  assert reason stale-route-token

cozy-host-source-001:
  assert source profile and fingerprint are deterministic

cozy-host-scene-001:
  assert scene source snapshot contains island, floor, grass, clearing, campfire, smoke, wind, and cloud descriptor summaries

cozy-host-wheel-001:
  assert wheel action produces ActionFrame and ActionResult

cozy-host-pointer-001:
  assert pointer drag action produces ActionFrame and ActionResult

cozy-host-keyboard-001:
  assert keyboard movement produces MovementPolicyResult

cozy-host-rail-001:
  assert fixed rail progress samples produce deterministic CameraRailSnapshot values

cozy-host-cloud-001:
  assert descriptor/cache/drift records are stable

cozy-host-legacy-001:
  assert globalThis.CozyIsland remains present and compatible

cozy-host-dom-free-001:
  assert pure fixtures run without DOM, canvas, Three.js, browser, or static server
```

## Implementation shape

```txt
src/host-proof/
├─ route-version.js
├─ source-profile.js
├─ source-fingerprint.js
├─ scene-source-snapshot.js
├─ action-frame.js
├─ action-result.js
├─ movement-policy-result.js
├─ camera-rail-snapshot.js
├─ hero-cloud-snapshot.js
├─ cloud-drift-result.js
├─ host-snapshot.js
└─ fixture-cases.mjs
```

## Stop condition

Stop after the DOM-free fixture runner proves the host snapshot records and the public route still loads through:

```txt
index.html -> ./src/main-cloudform.js?v=hero-cloud-4
```

No visual rewrite is part of this ledge.
