# Host Proof Audit: Central Ledger Sync + Source Manifest

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-09-48-04-00`

## Why this pass exists

Repo-local `.agent/START_HERE.md` had already advanced to `2026-07-08T17-00-36-04-00`, but the central `LuminaryLabs-Dev/LuminaryLabs` ledger still pointed at `2026-07-08T14-58-49-04-00` for `MyCozyIsland`.

This pass records the catch-up state and preserves the same next implementation target with a more explicit source-manifest and browser-consumer gate.

## Host proof target

```txt
RouteVersionResult(hero-cloud-4)
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
  -> DOM-free fixture rows
  -> additive globalThis.CozyIslandHost
```

## Required source-file manifest

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

## Required package integration after source files exist

```txt
package.json
  -> add host-proof fixture script only after fixture-cases.mjs exists
```

## Required browser consumer splice

```txt
src/main-cloudform.js
  -> import pure host-proof helpers
  -> build route/source snapshots after descriptor construction
  -> record action frames/results in event handlers
  -> record movement policy results around valid(next) and fp(dt)
  -> record rail samples from rail()
  -> record grass snapshots after placement and instancing
  -> record cloud descriptor/cache/drift snapshots
  -> record render host snapshots
  -> expose globalThis.CozyIslandHost additively
```

## Fixture rows

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
cozy-central-ledger-sync-001
```

## Acceptance rules

```txt
runtime visuals unchanged
index.html keeps hero-cloud-4 script token
globalThis.CozyIsland remains available
globalThis.CozyIslandHost is additive only
DOM-free fixture rows pass before browser splice
central ledger points at the latest repo-local tracker and turn ledger
```

## Stop condition for next implementation

Stop when the repo can prove route, source, action, movement, camera rail, grass, cloud, render, and host state through deterministic records without relying on browser inspection.
