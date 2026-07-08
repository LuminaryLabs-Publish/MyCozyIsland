# Action Movement Proof Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-08T10-28-44-04-00`

## Current interaction loop

```txt
wheel event
  -> progress = clamp01(progress + deltaY * -0.0014)
  -> rail() samples camera position/look until first-person threshold

pointerdown / pointermove / pointerup
  -> drag state mutates
  -> if progress >= 0.985, player yaw and pitch mutate
  -> if progress < 0.85, player yaw mutates for orbit-style look

keydown / keyup
  -> keys Set mutates
  -> if progress >= 0.985, fp(dt) reads keys and tries movement

frame(now)
  -> computes dt
  -> moves sea
  -> calls fp(dt) or rail()
  -> updates smoke
  -> flickers fire
  -> drifts clouds
  -> renders scene
```

## Current movement gate

```txt
valid(next):
  max = central-clearing:campfire:collision-boundary.radiusMeters
  accept when distance from origin <= max
  accept when distance from origin >= 2.35
```

This is useful but too implicit for fixtures.

## Missing proof records

```txt
ActionFrame:
  needed for wheel, pointer, keyboard, and tick input normalization

ActionResult:
  needed for accepted / rejected / no-op / changed-state reporting

MovementPolicyResult:
  needed for first-person lock, clearing boundary, and campfire keepout decisions

InputJournal:
  needed to replay a short interaction sequence without DOM listeners

ActionJournal:
  needed to compare accepted/rejected state changes across replay runs

CozyIslandHostSnapshot:
  needed to expose route/source/action/movement/rail/cloud proof state additively
```

## Result reason families

```txt
accepted:
  wheel-progress-updated
  pointer-yaw-updated
  pointer-pitch-updated
  keyboard-movement-applied
  tick-frame-applied

rejected:
  locked-before-first-person
  no-directional-input
  clearing-boundary
  campfire-keepout
  route-version-mismatch
  malformed-action-frame

no-op:
  pointer-not-dragging
  pointer-progress-band-no-op
  empty-key-set
  zero-dt
```

## Fixture order

```txt
1. route token fixture proves hero-cloud-4 before any action fixture runs.
2. source profile fixture emits movement constants and rail constants.
3. wheel action fixture proves progress mutation as an ActionResult.
4. pointer action fixture proves yaw/pitch mutation and no-op bands.
5. keyboard-before-fp fixture rejects with locked-before-first-person.
6. keyboard-clearing fixture accepts movement inside radius.
7. keyboard-boundary fixture rejects outside clearing radius.
8. keyboard-campfire fixture rejects inside keepout radius.
9. tick fixture projects camera/cloud/smoke summary without a real renderer.
10. host snapshot fixture proves additive CozyIslandHost shape.
```

## Integration rule

Do not attach this proof flow directly to DOM events first.

Add pure helpers under `src/host-proof/`, run the DOM-free fixtures, and only then let `src/main-cloudform.js` translate browser events into the same `ActionFrame` shapes.

## Next implementation slice

```txt
MyCozyIsland Route Version Authority Sync + Host Proof Fixture Gate
```

Start with route-token sync because the existing docs still referenced `hero-cloud-3`, while the active route now uses `hero-cloud-4`.
