# MyCozyIsland Interaction Audit

**Generated:** `2026-07-09T08-29-38-04-00`

## Current interaction loop

```txt
browser event listeners
  -> keydown/keyup mutate Set keys
  -> wheel mutates scroll progress directly
  -> pointerdown stores drag anchor
  -> pointermove mutates yaw before first-person and yaw/pitch after first-person
  -> pointerup clears drag
  -> frame chooses rail camera or first-person update
  -> first-person movement integrates W/A/S/D only after progress >= 0.985
  -> valid(next) accepts/rejects only clearing boundary and campfire keepout
```

## Interaction domains

```txt
keyboard-input-domain
wheel-progress-domain
pointer-drag-domain
pointer-look-domain
scroll-progress-domain
camera-rail-domain
first-person-movement-domain
movement-validity-domain
input-action-result-domain
input-journal-domain
```

## Current services

```txt
capture keyboard key state
capture wheel delta and clamp progress
capture pointer drag and yaw/pitch deltas
sample rail camera points and look targets
switch to first-person mode near progress >= 0.985
apply movement speed by dt
sample terrain height for eye position
reject movement outside clearing radius
reject movement too close to campfire
```

## Current gaps

```txt
No BrowserInputActionFrame exists.
No ActionResult exists for wheel, pointer, movement, or skipped movement.
No bounded InputJournal exists.
No movement rejection reason is recorded.
No CameraRailSnapshot exists.
No fixture rows cover start/mid/near/first-person rail states.
```

## Required action rows

```txt
wheel-progress-accepted
pointer-yaw-accepted
pointer-pitch-accepted
movement-skipped-before-first-person
movement-accepted
movement-rejected-clearing-boundary
movement-rejected-campfire-keepout
rail-start-sampled
rail-mid-sampled
rail-near-sampled
first-person-camera-active
```

## Consumer freeze rule

The next implementation should expose records without changing the actual control feel, thresholds, yaw/pitch multipliers, rail curve, or movement keepout behavior.
