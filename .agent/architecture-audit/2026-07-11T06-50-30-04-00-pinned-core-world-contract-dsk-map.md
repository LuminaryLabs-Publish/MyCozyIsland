# Architecture Audit: Pinned Core World Contract and Focus Transaction DSK Map

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** define a host-owned composition that makes the exact pinned Core World contract testable and converts focus transitions into one typed authority result before renderer consumption.

- [x] Identify existing Core World ownership.
- [x] Identify wrapper-local ownership.
- [x] Compare the shipped runtime and test double.
- [x] Define missing DSK/domain boundaries.
- [x] Specify command, state, result and fixture contracts.
- [x] Preserve the existing lifecycle-first order.

## Existing ownership

```txt
NexusEngine core-world-domain
  world identity
  partition
  focus
  active-cell records
  provider phases
  capability graph
  portable effects
  provider status
  diagnostics
  snapshots and reset

MyCozyIsland world wrapper
  runtime resolution
  legacy semantic composition
  provider construction
  initial prepare
  focus throttling
  last focus/cell key
  provider runtime stores
  query and compatibility bridge

browser host
  camera position
  calls updateWorldFocus
  ignores everything except Boolean changed
```

## Missing parent domain

```txt
cozy-island-world-transition-authority-domain
```

Purpose:

```txt
bind one session epoch
bind one pinned runtime identity
admit one focus command
stage one world transition
collect provider results
apply the declared completeness policy
commit or reject one focus/world revision
publish one bounded result
```

## Child kits

### Runtime identity

```txt
core-world-runtime-identity-kit
```

Owns repository, commit, module paths, resolved capability list and contract version. It prevents fixtures and production from claiming parity without naming the runtime they execute.

### Contract adapter

```txt
core-world-contract-adapter-kit
```

Normalizes the pinned runtime and any test double behind the same registration, focus, selection, provider-status, diagnostic, snapshot and reset observation contract.

### Focus envelope and admission

```txt
focus-command-envelope-kit
focus-admission-kit
```

Own command ID, session epoch, previous focus revision, requested position, camera mode, source frame and stale/invalid rejection.

### Transition staging

```txt
focus-transition-stage-kit
active-cell-set-transaction-kit
```

Capture the previous focus, world snapshot, active-cell IDs and provider-store checkpoints. Execute the transition under an explicit policy and prevent Boolean-only success.

### Provider failure policy

```txt
provider-failure-policy-kit
```

Allowed policies:

```txt
strict-rollback
  any critical failed cell rejects the focus revision
  previous focus and provider state remain authoritative

degraded-explicit
  world revision can commit with named failed cells
  renderer admission remains blocked for incomplete cells
```

No silent degraded mode is allowed.

### Provider evidence

```txt
provider-result-journal-kit
provider-store-checkpoint-kit
```

Record provider phase, cell, action, status, effect version, missing capabilities, error code, rollback/release result and store version/fingerprint.

### Rollback and result

```txt
focus-rollback-kit
focus-result-kit
world-correlation-kit
```

Restore or preserve the previous accepted state according to policy and correlate session, focus, world, provider and later render revisions.

### Proof kits

```txt
pinned-runtime-test-harness-kit
fake-runtime-contract-fixture-kit
production-runtime-failure-fixture-kit
browser-focus-failure-smoke-kit
```

## Command contract

```txt
FocusCommand
  schema
  commandId
  sessionEpoch
  runtimeCommit
  worldId
  previousFocusRevision
  requestedPosition
  cameraMode
  sourceFrameId
```

## State contract

```txt
WorldTransitionState
  sessionEpoch
  runtimeCommit
  worldId
  focusRevision
  acceptedFocus
  worldRevision
  activeCellIds
  providerStoreVersions
  providerStoreFingerprint
  completeness
  lastResult
  recentResults
```

## Result contract

```txt
FocusResult
  schema
  commandId
  sessionEpoch
  runtimeCommit
  worldId
  previousFocusRevision
  focusRevision
  previousWorldRevision
  worldRevision
  status
  reason
  requestedPosition
  acceptedPosition
  requiredCellIds
  retainedCellIds
  updatedCellIds
  releasedCellIds
  failedCellIds
  missingCapabilities
  providerFailures
  releaseFailures
  rolledBackProviderIds
  previousStatePreserved
  completeness
  sourceFingerprint
  resultFingerprint
```

## Status contract

```txt
accepted-complete
accepted-degraded
unchanged
rejected-stale
rejected-invalid
failed-rolled-back
failed-partial
```

## Existing source that should be changed later

```txt
src/world/world-runtime.js
  prepare
  commitFocus
  updateWorldFocus
  getState

src/world/provider-runtime-store.js
  version semantics
  checkpoint/restore or stage/commit support

tests/helpers/fake-nexus-world.mjs
  replace with contract-faithful adapter or reduce to a deliberately tested fake

package.json
  add pinned-runtime and failure-parity fixtures

src/main-cloudform.js
  consume typed focus result under session epoch
```

## Implementation sequence

```txt
1. add runtime identity and shared contract harness
2. run normal-path matrix against pinned runtime
3. upgrade/replace fake until parity passes
4. fix prepare retry state
5. add typed focus envelope/result
6. add provider evidence and store fingerprints
7. choose strict rollback or explicit degradation
8. add failure injection by provider phase
9. add browser pinned-import smoke
10. allow render authority to admit complete world revisions only
```

## Architectural guardrails

- Do not fork Core World logic into the product.
- Do not pretend a simplified fake is production proof.
- Do not put typed arrays, Maps, functions, Three objects or GPU handles in results.
- Do not release prior visible resources for a rejected world revision.
- Do not allow `accepted-degraded` to collapse to `true`.
- Do not promote the cell renderer before lifecycle and contract fixtures pass.
