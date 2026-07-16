# Render audit: mixed-pointer camera frame gap

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** make each rendered yaw/pitch change traceable to one accepted pointer gesture and input-frame revision.

- [x] Trace browser pointer deltas into `cozy-input`.
- [x] Trace accepted look deltas into player yaw and pitch.
- [x] Trace player state into camera and rendered frames.
- [x] Identify missing gesture/frame correlation.
- [ ] Add executable single-pointer, multi-pointer and lost-capture frame fixtures.

## Current frame path

```txt
pointermove
  -> anonymous look delta
  -> input frame lookX/lookY
  -> player yaw/pitch
  -> camera descriptor
  -> renderer applies position/lookAt/FOV
  -> frame presented
```

## Visible gap

The presented frame contains no accepted pointer ID, gesture ID, capture revision or input-command identity. A move from a non-owner pointer can be admitted while another drag exists, and a pointerup from a non-owner can terminate the shared drag before the next frame.

Potential visible effects include:

- abrupt yaw or pitch jumps from mixed coordinate histories;
- camera movement caused by a secondary touch;
- early end of a valid drag;
- continued UI belief that a gesture ended without a typed settlement;
- no receipt connecting the camera frame to the accepted gesture.

No visible defect was reproduced in this documentation run.

## Required frame proof

```txt
FirstPointerLookFrameAck
  gestureId
  gestureRevision
  pointerId
  inputFrameRevision
  playerRevision
  cameraRevision
  presentedFrameRevision
  acceptedDelta
  settlementState
```

The renderer remains a descriptor consumer. It should not decide pointer ownership.