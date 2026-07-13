# Interaction audit: cross-window entry admission map

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The same-origin parent and iframe validate `event.source`, but their messages carry only string types and payloads. They do not carry shell, preload, startup, or entry generations, and the parent can reveal the game through a timer fallback without a terminal game result.

## Plan ledger

**Goal:** admit exactly one ready preload and one player entry while rejecting stale, duplicate, predecessor, and retired messages.

- [x] Inventory current message types and source checks.
- [x] Trace Play button and keyboard admission.
- [x] Trace ready, failure, enter, entered, and fallback reveal paths.
- [x] Identify missing command/result identity.
- [ ] Implement a revisioned cross-window protocol and terminal result model.

## Current protocol

```txt
iframe -> parent
  cozy-game-progress
  cozy-game-ready
  cozy-game-entered
  cozy-game-failed

parent -> iframe
  cozy-game-enter
```

Current checks:

```txt
parent accepts only event.source === frame.contentWindow
iframe accepts only event.source === window.parent
postMessage targetOrigin === location.origin
```

Missing fields:

```txt
protocolVersion
shellGeneration
preloadGeneration
startupLaunchId
entryAttemptId
expectedStateRevision
expectedPresentationRevision
terminal status
failure classification
cancellation/retirement reason
visibleFrameAck
```

## Current entry branches

```txt
ready message
  -> enable Play

Play or Enter/Space
  -> disable button
  -> send cozy-game-enter
  -> start 900 ms fallback timer

entered message
  -> reveal game

no entered message after 900 ms
  -> reveal game anyway

failed message
  -> show error only if it arrives before/independent of reveal state
```

## Required terminal results

```txt
PreloadResult
  Ready | Failed | Cancelled | Stale | Retired

PlayerEntryResult
  Entered | Failed | Cancelled | Stale | Retired
```

`Entered` must include the accepted entry generation, state revision, renderer submission receipt, and first visible game-frame acknowledgement. Timer expiry must produce `Failed` or `Cancelled`, not an accepted-looking reveal.

## Validation gap

Required fixtures include duplicate ready, delayed predecessor ready, source-valid but generation-stale messages, iframe reload, entry timeout, bridge exception, fallback rejection, rapid double activation, history reload, and visibility/page lifecycle transitions.