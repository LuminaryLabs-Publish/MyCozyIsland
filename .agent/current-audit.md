# Current audit: MyCozyIsland embed-context route admission

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit repository head:** `4a382d17d13425a7a5f01ef7933248ba9e0058b1`

## Summary

MyCozyIsland was selected by the oldest synchronized documentation timestamp after the full Publish inventory, central ledger coverage, root `.agent` state and current heads were compared. The active finding is that the game decides background-preload ownership from `preload=1 OR window.parent !== window` before proving shell identity or transport.

A top-level `game.html?preload=1` document has no parent shell but can still freeze once Core Startup becomes playable. Any iframe is also treated as a preload even without a shell request. The child posts to `location.origin`, which assumes a same-origin parent, while inbound commands validate source but not origin, schema, nonce or generation.

## Plan ledger

**Goal:** make route and embed-context admission the prerequisite for shell-controlled sleep, direct play or recoverable unsupported embedding.

- [x] Compare all 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible heads match their documented heads.
- [x] Select only MyCozyIsland as the oldest synchronized repository.
- [x] Inspect shell, bridge, route, startup and source-test files.
- [x] Identify the complete interaction loop and all domains.
- [x] Preserve 65 kits and five adapters with their service inventory.
- [x] Define 22 context-admission surfaces.
- [x] Change documentation only.
- [ ] Implement and run the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledgers: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
prior central timestamp: 2026-07-14T15-01-54-04-00
```

## Source-backed finding

`src/game-preload-bridge.js` derives:

```txt
embeddedPreload = query preload=1 OR framed window
```

It sets background-preload DOM state, polls startup, and freezes the engine and renderer whenever `descriptor.playable` is true. Entry depends on a parent message. No context result proves that the parent exists, shares an admitted origin, has the expected shell generation or owns the matching preload request.

### Top-level preload query

```txt
game.html?preload=1
  -> embeddedPreload true
  -> window.parent === window
  -> outgoing post() returns
  -> playable game freezes
  -> no shell receives ready
  -> no normal mechanism sends enter
```

### Implicit iframe preload

```txt
iframe src=game.html
  -> window.parent !== window
  -> embeddedPreload true without query intent
  -> playable game freezes
  -> arbitrary parent is treated as shell-shaped
```

### Cross-origin parent

```txt
child targetOrigin = child location.origin
cross-origin parent origin differs
  -> readiness posts are not delivered to that parent
  -> child still classifies itself as preload
  -> inbound source-only admission is incomplete
```

## Interaction loop

```txt
root redirect
  -> postcard menu
  -> hidden iframe game startup
  -> playable readiness
  -> context-blind sleep
  -> parent entry message
  -> restore and reveal
  -> walk, farm, forage, grow, harvest and save
```

## Domains and kit census

```txt
route intent and document generation
window hierarchy and iframe embedding
shell identity, parent origin and nonce
message schema, sequence and replay
Core Startup and continuation
engine/scheduler suspension
renderer-loop suspension
menu progress, Play, focus, history and reveal
first context-admitted frame
world/player/camera/input/interaction
Inventory/Agriculture/Foraging
save capture/validation/migration/restore/rollback
WebGPU/WebGL2 presentation and quality
validation/build/Pages/central tracking

engine-installed kits: 14
cataloged kits: 50
additional composition kit: 1
source-backed kits: 65
browser/product adapters: 5
total documented surfaces: 70
planned authority surfaces: 22
```

The complete per-kit service inventory is in the timestamped tracker and `.agent/kit-registry.json`.

## Required authority

```txt
cozy-island-embed-context-route-admission-authority-domain
```

```txt
EmbedContextAdmissionCommand
  -> bind URL, query, window hierarchy and document generation
  -> resolve parent window, origin, shell manifest and nonce
  -> classify DirectPlay, ShellPreload or UnsupportedEmbed
  -> reject impossible or stale combinations
  -> publish EmbedContextAdmissionResult

ShellPreloadAccepted
  -> establish the revisioned channel
  -> bind Core Startup and suspension to the shell generation
  -> permit sleep and correlated entry

DirectPlayAccepted
  -> keep simulation, input, HUD and rendering active

UnsupportedEmbedResolved
  -> apply an explicit standalone or visible failure policy
  -> never silently freeze

all accepted contexts
  -> publish FirstContextAdmittedGameFrameAck
```

## Existing proof boundary

The shell smoke parses source and checks regex markers. It does not launch a browser or execute top-level preload, arbitrary iframe, cross-origin iframe, wrong-origin, missing-parent, handshake, recovery or first-frame cases.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, tests, dependencies, scripts, workflows and deployment behavior were not changed.