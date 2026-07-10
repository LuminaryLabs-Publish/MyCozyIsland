# Next Steps: MyCozyIsland

Last updated: 2026-07-10T16-08-56-04-00

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transition Authority + Frame-Cost Fixture Gate
```

## Goal

Create one deterministic, reversible adaptive-quality transaction boundary that identifies the frame-cost metric, computes a level transition, applies the complete target quality state, records the result, and proves full recovery without changing the authored island or visual targets.

## Plan ledger

- [ ] Add a pure `frame-cost-sampler` that labels each metric source: `raf_interval_ms`, `cpu_submit_ms`, `gpu_timestamp_ms`, or explicit fallback.
- [ ] Move degrade/recover policy out of renderer-host mutation and into an `adaptive-quality-policy` service.
- [ ] Define immutable absolute quality states for levels `0`, `1`, and `2`.
- [ ] Include cloud step scale, fog step scale, fog resolution scale, DPR cap, and any intentionally unchanged settings in every state.
- [ ] Add a `quality-state-applier` that applies the entire target state on every transition.
- [ ] Restore renderer DPR explicitly when recovering to level `0`.
- [ ] Make repeated application of the same level idempotent and return `no_change_same_level`.
- [ ] Emit a transition result containing previous level, requested level, applied level, reason, metric source, sampled value, thresholds, and applied settings.
- [ ] Correlate the transition with the animation frame and subsequent render submission.
- [ ] Decide whether callback interval remains the policy metric or whether GPU timestamps are read asynchronously; do not call callback interval GPU time.
- [ ] Expose counters, moving average, current absolute settings, last transition, and bounded transition history through additive host readback.
- [ ] Preserve `globalThis.CozyIsland` and add a JSON-safe performance surface rather than exposing more mutable renderer objects.
- [ ] Add a DOM-free fixture proving `0 -> 1 -> 2 -> 1 -> 0` with exact DPR, fog, and cloud restoration.
- [ ] Add fixture cases for no-change sampling, threshold hysteresis, duplicate application, invalid metric values, deterministic reset, and JSON serialization.
- [ ] Wire the fixture into `npm test` only after it is deterministic.

## Candidate files

```txt
src/performance/frame-cost-sampler.js
src/performance/adaptive-quality-policy.js
src/performance/quality-state-descriptor.js
src/performance/quality-state-applier.js
src/performance/quality-transition-result.js
src/performance/performance-transition-journal.js
src/performance/cozy-island-performance-host.js
src/host-proof/frame-correlation-record.js
src/host-proof/render-submit-record.js
scripts/cozy-island-adaptive-quality-fixture.mjs
```

## Required invariants

```txt
one authoritative metric source per sample
sample type is explicit and never mislabeled
level transitions are deterministic for identical sample streams
quality application is absolute rather than incremental
level 0 exactly restores startup DPR and volumetric scales
same-level application is idempotent
transition records are JSON-safe
transition history is bounded and deterministically evicted
legacy CozyIsland surface remains available
fixture requires no DOM, browser GPU, screenshot, or WebGPU capture
```

## Suggested status vocabulary

```txt
sample_accepted
sample_rejected_invalid
no_change_within_band
no_change_same_level
quality_degraded
quality_recovered
quality_applied
quality_apply_failed
metric_fallback_used
render_submitted
render_skipped
```

## Not next

- visual polish or new island content
- cloud shape, fog density, ocean, vegetation, grass, camera, or lighting retuning
- renderer replacement or large extraction
- screenshot automation
- route-token changes