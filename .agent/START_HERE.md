# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T21-58-34-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible fallback in the current central readback. The central ledger alignment was older than the other checked non-excluded repo follow-up set and the host-proof browser consumer splice remains unresolved.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / central alignment 2026-07-08T20-21-59-04-00
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / central alignment 2026-07-08T20-38-28-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / central alignment 2026-07-08T21-08-41-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / central alignment 2026-07-08T21-18-39-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / central alignment 2026-07-08T21-00-12-04-00
LuminaryLabs-Publish/MyCozyIsland        selected / oldest eligible central alignment 2026-07-08T19-50-20-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / central alignment 2026-07-08T20-10-32-04-00
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / central alignment 2026-07-08T20-52-00-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / central alignment 2026-07-08T21-40-45-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route with local source-domain kits for landform, ocean floor, foliage, grass, wind, fenced clearing, campfire, smoke, clouds, and hero-cloud form.

The current route is:

```txt
index.html
  -> canvas#game
  -> cloud loader
  -> error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local descriptor kits
  -> inline render, interaction, cloud, movement, and camera loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, floor, foliage, grass, wind, clearing, campfire, smoke, and cloud descriptors
  -> create Three.js renderer, scene, camera, meshes, points, lights, fog, water, foam, path, grass, cloud cache
  -> install resize, keyboard, wheel, pointer, and drag handlers
  -> wheel mutates scroll progress directly
  -> rail() samples sky-to-eye camera curve when progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
  -> frame updates sea, movement, rail/camera, smoke, flame, cloud drift, render
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Target proof loop

```txt
RouteVersionResult
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> BrowserInputActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
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
.agent/architecture-audit/2026-07-08T21-58-34-04-00-browser-consumer-source-wire-dsk-breakdown.md
.agent/render-audit/2026-07-08T21-58-34-04-00-render-host-consumer-projection-map.md
.agent/interaction-audit/2026-07-08T21-58-34-04-00-input-action-result-consumer-map.md
.agent/cloud-system-audit/2026-07-08T21-58-34-04-00-cloud-drift-cache-result-map.md
.agent/grass-system-audit/2026-07-08T21-58-34-04-00-grass-instance-host-projection-map.md
.agent/host-proof-audit/2026-07-08T21-58-34-04-00-cozy-island-host-state-splice-contract.md
.agent/deploy-audit/2026-07-08T21-58-34-04-00-fixture-static-route-validation-map.md
.agent/trackers/2026-07-08T21-58-34-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T21-58-34-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
index.html
package.json
src/main-cloudform.js
src/kits/ocean-island-landform-domain/index.js
src/kits/island-foliage-domain/index.js
src/kits/grass-object-domain/index.js
src/kits/fenced-clearing-domain/index.js
src/kits/mattatz-clouds-domain/index.js
```

## Current next safe ledge

```txt
MyCozyIsland Browser Consumer Source Wire + Host Projection Fixture Gate
```

Preserve the current visible route and legacy `globalThis.CozyIsland` surface. Add fixture-readable proof records and an additive `globalThis.CozyIslandHost.getState()` before any visual rewrite or shared-kit promotion.
