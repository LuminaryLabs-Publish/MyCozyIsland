# Project breakdown: MyCozyIsland live motion preference projection

**Timestamp:** `2026-07-16T13-01-43-04-00`  
**Selected repository:** `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** preserve the existing adventure architecture while defining one live motion policy for optional menu and environment animation.

- [x] Inventory all 11 accessible Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Compare ten eligible central ledgers and root `.agent` states.
- [x] Confirm zero higher-priority repositories.
- [x] Select MyCozyIsland as the oldest synchronized eligible repository.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all kits and offered services.
- [x] Isolate the live motion-preference gap.
- [x] Define the planned authority and fixture gate.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

MyCozyIsland      2026-07-16T05-41-12-04-00 selected
IntoTheMeadow     2026-07-16T05-58-36-04-00
HorrorCorridor    2026-07-16T07-03-14-04-00
TheLongHaul       2026-07-16T08-44-21-04-00
ZombieOrchard     2026-07-16T09-02-09-04-00
TheUnmappedHouse  2026-07-16T09-58-49-04-00
PhantomCommand    2026-07-16T10-38-36-04-00
TheOpenAbove      2026-07-16T10-58-20-04-00
AetherVale        2026-07-16T11-41-17-04-00
PrehistoricRush   2026-07-16T12-47-00-04-00
TheCavalryOfRome  excluded
```

## Complete interaction loop

```txt
index route
  -> replace with menu route

menu route
  -> initialize Three.js WebGPU/WebGL2 postcard
  -> sample prefers-reduced-motion once
  -> create procedural frond and flower atlases
  -> run palm, water and bloom presentation
  -> start same-origin hidden game preload
  -> receive progress and first-frame readiness
  -> accept Play
  -> crossfade and focus the game
  -> retire menu renderer

game route
  -> initialize renderer and Core Startup
  -> install adventure domains
  -> restore or start save state
  -> create authoritative island and render graph
  -> advance automatic aerial camera
  -> settle normalized input, scenario, player and interactions
  -> project ocean, foam, world and atmosphere motion
  -> render and autosave
```

## Domains in use

```txt
static routes and module import maps
same-origin iframe preload and messaging
browser media-query capability
Core Startup, Object and Transaction Ledger
seeded world and surface queries
normalized browser input
Inventory, Agriculture and Foraging
player movement, stamina and grounding
scenario time and objective
context interaction
camera and aerial intro
save capture, migration and restore
renderer-neutral static/frame snapshots
menu and game WebGPU/WebGL2 presentation
terrain, vegetation, ocean, cloud, fog, foam and post-processing
adaptive quality and diagnostics
motion preference, classification and projection
validation, build, Pages and governance
```

## Engine-installed kits and services

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild Foraging action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

## Cataloged world, environment and render kits

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

Service families: renderer fallback; atmosphere preparation; ocean, foam and post-processing; adaptive quality; camera and scenario descriptors; terrain and vegetation queries; cloud, fog and weather fields; illumination and shoreline optics; render archetypes; deterministic seeds; environment time.

## Composition and adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | layer graph, pass-order validation, transparent-depth validation, terrain handoff validation, depth-blend contracts |
| `browser-startup-presentation-adapter` | descriptor DOM projection, failure projection, timeout helper, render-update bridge |
| `cozy-startup-host` | preparation order, engine reuse, continuation mapping, global error capture, disposal |
| `cozy-menu-scene-adapter` | WebGPU/WebGL2 postcard, procedural atlases, wind, water, fog, lighting, post, resize, animation, retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, play gate, entry, crossfade, history, focus, fallback |
| `cozy-game-preload-bridge-adapter` | embed classification, messaging, simulation freeze/resume, presentation freeze/resume, entry preparation, acknowledgement |

## Main finding

The current source has three separate motion behaviors rather than one policy:

```txt
CSS media query
  -> removes selected transitions

menu JavaScript startup sample
  -> attenuates palm motion
  -> changes entry retirement delay
  -> never updates after module load

active game
  -> has no motion-preference state
  -> automatically advances the aerial rail
  -> continuously animates ocean, foam and environment
```

The menu water shader is always time-based. The game ocean is always shader-time based. Foam is always elapsed-time based. Direct player control and authoritative simulation are not separated from optional motion through a typed policy.

## Required parent authority

```txt
cozy-island-motion-preference-live-animation-projection-authority-domain
```

## Planned authority surfaces

```txt
motion-capability-observer-kit
motion-preference-revision-kit
product-motion-override-kit
motion-policy-resolution-kit
essential-motion-classification-kit
menu-motion-descriptor-kit
menu-frond-motion-adapter-kit
menu-water-motion-adapter-kit
menu-transition-motion-adapter-kit
aerial-intro-motion-adapter-kit
gameplay-camera-motion-adapter-kit
ocean-motion-adapter-kit
foam-motion-adapter-kit
cloud-motion-adapter-kit
fog-motion-adapter-kit
world-wind-motion-adapter-kit
live-preference-change-settlement-kit
stale-motion-policy-rejection-kit
first-reduced-motion-frame-ack-kit
motion-preference-source-build-pages-fixture-kit
```

## Validation

Documentation only. No runtime, visual, gameplay, dependency, workflow or deployment changes were made.
