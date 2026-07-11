# Architecture Audit: Core World Focus Transaction DSK Map

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

The existing ownership split is mostly correct: NexusEngine owns generic world coordination and providers; MyCozyIsland owns camera-driven focus policy and product providers. The missing piece is a product transaction that correlates those layers without creating a parallel world architecture.

## Plan ledger

**Goal:** map the smallest DSK composition that turns camera focus into an accepted, versioned world/provider revision.

- [x] Preserve NexusEngine Core World as the coordination authority.
- [x] Preserve product ownership of focus cadence and target policy.
- [x] Identify missing command, checkpoint, result and parity services.
- [x] Separate focus commit from later visible render commit.
- [x] Define implementation order and ownership boundaries.

## Existing DSK ownership

### NexusEngine Core World domain

Owns:

```txt
world definitions
world identity and focus state
partition selection
cell lifecycle records
provider contracts and phase order
capability admission
diagnostics
portable snapshots
reset and provider release
```

Does not own:

```txt
product camera policy
product provider content
Three.js resources
GPU rendering
product retry/degraded policy
session lifecycle
```

### MyCozyIsland world wrapper

Owns:

```txt
pinned runtime resolution
product composition and provider construction
world registration
initial focus target
camera-mode focus policy
focus cadence and movement threshold
wrapper snapshot/query/state
legacy compatibility bridge
```

### Product providers

Own deterministic terrain, classification, population, props and presentation descriptors plus provider-local runtime stores.

## Missing parent transaction domain

```txt
cozy-island-focus-transaction-domain
```

Purpose:

```txt
accept one product FocusCommand
coordinate wrapper/Core World/provider changes
classify the terminal outcome
publish one accepted world revision
retain enough evidence for retry, rendering and diagnostics
```

It composes existing Core World services rather than replacing them.

## Candidate kit map

```txt
focus-command-kit
  typed portable command and identity

focus-target-normalization-kit
  camera-mode policy, finite coordinates, target cell

focus-admission-kit
  session, epoch, lifecycle and expected-revision checks

focus-checkpoint-kit
  accepted wrapper and Core World read model

provider-store-checkpoint-kit
  provider store identities, counts, snapshots or compensating actions

focus-selection-plan-kit
  required/updated/retained/released projection

provider-transition-result-kit
  per cell/provider action, status, reason and diagnostic

focus-transaction-kit
  ordered orchestration and terminal classification

focus-rollback-kit
  restore/compensate and report residuals

world-revision-kit
  monotonic accepted product revision

provider-revision-set-kit
  provider-store revision/fingerprint set

focus-result-kit
  immutable portable terminal envelope

focus-journal-kit
  bounded command/result history

focus-observation-kit
  clone-safe host/debug state

core-world-contract-adapter-kit
  shared interface for production and fixture runtimes

core-world-parity-fixture-kit
  same matrix against both implementations

focus-failure-injection-kit
  deterministic throw/failure points

focus-retry-fixture-kit
  initial and movement retry proof
```

## Required composition

```txt
runtime-session-authority
  -> focus-command-kit
  -> focus-admission-kit
  -> product focus target policy
  -> Core World setFocus/updateWorld services
  -> provider transition collection
  -> focus rollback policy
  -> world/provider revisions
  -> focus result and journal
  -> render commit authority
```

## Transaction boundary

The accepted commit is not merely `CoreWorldState.focus`.

```txt
accepted focus revision =
  wrapper lastFocus
  + wrapper lastCellKey
  + wrapper worldSnapshot
  + Core World focus and cell state
  + provider-store accepted state
  + diagnostics/completion policy
```

Every component must refer to one `worldRevision`.

## Failure policy

```txt
failure before production setFocus
  -> no state change

failure after setFocus but before accepted cells
  -> restore previous focus or record explicit degraded residual

provider failure fully compensated
  -> previous revision remains accepted

noncritical provider failure allowed by policy
  -> commit degraded revision with named missing provider rows

partial rollback
  -> block render admission and expose residual state
```

## Core change decision

Implement in MyCozyIsland first using existing Core World APIs. Promote an atomic focus/update primitive into `LuminaryLabs-Dev/NexusEngine` only if the same command/result semantics are general and can replace the current two-call pattern without product-specific render or camera policy.

## Dependency order

```txt
1. runtime session identity and epoch
2. command/result schemas
3. exact production contract fixture
4. contract-faithful test adapter
5. checkpoints and provider result rows
6. transaction and rollback policy
7. world/provider revision observation
8. render commit admission
```

## Architecture acceptance

```txt
no duplicate world framework
no product renderer code in Core World
no focus Boolean used as commit proof
no wrapper mutation before admission
one terminal result per command
one accepted revision across all state owners
production/fake fixture classifications match
```
