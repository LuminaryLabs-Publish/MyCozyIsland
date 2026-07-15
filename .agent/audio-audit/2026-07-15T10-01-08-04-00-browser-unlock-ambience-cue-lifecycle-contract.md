# Audio audit: browser unlock, ambience and cue lifecycle contract

**Timestamp:** `2026-07-15T10-01-08-04-00`

## Plan ledger

**Goal:** define one browser-audio lifecycle from admitted user gesture through game entry, semantic cues, suspension, resume and exact retirement.

- [x] Confirm no current game-audio owner appears in the active registry or game host.
- [x] Define capability and unlock admission.
- [x] Define semantic cue, ambience, listener, bus and voice ownership.
- [x] Define preload, visibility and page retirement behavior.
- [ ] Implement and run browser fixtures.

## Current state

```txt
AudioContext owner: missing
HTMLAudio owner: missing
game cue registry: missing
master/category volume: missing
mute preference: missing
listener pose projection: missing
spatial source projection: missing
ambience loop lifecycle: missing
cue deduplication: missing
voice budget and pooling: missing
FirstAudibleCueAck: missing
FirstAudioVisualConvergenceAck: missing
```

## Unlock contract

```txt
accepted Play or in-game gesture
  -> BrowserAudioCapabilityResult
  -> AudioUnlockCommand
  -> create or resume one AudioContext generation
  -> publish AudioUnlockResult

unsupported, denied or suspended
  -> publish explicit silent/failure disposition
  -> never report audible success
```

## Cue categories

```txt
interface: Play, selection, save and failure
local player: footsteps, sprint and stamina
world interaction: till, plant, water, harvest and forage
environment: ocean, wind, foliage and distant wildlife
transition: intro completion, entry, sleep, resume and retirement
```

## Spatial policy

```txt
listener pose consumes accepted camera revision
footsteps may remain local/nonspatial
plot and forage cues use accepted target positions
ambience uses bounded non-positional or broad spatial beds
no source transform may lead the accepted simulation frame
```

## Voice policy

```txt
stable CueId and SemanticResultId
category priority
maximum concurrent voices per category
pool or retire one-shot nodes
crossfade ambience generations
suppress duplicate snapshots
stop all persistent nodes on retirement
```

## Lifecycle policy

```txt
hidden preload: no active ambience
accepted game entry: admit audio generation
visibility hidden: suspend or reduce through policy result
visibility restored: resume only after accepted lifecycle command
pagehide: exact stop/disconnect/close retirement
menu renderer retirement: no orphaned game or menu nodes
```

## Validation boundary

No sound was generated and no browser audio API was executed.