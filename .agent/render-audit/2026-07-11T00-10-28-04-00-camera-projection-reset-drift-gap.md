# Render Audit: Camera Projection Reset Drift Gap

Timestamp: `2026-07-11T00-10-28-04-00`

## Render path

```txt
scenario.getRenderSnapshot()
  -> cameraSequence.descriptor()
  -> Three PerspectiveCamera.position
  -> Three PerspectiveCamera.lookAt
  -> postPipeline.render()
```

The renderer is not the source of the defect. It faithfully consumes the camera descriptor produced by the sequence.

## Gap

During rail mode, pointer drag mutates rail control-point X coordinates. Because reset does not restore those coordinates, the projected camera path after reset can differ from the original path even when progress, yaw, and pitch match their initial values.

## Missing proof

- original versus current rail fingerprint
- path revision in host state
- reset-result correlation with rendered frame
- screenshot or descriptor parity after repeated reset
- restart proof under a future session owner

## Required render-facing result

```txt
frameId
sessionId
sequenceRevision
cameraFingerprint
baselineFingerprint
mode
progress
position
lookAt
resetResultId
```

No renderer replacement or visual retuning is needed for this gate.