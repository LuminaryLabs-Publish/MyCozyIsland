# Render Audit: Input to Camera Visible-Frame Provenance Gap

Timestamp: `2026-07-12T06-51-27-04-00`

## Current frame path

```txt
DOM input callback
  -> mutate rail progress, rail points, yaw, pitch, or held keys

RAF callback
  -> scenario.tick(dt)
  -> cameraSequence.descriptor()
  -> update camera transform and Core World focus
  -> update world and foam
  -> render post pipeline
```

## Gap

The frame has no identity linking visible camera output to the input that produced it.

Missing fields:

```txt
inputFrameId
inputRevision
acceptedCommandIds
cameraRevision
cameraDescriptorFingerprint
worldFocusRevision
renderFrameId
outputId
```

A screenshot or debug readback can show the current camera, but cannot prove:

```txt
which wheel unit was normalized
which pointer samples were coalesced
which key edges and holds were admitted
whether focus or capture was valid
whether a stale command was rejected
which input revision the frame consumed
```

## Required render contract

```txt
InputFrameCommit
  -> CameraProjectionResult
  -> WorldFocusResult
  -> RenderFramePlan
  -> RenderSubmissionResult
  -> VisibleInputFrameAck
```

`VisibleInputFrameAck` must include:

```txt
frameId
inputRevision
cameraRevision
worldFocusRevision
cameraMode
cameraDescriptorFingerprint
backend
outputId
presented
```

## Failure policy

```txt
input rejected
  -> no camera mutation
  -> frame may render previous committed camera revision

camera adaptation fails
  -> no world-focus or visible-frame acknowledgement for the candidate revision

render submission fails
  -> input and camera results remain journaled
  -> no presented acknowledgement is emitted
```

## Proof gate

```txt
same normalized input stream
  -> same camera descriptor sequence
  -> same world-focus revision sequence
  -> same visible-frame acknowledgements
```

This must hold for WebGPU and WebGL2 semantics even when backend rendering details differ.