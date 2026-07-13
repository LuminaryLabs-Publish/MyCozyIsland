# Project breakdown: MyCozyIsland adaptive render-quality authority

**Timestamp:** `2026-07-12T23-08-37-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `adaptive-render-quality-transition-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island adventure with 13 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional render-composition kit, nine retained Core World providers and WebGPU/WebGL2 presentation.

The selected audit isolates adaptive render-quality transitions. Degrade changes cloud steps, fog steps, fog resolution and renderer pixel ratio. Recover restores cloud steps, fog steps and fog resolution, but never restores renderer pixel ratio. After a level-2 degradation, later recovery can therefore report level 0 while the drawing density remains at the level-2 scale.

## Plan ledger

**Goal:** make every adaptive-quality transition a revisioned, atomic and observable render-generation transaction whose committed settings match the visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm the trailing ZombieOrchard commit only finalized its already-recorded central reconciliation.
- [x] Select only MyCozyIsland as the oldest eligible synchronized repository.
- [x] Trace capability quality selection, performance sampling, degrade, recover, render mutation and diagnostics.
- [x] Identify the complete interaction loop and domains.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Define the adaptive-quality parent DSK and fixture boundary.
- [x] Add the required timestamped `.agent` audit family.
- [ ] Implement and execute adaptive-quality transition fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
substantive unsynchronized eligible repositories: 0

MyCozyIsland       2026-07-12T20-40-56-04-00 selected
TheUnmappedHouse   2026-07-12T20-51-16-04-00
AetherVale         2026-07-12T21-15-06-04-00
TheOpenAbove       2026-07-12T21-31-40-04-00
IntoTheMeadow      2026-07-12T21-40-09-04-00
PhantomCommand     2026-07-12T22-15-00-04-00
PrehistoricRush    2026-07-12T22-18-39-04-00
HorrorCorridor     2026-07-12T22-44-30-04-00
ZombieOrchard      2026-07-12T23-00-53-04-00
TheCavalryOfRome   excluded
```

The ZombieOrchard commit after its recorded head only changed validation from central-sync pending to complete. It introduced no new runtime or undocumented audit surface.

## Complete interaction loop

```txt
startup
  -> create WebGPU renderer and determine WebGPU/WebGL2 backend
  -> choose static quality tier from URL, memory, viewport, DPR and reduced-motion policy
  -> set initial renderer DPR, shadow size, fog/cloud budgets and world detail
  -> install 13 NexusEngine/core adventure kits
  -> restore save, construct world and begin animation loop

active frame
  -> tick NexusEngine adventure
  -> update camera, illumination, world, Agriculture/Foraging visuals and HUD
  -> sample frame duration through performance budget
  -> render scene, atmosphere and foam pipeline

adaptive degrade
  -> moving average exceeds target threshold for 90 samples
  -> increment level
  -> lower cloud steps
  -> lower fog steps
  -> lower fog resolution
  -> lower renderer pixel ratio
  -> publish no transition plan, result or visible-frame receipt

adaptive recover
  -> moving average remains below recovery threshold for 360 samples
  -> decrement level
  -> restore cloud steps
  -> restore fog steps
  -> restore fog resolution
  -> do not restore renderer pixel ratio
  -> diagnostics report static tier and current cloud/fog steps, not committed DPR or render generation
```

## Main source-backed finding

For a high-tier session with device DPR at least `1.5`:

```txt
initial pixel ratio: 1.50
level 1 degrade:     1.32  (1.50 × 0.88)
level 2 degrade:     1.14  (1.50 × 0.76)
level 2 -> 1 recover:
  cloud/fog settings move to level 1
  pixel ratio remains 1.14
level 1 -> 0 recover:
  cloud/fog settings move to level 0
  pixel ratio remains 1.14
```

The exact starting value varies by device DPR and quality tier, but the asymmetry is structural: only `onDegrade` calls `renderer.setPixelRatio()`.

## Domains in use

```txt
browser document, canvas, HUD, storage, page lifecycle and diagnostics
renderer backend capability and static quality selection
performance sampling, hysteresis and adaptive quality level
quality transition planning, admission, commit and rollback
render-generation identity and participant revisions
NexusEngine composition, ECS phases and snapshots
Core Object and Core Transaction Ledger
seeded world, terrain, plots, forage nodes and spatial queries
input normalization and frame admission
Inventory and official Agriculture
wild Foraging
player movement, grounding, view and stamina
scenario time and objectives
contextual interaction and settlement
camera intro, first-person projection and terrain clearance
portable save capture, migration, restore and reset
renderer-neutral frame, HUD and debug snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, fog, clouds, lighting and materials
post-processing, render layers and adaptive resolution
validation, CI, Pages deployment and central audit tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits:     50
additional composition kit:           1
source-backed kit surfaces:           64
active route kit surfaces:            62
retained inactive catalog entries:     2
ordered Core World providers:          9
```

### Engine-installed kits and services

```txt
core-object-kit: registration, lookup, listing
core-transaction-ledger-kit: ledger, idempotency, record, apply-once, snapshot, reset
cozy-world-domain-kit: seeded world, surface query, plot layout, forage layout, render base, snapshot, reset
cozy-input-domain-kit: normalization, command queue, frame admission, held actions, clear, snapshot, reset
cozy-inventory-domain-kit: items, seed selection, transactions, batch settlement, snapshot, reset
agriculture-domain-kit: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset
cozy-foraging-domain-kit: wild coconut nodes, collection, respawn, snapshot, reset
cozy-player-domain-kit: movement, grounding, view, stamina, snapshot, reset
cozy-scenario-domain-kit: time, objective, snapshot, reset
cozy-interaction-domain-kit: targeting, contextual action, Agriculture settlement, Foraging settlement, prompt, result, snapshot, reset
cozy-camera-domain-kit: aerial intro, first-person view, terrain clearance, descriptor
cozy-save-domain-kit: capture, checksum validation, migration, restore, rollback, reset, diagnostics
cozy-render-snapshot-domain-kit: static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor
```

### Cataloged world, render and host kits and services

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback capability policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud/fog 3D storage texture generation and CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation and render-layer contract
webgpu-ocean-renderer-kit: ocean geometry, wave deformation, optics and water-layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade and recover callbacks
webgpu-post-processing-renderer-kit: scene/fog/foam passes, depth masking, resolution scaling and pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling and readback
webgpu-stylized-material-renderer-kit: stylized material descriptors and renderer material construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes, raymarch materials, step scaling and readback
camera-rail-sequence-kit: authored rail progression and camera sequence descriptors
cozy-island-scenario-kit: authored island scenario and sequence descriptors
terrain-surface-domain-kit: terrain height, normal, material and surface queries
vegetation-placement-domain-kit: deterministic vegetation placement graph
 aerial-perspective-domain-kit: horizon, distance and atmosphere descriptor
campfire-atmosphere-domain-kit: campfire light, smoke and heat descriptors
cloud-density-field-domain-kit: cloud density recipe and texture budget
cloud-horizon-band-domain-kit: horizon cloud placement descriptors
cloud-lighting-domain-kit: cloud color, shadow and silver-lining descriptors
cloud-lod-domain-kit: cloud step and volume-count policy
cloud-shadow-domain-kit: cloud-shadow projection descriptors
cloud-weather-domain-kit: cloud coverage and weather state
fog-advection-domain-kit: fog direction and speed
fog-field-domain-kit: fog density recipe and texture budget
fog-volume-placement-domain-kit: fog bounds and island readability mask
ground-contact-domain-kit: terrain contact and clearance query
illumination-domain-kit: sun, sky, ambient and exposure state
ocean-caustics-domain-kit: caustic projection descriptors
ocean-floor-profile-domain-kit: seafloor shape and depth profile
ocean-optics-domain-kit: color, opacity, transmission, absorption and reflection
ocean-wave-domain-kit: deterministic wave components and sea level
prop-archetype-domain-kit: prop geometry/material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier selection and quality budgets
render-snapshot-domain-kit: renderer-neutral world snapshot construction
rock-archetype-domain-kit: rock placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification and distance field
shoreline-foam-domain-kit: foam band descriptors
stylized-material-descriptor-domain-kit: material color, roughness, rim and outline descriptors
sun-glitter-domain-kit: water highlight descriptors
terrain-biome-field-domain-kit: deterministic biome classification
terrain-lod-domain-kit: terrain resolution and distance policy
underwater-atmosphere-domain-kit: underwater color and attenuation descriptors
vegetation-archetype-domain-kit: tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit: vegetation density and distance policy
vegetation-wind-domain-kit: wind deformation descriptor
weather-state-domain-kit: weather state and transitions
wind-field-domain-kit: deterministic wind direction and strength
deterministic-seed-domain-kit: seed derivation and deterministic random services
environment-clock-domain-kit: elapsed time and environmental phase
```

### Additional composition kit

```txt
cozy-ocean-composition-kit: logical render-layer graph, pass-order validation, transparent-depth validation, terrain handoff validation and per-layer depth/blend contracts
```

## Missing quality-transition authority

```txt
quality transition command ID: absent
quality level revision: absent
render generation: absent
participant capability/readback contract: absent
detached transition plan: absent
pixel-ratio recovery mutation: absent
atomic multi-participant commit: absent
rollback to predecessor settings: absent
stale transition rejection: absent
typed quality-transition result: absent
actual DPR and fog-resolution diagnostics: absent
first visible quality-frame acknowledgement: absent
browser/backend/Pages transition fixtures: absent
```

## Required parent domain

```txt
cozy-island-adaptive-render-quality-transition-authority-domain
```

## Required transaction

```txt
AdaptiveQualityTransitionCommand
  -> bind runtime session, backend, surface generation and expected quality revision
  -> classify degrade, recover, override, resize or capability-change source
  -> build a detached target plan for DPR, cloud steps, fog steps and fog resolution
  -> query every participant for supported values and current readback
  -> reject stale or unsupported plans with zero mutation
  -> commit all participant settings under one render generation
  -> verify renderer DPR and participant readbacks
  -> roll back every changed participant if verification fails
  -> publish AdaptiveQualityTransitionResult
  -> project actual committed values into diagnostics
  -> acknowledge the first visible frame using the committed render generation
```

## Candidate coordinating kits

```txt
quality-transition-command-id-kit
quality-transition-source-kit
quality-level-revision-kit
render-surface-generation-kit
adaptive-quality-plan-kit
quality-participant-registry-kit
quality-participant-capability-kit
quality-participant-readback-kit
renderer-pixel-ratio-participant-kit
cloud-step-participant-kit
fog-step-participant-kit
fog-resolution-participant-kit
quality-transition-admission-kit
quality-transition-commit-kit
quality-transition-rollback-kit
stale-quality-transition-rejection-kit
quality-transition-result-kit
quality-transition-observation-kit
quality-transition-journal-kit
quality-diagnostics-projection-kit
quality-visible-frame-ack-kit
degrade-level-one-fixture-kit
degrade-level-two-fixture-kit
recover-level-one-fixture-kit
recover-level-zero-fixture-kit
participant-failure-rollback-fixture-kit
resize-during-transition-fixture-kit
webgpu-webgl2-quality-parity-fixture-kit
pages-quality-transition-smoke-kit
```

## Validation boundary

Documentation only. Runtime source, quality behavior, rendering, gameplay, dependencies, package scripts and deployment were unchanged. No adaptive transition fixture, browser smoke, backend parity smoke, first-visible-frame proof or Pages smoke was run. Do not claim quality recovery, atomic transition, rollback safety, diagnostic truth or visible-frame correlation until those fixtures pass on `main`.