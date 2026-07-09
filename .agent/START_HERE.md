# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T08-20-00-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible central fallback for this pass. The unresolved next cut remains fixture-readable host-state proof around route/source/action/movement/rail/grass/cloud/render records.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / central latest 2026-07-09T07-05-52-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / central latest 2026-07-09T06-01-30-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / central latest 2026-07-09T06-20-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / central latest 2026-07-09T07-19-41-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / central latest 2026-07-09T06-10-35-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / central latest 2026-07-09T07-41-29-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / central latest 2026-07-09T06-28-53-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible central fallback / previous central latest 2026-07-09T05-38-20-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / central latest 2026-07-09T08-02-33-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route. It vendors the source-domain kits it needs under `src/kits/` and runs from `index.html` without depending on a remote experiment repo at runtime.

The active route is:

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> inline renderer, input, movement, camera, smoke, flame, cloud drift, and legacy host diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, ocean floor, foliage graph, clearing graph, grass placement, grass wind, campfire, smoke, clouds
  -> create Three.js renderer, scene, camera, lights, fog, water, terrain, floor, foam, path, foliage, fence, campfire, smoke, grass, and point-cloud clouds
  -> install resize, keyboard, wheel, pointerdown, pointerup, and pointermove handlers
  -> wheel mutates scroll progress directly
  -> rail() samples the sky-to-eye camera curve while progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing boundary and campfire keepout only
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
.agent/architecture-audit/2026-07-09T08-20-00-04-00-host-state-cloud-grass-ledger-dsk-map.md
.agent/render-audit/2026-07-09T08-20-00-04-00-render-cloud-grass-readback-contract.md
.agent/interaction-audit/2026-07-09T08-20-00-04-00-input-action-movement-rail-contract.md
.agent/cloud-system-audit/2026-07-09T08-20-00-04-00-hero-cloud-cache-drift-fixture.md
.agent/grass-system-audit/2026-07-09T08-20-00-04-00-grass-placement-instance-fixture.md
.agent/host-proof-audit/2026-07-09T08-20-00-04-00-cozy-island-host-state-ledger.md
.agent/deploy-audit/2026-07-09T08-20-00-04-00-browser-fixture-check-gate.md
.agent/trackers/2026-07-09T08-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T08-20-00-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
index.html
package.json
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/ocean-floor-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/grass-wind-domain/index.js
src/kits/campfire-object-domain/index.js
src/kits/smoke-particle-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
src/kits/cozy-hero-cloud-form-kit/index.js
```
