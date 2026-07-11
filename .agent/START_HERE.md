# START HERE: MyCozyIsland

Last aligned: `2026-07-11T01-50-30-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: establish route lifecycle and deterministic camera reset first, then add one authoritative dynamic-environment frame before adaptive-quality transaction work.

## Plan ledger

**Goal:** keep the 50-kit WebGPU route visually unchanged while documenting the missing temporal contract between the live environment clock, clock-derived domains, render consumers, reset, and diagnostics.

- [x] Compare the full accessible `LuminaryLabs-Publish` inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` under the oldest documented-selection rule.
- [x] Re-read route composition, environment services, scenario projection, render consumers, and tests.
- [x] Reconfirm the interaction loop, domains, services, and all 50 implemented kits.
- [x] Add a timestamped tracker, turn ledger, DSK audit, render audit, gameplay audit, interaction audit, environment-state audit, and deploy audit.
- [x] Refresh the required root `.agent` files.
- [x] Change no runtime source, dependencies, package scripts, route behavior, or deployment configuration.
- [x] Create no branch or pull request.

## Selection result

The accessible Publish inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state, so the oldest documented-selection rule applies.

```txt
MyCozyIsland    2026-07-11T00-10-28-04-00
AetherVale      2026-07-11T00-18-24-04-00
IntoTheMeadow   2026-07-11T00-30-48-04-00
PrehistoricRush 2026-07-11T00-39-25-04-00
TheOpenAbove    2026-07-11T00-49-45-04-00
HorrorCorridor  2026-07-11T01-10-28-04-00
PhantomCommand  2026-07-11T01-20-51-04-00
ZombieOrchard   2026-07-11T01-31-15-04-00
TheUnmappedHouse 2026-07-11T01-38-28-04-00
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize renderer and startup quality
  -> create clock, wind, weather, illumination, terrain, ocean, vegetation, cloud, fog, material, and render descriptors
  -> freeze one semantic render snapshot
  -> create scenario, camera sequence, world, ocean, foam, cloud, fog, and post consumers
  -> install browser input and resize listeners
  -> renderer.setAnimationLoop
  -> scenario.tick(dt) advances clock and camera
  -> scenario render snapshot replaces only clock and camera
  -> render consumers animate from elapsed or shader time
  -> adaptive performance sample
  -> host/debug projection
```

## Newly documented finding

The environment clock advances every scenario tick, and `windField.sample()` plus `illuminationService.getState()` can compute current values from that clock. However, the route samples most semantic environment descriptors once during startup and freezes them inside the render snapshot:

```txt
startup clock sample
  -> illumination
  -> vegetation wind
  -> campfire wind/smoke
  -> cloud weather and drift
  -> cloud lighting
  -> cloud shadow motion intent
  -> fog advection
  -> sky colors, scene fog, exposure, sun, and hemisphere light
  -> frozen render snapshot and constructed consumers

later scenario ticks
  -> clock advances
  -> camera advances
  -> frozen semantic environment descriptors remain unchanged
  -> shader time and local sine functions animate presentation independently
```

This creates two different notions of environment time:

```txt
authoritative semantic time: mostly startup state
presentation time: current shader or elapsed time
```

The route therefore cannot prove that sky, direct light, cloud lighting, cloud drift, fog advection, vegetation wind, campfire smoke, exposure, and diagnostics consumed one coherent environment state for the same clock sample. Reset also rewinds the clock without returning an environment-frame reset/application result.

## Ordered safe ledges

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. MyCozyIsland Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

4. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T01-50-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T01-50-30-04-00.md
.agent/architecture-audit/2026-07-11T01-50-30-04-00-dynamic-environment-frame-authority-dsk-map.md
.agent/render-audit/2026-07-11T01-50-30-04-00-clock-environment-consumer-staleness-gap.md
.agent/gameplay-audit/2026-07-11T01-50-30-04-00-reveal-clock-environment-coherence-loop.md
.agent/interaction-audit/2026-07-11T01-50-30-04-00-reset-time-environment-result-map.md
.agent/environment-state-audit/2026-07-11T01-50-30-04-00-clock-wind-illumination-projection-contract.md
.agent/deploy-audit/2026-07-11T01-50-30-04-00-environment-frame-coherence-fixture-gate.md
```

## Do not start next with

- cloud, fog, ocean, terrain, grass, camera feel, or lighting retuning
- renderer replacement
- more shader-time animation without semantic state provenance
- new weather presets before one dynamic environment frame exists
- new quality tiers
- route-token churn
- new island content
- more GPU allocation before lifecycle ownership
