# Architecture Audit: Browser Input Command Authority DSK Map

Timestamp: `2026-07-12T06-51-27-04-00`

## Current boundary

```txt
src/main-cloudform.js
  -> owns DOM event listeners
  -> calls cameraSequence.input directly

src/kits/sequences.js
  -> owns mutable rail progress, rail points, yaw, pitch, pressed keys, and player position
  -> exposes wheel, drag, key, clear, tick, descriptor, and reset
```

The host and camera kit jointly act as an implicit input domain, but no domain owns normalization, ordering, admission, results, replay, or frame correlation.

## Parent domain

```txt
cozy-island-browser-input-command-authority-domain
```

## Candidate DSK composition

```txt
identity
  input-session-id-kit
  input-runtime-generation-kit
  input-command-id-kit
  input-command-sequence-kit
  input-device-descriptor-kit

normalization
  wheel-unit-normalization-kit
  pointer-sample-kit
  pointer-coalescing-policy-kit
  keyboard-edge-hold-kit

admission
  input-command-envelope-kit
  input-admission-policy-kit
  camera-mode-input-policy-kit
  focus-visibility-input-gate-kit
  pointer-capture-lease-kit
  stale-input-rejection-kit

frame transaction
  input-frame-queue-kit
  input-frame-reducer-kit
  input-state-revision-kit
  camera-input-adapter-kit
  input-clear-command-kit
  input-command-result-kit
  input-frame-commit-kit

observation and proof
  input-observation-kit
  input-journal-kit
  wheel-delta-mode-fixture-kit
  pointer-cadence-parity-fixture-kit
  blur-capture-loss-fixture-kit
  input-replay-parity-fixture-kit
  input-visible-frame-smoke-kit
```

## Required service graph

```txt
browser sample
  -> input-device-description
  -> unit-normalization
  -> command-envelope
  -> focus/visibility/capture/mode admission
  -> monotonic queue
  -> frame-start reduction
  -> camera adapter
  -> input result and revision
  -> camera descriptor and world-focus revision
  -> render commit
  -> visible-frame acknowledgement
```

## Required invariants

```txt
one physical gesture has one normalized semantic value
command order is stable and monotonic
accepted command is applied at most once
rejected or stale command performs no mutation
pointer segmentation does not change the result
held state belongs to one session and runtime generation
focus, visibility, and capture loss have explicit clear results
camera and world focus cite the committed input revision
visible output cites the camera and input revisions
```

## Integration points

```txt
src/main-cloudform.js
  replace direct input calls with browser-sample adapters and command submission

src/kits/sequences.js
  consume immutable InputFrame or camera command result
  keep rail and player mutation behind one reducer

globalThis.CozyIsland.getState()
  expose detached input observation and last committed revisions

tests
  add unit, cadence, lifecycle, replay, and visible-frame fixtures
```

## Retained upstream and downstream boundaries

```txt
upstream: browser runtime session and listener leases
downstream: camera rail baseline, Core World focus, render frame commit, adaptive quality
```

## Non-goals

This audit does not prescribe a specific control feel, invert-Y setting, sensitivity value, key map, or pointer-lock UX. It defines authority and proof around whichever policy is selected.