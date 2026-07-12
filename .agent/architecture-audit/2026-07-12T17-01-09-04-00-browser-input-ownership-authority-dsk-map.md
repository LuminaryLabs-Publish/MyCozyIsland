# Architecture Audit: Browser Input Ownership Authority DSK Map

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

The current stack separates browser event collection from renderer-neutral input frames, but the boundary is incomplete. `cozy-input-domain-kit` should remain the normalized game-input DSK; a browser-host authority must precede it and prove surface, focus, gesture and generation ownership.

## Plan ledger

**Goal:** define the DSK/domain composition needed to prevent unfocused, stale, duplicate or mismatched browser events from mutating gameplay.

- [x] Map current browser and DSK ownership.
- [x] Preserve existing gameplay domain boundaries.
- [x] Identify missing identities, policies, commands, results and receipts.
- [x] Define a composed parent authority.
- [x] Define the transaction and proof boundary.
- [ ] Implement and validate the authority.

## Current composition

```txt
browser host
  -> raw KeyboardEvent / PointerEvent / WheelEvent
  -> partial normalization
  -> cozy-input-domain-kit
  -> InputFrame
  -> cozy-player-domain-kit
  -> cozy-interaction-domain-kit
  -> cozy-camera-domain-kit
  -> cozy-render-snapshot-domain-kit
  -> renderer
```

## Current ownership problems

```txt
browser host owns listeners but not a revisioned input surface
input DSK owns a queue but not browser focus or pointer capture
player trusts every published InputFrame
interaction trusts one-shot actions from the same frame
camera trusts committed player view
renderer cannot identify the input generation behind the frame
```

## Required parent domain

```txt
cozy-island-browser-input-ownership-authority-domain
```

This is a product/browser composition domain. It does not belong in Agriculture, Inventory, World, Physics or rendering.

## Required subdomains and kits

### Surface and lifecycle

```txt
input-session-id-kit
input-surface-id-kit
input-surface-revision-kit
input-focus-generation-kit
input-focus-admission-kit
input-generation-fence-kit
```

Services: identify the active game surface, track focus acquisition, close predecessor generations and reject lifecycle-stale evidence.

### Pointer gesture authority

```txt
pointer-gesture-id-kit
pointer-primary-policy-kit
pointer-button-policy-kit
pointer-capture-lifecycle-kit
pointer-sample-kit
```

Services: admit one supported gesture, enforce pointer identity, handle capture acquisition/loss/cancel and return terminal gesture results.

### Keyboard and wheel samples

```txt
keyboard-sample-kit
wheel-sample-kit
```

Services: capture normalized source evidence, editable-target classification, event time and focus generation.

### Command admission

```txt
input-command-id-kit
input-command-envelope-kit
input-command-deduplication-kit
input-clear-result-kit
input-admission-result-kit
input-rejection-reason-kit
```

Services: allocate command identity, bind commands to current revisions, reject stale/duplicate/malformed evidence and make clear a hard generation fence.

### Consumption and proof

```txt
input-consumer-receipt-kit
input-observation-journal-kit
input-visible-frame-ack-kit
```

Services: correlate accepted commands with player, interaction, camera and the first visible frame.

### Fixtures

```txt
keyboard-focus-fixture-kit
multi-pointer-isolation-fixture-kit
lost-pointer-capture-fixture-kit
blur-clear-fence-fixture-kit
duplicate-command-fixture-kit
browser-input-smoke-kit
pages-input-smoke-kit
```

## Required command envelope

```txt
InputCommandEnvelope
  commandId
  sessionId
  surfaceId
  surfaceRevision
  focusGeneration
  inputGeneration
  sourceKind
  sampleId
  gestureId?
  pointerId?
  sequence
  eventTime
  payload
```

## Required results

```txt
InputAdmissionResult
  accepted | rejected | duplicate | stale
  commandId
  inputGeneration
  reason
  committedFrameIndex?

InputClearResult
  closedGeneration
  successorGeneration?
  releasedKeys
  terminatedGestureId?

InputConsumerReceipt
  commandId
  consumerDomain
  predecessorRevision
  successorRevision
  effect

InputVisibleFrameAck
  frameId
  inputGeneration
  acceptedCommandIds
  playerRevision
  interactionRevision
  cameraDescriptorId
```

## Required transaction

```txt
DOM event
  -> current surface lookup
  -> focus and lifecycle admission
  -> pointer gesture admission when applicable
  -> sample normalization
  -> command identity and duplicate check
  -> input-generation admission
  -> typed InputAdmissionResult
  -> one committed InputFrame
  -> player / interaction / camera receipts
  -> renderer-neutral frame
  -> first visible frame acknowledgement
```

## Lifecycle transaction

```txt
blur / hidden / pagehide / capture loss / fatal
  -> close active input generation
  -> clear held state
  -> terminate active pointer gesture
  -> reject queued predecessor commands
  -> publish InputClearResult
  -> allocate successor only after valid focus reacquisition
```

## Ownership constraints

```txt
browser authority owns DOM evidence and focus/capture lifecycle
cozy-input-domain-kit owns normalized frame semantics
player owns movement and view state
interaction owns contextual gameplay action selection
camera owns camera descriptors
renderer owns projection only
save must not persist active focus, held keys or pointer gestures
```

## Validation target

The architecture is valid only when all rejection paths prove zero mutation and accepted paths can identify the first visible frame that reflects the admitted command set.