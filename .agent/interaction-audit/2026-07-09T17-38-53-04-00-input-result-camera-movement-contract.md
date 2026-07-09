# My Cozy Island Input Result and Camera/Movement Contract Audit

**Timestamp:** `2026-07-09T17-38-53-04-00`

## Current input authority

```txt
keydown / keyup
  -> mutate keys Set

wheel
  -> preventDefault
  -> progress = clamp01(progress + deltaY * -0.0014)

pointerdown
  -> start drag position

pointermove while dragging
  -> progress >= 0.985: mutate yaw and clamped pitch
  -> progress < 0.85: mutate yaw only
  -> 0.85 <= progress < 0.985: no pose mutation

frame
  -> progress >= 0.985: fp(dt)
  -> otherwise: rail()
```

## Current movement authority

```txt
WASD keys
  -> derive forward/right vector
  -> normalize and multiply by 2.6 * dt
  -> sample terrain height
  -> valid(next)
  -> accepted: copy next position
  -> rejected: silently retain previous position
```

`valid(next)` only checks two radial constraints:

```txt
inside clearing collision-boundary radius
outside 2.35 meter campfire keepout
```

## Gaps

```txt
no normalized input action frame
no accepted/rejected/no-change result
no reason catalog for clamped progress, ignored pointer range, or rejected movement
no input journal
no deterministic rail sample snapshot
no first-person camera result snapshot
no proof that rejected movement leaves state unchanged
no fixture for threshold transitions at 0.85 and 0.985
```

## Recommended result model

```js
{
  action: { type, timestamp, payload },
  accepted: true | false,
  changed: true | false,
  reason: "accepted" | "clamped" | "inactive-range" | "outside-clearing" | "campfire-keepout" | "no-input",
  before: { progress, player, cameraMode },
  after: { progress, player, cameraMode }
}
```

## Fixture rows

```txt
wheel increases progress
wheel clamps at 0
wheel clamps at 1
pointer yaw before 0.85
pointer ignored from 0.85 to below 0.985
pointer yaw/pitch in first-person
pitch clamps at -1.1 and 1.0
camera rail sample at 0, 0.5, 0.9849
first-person transition at 0.985
movement accepted inside clearing
movement rejected outside clearing
movement rejected inside campfire keepout
rejected movement preserves player state
```

## Next kits

```txt
browser-input-action-frame-kit
input-result-kit
input-result-journal-kit
movement-policy-result-kit
camera-rail-snapshot-kit
```

The first implementation should extract pure calculations without changing event wiring or visible camera behavior.
