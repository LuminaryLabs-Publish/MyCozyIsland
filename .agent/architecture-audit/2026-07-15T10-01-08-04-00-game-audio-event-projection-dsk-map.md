# Architecture audit: game-audio event projection DSK map

**Timestamp:** `2026-07-15T10-01-08-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Plan ledger

**Goal:** add one semantic audio projection boundary beside existing simulation and renderer-neutral snapshot ownership.

- [x] Preserve existing Core, adventure, world, render and browser domains.
- [x] Keep audio out of raw input handlers and renderer objects.
- [x] Consume accepted interaction and state-transition results.
- [x] Separate semantic cue descriptors from WebAudio implementation.
- [x] Define lifecycle, preference, deduplication and proof boundaries.
- [ ] Implement the domain and adapters.

## Current DSK map

```txt
n:core-startup
n:core-object
n:core-transaction-ledger
n:cozy-world
n:cozy-input
n:cozy-inventory
n:production:agriculture
n:cozy-foraging
n:cozy-player
n:cozy-scenario
n:cozy-interaction
n:cozy-camera
n:cozy-save
n:cozy-render-snapshot
        ↓
Three.js WebGPU/WebGL2 visual adapters
DOM HUD and diagnostics
preload/menu shell adapters
```

No current path projects accepted semantic results into audio.

## Planned parent domain

```txt
cozy-island-game-audio-event-projection-authority-domain
```

## Planned service graph

```txt
accepted domain results
  -> semantic-audio-event-kit
  -> cozy-cue-registry-kit
  -> cue-deduplication-kit
  -> audio-policy-descriptor-kit
  -> AudioProjectionAdmissionCommand
  -> AudioProjectionResult
  -> WebAudio projection adapter
  -> FirstAudibleCueAck
  -> FirstAudioVisualConvergenceAck
```

## Ownership

### Domain-owned

```txt
semantic event identity
cue descriptor identity
source category
priority and overlap policy
snapshot/result deduplication
expected simulation and frame revisions
mute and category preference descriptors
lifecycle intent
projection result and receipts
```

### Browser-adapter-owned

```txt
AudioContext construction and unlock
node and buffer construction
listener and panner updates
pooling and voice retirement
context suspend/resume/close
browser capability failures
```

### Not audio-owned

```txt
movement truth
Agriculture or Foraging settlement
inventory balances
camera truth
renderer objects
save transport
menu/game route authority
```

## Domain coordination

| Producer | Audio-consumable result |
|---|---|
| `n:cozy-input` | accepted UI command identity only, never raw key events as success cues |
| `n:cozy-player` | movement revision, traveled distance, sprint state and surface kind |
| `n:cozy-interaction` | accepted or rejected contextual action result |
| `n:production:agriculture` | till, plant, water, growth and harvest results/events |
| `n:cozy-foraging` | collection and respawn results |
| `n:cozy-camera` | accepted listener pose descriptor |
| `n:cozy-scenario` | ambience phase descriptor |
| preload/menu shell | unlock, sleep, resume and retirement lifecycle results |

## Required invariants

```txt
no cue from an unaccepted command
no duplicate cue for the same semantic result
no persistent source after route retirement
no hidden-preload ambience before admitted entry
no success cue for rejected Agriculture or Foraging work
no listener transform ahead of accepted camera state
no claimed audible success without FirstAudibleCueAck
```

## Census

```txt
implemented surfaces retained: 70
planned audio-authority surfaces: 22
runtime implementation changed: no
```