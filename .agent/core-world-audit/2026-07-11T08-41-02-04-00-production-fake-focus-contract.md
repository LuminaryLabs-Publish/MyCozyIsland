# Core World Audit: Production and Fake Focus Contract

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

The test fake is useful for deterministic happy-path checks but is not a contract substitute for the pinned production Core World builder. A shared adapter and parity matrix are required before focus failure handling can be trusted.

## Plan ledger

**Goal:** record the exact production/fake differences and define one fixture contract that both implementations must satisfy.

- [x] Read the pinned production world builder.
- [x] Read the local fake runtime.
- [x] Compare focus, selection, provider, diagnostic and rollback behavior.
- [x] Define shared contract operations and observations.
- [x] Define parity scenarios.

## Production runtime

```txt
setFocus(worldId, focus)
  validates portability
  commits focusChanged

updateWorld(worldId)
  calls partition.selectCells(previousCells, focus)
  validates required/updated/retained/released
  releases cells/providers
  updates changed cells/providers
  prepares required cells/providers
  retries retained failed cells
  validates and commits cellsChanged
  returns portable world snapshot
```

Provider behavior includes phase ordering, matches checks, capability requirements, status rows, diagnostics, critical failures, rollback of prepared new-cell providers, reverse release order and async-method rejection.

## Fake runtime

```txt
setFocus
  direct map assignment

updateWorld
  partition returns one flat array
  fake computes releases and prepare/update calls
  all providers run
  no matching/capability/critical policy
  every completed row becomes active
  returns a simplified snapshot
```

## Contract differences

| Area | Production | Fake |
|---|---|---|
| Selection | required/updated/retained/released | flat array |
| Validation | explicit | absent |
| Provider matching | yes | no |
| Capability admission | yes | no |
| Status rows | yes | no |
| Diagnostics | bounded portable rows | minimal empty list |
| Failed cell state | yes | no |
| New-cell rollback | reverse prepared providers | absent |
| Release failure | captured diagnostic/status | not classified |
| Async method rejection | yes | not modeled |
| State commits | focusChanged then cellsChanged | direct mutation |
| Sequence identity | Core World sequence | absent |

## Required shared adapter

```txt
registerWorld(definition)
setFocus(worldId, focus)
updateWorld(worldId)
getWorld(worldId)
getDiagnostics(worldId)
snapshotWorld(worldId)
resetWorlds()
reset()
```

The adapter must not normalize away production statuses or diagnostics. The fake should become contract-faithful enough to represent them, or deterministic tests should use the pinned production modules directly.

## Required observations

```txt
focus
Core World sequence
active cell IDs
cell states
cell descriptor versions
provider statuses
provider effect IDs and versions
diagnostics
provider-store counts
provider snapshots
release/rollback trace
```

## Parity scenarios

```txt
initial prepare
same focus update
single boundary crossing
multi-cell movement
updated descriptor
provider not applicable
missing capability
critical prepare failure
noncritical prepare failure
update failure
release failure
invalid selection
async provider method
reset and repeat
```

## Allowed differences

Only explicitly named test instrumentation may differ, such as injected trace rows. Cell identities, status classifications, provider order, diagnostics codes and terminal result class must match.

## Acceptance

```txt
same command sequence produces same accepted cell IDs
same injected failure produces same terminal classification
same provider order and rollback order
same portable diagnostic codes
same retry outcome
fake cannot pass a case production fails without a documented adapter reason
```
