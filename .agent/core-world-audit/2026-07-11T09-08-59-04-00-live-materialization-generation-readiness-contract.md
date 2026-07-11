# Core World Audit: Live Materialization Generation and Readiness Contract

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

Core World active-cell admission and deferred provider readiness are separate truths. The live materializer now advances the deferred path, but it still lacks cell generations and a canonical readiness set tying provider versions to one accepted world/focus revision.

## Required identity

```txt
WorldWorkIdentity {
  sessionId
  sessionEpoch
  worldId
  worldRevision
  focusRevision
  cellId
  cellGeneration
  materializationEpoch
}
```

## Required provider row

```txt
ProviderReadinessRow {
  identity
  providerId
  descriptorSchema
  descriptorVersion
  stage
  status
  progress
  attempt
  sourceVersions
  outputFingerprint
  failureCode
}
```

## Cell generation rules

```txt
new active cell identity -> generation 1
released then reactivated -> generation + 1
provider replacement -> generation + 1
world reset -> new world revision and generation namespace
late result from older generation -> rejected-stale
```

## Readiness policy

Declare providers as:

```txt
required
optional
degraded-allowed
blocking
```

Current candidate required set for a visible cell:

```txt
terrain
biome
shoreline
vegetation
rocks
props
presentation
```

The product may later classify population providers as optional by LOD, but that must be explicit and fingerprinted.

## Cell readiness commit

```txt
all required rows accepted
  -> same worldRevision
  -> same focusRevision policy
  -> same cellGeneration
  -> valid provider descriptor versions
  -> no terminal blocking failure
  -> compute readiness fingerprint
  -> assign monotonic cellReadinessRevision
  -> publish immutable readiness result
```

## Release contract

```txt
release accepted
  -> increment/retire generation
  -> reject pending old-generation commands
  -> publish cancellation rows
  -> release semantic runtime handles
  -> request renderer resource release
  -> acknowledge disposal
```

## Reusable engine primitives

Suitable for the existing NexusEngine Core World DSK:

```txt
cell generation
world/focus revision admission
deferred provider readiness rows
required-provider readiness policy
stale result rejection
readiness-set fingerprint
bounded work/result journal
```

Keep island-specific terrain/classification stages and render recipes product-local.
