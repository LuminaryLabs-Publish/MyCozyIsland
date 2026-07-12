# Next Steps: MyCozyIsland

Last updated: `2026-07-12T06-51-27-04-00`

## Summary

Replace direct DOM-to-camera mutation with a normalized, session-scoped input command pipeline. Browser events should become immutable samples, be admitted against focus and camera mode, reduce once at frame start, and publish a result that can be correlated with the visible camera frame.

## Plan ledger

**Goal:** make rail and first-person control equivalent across wheel units, pointer event rates, focus changes, browser suspension, replay, and WebGPU/WebGL2 rendering.

- [ ] Define `InputCommandEnvelope` with session, runtime generation, command ID, sequence, timestamp, source, and frame target.
- [ ] Normalize wheel pixel, line, and page units before changing rail progress.
- [ ] Coalesce pointer samples before applying per-frame yaw, pitch, and rail orbit.
- [ ] Separate keyboard edge commands from held-state snapshots.
- [ ] Define explicit rail, transition, and first-person input policies.
- [ ] Gate samples by focus, visibility, pointer-capture lease, and active runtime generation.
- [ ] Clear keyboard and drag state through one typed `InputClearCommand`.
- [ ] Reduce accepted commands once at frame start into an immutable `InputFrame`.
- [ ] Apply one input revision to camera and player state.
- [ ] Publish typed accepted, rejected, stale, cleared, and no-op results.
- [ ] Add bounded input journaling and deterministic replay.
- [ ] Expose input revision, camera revision, mode, and last result through detached public readback.
- [ ] Acknowledge the first visible frame that consumes each committed input frame.
- [ ] Add wheel-unit, pointer-cadence, blur, visibility, capture-loss, stale-generation, replay, and browser smoke fixtures.
- [ ] Retain earlier startup, lifecycle, world, render, camera-baseline, environment, and adaptive-quality gaps.

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Browser Input Command and Camera Control Authority
4. World Lifecycle Contract and Legacy/Core Mode Parity Authority
5. Render Layer Graph Admission and Physical Resource Binding Authority
5a. Foam Depth Proxy Topology and Lifecycle Authority
6. Core World Reset / Re-prepare Authority
7. Pinned Core World Focus Transaction Authority
8. Live Materialization Readiness Commit Authority
9. Core World Render Commit Authority
10. Camera Rail Baseline Authority
11. Dynamic Environment Frame Authority
12. Adaptive Quality Transaction Authority
```

## Required data contracts

```txt
InputCommandEnvelope {
  sessionId
  runtimeGeneration
  commandId
  sequence
  source
  deviceId
  timestamp
  targetFrameId
  cameraMode
  payload
}

InputFrame {
  frameId
  previousInputRevision
  committedInputRevision
  wheelDeltaNormalized
  pointerDelta
  keyEdges[]
  heldKeys[]
  clearReason
  acceptedCommandIds[]
  rejectedCommandIds[]
}

InputCommandResult {
  commandId
  sequence
  accepted
  status
  reason
  previousRevision
  committedRevision
  cameraMode
}

VisibleInputFrameAck {
  frameId
  inputRevision
  cameraRevision
  worldFocusRevision
  cameraMode
  cameraDescriptorFingerprint
  outputId
}
```

## Minimum fixture matrix

```txt
wheel unit parity
  -> pixel, line, and page samples representing the same gesture produce equivalent progress

pointer cadence parity
  -> one large sample and equivalent segmented samples produce the same yaw, pitch, and rail result

keyboard edge and hold
  -> repeat does not create extra edges and held movement is frame-duration based

focus and visibility
  -> blur and hidden-page transitions clear or reject held and drag state

capture loss
  -> lost pointer capture cannot leave a stale drag active

runtime replacement
  -> prior-generation events cannot mutate the replacement camera

replay
  -> recorded commands reproduce camera descriptors and player positions

visible frame
  -> first rendered frame cites the committed input and camera revisions
```

## Acceptance conditions

```txt
no raw deltaY reaches rail progress without unit normalization
no per-event clamp makes equivalent pointer motion diverge
no browser callback mutates canonical camera state outside frame admission
no stale focus, capture, or runtime-generation event can mutate input
keyboard edge and hold semantics are explicit
input results and revisions are observable but detached
replay reproduces camera and player state
first visible frame is acknowledged with input and camera revisions
```