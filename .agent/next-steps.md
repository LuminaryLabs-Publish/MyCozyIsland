# Next Steps: MyCozyIsland Browser Input Ownership

Last updated: `2026-07-12T17-01-09-04-00`

## Summary

Add one browser-input authority before `cozy-input-domain-kit`. DOM focus and pointer-capture rules stay in the host adapter; the DSK continues to publish renderer-neutral input frames.

## Plan ledger

**Goal:** make keyboard, pointer, wheel and focus-loss behavior source-owned, stale-safe and testable.

- [ ] Add a stable game-canvas surface ID and revision.
- [ ] Allocate a focus generation when gameplay focus is valid.
- [ ] Close that generation on blur, hidden-page transition, pagehide or fatal state.
- [ ] Admit gameplay keys only while the game surface owns focus.
- [ ] Ignore gameplay keys from editable controls and non-game surfaces.
- [ ] Require primary pointer and primary button for look gestures.
- [ ] Allocate a gesture ID on admitted pointerdown.
- [ ] Require the same pointer ID for move, up, cancel and capture-loss processing.
- [ ] Handle lost pointer capture as a terminal gesture result.
- [ ] Replace permanent input generation `1` with a revisioned generation.
- [ ] Reject stale commands after focus or lifecycle transitions.
- [ ] Reject duplicate command IDs and publish typed results.
- [ ] Increment rejection diagnostics for malformed, stale and duplicate commands.
- [ ] Make clear close the current generation so later stale commands cannot reactivate input.
- [ ] Route the diagnostics key through the same command boundary or classify it as host-only.
- [ ] Add player, interaction and camera consumer receipts.
- [ ] Carry input generation and accepted command IDs into frame snapshots.
- [ ] Add first-visible-input-frame acknowledgement.
- [ ] Add browser fixtures for focus, editable controls, multiple pointers, capture loss, blur fencing and duplicate IDs.
- [ ] Run the fixtures on WebGPU, WebGL2 fallback and deployed Pages.

## Implementation order

```txt
surface and focus generation
-> pointer gesture lifecycle
-> command identity and deduplication
-> clear fencing and typed results
-> consumer receipts and frame acknowledgement
-> browser and Pages fixtures
```

## Completion criteria

An unfocused key, secondary pointer, mismatched pointer move, duplicate command, stale-generation command or post-blur event must produce a typed rejection with zero gameplay or camera mutation.