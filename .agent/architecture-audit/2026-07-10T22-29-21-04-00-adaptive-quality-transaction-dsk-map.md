# Architecture Audit: Adaptive Quality Transaction DSK Map

Timestamp: `2026-07-10T22-29-21-04-00`

## Current graph

```txt
webgpu-performance-budget-kit
  -> sample(frameMs)
  -> mutate internal level
  -> invoke onDegrade/onRecover
  -> route applyPerformanceLevel(level)
     -> mutate activeScale
     -> cloud step scale
     -> fog step scale
     -> fog render resolution
     -> conditional renderer pixel ratio
```

The budget owns decision state, while `main-cloudform.js` owns application. No domain owns the complete requested-target-applied-observed transaction.

## Authority gaps

```txt
requested level: budget internal state
target descriptor: implicit hardcoded branch
application result: absent
rollback: absent
applied level: inferred
observed controls: incomplete
override admission: undefined
transition journal: absent
host projection: incomplete
```

## Proposed parent domain

```txt
cozy-island-adaptive-quality-domain
```

## Candidate kits

```txt
adaptive-quality-state-kit
adaptive-quality-target-descriptor-kit
adaptive-quality-transition-policy-kit
adaptive-quality-application-transaction-kit
adaptive-quality-result-kit
renderer-pixel-ratio-control-kit
volumetric-step-control-kit
fog-resolution-control-kit
quality-override-admission-kit
adaptive-quality-journal-kit
adaptive-quality-host-observation-kit
adaptive-quality-transition-fixture-kit
```

## Required services

```txt
quality:resolve-target(level, startupProfile, overridePolicy)
quality:admit-transition(current, requested, source)
quality:apply-target(target)
quality:rollback(previous)
quality:observe-controls()
quality:get-state()
quality:get-transition-journal()
quality:project-host-state()
```

## Required invariants

```txt
one immutable target per admitted level
all target controls are applied, including level 0
applied state equals observed control state
a transition commits atomically or rolls back
no-change transitions do not rewrite controls
URL override semantics are explicit
transition rows are ordered, bounded, and JSON-safe
session ID and source frame can be added without schema breakage
```

## Composition decision

The adaptive-quality domain should be a child of the planned route runtime-session domain. The session owns renderer/control lifetimes; the quality domain owns target policy and control transitions.
