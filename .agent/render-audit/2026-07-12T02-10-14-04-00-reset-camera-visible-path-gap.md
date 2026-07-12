# Render Audit: Reset Camera Visible Path Gap

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

The renderer applies the latest camera descriptor every animation frame, but that descriptor cannot prove whether it came from the authored rail or a rail permanently altered by earlier drag input. Reset restores scalar camera state without restoring the mutable rail points, so the first rendered reset frame can visibly differ from the initial frame while reporting the same progress.

## Plan ledger

**Goal:** bind each rendered camera frame to a baseline, path revision, reset generation, camera revision, and typed transition result.

- [x] Trace descriptor production and Three.js camera projection.
- [x] Trace reset and the next RAF frame.
- [x] Identify missing render provenance.
- [x] Define the visible-frame gate.
- [ ] Implement frame receipts later.

## Current projection

```txt
scenario.getRenderSnapshot()
  -> cameraSequence.descriptor()
  -> camera.fov assignment
  -> camera.position.set(...)
  -> camera.lookAt(...)
  -> postPipeline.render()
```

## Gap

```txt
initial frame
  progress = 0.14
  position sampled from authored rail

rail drag
  authored rail point x values mutate

scenario reset
  progress returns to 0.14
  yaw and pitch return to defaults
  rail point x values remain mutated

first reset frame
  progress again reports 0.14
  position samples a different path
  no receipt exposes the divergence
```

## Missing render provenance

```txt
baselineId
baselineFingerprint
pathRevision
cameraStateRevision
resetGeneration
lastCommandId
transitionResultId
frameId
visibleOutputId
```

## Required render contract

```txt
CommittedCameraDescriptor
  -> immutable descriptor for one camera revision
  -> baseline and path provenance
  -> reset generation
  -> mode, progress, position, lookAt and FOV

VisibleCameraFrameAck
  -> frame ID
  -> committed camera revision
  -> baseline ID and fingerprint
  -> path revision
  -> reset generation
  -> backend and output identity
```

## Required proof

```txt
initial and post-reset camera descriptors match exactly
initial and post-reset captured camera framing match within declared tolerance
no frame renders a descriptor from a stale reset generation
rail-to-first-person transition appears in one committed frame sequence
WebGPU and WebGL2 publish the same camera-frame receipt schema
```