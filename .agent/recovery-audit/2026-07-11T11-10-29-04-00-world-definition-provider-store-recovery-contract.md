# Recovery Audit: World Definition / Provider Store Contract

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

A product-level world recovery must join the Core World definition, coordination state, all seven provider stores, lazy materializer state, focus state, and render generation. Resetting only the coordination layer or only product stores cannot prove a coherent restart.

## Plan ledger

**Goal:** define the checkpoint, release, re-registration, prepare, rollback, and terminal-disposal contract for one world generation.

- [x] Identify all state owners.
- [x] Identify current reset order.
- [x] Identify missing joined results and fingerprints.
- [x] Define recovery phases and invariants.

## State owners

```txt
Core World definition
  id, seed, partition, surface, provider order

Core World coordination
  focus, active cells, effects, provider statuses, diagnostics

provider stores
  terrain, biome, shoreline, vegetation, rocks, props, presentation

lazy materializer
  per-cell stage, row jobs, priority, counters

product wrapper
  prepared, worldSnapshot, focus accumulator, last focus, last cell

browser/render host
  compatibility graph, cell cache, GPU resources, frame generation
```

## Required checkpoint

```txt
WorldRecoveryCheckpoint {
  checkpointId
  sessionId
  sessionEpoch
  worldId
  worldGeneration
  definitionFingerprint
  providerOrderFingerprint
  coordinationFingerprint
  providerStoreFingerprints
  materializerFingerprint
  focusFingerprint
  rendererGeneration
}
```

Heavy arrays and GPU resources remain provider/renderer-owned. The checkpoint carries identities, versions, counts, and recovery metadata rather than copying live handles into Core World state.

## Recovery phases

```txt
admit
freeze
checkpoint
release cells
reset providers
cancel materializer
retain/remove definition by policy
re-register when required
prepare origin
verify provider parity
commit new generation
resume
retire old render resources
```

## Failure handling

```txt
release failure
  keep recovery blocked and report affected provider/cell

provider reset failure
  quarantine provider and reject prepare

registration failure
  retain checkpoint and attempt rollback or remain blocked

prepare failure
  release partial new generation in reverse order
  restore prior checkpoint when supported

renderer acknowledgement failure
  keep compatibility fallback and do not retire prior resources
```

## Required invariants

- Definition and provider order fingerprints match the admitted configuration.
- Each active old cell is released once.
- Each provider store is reset once.
- Old materializer jobs cannot complete into the new generation.
- Reusable recovery ends with 49 active cells and seven provider store counts of 49.
- Terminal disposal ends with zero active definitions, cells, jobs, and accepted commands.
- Diagnostics survive as bounded detached records.
