# Interaction Audit: Input Movement Result Fixture Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T19-09-44-04-00`

## Current interaction surface

```txt
resize event -> renderer/camera resize
keydown/keyup -> mutate keys Set
wheel -> preventDefault and mutate progress
pointerdown -> start drag
pointerup -> clear drag
pointermove -> mutate yaw below 0.85 or yaw/pitch above 0.985
progress < 0.985 -> rail camera
progress >= 0.985 -> first-person movement
valid(next) -> clearing radius and campfire keepout accept/reject
```

## Result gaps

```txt
Wheel updates do not record accepted or clamped status.
Pointer inactive transition band from 0.85 to below 0.985 has no explicit no-change reason.
Pointer-not-dragging silently returns.
Movement with no keys has no no-change row.
Movement rejection is silent.
Movement rejection does not distinguish clearing boundary from campfire keepout in readback.
No input result journal exists.
No deterministic camera rail sample fixture exists.
```

## Required vocabulary

```txt
status: accepted | rejected | no-change
reason:
  progress-updated
  progress-clamped-min
  progress-clamped-max
  pointer-look-first-person
  pointer-yaw-rail
  pointer-inactive-transition-band
  pointer-not-dragging
  movement-accepted
  movement-rejected-clearing-boundary
  movement-rejected-campfire-keepout
  movement-no-input
```

## Fixture rows

```txt
wheel delta accepted
wheel clamp min
wheel clamp max
pointer no drag
pointer rail yaw
pointer inactive transition band
pointer first-person yaw/pitch
movement no input
movement accepted
movement rejected clearing boundary
movement rejected campfire keepout
camera rail sample below threshold
first-person transition at 0.985
```

## Next ledge

Add browser-input action frames, input results, movement policy results, a compact input journal, deterministic rail samples, and `CozyIslandHost.getInputJournal()` without changing visible behavior.