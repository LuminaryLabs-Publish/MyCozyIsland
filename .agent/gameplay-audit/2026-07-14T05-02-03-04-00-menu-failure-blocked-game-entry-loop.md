# Gameplay audit: menu failure blocks the playable loop

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The playable farming and foraging loop does not begin from the root route until the decorative menu presentation has successfully initialized. The menu is not merely a visual predecessor; it currently gates whether the game document is loaded at all.

## Plan ledger

**Goal:** preserve the intended menu-first experience while ensuring a menu-only failure cannot suppress the primary gameplay capability.

- [x] Trace root route to first playable game frame.
- [x] Trace menu failure to terminal user-visible state.
- [x] Separate optional shell presentation from primary gameplay readiness.
- [x] Define normal, degraded and terminal gameplay-entry modes.
- [ ] Implement independent preload and degraded entry.
- [ ] Prove the full gameplay loop after forced menu failure.

## Normal gameplay loop

```txt
menu prepares
  -> game preloads
  -> Core Startup becomes playable
  -> Play resumes the hidden game
  -> aerial intro settles into first-person movement
  -> WASD/drag controls move and look
  -> contextual targeting resolves plot or forage nodes
  -> E tills/plants/waters/harvests or gathers coconuts
  -> Inventory, Agriculture and Foraging settle results
  -> HUD and renderer-neutral frame snapshot update
  -> auto-save captures changed state
  -> loop continues
```

## Current blocked-entry loop

```txt
menu provider or renderer fails
  -> reportFailure disables Play, when reportFailure is reachable
  -> iframe src remains unset
  -> no Core Startup progress exists
  -> no save restore is attempted
  -> no world is constructed
  -> no input domain is admitted
  -> no gameplay frame can be rendered
  -> player cannot retry the game independently
```

## Semantic mismatch

The source architecture already treats game startup as a rich, self-validating operation:

```txt
renderer preparation
composition preparation
save continuation selection
world preparation
input preparation
first-frame admission
playable entry
```

The shell currently treats menu rendering as the prerequisite for starting that operation. This gives an optional presentation adapter stronger liveness authority than Core Startup.

## Target entry modes

### Normal

```txt
menu ready
+ game playable
-> show authored Play
-> normal crossfade
```

### Degraded menu

```txt
menu failed
+ game working
-> DOM loading copy remains available
-> project game progress
-> retain accessible retry/status controls

menu failed
+ game playable
-> enable Play without menu GPU surface
-> reveal current preloaded game
-> require first fallback-game frame acknowledgement
```

### Game failure

```txt
menu ready or degraded
+ game failed
-> preserve explicit game failure
-> allow game-preload retry without rebuilding a healthy menu
```

### Terminal shell failure

```txt
menu failed
+ game failed
-> show DOM-only terminal state
-> offer reload/retry/direct game navigation according to policy
```

## Gameplay-state constraints

```txt
one game preload attempt per current shell generation
one continuation-selection result per game startup revision
no duplicate save restore caused by menu retry
no duplicate engine composition caused by menu retry
no gameplay tick before Core Startup admission
no direct entry against stale or failed game attempt
no fallback success before a matching visible game frame
```

## Acceptance gameplay fixture

A browser fixture must force the menu renderer to fail, allow the iframe game to reach playable state, activate the fallback Play control, render a visible game frame, move the player, target a plot, perform one agriculture action and verify that the menu failure did not duplicate or corrupt game state.
