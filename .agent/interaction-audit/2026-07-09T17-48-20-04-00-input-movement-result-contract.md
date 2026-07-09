# Input and Movement Result Contract

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T17-48-20-04-00`

## Current interaction ownership

`src/main-cloudform.js` installs all browser event handlers and mutates runtime state directly.

```txt
resize -> renderer size and camera aspect
keydown -> add code to Set
keyup -> remove code from Set
wheel -> mutate progress with clamp
pointerdown -> start drag
pointerup -> clear drag
pointermove -> mutate yaw or yaw/pitch depending on progress
frame -> apply rail camera or first-person movement
```

## Current policy matrix

| Input | Condition | Current behavior | Missing result |
|---|---|---|---|
| Wheel | Any progress | Adds `deltaY * -0.0014`, then clamps 0..1 | Accepted vs clamp-min vs clamp-max |
| Pointer move | No drag | Returns silently | `pointer-not-dragging` |
| Pointer move | Progress `< 0.85` | Mutates yaw | `pointer-yaw-rail` |
| Pointer move | `0.85 <= progress < 0.985` | Returns without mutation | `pointer-inactive-transition-band` |
| Pointer move | Progress `>= 0.985` | Mutates yaw and clamped pitch | `pointer-look-first-person` plus pitch clamp facts |
| WASD | Progress `< 0.985` | Keys are tracked but movement consumer does not run | `movement-disabled-rail-mode` |
| WASD | Progress `>= 0.985`, no movement keys | No pose change | `movement-no-input` |
| WASD | Candidate inside clearing and outside campfire keepout | Player position changes | `movement-accepted` |
| WASD | Candidate outside clearing boundary | Position unchanged | `movement-rejected-clearing-boundary` |
| WASD | Candidate inside campfire keepout | Position unchanged | `movement-rejected-campfire-keepout` |

## Current camera policy

```txt
progress < 0.985:
  build six camera positions and six look targets
  sample Catmull-Rom curves using eased progress
  copy position and lookAt target into camera

progress >= 0.985:
  calculate eye from sampled terrain height + eyeHeight
  calculate look vector from yaw/pitch
  copy eye and lookAt target into camera
```

The rail is deterministic for a fixed player pose and progress, but no snapshot fixture exists.

## Target action frame

```txt
{
  sequence,
  timestampMode: "fixture" | "runtime",
  inputType: "wheel" | "pointer" | "keyboard" | "movement",
  payload,
  context: {
    progress,
    dragging,
    yaw,
    pitch,
    keys,
    position
  }
}
```

## Target result

```txt
{
  sequence,
  action,
  status: "accepted" | "rejected" | "no-change",
  reason,
  before,
  after,
  changedFields,
  policyFacts
}
```

## Required pure policies

```txt
applyWheelProgress(beforeProgress, deltaY)
applyPointerDrag(beforePose, dragState, pointerDelta, progress)
evaluateMovement(beforePosition, movementVector, dt, policy)
sampleRailCamera(playerPose, progress, campfireY)
sampleFirstPersonCamera(playerPose, terrainHeight)
```

## Fixture matrix

```txt
wheel positive/negative accepted rows
wheel clamp to 0
wheel clamp to 1
pointer without drag
pointer in rail-yaw band
pointer in inactive transition band
pointer in first-person band
pointer pitch clamp low/high
movement no-input
movement accepted forward/back/left/right
movement clearing-boundary rejection
movement campfire-keepout rejection
rail samples at 0, 0.25, 0.5, 0.85, 0.9849
first-person transition at 0.985
```

## Compatibility rule

The extracted policies must preserve exact thresholds, signs, speeds, and camera output before any tuning:

```txt
wheel multiplier: -0.0014
rail yaw multiplier: -0.0045
first-person yaw/pitch multiplier: -0.0025
pitch clamp: -1.1 to 1
rail/first-person threshold: 0.985
rail pointer upper threshold: 0.85
movement speed: 2.6 units/second
campfire keepout radius: 2.35
```

## Next safe ledge

```txt
Browser Input Result Journal + Deterministic Camera/Movement Fixture
```