# Interaction audit: motion preference command and result map

## Plan ledger

**Goal:** make system preference, product override and live changes explicit commands with typed results.

- [x] Map current implicit evidence.
- [x] Define admission commands.
- [x] Define projection results.
- [x] Define stale-work rejection.
- [ ] Implement browser and product controls.

## Current evidence

```txt
CSS media query
menu startup matchMedia().matches
no game-route observer
```

## Proposed commands

```txt
ObserveMotionCapabilityCommand
  documentRevision
  mediaQueryRevision
  matchesReduced

SetMotionOverrideCommand
  sessionRevision
  override: system | normal | reduced

SettleMotionPolicyCommand
  routeRevision
  expectedPolicyRevision

ProjectMotionPolicyCommand
  routeRevision
  frameRevision
  policyRevision
  surfaceId
```

## Proposed results

```txt
MotionCapabilityResult
MotionPreferenceAdmissionResult
MotionPolicySettlementResult
MotionProjectionResult
MotionProjectionFailureResult
FirstReducedMotionMenuFrameAck
FirstReducedMotionGameplayFrameAck
```

## Rejection rules

Reject commands when the document, route, session, frame or expected policy revision is stale. Retired menu results must not affect the active game. A live OS change must settle once and supersede prior descriptors without resetting gameplay state.

## Product control

A future setting may expose `Use system setting`, `Normal motion` and `Reduced motion`. The setting writes only the product override; the authority resolves the final policy.
