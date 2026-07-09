# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T14-20-00-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, missing sampled root `.agent/START_HERE.md` state, or otherwise undocumented.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible documented fallback after same-day catch-up passes. Its central pointer still trailed the other active Publish repos, and the unresolved implementation ledge is still source/host readback plus DOM-free browser consumer fixture proof.

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

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-09T14-20-00-04-00-host-readback-fixture-freeze-dsk-map.md
.agent/render-audit/2026-07-09T14-20-00-04-00-render-cloud-grass-consumer-fixture.md
.agent/interaction-audit/2026-07-09T14-20-00-04-00-input-rail-action-result-readback.md
.agent/cloud-system-audit/2026-07-09T14-20-00-04-00-cloud-cache-drift-readback-fixture.md
.agent/grass-system-audit/2026-07-09T14-20-00-04-00-grass-instance-readback-fixture.md
.agent/host-proof-audit/2026-07-09T14-20-00-04-00-host-state-source-snapshot-contract.md
.agent/deploy-audit/2026-07-09T14-20-00-04-00-dom-free-fixture-check-map.md
.agent/trackers/2026-07-09T14-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T14-20-00-04-00.md
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
MyCozyIsland Host Readback Fixture Freeze + Browser Consumer Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled repo breakdowns moving; do not pause the loop.
```
