# Current audit: MyCozyIsland cross-window preload and entry protocol

**Timestamp:** `2026-07-13T19-40-56-04-00`  
**Status:** `cross-window-preload-entry-protocol-authority-audited`  
**Branch:** `main`

## Summary

MyCozyIsland uses a parent Three.js menu and hidden same-origin game iframe. The child polls Core Startup, reports progress/readiness/failure, freezes simulation, then accepts an entry request and immediately reports entry after restoring simulation and preparing player state.

Both directions use `location.origin` as `targetOrigin` and check the expected `event.source`. Inbound `event.origin`, protocol version, payload schema, message identity, sequence, shell generation, iframe generation, preload attempt and entry attempt are absent. The parent also has an independent 900 ms reveal fallback, and no result proves the first post-resume game frame became visible.

## Plan ledger

**Goal:** define one generation-bound cross-window protocol without moving startup, gameplay or rendering ownership into ad hoc message handlers.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Select MyCozyIsland by the oldest eligible timestamp.
- [x] Inspect `src/menu.js` and `src/game-preload-bridge.js`.
- [x] Map the complete interaction loop and domains.
- [x] Preserve the 65-kit plus five-adapter inventory.
- [x] Define command/result, generation, sequence and fixture requirements.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection basis: oldest eligible central timestamp
prior central timestamp: 2026-07-13T14-39-40-04-00
```

## Complete interaction loop

```txt
index -> menu route
menu -> Three.js provider, renderer, sky, palm, RAF
menu -> hidden game iframe preload
game -> Core Startup and independent game renderer
bridge -> poll startup descriptor every 120 ms
bridge -> progress messages
bridge -> freeze engine tick/step at playable readiness
bridge -> ready message
Play -> parent posts entry request
bridge -> resume engine, prepare intro state, clear input
bridge -> entered message immediately
parent -> reveal, history replacement, focus transfer
parent fallback -> reveal after 900 ms without entered message
parent -> delayed menu renderer disposal
```

## Domains in use

```txt
routing and navigation
menu provider, WebGL renderer, scene and RAF lifecycle
same-origin iframe and document generation
cross-window protocol versioning, source/origin admission and sequencing
Core Startup readiness, failure and continuation
simulation freeze/resume and player-entry preparation
input clearing, visibility, history and focus transfer
first visible game-frame correlation
NexusEngine object, transaction, world and input
Inventory, Agriculture, Foraging and interaction
player, scenario, camera, saves and snapshots
WebGPU/WebGL2 game rendering and adaptive quality
page lifecycle, validation, build and Pages deployment
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
```

Installed services cover Core Startup, object registration, idempotent transactions, deterministic world queries, input, Inventory, Agriculture, Foraging, player movement, scenario progression, contextual interaction, camera, portable saves and renderer-neutral snapshots.

Cataloged services cover terrain, biome, vegetation, atmosphere, clouds, fog, ocean, shoreline, materials, archetypes, quality budgets, WebGPU/WebGL2 passes, deterministic seeds, weather, wind and environmental time.

Adapters cover startup DOM projection, product startup orchestration, Three.js menu presentation, iframe/Play shell handling and game preload freeze/resume.

## Source-backed findings

```txt
outbound targetOrigin restricted: yes
expected source-window check: yes
inbound event.origin check: no
protocol version: no
message IDs: no
monotonic sequence: no
shell/frame/preload/entry generation: no
payload schema/fingerprint: no
stale/duplicate/out-of-order classification: no
entry timeout terminal result: no
post-resume renderer receipt: no
first visible game frame acknowledgement: no
```

The child timer continues polling after readiness until entry or failure. Entry preparation catches errors only to `console.warn`, then still posts entered. The parent timeout reveals without a correlated terminal child result.

## Required authority

```txt
cozy-island-cross-window-preload-entry-protocol-authority-domain
```

## Required transaction

```txt
open protocol under shell/frame/preload generations
  -> admit versioned sequenced progress/ready/failure
  -> reject malformed, foreign, stale, duplicate and out-of-order messages
  -> bind one entry request to current ready revision
  -> resume and prepare once
  -> acknowledge post-resume visible frame
  -> atomically commit reveal/history/focus
  -> return Entered, Degraded, Failed, TimedOut, Cancelled, Stale or Retired
```

## Validation boundary

Documentation only. No runtime, tests, dependencies, scripts, workflow or deployment behavior changed. No executable browser, build or Pages protocol fixture was run.