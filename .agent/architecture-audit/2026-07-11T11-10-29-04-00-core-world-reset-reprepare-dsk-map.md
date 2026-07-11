# Architecture Audit: Core World Reset / Re-prepare DSK Map

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

The current wrapper has a reusable-object API but a terminal-reset implementation. The missing parent domain must coordinate Core World definitions, provider stores, materializer jobs, world generations, recovery results, and terminal disposal.

## Plan ledger

**Goal:** define the smallest DSK composition that separates reusable reset from terminal disposal and prevents unregistered prepare or stale generation work.

- [x] Trace one-time world registration.
- [x] Trace product prepare/reset/dispose.
- [x] Trace pinned Core World `resetWorlds()`.
- [x] Identify provider/materializer and render dependencies.
- [x] Define parent domain and child kits.

## Current ownership

```txt
createCozyIslandWorldRuntime
  owns product wrapper booleans and references

core-world-domain
  owns definitions, coordination state, cells, provider lifecycle

provider runtime stores
  own terrain/classification/population/presentation heavy state

lazy-cell-materializer
  owns partial row jobs and scheduler counters

browser host
  owns renderer, animation loop, input, diagnostics
```

## Current mismatch

```txt
reset() product name
  -> resetWorlds() Core World hard teardown
  -> clears runtime definitions
  -> prepare() still exposed
  -> prepare() assumes definition exists
```

## Required parent domain

```txt
cozy-island-world-recovery-domain
```

## Candidate child kits

```txt
world-reset-command-kit
  canonical reset/recreate/dispose request

world-reset-admission-kit
  session, generation, lifecycle, and in-flight operation checks

world-reset-policy-kit
  soft-reset, recreate, terminal-dispose semantics

world-generation-kit
  monotonic identity and stale-work rejection

world-definition-checkpoint-kit
  immutable admitted definition, partition, surface, providers, seed

provider-release-plan-kit
  reverse-order active-cell and provider retirement

provider-release-result-kit
  typed per-provider and per-cell release outcomes

provider-store-reset-kit
  joined proof that all seven product stores are reset

materializer-cancellation-kit
  cancel and fingerprint partial jobs/counters

world-reregistration-kit
  reattach or recreate the admitted world definition

world-reprepare-kit
  focus origin, update world, verify active cells and provider rows

world-recovery-result-kit
  one clone-safe transaction result

world-recovery-fingerprint-kit
  before/after definition, provider, cell, materializer fingerprints

world-recovery-journal-kit
  bounded lifecycle evidence

world-recovery-rollback-kit
  restore prior usable state or remain explicitly blocked

world-terminal-disposal-kit
  idempotent final closure and command rejection

reset-reprepare-fixture-kit
  deterministic Node proof

browser-world-restart-smoke-kit
  animation/listener/renderer generation proof
```

## Authority order

```txt
Runtime Session Lifecycle Authority
  -> World Reset / Re-prepare Authority
  -> Focus Transaction Authority
  -> Materialization Readiness Authority
  -> Renderer Cell Commit Authority
```

## Required invariants

```txt
one admitted definition per active world generation
one release/reset transaction per command
provider release order is reverse provider order
no old-generation focus/materialization/render result can commit
reusable reset ends prepared with 49 active cells
terminal dispose ends permanently closed
failed recovery never presents a false prepared state
```
