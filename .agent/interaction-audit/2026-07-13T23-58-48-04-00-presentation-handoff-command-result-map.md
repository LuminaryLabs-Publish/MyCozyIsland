# Interaction audit: presentation handoff command and result map

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Summary

Play currently causes one cross-window message, immediate child-side resume/preparation, an early entered message and a parent-owned timeout fallback. The interaction has no immutable command identity or terminal result that joins protocol admission, game resume, first frame, crossfade and menu retirement.

## Plan ledger

**Goal:** turn Play into one observable command with one terminal result while retaining existing ownership boundaries.

- [x] Map user input to every participant mutation.
- [x] Separate protocol, gameplay, renderer and shell receipts.
- [x] Define terminal result classes.
- [ ] Implement command identity and participant preparation.
- [ ] Replace anonymous fallbacks with explicit policy results.

## Current map

```txt
click or Enter/Space
  -> requestEntry()
  -> post { type: cozy-game-enter }
  -> child enterGame()
  -> resumeSimulation()
  -> resumePresentation()
  -> preparePlayerEntry()
  -> post cozy-game-entered
  -> parent revealGame()
  -> add is-entering
  -> reveal/focus/history
  -> delayed menu renderer disposal

parallel fallback
  -> 900 ms timer
  -> revealGame() when no entered message
```

## Required command

```txt
PresentationHandoffCommand
  commandId
  shellGeneration
  iframeGeneration
  preloadAttemptId
  entryAttemptId
  expectedReadyRevision
  menuSurfaceGeneration
  gameSurfaceGeneration
  overlapPolicyRevision
```

## Required participant results

```txt
ProtocolEntryAdmissionResult
GameEntryPreparationResult
GamePresentationResumeResult
FirstResumedGameFrameAck
CrossfadeStartResult
MenuComputeStopResult
MenuFrameStopResult
MenuResourceRetirementResult
PublicCapabilityRevocationResult
HistoryFocusCommitResult
PresentationHandoffResult
```

## Terminal classifications

```txt
Entered
EnteredDegraded
Failed
TimedOut
Cancelled
Stale
Duplicate
Superseded
PartiallyRetired
Retired
```

## Required ordering

```txt
admit Play
  -> prepare game resume
  -> acknowledge first resumed frame
  -> start bounded crossfade
  -> retire menu compute/frame/resources
  -> revoke menu capability
  -> commit history/focus
  -> publish terminal result
```

A product policy may intentionally reveal before complete retirement, but that must return `EnteredDegraded` with outstanding participant receipts rather than appearing identical to success.

## Input and lifecycle races

```txt
double click or repeated keyboard activation
ready message after Play
900 ms fallback racing entered message
reduced-motion zero-delay retirement
resize during retirement
pagehide during crossfade
iframe reload during resume
late menu animation callback
```

## Validation boundary

No browser command/result fixture exists. Static source checks prove message names and source markers only.