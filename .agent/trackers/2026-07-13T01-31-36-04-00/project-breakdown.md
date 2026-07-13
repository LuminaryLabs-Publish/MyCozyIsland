# Project breakdown: MyCozyIsland browser page-lifecycle authority

**Timestamp:** `2026-07-13T01-31-36-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `browser-page-lifecycle-suspension-retirement-authority-audited`

## Summary

MyCozyIsland is a NexusEngine-composed procedural island adventure with 13 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one render-composition kit and WebGPU/WebGL2 presentation.

This audit isolates browser page lifecycle ownership. The host handles `pagehide` once by saving and destructively disposing only `gameplayRenderer`. It does not inspect `event.persisted`, has no `pageshow` path and does not retire the animation loop, listeners, renderer, world, atmosphere, ocean, foam, post pipeline or textures. A BFCache round trip can therefore resume the retained host after the gameplay renderer has cleared its plot, forage and crop indexes, leaving visible Agriculture/Foraging state stale and removing target-marker lookup.

## Plan ledger

**Goal:** separate BFCache-safe suspension/resume from terminal retirement so every page lifecycle transition has one generation, complete participant coverage, typed receipts and truthful visible-state proof.

- [x] Compare the full ten-repository Publish inventory against the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Confirm no new, missing or substantively unsynchronized repository takes priority.
- [x] Select only MyCozyIsland as the oldest eligible synchronized repository.
- [x] Trace startup, animation, pagehide save/disposal and the absent pageshow path.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 64 source-backed kit surfaces and their offered services.
- [x] Define the missing page-lifecycle authority and fixture boundary.
- [x] Add the required timestamped `.agent` audit family.
- [ ] Implement and execute BFCache, resume and terminal-retirement fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible after Cavalry exclusion: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
substantive unsynchronized eligible repositories: 0

MyCozyIsland       2026-07-12T23-08-37-04-00 selected
TheUnmappedHouse   2026-07-12T23-20-51-04-00
AetherVale         2026-07-12T23-40-11-04-00
TheOpenAbove       2026-07-13T00-00-02-04-00
IntoTheMeadow      2026-07-13T00-18-48-04-00
PhantomCommand     2026-07-13T00-40-00-04-00
PrehistoricRush    2026-07-13T00-58-50-04-00
HorrorCorridor     2026-07-13T01-08-28-04-00
ZombieOrchard      2026-07-13T01-18-20-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
startup
  -> create and initialize WebGPURenderer
  -> choose WebGPU or WebGL2 quality
  -> install 13 NexusEngine/core adventure kits
  -> restore portable save
  -> construct world, gameplay, atmosphere, ocean, foam and post resources
  -> install canvas/window listeners
  -> start renderer.setAnimationLoop

active frame
  -> calculate clamped wall-time delta
  -> tick NexusEngine adventure
  -> update camera, lighting, world, Agriculture, Foraging and HUD
  -> sample adaptive performance budget
  -> render post pipeline
  -> periodically persist changed save fingerprint

pagehide today
  -> persist save candidate
  -> call gameplayRenderer.dispose()
  -> dispose gameplay geometry/materials
  -> clear plotEntries, forageEntries and cropGroups
  -> consume the once-only pagehide listener
  -> publish no lifecycle result

possible retained-page resume
  -> browser restores retained document and JavaScript heap
  -> no pageshow handler runs
  -> animation loop may resume with predecessor timing baseline
  -> gameplayRenderer.update() iterates cleared indexes
  -> farm/forage presentation can remain stale and target lookup can disappear

terminal departure today
  -> no coordinated stop for animation, listeners, renderer or other GPU resources
  -> no complete save-flush, disposal or retirement receipt
```

## Source-backed lifecycle finding

`src/main-adventure.js` installs one `{ once: true }` `pagehide` listener. It always calls `storeSave(adventure)` and `gameplayRenderer.dispose()`. It does not inspect the pagehide event, register `pageshow`, stop the animation loop or invoke any aggregate teardown service.

`src/adventure/renderer-gameplay.js` implements disposal by traversing and disposing geometry/materials, then clearing `plotEntries`, `forageEntries` and `cropGroups`. Its subsequent `update()` depends on those maps for plot appearance, forage visibility and target-marker placement.

Other active renderer surfaces expose resources without lifecycle methods:

```txt
cloud renderer: group, step mutation and step readback
fog renderer: group, mesh, material, step mutation and readback
ocean renderer: mesh and material
foam renderer: group, meshes and update
post pipeline: pipeline, scenes, depth material, render and quality mutation
atmosphere textures: cloud/fog textures and optional compute nodes
sky: mesh, environment texture and sky texture
world renderer: long-lived scene graph and update surface
```

## Reachable failure path

```txt
player changes crop or forage state
  -> pagehide fires for a retained navigation
  -> gameplayRenderer.dispose clears all presentation indexes
  -> page is later restored
  -> no pageshow reconstruction or resume command occurs
  -> simulation and HUD continue
  -> gameplayRenderer.update cannot find plot/forage entries
  -> visible crop/soil/forage state can freeze at predecessor values
  -> interaction target marker cannot resolve cleared entries
  -> later pagehide does not run the once-only save/disposal handler again
```

This is a source-derived lifecycle path, not a measured production incident.

## Domains in use

```txt
browser document, canvas, HUD, storage, page lifecycle and diagnostics
page lifecycle classification, suspension, resume and retirement
runtime session, lifecycle generation and animation-loop ownership
renderer participant registration, disposal and resource retirement
save flush, readback and lifecycle receipt
backend capability and static/adaptive quality
NexusEngine composition, scheduler, ECS phases and snapshots
Core Object and Core Transaction Ledger
seeded world, terrain, plots, forage nodes and spatial queries
input normalization and frame admission
Inventory and official Agriculture
wild Foraging
player movement, grounding, view and stamina
scenario time and objective
contextual interaction and Agriculture/Foraging settlement
camera intro, first-person projection and terrain clearance
portable save capture, migration, restore, rollback and reset
renderer-neutral static world, HUD, debug and frame snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, clouds, fog, lighting, materials and post-processing
validation, CI, Pages deployment and central tracking
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
webgpu-compute-atmosphere-renderer-kit: cloud/fog 3D texture generation and CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation and render-layer contract
webgpu-ocean-renderer-kit: ocean geometry, wave deformation, optics and water-layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade and recover callbacks
webgpu-post-processing-renderer-kit: scene/fog/foam passes, depth masking, resolution scaling and pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling and readback
webgpu-stylized-material-renderer-kit: stylized material descriptors and material construction
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
stylized-material-descriptor-domain-kit: color, roughness, rim and outline descriptors
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
cozy-ocean-composition-kit: render-layer graph, pass-order validation, transparent-depth validation, terrain handoff validation and per-layer depth/blend contracts
```

## Missing lifecycle authority

```txt
page lifecycle command and generation: absent
pagehide persisted-state classification: absent
suspend versus retire decision: absent
pageshow resume path: absent
animation-loop suspension/retirement: absent
wall-time baseline reset on resume: absent
input listener and held-input lifecycle receipt: absent
complete renderer participant registry: absent
complete resource disposal: absent
exactly-once disposal receipt: absent
save-flush terminal result: absent
stale lifecycle-event rejection: absent
first resumed visible-frame acknowledgement: absent
terminal retirement result: absent
BFCache/repeated-navigation/Pages fixtures: absent
```

## Required parent domain

```txt
cozy-island-browser-page-lifecycle-authority-domain
```

## Required transaction

```txt
PageLifecycleCommand
  -> bind runtime session and expected lifecycle generation
  -> classify pagehide persisted, pagehide terminal, pageshow, explicit stop or failure
  -> choose Suspend, Resume or Retire

Suspend
  -> clear held input
  -> pause frame production without destroying render participants
  -> flush save through a typed receipt
  -> publish Suspended

Resume
  -> validate retained runtime and participant generations
  -> reset wall-time baseline
  -> resume input and frame production
  -> publish Resumed
  -> acknowledge the first matching visible frame

Retire
  -> reject new input and frames
  -> stop renderer animation loop
  -> detach canvas/window listeners
  -> flush and verify save
  -> dispose every registered renderer/resource participant exactly once
  -> revoke global capabilities
  -> publish Retired, Degraded or Failed with complete receipts
```

## Candidate coordinating kits

```txt
page-lifecycle-command-id-kit
page-lifecycle-generation-kit
page-lifecycle-event-classifier-kit
bfcache-persistence-classifier-kit
page-lifecycle-state-machine-kit
page-suspend-plan-kit
page-resume-plan-kit
page-retirement-plan-kit
animation-loop-lifecycle-participant-kit
input-lifecycle-participant-kit
save-flush-lifecycle-participant-kit
renderer-lifecycle-participant-registry-kit
gameplay-renderer-lifecycle-participant-kit
world-renderer-lifecycle-participant-kit
atmosphere-resource-lifecycle-participant-kit
ocean-resource-lifecycle-participant-kit
foam-resource-lifecycle-participant-kit
post-pipeline-lifecycle-participant-kit
sky-texture-lifecycle-participant-kit
lifecycle-drain-barrier-kit
resource-disposal-receipt-kit
stale-lifecycle-event-rejection-kit
page-lifecycle-result-kit
page-lifecycle-observation-kit
page-lifecycle-journal-kit
first-resumed-frame-ack-kit
bfcache-roundtrip-fixture-kit
repeated-pagehide-pageshow-fixture-kit
terminal-retirement-fixture-kit
webgpu-webgl2-lifecycle-parity-fixture-kit
pages-lifecycle-smoke-kit
```

## Validation boundary

Documentation only. Runtime source, page lifecycle behavior, rendering, gameplay, saves, dependencies, package scripts and deployment are unchanged. No BFCache round trip, terminal retirement, repeated navigation, backend parity, visible-resume frame or Pages fixture was run. Do not claim BFCache safety, complete cleanup, exactly-once retirement, save-flush truth or visible-state continuity until those fixtures pass on `main`.