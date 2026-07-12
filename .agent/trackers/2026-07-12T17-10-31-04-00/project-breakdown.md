# Project Breakdown: MyCozyIsland Browser Input Ownership Central Reconciliation

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

This documentation-only breakdown selects `LuminaryLabs-Publish/MyCozyIsland` because its complete browser-input audit family landed after the prior central ledger write. The run reconciles the final repo-local state while preserving the source-backed finding: browser input is normalized, but it is not bound to one authoritative canvas, focus generation, pointer gesture, command identity, consumer receipt, or visible frame.

## Plan ledger

**Goal:** synchronize the completed repo-local audit with central tracking and preserve one exact architecture boundary from browser event ownership through the first visible gameplay effect.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Detect MyCozyIsland audit files committed after its prior central ledger update.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Re-read the browser event adapters and `cozy-input-domain-kit` admission path.
- [x] Identify the complete interaction loop and all active domains.
- [x] Preserve all 64 source-backed kit surfaces and offered services.
- [x] Add a fresh tracker, turn ledger, architecture, render, gameplay, interaction, input, central-sync, and deploy audit family.
- [x] Refresh the root `.agent` route and machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime input authority and executable browser fixtures remain future work.

## Repository comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

selected: LuminaryLabs-Publish/MyCozyIsland
reason: repo-local browser-input audit family completed after the prior central ledger write
repo-local audit timestamp: 2026-07-12T17-01-09-04-00
repo-local final audit head before reconciliation: e33098b1d2b7a5de4cb015df5662f134561b03e7
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
page startup
  -> create canvas, HUD, loader and debug surfaces
  -> initialize Three.js WebGPU or WebGL2 fallback
  -> install 13 engine kits
  -> restore portable save when available
  -> construct world, gameplay and atmosphere presentation
  -> attach browser keyboard, pointer, wheel, blur and visibility listeners
  -> start the animation loop

keyboard
  -> global window keydown or keyup
  -> KeyH mutates debug presentation outside the input DSK
  -> selected gameplay keys call preventDefault globally
  -> enqueue key command without canvas-focus admission

pointer
  -> any pointerdown creates drag state and requests capture
  -> pointermove consumes any active drag without matching pointer ID
  -> pointerup from any pointer clears the drag
  -> pointercancel clears the drag
  -> lostpointercapture has no recovery result

wheel
  -> canvas wheel always prevents default
  -> enqueue normalized wheel command

input phase
  -> sort commands by sequence
  -> accept commands whose permanent generation equals 1
  -> accept duplicate command IDs
  -> process clear at its sequence position
  -> continue admitting later commands after clear
  -> publish one InputFrame and acceptedCommandIds

consumers
  -> player applies movement, sprint, look and intro skip
  -> interaction applies seed selection and contextual action
  -> camera derives from committed player state
  -> renderer-neutral snapshot derives camera and HUD
  -> Three.js renders the visible frame

focus loss
  -> blur or hidden enqueues clear
  -> no focus or input generation closes
  -> later same-queue commands can reactivate input
```

## Domains in use

```txt
browser document shell, canvas, HUD and diagnostics
browser input surface ownership and focus lifecycle
keyboard event mapping and default-action suppression
pointer gesture, capture, cancellation and multi-pointer lifecycle
wheel normalization
input queue, held state, frame admission and clear
NexusEngine runtime and ECS phase ordering
core object registry
core transaction ledger and idempotency
seeded island world, terrain and surface queries
farm plots and wild-resource layout
Inventory and seed selection
production catalog family
official Agriculture land, soil, cultivation, water, growth, harvest and perennials
tropical Agriculture coordination
wild coconut Foraging and respawn
player movement, grounding, view and stamina
scenario time and objective
nearest-target contextual interaction
camera intro and first-person projection
portable save, checksum, migration, restore and browser durability
renderer-neutral world, HUD and debug snapshots
WebGPU and WebGL2 world, ocean, atmosphere, fog, foam and post-processing
adaptive quality, resize and backend parity
validation, CI, GitHub Pages and audit tracking
```

## Installed kits and offered services

| Kit | Domain path | Offered services |
|---|---|---|
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface queries, plots, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture settlement, forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture descriptors, frame, HUD and debug snapshots |

## Cataloged and additional kit census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional render-composition kit: 1
source-backed kit surfaces: 64
active route kit surfaces: 62
retained inactive catalog entries: 2
ordered Core World providers retained in source: 9
```

The 50 cataloged kits cover debug hosting, WebGL2 fallback, WebGPU atmosphere, ocean, foam, fog, clouds, stylized materials, post-processing, performance budgets, camera/scenario descriptors, terrain and biome fields, vegetation, shoreline, underwater optics, weather, wind, illumination, props, rocks, quality and snapshots. `cozy-ocean-composition-kit` adds render-layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth/blend contracts.

## Source-backed findings

```txt
canvas focus required for keyboard: no
editable-target keyboard exclusion: no
pointer ID stored: yes
pointermove requires matching ID: no
pointerup requires matching ID: no
primary-pointer policy: no
primary-button policy: no
lostpointercapture handler: no
input generation: permanently 1
duplicate command rejection: no
rejected-command counter advancement: no
clear closes generation: no
typed per-command admission result: no
player/interaction/camera consumer receipt: no
first-visible-input-frame acknowledgement: no
browser input fixture harness: no
```

## Required authority

```txt
cozy-island-browser-input-ownership-authority-domain
```

Required service families:

```txt
input session, surface and surface revision
focus generation and focus admission
primary pointer and button policy
pointer gesture identity and capture lifecycle
keyboard, pointer and wheel sample identity
command ID, envelope and deduplication
input-generation fence
clear and admission results
rejection reasons, observations and bounded journal
player, interaction and camera consumer receipts
first-visible-input-frame acknowledgement
browser, backend and Pages fixtures
```

## Required transaction

```txt
DOM event
  -> prove current input surface and focus generation
  -> prove current gesture and pointer capture when pointer-sourced
  -> allocate sample and command identity
  -> validate generation and duplicate status
  -> publish typed InputAdmissionResult
  -> commit normalized InputFrame
  -> collect player, interaction and camera consumer receipts
  -> publish renderer-neutral frame provenance
  -> acknowledge first visible frame

blur, hidden, pagehide or capture loss
  -> close current input generation
  -> release held state
  -> terminate active gesture
  -> reject predecessor commands
  -> publish typed clear result
  -> require valid reacquisition for the successor generation
```

## Validation

```txt
runtime source changed: no
input behavior changed: no
gameplay changed: no
Agriculture, Inventory or save behavior changed: no
render behavior changed: no
package scripts or dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
npm test: not run
browser input smoke: not run
WebGPU/WebGL2 parity smoke: not run
Pages input smoke: not run
```

This reconciliation does not claim browser input ownership, pointer isolation, duplicate suppression, stale-command rejection, consumer provenance or visible-frame proof is implemented.