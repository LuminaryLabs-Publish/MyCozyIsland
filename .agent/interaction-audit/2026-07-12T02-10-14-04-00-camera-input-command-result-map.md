# Interaction Audit: Camera Input Command and Result Map

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

Browser events currently call camera mutators directly. Wheel, drag, key, clear, and reset operations have no command identity, expected revision, typed result, duplicate classification, stale rejection, or bounded journal.

## Plan ledger

**Goal:** route every browser and headless camera interaction through one ordered command/result boundary.

- [x] Map browser input sources.
- [x] Map direct camera mutators.
- [x] Map missing admission and result fields.
- [x] Define pointer-drag lease requirements.
- [ ] Implement the command gateway later.

## Current map

```txt
wheel event
  -> input.wheel(deltaY)
  -> mutate progress

pointerdown
  -> replace shared drag { x, y }
  -> request pointer capture

pointermove
  -> calculate delta from shared drag
  -> input.drag(deltaX, deltaY)
  -> mutate yaw, pitch and possibly rail points

pointerup or pointercancel
  -> clear shared drag

keydown or keyup
  -> input.key(code, down)
  -> mutate pressed set

blur
  -> input.clear()

scenario.reset
  -> cameraSequence.reset()
```

## Missing admission fields

```txt
commandId
sessionId
runtimeGeneration
resetGeneration
expectedCameraRevision
sequence
source
pointerId
input modality
timestamp
payload validation
```

## Missing result classifications

```txt
accepted
clamped
ignored for current mode
duplicate
stale camera revision
stale reset generation
wrong pointer lease
invalid payload
out of clearing bounds
transitioned mode
reset committed
```

## Pointer-specific gap

The browser host stores only `{ x, y }` in the shared drag record. It does not retain the active `pointerId`, so a later pointer event can replace or clear another pointer's drag state. Pointer capture is requested and released with the event pointer ID, but the mutable camera adapter does not validate lease ownership.

## Required flow

```txt
browser event observation
  -> immutable CameraInputCommand
  -> session, generation, sequence and pointer-lease admission
  -> current mode and expected revision validation
  -> pure candidate camera state
  -> bounds and threshold evaluation
  -> atomic camera revision commit
  -> typed CameraTransitionResult
  -> bounded input journal
  -> visible-frame acknowledgement
```

## Parity requirement

```txt
browser wheel == headless progress command
browser pointer drag == headless orbit/look command
browser keys == headless movement-state command
browser blur == headless clear command
scenario reset == explicit reset command
```

## Acceptance gate

```txt
no browser event mutates camera state directly
one active pointer owns one drag lease
one command produces one typed result
stale and duplicate commands are non-mutating
browser and headless commands have equivalent results
```