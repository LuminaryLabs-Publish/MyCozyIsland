# Deploy audit: host-clock browser fixture gate

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

Current Node smokes validate domain behavior with caller-selected deltas. They do not instantiate RAF timing, throttled callback rates, lifecycle gaps, fixed-step catch-up, interpolation or matching rendered-frame evidence.

## Plan ledger

**Goal:** require executable source, built-output and deployed-origin proof before claiming real-time simulation pacing.

- [x] Inspect package scripts and current smoke scope.
- [x] Identify missing browser timing fixtures.
- [x] Define source/build/Pages parity requirements.
- [x] Define required artifacts and receipts.
- [ ] Implement and run the gate.

## Existing coverage

```txt
npm test
  menu-game-shell-smoke.mjs
  startup-domain-smoke.mjs
  adventure-domains-smoke.mjs
```

The adventure smoke calls `adventure.tick(dt)` directly and proves deterministic domain outcomes. It does not prove host timestamp admission.

## Required browser fixtures

```txt
60 FPS baseline
30 FPS baseline
20 FPS clamp boundary
10 FPS catch-up behavior
5 FPS overload behavior
100/250/500/2000 ms callback gaps
visibility hidden/resume
menu preload suspension/resume
BFCache pagehide/pageshow
autosave cadence policy
WebGPU and WebGL2 frame acknowledgement
```

## Required assertions

```txt
monotonic command IDs
matching clock and runtime generations
expected fixed-step count
bounded work per callback
correct residual seconds
explicit discarded-time receipt
no hidden-interval catch-up unless policy permits
matching simulation and render revisions
stable scenario/player/agriculture/foraging pacing
source/build/Pages result parity
```

## Required artifacts

```txt
HostClockFrameResult stream
simulation revision trace
scenario elapsed trace
player distance and stamina trace
Agriculture growth trace
Foraging respawn trace
autosave timestamp trace
FirstClockAlignedFrameAck
captured source/build/Pages diagnostics
```

## Current gate result

```txt
npm test: not run in this documentation audit
browser clock fixture: unavailable
built-output clock fixture: unavailable
Pages clock fixture: unavailable
fixed-step implementation: absent
```

No deploy parity or production-readiness claim is made.