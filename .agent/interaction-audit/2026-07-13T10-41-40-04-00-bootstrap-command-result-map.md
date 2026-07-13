# Interaction audit: bootstrap command and result map

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

The player-facing loader now reflects Core Startup preparation state, but there is no command/result boundary before the main module graph evaluates. This audit maps the required interaction states from static shell through retry, fallback, first visible frame and playable entry.

## Plan ledger

**Goal:** ensure every startup interaction exposes one terminal result and never leaves the player on an indefinitely unchanged loading shell.

- [x] Trace current loader copy and progress projection.
- [x] Trace structured failure projection after host creation.
- [x] Identify the unhandled pre-host interval.
- [x] Define terminal command results and UI projections.
- [ ] Implement retry/fallback controls and stale-attempt fencing.

## Current interaction states

```txt
static HTML
  visible loader: Starting NexusEngine

module graph succeeds
  Core Startup descriptor drives preparation copy and progress

pre-playable runtime failure after host creation
  failure descriptor drives error panel

module graph/import failure before host creation
  no product command result
  no timeout
  no retry/fallback
  loader can remain unchanged
```

## Required command results

```txt
BootstrapAccepted
BootstrapRejected
BootstrapTimedOut
BootstrapCancelled
BootstrapStale
BootstrapRetryAvailable
BootstrapFallbackAvailable
StartupPreparing
StartupFailed
FirstFrameAccepted
FirstFrameFailed
PlayableEntered
```

Each result must include bootstrap generation, source/provider identity, bounded evidence, retryability and zero-mutation guarantees where applicable.

## Required player projection

```txt
Loading module providers
Preparing renderer
Installing adventure services
Choosing continuation
Growing island
Preparing controls
Ready

or

Could not load game code
Could not initialize renderer
Could not restore continuation
Could not prepare world
Retry
Use supported fallback when available
```

The wording remains product-owned. Core Startup should continue publishing facts rather than product copy.

## Stale and duplicate behavior

- A retry allocates a new bootstrap generation.
- Events and promises from the predecessor generation are ignored.
- Only one accepted generation may create the Core Startup launch and adventure engine.
- Duplicate retry clicks produce one admitted attempt.
- A cancelled or failed attempt cannot later enter playable.

## Validation boundary

Documentation only. No loader DOM, controls, failure UI or retry behavior changed.