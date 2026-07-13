# Project breakdown: MyCozyIsland public runtime capability authority

**Timestamp:** `2026-07-13T04-10-37-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Scope:** documentation only

## Summary

MyCozyIsland composes deterministic world generation, Agriculture, Inventory, Foraging, player movement, interaction, camera, portable saves, renderer-neutral snapshots and WebGPU/WebGL2 presentation. The selected gap is the browser-global `CozyIsland` host, which publishes raw mutable simulation and presentation owners without channel policy, capability grants, command admission, revocation or visible-frame receipts.

## Plan ledger

**Goal:** identify the complete game loop, domain graph, kit/service inventory and missing capability boundary, then route the findings through the repo-local and central ledgers.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare eligible repositories with central ledger and root `.agent` coverage.
- [x] Select only MyCozyIsland as the oldest eligible documented repository.
- [x] Read the active page-lifecycle audit and retained audit state.
- [x] Read browser startup, animation, host publication and page lifecycle source.
- [x] Read engine composition and representative mutating service APIs.
- [x] Identify the full interaction loop and domains.
- [x] Identify all 64 source-backed kit surfaces and offered services.
- [x] Define the missing parent DSK and candidate kits.
- [x] Add timestamped architecture, render, gameplay, interaction, capability and deploy audits.
- [x] Refresh required root `.agent` files.
- [ ] Runtime implementation and executable capability fixtures remain future work.

## Selection comparison

```txt
MyCozyIsland       2026-07-13T01-40-00-04-00 selected
TheUnmappedHouse   2026-07-13T01-49-49-04-00
AetherVale         2026-07-13T02-15-51-04-00
TheOpenAbove       2026-07-13T02-18-03-04-00
IntoTheMeadow      2026-07-13T02-39-44-04-00
PhantomCommand     2026-07-13T02-49-07-04-00
PrehistoricRush    2026-07-13T03-20-58-04-00
HorrorCorridor     2026-07-13T03-38-31-04-00
ZombieOrchard      2026-07-13T03-59-28-04-00
TheCavalryOfRome   excluded
```

```txt
accessible repositories: 10
eligible repositories: 9
new eligible repositories: 0
central-ledger-missing repositories: 0
root-.agent-missing repositories: 0
selected Publish repository: LuminaryLabs-Publish/MyCozyIsland
```

## Complete interaction loop

```txt
startup
  -> create WebGPURenderer and initialize WebGPU/WebGL2 backend
  -> choose static render quality
  -> create NexusEngine with 13 installed kits
  -> restore portable save when available
  -> create world, gameplay, ocean, foam, cloud, fog and post participants
  -> install canvas/window input and resize listeners
  -> start renderer.setAnimationLoop
  -> publish globalThis.CozyIsland

frame
  -> calculate clamped dt
  -> adventure.tick(dt)
  -> Core Input frame and domain systems advance
  -> player, scenario, Agriculture and Foraging update
  -> camera and renderer-neutral frame snapshot resolve
  -> world/gameplay/foam/HUD update
  -> performance budget may request quality transition
  -> post pipeline renders
  -> periodic save compares durable fingerprint and writes when changed
  -> debug overlay periodically projects diagnostics

normal interaction
  -> keyboard, pointer or wheel browser event
  -> cozy-input command queue
  -> admitted InputFrame
  -> player/interaction/camera consumers
  -> domain transition and renderer-neutral frame
  -> visible WebGPU/WebGL2 frame

public-host interaction
  -> console or same-origin script reads globalThis.CozyIsland
  -> direct access to renderer, scene, camera, adventure, engine and domain APIs
  -> caller may tick, enqueue, mutate, load snapshots, restore or reset
  -> no capability admission, expected revision or command journal
  -> normal loop later projects whichever state remains

page lifecycle
  -> pagehide saves and partially disposes gameplay renderer
  -> public host has no revoke result
  -> pageshow reconstruction is absent
```

## Domains in use

```txt
browser shell, canvas, HUD, loader, error and debug surfaces
browser global-object and diagnostics publication
public/development/support channel policy
capability manifests, grants, expiry and revocation
runtime session, generation, command identity and observation
NexusEngine composition, clock, scheduler and service graph
Core Object registration
Core Transaction Ledger idempotency
seeded world, terrain, plots, forage nodes and render base
input normalization, queue, held actions and frames
Inventory and seed selection
Agriculture land, soil, cultivation, water, growth, harvest and perennials
wild coconut Foraging and respawn
player movement, grounding, view and stamina
scenario time and objective
contextual interaction and cross-domain settlement
camera intro and first-person projection
portable save capture, migration, restore, rollback and reset
renderer-neutral static/frame/HUD/debug snapshots
WebGPU/WebGL2 capability and fallback
atmosphere, cloud, fog, ocean, foam, lighting and materials
render quality, performance hysteresis and post-processing
browser lifecycle, storage, validation, build, Pages and central tracking
```

## Implemented kits and offered services

### Engine-installed core and adventure kits: 13

| Kit | Domain | Services |
|---|---|---|
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, wild forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

```txt
debug-overlay-host-kit
  -> draw, toggle, show, hide
webgl2-fallback-renderer-kit
  -> fallback capability policy, CPU volume source, feature-disable policy
webgpu-compute-atmosphere-renderer-kit
  -> cloud volume generation, fog volume generation, CPU fallback
webgpu-foam-renderer-kit
  -> shoreline foam geometry, animation, render-layer contract
webgpu-ocean-renderer-kit
  -> ocean geometry, wave deformation, optics, water-layer contract
webgpu-performance-budget-kit
  -> frame sampling, moving average, FPS state, degrade callback, recover callback
webgpu-post-processing-renderer-kit
  -> scene pass, fog pass, foam pass, depth mask, resolution scaling, pass-order readback
webgpu-rolling-fog-renderer-kit
  -> fog volume, material, step scaling, readback
webgpu-stylized-material-renderer-kit
  -> material descriptors, material construction
webgpu-volumetric-cloud-renderer-kit
  -> cloud volumes, raymarch materials, step scaling, readback
camera-rail-sequence-kit
  -> rail progression, camera-sequence descriptors
cozy-island-scenario-kit
  -> scenario descriptors, sequence descriptors
terrain-surface-domain-kit
  -> height query, normal query, material query, surface query
vegetation-placement-domain-kit
  -> deterministic placement graph
aerial-perspective-domain-kit
  -> horizon descriptor, distance descriptor, atmosphere descriptor
campfire-atmosphere-domain-kit
  -> campfire light, smoke descriptor, heat descriptor
cloud-density-field-domain-kit
  -> density recipe, texture budget
cloud-horizon-band-domain-kit
  -> horizon placement descriptors
cloud-lighting-domain-kit
  -> color, shadow, silver lining
cloud-lod-domain-kit
  -> step policy, volume-count policy
cloud-shadow-domain-kit
  -> shadow projection descriptors
cloud-weather-domain-kit
  -> coverage, weather state
fog-advection-domain-kit
  -> direction, speed
fog-field-domain-kit
  -> density recipe, texture budget
fog-volume-placement-domain-kit
  -> bounds, readability mask
ground-contact-domain-kit
  -> terrain contact, clearance query
illumination-domain-kit
  -> sun state, sky state, ambient state, exposure state
ocean-caustics-domain-kit
  -> caustic projection descriptors
ocean-floor-profile-domain-kit
  -> seafloor shape, depth profile
ocean-optics-domain-kit
  -> color, opacity, transmission, absorption, reflection
ocean-wave-domain-kit
  -> deterministic wave components, sea level
prop-archetype-domain-kit
  -> prop geometry archetypes, prop material archetypes
render-archetype-domain-kit
  -> renderer-neutral object archetypes
render-quality-domain-kit
  -> static tier selection, quality budgets
render-snapshot-domain-kit
  -> renderer-neutral world snapshot
rock-archetype-domain-kit
  -> rock placement archetypes, rock presentation archetypes
shoreline-field-domain-kit
  -> shoreline classification, distance field
shoreline-foam-domain-kit
  -> foam band descriptors
stylized-material-descriptor-domain-kit
  -> color, roughness, rim, outline
sun-glitter-domain-kit
  -> water highlight descriptors
terrain-biome-field-domain-kit
  -> deterministic biome classification
terrain-lod-domain-kit
  -> terrain resolution policy, distance policy
underwater-atmosphere-domain-kit
  -> underwater color, attenuation
vegetation-archetype-domain-kit
  -> tree, palm, fern, bush and grass archetypes
vegetation-lod-domain-kit
  -> density policy, distance policy
vegetation-wind-domain-kit
  -> wind deformation descriptor
weather-state-domain-kit
  -> weather state, transitions
wind-field-domain-kit
  -> deterministic direction, strength
deterministic-seed-domain-kit
  -> seed derivation, deterministic random
environment-clock-domain-kit
  -> elapsed time, environmental phase
```

### Additional composition kit: 1

```txt
cozy-ocean-composition-kit
  -> logical render-layer graph
  -> pass-order validation
  -> transparent-depth validation
  -> terrain-handoff validation
  -> per-layer depth and blend contracts
```

### Census

```txt
engine-installed core/adventure: 13
cataloged world/render/host: 50
additional composition: 1
total source-backed surfaces: 64
active route surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

## Main finding

`globalThis.CozyIsland` is created in every successful browser startup. It exposes raw references to the renderer, scene, camera, adventure and engine, plus world, input, player, Inventory, Agriculture, Foraging, interaction and save APIs. It also exposes direct capture and reset helpers.

The top-level object is frozen, but referenced objects remain live and mutable. The service APIs include tick, enqueue, clear, add, remove, batch settlement, harvest, loadSnapshot, restore and reset operations. No authority determines which channel may receive these capabilities, which caller issued an operation, whether the operation is stale or duplicated, which participants changed, whether the host has been revoked or which visible frame contains the effect.

## Required parent DSK

```txt
cozy-island-public-runtime-capability-authority-domain
```

## Required transaction

```txt
PublicCapabilityCommand
  -> admit host ID, host generation and channel
  -> validate capability grant, expiry and caller/source
  -> validate command ID, sequence and expected revisions
  -> prepare permitted participant operation
  -> reject raw-owner access, stale, duplicate, unknown or revoked work
  -> commit one bounded operation or zero mutation
  -> publish PublicCapabilityResult and participant receipts
  -> append bounded observation
  -> acknowledge the first visible frame containing the committed effect
```

## Candidate kits

```txt
public-host-id-kit
public-host-generation-kit
host-channel-policy-kit
capability-manifest-kit
capability-grant-kit
capability-expiry-kit
read-only-public-projection-kit
public-capability-command-kit
public-capability-admission-kit
caller-source-identity-kit
expected-runtime-revision-kit
duplicate-command-rejection-kit
stale-command-rejection-kit
revoked-capability-rejection-kit
public-capability-result-kit
participant-change-receipt-kit
reset-confirmation-kit
public-host-revoke-kit
public-capability-observation-kit
public-capability-journal-kit
visible-capability-effect-ack-kit
production-host-policy-fixture-kit
capability-source-build-pages-parity-fixture-kit
```

## Validation boundary

```txt
runtime source changed: no
gameplay changed: no
input changed: no
save changed: no
rendering changed: no
dependencies changed: no
package scripts changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
browser capability smoke: not run
production host inspection: not run
Pages host smoke: not run
```

No safe-public-host, least-authority, deterministic external-control, host-revocation or visible-effect claim is made.
