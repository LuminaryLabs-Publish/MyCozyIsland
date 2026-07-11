# Core World Audit: Lazy Provider Readiness Contract

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

Core World provider admission currently proves descriptor capability availability, not completion of deferred heavy provider data. A separate readiness contract is now required between active cell state and render eligibility.

## Current provider states

```txt
terrain: descriptor queued -> rows materializing -> runtime handle ready
biome: descriptor queued -> rows materializing -> weights ready
shoreline: descriptor queued -> rows materializing -> fields ready
vegetation/rocks/props: existing provider records
presentation: queued descriptor -> refreshed ready descriptor
```

## Contract split

```txt
Core World active cell
  means descriptor/provider lifecycle accepted

does not mean
  terrain arrays complete
  classification arrays complete
  presentation source versions joined
  render resources prepared
```

## Required readiness row

```txt
ProviderReadinessRow {
  worldId
  worldRevision
  cellId
  cellGeneration
  providerId
  descriptorVersion
  materializationEpoch
  stage
  status
  progress
  attempt
  sourceVersions
  fingerprint
}
```

## Required cell commit

```txt
all required readiness rows accepted
  -> validate provider version set
  -> refresh presentation descriptor
  -> assign CellReadinessRevision
  -> publish clone-safe readiness result
  -> admit detached render preparation
```

## Release rule

A release or replacement must increment the cell generation. Results from earlier generations must be rejected even if provider work completes after the cell left the active set.

## Engine/product boundary

Keep product-specific provider stages in `MyCozyIsland`. Generalize only these primitives into the existing Core World DSK when useful across products:

```txt
deferred provider readiness rows
cell generations
bounded work command/result
stale completion rejection
readiness-set validation
```
