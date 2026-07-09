# Interaction Audit: Input / Movement / Rail Result Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T05-30-27-04-00`

## Current interaction stack

```txt
keydown -> keys.add(e.code)
keyup -> keys.delete(e.code)
wheel -> progress = clamp01(progress + e.deltaY * -0.0014)
pointerdown -> drag start
pointerup -> drag clear
pointermove while drag:
  if progress >= 0.985 -> mutate player.yaw and player.pitch
  else if progress < 0.85 -> mutate player.yaw only
```

## Current camera / movement stack

```txt
progress < 0.985:
  rail()
    -> CatmullRomCurve3 camera position
    -> CatmullRomCurve3 look target
    -> camera.lookAt(p.look)

progress >= 0.985:
  fp(dt)
    -> derive forward/right vectors
    -> WASD movement vector
    -> candidate position = player.position + normalized input * 2.6 * dt
    -> n.y = sampleIslandHeight(n)
    -> if valid(n), copy candidate into player.position
    -> camera follows player eye
```

## Current movement validity rule

```txt
max = clearing.byId["central-clearing:campfire:collision-boundary"].state.radiusMeters
valid(next) returns:
  distance(next.x, next.z) <= max
  AND distance(next.x, next.z) >= 2.35
```

## Missing result authority

```txt
wheel input has no ActionResult
pointer input has no ActionResult
keyboard movement has no ActionResult
rejected movement has no reason code
rail sampling has no CameraRailSnapshot
first-person handoff has no explicit mode record
```

## Required reason catalog

```txt
scroll-progress-updated
pointer-yaw-updated
pointer-look-updated
pointer-ignored-not-dragging
pointer-ignored-progress-window
movement-accepted
movement-rejected-outside-clearing
movement-rejected-campfire-keepout
movement-ignored-no-input
camera-mode-rail
camera-mode-first-person
```

## Required fixture rows

```txt
initial-route:
  progress = 0
  mode = rail
  scrollProgress = 0

wheel-forward:
  deltaY negative
  progress increases and clamps to <= 1

wheel-back:
  deltaY positive
  progress decreases and clamps to >= 0

pointer-rail-yaw:
  drag active, progress < 0.85
  yaw changes, pitch unchanged

pointer-first-person-look:
  drag active, progress >= 0.985
  yaw and pitch change with pitch clamp

movement-accepted:
  progress >= 0.985
  candidate within clearing and outside campfire keepout

movement-rejected-outside-clearing:
  candidate beyond clearing boundary

movement-rejected-campfire-keepout:
  candidate inside 2.35m campfire keepout
```

## Next-cut modules

```txt
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
```

## Acceptance

```txt
No input behavior changes.
No camera rail behavior changes.
No movement threshold changes.
All changes are additive readback/proof surfaces.
```
