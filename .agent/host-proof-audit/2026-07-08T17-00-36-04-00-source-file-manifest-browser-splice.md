# Host Proof Audit: Source File Manifest and Browser Splice

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Purpose

This audit turns the prior host-proof plan into a concrete implementation map.

The next source pass should add pure source files first, prove them with DOM-free fixtures, then splice the resulting projections into `src/main-cloudform.js` without changing player-visible behavior.

## Additive source-file manifest

```txt
src/host-proof/route-version.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/action-frame.js
src/host-proof/action-result.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/host-snapshot.js
src/host-proof/fixture-cases.mjs
```

## Module contracts

```txt
route-version.js:
  parseRouteScriptToken(scriptSrc)
  evaluateRouteVersion({ token, acceptedToken })

source-profile.js:
  createCozySourceProfile({ routeVersion, sourceFacts })

source-fingerprint.js:
  createSourceFingerprint(profile)

scene-source-snapshot.js:
  createSceneSourceSnapshot({ islandState, landform, floorState, floor, graph, clearing, fireGraph, smokeD, grass, wind, cloudContract })

action-frame.js:
  createActionFrame(input)

action-result.js:
  createActionResult({ frame, status, reason, before, after, changedFields })

movement-policy-result.js:
  evaluateMovementPolicy({ progress, keys, currentPosition, proposedPosition, clearing, campfireRadius })

camera-rail-snapshot.js:
  createCameraRailSnapshot({ progress, player, campfireY })

grass-instance-snapshot.js:
  createGrassInstanceSnapshot({ grass, grassObj, wind, graph, clearing })

hero-cloud-snapshot.js:
  createHeroCloudDescriptorSnapshot(cloudContract)
  createHeroCloudCacheSnapshot({ cloudCache, clouds })

cloud-drift-result.js:
  projectCloudDriftResult({ cloud, dt, now })

host-snapshot.js:
  createRenderHostSnapshot(input)
  createCozyIslandHostSnapshot(input)

fixture-cases.mjs:
  runCozyHostProofFixtures()
```

## Browser consumer splice order

```txt
1. Import pure helpers after local kit imports.
2. Parse route token from import.meta.url or from the active script URL without changing index.html.
3. Build RouteVersionResult before descriptor construction.
4. Build SourceProfile and SourceFingerprint after constants/seeds are known.
5. Build SceneSourceSnapshot immediately after descriptors are created.
6. Wrap wheel handler with ActionFrame/ActionResult.
7. Wrap pointer handlers with ActionFrame/ActionResult.
8. Wrap fp(dt) and valid(next) with MovementPolicyResult.
9. Wrap rail() result with CameraRailSnapshot.
10. Build GrassInstanceSnapshot after grassMesh(grass).
11. Build HeroCloudDescriptorSnapshot and HeroCloudCacheSnapshot after heroCloudGroup(contract).
12. Project CloudDriftResult during frame(now), keeping existing drift math unchanged.
13. Project RenderHostSnapshot after renderer/camera/scene/frame facts are available.
14. Expose globalThis.CozyIslandHost.getState() additively.
15. Preserve globalThis.CozyIsland exactly enough for existing compatibility checks.
```

## Host snapshot shape

```txt
globalThis.CozyIslandHost = {
  getState() {
    return {
      route,
      sourceProfile,
      sourceFingerprint,
      sceneSourceSnapshot,
      lastActionResult,
      actionJournalTail,
      lastMovementPolicyResult,
      lastCameraRailSnapshot,
      grassInstanceSnapshot,
      heroCloudDescriptorSnapshot,
      heroCloudCacheSnapshot,
      cloudDriftTail,
      renderHostSnapshot,
      compatibility: {
        legacyCozyIslandPresent: true,
        legacyCloudContractPresent: true,
        legacyCloudPointCachePresent: true,
        legacyScrollProgressPresent: true
      }
    };
  }
}
```

## Fixture matrix

```txt
cozy-route-version-accepted-001
cozy-route-version-stale-hero-cloud-3-001
cozy-route-version-missing-token-001
cozy-source-profile-hero-cloud-4-001
cozy-source-fingerprint-stable-001
cozy-scene-source-snapshot-001
cozy-wheel-action-progress-001
cozy-pointer-action-yaw-001
cozy-pointer-action-look-001
cozy-keyboard-before-fp-001
cozy-keyboard-no-input-001
cozy-keyboard-clearing-accepted-001
cozy-keyboard-clearing-boundary-rejected-001
cozy-keyboard-campfire-keepout-rejected-001
cozy-camera-rail-samples-001
cozy-grass-placement-source-001
cozy-grass-instance-snapshot-001
cozy-cloud-descriptor-001
cozy-cloud-cache-001
cozy-cloud-cache-reuse-001
cozy-cloud-drift-001
cozy-render-host-snapshot-001
cozy-host-snapshot-001
cozy-host-legacy-compatibility-001
cozy-host-dom-free-001
```

## Stop conditions

```txt
All host-proof helpers are pure.
Fixture runner imports no DOM, canvas, or Three.js.
Existing route still loads hero-cloud-4.
globalThis.CozyIsland remains available.
globalThis.CozyIslandHost is additive.
No visual tuning is bundled with the proof pass.
```