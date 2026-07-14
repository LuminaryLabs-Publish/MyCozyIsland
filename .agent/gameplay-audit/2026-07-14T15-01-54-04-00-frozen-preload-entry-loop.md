# Gameplay audit: frozen preload entry loop

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

The game reaches a playable Core Startup state, then the bridge intentionally freezes engine advancement and presentation while the menu remains visible. Entry restores both and rewrites player intro state. That loop is not represented as one gameplay transition, so the repository cannot prove which player/input/world revision produced the first playable post-menu frame.

## Plan ledger

**Goal:** preserve preloaded world truth while making the transition from sleeping-ready to active-playable deterministic and replayable.

- [x] Trace readiness, freeze, entry and player preparation.
- [x] Identify world, player, input and scenario participants.
- [x] Identify missing revision and rollback evidence.
- [ ] Add a typed gameplay entry transaction.

## Current gameplay transition

```txt
Core Startup playable
  -> world and save are prepared
  -> engine tick/step are replaced
  -> renderer loop is stopped
  -> player remains in prepared state

Play
  -> engine methods restored
  -> renderer callback restored
  -> player snapshot rewritten to mode=intro, introProgress=0.76
  -> input clear(menu-enter)
  -> entered message posted
```

## Gameplay gaps

```txt
PlayableRevision: not carried into entry
WorldRevision: absent from entry result
PlayerRevision: absent from entry result
InputRevision: absent from entry result
ScenarioRevision: absent from entry result
first resumed tick receipt: absent
first accepted input frame: absent
player-intro settlement result: absent
atomic rollback: absent
replay journal: absent
```

`preparePlayerEntry()` catches and logs player/input/focus errors, allowing entry acknowledgement to continue even when intro preparation is incomplete.

## Required gameplay result

```txt
GameEntryCommand
  -> require accepted playable and suspension revisions
  -> prepare player intro and input-clear candidates
  -> restore engine advancement
  -> execute one deterministic step
  -> verify world, player, input and scenario snapshots
  -> atomically commit or restore the suspended predecessor
  -> publish GameEntryGameplayResult
  -> bind the result to the first resumed frame
```

## Acceptance cases

```txt
new game preload
restored save preload
normal entry
repeated entry
player snapshot load failure
input clear failure
stale playable descriptor
world revision change while suspended
page lifecycle interruption
retry after failed restoration
```

## Validation boundary

No gameplay behavior changed and no headless or browser entry fixture was executed.
