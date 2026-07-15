# Known gaps: MyCozyIsland host-clock fixed-step simulation

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

The browser host has no explicit host-clock authority. One clipped variable step is executed per RAF callback, and discarded elapsed time is not reported.

## Plan ledger

**Goal:** separate confirmed deterministic domain behavior from unproved real-time pacing, overload handling and clock-aligned presentation.

- [ ] Host-clock manifest and generation identity.
- [ ] Monotonic timestamp admission.
- [ ] Fixed-step accumulator.
- [ ] Bounded catch-up and overload policy.
- [ ] Explicit discarded-time receipts.
- [ ] Domain clock-revision binding.
- [ ] Autosave time-source policy.
- [ ] Interpolation and visible-frame evidence.
- [ ] Browser/build/Pages timing parity.

## Admission gaps

```txt
HostClockFrameCommand: absent
HostClockFrameResult: absent
clock generation: absent
expected simulation revision: absent
monotonic timestamp validation: absent
stale callback rejection: absent
duplicate command rejection: absent
lifecycle interval classification: absent
```

## Simulation gaps

```txt
fixedStepSeconds descriptor: absent
elapsed-time accumulator: absent
maxStepsPerFrame policy: absent
maxAccumulatedSeconds policy: absent
catch-up result: absent
residual-time retention: absent
discarded-time receipt: absent
pause versus overload classification: absent
```

## Consumer gaps

```txt
scenario clock revision binding: absent
player movement/stamina clock binding: absent
Agriculture growth clock binding: absent
Foraging respawn clock binding: absent
autosave wall-time/simulation-time policy: implicit simulation time
```

## Presentation gaps

```txt
interpolation alpha: absent
clock command ID in frame snapshot: absent
simulation revision in frame acknowledgement: absent
FirstClockAlignedFrameAck: absent
clock-loss diagnostics: absent
```

## Validation gaps

```txt
60/30/20 FPS browser baseline: absent
10/5 FPS overload fixture: absent
long-callback-gap fixture: absent
preload suspension clock fixture: absent
visibility/BFCache clock fixture: absent
autosave cadence fixture: absent
WebGPU/WebGL2 clock-frame parity: absent
source/build/Pages parity: absent
```

## Retained gaps

```txt
device-control action coverage
embed-context route admission
preload suspension lease and resumed-frame authority
postcard atlas cell and backend parity
menu startup failure fallback
complete menu resource/listener retirement
pagehide and BFCache policy
adaptive quality transitions
portable save durability
browser input generation authority
bounded public capabilities
```

## Dependency order

```txt
clock manifest
  -> timestamp/lifecycle classification
  -> accumulator and step budget
  -> HostClockFrameResult
  -> domain bindings
  -> autosave policy
  -> interpolation and FirstClockAlignedFrameAck
  -> source/build/Pages parity
```

No fixed-step, wall-time pacing or production-readiness claim is made.