# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T19-40-00-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repository list was compared against tracked repo-ledger state in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, absent from the central ledger, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible fallback by current sampled root-agent alignment. Its previous root alignment was `2026-07-08T17-09-48-04-00`, older than the other checked non-excluded repos after the same comparison pass.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present / sampled alignment 2026-07-08T18-19-43-04-00
LuminaryLabs-Publish/AetherVale          tracked / root .agent present / sampled alignment 2026-07-08T18-58-10-04-00
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present / sampled alignment 2026-07-08T17-31-22-04-00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present / sampled alignment 2026-07-08T18-41-41-04-00
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present / sampled alignment 2026-07-08T19-30-31-04-00
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present / sampled alignment 2026-07-08T19-21-15-04-00
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present / sampled alignment 2026-07-08T18-09-21-04-00
LuminaryLabs-Publish/MyCozyIsland        selected / oldest eligible fallback / previous alignment 2026-07-08T17-09-48-04-00
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present / sampled alignment 2026-07-08T18-51-55-04-00
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
  -> inline render/interaction/cloud/movement loop
  -> globalThis.CozyIsland compatibility diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island/floor/foliage/grass/wind/clearing/campfire/smoke/cloud descriptors
  -> create Three.js renderer, scene, camera, meshes, points, lights, fog, water, foam, path, grass, cloud cache
  -> install resize, keyboard, wheel, pointer, and drag handlers
  -> wheel changes scroll progress
  -> rail() samples sky-to-eye camera curve
  -> pointer changes yaw/look
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing radius and campfire keepout
  -> frame updates sea, movement, rail/camera, smoke, flame, cloud drift, render
  -> globalThis.CozyIsland exposes cloudContract, cloudPointCache, and getScrollProgress
```

## Target proof loop

```txt
RouteToken
  -> SourceProfile
  -> SceneSourceSnapshot
  -> ActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> GrassInstanceSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> RenderHostSnapshot
  -> CozyIslandHost.getState()
  -> DOM-free browser consumer fixture rows
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T19-40-00-04-00-host-proof-browser-consumer-dsk-map.md
.agent/render-audit/2026-07-08T19-40-00-04-00-render-host-consumer-readback.md
.agent/interaction-audit/2026-07-08T19-40-00-04-00-action-movement-browser-consumer-map.md
.agent/cloud-system-audit/2026-07-08T19-40-00-04-00-hero-cloud-cache-drift-consumer-map.md
.agent/grass-system-audit/2026-07-08T19-40-00-04-00-grass-instance-host-readback-map.md
.agent/host-proof-audit/2026-07-08T19-40-00-04-00-browser-consumer-fixture-manifest.md
.agent/deploy-audit/2026-07-08T19-40-00-04-00-static-route-validation-map.md
.agent/trackers/2026-07-08T19-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T19-40-00-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
index.html
package.json
src/main-cloudform.js
src/kits/**/index.js
```
