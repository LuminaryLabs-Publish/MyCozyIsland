# Next steps: pointer-look gesture ownership

## Plan ledger

**Goal:** implement one owner-specific pointer gesture path from browser capture through input, player, camera and frame proof.

- [ ] Add `cozy-pointer-gesture-domain-kit` or an equivalent product authority.
- [ ] Allocate one `GestureId`, `GestureRevision` and `CaptureRevision` on accepted pointerdown.
- [ ] Choose and document the primary-pointer and secondary-pointer policy.
- [ ] Require `event.pointerId === activePointerId` for admitted move, up and cancel events.
- [ ] Do not overwrite owner coordinates for rejected secondary pointers.
- [ ] Release only the accepted owner's pointer capture.
- [ ] Add a `lostpointercapture` listener and exact settlement result.
- [ ] Settle the active gesture on blur, hidden state, route retirement and canvas replacement.
- [ ] Add pointer, gesture, capture and route revisions to look-delta commands.
- [ ] Reject delayed or duplicate events from settled gestures.
- [ ] Preserve deterministic ordering in `cozy-input-domain-kit`.
- [ ] Preserve yaw, pitch and movement ownership in `cozy-player-domain-kit`.
- [ ] Publish `PointerGestureAdmissionResult`.
- [ ] Publish `PointerGestureDeltaResult`.
- [ ] Publish `PointerGestureSettlementResult`.
- [ ] Publish `FirstPointerLookFrameAck`.
- [ ] Add mouse, pen, touch and mixed-pointer fixtures.
- [ ] Add owner/non-owner pointerup and pointercancel fixtures.
- [ ] Add lost-capture, blur, hidden and route-retirement fixtures.
- [ ] Run source, built artifact and deployed Pages browser fixtures.
- [ ] Update `.agent` only after executable evidence exists.

## Implementation order

1. Gesture identity and owner lease.
2. Pointer capture adapter and terminal settlement.
3. Identity-bound look-delta commands.
4. Stale and secondary-pointer rejection.
5. Player/camera/frame correlation.
6. Browser fixture matrix.
7. Artifact and Pages parity.