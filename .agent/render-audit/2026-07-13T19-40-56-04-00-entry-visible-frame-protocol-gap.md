# Render audit: entry visible-frame protocol gap

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Summary

The hidden game reports `cozy-game-entered` immediately after restoring engine methods and preparing player state. The parent may also reveal the iframe after 900 ms without any child acknowledgement. Neither path requires a post-resume renderer submission or a frame proven visible in the revealed iframe.

## Plan ledger

**Goal:** bind entry completion to the first game frame that cites the accepted preload and entry generations.

- [x] Trace entry request, simulation resume, player preparation, acknowledgement and reveal.
- [x] Separate semantic entry preparation from renderer submission.
- [x] Record the parent fallback path.
- [x] Identify missing frame provenance.
- [ ] Add renderer-derived frame receipts and a visible acknowledgement fixture.

## Current path

```txt
parent posts cozy-game-enter
  -> child restores engine.tick/step
  -> child resets intro state and clears input
  -> child posts cozy-game-entered
  -> parent reveals iframe and rewrites history
```

Fallback:

```txt
parent posts cozy-game-enter
  -> no entered acknowledgement within 900 ms
  -> parent reveals iframe anyway
```

## Missing evidence

```txt
EntryAttemptId
post-resume simulation revision
post-resume render snapshot revision
renderer/device generation
frame submission ID
iframe visibility generation
canvas presentation result
FirstVisibleGameFrameAck
fallback reveal terminal classification
last known complete menu/game frame
```

## Required frame transaction

```txt
EntryPreparedResult
  -> admit one post-resume render snapshot
  -> submit one game frame under EntryAttemptId
  -> verify current iframe and canvas generations
  -> reveal the iframe
  -> receive first visible game-frame acknowledgement
  -> commit history/focus and begin menu retirement
```

A timeout must return `TimedOut` or `Degraded`, not silently impersonate `Entered`. The parent may choose a degraded reveal policy, but that policy must remain distinguishable from a renderer-confirmed entry.

## Validation boundary

No browser frame, canvas readback, visibility observation or GPU submission fixture was executed.