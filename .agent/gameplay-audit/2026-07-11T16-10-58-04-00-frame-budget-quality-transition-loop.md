# Gameplay Audit: Frame Budget Quality Transition Loop

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

The player does not directly command adaptive quality, but frame cadence, tab state and stalls influence the quality level that shapes the visible exploration experience. The current thresholds count qualifying frames, so the wall-time required to degrade or recover differs by display cadence.

## Plan ledger

**Goal:** document how frame cadence alters the exploration/render loop and define gameplay-neutral quality invariants.

- [x] Trace RAF interval sampling.
- [x] Trace moving-average and counter changes.
- [x] Trace quality effects on cloud, fog and resolution.
- [x] Define cadence and lifecycle fixtures.

## Loop

```txt
player explores island
  -> RAF callback interval is sampled
  -> slow/fast counters advance per callback
  -> quality level changes after a fixed number of samples
  -> volumetric density cost and visible resolution change
  -> camera and scenario continue without a quality revision
```

## Cadence issue

```txt
90 qualifying frames
  30 Hz  ~= 3.0 seconds
  60 Hz  ~= 1.5 seconds
  120 Hz ~= 0.75 seconds

360 qualifying frames
  30 Hz  ~= 12 seconds
  60 Hz  ~= 6 seconds
  120 Hz ~= 3 seconds
```

These are illustrative wall-time equivalents for uninterrupted qualifying samples. The moving average also changes with cadence and workload, but the policy has no explicit elapsed-time invariant.

## Gameplay-neutral invariants

```txt
same wall-time pressure produces the same policy decision
hidden tabs do not create unexplained quality transitions
camera/scenario state is unaffected by transition failure
quality rollback does not rewind gameplay
quality changes are visible only after committed consumer state
recovery restores the admitted baseline completely
```

## Required fixture scenarios

```txt
stationary camera at 30/60/120 Hz
continuous rail movement at 30/60/120 Hz
first-person movement during degrade
resize during degraded state
hidden tab then resume
long frame stall
rapid degrade/recover pressure reversal
```

## Validation status

Documentation only. No simulated cadence or interactive browser fixture was run.