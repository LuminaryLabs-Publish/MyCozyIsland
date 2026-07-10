# Performance Audit: DPR Recovery and GPU Timing Gap

Timestamp: 2026-07-10T16-08-56-04-00

## Verified policy constants

```txt
moving average: previous * 0.93 + sample * 0.07
degrade threshold: movingAverage > target * 1.26
degrade hold: 90 frames
recover threshold: movingAverage < target * 0.86
recover hold: 360 frames
levels: 0, 1, 2
sample clamp: 1..100 ms
```

## Verified metric source

```txt
frameMs = min(100, max(0, now - lastAnimationCallbackTimestamp))
```

This is RAF/callback interval. It includes browser scheduling and preceding work, but it is not explicitly CPU submit time or GPU timestamp duration.

## Verified ordering

```txt
performanceBudget.sample(frameMs)
postPipeline.render()
```

The policy decision occurs before the current frame submit.

## Verified recovery defect

`applyPerformanceLevel(0)` restores cloud/fog scales and fog resolution but does not call `renderer.setPixelRatio()` because DPR mutation is guarded by `if (level > 0)`.

A route can therefore reach:

```txt
performanceBudget.level = 0
activeScale = 1
fog resolution = startup scale
renderer DPR = prior degraded DPR
```

## Additional policy gaps

- Invalid and non-numeric samples silently become the target value rather than returning a typed fallback result.
- The moving average and FPS are observable, but hysteresis counters are not.
- Degrade/recover callbacks return no result and cannot report consumer application failure.
- No startup-applied-state snapshot exists.
- No transition sequence, frame identity, or timestamp-source label exists.
- No exact current DPR is exposed through the aggregate host state.

## Fixture sample plan

Use a pure controller with a reduced configurable hold count for unit fixtures, while separately asserting production defaults.

```txt
case 1: stable samples -> level 0, no transition
case 2: sustained high samples -> 0 to 1
case 3: sustained high samples -> 1 to 2
case 4: sustained low samples -> 2 to 1
case 5: sustained low samples -> 1 to 0 with startup DPR restored
case 6: repeated level request -> no_change_same_level
case 7: invalid sample -> typed rejection or explicit fallback
case 8: consumer failure -> partial/failed apply result retained
case 9: reset -> counters, journal, and startup state restored
```

## Recommendation

Treat callback interval as a valid named fallback metric. Add optional GPU timestamp readback later, but do not block deterministic policy and recovery correctness on browser GPU integration.