# Project breakdown: MyCozyIsland embed-context route admission

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `4a382d17d13425a7a5f01ef7933248ba9e0058b1`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

The game preload bridge classifies a route as background preload when either `?preload=1` is present or the game is inside any iframe. Those are not equivalent conditions. A top-level visit to `game.html?preload=1` can reach playable, freeze simulation and rendering, then wait forever because there is no parent shell. Any iframe embedding also becomes a sleeping preload even when no shell protocol was requested. Cross-origin parents cannot receive the child messages because the child posts with `location.origin` as the target origin, while inbound commands check only `event.source` and not an admitted shell origin.

## Plan ledger

**Goal:** require one explicit route and embed-context admission result before the game can enter direct-play mode or acquire a shell-controlled preload suspension lease.

- [x] Enumerate all 11 accessible Publish repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare all ten eligible repositories with central-ledger and root `.agent` coverage.
- [x] Compare every eligible repository head with its documented repo-local head.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland through the oldest synchronized timestamp rule.
- [x] Inspect `index.html`, `menu.html`, `game.html`, `src/menu.js`, `src/game-preload-bridge.js`, the shell smoke and existing audit state.
- [x] Identify the complete interaction loop, all active domains, all kits, adapters and offered services.
- [x] Preserve 65 source-backed kit surfaces and five browser/product adapters.
- [x] Define a 22-surface embed-context and route-admission authority family.
- [x] Change documentation only.
- [ ] Implement typed context admission and executable browser fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized central timestamp
prior central timestamp: 2026-07-14T15-01-54-04-00
```

## Complete interaction loop

```txt
root navigation
  -> index.html replaces the route with menu.html
  -> menu builds the WebGPU/WebGL2 postcard
  -> menu assigns game.html?preload=1 to a hidden iframe
  -> game initializes Core Startup, world, save, input and renderer
  -> bridge classifies embeddedPreload from query OR iframe presence
  -> playable game freezes engine tick/step and renderer loop
  -> child posts progress and ready to an assumed parent shell
  -> shell Play posts cozy-game-enter
  -> child restores simulation and presentation
  -> parent reveals the iframe and rewrites the visible URL to game.html
  -> player walks, farms, waters, harvests and forages
  -> save service captures and restores durable adventure state
```

### Unadmitted variants

```txt
top-level game.html
  -> direct-play mode

top-level game.html?preload=1
  -> classified as preload
  -> no parent transport exists
  -> playable game can freeze indefinitely

same-origin arbitrary iframe of game.html
  -> classified as preload even without ?preload=1
  -> parent can send a bare cozy-game-enter command

cross-origin iframe of game.html
  -> classified as preload
  -> child targets outgoing messages at the child origin
  -> cross-origin parent does not receive readiness
  -> game can remain frozen
```

## Domains in use

```txt
browser route and query classification
window hierarchy and iframe embedding
shell identity and parent-origin admission
cross-window command/result transport
Core Startup readiness and continuation
preload suspension and restoration leases
menu progress, Play, crossfade, focus and history
engine tick/step and scheduler ownership
renderer animation-loop ownership
first resumed simulation and frame evidence
WebGPU/WebGL2 menu and game presentation
procedural world and surface queries
player movement, camera and stamina
Inventory, Agriculture, Foraging and contextual interaction
save capture, checksum, migration, restore and rollback
validation, static build, Pages and central tracking
```

## Implemented kits and services

### Engine-installed core and adventure kits: 14

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, waiting, working, ready, failure, retry/fallback descriptor, continuation selection, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, agriculture settlement, wild forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

```txt
debug-overlay-host-kit: draw, toggle, show, hide
webgl2-fallback-renderer-kit: fallback capability policy, CPU volume source, feature-disable policy
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
cloud-density-field-domain-kit: density recipe, texture budget
cloud-horizon-band-domain-kit: horizon placement descriptors
cloud-lighting-domain-kit: color, shadow, silver lining
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
ocean-optics-domain-kit: color, opacity, transmission, absorption, reflection
ocean-wave-domain-kit: deterministic wave components and sea level
prop-archetype-domain-kit: prop geometry and material archetypes
render-archetype-domain-kit: renderer-neutral object archetypes
render-quality-domain-kit: static tier selection and quality budgets
render-snapshot-domain-kit: renderer-neutral world snapshot
rock-archetype-domain-kit: rock placement and presentation archetypes
shoreline-field-domain-kit: shoreline classification and distance field
shoreline-foam-domain-kit: foam-band descriptors
stylized-material-descriptor-domain-kit: color, roughness, rim, outline
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

### Additional composition kit: 1

`cozy-ocean-composition-kit` offers logical render-layer graphs, pass-order validation, transparent-depth validation, terrain handoff validation and per-layer depth/blend contracts.

### Browser/product adapters: 5

```txt
browser-startup-presentation-adapter
  -> descriptor DOM projection, failure projection, timeout helper, render-update bridge
cozy-startup-host
  -> preparation order, product copy, engine reuse, continuation mapping, pre-playable global error capture, host disposal
cozy-menu-scene-adapter
  -> Three.js provider import, backend admission, procedural atlases/cards, TSL materials, compute wind, fallback wind, water, fog, lighting, bloom, tone mapping, shadows, resize, animation loop and public readback
cozy-menu-game-shell-adapter
  -> iframe preload, progress, Play gate, entry request, crossfade, history, focus, fallback reveal and error display
cozy-game-preload-bridge-adapter
  -> startup polling, context classification, parent messaging, simulation freeze/resume, presentation sleep/resume, player preparation and entry acknowledgement
```

## Main finding

`embeddedPreload` is derived from `preload=1 OR window.parent !== window`. The bridge then freezes every playable game classified by that expression. The transport contract is not admitted before suspension:

```txt
ShellGeneration: absent
EmbedContextId: absent
RouteIntent: absent
ParentOrigin: absent
ParentWindowIdentity: implicit only
PreloadToken: absent
ContextAdmissionResult: absent
DirectPlayResult: absent
UnsupportedEmbedResult: absent
```

The query, window hierarchy and parent transport can disagree. The game has no typed policy for those disagreement states.

## Required authority

```txt
cozy-island-embed-context-route-admission-authority-domain
```

```txt
EmbedContextAdmissionCommand
  -> bind route URL, query intent, window hierarchy and document generation
  -> classify direct play, admitted shell preload or unsupported embedding
  -> require a shell-issued nonce and exact parent origin for preload mode
  -> reject top-level preload queries without a shell transport
  -> reject implicit iframe preload without an admitted shell manifest
  -> publish EmbedContextAdmissionResult

admitted shell preload
  -> establish revisioned message channel
  -> bind startup and suspension work to the admitted shell generation
  -> allow Core Startup readiness to acquire a suspension lease

direct play
  -> never freeze for shell ownership
  -> expose normal HUD, input, simulation and renderer lifecycle

unsupported embed
  -> remain playable under an explicit standalone policy or show a recoverable result
  -> never enter an unobservable frozen state
  -> publish FirstContextAdmittedGameFrameAck
```

## Planned authority surfaces: 22

```txt
embed-context-manifest-kit
route-intent-parser-kit
window-hierarchy-classifier-kit
shell-origin-policy-kit
shell-nonce-kit
parent-window-identity-kit
embed-context-admission-kit
direct-play-admission-kit
shell-preload-admission-kit
unsupported-embed-policy-kit
message-channel-handshake-kit
message-schema-kit
message-sequence-kit
preload-token-kit
context-bound-suspension-kit
context-bound-entry-kit
context-failure-projection-kit
direct-route-recovery-kit
first-context-frame-ack-kit
embed-context-diagnostics-kit
embed-context-browser-fixture-kit
source-build-pages-context-parity-kit
```

## Validation boundary

Documentation only. The source smoke verifies string markers but does not launch top-level preload, same-origin arbitrary embed, cross-origin embed, missing-parent, wrong-origin or direct-play fixtures. No runtime, test, build or deployment behavior changed.