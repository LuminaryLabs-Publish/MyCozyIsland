# Performance System Audit: Degrade/Recover State-Machine Contract

Timestamp: `2026-07-10T22-29-21-04-00`

## Current budget state

```txt
target = quality.targetFrameMs
movingAverage starts at target
level starts at 0
overBudgetFrames starts at 0
underBudgetFrames starts at 0
```

### Degrade

```txt
movingAverage > target * 1.26
90 qualifying samples
level increments up to 2
onDegrade callback
```

### Recover

```txt
movingAverage < target * 0.86
360 qualifying samples
level decrements down to 0
onRecover callback
```

## Strengths

- bounded three-level state
- smoothed frame timing
- separate degrade/recover thresholds
- dwell counts reduce oscillation
- Node-safe pure decision logic is possible to test

## Contract gaps

- callback return values are ignored
- callback failures are not captured
- budget level changes before application success is known
- no pending/applying/applied/failed state
- no transition sequence or journal
- no requested/applied distinction
- no ability to reject a transition under override policy
- no reconciliation against observed renderer controls
- no deterministic test currently exercises the state machine

## Required state model

```txt
stable
  -> requested
  -> admitted | rejected
  -> applying
  -> applied | rolled_back | failed
  -> stable
```

The budget should not publish a new applied level until the control transaction succeeds.

## Required fixture sequences

```txt
steady target frames -> no transition
90 sustained slow samples -> level 1
90 more sustained slow samples -> level 2
360 sustained fast samples -> level 1
360 more sustained fast samples -> level 0
dead-band samples -> counters decay without transition
callback failure -> level remains previous applied level
duplicate request -> typed no-op
```
