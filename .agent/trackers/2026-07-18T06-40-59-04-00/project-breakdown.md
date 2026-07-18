# MyCozyIsland project breakdown: gameplay adaptive-quality recovery

**Timestamp:** `2026-07-18T06-40-59-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Selection class:** oldest synchronized eligible repository  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous documentation head:** `776fbcc3a258bf3a6f9f038a63be689ee80aefe3`

## Summary

The current Publish inventory contains 11 repositories. Ten are eligible after excluding `LuminaryLabs-Publish/TheCavalryOfRome`. All ten remain centrally tracked with root `.agent` state, and no new, missing, undocumented, or runtime-ahead candidate was observed. MyCozyIsland was selected because its prior documented timestamp, `2026-07-17T18-38-56-04-00`, was the oldest eligible timestamp; IntoTheMeadow was next at `2026-07-17T19-38-37-04-00`.

The focused finding is a recovery asymmetry in the gameplay adaptive-quality loop. Degradation changes cloud step scale, fog step scale, fog target resolution, and renderer pixel ratio. Recovery changes cloud step scale, fog step scale, and fog target resolution, but does not restore renderer pixel ratio. A session that reaches level 2 can therefore recover its logical budget level while retaining the level-2 physical resolution scale.

This is source-backed control-flow evidence, not a measured performance incident or visual-regression reproduction.

## Interaction loop

```txt
menu
  -> preload game in same-origin iframe
  -> publish readiness
  -> Play resumes presentation and simulation
  -> focus canvas and retire menu renderer

gameplay frame
  -> admit keyboard, pointer and wheel input
  -> tick player, scenario, interaction, inventory, Agriculture and Foraging
  -> produce render snapshot and HUD descriptor
  -> update world, gameplay, foam, illumination and camera
  -> sample frame time in webgpu-performance-budget-kit
  -> degrade or recover quality level after sustained evidence
  -> project cloud steps, fog steps, fog resolution and renderer DPR
  -> render layered post pipeline
  -> autosave changed state

current quality transition
  degrade level 0 -> 1 -> 2
    cloud/fog step scale changes
    fog resolution scale changes
    renderer pixel ratio changes

  recover level 2 -> 1 -> 0
    cloud/fog step scale changes
    fog resolution scale changes
    renderer pixel ratio is not restored
```

## Domains in use

```txt
entry/menu/preload/handoff
Core Startup
Core Object
Core Transaction Ledger
seeded world and terrain
input and normalized command frame
inventory and transactional item state
Agriculture
Foraging
player movement and terrain grounding
scenario clock and objective
context interaction
camera and introduction
save, checksum, migration and restore
render snapshots and HUD projection
environment clock, weather, wind, illumination and aerial perspective
terrain, shoreline, ground contact and LOD
vegetation, rocks, props and wind
clouds, fog and volumetric placement
ocean, optics, caustics, glitter, foam and underwater atmosphere
render quality, frame budget, WebGPU/WebGL2 presentation and post-processing
browser input, resize, focus, visibility, page lifecycle and public host
validation, artifact, Pages and central governance
```

## Implemented kits and offered services

### Engine-installed core and adventure kits: 14

| Kit | Domain | Offered services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | object registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger identity, idempotency, record, apply-once settlement, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, watering, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, terrain grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial introduction, first-person view, terrain clearance, camera descriptors |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, fingerprint, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

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

Their service families cover debug projection; backend fallback; atmosphere compute; foam, ocean, post, fog, material and cloud rendering; frame-budget observation; camera sequencing; scenario assembly; terrain, shoreline and biome queries; vegetation, prop and rock descriptors; weather, wind and illumination; ocean optics; LOD; deterministic seed; and environment time.

### Composition and menu surfaces

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff validation and depth-blend contracts.
- 16 explicit menu surfaces: scene, composition, camera, hero palm, palm material, palm motion, sky, shoreline, water, flowers, particles, lighting, atmosphere, post effects, Play gate and game preload.
- Four browser/product adapters: startup presentation, startup host, menu/game shell and game-preload bridge.

Implemented surface total remains **85**.

## Main finding

```txt
createPerformanceBudget()
  target and moving average
  90 sustained over-budget frames -> increment level -> onDegrade
  360 sustained under-budget frames -> decrement level -> onRecover

main-adventure onDegrade(level)
  cloudRenderer.setStepScale(level scale)
  fogRenderer.setStepScale(level scale)
  postPipeline.setFogResolutionScale(level scale)
  renderer.setPixelRatio(base cap * level scale)

main-adventure onRecover(level)
  cloudRenderer.setStepScale(level scale)
  fogRenderer.setStepScale(level scale)
  postPipeline.setFogResolutionScale(level scale)
  renderer.setPixelRatio(...) is absent

resize()
  renderer.setSize(...)
  camera projection update
  no accepted-quality readback or DPR restoration
```

At level 2, the renderer is admitted at `pixelRatioCap * 0.76`. Recovering to level 1 and then level 0 does not call `renderer.setPixelRatio`, so the renderer can remain at the level-2 ratio while the budget reports level 0. Cloud and fog complexity recover, but physical resolution does not.

## Proposed authority — not implemented

`cozy-island-gameplay-adaptive-quality-recovery-parity-authority-domain`

```txt
AdaptiveQualitySampleCommand
  -> AdaptiveQualitySampleResult

QualityTransitionAdmissionCommand
  -> accepted target level and generation
  -> QualityTransitionAdmissionResult

QualityEffectPlanCommand
  -> cloud step scale
  -> fog step scale
  -> fog resolution scale
  -> renderer pixel ratio
  -> QualityEffectPlanResult

QualityTransitionSettlementCommand
  -> applied effect readback
  -> degraded | recovered | retained | rejected-stale
  -> QualityTransitionSettlementResult

QualityProjectionCommitCommand
  -> AdaptiveQualityFrameDigest
  -> FirstAdaptiveQualityBoundFrameAck
```

The smallest implementation is one shared `applyQualityLevel(level)` path used by both degradation and recovery, followed by readback of every projected effect.

## Proposed kit surfaces: 20

```txt
adaptive-quality-policy-kit
adaptive-quality-level-identity-kit
frame-budget-sample-kit
quality-transition-admission-kit
quality-transition-result-kit
quality-effect-plan-kit
cloud-step-scale-projection-kit
fog-step-scale-projection-kit
fog-resolution-scale-projection-kit
renderer-pixel-ratio-projection-kit
renderer-size-reconciliation-kit
quality-effect-readback-kit
degradation-settlement-kit
recovery-settlement-kit
stale-quality-transition-rejection-kit
quality-generation-digest-kit
first-quality-bound-frame-ack-kit
adaptive-quality-diagnostics-kit
degrade-recover-browser-fixture-kit
artifact-pages-quality-parity-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, rendering, gameplay, tests, workflows and deployment were not changed. No browser frame-time fixture, renderer DPR readback, pixel-diff proof, artifact smoke or Pages-origin smoke was executed.