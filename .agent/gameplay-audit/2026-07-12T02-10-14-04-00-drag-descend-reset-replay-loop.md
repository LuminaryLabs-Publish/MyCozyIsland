# Gameplay Audit: Drag, Descend, Reset, Replay Loop

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

The intended camera loop is aerial descent, first-person exploration, and exact reset. The current implementation breaks the last step because rail drag edits the authored descent path itself and reset does not restore it.

## Plan ledger

**Goal:** preserve player-facing camera freedom without allowing one playthrough's input to alter the next playthrough's authored descent.

- [x] Trace wheel progression.
- [x] Trace rail drag and first-person look state.
- [x] Trace movement bounds and terrain seating.
- [x] Trace scenario reset.
- [x] Identify replay divergence.
- [ ] Implement deterministic replay proof later.

## Intended loop

```txt
start on authored aerial rail
  -> wheel toward island
  -> optionally orbit the view
  -> cross first-person threshold
  -> explore clearing with WASD
  -> reset
  -> replay the exact authored aerial descent
```

## Actual loop

```txt
start on authored aerial rail
  -> drag while progress < 0.985
  -> mutate every rail position x value
  -> descend and explore
  -> reset progress, yaw, pitch, keys and player
  -> retain mutated rail positions
  -> replay a different aerial descent
```

## Gameplay consequences

```txt
restarts are not deterministic
camera composition can drift between attempts
large-z rail points drift more than near points
repeated drags accumulate path displacement
reset state can appear valid in diagnostics while framing differs
future first-person yaw and pitch are coupled to rail drag state
```

## Required gameplay result

```txt
CameraReplayResult {
  baselineId
  baselineFingerprint
  resetGeneration
  initialDescriptorFingerprint
  replayDescriptorFingerprint
  exactMatch
  maximumPositionError
  maximumLookError
  fovError
}
```

## Acceptance gate

```txt
one baseline produces the same descent on every replay
rail orbit is derived from session state, not authored-point mutation
reset removes all prior camera input effects
first-person movement does not alter future rail playback
100 drag/descend/reset cycles produce zero accumulated drift
```