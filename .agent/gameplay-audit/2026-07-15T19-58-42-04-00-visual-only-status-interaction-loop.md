# Gameplay audit: visual-only status and interaction loop

**Timestamp:** `2026-07-15T19-58-42-04-00`

## Summary

Accepted gameplay state is available in the frame snapshot, but several player-critical values have no stable semantic representation.

## Plan ledger

**Goal:** expose gameplay meaning without announcing continuous telemetry every frame.

- [x] Trace objective, resources, stamina, seed selection, prompt and save status.
- [x] Separate queryable values from announceable transitions.
- [x] Define meaningful-change admission.
- [ ] Implement and test with keyboard and assistive technology.

## Current loop

```txt
movement/agriculture/foraging/interaction settles
  -> HUD descriptor publishes values
  -> visual text, bar width and selected class update
  -> no semantic snapshot/result
```

## Player-critical state

```txt
objective
selected seed and amount
food count
coconut count
stamina
current interaction target and prompt
last accepted interaction result
save status
```

## Announcement policy

Continuous stamina and resource telemetry should remain queryable but quiet. Objective changes, newly available interactions, accepted harvest/gather results, save failures and startup failures should be authored transitions with duplicate suppression.
