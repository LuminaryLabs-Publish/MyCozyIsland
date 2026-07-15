# Next steps: MyCozyIsland game-audio event projection

**Timestamp:** `2026-07-15T10-01-08-04-00`  
**Status:** `game-audio-event-projection-authority-audited`

## Summary

Add one semantic audio domain between accepted gameplay results and a lifecycle-owned WebAudio adapter. Do not trigger success sounds directly from keyboard, pointer or touch handlers.

## Plan ledger

**Goal:** deliver audible gameplay with deterministic cue identity, browser lifecycle safety and audiovisual frame evidence.

- [ ] Define `AudioPolicyDescriptor` and versioned audio generation identity.
- [ ] Define browser capability and user-gesture unlock results.
- [ ] Define stable semantic event IDs for UI, movement, Agriculture, Foraging and transitions.
- [ ] Add a cue registry with category, priority, overlap and spatial policy.
- [ ] Project movement cues from accepted traveled distance and surface kind.
- [ ] Project Agriculture and Foraging cues from accepted results/events.
- [ ] Add ocean, wind and foliage ambience descriptors.
- [ ] Bind listener transforms to accepted camera revisions.
- [ ] Add duplicate suppression for repeated snapshots and replayed results.
- [ ] Add master, interface, player, world and ambience buses.
- [ ] Add mute and category-volume persistence.
- [ ] Add pooled one-shot voices and bounded category budgets.
- [ ] Keep hidden preload silent.
- [ ] Suspend or reduce audio on hidden-document policy.
- [ ] Retire all sources and nodes exactly once on pagehide or route replacement.
- [ ] Publish `AudioProjectionResult`.
- [ ] Publish `FirstAudibleCueAck`.
- [ ] Publish `FirstAudioVisualConvergenceAck`.
- [ ] Add source, built-output and Pages browser fixtures.

## Minimal implementation order

```txt
1. audio capability and policy descriptors
2. unlock command/result
3. semantic event identity
4. cue registry
5. WebAudio context and bus adapter
6. UI and transition cues
7. movement and surface footsteps
8. Agriculture and Foraging cues
9. ocean/wind ambience
10. listener and source transforms
11. deduplication and voice budgets
12. lifecycle suspension and retirement
13. audible and audiovisual acknowledgements
14. source/build/Pages fixture matrix
```

## Target files

```txt
src/adventure/audio-domains.js
src/adventure/composition-runtime.js
src/adventure/runtime-domains.js
src/adventure/resource-domains.js
src/adventure/persistence-render-domains.js
src/main-adventure.js
src/game-preload-bridge.js
src/audio/browser-audio-adapter.js
tests/game-audio-browser.fixture.mjs
tests/adventure-domains-smoke.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
Play-gesture unlock
unsupported or denied capability
hidden preload silence
one admitted game audio generation
movement on each authored surface kind
sprint and stamina transitions
till, plant, water, harvest and forage accepted/rejected results
repeated snapshot cue suppression
listener/camera revision binding
mute and category-volume persistence
visibility suspend/resume
pagehide retirement
WebGPU and WebGL2 visual correlation
source/build/Pages parity
```

## Ownership constraints

Simulation and existing DSKs own gameplay truth. The semantic audio domain owns cue descriptors and admission. The browser adapter owns WebAudio nodes and lifecycle. Renderers do not decide whether a cue is valid.