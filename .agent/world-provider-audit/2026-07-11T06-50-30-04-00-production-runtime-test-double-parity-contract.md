# World Provider Audit: Production Runtime and Test-Double Parity Contract

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** define the minimum contract a test double must satisfy before its results can support claims about the pinned NexusEngine Core World provider lifecycle.

- [x] Compare partition selection APIs.
- [x] Compare provider invocation rules.
- [x] Compare failure, rollback, diagnostics and snapshots.
- [x] Define one shared parity matrix.

## Production contract

The pinned Core World builder expects a partition result containing:

```txt
required
retained
released
updated
```

It validates cells, orders providers by phase, evaluates `matches`, verifies required capabilities, normalizes portable effects, records provider status, records diagnostics and rolls back providers already prepared inside a failed cell.

World transition order is:

```txt
release removed cells
update changed cells
prepare required cells
retry retained non-active cells
commit world state
```

A cell can be committed with `state=failed`.

## Current fake contract

The local fake partition returns one bare array. Its world update:

```txt
computes released cells itself
releases all providers
updates every existing cell
prepares every new cell
marks every cell active
```

It does not model matches, capability requirements, criticality, portable validation, statuses, diagnostics, rollback or failed cells.

## Parity requirement

A fake may remain only if it passes the same observable contract matrix as the pinned runtime. It does not need identical internals, but these observations must match:

```txt
selection deltas
provider order
provider action per cell
capability blocking
critical/noncritical outcome
cell state
provider status
stable error code
rollback order
release order
snapshot portability
reset/dispose result
```

## Shared fixture interface

```txt
createHarness({ runtimeKind, failurePlan })
  -> registerWorld(definition)
  -> setFocus(command)
  -> updateWorld()
  -> snapshotWorld()
  -> getCellRecords()
  -> getDiagnostics()
  -> getProviderTrace()
  -> reset()
```

Runtime kinds:

```txt
pinned-production
contract-fake
```

Each result must include the pinned commit or declared fake contract version.

## Failure plan

```txt
providerId
phase
cellId or cellPredicate
action: prepare | update | release
occurrence
errorCode
critical
```

## Matrix

```txt
normal initial prepare
normal boundary transition
retained update
provider does not match
missing noncritical capability
missing critical capability
terrain prepare throws
biome prepare throws
vegetation prepare throws
presentation prepare throws
provider update throws
provider release throws
failed retained cell retries
reset releases in reverse provider order
snapshot remains portable
```

## Wrapper-specific assertions

```txt
prepare failure resets wrapper prepared state
second prepare can retry
focus result names failed cells/providers
Boolean changed is removed from proof surface
previous accepted state preservation is explicit
provider-store versions correlate with the result
```

## Upgrade policy

When the NexusEngine commit changes:

```txt
1. update runtime identity
2. run pinned-production matrix
3. run fake matrix
4. resolve every difference
5. update expected contract version
6. run browser focus failure smoke
7. only then update production import pin
```

## Decision

The current fake remains useful for lightweight success-path tests, but it is not sufficient evidence for production provider failure, rollback or focus transaction behavior. Those claims require the exact pinned runtime harness.
