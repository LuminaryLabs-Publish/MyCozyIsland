# Next steps: device input action coverage and semantic commands

## Checklist

- [ ] Add one product-level device-input authority without moving DOM events into simulation domains.
- [ ] Define required and optional actions for intro, gameplay, menu, and suspended contexts.
- [ ] Allocate `DeviceProfileId`, `InputContextId`, `ActionSourceId`, `SemanticCommandId`, and `InputFrameGeneration`.
- [ ] Add source-neutral semantic commands for move, look, sprint, interact, cycle seed, direct seed selection, and intro skip.
- [ ] Adapt keyboard input to semantic commands instead of interpreting key codes inside gameplay normalization.
- [ ] Add a touch movement surface with explicit begin/update/end settlement.
- [ ] Keep touch look isolated from UI-control touches.
- [ ] Add reachable touch interaction, sprint, seed-cycle, and direct-selection controls.
- [ ] Convert visible hotbar entries to interactive, labeled controls with selected state.
- [ ] Make mobile controls safe-area-aware in portrait and landscape.
- [ ] Define keyboard, pointer, touch, and mixed-source priority rules.
- [ ] Prevent duplicate one-shot interaction and seed commands across sources.
- [ ] Retire held touch actions on pointer cancellation, capture loss, blur, hidden visibility, lifecycle suspension, and control-layout replacement.
- [ ] Publish `InputCapabilityManifestResult` before playable entry.
- [ ] Publish `SemanticActionAdmissionResult`, `TouchControlProjectionResult`, and `InputSourceSettlementResult`.
- [ ] Publish `InputFrameDigest` and `FirstInputActionBoundFrameAck` for the matching visible control generation.
- [ ] Extend domain tests to cover semantic commands independently of physical key codes.
- [ ] Add touch-only browser fixtures that complete the walk, plot, planting, watering, harvest, and forage loop.
- [ ] Add mixed keyboard/touch cancellation and duplicate-command fixtures.
- [ ] Validate source, static artifact, and Pages-origin action coverage.
- [ ] Retain page-lifecycle, save-durability, menu-ready, adaptive-quality, and pointer-gesture work as separate unresolved authorities.

## Implementation order

1. Capability manifest, action vocabulary, identities, and command/results.
2. Keyboard semantic adapter and compatibility tests.
3. Touch movement/look/interact/seed control projection.
4. Mixed-source arbitration and held-action retirement.
5. Accessibility and safe-area projection.
6. Input-frame and visible-control acknowledgement.
7. Browser, artifact, and Pages fixtures.