# Interaction Audit: Browser Event Admission and Result Map

Timestamp: `2026-07-12T06-51-27-04-00`

## Current map

```txt
wheel
  event.deltaY
  -> input.wheel
  -> progress mutation
  -> no result

pointer
  client coordinate delta
  -> input.drag
  -> yaw, pitch, and rail mutation
  -> no result

keyboard
  event.code plus down flag
  -> input.key
  -> pressed Set mutation
  -> no result

blur
  -> input.clear
  -> held keys cleared
  -> no result
```

## Required admission map

```txt
BrowserInputSample
  -> validate session and runtime generation
  -> identify source device and units
  -> validate focus, visibility, capture, readiness, and camera mode
  -> normalize payload
  -> allocate command ID and sequence
  -> enqueue for target frame
  -> return InputAdmissionResult
```

## Required result taxonomy

```txt
accepted
normalized
coalesced
no-op
rejected-invalid-unit
rejected-not-focused
rejected-hidden
rejected-no-capture
rejected-mode-policy
rejected-stale-generation
cleared-focus-loss
cleared-visibility-loss
cleared-capture-loss
```

## Input frame reduction

```txt
ordered admitted commands
  -> wheel aggregate
  -> pointer aggregate
  -> key edges
  -> held-state snapshot
  -> clear precedence
  -> immutable InputFrame
```

Clear commands must have explicit precedence over older held or drag commands in the same frame.

## Consumer acknowledgements

```txt
camera adapter
movement adapter
world-focus adapter
render-frame adapter
public observation adapter
```

Each consumer must acknowledge the same committed input revision or reject the candidate frame.

## Journal boundary

Store bounded detached rows containing:

```txt
command ID and sequence
source and normalized unit
admission status and reason
input revision
camera mode
frame ID
visible acknowledgement ID
```

Do not expose mutable DOM events, renderer objects, or camera owners through the journal.