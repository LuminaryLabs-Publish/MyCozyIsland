# Render audit: clock-aligned render frame gap

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

The renderer submits one frame after one clipped engine tick. It does not receive a clock result containing step count, residual time, interpolation alpha, discarded time or the accepted simulation revision.

## Plan ledger

**Goal:** make every visible frame identify the host-clock command and accepted simulation revision it projects.

- [x] Inspect RAF timing, engine tick and render submission order.
- [x] Confirm startup first-frame proof does not encode ongoing clock admission.
- [x] Identify missing interpolation and clock-loss diagnostics.
- [x] Define `FirstClockAlignedFrameAck`.
- [ ] Add executable render/clock fixtures.

## Current frame path

```txt
RAF callback
  -> clipped dt
  -> one adventure tick
  -> camera and lighting projection
  -> world/gameplay/foam updates
  -> HUD update
  -> postPipeline.render()
```

The startup host acknowledges the first successful startup frame, but ongoing frames do not carry:

```txt
HostClockFrameCommandId
HostClockFrameResult
executed fixed-step count
simulation revision
residual time
interpolation alpha
discarded-time receipt
clock generation
```

## Visible consequence

At low callback rates, world time and movement slow while the browser continues presenting one frame per callback. The visual surface cannot distinguish:

```txt
intentional pause
background preload suspension
low-FPS slow motion
bounded catch-up
dropped elapsed time
normal real-time pacing
```

## Required contract

```txt
accepted HostClockFrameResult
  -> render snapshot for simulationRevision
  -> optional interpolation from prior accepted state
  -> submit physical render passes
  -> publish FirstClockAlignedFrameAck
```

The acknowledgement must bind clock command, simulation revision, render revision, frame ID, backend and interpolation alpha.

## Required fixtures

```txt
60 FPS steady baseline
30 FPS steady baseline
20 FPS clamp boundary
10 FPS bounded catch-up
5 FPS overload policy
single 500 ms gap
visibility hide/resume
preload suspend/resume
clock revision and frame-ID correlation
WebGPU and WebGL2 parity
source, build and Pages parity
```

No render interpolation, clock-aligned frame convergence or low-FPS pacing claim is made.