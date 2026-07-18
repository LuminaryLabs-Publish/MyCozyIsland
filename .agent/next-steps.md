# Next steps: gameplay adaptive-quality recovery parity

## Checklist

- [ ] Add one product-level adaptive-quality authority without moving renderer mutation into simulation domains.
- [ ] Define immutable effect plans for levels 0, 1 and 2.
- [ ] Replace duplicated degrade/recover callback bodies with one `applyQualityLevel(level)` path.
- [ ] Restore renderer pixel ratio during recovery.
- [ ] Reapply the accepted effect plan after resize, lifecycle resume and renderer replacement.
- [ ] Allocate transition, quality-generation and renderer-generation identities.
- [ ] Publish `AdaptiveQualitySampleResult` and `QualityTransitionAdmissionResult`.
- [ ] Publish a complete `QualityEffectPlanResult` covering cloud steps, fog steps, fog resolution and renderer DPR.
- [ ] Read back applied renderer DPR and drawing-buffer dimensions.
- [ ] Publish `QualityTransitionSettlementResult` with mismatch diagnostics.
- [ ] Reject stale transitions from old renderer or lifecycle generations.
- [ ] Make repeated application of the accepted level idempotent.
- [ ] Extend diagnostics to show requested level, applied level, DPR and drawing-buffer size.
- [ ] Publish `AdaptiveQualityFrameDigest` and `FirstAdaptiveQualityBoundFrameAck`.
- [ ] Add deterministic unit coverage for 0→1→2→1→0 transitions.
- [ ] Add browser coverage for forced degrade, recover and resize at every level.
- [ ] Validate WebGPU and WebGL2 fallback behavior.
- [ ] Validate source, static artifact and Pages-origin effect parity.
- [ ] Retain device-input, lifecycle, save, menu-ready, menu-quality and pointer-gesture work as separate unresolved authorities.

## Implementation order

1. One level-to-effect resolver.
2. Shared transition application path.
3. Pixel-ratio recovery and resize reconciliation.
4. Transition identity, stale rejection and readback.
5. Diagnostics and frame digest.
6. Unit, browser, artifact and Pages fixtures.