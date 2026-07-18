# Known gaps: gameplay adaptive-quality recovery parity

## Current focus

- [ ] `onRecover` does not restore renderer pixel ratio.
- [ ] Degrade and recover duplicate quality-effect mapping in separate callback bodies.
- [ ] No immutable level-to-effect plan exists.
- [ ] No transition identity or quality generation exists.
- [ ] No renderer generation is bound to a transition.
- [ ] No apply-once transition settlement exists.
- [ ] No stale transition rejection exists.
- [ ] Resize does not explicitly reapply the accepted quality plan.
- [ ] Renderer DPR is not read back after transition.
- [ ] Drawing-buffer dimensions are not recorded in transition results.
- [ ] Fog target resolution has no public applied-state result.
- [ ] Diagnostics expose level and FPS but not requested/applied effect parity.
- [ ] No `QualityEffectReadbackResult` exists.
- [ ] No `AdaptiveQualityFrameDigest` exists.
- [ ] No `FirstAdaptiveQualityBoundFrameAck` exists.
- [ ] No forced degrade/recover browser fixture exists.
- [ ] No resize-at-level fixture exists.
- [ ] No source/artifact/Pages quality-effect parity fixture exists.

## Implemented performance state

- [x] Static quality selection considers backend, memory, viewport, DPR and reduced motion.
- [x] Four static quality tiers define frame targets and effect caps.
- [x] Frame-time moving average and FPS are calculated.
- [x] Degradation uses sustained over-budget evidence.
- [x] Recovery uses sustained under-budget evidence.
- [x] Quality level is bounded to `0..2`.
- [x] Cloud and fog effects change in both directions.
- [x] Renderer DPR reduces during degradation.
- [x] Fog target scale is clamped by the post pipeline.

## Retained unresolved work

Device input from `2026-07-17T18-38-56-04-00`, page lifecycle from `2026-07-17T08-01-59-04-00`, save durability from `2026-07-17T03-06-12-04-00`, menu ready-handoff from `2026-07-17T01-39-36-04-00`, menu adaptive quality from `2026-07-16T21-38-30-04-00` and pointer-look gesture ownership from `2026-07-16T18-41-23-04-00` remain unresolved.

## Non-findings

- No performance incident was reproduced.
- No visual regression was reproduced.
- No runtime quality correction was implemented.
- No browser, artifact or Pages fixture was run.
- No production-readiness claim is made.