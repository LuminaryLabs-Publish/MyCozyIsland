# Interaction Audit: Input Movement Result Proof

**Timestamp:** `2026-07-10T04-29-10-04-00`

## Current browser interaction loop

```txt
keydown -> add e.code to keys
keyup -> delete e.code from keys
wheel -> clamp progress mutation
pointerdown -> start drag
pointerup -> clear drag
pointermove while not dragging -> implicit no-op
pointermove while progress < 0.85 -> yaw mutation
pointermove while 0.85 <= progress < 0.985 -> implicit no-op
pointermove while progress >= 0.985 -> yaw/pitch mutation
frame while progress < 0.985 -> rail camera
frame while progress >= 0.985 -> first-person movement
valid(next) -> clearing radius and campfire keepout gate
```

## Missing result records

```txt
wheel accepted/clamped rows
pointer not-dragging no-change row
pointer rail-yaw accepted row
pointer inactive transition-band row
pointer first-person look accepted row
movement no-input row
movement accepted row
movement rejected by clearing boundary row
movement rejected by campfire keepout row
camera rail sample row
first-person threshold transition row
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

## Next interaction gate

Create a DOM-free input fixture that can replay wheel, pointer, and movement frames against pure result helpers before browser splicing.
