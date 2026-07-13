# Gameplay audit: unacknowledged entry fallback loop

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

Player entry is not one atomic transition. The game bridge resumes simulation and mutates player intro state before acknowledging entry, while the parent independently reveals the iframe after a fixed timeout if no acknowledgement arrives.

## Plan ledger

**Goal:** make simulation resume, player preparation, visible entry and shell transition one admitted gameplay boundary.

- [x] Trace the Play request to simulation resume.
- [x] Identify player-state mutation and input clearing.
- [x] Identify the independent parent timeout reveal.
- [x] Record missing rollback and terminal results.
- [ ] Add entry-generation fixtures and rollback behavior.

## Current gameplay loop

```txt
Play accepted by parent
  -> cozy-game-enter posted
  -> child restores tick and step
  -> child loads intro mode/progress into player
  -> child clears input and focuses renderer
  -> child marks menuEntered
  -> child posts entered
  -> parent reveals
```

If child preparation throws, the error is only warned and entry still proceeds. If the entered message is delayed or absent, the parent reveals after 900 ms. There is no detached candidate, rollback to frozen readiness, or typed partial-entry result.

## Missing gameplay authority

```txt
expected ready revision
entry attempt identity
single resume receipt
player snapshot before/after
input-clear receipt
preparation failure result
rollback to frozen-ready state
duplicate entry classification
post-resume frame result
terminal committed/degraded/failed state
```

## Required settlement

```txt
PlayerEntryCommand
  -> validate current ReadyResult
  -> snapshot frozen predecessor state
  -> resume simulation exactly once
  -> prepare player and clear input
  -> publish EntryPreparedResult
  -> wait for matching visible frame
  -> commit shell transition
  -> otherwise restore frozen predecessor or publish explicit degraded policy
```

## Validation boundary

No gameplay mutation, duplicate Play, preparation failure or rollback fixture was run.