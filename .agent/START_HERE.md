# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-08T11-40-00-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The full accessible `LuminaryLabs-Publish` repo list was compared against the central `LuminaryLabs-Dev/LuminaryLabs` repo ledger.

No checked non-Cavalry Publish repo was found that was fully new, central-ledger absent, undocumented, or missing root `.agent/START_HERE.md` state.

`MyCozyIsland` was selected as a fallback follow-up. The current finding is not missing docs. The current finding is that the visible route is stable, but route/source/action/movement/camera rail/hero-cloud state still lacks fixture-readable host snapshots.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

## Publish repos checked

```txt
LuminaryLabs-Publish/IntoTheMeadow       tracked / root .agent present
LuminaryLabs-Publish/HorrorCorridor      tracked / root .agent present
LuminaryLabs-Publish/AetherVale          tracked / root .agent present
LuminaryLabs-Publish/ZombieOrchard       tracked / root .agent present
LuminaryLabs-Publish/TheUnmappedHouse    tracked / root .agent present
LuminaryLabs-Publish/MyCozyIsland        selected fallback follow-up
LuminaryLabs-Publish/TheOpenAbove        tracked / root .agent present
LuminaryLabs-Publish/PhantomCommand      tracked / root .agent present
LuminaryLabs-Publish/TheCavalryOfRome    excluded by rule
LuminaryLabs-Publish/PrehistoricRush     tracked / root .agent present
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
RouteVersionResult(hero-cloud-4)
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
.agent/architecture-audit/2026-07-08T11-40-00-04-00-dsk-domain-breakdown.md
.agent/render-audit/2026-07-08T11-40-00-04-00-render-host-readback.md
.agent/interaction-audit/2026-07-08T11-40-00-04-00-movement-policy-result-matrix.md
.agent/cloud-system-audit/2026-07-08T11-40-00-04-00-hero-cloud-cache-drift-matrix.md
.agent/host-proof-audit/2026-07-08T11-40-00-04-00-host-snapshot-acceptance-matrix.md
.agent/trackers/2026-07-08T11-40-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-08T11-40-00-04-00.md
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

Do not change art direction during the host-proof pass.

Do not rewrite the renderer first.

The next runtime change should add pure host-proof helpers and wire them additively:

```txt
src/host-proof/*
  -> route/source/action/movement/rail/cloud result records
  -> DOM-free fixtures
  -> globalThis.CozyIslandHost
```

Keep `globalThis.CozyIsland` unchanged.

## Current next safe ledge

```txt
MyCozyIsland Host Snapshot Acceptance Matrix + Rail/Cloud Fixture Gate
```

Stop that ledge when fixtures prove route/source/action/movement/rail/cloud host records while the visible scene and legacy `globalThis.CozyIsland` compatibility remain unchanged.
