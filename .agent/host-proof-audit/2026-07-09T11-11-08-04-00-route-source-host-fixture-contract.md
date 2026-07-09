# Host Proof Audit: Route / Source / Host Fixture Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T11-11-08-04-00`

## Summary

The repo has a legacy browser diagnostic object, but it does not yet have a stable host-state contract.

The next implementation should add additive host proof modules that can be consumed by both the live browser route and a DOM-free fixture.

## Current host surface

```txt
globalThis.CozyIsland:
  cloudContract
  cloudPointCache
  getScrollProgress()
```

This is useful for manual debugging, but not enough for source authority or fixture proof.

## Target host surface

```txt
globalThis.CozyIslandHost.getState():
  route
  sourceProfile
  sourceFingerprint
  sceneSource
  input
  movement
  cameraRail
  grass
  cloud
  render
  legacy
  validation
```

## Required files

```txt
src/host-proof/route-token-readback.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Required host facts

```txt
route:
  html: index.html
  script: ./src/main-cloudform.js?v=hero-cloud-4
  routeToken: hero-cloud-4

sourceProfile:
  sourceFile: src/main-cloudform.js
  threeCdn: https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js
  localKitCount
  explicitKitNames

sceneSource:
  islandState id/seed/radius
  floorState seed/size/resolution
  clearing radius and campfire keepout
  grass seed/requested count/accepted count
  cloud descriptor count

input:
  lastActionFrame
  boundedJournal

movement:
  lastMovementPolicyResult
  player position summary
  firstPersonUnlocked

cameraRail:
  mode
  progress
  easedProgress
  eye
  lookTarget

render:
  renderer/camera/scene summaries
  grass instance count
  cloud cache count

legacy:
  CozyIsland still present
  getScrollProgress still present
```

## Acceptance checklist

```txt
- Route token readback reports hero-cloud-4.
- Source fingerprint is deterministic across repeated fixture runs.
- Scene source snapshot reports island, floor, clearing, grass, smoke, and cloud facts.
- Movement policy records accepted and rejected decisions.
- Camera rail snapshot covers rail and first-person modes.
- Grass placement and instance snapshots match.
- Hero-cloud descriptor and cache snapshots match.
- Render host snapshot is serializable.
- CozyIslandHost.getState() is additive.
- globalThis.CozyIsland remains compatible.
- npm run check executes the DOM-free fixture after it exists.
```

## Next safe ledge

```txt
MyCozyIsland Host Proof Ledger Parity + Browser Consumer Fixture Gate
```