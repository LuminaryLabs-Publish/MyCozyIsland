# Interaction Audit: Quality Sample to Transition Result Map

Timestamp: `2026-07-12T05-00-19-04-00`

## Current interaction map

```txt
RAF callback
  -> calculate now - last
  -> clamp to 0..100 ms
  -> sample moving average
  -> mutate qualifying frame counters
  -> maybe invoke onDegrade/onRecover
  -> host mutates renderer consumers directly
  -> render current frame
  -> later diagnostics infer current state
```

## Missing command/result boundary

```txt
sample ID: absent
sample source: implicit
sample validity: absent
quality command ID: absent
expected quality revision: absent
transition result: callback payload only
consumer results: absent
rollback result: absent
visible frame acknowledgement: absent
```

## Required interaction map

```txt
FrameCostSample
  -> validate session, renderer generation, visibility and timing source
  -> append to time-based observation window
  -> evaluate QualityPolicyDescriptor
  -> emit QualityTransitionCommand when dwell is satisfied
  -> admit expected predecessor quality revision
  -> create complete QualityConsumerPlan
  -> apply adapters and collect receipts
  -> commit or reject QualityTransitionResult
  -> render using committed revision
  -> publish VisibleQualityFrameAck
```

## Admission classifications

```txt
accepted-sample
rejected-first-frame
rejected-hidden
rejected-suspended
rejected-discontinuity
rejected-stale-session
no-transition-insufficient-dwell
no-transition-deadband
accepted-degrade
accepted-recover
rejected-consumer-failure
rejected-stale-quality-revision
```

## Override interaction

The URL quality request must be converted into an explicit policy:

```txt
fixed
  -> no automatic transitions

adaptive-ceiling
  -> requested tier is maximum allowed quality

adaptive-start
  -> requested tier is initial base and normal transitions remain enabled
```

The current code does not identify which meaning applies.

## Acceptance conditions

```txt
every transition has one command and terminal result
invalid samples cannot advance dwell
stale sessions and revisions cannot mutate renderer state
all consumers return receipts
partial failure cannot publish an active revision
public readback identifies the same result as the visible frame
```