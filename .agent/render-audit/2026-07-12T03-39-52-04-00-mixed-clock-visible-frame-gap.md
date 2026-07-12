# Render Audit: Mixed Clock Visible Frame Gap

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

The post pipeline can render one frame containing environment consumers driven by different clocks. There is no frame-level evidence that ocean, foam, clouds, fog, vegetation, campfire, sky and lights agree on time or descriptor revision.

## Current consumer map

```txt
consumer                      current time source
world vegetation sway         scenario clock elapsedSeconds
campfire flame/light/smoke     scenario clock elapsedSeconds
shoreline foam                 scenario clock elapsedSeconds
ocean displacement/normals     Three TSL global time
cloud detail drift             Three TSL global time
fog advection                  Three TSL global time
sky texture                    startup snapshot only
scene fog parameters           startup snapshot only
renderer exposure              startup snapshot only
hemisphere and sun             startup snapshot only
```

## Source-backed mismatch

The browser host explicitly passes `renderState.clock.elapsedSeconds` to the world and foam update methods. Ocean, cloud and fog shader nodes import and evaluate Three TSL `time` directly.

The two time sources have different lifecycle semantics:

```txt
scenario clock
  -> starts at 48
  -> advances by admitted dt
  -> supports pause, scale and reset

TSL global time
  -> follows renderer lifetime
  -> is not controlled by scenario pause, scale or reset
```

## Reset-visible defect

```txt
scenario.reset()
  -> world sway phase returns to the 48-second phase
  -> campfire phase returns to the 48-second phase
  -> foam phase returns to the 48-second phase
  -> ocean wave phase keeps advancing
  -> cloud detail phase keeps advancing
  -> fog advection phase keeps advancing
```

A frame after reset can therefore be internally inconsistent even if every individual renderer remains functional.

## Static descriptor gap

The following visible parameters are derived once and not updated with the advancing clock:

```txt
sun direction and intensity
ambient intensity
sky colors and environment map
scene fog tint and distances
vegetation wind direction and strength
campfire smoke wind direction
cloud weather and lighting
fog advection direction and speed
```

## Missing render evidence

```txt
environment frame ID
clock source ID
clock revision
reset generation
descriptor revision
canonical render time
consumer resource generation
consumer receipt
partial-frame classification
visible environment-frame acknowledgement
```

## Required render flow

```txt
EnvironmentFrameSnapshot
  -> update sky and lights
  -> update world and campfire
  -> update foam
  -> set canonical ocean time uniform
  -> set canonical cloud time and descriptor uniforms
  -> set canonical fog time and descriptor uniforms
  -> collect receipts
  -> reject stale or incomplete plan
  -> submit post pipeline
  -> publish visible frame acknowledgement
```

## Minimum render fixtures

```txt
normal frame
  all environment consumers cite one time and revision

pause
  all dynamic phases stop together

time scale
  all dynamic phases use the same scale

reset
  all dynamic phases restart together

backend parity
  WebGPU and WebGL2 receive equivalent frame inputs

partial consumer
  a missing receipt prevents environment-frame commit

visible output
  first reset frame cites the new reset generation
```

## Validation boundary

```txt
render source changed: no
shader source changed: no
render output changed: no
browser render fixture run: no
WebGPU/WebGL2 parity run: no
```