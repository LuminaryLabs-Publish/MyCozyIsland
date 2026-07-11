# Performance Audit: Cadence-Independent Full-Recovery Contract

Timestamp: `2026-07-11T12-50-35-04-00`

## Current policy

```txt
EMA weight: 0.93 previous / 0.07 current
degrade threshold: target * 1.26
recover threshold: target * 0.86
degrade dwell: 90 samples
recover dwell: 360 samples
levels: 0, 1, 2
```

## Defects

1. Dwell is measured in rendered frames rather than elapsed monotonic time.
2. Hidden-tab and suspension policy is undefined.
3. Transition callbacks are not fenced by session phase or generation.
4. Consumer mutations are not transactional.
5. Level-zero recovery does not restore pixel ratio.
6. Effective state excludes fog resolution and pixel ratio.
7. No policy revision or fingerprint exists.
8. No complete recovery or partial-failure fixture exists.

## Required policy contract

```txt
QualityPolicy {
  id
  revision
  targetFrameMs
  degradeThresholdMs
  recoverThresholdMs
  degradeDwellMs
  recoverDwellMs
  minimumLevelDwellMs
  visibilityPolicy
  levels[]
  fingerprint
}
```

Each level must define exact values for every mutable consumer:

```txt
cloudStepScale
fogStepScale
fogResolutionScale
pixelRatioCapScale
```

## Full-recovery invariant

After `0 -> 1 -> 2 -> 1 -> 0`, the final effective state and fingerprint must equal the initial level-zero state for every consumer.

## Partial-failure invariant

If any consumer cannot prepare or commit the candidate revision, every prepared or committed consumer must restore the prior revision before the transition returns.
