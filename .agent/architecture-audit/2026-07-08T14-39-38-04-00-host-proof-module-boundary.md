# Architecture Audit: Host Proof Module Boundary

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T14-39-38-04-00`

## Purpose

Define the next architecture boundary for `MyCozyIsland` without changing the visible scene.

The repo already has useful source-domain kits. The missing architecture layer is a pure proof boundary that turns route/source/action/movement/rail/cloud/render/host facts into stable JSON records.

## Current architecture shape

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local descriptor kits
  -> inline renderer adapters
  -> inline browser input handlers
  -> inline camera rail and movement policy
  -> inline cloud cache and cloud drift
  -> globalThis.CozyIsland compatibility object
```

## DSK/domain breakdown

```txt
my-cozy-island-host-proof-domain
├─ route-authority-domain
│  ├─ cozy-route-script-token-kit
│  ├─ cozy-active-route-version-kit
│  └─ cozy-route-version-result-kit
├─ source-authority-domain
│  ├─ cozy-source-profile-kit
│  ├─ cozy-source-fingerprint-kit
│  └─ cozy-scene-source-snapshot-kit
├─ action-authority-domain
│  ├─ cozy-action-frame-contract-kit
│  ├─ cozy-action-result-contract-kit
│  ├─ cozy-action-rejection-reason-kit
│  ├─ cozy-action-journal-kit
│  └─ cozy-input-journal-kit
├─ movement-authority-domain
│  ├─ cozy-movement-policy-result-kit
│  ├─ cozy-clearing-boundary-result-kit
│  └─ cozy-campfire-keepout-result-kit
├─ camera-rail-authority-domain
│  ├─ cozy-rail-state-kit
│  └─ cozy-camera-rail-snapshot-kit
├─ cloud-authority-domain
│  ├─ cozy-hero-cloud-descriptor-snapshot-kit
│  ├─ cozy-hero-cloud-cache-snapshot-kit
│  └─ cozy-cloud-drift-result-kit
├─ render-readback-domain
│  └─ cozy-render-host-snapshot-kit
└─ proof-authority-domain
   ├─ cozy-host-state-contract-kit
   ├─ cozy-host-snapshot-kit
   ├─ cozy-gamehost-diagnostics-kit
   ├─ cozy-dom-free-fixture-runner-kit
   └─ cozy-replay-parity-smoke-kit
```

## Module boundary to add first

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

## Compatibility boundary

The implementation must preserve:

```txt
index.html -> ./src/main-cloudform.js?v=hero-cloud-4
globalThis.CozyIsland
current visual scene
current local descriptor kit imports
```

The implementation may add:

```txt
globalThis.CozyIslandHost
src/host-proof/*
package script for the DOM-free fixture after fixture-cases.mjs exists
```

## Data flow target

```txt
route token
  -> RouteVersionResult
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame records
  -> ActionResult records
  -> MovementPolicyResult records
  -> CameraRailSnapshot records
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHostSnapshot
  -> fixture rows
  -> additive globalThis.CozyIslandHost diagnostics
```

## Why this comes before visuals

The scene is already composed and player-facing.

The unresolved risk is that a future agent cannot verify the route, source bundle, camera rail, movement rejections, cloud cache, drift, and renderer state without opening a browser and reading mutable Three.js objects.

## Stop condition

Stop the next implementation when `src/host-proof/fixture-cases.mjs` can prove the fixture rows without DOM, canvas, Three.js, browser, or a static server.
