# Gameplay Audit: Camera Focus and Lazy Cell Work Loop

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

Camera motion can update Core World focus and active descriptors, but it cannot cause heavy cell data to materialize in the live game because the animation loop never steps the scheduler.

## Current loop

```txt
rail or first-person camera
  -> scenario tick
  -> camera position
  -> updateWorldFocus(position, mode, dt)
  -> Core World active-cell descriptors may change
  -> scheduler sync occurs inside focus commit
  -> no scheduler advance
  -> compatibility island renders unchanged
```

## Gameplay consequences

```txt
player movement does not warm nearby provider data
newly active cells remain queued
released cells disappear from scheduler state only when sync runs
manual play cannot validate cell readiness
static visuals hide the missing world-work path
```

## Required gameplay contract

```txt
accepted focus revision
  -> current active-cell generations
  -> materialization priority centered on current gameplay focus
  -> bounded work while gameplay remains responsive
  -> stale/released work rejected
  -> readiness observation available to diagnostics
```

## Required scenarios

```txt
rail mode prioritizes origin
first-person mode prioritizes camera focus
cross one cell boundary
rapidly cross and return
reset during partial terrain
release during classification
pause/stop/dispose during work
resume with current epoch only
```

## Finding

Focus selection and heavy cell readiness are now separate systems, but no gameplay-owned command joins them. The new scheduler must consume accepted focus identity rather than raw camera state alone.
