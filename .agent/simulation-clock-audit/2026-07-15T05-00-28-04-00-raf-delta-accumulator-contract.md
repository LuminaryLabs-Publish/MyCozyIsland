# Simulation-clock audit: RAF delta accumulator contract

**Timestamp:** `2026-07-15T05-00-28-04-00`  
**Status:** `host-clock-fixed-step-simulation-authority-audited`

## Summary

MyCozyIsland needs an application-owned accumulator between RAF timestamps and NexusEngine ticks. The accumulator must preserve deterministic step size, bound catch-up work, classify lifecycle gaps and report any discarded elapsed time.

## Plan ledger

**Goal:** define the minimal fixed-step contract without moving gameplay truth out of existing DSKs.

- [x] Define timestamp admission.
- [x] Define accumulator and step extraction.
- [x] Define bounded catch-up.
- [x] Define pause and overload policy.
- [x] Define residual interpolation and diagnostics.
- [ ] Implement and execute fixtures.

## Proposed contract

```txt
fixedStepSeconds: 1 / 60
maxStepsPerFrame: explicit policy value
maxAccumulatedSeconds: explicit policy value

on active RAF callback
  elapsed = currentTimestamp - previousTimestamp
  accumulator += admitted elapsed
  steps = min(floor(accumulator / fixedStep), maxStepsPerFrame)
  repeat steps times:
    engine.tick(fixedStep)
    accumulator -= fixedStep
  interpolationAlpha = accumulator / fixedStep

on budget overflow
  retain or discard excess according to named policy
  publish discardedSeconds and reason

on hidden/preload suspension/BFCache
  publish suspended result
  do not treat the full hidden interval as active catch-up

on resume
  reset timestamp baseline or apply an explicit resume policy
  publish a new clock generation
```

## Ownership constraints

```txt
browser host
  captures timestamps and lifecycle events

host-clock authority
  classifies elapsed time and produces fixed steps

NexusEngine and product DSKs
  retain simulation truth

renderer
  consumes accepted snapshots and interpolation descriptors

autosave adapter
  declares wall-time or simulation-time cadence explicitly
```

## Diagnostics

```txt
clock generation
command ID
wall elapsed
admitted elapsed
step count
fixed-step size
residual seconds
interpolation alpha
discarded seconds
classification
simulation revision
render acknowledgement
```

## Fixture matrix

```txt
stable 60/30/20 FPS
10/5 FPS overload
single 100/250/500/2000 ms gaps
menu preload suspension
visibility hide and resume
BFCache pagehide/pageshow
clock generation rollover
render interpolation readback
autosave cadence policy
```

No implementation or chosen numeric catch-up budget is prescribed by this documentation audit.