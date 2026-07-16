# Architecture audit: pointer-look gesture ownership DSK map

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** place pointer identity and gesture settlement at the browser-input boundary without moving camera or player truth out of the existing domains.

- [x] Preserve `cozy-input-domain-kit` as normalized input-frame owner.
- [x] Preserve `cozy-player-domain-kit` as yaw, pitch and movement owner.
- [x] Preserve `cozy-camera-domain-kit` as camera-descriptor owner.
- [x] Keep DOM pointer capture inside a browser adapter.
- [x] Add identity, lease and terminal-result semantics before look deltas enter Core input.
- [ ] Implement and validate the proposed authority.

## Current ownership

```txt
browser canvas adapter
  -> pointerdown, pointermove, pointerup, pointercancel
  -> shared mutable drag record
  -> anonymous enqueuePointer(deltaX, deltaY)

cozy-input-domain-kit
  -> command ordering
  -> frame accumulation and clamping

cozy-player-domain-kit
  -> yaw and pitch mutation
  -> movement direction

cozy-camera-domain-kit
  -> first-person and aerial camera descriptors

renderer host
  -> applies descriptor
  -> renders frame
```

## Gap

The browser adapter records an ID but does not enforce it. The input DSK receives no pointer ID, gesture ID, capture revision or terminal state, so it cannot reject mixed-pointer evidence or prove which gesture produced a frame.

## Proposed domain

`cozy-island-pointer-look-gesture-ownership-authority-domain`

```txt
pointer-capability-admission-kit
  -> primary-pointer policy and supported capability descriptor

pointer-gesture-generation-kit
  -> GestureId and GestureRevision

active-pointer-lease-kit
  -> exactly one accepted owner per canvas/route revision

pointer-capture-adapter-kit
  -> set, release and lost-capture observation

pointer-down-admission-kit
  -> owner selection and replacement policy

pointer-move-admission-kit
  -> owner-only movement admission

pointer-up-settlement-kit
pointer-cancel-settlement-kit
lost-pointer-capture-settlement-kit
  -> exact terminal classification

secondary-pointer-rejection-kit
  -> explicit ignored/rejected result

pointer-coordinate-normalization-kit
  -> CSS-pixel delta normalization

look-delta-command-kit
  -> identity-bound delta publication into `cozy-input`

gesture-revision-kit
stale-pointer-event-rejection-kit
route-input-retirement-kit
  -> generation and lifecycle safety

pointer-gesture-result-kit
  -> admission, delta and settlement results

first-pointer-look-frame-ack-kit
  -> accepted gesture/camera/frame correlation

pointer-gesture-browser-fixture-kit
  -> mouse, pen, touch, multi-pointer and capture-loss proof
```

## DSK boundaries

- Browser adapter owns DOM events and pointer-capture calls.
- Gesture authority owns pointer identity, leases and event admission.
- `cozy-input-domain-kit` owns deterministic ordered input commands and frames.
- `cozy-player-domain-kit` owns yaw and pitch truth.
- `cozy-camera-domain-kit` owns camera descriptors.
- Renderer owns projection only.

No new camera, player or simulation owner is proposed.