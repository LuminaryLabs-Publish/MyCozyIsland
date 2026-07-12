# Gameplay Audit: Rail and First-Person Input Loop

Timestamp: `2026-07-12T06-51-27-04-00`

## Interaction loop

```txt
rail mode
  wheel -> progress along authored rail
  drag X -> yaw plus rail-orbit mutation
  drag Y -> pitch
  descriptor -> sampled rail position and look target

first-person threshold
  progress >= 0.985
  descriptor switches to two-meter eye height and 80-degree FOV

first-person mode
  W/S -> forward/backward
  A/D -> strafe
  Shift -> faster movement
  drag -> yaw/pitch
  terrain and clearing bounds constrain movement
```

## Gameplay authority gap

The control loop is split between browser event cadence and frame dt:

```txt
wheel and pointer
  mutate immediately per browser event

keyboard movement
  consumes held state per scenario tick
```

This means camera progress and look direction are event-cadence driven, while player translation is frame-time driven. No one input frame records the combined control intent.

## Source-backed divergence

### Wheel devices

`progress += deltaY * 0.00072` treats all delta units alike. Trackpads, line-mode wheels, and page-mode input can reach the first-person threshold at different physical rates.

### Pointer segmentation

Rail orbit clamps each pointer event before changing rail points. Equivalent total movement delivered in different event groupings can alter the authored path by different amounts.

### Focus transition

Blur clears held keys but does not explicitly retire drag state. Visibility and pointer-capture loss have no gameplay result.

## Required gameplay contract

```txt
normalized InputFrame
  -> rail/FPS mode policy
  -> camera and movement reducer
  -> movement-bounds result
  -> camera descriptor revision
  -> world-focus result
  -> visible-frame acknowledgement
```

## Required policy decisions

```txt
wheel units and sensitivity
rail progress direction and reversibility
pointer coalescing window
rail orbit maximum and whether it is reversible
first-person entry and exit admission
keyboard edge and hold mapping
focus, visibility, and capture-loss clear behavior
run-time sensitivity and invert-axis policy
```

## Acceptance conditions

```txt
equivalent device gestures create equivalent rail progress
pointer event frequency does not change rail geometry
first-person movement remains dt based
focus loss cannot leave movement or drag active
mode transitions produce typed results
camera and gameplay state cite one input revision
```