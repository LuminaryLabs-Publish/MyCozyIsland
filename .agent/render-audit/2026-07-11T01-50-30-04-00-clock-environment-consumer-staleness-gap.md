# Render Audit: Clock and Environment Consumer Staleness Gap

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Identify where the renderer consumes startup-only environment semantics while the environment clock continues to advance.

## Construction-time consumers

```txt
sky:
  gradient texture from startup illumination

renderer and scene:
  tone-mapping exposure from startup illumination
  scene fog from startup aerial perspective
  hemisphere intensity from startup illumination
  sun color/intensity and fixed transform

clouds:
  startup density recipe
  startup lighting profile
  startup horizon layout
  generic TSL time for detail motion

fog:
  startup density recipe
  startup advection direction/speed
  generic TSL time for texture offsets

world:
  startup vegetation-wind descriptor exists in snapshot
  renderer sway uses generic sine motion
  campfire smoke uses startup wind direction/response

ocean and foam:
  static wave/foam descriptors
  TSL or elapsed-time presentation animation
```

## Missing update surfaces

```txt
sky.updateEnvironment(frame): absent
lights.applyEnvironment(frame): absent
cloudRenderer.applyEnvironment(frame): absent
fogRenderer.applyEnvironment(frame): absent
worldRenderer.applyWind(frame): absent
campfireRenderer.applyWind(frame): absent
postPipeline.applyEnvironment(frame): absent
```

Existing cloud and fog APIs only adjust performance step scale. The world renderer accepts elapsed seconds but not a semantic wind frame.

## Why shader time is insufficient

Shader `time` proves presentation movement. It does not prove current wind direction or gust, current illumination direction or exposure, one shared source timestamp, reset fidelity, stale-session rejection, deterministic consumer application, or agreement between sky, lights, clouds, fog, vegetation, and campfire.

## Required render result row

```js
{
  consumerId,
  sessionId,
  environmentFrameId,
  environmentRevision,
  result,
  reason,
  appliedFingerprint
}
```

`result` must be one of `applied`, `unchanged`, `skipped`, or `rejected`.

## Safe renderer boundary

Add narrow `applyEnvironment(frame)` methods to current render consumers. Do not rebuild geometry or volume textures unless the projection declares that a resource-level change is required. Color, direction, intensity, exposure, advection, and wind uniforms should update in place.

## Fixture requirement

A browser fixture should advance a deterministic clock schedule, capture generated environment frames, and assert that every active environment consumer reports the same latest frame ID before a rendered frame is committed.
