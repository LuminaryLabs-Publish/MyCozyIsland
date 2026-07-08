# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T10-28-44-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as the oldest eligible fallback follow-up. The new finding is not a missing root agent. The new finding is a stale route-token planning gap: `index.html` currently loads `./src/main-cloudform.js?v=hero-cloud-4`, while prior `.agent` docs and registry entries still referenced `hero-cloud-3`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/AetherVale          ledgered with root .agent; last seen 2026-07-08T10-19-57-04-00
LuminaryLabs-Publish/HorrorCorridor      ledgered with root .agent; last seen 2026-07-08T09:40:52-04:00
LuminaryLabs-Publish/IntoTheMeadow       ledgered with root .agent; last seen 2026-07-08T09:11:03-04:00
LuminaryLabs-Publish/MyCozyIsland        selected fallback follow-up; stale hero-cloud route token docs found
LuminaryLabs-Publish/PhantomCommand      ledgered with root .agent; last seen 2026-07-08T09:19:43-04:00
LuminaryLabs-Publish/PrehistoricRush     ledgered with root .agent; last seen 2026-07-08T09:29:20-04:00
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/TheOpenAbove        ledgered with root .agent; last seen 2026-07-08T10-10-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse    ledgered with root .agent; last seen 2026-07-08T10-01-57-04-00
LuminaryLabs-Publish/ZombieOrchard       ledgered with root .agent; last seen 2026-07-08T09-48-58-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js publish app that proves a cozy island scene with local source descriptor kits, a scroll-driven sky-to-first-person camera rail, a fenced campfire clearing, grass, foliage, shoreline, ocean floor, smoke, and a readable hero-cloud form.

The active route is:

```txt
index.html
  -> ./src/main-cloudform.js?v=hero-cloud-4
```

## Current interaction loop

```txt
static browser route
  -> canvas#game, cloud loader, and error panel
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN and local domain-kit imports
  -> source contract construction
  -> Three.js render adapter construction
  -> wheel changes scroll rail progress
  -> pointer drag changes orbit or first-person look state
  -> keyboard movement unlocks after first-person threshold
  -> clearing/campfire movement policy accepts or rejects movement inline
  -> frame loop animates sea, smoke, fire, camera, and clouds
  -> globalThis.CozyIsland exposes compatibility diagnostics
```

## Target proof loop

```txt
RouteScriptToken
  -> RouteVersionResult(hero-cloud-4)
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame
  -> ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> HeroCloudDescriptorSnapshot
  -> HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> CozyIslandHostSnapshot
  -> DOM-free fixture cases
  -> additive globalThis.CozyIslandHost readback
```

## First files to read

```txt
.agent/current-audit.md
.agent/known-gaps.md
.agent/next-steps.md
.agent/validation.md
.agent/architecture-audit/2026-07-08T10-28-44-04-00-route-host-proof-dsk-breakdown.md
.agent/render-audit/2026-07-08T10-28-44-04-00-render-route-token-readback.md
.agent/interaction-audit/2026-07-08T10-28-44-04-00-action-movement-proof-map.md
.agent/host-proof-audit/2026-07-08T10-28-44-04-00-route-version-authority-sync.md
.agent/host-proof-audit/acceptance-ledger.md
.agent/host-proof-audit/2026-07-08T08-58-57-04-00-implementation-wire-map.md
.agent/trackers/2026-07-08T10-28-44-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T10-28-44-04-00.md
.agent/kit-registry.json
```

## Source files to inspect next

```txt
README.md
package.json
index.html
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

## Main rule

Do not change art direction during the route/host-proof pass.

Do not rewrite the renderer.

The next runtime change should add route token and host proof as additive source helpers:

```txt
index route token
  -> RouteVersionResult(hero-cloud-4)
  -> SourceProfile
  -> SourceFingerprint
  -> SceneSourceSnapshot
  -> ActionFrame / ActionResult
  -> MovementPolicyResult
  -> CameraRailSnapshot
  -> HeroCloudDescriptorSnapshot / HeroCloudCacheSnapshot
  -> CloudDriftResult
  -> CozyIslandHostSnapshot
  -> DOM-free fixtures
```

## Current next safe ledge

```txt
MyCozyIsland Route Version Authority Sync + Host Proof Fixture Gate
```

Stop that ledge when fixtures prove `hero-cloud-4` route authority and source/host proof records while the visible scene and legacy `globalThis.CozyIsland` compatibility remain unchanged.
