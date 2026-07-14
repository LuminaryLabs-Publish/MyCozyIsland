# Project breakdown: MyCozyIsland dual-surface GPU handoff and retirement

**Timestamp:** `2026-07-13T23-58-48-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime head:** `9416ecd21622e2a5b940ee27aac6224b09979dba`  
**Status:** `dual-surface-gpu-handoff-retirement-authority-audited`

## Summary

MyCozyIsland now runs a WebGPU-first Three.js menu with TSL node materials, bloom and a twelve-value compute wind field while the full WebGPU/WebGL2 game preloads in a hidden same-origin iframe. The child sleeps its simulation and animation loop only after Core Startup reports playable readiness. On Play, the child resumes immediately and the parent keeps the menu renderer active through the crossfade before disposing only the render pipeline and renderer.

The current source has no shared presentation lease, device/context generation, overlap budget, resource manifest, complete menu-scene disposal result, public-capability revocation or first-visible-game-frame settlement joining those two GPU surfaces.

## Plan ledger

**Goal:** preserve the high-fidelity WebGPU menu and sleeping hidden preload while making menu-to-game GPU ownership, overlap and retirement explicit, bounded and observable.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm nine eligible repositories have ledger and root `.agent` coverage.
- [x] Detect `LuminaryLabs-Publish/MyCozyIsland` as the only runtime-ahead repository.
- [x] Review all seven commits after the prior documentation head.
- [x] Inspect menu WebGPU, TSL, bloom, compute wind, hidden preload sleep, game rendering and static tests.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Preserve 65 DSK/kit surfaces and five browser/product adapters.
- [x] Define one dual-surface GPU handoff and retirement authority.
- [x] Change documentation only.
- [ ] Implement typed leases, retirement and visible-frame settlement.
- [ ] Run real-browser WebGPU/WebGL2, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent states: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: sole runtime-ahead repository
prior repo-local documentation head: 500aa3f5ffc69beefd98443bafc834468d43e679
reviewed runtime head: 9416ecd21622e2a5b940ee27aac6224b09979dba
commits reconciled: 7
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Reconciled runtime changes

```txt
0dbfc45 feat: upgrade menu to WebGPU palm presentation
7e6ce26 feat: add realistic GPU palm lighting and bloom
0de2502 perf: sleep hidden game presentation at preload gate
8ecf630 test: verify WebGPU palm and sleeping preload
9eeda4d chore: refresh preload bridge cache key
394de7f feat: compute palm wind on WebGPU
9416ecd test: require WebGPU compute wind field
```

## Complete interaction loop

```txt
root route
  -> menu.html
  -> import Three.js WebGPU and TSL providers
  -> initialize WebGPURenderer
  -> choose WebGPU or WebGL2 backend
  -> build sky, lights and procedural palm
  -> allocate WebGPU wind storage and compute node when supported
  -> build RenderPipeline and bloom
  -> start menu animation loop

idle preload
  -> assign hidden iframe game.html?preload=1
  -> game initializes a second WebGPURenderer
  -> game composes NexusEngine services and heavy world presentation
  -> game starts its animation loop
  -> Core Startup publishes playable readiness
  -> bridge replaces engine tick/step
  -> bridge stops the game animation loop
  -> bridge reports ready

Play
  -> parent posts entry request
  -> bridge restores simulation and game animation loop
  -> bridge prepares player intro and posts entered immediately
  -> parent starts menu/game crossfade
  -> menu compute plus bloom and game world rendering overlap for up to 780 ms
  -> parent stops the menu animation loop
  -> parent disposes render pipeline and renderer
  -> menu scene resources, listeners and public capability have no terminal receipt
```

## Domains in use

```txt
root/menu/game routing and browser history
parent document, hidden iframe and page lifecycle
cross-window preload and entry protocol
Core Startup readiness and continuation
NexusEngine object, transaction, world and input domains
Inventory, Agriculture, Foraging, player, scenario and interaction
portable save capture, restore and reset
menu WebGPU/WebGL2 provider and backend admission
TSL node materials and procedural palm geometry
WebGPU storage-buffer wind compute
menu RenderPipeline, bloom, lighting, shadows and tone mapping
game WebGPU/WebGL2 world, atmosphere, ocean and post-processing
dual-surface GPU workload scheduling and overlap policy
simulation and presentation freeze/resume leases
GPU resource manifests, retirement and public-capability revocation
first visible game-frame settlement
browser input, resize, focus and visibility
static source checks, build, Pages and central tracking
```

## Implemented kits and offered services

### Engine-installed core and adventure kits

```txt
core-startup-kit: launch preparation waiting working ready failure continuation first-frame admission playable entry snapshot load reset
core-object-kit: object registration lookup listing
core-transaction-ledger-kit: idempotency record apply-once snapshot reset
cozy-world-domain-kit: seeded world surface query plot and forage layout render base snapshot reset
cozy-input-domain-kit: normalized key pointer wheel commands frame admission held actions clear snapshot reset
cozy-inventory-domain-kit: items seed selection transactions batch settlement snapshot reset
agriculture-domain-kit: land soil cultivation water growth harvest perennials descriptors events snapshot reset
cozy-foraging-domain-kit: wild coconut nodes collection respawn snapshot reset
cozy-player-domain-kit: movement grounding view stamina snapshot reset
cozy-scenario-domain-kit: time objective snapshot reset
cozy-interaction-domain-kit: targeting contextual actions agriculture settlement foraging prompt results snapshot reset
cozy-camera-domain-kit: aerial intro first-person view terrain clearance descriptor
cozy-save-domain-kit: capture checksum validation migration restore rollback reset diagnostics
cozy-render-snapshot-domain-kit: static world agriculture frame HUD and debug descriptors
```

### Cataloged world, render and host kits

```txt
debug-overlay-host-kit: draw toggle show hide
webgl2-fallback-renderer-kit: fallback policy CPU volume source feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud and fog volume generation CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry animation render-layer contract
webgpu-ocean-renderer-kit: ocean geometry wave deformation optics water-layer contract
webgpu-performance-budget-kit: frame samples moving average FPS state degrade and recover callbacks
webgpu-post-processing-renderer-kit: scene fog foam depth-mask resolution scaling pass order
webgpu-rolling-fog-renderer-kit: fog volume material step scaling readback
webgpu-stylized-material-renderer-kit: material descriptors and construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes raymarch materials step scaling readback
camera-rail-sequence-kit: rail progression camera sequence descriptors
cozy-island-scenario-kit: scenario and sequence descriptors
terrain-surface-domain-kit: height normal material and surface query
vegetation-placement-domain-kit: deterministic placement graph
aerial-perspective-domain-kit: horizon distance atmosphere descriptors
campfire-atmosphere-domain-kit: campfire light smoke and heat descriptors
cloud-density-field-domain-kit: density recipe texture budget
cloud-horizon-band-domain-kit: horizon placement
cloud-lighting-domain-kit: color shadow silver lining
cloud-lod-domain-kit: step and volume-count policy
cloud-shadow-domain-kit: shadow projection
cloud-weather-domain-kit: coverage weather state
fog-advection-domain-kit: direction speed
fog-field-domain-kit: density recipe texture budget
fog-volume-placement-domain-kit: bounds readability mask
ground-contact-domain-kit: terrain contact clearance query
illumination-domain-kit: sun sky ambient exposure state
ocean-caustics-domain-kit: caustic projection
ocean-floor-profile-domain-kit: seafloor shape depth profile
ocean-optics-domain-kit: color opacity transmission absorption reflection
ocean-wave-domain-kit: deterministic waves sea level
prop-archetype-domain-kit: prop geometry and material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier and budgets
render-snapshot-domain-kit: renderer-neutral world snapshot
rock-archetype-domain-kit: rock placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification distance field
shoreline-foam-domain-kit: foam-band descriptors
stylized-material-descriptor-domain-kit: color roughness rim outline
sun-glitter-domain-kit: water highlight descriptors
terrain-biome-field-domain-kit: deterministic biome classification
terrain-lod-domain-kit: terrain resolution and distance policy
underwater-atmosphere-domain-kit: underwater color attenuation
vegetation-archetype-domain-kit: tree palm fern bush and grass archetypes
vegetation-lod-domain-kit: density and distance policy
vegetation-wind-domain-kit: wind deformation descriptor
weather-state-domain-kit: weather state transitions
wind-field-domain-kit: deterministic direction strength
deterministic-seed-domain-kit: seed derivation deterministic random
environment-clock-domain-kit: elapsed time environmental phase
```

### Additional composition and adapters

```txt
cozy-ocean-composition-kit: logical layer graph pass-order validation transparent-depth validation terrain handoff per-layer depth/blend contracts
browser-startup-presentation-adapter: startup descriptor DOM and failure projection timeout and updates
cozy-startup-host: product preparation order engine reuse continuation global failure capture disposal
cozy-menu-scene-adapter: WebGPU-first renderer TSL materials procedural palm compute wind bloom tone mapping resize animation loop public readback delayed retirement
cozy-menu-game-shell-adapter: iframe preload progress Play gate history focus crossfade fallback reveal error projection
cozy-game-preload-bridge-adapter: startup polling parent messages simulation freeze/resume presentation sleep/resume player-entry preparation acknowledgement
```

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented kit and adapter surfaces: 70
```

## Source-backed findings

```txt
menu renderer: WebGPURenderer
menu backend: WebGPU when available, otherwise WebGL2
menu compute storage: 12 float values
menu compute dispatch: once per active menu frame on WebGPU
menu post-processing: RenderPipeline plus bloom
hidden game renderer: second WebGPURenderer
hidden game sleep source: bridge polling Core Startup playable descriptor
simulation freeze mechanism: tick/step function replacement
presentation freeze mechanism: capture and clear animation loop
entry acknowledgement: before post-resume frame proof
menu/game overlap after entry: up to 780 ms
parent fallback reveal: 900 ms
menu scene traversal disposal: absent
wind storage/compute retirement receipt: absent
resize/message/keydown/click listener retirement: absent
CozyMenu public capability revocation: absent
retirement generation and result: absent
real-browser GPU fixture: absent
```

`renderer.dispose()` and `renderPipeline.dispose()` are called after the fade, but the application does not enumerate or prove retirement of palm/sky geometries, materials, node graphs, compute/storage resources, listeners, timers or the immutable `globalThis.CozyMenu` reference. This is an ownership and proof gap; it is not a claim that Three.js internally leaks every resource.

## Required authority

```txt
cozy-island-dual-surface-gpu-handoff-retirement-authority-domain
```

## Required transaction

```txt
PresentationHandoffCommand
  -> bind shell, iframe, menu-surface and game-surface generations
  -> bind menu and game backend/device/context revisions
  -> admit one current Core Startup ready revision
  -> acquire a SleepingGamePresentationLease
  -> inventory menu compute, pipeline, scene and listener resources
  -> prepare game simulation and presentation resume
  -> reject stale duplicate or failed handoff work
  -> submit and acknowledge the first resumed game frame
  -> begin a bounded menu/game overlap window
  -> stop menu compute and frame submission
  -> dispose every menu resource participant or report partial retirement
  -> remove listeners and pending timers
  -> revoke or replace the CozyMenu public capability
  -> publish MenuPresentationRetirementResult
  -> commit reveal, history and focus
  -> publish PresentationHandoffResult
```

## Planned authority surfaces

```txt
presentation-surface-generation-kit
gpu-backend-generation-kit
gpu-device-context-generation-kit
menu-presentation-lease-kit
game-presentation-lease-kit
sleeping-game-presentation-lease-kit
presentation-resource-manifest-kit
compute-resource-manifest-kit
render-pipeline-resource-manifest-kit
scene-resource-manifest-kit
listener-timer-resource-manifest-kit
overlap-budget-policy-kit
presentation-handoff-command-kit
game-resume-preparation-kit
first-resumed-game-frame-ack-kit
menu-compute-stop-result-kit
menu-frame-stop-result-kit
menu-scene-retirement-kit
menu-compute-retirement-kit
menu-pipeline-retirement-kit
menu-renderer-retirement-kit
public-capability-revocation-kit
presentation-retirement-result-kit
presentation-handoff-fixture-kit
```

## Validation boundary

Documentation only. Existing tests statically require WebGPU, TSL, bloom, compute markers and hidden presentation sleep, but do not create two browser GPU surfaces, inspect backend/device generations, measure overlap, force retirement failures or prove resource/capability cleanup. No runtime, dependency, workflow or deployment change was made by this audit.