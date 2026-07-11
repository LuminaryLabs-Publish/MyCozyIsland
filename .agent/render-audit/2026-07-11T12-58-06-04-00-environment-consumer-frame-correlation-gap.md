# Render Audit: Environment Consumer Frame Correlation Gap

Timestamp: `2026-07-11T12-58-06-04-00`

## Finding

The render route has no shared environment revision.

```txt
live each frame:
  clock.elapsedSeconds
  camera
  world generic sway
  campfire pulse
  ocean/foam animation

startup-frozen:
  sky gradient
  hemisphere intensity
  sun color/intensity/direction
  exposure
  vegetation wind descriptor
  campfire smoke wind
  cloud weather/lighting/shadow/horizon
  fog density/advection/placement
```

`createCozyIslandScenario().getRenderSnapshot()` spreads the original snapshot and changes only clock and camera. Scene lights, sky and exposure are constructed once. Campfire smoke animation reads a frozen wind descriptor.

## Required render receipt

```txt
RenderEnvironmentReceipt {
  renderFrameId
  environmentFrameId
  environmentRevision
  environmentFingerprint
  consumerReceipts[]
  visible
  failures[]
}
```

## Gate

Do not claim dynamic weather, illumination or wind coherence until every environment consumer reports the same revision and one visible frame acknowledges it.
