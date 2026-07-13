# Project breakdown: MyCozyIsland cross-window preload and entry protocol

**Timestamp:** `2026-07-13T19-40-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `cross-window-preload-entry-protocol-authority-audited`

## Summary

MyCozyIsland uses a same-origin parent menu and hidden game iframe to preload the adventure, project startup progress, freeze simulation, request player entry, reveal the game and transfer focus. Both sides restrict outbound messages to `location.origin` and filter inbound messages by `event.source`, but the protocol has no version, attempt identity, iframe generation, message identity, sequence, expected state revision or terminal result correlation.

The highest-value next boundary is one cross-window preload and entry protocol authority. It must correlate progress, ready, failure, enter, entered, cancellation and retirement under one immutable preload attempt, reject stale or duplicate messages, and bind visible game-frame completion before the parent commits reveal/history/focus.

## Plan ledger

**Goal:** preserve seamless hidden preload while making every cross-window command and result attributable to one current shell, iframe, startup and entry generation.

- [x] Enumerate all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare nine eligible repositories with central-ledger and root `.agent` state.
- [x] Confirm no eligible repository is new, ledger-missing, root-agent-missing or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` by the oldest central timestamp.
- [x] Inspect `src/menu.js`, `src/game-preload-bridge.js`, package test wiring and retained menu/game lifecycle documentation.
- [x] Identify the complete interaction loop, domains, kits and services.
- [x] Preserve 65 source-backed DSK/kit surfaces and five browser/product adapters.
- [x] Add a timestamped protocol audit family.
- [x] Change documentation only.
- [ ] Implement the protocol authority and executable fixture matrix.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest eligible central timestamp
prior central timestamp: 2026-07-13T14-39-40-04-00
excluded repository: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
index route
  -> preserve query/hash
  -> navigate to menu.html

menu boot
  -> resolve remote Three.js
  -> construct WebGL renderer, sky and palm
  -> start recursive menu RAF
  -> schedule hidden game iframe source

hidden game startup
  -> load game.html?preload=1
  -> execute Core Startup and build game renderer
  -> bridge polls startup descriptor every 120 ms
  -> bridge posts progress to parent
  -> playable descriptor freezes engine tick/step
  -> bridge posts ready once

player entry
  -> parent posts cozy-game-enter
  -> bridge resumes simulation
  -> bridge restores authored intro state and clears input
  -> bridge posts cozy-game-entered immediately
  -> parent reveals iframe on entered message
  -> parent also reveals after a 900 ms fallback if no entered message
  -> parent rewrites history, transfers focus and later disposes menu renderer

steady game
  -> game renderer remains active in iframe
  -> parent document remains shell owner
```

## Domains in use

```txt
root routing and browser navigation
menu provider and WebGL presentation
menu RAF, resize, reduced-motion and resource lifecycle
same-origin iframe creation and document generation
cross-window protocol construction, admission and sequencing
Core Startup progress, failure, continuation and playable readiness
simulation freeze and resume
player-entry state preparation and input clearing
history, visibility, focus and shell transition
first visible game-frame correlation
NexusEngine object, transaction, world and input domains
Inventory, Agriculture, Foraging and contextual interaction
player movement, scenario time/objectives and camera
portable save capture, migration, restore and rollback
renderer-neutral snapshots and WebGPU/WebGL2 presentation
adaptive quality, page lifecycle, validation, build and Pages deployment
```

## Implemented kits and offered services

### Engine-installed kits

```txt
core-startup-kit: launch, preparation registration, waiting/working/ready/failure, retry/fallback descriptors, continuation selection, first-frame admission, playable entry, snapshot/load/reset
core-object-kit: object registration, lookup and listing
core-transaction-ledger-kit: idempotency ledger, record, apply-once, snapshot and reset
cozy-world-domain-kit: seeded world, surface query, plot/forage layout, render base, snapshot and reset
cozy-input-domain-kit: normalization, command queue, frame admission, held actions, clear, snapshot and reset
cozy-inventory-domain-kit: items, seed selection, transactions, batch settlement, snapshot and reset
agriculture-domain-kit: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset
cozy-foraging-domain-kit: wild coconut nodes, collection, respawn, snapshot and reset
cozy-player-domain-kit: movement, grounding, view, stamina, snapshot and reset
cozy-scenario-domain-kit: time, objective, snapshot and reset
cozy-interaction-domain-kit: targeting, contextual actions, agriculture settlement, wild forage action, prompt/result, snapshot and reset
cozy-camera-domain-kit: aerial intro, first-person view, terrain clearance and descriptor
cozy-save-domain-kit: capture, checksum validation, migration, restore, rollback, reset and diagnostics
cozy-render-snapshot-domain-kit: static world, agriculture descriptors, frame/HUD/debug descriptors
```

### Cataloged world, rendering and host kits

The retained 50-kit catalog provides terrain height/normal/material queries, deterministic biome and placement fields, vegetation and wind archetypes, shoreline/ocean/fog/cloud/atmosphere descriptors, environmental time and weather, camera/scenario sequencing, renderer-neutral snapshots, quality budgets, WebGPU compute and render passes, WebGL2 fallback policy, materials, post-processing, diagnostics and host presentation services.

### Additional composition and adapters

```txt
cozy-ocean-composition-kit: logical layer graph, pass ordering, transparent depth, terrain handoff and blend/depth validation
browser-startup-presentation-adapter: startup descriptor DOM projection, failure projection, timeout and render-update bridge
cozy-startup-host: ordered product preparation, engine reuse, continuation mapping, pre-playable error capture and disposal
cozy-menu-scene-adapter: Three.js provider, menu WebGL renderer, sky, palm, resize, reduced motion, RAF and delayed disposal
cozy-menu-game-shell-adapter: iframe preload, progress projection, Play gate, history transition, focus transfer, fallback reveal and error display
cozy-game-preload-bridge-adapter: startup polling, parent messaging, simulation freeze/resume, player-entry preparation and entry acknowledgement
```

```txt
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
```

## Source-backed findings

```txt
outbound targetOrigin on both sides: location.origin
parent inbound source check: event.source === frame.contentWindow
child inbound source check: event.source === window.parent
inbound event.origin check: absent on both sides
protocol version: absent
preload attempt ID: absent
iframe/document generation: absent
message ID and sequence: absent
expected startup or entry revision: absent
progress/result schema validation: absent
stale/duplicate terminal classification: absent
entry fallback terminal result: absent
first visible game-frame acknowledgement: absent
```

The parent accepts progress, ready, entered and failed messages solely by message type after the source check. The child accepts `cozy-game-enter` the same way. Message payloads are unversioned mutable objects, and a current result cannot be distinguished from a delayed predecessor attempt after reload, BFCache restoration, restart or future shell reuse.

The child posts `cozy-game-entered` immediately after restoring engine methods and preparing player state. The parent can also reveal the iframe after 900 ms without that acknowledgement. Neither route proves a post-resume renderer submission or matching visible frame.

## Required authority

```txt
cozy-island-cross-window-preload-entry-protocol-authority-domain
```

## Required transaction

```txt
PreloadProtocolOpenCommand
  -> allocate ShellGeneration, FrameGeneration and PreloadAttemptId
  -> bind expected origin, source window and protocol version
  -> establish immutable message schemas and monotonic sequence
  -> admit progress, ready or failure results only for the current attempt
  -> reject malformed, foreign, stale, duplicate or out-of-order messages
  -> publish PreloadProtocolResult

PlayerEntryCommand
  -> bind current preload, startup, frame and menu generations
  -> allocate EntryAttemptId
  -> validate ready revision and expected continuation
  -> resume simulation once and prepare player entry once
  -> submit one post-resume game frame
  -> publish Entered only after FirstVisibleGameFrameAck
  -> atomically commit reveal, history and focus
  -> otherwise return Failed, TimedOut, Cancelled, Stale or Retired
```

## Required protocol messages

```txt
COZY_PRELOAD_HELLO
COZY_PRELOAD_PROGRESS
COZY_PRELOAD_READY
COZY_PRELOAD_FAILED
COZY_ENTRY_REQUEST
COZY_ENTRY_PREPARED
COZY_ENTRY_FRAME_ACK
COZY_ENTRY_COMMITTED
COZY_PROTOCOL_CANCELLED
COZY_PROTOCOL_RETIRED
```

Every envelope requires:

```txt
protocolVersion
messageId
messageType
shellGeneration
frameGeneration
preloadAttemptId
entryAttemptId when applicable
sequence
createdAt monotonic sample
payload
payload fingerprint
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, package scripts, dependencies, tests, workflows and deployment were not changed. Source was inspected, but no browser protocol, reload, BFCache, timeout, build or Pages fixture was executed.