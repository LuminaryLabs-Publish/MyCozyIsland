# Current audit: MyCozyIsland game-audio event projection

**Timestamp:** `2026-07-15T10-01-08-04-00`  
**Status:** `game-audio-event-projection-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `cefc24184fc86d431a70fcce4a342d26b3b3a3d7`

## Summary

MyCozyIsland was selected after the full Publish comparison found no new, missing, undocumented, root-agent-missing or runtime-ahead eligible repository. Its active gameplay loop has deterministic movement and interaction state, Agriculture and Foraging results, renderer-neutral snapshots, Three.js presentation, HUD, preload and lifecycle adapters, but no owned game-audio projection boundary.

The browser game host renders accepted state and publishes `globalThis.CozyIsland`. It creates no AudioContext or HTMLAudio owner and publishes no semantic cue, audible result or audiovisual convergence acknowledgement.

## Plan ledger

**Goal:** make game audio a result-driven, lifecycle-safe projection of accepted simulation state.

- [x] Compare 11 Publish repositories.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm all eligible repositories remain synchronized.
- [x] Select only MyCozyIsland.
- [x] Identify the complete menu, preload, gameplay, render and lifecycle loop.
- [x] Preserve all kits, adapters and services.
- [x] Define 22 game-audio authority surfaces.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledgers: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
prior central timestamp: 2026-07-15T05-00-28-04-00
```

## Source-backed finding

`src/adventure/runtime-domains.js` exposes accepted input frames, player movement and surface state, contextual target state and `lastAction` results. Agriculture and Foraging settle reusable domain outcomes. `src/main-adventure.js` consumes camera, illumination, gameplay, HUD and save descriptors and renders the complete frame. Neither it nor the active registry defines a game-audio owner.

```txt
AudioContext owner: absent
HTMLAudio owner: absent
semantic cue registry: absent
master/category volume: absent
mute preference: absent
listener/source projection: absent
ambience lifecycle: absent
cue deduplication: absent
voice budget/pool: absent
FirstAudibleCueAck: absent
FirstAudioVisualConvergenceAck: absent
```

## Interaction loop

```txt
accepted user input
  -> cozy input frame
  -> player, scenario, Agriculture, Foraging and interaction settlement
  -> camera, HUD and render snapshots
  -> visual frame and save cadence
  -> no game-audio event or audible receipt
```

## Domains and census

```txt
browser routes, iframe, messaging, focus, input, RAF, resize and lifecycle
Core Startup, Object and Transaction Ledger
world, Inventory, Agriculture, Foraging, player, scenario and interaction
camera, save and render snapshots
WebGPU/WebGL2 world, atmosphere, ocean and post processing
menu, preload, HUD and diagnostics
browser audio capability, unlock, semantic cues, ambience, spatial projection and retirement
validation, build, Pages and central tracking

engine-installed kits: 14
cataloged kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned game-audio surfaces: 22
```

The complete kit-by-kit service inventory is preserved in the timestamped tracker and existing machine registry.

## Required authority

```txt
cozy-island-game-audio-event-projection-authority-domain
```

```txt
AudioProjectionAdmissionCommand
  -> bind document, runtime, simulation, camera and audio-policy revisions
  -> observe capability and accepted user-gesture unlock
  -> consume accepted semantic results rather than raw input
  -> resolve stable UI, movement, Agriculture, Foraging, ambience and transition cues
  -> deduplicate repeated snapshots and replayed results
  -> project listener and source transforms
  -> enforce mute, volume, pooling, priority and voice budgets
  -> suspend, resume or retire on preload, visibility, pagehide and route replacement
  -> publish AudioProjectionResult
  -> publish FirstAudibleCueAck
  -> publish FirstAudioVisualConvergenceAck
```

## Existing proof boundary

Node smoke tests validate deterministic domain outcomes. They do not instantiate browser audio, unlock a context, verify semantic cue ordering, test hidden-preload silence, inspect lifecycle retirement or correlate an audible result with a rendered frame.

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, audio, tests, dependencies, workflows and deployment were not changed.