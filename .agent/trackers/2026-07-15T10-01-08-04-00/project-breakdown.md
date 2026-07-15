# Project breakdown: MyCozyIsland game-audio event projection

**Timestamp:** `2026-07-15T10-01-08-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `cefc24184fc86d431a70fcce4a342d26b3b3a3d7`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

MyCozyIsland has a complete visual adventure loop, deterministic interaction results, movement and stamina state, Agriculture and Foraging outcomes, ocean, wind, clouds, fog, UI, preload, persistence and renderer diagnostics. The active browser sources and kit registry expose no game-audio owner, semantic cue registry, browser unlock policy, volume or mute preferences, ambience lifecycle, listener/source projection, duplicate suppression, voice budget, audible result, or audiovisual convergence acknowledgement.

## Plan ledger

**Goal:** preserve simulation and rendering ownership while projecting accepted semantic results into one lifecycle-safe browser audio domain.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible central ledgers and ten root `.agent` states.
- [x] Confirm zero new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repositories.
- [x] Select only MyCozyIsland by the oldest synchronized central timestamp.
- [x] Trace menu, preload, entry, movement, interaction, Agriculture, Foraging, save, render and lifecycle paths.
- [x] Preserve all 70 implemented kit and adapter surfaces.
- [x] Define one parent game-audio authority and 22 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement and execute browser, lifecycle, artifact and Pages audio fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
undocumented eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior central timestamp: 2026-07-15T05-00-28-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu route
  -> construct one WebGPU/WebGL2 postcard scene
  -> start hidden same-origin game preload
  -> project startup progress into the Play button
  -> receive playable readiness
  -> send entry request and reveal prepared game

game startup
  -> initialize Three.js WebGPU renderer with WebGL2 fallback
  -> install Core Startup and 13 adventure kits
  -> restore or initialize island state
  -> construct world, gameplay, atmosphere, ocean and post-processing renderers
  -> admit browser input
  -> present first frame and enter playable state

adventure frame
  -> normalize keyboard, pointer, wheel and clear commands
  -> update scenario time, player movement, stamina and intro
  -> update Agriculture growth and Foraging respawn
  -> resolve seed selection and contextual interactions
  -> publish camera, HUD and render snapshots
  -> render opaque world, water, clouds, fog, foam and output transform
  -> periodically capture save state

audio path
  -> no AudioContext or HTMLAudio owner is installed
  -> no movement, interaction, Agriculture, Foraging, UI or ambience result becomes a semantic audio event
  -> no audible acknowledgement is published
```

## Domains in use

```txt
static menu and game routes
browser document, history, iframe, message, focus, input, RAF, resize and page lifecycle
Core Startup, Core Object and Core Transaction Ledger
seeded island world, terrain surfaces, plots and forage layout
normalized input and frame admission
Inventory, Agriculture and Foraging
player movement, grounding, view and stamina
scenario clock and objective
nearest-target interaction and result settlement
camera intro and first-person descriptors
save capture, checksum, migration, restore, rollback and reset
renderer-neutral static and frame snapshots
Three.js WebGPU/WebGL2 rendering
terrain, vegetation, props, atmosphere, clouds, fog, ocean, foam and post processing
performance budget and adaptive quality
menu preload, entry handoff, HUD, diagnostics and errors
browser audio capability, unlock, semantic cues, ambience, spatial projection and lifecycle
source tests, build parity, Pages and central tracking
```

## Implemented kits and services

### Engine-installed kits

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, waiting, working, ready, failure, retry/fallback descriptors, continuation selection, first-frame admission, playable entry, snapshot, load and reset |
| `core-object-kit` | `n:core-object` | registration, lookup and listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot and reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot and reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot and reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot and reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot and reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, terrain grounding, view, stamina, snapshot and reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot and reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild-forage action, prompt, result, snapshot and reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance and descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset and diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor and debug descriptor |

### Cataloged world, render and host kits

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud/fog volume generation and CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation and layer contract
webgpu-ocean-renderer-kit: ocean geometry, wave deformation, optics and layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade and recover callbacks
webgpu-post-processing-renderer-kit: scene, fog, foam, depth mask, resolution scaling and pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling and readback
webgpu-stylized-material-renderer-kit: material descriptors and construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes, raymarch materials, step scaling and readback
camera-rail-sequence-kit: rail progression and camera sequence descriptors
cozy-island-scenario-kit: scenario and sequence descriptors
terrain-surface-domain-kit: height, normal, material and surface queries
vegetation-placement-domain-kit: deterministic placement graph
aerial-perspective-domain-kit: horizon, distance and atmosphere descriptors
campfire-atmosphere-domain-kit: light, smoke and heat descriptors
cloud-density-field-domain-kit: density recipe and texture budget
cloud-horizon-band-domain-kit: horizon placement descriptors
cloud-lighting-domain-kit: color, shadow and silver lining
cloud-lod-domain-kit: step and volume-count policy
cloud-shadow-domain-kit: shadow projection descriptors
cloud-weather-domain-kit: coverage and weather state
fog-advection-domain-kit: direction and speed
fog-field-domain-kit: density recipe and texture budget
fog-volume-placement-domain-kit: bounds and readability mask
ground-contact-domain-kit: terrain contact and clearance query
illumination-domain-kit: sun, sky, ambient and exposure state
ocean-caustics-domain-kit: caustic projection descriptors
ocean-floor-profile-domain-kit: seafloor shape and depth profile
ocean-optics-domain-kit: color, opacity, transmission, absorption and reflection
ocean-wave-domain-kit: deterministic wave components and sea level
prop-archetype-domain-kit: prop geometry and material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier selection and quality budgets
render-snapshot-domain-kit: renderer-neutral world snapshot
rock-archetype-domain-kit: rock placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification and distance field
shoreline-foam-domain-kit: foam-band descriptors
stylized-material-descriptor-domain-kit: color, roughness, rim and outline
sun-glitter-domain-kit: water-highlight descriptors
terrain-biome-field-domain-kit: deterministic biome classification
terrain-lod-domain-kit: terrain resolution and distance policy
underwater-atmosphere-domain-kit: underwater color and attenuation
vegetation-archetype-domain-kit: tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit: density and distance policy
vegetation-wind-domain-kit: wind-deformation descriptor
weather-state-domain-kit: weather state and transitions
wind-field-domain-kit: deterministic direction and strength
deterministic-seed-domain-kit: seed derivation and deterministic random
environment-clock-domain-kit: elapsed time and environmental phase
```

### Composition and browser adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | logical render-layer graph, pass-order validation, transparent-depth validation, terrain handoff validation and per-layer depth/blend contracts |
| `browser-startup-presentation-adapter` | descriptor DOM projection, failure projection, timeout helper and render-update bridge |
| `cozy-startup-host` | product preparation order, copy, engine reuse, continuation mapping, pre-playable global-error capture and host disposal |
| `cozy-menu-scene-adapter` | Three.js provider admission, procedural atlases/cards, TSL materials, compute/fallback wind, water, shoreline, fog, lighting, bloom, tone mapping, shadows, reduced motion, resize, animation loop, readback and retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, Play gate, entry request, crossfade, history, focus, fallback reveal and error display |
| `cozy-game-preload-bridge-adapter` | startup polling, embed classification, parent messaging, simulation/presentation freeze and resume, player-entry preparation and acknowledgement |

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned game-audio authority surfaces: 22
```

## Source-backed finding

`src/adventure/runtime-domains.js` publishes frame-admitted movement state and exact contextual `lastAction` results for tilling, planting, watering, harvesting, forage collection and failed interactions. `src/main-adventure.js` consumes the resulting camera, illumination, gameplay, HUD and save descriptors and renders them every frame. The source creates no audio owner or semantic cue projection before publishing `globalThis.CozyIsland`.

The machine registry lists 14 installed kits, 50 cataloged world/render/host kits, one composition kit and five browser adapters. None owns game audio. This is an architecture and evidence gap, not proof that audible presentation is required for correctness.

## Required authority

```txt
cozy-island-game-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document, runtime, simulation, frame and audio-policy revisions
  -> observe browser audio capability and accepted user-gesture unlock
  -> consume accepted semantic results rather than raw input
  -> resolve stable UI, movement, Agriculture, Foraging, ambience and transition cue descriptors
  -> distinguish local, world, ambience and interface sources
  -> deduplicate repeated snapshots and replayed results
  -> project listener and source transforms from accepted camera/world state
  -> enforce master/category volume, mute, pooling, priority and voice budgets
  -> suspend, resume or retire on preload sleep, visibility, pagehide and route replacement
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Planned surfaces

```txt
browser-audio-capability-kit
user-gesture-audio-unlock-kit
audio-context-generation-kit
audio-policy-descriptor-kit
semantic-audio-event-kit
cozy-cue-registry-kit
ui-cue-projection-kit
movement-footstep-cue-kit
surface-footstep-material-kit
agriculture-cue-projection-kit
foraging-cue-projection-kit
ocean-ambience-kit
wind-ambience-kit
listener-pose-projection-kit
spatial-source-projection-kit
cue-deduplication-kit
audio-bus-preference-kit
voice-budget-pool-kit
audio-lifecycle-settlement-kit
first-audible-cue-ack-kit
first-audiovisual-convergence-ack-kit
browser-build-pages-audio-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, simulation, interactions, rendering, audio behavior, dependencies, tests, workflows and deployment were not changed.