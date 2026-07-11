# Interaction Audit: First-Frame Materialization Admission

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

The route has no command that admits lazy work after the first visible frame. Materialization must not be added as an unguarded helper call because lifecycle, focus, reset, and render state can change around it.

## Current command map

```txt
browser RAF
  -> scenario.tick
  -> updateWorldFocus
  -> render

world wrapper
  -> processMaterializationFrame exists

connection
  -> absent
```

## Required command map

```txt
FirstFrameCommitted
  -> MaterializationFrameCommand
       sessionId
       sessionEpoch
       expectedWorldRevision
       frameSequence
       focus and camera mode
       row/cell/time budgets
  -> admission
  -> one bounded provider-stage step
  -> MaterializationFrameResult
  -> diagnostics
```

## Admission rules

Reject when:

```txt
runtime is preparing, stopping, stopped, or disposed
first compatibility frame is not acknowledged
session or epoch is stale
world revision is unexpected
focus is non-finite
budget is invalid
another materialization command owns the frame
reset or focus commit is in progress
```

## Interaction surfaces

```txt
renderer animation loop: command producer
world wrapper: authority adapter
Core World snapshot: active-cell source
provider stores: work targets
CozyIsland diagnostics: result projection
cell renderer: later readiness consumer
```

## Finding

The missing integration is not only a missing function call. It is a missing admission boundary between the route-owned frame loop and world-owned mutable provider jobs.
