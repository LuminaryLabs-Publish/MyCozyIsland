# Next Steps: MyCozyIsland

Last updated: `2026-07-11T00-10-28-04-00`

## Plan ledger

**Goal:** make route lifecycle, camera-sequence reset, and later adaptive quality deterministic and observable without changing the visual composition.

- [ ] Add one route runtime-session owner for startup, running, stop, dispose, and restart.
- [ ] Register animation-loop, listener, timeout, and GPU/render resources with that owner.
- [ ] Add startup rollback and idempotent disposal.
- [ ] Preserve the authored camera rail as immutable construction data.
- [ ] Store pointer orbit influence as separate runtime state instead of mutating authored control points.
- [ ] Add typed wheel, drag, key, clear, tick, and reset results.
- [ ] Add camera-sequence state with progress, mode, yaw, pitch, orbit offset, player position, pressed-key count, revision, and baseline fingerprint.
- [ ] Make reset restore exact construction-time state and return before/after fingerprints.
- [ ] Make scenario reset atomic across clock and camera sequence.
- [ ] Add a DOM-free drag/reset/repeat fixture to `npm test`.
- [ ] Add a browser smoke proving pointer interaction, reset, and restart do not drift the reveal path.
- [ ] After lifecycle and sequence fidelity, implement adaptive-quality target transactions and exact level-0 recovery.

## Immediate implementation slice

```txt
MyCozyIsland Camera Rail Baseline Authority
+ Drag/Reset Fidelity Fixture Gate
```

### Candidate kits

```txt
camera-rail-authored-baseline-kit
camera-orbit-offset-state-kit
camera-sequence-input-result-kit
camera-sequence-state-kit
camera-sequence-reset-transaction-kit
camera-sequence-fingerprint-kit
scenario-reset-transaction-kit
camera-rail-reset-fixture-kit
```

### Required fixture assertions

```txt
construction descriptor fingerprint is stable
pre-rail drag changes runtime projection without mutating baseline rows
reset restores progress, yaw, pitch, player, keys, and orbit offset
post-reset descriptor deep-equals construction descriptor
10 drag/reset cycles produce the same post-reset fingerprint
scenario reset restores clock and camera atomically
invalid numeric input returns a typed rejection or normalization result
fixture output is bounded JSON
```

## Deferred

- camera feel and rail-point retuning
- cloud/fog/ocean/grass/terrain visual changes
- renderer replacement
- new route content
- new quality tiers
- public kit promotion before the local contract is proven