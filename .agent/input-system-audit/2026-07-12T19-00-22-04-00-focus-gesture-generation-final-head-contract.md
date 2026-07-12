# Input-system audit: focus, gesture and generation final-head contract

**Timestamp:** `2026-07-12T19-00-22-04-00`

## Summary

The input system needs one browser-facing lifecycle that owns surface focus, pointer gestures, command identities and input generations before normalized commands enter `cozy-input-domain-kit`.

## Plan ledger

**Goal:** define an implementation-ready contract that closes predecessor input on blur, visibility loss, reset, restore and surface replacement.

- [x] Define surface and focus identity.
- [x] Define primary pointer/button and capture policy.
- [x] Define command ID and duplicate admission.
- [x] Define generation-fenced clear behavior.
- [x] Define consumer and visible-frame receipts.
- [ ] Implement the contract.
- [ ] Execute browser and Pages fixtures.

## Contract

```txt
InputSession
  id
  surfaceId
  surfaceRevision
  focusGeneration
  inputGeneration
  state: active | suspended | retired

PointerGesture
  gestureId
  pointerId
  primary
  button
  captureState
  surfaceRevision
  focusGeneration
  inputGeneration

InputCommandEnvelope
  commandId
  sequence
  sampleId
  type
  payload
  inputSessionId
  surfaceRevision
  focusGeneration
  inputGeneration
  gestureId?
```

## Lifecycle rules

```txt
focus gained
  -> allocate successor focus generation

blur / visibility hidden / surface replacement / reset / restore
  -> retire current input generation
  -> terminate active gesture
  -> release held state
  -> reject all predecessor-generation commands
  -> allocate successor generation only after re-admission

pointer down
  -> require current surface, focus, primary pointer and allowed button
  -> create one gesture and capture receipt

pointer move / up / cancel
  -> require matching gesture, pointer, surface, focus and generation

command admission
  -> reject duplicate command IDs
  -> reject stale generations
  -> publish typed result and bounded journal row
```

## Required fixtures

```txt
keyboard without canvas focus -> rejected
keyboard from editable control -> rejected
secondary-button drag -> rejected
second pointer during active gesture -> isolated
wrong pointer move/up -> rejected
lost pointer capture -> gesture cancelled and generation safe
blur followed by queued keydown -> predecessor command rejected
duplicate one-shot command -> stable duplicate result
WebGPU/WebGL2 first visible frame -> cites accepted command generation
Pages route -> same behavior
```

## Non-claims

No runtime lifecycle or fixture is implemented by this audit.