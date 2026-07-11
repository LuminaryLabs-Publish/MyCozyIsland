# Interaction Audit: Focus Command Admission Map

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

Focus work is currently an untyped side effect of every admitted animation frame. It has no command identity, session fence, expected revision or duplicate policy.

## Plan ledger

**Goal:** define the exact admission boundary between camera observation and world mutation.

- [x] Identify all input sources that can move the camera.
- [x] Identify frame-derived focus scheduling.
- [x] Identify missing identity and state checks.
- [x] Define command and rejection reasons.
- [x] Keep input behavior unchanged.

## Input to focus map

```txt
wheel
  -> camera rail progression

pointer drag
  -> camera orbit/look state

WASD
  -> first-person position

blur
  -> clears held keys

animation frame
  -> scenario.tick(dt)
  -> camera snapshot
  -> updateWorldFocus(position, mode, dt)
```

Only the frame callback invokes focus mutation. Browser events mutate scenario input state, then a later frame derives the target.

## Current admission

```txt
prepared must be true
camera mode chooses origin or camera position
cell/cadence/movement threshold decides whether to run
```

Missing checks:

```txt
runtime session is running
session epoch matches
frame generation matches
expected world revision matches
command ID is new
focus transaction is not already active
runtime is not stopping/resetting/disposing
position is finite and portable
target cell is allowed by product policy
```

## Required command

```txt
FocusCommand {
  commandId
  sessionId
  sessionEpoch
  frameId
  scenarioSequence
  expectedWorldRevision
  cameraMode
  targetPosition
  deltaSeconds
  source: "camera-frame"
}
```

## Admission results

```txt
admitted
unchanged-threshold
rejected-not-prepared
rejected-session
rejected-epoch
rejected-frame
rejected-revision
rejected-lifecycle
rejected-duplicate
rejected-invalid-target
rejected-focus-busy
```

Rejected commands must not mutate wrapper, Core World or provider state.

## Concurrency policy

The current runtime is synchronous, but lifecycle stop/reset and future worker/provider work can create overlapping ownership. Define one active focus transaction per session and close admission before teardown.

## Observation

Expose clone-safe rows only:

```txt
last admitted command ID
last terminal result fingerprint
accepted world revision
focus busy flag
stale commands rejected
threshold no-op count
failure count by reason
```

Do not expose live engine/provider objects as the proof surface.

## Acceptance

```txt
one frame creates at most one focus command
repeat command IDs do not reapply provider work
old session/epoch/frame commands are rejected
threshold no-op is distinct from committed focus
invalid targets cannot alter focus
stop/dispose closes focus admission before provider release
```
