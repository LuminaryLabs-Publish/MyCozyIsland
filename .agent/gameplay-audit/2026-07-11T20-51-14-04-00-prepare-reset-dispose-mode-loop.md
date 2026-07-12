# Gameplay Audit: Prepare / Reset / Dispose Mode Loop

Timestamp: `2026-07-11T20-51-14-04-00`

## Summary

The gameplay host treats both world modes as interchangeable, but their lifecycle loops diverge after reset or disposal. This makes restart, recovery and future mode-fallback behavior dependent on implementation details rather than a declared contract.

## Plan ledger

**Goal:** map the player-visible lifecycle consequences of prepare, reset and disposal in legacy and Core modes.

- [x] Trace world-mode selection.
- [x] Trace both wrapper branches.
- [x] Trace camera, focus and materialization calls.
- [x] Identify restart and recovery divergence.
- [x] Define a mode-neutral lifecycle loop.

## Current loops

```txt
legacy
  startup -> prepare -> scenario/render
  reset/dispose -> prepared=false
  prepare -> usable again

core
  startup -> register definition -> prepare 49 cells -> scenario/render
  reset -> definitions and provider coordination cleared
  dispose -> reset plus Core World domain reset
  later prepare -> no guaranteed registered world
```

## Player-facing risks

```txt
restart can work in legacy and fail in core
mode fallback can change lifecycle semantics
stale camera/materialization work can target a retired generation
rendering can continue from a compatibility snapshot after world disposal
recovery UI cannot distinguish resettable, failed or terminal state
```

## Required loop

```txt
StartWorld
  -> READY generation N
  -> gameplay/focus/materialization

ReusableReset
  -> freeze generation N
  -> retire active work
  -> recreate/retain admitted definition by policy
  -> READY generation N+1
  -> acknowledge first playable frame

TerminalDispose
  -> retire generation N
  -> DISPOSED
  -> reject all gameplay, focus, materialization and query commands
```
