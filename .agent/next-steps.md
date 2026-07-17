# Next steps: menu preload-to-ready presentation handoff

## Checklist

- [ ] Add one product-level handoff authority without moving Three.js rendering into simulation.
- [ ] Allocate `PreloadSessionId`, iframe document revision and presentation generation.
- [ ] Bind `cozy-game-ready` to the exact Core Startup continuation revision.
- [ ] Return a typed `GamePreloadReadyAdmissionResult`.
- [ ] Reject stale, duplicate, retired or wrong-document ready evidence.
- [ ] Model preload and ready DPR/frame policies explicitly.
- [ ] Return a typed `MenuPresentationBudgetTransitionResult`.
- [ ] Record viewport, DPR, backend, quality and recipe revisions in the transition.
- [ ] Publish `MenuRenderCommitResult` from the first accepted ready frame.
- [ ] Publish `FirstReadyMenuFrameAck`.
- [ ] Keep Play disabled until game readiness and the matching ready frame both settle.
- [ ] Return a typed `PlayGateAdmissionResult`.
- [ ] Bind pointer, touch, Enter and Space activation to the same Play result.
- [ ] Bind entry, game resume, crossfade and menu disposal to one `EntryHandoffResult`.
- [ ] Make fallback entry timeout reuse the same apply-once entry result.
- [ ] Preserve reduced-motion policy without bypassing identity or settlement.
- [ ] Add WebGPU and WebGL2 browser fixtures.
- [ ] Add resize, DPR-change, visibility, stale-message and duplicate-message fixtures.
- [ ] Add immediate-activation and renderer-failure fixtures.
- [ ] Validate source, built artifact and Pages-origin parity.
- [ ] Retain broader adaptive-quality work as a separate unresolved authority.
- [ ] Retain pointer-look gesture ownership as a separate unresolved authority.

## Implementation order

1. Session, continuation and presentation identity.
2. Ready-message admission and apply-once result.
3. Preload-to-ready DPR/frame policy transition.
4. First ready render commit and acknowledgement.
5. Play-gate convergence.
6. Entry handoff and retirement settlement.
7. Browser, artifact and Pages fixtures.