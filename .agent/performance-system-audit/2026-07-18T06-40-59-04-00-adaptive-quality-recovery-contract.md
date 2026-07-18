# Performance-system audit: adaptive-quality recovery contract

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Current budget service

`createPerformanceBudget()` offers:

- target frame-time policy from the selected quality tier;
- exponential moving-average sampling;
- over-budget and under-budget hysteresis counters;
- bounded quality level `0..2`;
- degrade callback after 90 sustained over-budget samples;
- recover callback after 360 sustained under-budget samples;
- diagnostic state containing level, moving average, FPS and target.

## Current host projections

| Effect | Degrade | Recover | Readback |
|---|---:|---:|---:|
| Cloud step scale | yes | yes | partial through renderer helper |
| Fog step scale | yes | yes | partial through renderer helper |
| Fog target resolution | yes | yes | no public applied-state result |
| Renderer pixel ratio | yes | **no** | no transition result |
| Drawing-buffer dimensions | indirect | indirect | no transition result |
| Quality/frame generation | no | no | no |

## Required invariants — proposed

1. Every quality level resolves to one complete immutable effect plan.
2. Degradation and recovery call the same application function.
3. Applied renderer DPR equals the plan after every transition and resize.
4. A transition settles only after all effects are read back.
5. A stale transition cannot mutate a replaced renderer generation.
6. Diagnostics expose requested level, applied level and effect mismatch.
7. The first presented frame after settlement carries the same quality digest.
8. Reapplying the accepted level is idempotent.

## Suggested level table

```txt
level 0
  cloud/fog step scale: 1.00
  fog resolution: quality.fogResolutionScale * 1.00
  renderer DPR: min(device DPR, quality.pixelRatioCap * 1.00)

level 1
  cloud/fog step scale: 0.78
  fog resolution: quality.fogResolutionScale * 0.82
  renderer DPR: min(device DPR, quality.pixelRatioCap * 0.88)

level 2
  cloud/fog step scale: 0.62
  fog resolution: quality.fogResolutionScale * 0.68
  renderer DPR: min(device DPR, quality.pixelRatioCap * 0.76)
```

## Test matrix

- 0 -> 1 degradation;
- 1 -> 2 degradation;
- 2 -> 1 recovery;
- 1 -> 0 recovery;
- resize at levels 0, 1 and 2;
- hidden/resume and BFCache generation replacement;
- renderer backend fallback;
- repeated transition idempotency;
- stale transition rejection;
- source, artifact and Pages-origin frame proof.

No implementation or measurement was performed.