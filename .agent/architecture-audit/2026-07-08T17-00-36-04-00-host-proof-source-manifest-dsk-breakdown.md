# Architecture Audit: Host Proof Source Manifest DSK Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T17-00-36-04-00`

## Current architecture read

`MyCozyIsland` is a single static route driven by `index.html` and `src/main-cloudform.js`.

`src/main-cloudform.js` does three jobs at once:

```txt
1. compose source-domain descriptors
2. adapt descriptors into Three.js runtime objects
3. own input, movement, camera, frame loop, and global diagnostics
```

That shape is acceptable for a small publish route, but the next pass needs a pure host-proof layer so later agents can prove route/source/runtime facts without opening a browser.

## Current DSK/domain tree

```txt
my-cozy-island-route
├─ static-browser-shell
│  ├─ index-html-kit
│  ├─ canvas-host-kit
│  ├─ cloud-loader-ui-kit
│  └─ error-panel-kit
├─ source-domain-runtime
│  ├─ ocean-island-landform-domain
│  ├─ ocean-floor-domain
│  ├─ island-foliage-domain
│  ├─ grass-object-domain
│  ├─ grass-wind-domain
│  ├─ fenced-clearing-domain
│  ├─ campfire-object-domain
│  ├─ smoke-particle-domain
│  ├─ mattatz-clouds-domain
│  └─ cozy-hero-cloud-form-kit
├─ inline-render-runtime
│  ├─ terrain-render-adapter
│  ├─ ocean-floor-render-adapter
│  ├─ water-plane-render-adapter
│  ├─ foam-render-adapter
│  ├─ path-render-adapter
│  ├─ foliage-render-adapter
│  ├─ fence-render-adapter
│  ├─ campfire-render-adapter
│  ├─ smoke-runtime-adapter
│  ├─ grass-instancing-adapter
│  └─ hero-cloud-point-render-adapter
└─ inline-interaction-runtime
   ├─ scroll-camera-rail-kit
   ├─ pointer-look-kit
   ├─ keyboard-movement-kit
   ├─ clearing-boundary-policy-kit
   ├─ campfire-keepout-policy-kit
   └─ legacy-global-diagnostics-kit
```

## Target DSK/domain tree

```txt
my-cozy-island-host-proof
├─ route-authority
│  ├─ route-script-token-kit
│  └─ route-version-result-kit
├─ source-authority
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  └─ scene-source-snapshot-kit
├─ action-authority
│  ├─ action-frame-contract-kit
│  ├─ action-result-contract-kit
│  ├─ action-rejection-reason-kit
│  └─ action-journal-kit
├─ movement-authority
│  ├─ movement-policy-result-kit
│  ├─ clearing-boundary-result-kit
│  └─ campfire-keepout-result-kit
├─ camera-rail-authority
│  ├─ rail-state-kit
│  └─ camera-rail-snapshot-kit
├─ grass-authority
│  ├─ grass-source-readback-kit
│  └─ grass-instance-snapshot-kit
├─ cloud-authority
│  ├─ hero-cloud-descriptor-snapshot-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  └─ cloud-drift-result-kit
├─ render-readback-authority
│  └─ render-host-snapshot-kit
└─ proof-authority
   ├─ host-state-contract-kit
   ├─ gamehost-diagnostics-kit
   ├─ dom-free-fixture-runner-kit
   └─ replay-parity-smoke-kit
```

## Source-file manifest

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

## Critical boundary rule

The host-proof modules must not import Three.js, touch DOM APIs, open canvas, or depend on `performance.now`.

They may accept plain records derived from browser/runtime state.

## Target result records

```txt
RouteVersionResult
SourceProfile
SourceFingerprint
SceneSourceSnapshot
ActionFrame
ActionResult
MovementPolicyResult
CameraRailSnapshot
GrassInstanceSnapshot
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
RenderHostSnapshot
CozyIslandHostSnapshot
```

## Consumer splice rule

`src/main-cloudform.js` should stay the browser composition file.

The next runtime implementation should import pure host-proof helpers, project records beside existing logic, and expose them additively through `globalThis.CozyIslandHost` while leaving `globalThis.CozyIsland` intact.

## Stop condition for next implementation

Stop when fixture rows prove the source records and `src/main-cloudform.js` exposes additive diagnostics without changing visuals, camera tuning, grass count, cloud drift math, or movement policy.