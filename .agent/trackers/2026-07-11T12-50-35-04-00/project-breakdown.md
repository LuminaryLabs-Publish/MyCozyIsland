# Project Breakdown: MyCozyIsland Adaptive Quality Authority

Timestamp: `2026-07-11T12-50-35-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Summary

MyCozyIsland has a working frame-time sampler and three adaptive levels, but the transition is not authoritative. The browser callback directly mutates cloud steps, fog steps, fog resolution and pixel ratio with no session fence, transaction, rollback, consumer acknowledgement or committed-frame proof.

A concrete recovery defect exists: returning from level 1 to level 0 restores cloud/fog step scales and fog resolution, but does not restore the original pixel ratio because `renderer.setPixelRatio(...)` only runs when `level > 0`.

## Plan ledger

**Goal:** map the complete product and define a fixture-backed adaptive-quality transaction that is cadence-independent, fully reversible and correlated with one visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland`, the oldest current eligible central-ledger entry.
- [x] Trace startup quality selection, frame sampling, level decisions and all mutable consumers.
- [x] Identify the interaction loop, domains, all 50 local kits and their service groups.
- [x] Confirm frame-count thresholds vary by refresh rate.
- [x] Confirm level-zero recovery does not restore pixel ratio.
- [x] Define prepare, commit, rollback, effective-state, frame-ack and fixture boundaries.
- [x] Change no runtime, rendering, package or deployment behavior.
- [x] Push documentation directly to `main` without a branch or pull request.

## Selection comparison

```txt
MyCozyIsland      2026-07-11T11-19-10-04-00 selected
TheOpenAbove      2026-07-11T11-31-06-04-00
HorrorCorridor    2026-07-11T11-39-11-04-00
PhantomCommand    2026-07-11T11-51-06-04-00
ZombieOrchard     2026-07-11T12-01-38-04-00
TheUnmappedHouse  2026-07-11T12-08-47-04-00
AetherVale        2026-07-11T12-18-42-04-00
IntoTheMeadow     2026-07-11T12-29-49-04-00
PrehistoricRush   2026-07-11T12-39-53-04-00
TheCavalryOfRome  excluded
```

## Interaction loop

```txt
route startup
  -> validate 50-kit catalog
  -> initialize WebGPU/WebGL2 renderer
  -> choose startup quality from backend, memory, viewport, DPR and reduced-motion preference
  -> create Core World and compatibility render graph
  -> create performance budget with degrade/recover callbacks
  -> install browser listeners, timers, animation loop and global host

animation frame
  -> sample raw frame duration
  -> advance scenario and camera
  -> update Core World focus
  -> update compatibility world and foam
  -> performanceBudget.sample(frameMs)
  -> maybe change adaptive level
  -> directly mutate cloud steps, fog steps, fog resolution and pixel ratio
  -> render post pipeline
  -> materialize cells
  -> expose debug/global observations
```

## Domains in use

```txt
browser route, loader, error projection and global host
renderer backend admission and startup quality policy
runtime session, callback and resource lifecycle
Core World registration, partition, providers, focus and snapshots
lazy cell materialization and world query
terrain, clearing, biome, shoreline, paths and ground contact
vegetation, rocks, props and campfire
clock, wind, weather, illumination and aerial perspective
ocean, foam, clouds and rolling fog
camera rail, first-person movement and scenario state
compatibility world rendering and disconnected cell-aware rendering
post processing, performance sampling and debug projection
adaptive quality decision, transition, rollback and frame proof
validation, static tests and Pages deployment
```

## Implemented kits and services

### Rendering and host kits

```txt
debug-overlay-host-kit                  debug visibility and text projection
webgl2-fallback-renderer-kit            fallback capability policy
webgpu-compute-atmosphere-renderer-kit  GPU/CPU cloud and fog volume creation
webgpu-foam-renderer-kit                shoreline foam rendering and animation
webgpu-ocean-renderer-kit               ocean geometry, optics and animation
webgpu-performance-budget-kit           EMA frame sampling and level callbacks
webgpu-post-processing-renderer-kit     scene, fog, blur and output composition
webgpu-rolling-fog-renderer-kit         fog volume, raymarch steps and step scaling
webgpu-stylized-material-renderer-kit   material and render archetype consumption
webgpu-volumetric-cloud-renderer-kit    cloud volumes and step scaling
camera-rail-sequence-kit                reveal rail, drag and first-person camera
cozy-island-scenario-kit                scenario tick, reset and render snapshot
```

### Domain kits

```txt
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

## Main finding

```txt
startup quality descriptor: immutable and complete
adaptive level: mutable 0..2
transition identity: absent
sample timebase: rendered-frame count
session/generation admission: absent
consumer prepare/commit/rollback: absent
effective quality snapshot: partial
consumer acknowledgement: absent
first visible frame acknowledgement: absent
full recovery: broken for pixel ratio
cadence parity fixture: absent
```

### Cadence-dependent thresholds

The budget degrades after 90 over-budget samples and recovers after 360 under-budget samples. At 30 Hz that is approximately 3 and 12 seconds; at 120 Hz it is approximately 0.75 and 3 seconds. The policy therefore reacts four times faster on a 120 Hz display even when the elapsed performance condition is equivalent.

### Partial transition risk

The callback mutates consumers in order:

```txt
cloud steps
  -> fog steps
  -> fog render resolution
  -> pixel ratio only when level > 0
```

There is no staged candidate, rollback or typed result if a consumer rejects or throws. A frame can observe a partially applied level.

### Incomplete recovery

```txt
level 0 -> level 1
  pixel ratio is reduced

level 1 -> level 0
  cloud steps restored
  fog steps restored
  fog resolution restored
  pixel ratio remains reduced
```

The debug state reports the budget level, but not a canonical effective-quality fingerprint proving every consumer matches that level.

## Required parent domain

```txt
cozy-island-adaptive-quality-authority-domain
```

Candidate kits:

```txt
quality-policy-schema-kit
performance-sample-envelope-kit
performance-window-timebase-kit
quality-level-decision-kit
quality-transition-command-kit
quality-transition-admission-kit
quality-session-fence-kit
quality-consumer-plan-kit
quality-consumer-prepare-kit
quality-consumer-commit-kit
quality-consumer-rollback-kit
effective-quality-state-kit
pixel-ratio-restore-kit
quality-transition-result-kit
quality-transition-journal-kit
quality-frame-ack-kit
quality-cadence-parity-fixture-kit
quality-full-recovery-fixture-kit
quality-partial-failure-fixture-kit
```

## Required flow

```txt
PerformanceSample
  -> validate session, generation, visibility and monotonic time
  -> update elapsed-time performance window
  -> produce QualityDecision
  -> build immutable consumer plan
  -> prepare every consumer
  -> commit all consumers or rollback all prepared consumers
  -> publish EffectiveQualityState and fingerprint
  -> render one frame
  -> collect consumer and visible-frame acknowledgement
  -> publish typed transition result and bounded journal row
```

## Ordered implementation queue

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

This audit does not move adaptive quality ahead of session, world and render ownership. It defines the final boundary so it can be implemented safely when those prerequisites exist.

## Validation

```txt
runtime source changed: no
rendering changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser/WebGPU smoke: not run
cadence parity fixture: unavailable
full recovery fixture: unavailable
partial failure fixture: unavailable
```
