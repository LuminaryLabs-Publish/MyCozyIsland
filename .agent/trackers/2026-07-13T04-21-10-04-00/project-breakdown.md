# Project breakdown: MyCozyIsland public runtime capability reconciliation

**Timestamp:** `2026-07-13T04-21-10-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Scope:** documentation and central-publication reconciliation only

## Summary

MyCozyIsland composes a deterministic island, Inventory, Agriculture, wild Foraging, player movement, contextual interaction, camera, portable saves, renderer-neutral snapshots and WebGPU/WebGL2 presentation. A repo-local audit at `2026-07-13T04-10-37-04-00` identified that `globalThis.CozyIsland` exposes live mutable runtime and presentation owners, but central tracking and part of the root `.agent` routing still pointed to the older page-lifecycle audit.

## Plan ledger

**Goal:** publish one consistent evidence chain for the public-runtime capability finding across the selected repository and the central repo ledger without changing runtime behavior.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with central ledger and root `.agent` state.
- [x] Detect MyCozyIsland repo-local capability documentation newer than central tracking.
- [x] Select and modify only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Re-read the global host publication, animation loop, page-lifecycle and representative mutable service surfaces.
- [x] Identify the complete interaction loop and active domains.
- [x] Preserve all 64 source-backed kit surfaces and offered services.
- [x] Add timestamped architecture, render, gameplay, interaction, capability, deployment and central-sync audits.
- [x] Refresh every required root `.agent` document and machine registry.
- [ ] Implement channel policy, least-authority projections, capability admission, revocation and executable fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local-newer-than-central repositories: 1

MyCozyIsland       central 2026-07-13T01-40-00-04-00
                   local   2026-07-13T04-10-37-04-00 selected unsynchronized
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

At selection, the central ledger referenced repo-local documentation head `70e18e72870df7d8de9021c2c14b8c8079497625`, while the capability audit had advanced the repository to `f51c1cbac86c6a59f031a3647586fefc1b1b5842`.

## Complete interaction loop

```txt
startup
  -> create and initialize WebGPURenderer
  -> select WebGPU or WebGL2 backend and static quality tier
  -> create NexusEngine with 13 installed core/adventure kits
  -> restore portable save when available
  -> create world, gameplay, ocean, foam, cloud, fog and post participants
  -> install canvas/window input and resize listeners
  -> start renderer.setAnimationLoop
  -> publish globalThis.CozyIsland

normal frame
  -> calculate clamped wall-time delta
  -> adventure.tick(dt)
  -> Core Input frame and domain systems advance
  -> player, scenario, Agriculture and Foraging update
  -> camera and renderer-neutral frame snapshot resolve
  -> world/gameplay/foam/HUD participants update
  -> performance budget may request quality transition
  -> post pipeline renders
  -> periodic save compares fingerprints and writes changed state
  -> debug overlay periodically projects diagnostics

normal user interaction
  -> keyboard, pointer or wheel browser event
  -> cozy-input queue
  -> admitted input frame
  -> player/interaction/camera consumers
  -> domain transition and renderer-neutral frame
  -> visible WebGPU/WebGL2 frame

public-host interaction
  -> console or same-origin script reads globalThis.CozyIsland
  -> direct access to renderer, scene, camera, adventure, raw engine and domain APIs
  -> caller can tick, enqueue, mutate, load snapshots, restore or reset
  -> no channel policy, grant, caller identity, expected revision or typed result
  -> normal loop later projects whichever state remains

page lifecycle
  -> pagehide saves and partially disposes gameplayRenderer
  -> public host has no revoke result
  -> retained-page reconstruction remains absent
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

| Kit | Domain | Offered services |
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
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed total: 64
active route surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers: 9
```

## Source-backed finding

`src/main-adventure.js` assigns `globalThis.CozyIsland` after startup and exposes the live renderer, scene, camera, adventure, raw engine, world, input, player, Inventory, Agriculture, Foraging, interaction and save APIs. It also exposes direct save capture and multi-domain reset helpers.

The top-level wrapper is frozen, but its referenced values remain live and mutable. Representative public operations include simulation ticking, input enqueue/clear, Inventory mutation and snapshot load, Foraging harvest and reset, save restore and `resetAll`, and direct Three.js presentation mutation. No authority determines which build/channel may publish those capabilities, which caller issued a mutation, whether the command is stale or duplicated, what changed, whether the host was revoked or which visible frame contains the effect.

## Required parent DSK

```txt
cozy-island-public-runtime-capability-authority-domain
```

## Required transaction

```txt
PublicCapabilityCommand
  -> admit host ID, host generation and publication channel
  -> validate capability grant, expiry and caller/source identity
  -> validate command ID, sequence and expected runtime/domain/render revisions
  -> prepare one permitted participant operation
  -> reject raw-owner access, stale, duplicate, unknown or revoked work
  -> commit one bounded operation or zero mutation
  -> publish PublicCapabilityResult and participant receipts
  -> append a bounded, secret-free observation
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

## Reconciliation result

```txt
technical audit generation: 2026-07-13T04-10-37-04-00
publication reconciliation generation: 2026-07-13T04-21-10-04-00
runtime source changed: no
selected Publish repositories modified: 1
branches created: 0
pull requests created: 0
```

## Validation boundary

No runtime test, build, browser smoke, production-host inspection, Pages smoke or capability fixture was executed because this run changes documentation only. No least-authority, safe-public-host, deterministic external-control, revocation, reset-safety or visible-effect claim is made.