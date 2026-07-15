# Deploy audit: game-audio browser fixture gate

**Timestamp:** `2026-07-15T10-01-08-04-00`

## Plan ledger

**Goal:** prevent source, built artifact or Pages audio claims without executable browser evidence.

- [x] Define required capability, unlock, cue, lifecycle and convergence fixtures.
- [x] Preserve current static deployment behavior.
- [ ] Implement fixture harnesses.
- [ ] Run source-server fixtures.
- [ ] Run built-output fixtures.
- [ ] Run deployed Pages fixtures.

## Required fixtures

```txt
supported AudioContext unlock from Play gesture
unsupported or denied audio capability
hidden preload remains silent
entry admits exactly one audio generation
accepted till/plant/water/harvest/forage result emits one cue
rejected transaction emits no success cue
repeated frame snapshot does not duplicate a cue
movement footsteps use accepted traveled distance and surface kind
listener pose matches accepted camera revision
mute and category volume persist and apply
visibility suspension stops or suspends persistent ambience
resume does not duplicate loops
pagehide retires all voices and nodes exactly once
FirstAudibleCueAck is observable
FirstAudioVisualConvergenceAck matches the visible frame
source, built output and Pages expose equivalent behavior
```

## Current evidence

```txt
npm test: not run
browser audio fixture: unavailable
hidden-preload silence fixture: unavailable
cue deduplication fixture: unavailable
lifecycle retirement fixture: unavailable
build smoke: not run
Pages smoke: not run
```

## Gate

Do not claim audible gameplay, unlock reliability, cue correctness, spatial correctness, lifecycle safety, audiovisual convergence, artifact parity or production readiness until these fixtures pass on `main`.