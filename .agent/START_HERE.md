# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-09T00-20-08-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual breakdown work on `MyCozyIsland`.

Read this folder before changing implementation code.

## Current selection result

The accessible `LuminaryLabs-Publish` organization repo list was compared against the tracked/documented repo ledger in `LuminaryLabs-Dev/LuminaryLabs` and sampled root `.agent/START_HERE.md` state.

No checked non-Cavalry Publish repo was fully new, central-ledger absent, undocumented, recently added but undocumented, or missing sampled root `.agent/START_HERE.md` state.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded by standing rule.

`MyCozyIsland` was selected as the oldest eligible sampled fallback. The current route is stable, but the host-proof browser consumer splice is still unresolved: source descriptors, input actions, movement policy, camera rail output, grass instance consumption, hero-cloud cache/drift, render readback, and additive host diagnostics are not fixture-readable yet.

## Publish repos checked

```txt
LuminaryLabs-Publish/HorrorCorridor       tracked / root .agent present / sampled alignment 2026-07-08T22-51-43-04-00
LuminaryLabs-Publish/AetherVale           tracked / root .agent present / sampled alignment 2026-07-09T00-00-41-04-00
LuminaryLabs-Publish/TheOpenAbove         tracked / root .agent present / sampled alignment 2026-07-08T22-19-38-04-00
LuminaryLabs-Publish/TheCavalryOfRome     excluded by rule
LuminaryLabs-Publish/PhantomCommand       tracked / root .agent present / sampled alignment 2026-07-08T22-58-02-04-00
LuminaryLabs-Publish/PrehistoricRush      tracked / root .agent present / sampled alignment 2026-07-09T00-09-22-04-00
LuminaryLabs-Publish/ZombieOrchard        tracked / root .agent present / sampled alignment 2026-07-08T23-40-55-04-00
LuminaryLabs-Publish/IntoTheMeadow        tracked / root .agent present / sampled alignment 2026-07-08T22-38-17-04-00
LuminaryLabs-Publish/MyCozyIsland         selected / oldest eligible sampled alignment 2026-07-08T21-58-34-04-00
LuminaryLabs-Publish/TheUnmappedHouse     tracked / root .agent present / sampled alignment 2026-07-08T23-19-33-04-00
```

## Current product read

`MyCozyIsland` is a standalone static Three.js cozy island route with local source-domain kits for landform, ocean floor, foliage, grass, wind, fenced clearing, campfire, smoke, clouds, and hero-cloud form.

The active route is:

```txt
index.html
  -> canvas#game
  -> #cloud-loader
  -> #error
  -> ./src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local source-domain descriptor kits
  -> inline renderer, input, movement, camera, smoke, flame, cloud drift, and host diagnostics
```

## Current interaction loop

```txt
static browser route
  -> load src/main-cloudform.js?v=hero-cloud-4
  -> import Three.js CDN and local source-domain kits
  -> construct island, ocean floor, foliage, clearing, fire, smoke, grass, and cloud descriptors
  -> create Three.js renderer, scene, camera, meshes, points, lights, fog, water, foam, path, grass, cloud cache
  -> install resize, keyboard, wheel, pointerdown, pointerup, pointermove handlers
  -> wheel mutates scroll progress directly
  -> rail() samples sky-to-eye camera curve while progress < 0.985
  -> pointer mutates yaw before first-person and yaw/pitch after first-person
  -> keyboard movement unlocks at progress >= 0.985
  -> valid(next) accepts or rejects movement by clearing boundary and campfire keepout only
  -> frame updates sea bob, first-person movement or rail camera, smoke, flame, cloud drift, and renderer
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
.agent/architecture-audit/2026-07-09T00-20-08-04-00-host-projection-fixture-catchup-dsk-map.md
.agent/render-audit/2026-07-09T00-20-08-04-00-render-consumer-readback-map.md
.agent/interaction-audit/2026-07-09T00-20-08-04-00-input-action-movement-result-map.md
.agent/cloud-system-audit/2026-07-09T00-20-08-04-00-hero-cloud-cache-drift-contract.md
.agent/grass-system-audit/2026-07-09T00-20-08-04-00-grass-instance-fixture-contract.md
.agent/host-proof-audit/2026-07-09T00-20-08-04-00-cozy-island-host-state-contract.md
.agent/deploy-audit/2026-07-09T00-20-08-04-00-fixture-validation-command-map.md
.agent/trackers/2026-07-09T00-20-08-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-09T00-20-08-04-00.md
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

## Main rule

Preserve `index.html`, `./src/main-cloudform.js?v=hero-cloud-4`, the current visible scene, the legacy `globalThis.CozyIsland` surface, the input thresholds, the clearing/campfire movement constraints, and the current cloud look.

Add fixture-readable proof records and an additive `globalThis.CozyIslandHost.getState()` before any visual rewrite, renderer extraction, or shared-kit promotion.

## Current next safe ledge

```txt
MyCozyIsland Host Projection Fixture Catch-up + Browser Consumer Readback Gate
```