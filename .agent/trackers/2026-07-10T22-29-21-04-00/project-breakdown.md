# Project Breakdown: MyCozyIsland Adaptive Quality Authority

Timestamp: `2026-07-10T22-29-21-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch policy: direct to `main`; no branch or pull request.

## Plan ledger

### Goal

Reconcile the full Publish inventory, select one eligible repository, document its current interaction/domain/kit/service architecture, and isolate the next source-backed correctness gap without changing runtime behavior.

### Checklist

- [x] Compared all ten accessible Publish repositories.
- [x] Excluded `TheCavalryOfRome`.
- [x] Confirmed all nine eligible repositories have central ledger and root `.agent` state.
- [x] Selected the oldest eligible repository.
- [x] Worked on one Publish repository only.
- [x] Identified the interaction loop.
- [x] Identified all current domain groups.
- [x] Cataloged all 50 declared kits.
- [x] Cataloged kit services and renderer consumers.
- [x] Inspected startup quality, adaptive budget, renderer controls, debug projection, and tests.
- [x] Preserved runtime-session lifecycle as the first implementation gate.
- [x] Added a second bounded adaptive-quality authority gate.
- [x] Added timestamped architecture, render, gameplay, interaction, performance, and deploy audits.
- [x] Changed documentation only.

## Selection comparison

```txt
MyCozyIsland       selected / prior 2026-07-10T20-48-55-04-00
PrehistoricRush    tracked  / 2026-07-10T21-00-16-04-00
AetherVale         tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow      tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove       tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor     tracked  / 2026-07-10T21-39-22-04-00
PhantomCommand     tracked  / 2026-07-10T21-49-26-04-00
ZombieOrchard      tracked  / 2026-07-10T22-11-24-04-00
TheUnmappedHouse   tracked  / 2026-07-10T22-21-17-04-00
TheCavalryOfRome   excluded by rule
```

## Interaction loop

```txt
page/import map
  -> validate 50 kits
  -> renderer.init()
  -> choose startup quality from URL/capability policy
  -> create deterministic domain snapshot
  -> create render consumers and GPU/CPU atmosphere resources
  -> install browser input and resize listeners
  -> start animation loop
  -> scenario and camera update
  -> world and foam update
  -> sample frame interval
  -> performance state transition
  -> apply cloud/fog/post/pixel-ratio controls
  -> render
  -> periodic debug projection
  -> aggregate host snapshot
```

## Domains in use

```txt
route shell, loader, error, hint, import map, route token
kit catalog validation and dependency/capability metadata
deterministic seed, RNG, hashes, noise, FBM
environment clock, wind, weather, illumination, aerial perspective
terrain surface, biome, shoreline, LOD, ground contact
ocean floor, waves, optics, underwater state, caustics, glitter, foam
vegetation archetypes, placement, wind, LOD, rocks, props, campfire, layered grass
cloud weather, density, lighting, LOD, shadow, horizon
fog density, advection, placement
render materials, archetypes, startup quality, fallback, immutable snapshot
camera rail, first-person movement, scenario state
world/ocean/foam/cloud/fog/post render consumers
GPU/CPU atmosphere volume creation
adaptive performance budget and renderer-control application
browser input, resize, debug overlay, global host readback
static source validation and deterministic domain smoke testing
planned runtime-session lifecycle/resource authority
planned adaptive-quality transaction/observation authority
```

## Services offered by current kits

```txt
catalog:
  identity, domain ownership, capabilities, dependencies, validation

determinism:
  stable seed, scoped streams, hashes, value noise, FBM

environment:
  clock, wind, weather, illumination, aerial perspective

terrain:
  surface/height/field sampling, biome weights, shoreline, LOD, ground contact

ocean:
  floor, wave, optics, underwater, caustics, glitter, foam descriptors

vegetation:
  archetypes, placement rows, grouping, wind, LOD, rocks, props, campfire

atmosphere:
  cloud/fog recipes, light, shadow, horizon, advection, placement, volume textures

render description:
  startup quality, materials, archetypes, fallback policy, immutable snapshot

render consumption:
  world/ocean/foam/cloud/fog/post construction, mutable controls, frame render

scenario:
  wheel/drag/key input, camera rail, constrained movement, tick/reset/snapshot

performance/debug:
  moving average, hysteresis, degrade/recover callbacks, overlay, aggregate readback

validation:
  catalog/source/static checks and deterministic domain smoke
```

## Implemented kits

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

## New source-backed finding

The budget state machine itself can return from level 1 to level 0, but the route's application callback does not reapply the startup pixel ratio at level 0. This creates an authority split:

```txt
declared performance level: 0
cloud/fog/post controls: restored
renderer pixel ratio: may remain at level-1 multiplier
debug quality label: static startup tier
host applied-quality proof: absent
```

The control application is sequential and unguarded, so a failure after one or more mutations can also leave a partially applied quality level.

## Candidate kits for the bounded follow-on

```txt
adaptive-quality-state-kit
adaptive-quality-target-descriptor-kit
adaptive-quality-transition-policy-kit
adaptive-quality-application-transaction-kit
adaptive-quality-result-kit
renderer-pixel-ratio-control-kit
volumetric-step-control-kit
fog-resolution-control-kit
quality-override-admission-kit
adaptive-quality-journal-kit
adaptive-quality-host-observation-kit
adaptive-quality-transition-fixture-kit
```

These are proposed boundaries, not implemented catalog entries.

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority + Resource Disposal Fixture Gate
2. Adaptive Quality Transaction Authority + Full-Recovery Fixture Gate
3. Layered Grass Source/Resource Child Ownership Proof
4. Source-consumer/frame attribution journals
5. visual or content expansion
```
