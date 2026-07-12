# Architecture Audit: World Lifecycle / Mode Parity DSK Map

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

Legacy and Core world wrappers share one method surface but not one lifecycle contract. A parent authority is required to make prepare, reset, dispose, query and diagnostics phase-aware and mode-independent.

## Plan ledger

**Goal:** define the smallest DSK composition that separates reusable reset from terminal disposal, fences stale generations and normalizes legacy/Core results.

- [x] Trace both wrapper branches.
- [x] Compare prepare/reset/dispose semantics.
- [x] Trace public query, engine and provider exposure.
- [x] Identify phase, generation, lease and result gaps.
- [x] Define parent domain and child kits.

## Current mismatch

```txt
legacy
  prepare -> prepared=true
  reset -> prepared=false
  dispose -> prepared=false
  later prepare -> accepted

core
  prepare -> focus/update registered world
  reset -> clear Core World definitions
  dispose -> reset plus domain reset
  later prepare -> wrapper still callable but definition is gone
```

## Required parent domain

```txt
cozy-island-world-lifecycle-contract-authority-domain
```

## Candidate kits

```txt
world-lifecycle-phase-kit
world-runtime-generation-kit
world-mode-contract-kit
world-lifecycle-command-kit
world-lifecycle-admission-kit
world-prepare-result-kit
world-reset-policy-kit
world-reset-result-kit
world-dispose-result-kit
world-definition-lease-kit
world-query-lease-kit
world-diagnostics-lease-kit
provider-materializer-retirement-kit
stale-world-generation-rejection-kit
terminal-use-after-dispose-rejection-kit
legacy-core-lifecycle-adapter-kit
world-lifecycle-observation-kit
world-lifecycle-journal-kit
world-mode-parity-fixture-kit
world-use-after-dispose-fixture-kit
browser-world-lifecycle-smoke-kit
```

## Lifecycle phases

```txt
NEW
PREPARING
READY
RESETTING
RESET
DISPOSING
DISPOSED
FAILED
```

`prepared` becomes a derived compatibility field. It must never be the lifecycle authority.

## Required flow

```txt
WorldLifecycleCommand
  -> validate session, mode, phase, generation and command sequence
  -> choose prepare, reusable-reset or terminal-dispose policy
  -> stage provider/materializer/definition work
  -> commit phase and generation atomically
  -> revoke stale query/diagnostic leases
  -> return typed result under one schema for both modes
  -> publish detached observation and bounded journal
```

## Invariants

```txt
READY implies a committed snapshot
RESET remains reusable
DISPOSED is terminal
no command from an older generation can mutate state
queries cannot outlive their lease
legacy and core return the same result classes
terminal disposal is idempotent
```
