# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T14-26-56-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible documented fallback and central-ledger catch-up target. The central ledger still pointed at `2026-07-09T11-39-50-04-00`, while repo-local state had already advanced to `2026-07-09T14-20-00-04-00`. This pass normalizes repo-local and central pointers to the current host-readback fixture ledge.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T12-08-46-04-00
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T12-30-09-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T14-01-54-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T13-18-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T13-38-15-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / root .agent present / oldest eligible host-readback fallback
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T11-50-08-04-00
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T13-00-37-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T12-00-36-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route.

It vendors source-domain kits under `src/kits/` and runs from `index.html` without depending on a remote experiment repo at runtime.

The active route is:

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> inline renderer, input, movement, camera, smoke, flame, cloud drift, grass instancing, and legacy host diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, clouds, and hero-cloud descriptors
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout only
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, flame scale, and renderer
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Target proof loop

```txt
RouteTokenReadback
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> BrowserInputActionFrame
  -> ActionResult
  -> InputJournalEntry
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassPlacementSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHost.getState()
  -> DOM-free browser consumer fixture rows
  -> central ledger sync
```

## Domains in use

```txt
static-browser-route-domain
route-token-domain
loading-status-domain
error-panel-domain
three-render-host-domain
scene-composition-domain
island-landform-domain
ocean-floor-domain
shoreline-foam-domain
path-network-domain
foliage-object-graph-domain
fenced-clearing-domain
campfire-object-domain
smoke-particle-domain
grass-placement-domain
grass-wind-domain
hero-cloud-source-domain
hero-cloud-geometry-cache-domain
cloud-drift-domain
input-state-domain
scroll-progress-domain
pointer-look-domain
first-person-movement-domain
movement-validity-domain
camera-rail-domain
render-frame-domain
legacy-host-diagnostics-domain
planned-source-host-readback-domain
central-ledger-sync-domain
```

## Kits and services

```txt
implemented explicit kits:
  - ocean-island-landform-domain: source heightfield, masks, shoreline, terrain contract
  - island-foliage-domain: dense object graph and path network
  - ocean-floor-domain: ocean floor heightfield and water material contract
  - grass-object-domain: grass placement contract
  - grass-wind-domain: wind descriptor
  - campfire-object-domain: campfire object graph
  - smoke-particle-domain: smoke particle descriptor
  - fenced-clearing-domain: clearing, fence, collision, player anchor, exclusion zones
  - mattatz-clouds-domain: cloud state and render contract
  - cozy-hero-cloud-form-kit: hero cloud form descriptors

runtime-implied kits:
  - cozy-static-shell-kit
  - cozy-cloud-loader-kit
  - cozy-error-panel-kit
  - cozy-route-script-token-kit
  - cozy-three-render-host-kit
  - cozy-scene-composition-kit
  - cozy-terrain-render-kit
  - cozy-ocean-floor-render-kit
  - cozy-water-plane-kit
  - cozy-shoreline-foam-kit
  - cozy-path-render-kit
  - cozy-foliage-render-kit
  - cozy-fence-render-kit
  - cozy-campfire-render-kit
  - cozy-smoke-render-kit
  - cozy-grass-instanced-render-kit
  - cozy-hero-cloud-point-cache-kit
  - cozy-cloud-drift-frame-kit
  - cozy-camera-rail-kit
  - cozy-first-person-movement-kit
  - cozy-movement-validity-kit
  - cozy-render-frame-loop-kit
  - cozy-legacy-host-diagnostics-kit

next-cut proof kits:
  - route-token-readback-kit
  - source-profile-kit
  - source-fingerprint-kit
  - scene-source-snapshot-kit
  - browser-input-action-frame-kit
  - action-result-kit
  - input-journal-kit
  - movement-policy-result-kit
  - camera-rail-snapshot-kit
  - grass-placement-snapshot-kit
  - grass-instance-snapshot-kit
  - hero-cloud-descriptor-snapshot-kit
  - hero-cloud-cache-snapshot-kit
  - cloud-drift-result-kit
  - render-host-snapshot-kit
  - cozy-island-host-snapshot-kit
  - browser-consumer-fixture-kit
  - central-ledger-readback-kit
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T14-26-56-04-00-host-readback-central-sync-dsk-map.md
.agent/render-audit/2026-07-09T14-26-56-04-00-render-grass-cloud-host-readback.md
.agent/interaction-audit/2026-07-09T14-26-56-04-00-input-rail-action-result-map.md
.agent/cloud-system-audit/2026-07-09T14-26-56-04-00-cloud-cache-drift-fixture-map.md
.agent/grass-system-audit/2026-07-09T14-26-56-04-00-grass-instance-readback-map.md
.agent/host-proof-audit/2026-07-09T14-26-56-04-00-host-state-source-readback-contract.md
.agent/deploy-audit/2026-07-09T14-26-56-04-00-dom-free-fixture-check-gate.md
.agent/trackers/2026-07-09T14-26-56-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T14-26-56-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
index.html
package.json
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
```

## Source files to add next

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

## Main rule

Preserve `index.html`, `./src/main-cloudform.js?v=hero-cloud-4`, the current visible scene, the legacy `globalThis.CozyIsland` surface, the input thresholds, the clearing/campfire movement constraints, and the current cloud look.

Add fixture-readable proof records and an additive `globalThis.CozyIslandHost.getState()` before any visual rewrite, renderer extraction, or shared-kit promotion.

## Current next safe ledge

```txt
MyCozyIsland Host Readback Central Sync + Browser Consumer Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled repo breakdowns moving; do not pause the loop.
```
