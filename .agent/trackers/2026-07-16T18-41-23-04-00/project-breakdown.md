# Project breakdown: MyCozyIsland pointer-look gesture ownership

**Timestamp:** `2026-07-16T18-41-23-04-00`  
**Selected repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Reviewed pre-audit head:** `02ef4b2ab98a36a7e744ff8dce36e796ed15f1ec`

## Plan ledger

**Goal:** preserve the current adventure and input architecture while giving each pointer-look drag one exact pointer owner, capture lease, gesture revision, terminal result and matching camera frame.

- [x] Compare all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare ten eligible central ledgers, root `.agent` states and current heads.
- [x] Confirm no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead repository.
- [x] Select only MyCozyIsland by the oldest synchronized central timestamp.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Preserve all implemented kits, adapters and offered services.
- [x] Isolate pointer identity, capture and gesture-settlement gaps.
- [x] Define one parent authority and 18 coordinating surfaces.
- [ ] Implement pointer ownership and execute browser fixtures.

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

MyCozyIsland      2026-07-16T13-01-43-04-00 selected
TheLongHaul       2026-07-16T14-01-02-04-00
PrehistoricRush   2026-07-16T14-39-29-04-00
TheOpenAbove      2026-07-16T14-59-39-04-00
IntoTheMeadow     2026-07-16T15-38-27-04-00
HorrorCorridor    2026-07-16T16-00-12-04-00
ZombieOrchard     2026-07-16T16-40-45-04-00
TheUnmappedHouse  2026-07-16T16-58-39-04-00
PhantomCommand    2026-07-16T17-40-04-04-00
AetherVale        2026-07-16T18-00-35-04-00
TheCavalryOfRome  excluded
```

## Complete interaction loop

```txt
index route
  -> replace with menu route

menu route
  -> initialize the WebGPU/WebGL2 postcard
  -> preload game.html in a hidden same-origin frame
  -> receive progress and first-frame readiness
  -> accept Play
  -> resume the prepared game
  -> crossfade, focus the game canvas and retire the menu renderer

game route
  -> initialize Core Startup and the presentation backend
  -> install the adventure composition
  -> restore or create island state
  -> build terrain, vegetation, ocean, foam, clouds, fog and post processing
  -> admit keyboard, wheel and pointer evidence
  -> tick scenario, player, Agriculture, Foraging and interaction domains
  -> project camera, world, HUD and save status
  -> render and autosave

pointer-look drag
  -> any pointerdown replaces the host drag record
  -> pointer capture is requested for that pointer
  -> any later pointermove is converted to look delta while a drag exists
  -> any pointerup or pointercancel clears the shared drag record
  -> the input domain admits anonymous deltaX/deltaY commands
  -> player yaw and pitch consume the summed frame delta
  -> no gesture result or matching camera-frame acknowledgement is published
```

## Domains in use

```txt
static routes and module import maps
same-origin iframe preload, messaging, entry and focus handoff
browser pointer, capture, keyboard, wheel, focus and visibility lifecycle
Core Startup, Object and Transaction Ledger
seeded world, surface queries and object descriptors
normalized command-queued input and held-action lifecycle
Inventory, Agriculture and Foraging
player movement, grounding, view and stamina
scenario time and objective
contextual interaction
camera and aerial introduction
portable save capture, migration, restore and rollback
renderer-neutral static and frame snapshots
menu and full-game WebGPU/WebGL2 presentation
terrain, vegetation, ocean, foam, cloud, fog and post-processing
adaptive quality and diagnostics
pointer gesture identity, capture lease, cancellation and frame convergence
validation, Pages and central governance
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

Service families: renderer fallback; atmosphere volume preparation; ocean, foam and post-processing; adaptive quality; camera and scenario descriptors; terrain and vegetation queries; cloud, fog and weather fields; illumination and shoreline/ocean optics; render archetypes; deterministic seeds; environment time.

## Composition and browser/product adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | layer graph, pass-order validation, transparent-depth validation, terrain handoff validation, depth-blend contracts |
| `browser-startup-presentation-adapter` | descriptor DOM projection, failure projection, timeout helper, render-update bridge |
| `cozy-startup-host` | preparation order, engine reuse, continuation mapping, global error capture, disposal |
| `cozy-menu-scene-adapter` | WebGPU/WebGL2 postcard, procedural atlases, wind, water, fog, lighting, post, resize, animation, retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, play gate, entry, crossfade, history, focus, fallback |
| `cozy-game-preload-bridge-adapter` | embed classification, messaging, simulation freeze/resume, presentation freeze/resume, entry preparation, acknowledgement |

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned pointer-gesture surfaces: 18
```

## Main finding

The host records a pointer ID on `pointerdown`, but subsequent event handling does not enforce that identity:

```txt
pointerdown
  -> drag = { x, y, id: event.pointerId }
  -> setPointerCapture(event.pointerId)

pointermove
  -> checks only whether drag exists
  -> does not require event.pointerId === drag.id
  -> derives deltas from the shared last coordinates

pointerup
  -> clears drag for any pointer
  -> releases capture for event.pointerId, not necessarily drag.id

pointercancel
  -> clears drag for any pointer

lostpointercapture
  -> no handler
```

The input domain then strips browser identity entirely and queues only anonymous `deltaX` and `deltaY`. Commands have a fixed generation value but no pointer ID, gesture ID, capture revision, route revision or terminal settlement.

A secondary pointer can therefore replace the active drag, contribute movement against another pointer's coordinate history, or terminate the owner gesture. Lost capture can leave the host without an explicit cancellation result. This is a source-backed ownership and proof gap; no specific multi-touch failure was reproduced.

## Required parent authority

```txt
cozy-island-pointer-look-gesture-ownership-authority-domain
```

```txt
PointerGestureAdmissionCommand
  -> bind document, route, canvas, pointer and input revisions
  -> allocate one gesture ID and capture lease
  -> accept one primary pointer owner
  -> reject or classify secondary pointers
  -> normalize coordinates and deltas
  -> publish PointerGestureAdmissionResult

PointerGestureDeltaCommand
  -> require the accepted pointer and gesture revisions
  -> reject mismatched, stale, uncaptured or retired evidence
  -> enqueue one identity-bound look delta
  -> publish PointerGestureDeltaResult

PointerGestureSettlementCommand
  -> classify pointerup, pointercancel, lostpointercapture,
     blur, hidden, route retirement and replacement
  -> release capture exactly once
  -> clear only the matching gesture
  -> publish PointerGestureSettlementResult
  -> render the accepted yaw and pitch
  -> publish FirstPointerLookFrameAck
```

## Planned authority surfaces

```txt
pointer-capability-admission-kit
pointer-gesture-generation-kit
active-pointer-lease-kit
pointer-capture-adapter-kit
pointer-down-admission-kit
pointer-move-admission-kit
pointer-up-settlement-kit
pointer-cancel-settlement-kit
lost-pointer-capture-settlement-kit
secondary-pointer-rejection-kit
pointer-coordinate-normalization-kit
look-delta-command-kit
gesture-revision-kit
stale-pointer-event-rejection-kit
route-input-retirement-kit
pointer-gesture-result-kit
first-pointer-look-frame-ack-kit
pointer-gesture-browser-fixture-kit
```

## Validation

Documentation only. Runtime JavaScript, HTML, CSS, input behavior, simulation, gameplay, rendering, save behavior, dependencies, tests, workflows and deployment were not changed. No single-pointer, multi-pointer, capture-loss, artifact or Pages fixture was run.