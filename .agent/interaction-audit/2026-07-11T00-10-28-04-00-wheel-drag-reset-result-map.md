# Interaction Audit: Wheel, Drag, and Reset Result Map

Timestamp: `2026-07-11T00-10-28-04-00`

## Current map

```txt
wheel event
  -> preventDefault
  -> input.wheel(deltaY)
  -> progress mutation
  -> no result

pointerdown/move/up
  -> local drag coordinates
  -> input.drag(dx, dy)
  -> yaw/pitch mutation
  -> rail point mutation while progress < 0.985
  -> no result

keydown/keyup
  -> input.key(code, down)
  -> pressed Set mutation
  -> no result

blur
  -> input.clear()
  -> pressed Set clear
  -> no result

scenario.reset
  -> clock.reset
  -> camera.reset
  -> no aggregate result
```

## Required command results

Every interaction should return a stable row with:

```txt
commandId
kind
status
reason
normalizedInput
beforeRevision
afterRevision
beforeFingerprint
afterFingerprint
changedFields
```

## Admission rules

- Normalize wheel values with `deltaMode` at the browser adapter.
- Reject or normalize non-finite drag and wheel values.
- Keep authored rail rows immutable.
- Treat duplicate key transitions as typed no-ops.
- Treat reset of an already-baseline sequence as a typed no-op.
- Bound any interaction journal.

## Proof target

A DOM-free fixture should feed wheel, drag, keys, clear, and reset commands and compare exact results and state fingerprints.