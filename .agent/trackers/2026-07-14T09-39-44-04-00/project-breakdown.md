# Project breakdown: MyCozyIsland postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Prior repo-local documentation head:** `8fbc1617418f4a0701c76928e4b5da3956812e13`  
**Status:** `menu-postcard-atlas-frame-admission-audited`

## Summary

Three runtime commits replaced the modeled palm leaflets with eight alpha-cut frond cards backed by a four-cell procedural canvas atlas, added three flower cards, a water strip, shoreline haze, new postcard framing and a source-pattern smoke update. The implementation is materially lighter, but the repository has no executable browser evidence that the atlas cells remain isolated under linear mip filtering, that the alpha-cut silhouette is correct on both WebGPU and WebGL2, that the authored postcard frame was actually presented, or that the new atlas/card resources are retired after game entry.

## Plan ledger

**Goal:** reconcile the new menu runtime and define one evidence boundary from procedural atlas creation through an admitted postcard frame and complete resource retirement.

- [x] Compare all 11 current Publish repositories with ten eligible central ledgers.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm no new, ledger-missing or root-agent-missing eligible repository.
- [x] Identify MyCozyIsland as the sole runtime-ahead eligible repository.
- [x] Select only MyCozyIsland.
- [x] Inspect the three new runtime/test commits, `menu.html`, `src/menu.js`, the shell smoke and retained audits.
- [x] Identify the complete interaction loop and all domains.
- [x] Preserve all 65 source-backed kit surfaces and five browser/product adapters.
- [x] Identify every kit and offered service.
- [x] Define atlas/frame admission, retirement and browser-proof requirements.
- [ ] Implement the authority.
- [ ] Execute browser, build and Pages fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible non-Cavalry repositories: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
reason: three runtime/test commits followed the last reconciled documentation head
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Reconciled runtime commits

```txt
cbef80bb3c2731f00ce646c5ae39a93a713309c5  feat: use alpha-cut frond cards and postcard background
aff9e650de692b4c54a30ae0cfd26122adb45752  chore: refresh postcard menu entry
6c5e465b7b431ff6758f78e7ceb25d0f763f658f  test: enforce alpha-card postcard menu
```

## Complete interaction loop

```txt
index route
  -> redirect to menu.html
  -> import Three.js WebGPU, TSL and Bloom
  -> initialize WebGPURenderer
  -> generate four-cell frond canvas atlas
  -> generate three-cell flower canvas atlas
  -> build one trunk, one crown hub and eight curved frond cards
  -> build sky, glow, water strip, shoreline and three flower cards
  -> create compute wind when WebGPU is active
  -> create RenderPipeline and bloom
  -> begin menu animation loop
  -> schedule hidden game preload
  -> game Core Startup prepares the adventure and first frame
  -> bridge sleeps hidden simulation and presentation
  -> Play sends entry request
  -> game acknowledges or timeout fallback reveals iframe
  -> menu stops loop and disposes pipeline and renderer
  -> player walks, farms, forages and auto-saves
```

## Domains in use

```txt
root routing, history, focus and browser page lifecycle
module/import-map provider admission
menu shell and accessible Play control
WebGPU/WebGL2 backend admission
procedural Canvas2D atlas authoring
alpha-cut frond-card geometry and material sampling
flower-card atlas and transparent presentation
TSL vertex deformation and WebGPU storage compute
postcard camera, sky, fog, light, water, shoreline and bloom
menu frame admission and visual evidence
menu scene/resource retirement
iframe preload and same-origin messaging
Core Startup readiness, continuation and first-frame admission
NexusEngine object and transaction services
world, input, Inventory, Agriculture, Foraging and interaction
player, camera, scenario, save and render snapshots
game WebGPU/WebGL2 world and adaptive presentation
simulation and presentation sleep/resume
validation, build, Pages and central tracking
```

## Source-backed kit and service inventory

### Engine-installed kits: 14

| Kit | Offered services |
|---|---|
| `core-startup-kit` | Launch, preparation registration, waiting/working/ready/failure states, retry/fallback descriptors, continuation selection, first-frame admission, playable entry, snapshot/load/reset. |
| `core-object-kit` | Object registration, lookup and listing. |
| `core-transaction-ledger-kit` | Idempotent ledger, record, apply-once, snapshot and reset. |
| `cozy-world-domain-kit` | Seeded world, surface query, plot and forage layout, render base, snapshot and reset. |
| `cozy-input-domain-kit` | Input normalization, command queue, frame admission, held actions, clear, snapshot and reset. |
| `cozy-inventory-domain-kit` | Items, seed selection, transactions, batch settlement, snapshot and reset. |
| `agriculture-domain-kit` | Land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset. |
| `cozy-foraging-domain-kit` | Wild coconut nodes, collection, respawn, snapshot and reset. |
| `cozy-player-domain-kit` | Movement, grounding, view, stamina, snapshot and reset. |
| `cozy-scenario-domain-kit` | Time, objectives, snapshot and reset. |
| `cozy-interaction-domain-kit` | Targeting, contextual actions, agriculture settlement, wild-forage action, prompts, results, snapshot and reset. |
| `cozy-camera-domain-kit` | Aerial intro, first-person view, terrain clearance and camera descriptors. |
| `cozy-save-domain-kit` | Capture, checksum validation, migration, restore, rollback, reset and diagnostics. |
| `cozy-render-snapshot-domain-kit` | Static world, agriculture descriptors, frame snapshot, HUD descriptor and debug descriptor. |

### Cataloged world/render/host kits: 50

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit: cloud/fog volume generation, CPU fallback
webgpu-foam-renderer-kit: shoreline foam geometry, animation, render-layer contract
webgpu-ocean-renderer-kit: ocean geometry, wave deformation, optics, water-layer contract
webgpu-performance-budget-kit: frame sampling, moving average, FPS state, degrade/recover callbacks
webgpu-post-processing-renderer-kit: scene/fog/foam passes, depth mask, resolution scaling, pass-order readback
webgpu-rolling-fog-renderer-kit: fog volume, material, step scaling, readback
webgpu-stylized-material-renderer-kit: material descriptors and construction
webgpu-volumetric-cloud-renderer-kit: cloud volumes, raymarch materials, step scaling, readback
camera-rail-sequence-kit: rail progression, camera sequence descriptors
cozy-island-scenario-kit: scenario and sequence descriptors
terrain-surface-domain-kit: height, normal, material and surface queries
vegetation-placement-domain-kit: deterministic placement graph
aerial-perspective-domain-kit: horizon, distance and atmosphere descriptors
campfire-atmosphere-domain-kit: campfire light, smoke and heat descriptors
cloud-density-field-domain-kit: density recipe and texture budget
cloud-horizon-band-domain-kit: horizon placement descriptors
cloud-lighting-domain-kit: color, shadow and silver lining
cloud-lod-domain-kit: step and volume-count policies
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
terrain-lod-domain-kit: terrain resolution and distance policies
underwater-atmosphere-domain-kit: underwater color and attenuation
vegetation-archetype-domain-kit: tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit: density and distance policies
vegetation-wind-domain-kit: wind-deformation descriptor
weather-state-domain-kit: weather state and transitions
wind-field-domain-kit: deterministic direction and strength
deterministic-seed-domain-kit: seed derivation and deterministic random
environment-clock-domain-kit: elapsed time and environmental phase
```

### Additional composition kit: 1

`cozy-ocean-composition-kit` offers logical render-layer graphs, pass-order validation, transparent-depth validation, terrain-handoff validation and per-layer depth/blend contracts.

### Browser/product adapters: 5

| Adapter | Offered services |
|---|---|
| `browser-startup-presentation-adapter` | Startup descriptor DOM projection, failure projection, timeout helper and render-update bridge. |
| `cozy-startup-host` | Product preparation order, engine reuse, continuation mapping, pre-playable global error capture and host disposal. |
| `cozy-menu-scene-adapter` | Provider/backend admission, procedural frond and flower atlases, curved alpha-cut cards, TSL materials, compute wind, postcard scene, pipeline, bloom, tone mapping, shadows, resize, animation, readback and delayed retirement. |
| `cozy-menu-game-shell-adapter` | Iframe preload, progress, Play gate, entry request, crossfade, history/focus transfer, fallback reveal and error display. |
| `cozy-game-preload-bridge-adapter` | Startup polling, parent messaging, simulation freeze/resume, presentation sleep/resume, player preparation and entry acknowledgement. |

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
render surfaces: menu WebGPU/WebGL2, game WebGPU/WebGL2, DOM shell
```

## Main findings

### New implementation

```txt
frond count: 8
frond atlas variants: 4
frond card segments: 5
frond alpha test: 0.48
frond transparency sorting: disabled
flower cards: 3
menu bloom: 0.14 / 0.28 / 1.22
menu exposure: 0.92
camera: left-third elevated postcard framing
```

### Evidence gap

The smoke test proves source shape only. It does not create a browser renderer, execute compute, inspect the atlas, capture a frame, compare WebGPU and WebGL2, verify alpha occupancy or prove that the displayed frame corresponds to this menu revision.

### Atlas sampling risk

Frond UVs span exact atlas-cell boundaries using `(variant + t) / 4`. Flower UVs also use exact cell starts and ends. Both atlases use linear filtering and generated mipmaps without authored cell gutters or edge extrusion. This creates an untested risk of adjacent-cell or transparent-edge color contamination at oblique angles and lower mip levels. The audit does not claim that bleed is visibly present; it records that current source and tests cannot rule it out.

### Retirement gap

After reveal, the code stops the animation loop and disposes the pipeline and renderer. It does not explicitly remove the resize listener, traverse and dispose scene geometries/materials, dispose frond and flower atlas textures, retire compute storage, or revoke `globalThis.CozyMenu`.

## Required authority

```txt
cozy-island-menu-postcard-atlas-frame-admission-authority-domain
```

```txt
MenuPostcardFrameAdmissionCommand
  -> bind runtime, visual, provider, backend, viewport, DPR and reduced-motion revisions
  -> generate deterministic frond and flower atlas candidates
  -> validate cell bounds, gutters, UV interiors, alpha occupancy and mip policy
  -> prepare card geometry, materials, compute wind and scene participants
  -> submit one candidate frame
  -> capture frame identity, backend identity, scene manifest and visual artifact hash
  -> publish MenuPostcardFrameResult
  -> retain the accepted predecessor until first-frame acknowledgement

MenuPostcardRetirementCommand
  -> stop frame admission
  -> remove listeners and pending callbacks
  -> dispose pipeline, renderer, storage, textures, geometry and materials
  -> revoke public capability references
  -> publish participant receipts and MenuPostcardRetirementResult
```

## Validation boundary

Documentation only. No runtime, test, dependency, script, workflow or deployment behavior changed in this audit. `npm test`, a real browser, build output and GitHub Pages were not executed.