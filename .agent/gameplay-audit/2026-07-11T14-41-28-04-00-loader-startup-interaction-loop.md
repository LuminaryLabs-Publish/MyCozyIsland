# Gameplay Audit: Loader and Startup Interaction Loop

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

The playable loop is gated by a loader whose percentage and completion state are presentation side effects rather than authoritative startup results. Input is installed only near the end of startup, but the loader can hide on timers without proving that the first frame or all consumers committed.

## Plan ledger

**Goal:** correlate the player's first admitted interaction with a committed startup generation and visible frame.

- [x] Trace loader stages and timer completion.
- [x] Trace input listener installation.
- [x] Trace animation-loop and global-host publication.
- [x] Identify missing readiness and retry admission.

## Current loop

```txt
page opens
  -> loader displays initial text
  -> startup mutates percentage labels
  -> input unavailable while main stages run
  -> listeners are installed
  -> loader completion timers are scheduled
  -> animation loop starts
  -> loader fades and hides
  -> user wheel/drag/key input mutates camera state
```

## Failure branches

```txt
static import failure
  -> main() never runs
  -> fail() never runs
  -> loader remains initial

startup-stage failure
  -> fail() writes error panel and loader text
  -> no rollback result
  -> no retry command
  -> partial resources may remain
```

## Missing gameplay authority

```txt
ready phase: implicit
first admissible input frame: absent
startup generation on input: absent
input-before-ready rejection result: absent
failure-to-retry transition: absent
first-frame and loader correlation: absent
```

## Required loop

```txt
StartupCommand
  -> LOADING phase with authoritative stage projection
  -> StartupReadyReceipt with firstFrameId
  -> ACTIVE interaction phase
  -> input commands carry startup/session generation

or

StartupFailedResult
  -> stable FAILED phase
  -> explicit RetryCommand
  -> new generation
```

## Acceptance conditions

- The loader reflects startup state, not arbitrary progress writes.
- No interaction is admitted before the ready receipt.
- Loader completion follows the first visible frame.
- Failed startup leaves no active input, loop or render resources.
- Retry creates a new generation and rejects old callbacks.