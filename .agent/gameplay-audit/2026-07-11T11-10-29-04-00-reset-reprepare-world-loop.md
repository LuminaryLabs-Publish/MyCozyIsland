# Gameplay Audit: Reset / Re-prepare World Loop

Timestamp: `2026-07-11T11-10-29-04-00`

## Summary

The exploration route has scenario reset semantics, but the Core World wrapper's reset path is not reusable. Future restart, new-session, or world-reload controls would currently break the semantic world after the first reset.

## Plan ledger

**Goal:** map how player/camera state, world focus, materialization, and rendering must pause and resume around a fresh world generation.

- [x] Trace camera rail and first-person focus flow.
- [x] Trace world prepare, focus, materialization, reset, and dispose.
- [x] Identify gameplay-facing restart hazards.
- [x] Define the required recovery loop.

## Current gameplay loop

```txt
camera rail at island center
  -> first-person landing
  -> camera/player position drives focus
  -> cell crossing prepares/releases providers
  -> lazy materialization advances current cells
  -> compatibility render remains visible
```

## Reset hazard

```txt
future restart/new session
  -> scenario resets camera/player state
  -> worldRuntime.reset clears Core World definition
  -> worldRuntime.prepare attempts focus on missing definition
  -> focus/materialization cannot resume reliably
  -> renderer may continue showing prior world
```

## Required gameplay recovery loop

```txt
request restart
  -> pause scenario input and world updates
  -> close old world generation
  -> reset/recreate semantic world
  -> verify fresh origin cell set
  -> reset camera rail and scenario against new generation
  -> restore ground query and focus authority
  -> resume materialization
  -> acknowledge first visible frame
  -> re-enable input
```

## Required gameplay invariants

- Player input cannot advance while world recovery is incomplete.
- Camera and world focus cite the same generation.
- Ground-contact queries never read released provider rows.
- Restart begins from deterministic rail/player state.
- Old-generation materialization cannot change new-generation readiness.
- Failure enters a recoverable blocked/error state, not a half-running exploration loop.
