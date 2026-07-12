# Interaction audit: browser-command final-head map

**Timestamp:** `2026-07-12T19-00-22-04-00`

## Summary

The host creates input commands from keyboard, pointer and wheel events, but admission does not bind those commands to one current surface, focus generation, pointer gesture or duplicate-safe command identity.

## Plan ledger

**Goal:** require typed evidence for every browser-sourced command and produce zero gameplay mutation for stale, duplicate or mismatched input.

- [x] Map keyboard, pointer, wheel, blur and visibility sources.
- [x] Map current queue, clear and frame behavior.
- [x] Identify stale, duplicate and gesture-mismatch gaps.
- [ ] Implement typed command envelopes and terminal results.
- [ ] Add zero-mutation rejection fixtures.

## Command map

```txt
keydown / keyup
  -> global listener
  -> no canvas-focus or editable-target proof
  -> generation-1 command

pointerdown
  -> stores pointer ID and captures pointer
  -> no primary-pointer/button policy

pointermove
  -> checks active drag only
  -> does not require matching pointer ID

pointerup
  -> clears drag
  -> does not require matching pointer ID

blur / hidden
  -> enqueue clear
  -> later same-generation commands remain admissible
```

## Required results

```txt
InputAdmissionResult
  accepted | rejected
  commandId
  inputGeneration
  surfaceRevision
  focusGeneration
  gestureId?
  reason

rejection reasons
  wrong-surface
  unfocused
  editable-target
  non-primary-pointer
  wrong-button
  gesture-mismatch
  stale-generation
  duplicate-command
  capture-lost
```

## Non-claims

No command envelope, typed admission result or zero-mutation rejection fixture was implemented in this documentation run.