# Current Audit: MyCozyIsland Browser Input Ownership and Gesture Admission

Last updated: `2026-07-12T17-01-09-04-00`

## Summary

The active route is a NexusEngine island adventure with deterministic world generation, official Agriculture, Inventory, wild Foraging, first-person player movement, contextual interaction, portable saves and WebGPU/WebGL2 presentation.

The current gap is the boundary between browser events and `cozy-input-domain-kit`. The browser host does not establish one authoritative input surface, focus generation or pointer gesture before enqueueing commands. The input DSK normalizes events, but its generation is permanently `1`, duplicate IDs are not rejected, clear commands do not fence later commands and no typed admission result links a browser event to the committed player/camera frame.

## Plan ledger

**Goal:** require current surface, focus, gesture and command evidence before browser input can mutate player, interaction, camera or the visible frame.

- [x] Compare the complete Publish inventory and central ledgers.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` by the oldest eligible timestamp.
- [x] Inspect `index.html`, `src/main-adventure.js`, `src/adventure/composition-runtime.js` and `src/adventure/runtime-domains.js`.
- [x] Trace keyboard, pointer, wheel, blur and visibility events into input frames.
- [x] Trace input frames into player, interaction and camera consumers.
- [x] Identify every active domain.
- [x] Preserve all 13 installed kits, 50 cataloged kits and the render-composition kit.
- [x] Add a timestamped tracker and architecture/system audit family.
- [x] Refresh the root `.agent` route, gaps, next steps, validation and registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable browser input fixtures remain future work.

## Selection evidence

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected: MyCozyIsland
selected timestamp: 2026-07-12T14-59-01-04-00
excluded: TheCavalryOfRome
```

## Complete interaction loop

```txt
startup
  -> create renderer and quality policy
  -> install 13 engine kits
  -> restore save when available
  -> construct world and presentation
  -> attach global keyboard listeners
  -> attach canvas wheel and pointer listeners
  -> start renderer animation loop

keyboard
  -> window keydown/keyup regardless of canvas focus
  -> H toggles debug outside the input DSK
  -> gameplay keys enqueue key commands
  -> selected keys call preventDefault globally

pointer
  -> any pointerdown and button creates drag state
  -> setPointerCapture for that pointer
  -> any pointermove while drag exists enqueues look delta
  -> any pointerup clears drag
  -> pointercancel clears drag
  -> no lostpointercapture recovery

input phase
  -> sort queue by sequence
  -> silently ignore non-generation-1 commands
  -> accept every generation-1 command ID
  -> update held keys and one-shot actions
  -> clear queue
  -> publish one frame

consumers
  -> player applies look, movement, sprint and intro skip
  -> interaction applies seed selection and contextual action
  -> camera derives from committed player state
  -> render snapshot projects player/camera/HUD
  -> Three.js renders the visible frame

focus loss
  -> blur or hidden enqueues clear
  -> clear releases held keys when processed
  -> commands after clear in the same queue can reactivate input
```

## Source-backed strengths

- Browser events are converted into renderer-neutral commands before gameplay consumption.
- Commands have deterministic sequence numbers.
- Pointer deltas and wheel input are clamped per frame.
- One-shot actions reject native key-repeat.
- Blur and hidden-page paths attempt to release held keys.
- Player, interaction and camera remain renderer-agnostic DSK consumers.
- The engine and official Agriculture imports are commit-pinned.

## Source-backed gaps

### Keyboard ownership is global

`keydown` and `keyup` listeners are registered on `window`. Gameplay commands are admitted even when the canvas is not the active surface. The selected key list also calls `preventDefault()` globally, which can interfere with future menus, text fields or accessibility controls.

### Pointer identity is recorded but not enforced

The drag record stores `pointerId`, but `pointermove` checks only whether any drag exists. A second pointer can therefore rotate the camera. `pointerup` clears the drag regardless of which pointer ended.

### Primary-button policy is absent

`pointerdown` does not require `event.isPrimary`, `button === 0` or a supported pointer type. Secondary mouse buttons and additional touches can start or disturb look gestures.

### Capture loss is not a lifecycle result

There is no `lostpointercapture` handler. If capture is revoked outside the expected up/cancel path, drag ownership can remain stale until another event clears it.

### Input generation never changes

Every command is normalized with `generation: 1`. Blur, visibility change, restore, reset and bfcache resume do not allocate a successor generation. Stale commands cannot be distinguished from current commands.

### Duplicate IDs are not rejected

Callers may supply command IDs. The queue accepts repeated IDs, and the input frame can list them multiple times. One-shot commands can therefore be replayed without a typed duplicate result.

### Rejection diagnostics are inert

`rejectedCommands` exists in InputState, but the frame system does not increment it when a command has a wrong generation or invalid shape.

### Clear does not fence later commands

A clear command zeros held keys and frame deltas at its sequence position. Commands with a later sequence in the same queue are still processed and can reactivate input after blur or visibility loss.

### Host-only debug input is outside command proof

`KeyH` mutates the debug overlay directly and does not produce an input command, result or frame receipt.

### Visible-frame provenance is absent

The camera frame contains player-derived pose but no input session, focus generation, gesture ID, command ID set or consumer receipt. No acknowledgement proves which admitted input produced the first visible frame.

### Executable browser proof is absent

The current Node test exercises adventure domains directly. It does not dispatch real KeyboardEvent, PointerEvent, pointer-capture, blur, visibility or multi-pointer sequences.

## Domains in use

```txt
browser document shell, canvas focus and DOM event adapters
browser keyboard, pointer, wheel, blur and visibility lifecycle
input surface ownership and focus generation
pointer gesture, capture and cancellation
NexusEngine runtime, ECS phases and service installation
normalized input queue, held state and frame admission
core object registration
core transaction ledger and repeat detection
seeded island world, terrain and surface queries
Inventory balances, seed selection and settlement
official Agriculture land, soil, cultivation, water, growth, harvest and perennials
wild coconut Foraging and respawn
player movement, terrain grounding, view and stamina
scenario time and objective
nearest-target contextual interaction
camera intro and first-person projection
portable save and browser durability boundary
renderer-neutral static, frame, HUD and debug snapshots
WebGPU/WebGL2 world, atmosphere, water, fog, foam and post-processing
adaptive quality, resize and backend parity
validation, CI and Pages deployment
```

## Engine-installed kits and services

- `core-object-kit`: registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger creation, idempotency, record, apply-once, snapshot and reset.
- `cozy-world-domain-kit`: seeded world, surface queries, plot layout, forage layout, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalization, command queue, frame admission, held actions, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: item definitions, seed selection, single and batch settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: time, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, contextual action, Agriculture settlement, wild-forage action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial intro, first-person view, terrain clearance and descriptor.
- `cozy-save-domain-kit`: capture, checksum validation, migration, restore, rollback, reset and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame, HUD and debug snapshots.

## Cataloged world/render/host kits

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

Additional source-backed kit:

- `cozy-ocean-composition-kit`: render-layer graph, pass-order validation, transparent-depth validation, terrain handoff and per-layer depth/blend contracts.

## Kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers retained in source: 9
```

## Required parent domain

```txt
cozy-island-browser-input-ownership-authority-domain
```

## Candidate kits

```txt
input-session-id-kit
input-surface-id-kit
input-surface-revision-kit
input-focus-generation-kit
input-focus-admission-kit
pointer-gesture-id-kit
pointer-primary-policy-kit
pointer-button-policy-kit
pointer-capture-lifecycle-kit
pointer-sample-kit
keyboard-sample-kit
wheel-sample-kit
input-command-id-kit
input-command-envelope-kit
input-command-deduplication-kit
input-generation-fence-kit
input-clear-result-kit
input-admission-result-kit
input-rejection-reason-kit
input-consumer-receipt-kit
input-observation-journal-kit
input-visible-frame-ack-kit
keyboard-focus-fixture-kit
multi-pointer-isolation-fixture-kit
lost-pointer-capture-fixture-kit
blur-clear-fence-fixture-kit
duplicate-command-fixture-kit
browser-input-smoke-kit
pages-input-smoke-kit
```

## Required transaction

```txt
DOM event
  -> identify current input surface and focus generation
  -> validate source, primary pointer/button and capture ownership
  -> allocate sample, gesture and command IDs
  -> bind command to current input generation
  -> reject duplicate, stale, unfocused or foreign-pointer evidence
  -> publish typed InputAdmissionResult
  -> commit one normalized InputFrame
  -> collect player, interaction and camera consumer receipts
  -> project renderer-neutral frame
  -> acknowledge first visible frame for the accepted command set

blur / hidden / capture loss / bfcache transition
  -> close current input generation
  -> emit one typed clear result
  -> reject all predecessor-generation commands
  -> allocate a successor generation only after valid reacquisition
```

## Validation boundary

```txt
runtime source changed: no
input behavior changed: no
gameplay changed: no
rendering changed: no
package scripts or dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser input smoke: not run
Pages input smoke: not run
```

This audit documents the defect and target ownership boundary. It does not claim input focus, pointer isolation, duplicate rejection, clear fencing or visible-frame provenance is implemented.