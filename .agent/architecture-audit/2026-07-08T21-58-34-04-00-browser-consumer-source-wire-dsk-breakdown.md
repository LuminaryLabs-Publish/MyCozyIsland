# Architecture Audit: Browser Consumer Source Wire DSK Breakdown

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T21-58-34-04-00`

## Architectural read

`MyCozyIsland` is already decomposed at the source descriptor level. The missing architectural cut is not more domain naming. It is a proof layer between descriptor creation and browser consumption.

`src/main-cloudform.js` currently imports descriptor kits, creates source records, immediately converts them into Three.js objects, mutates runtime state through DOM input handlers, and exposes only `globalThis.CozyIsland`.

## Current DSK/domain tree

```txt
my-cozy-island-route
├─ static-browser-shell
│  ├─ index.html
│  ├─ cloud-loader-ui
│  └─ error-panel-ui
├─ source-descriptor-domain
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
├─ inline-render-host-domain
│  ├─ terrain-render-consumer
│  ├─ floor-render-consumer
│  ├─ water-render-consumer
│  ├─ foam-render-consumer
│  ├─ path-render-consumer
│  ├─ foliage-render-consumer
│  ├─ fence-render-consumer
│  ├─ campfire-render-consumer
│  ├─ smoke-runtime-consumer
│  ├─ grass-instancing-consumer
│  └─ hero-cloud-point-render-consumer
├─ interaction-domain
│  ├─ wheel-progress-input
│  ├─ pointer-look-input
│  ├─ keyboard-first-person-input
│  └─ movement-policy
├─ camera-domain
│  ├─ scroll-camera-rail
│  └─ first-person-eye-camera
├─ cloud-runtime-domain
│  ├─ hero-cloud-geometry-cache
│  └─ cloud-drift-runtime
└─ diagnostics-domain
   └─ globalThis.CozyIsland
```

## Target DSK/domain tree

```txt
my-cozy-island-route
├─ source-descriptor-domain
├─ host-proof-domain
│  ├─ route-version-result-kit
│  ├─ source-profile-kit
│  ├─ source-fingerprint-kit
│  ├─ scene-source-snapshot-kit
│  ├─ browser-input-action-frame-kit
│  ├─ action-result-kit
│  ├─ input-journal-kit
│  ├─ movement-policy-result-kit
│  ├─ camera-rail-snapshot-kit
│  ├─ grass-instance-snapshot-kit
│  ├─ hero-cloud-descriptor-snapshot-kit
│  ├─ hero-cloud-cache-snapshot-kit
│  ├─ cloud-drift-result-kit
│  ├─ render-host-snapshot-kit
│  └─ cozy-island-host-state-kit
├─ browser-consumer-domain
│  ├─ main-cloudform-source-splice
│  ├─ host-state-projection
│  └─ legacy-global-compatibility
└─ fixture-domain
   ├─ browser-consumer-fixture-kit
   └─ dom-free-fixture-runner-kit
```

## Required implementation boundary

```txt
Do not rewrite visuals.
Do not extract renderer first.
Do not change route token.
Do not remove globalThis.CozyIsland.
Do not promote to shared Nexus Engine kits before repo-local fixture proof.
```

## Next source modules

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
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Fixture acceptance rows

```txt
route token is hero-cloud-4
all ten explicit local descriptor kits appear in SourceProfile
same descriptor inputs produce same SourceFingerprint
SceneSourceSnapshot includes landform, floor, foliage, grass, clearing, fire, smoke, clouds
wheel input creates clamped progress ActionResult
pointer input creates yaw/look ActionResult
keyboard movement is rejected before first-person threshold
movement accepts inside clearing and outside campfire keepout
movement rejects outside clearing
movement rejects inside campfire keepout
camera rail snapshot records position/look for sample progress values
grass instance snapshot records placement.patchCount and instance count
hero cloud descriptor snapshot records cloud contract fields
hero cloud cache snapshot records saved point cloud count
cloud drift result records deterministic delta without WebGL
render host snapshot records scene/camera/renderer consumer facts
CozyIslandHost snapshot includes all projection sections
legacy CozyIsland remains compatible
```

## Handoff

The next implementation pass should treat this as an additive proof layer. Add pure modules, prove them with fixture rows, then splice read-only projections into `src/main-cloudform.js`.
