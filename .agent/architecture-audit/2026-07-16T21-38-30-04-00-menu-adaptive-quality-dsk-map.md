# Architecture Audit — Menu Adaptive Quality DSK Map

## Current ownership

```txt
MENU_SCENE_RECIPE
  -> art direction
  -> quality tier budgets
  -> camera profiles
  -> interaction constants

chooseMenuQuality
  -> backend classification
  -> initial viewport/DPR/CPU heuristic
  -> one immutable tier result

createMenuThreeRenderer
  -> renderer/backend initialization
  -> tier-bound scene-resource allocation
  -> resize and responsive framing
  -> animation loop and disposal
```

## Current gap

Quality admission occurs once before the scene is built. Runtime frames provide no feedback into quality policy, and resize does not re-admit a tier or replace tier-bound geometry, particles, shadows or post effects.

## Proposed parent domain

`cozy-island-menu-frame-budget-adaptive-quality-authority-domain`

## Proposed DSK families

- **Admission:** backend, viewport, DPR, hardware and recipe revision validation.
- **Evidence:** CPU frame cost, GPU completion, missed frames and lifecycle filtering.
- **Policy:** overload/recovery hysteresis and transition cooldown.
- **Transition:** DPR, shadows, particles, geometry and post budgets.
- **Lifecycle:** generation-bound resource replacement and retirement.
- **Results:** admission, transition and first matching frame acknowledgements.
- **Proof:** real-browser resize, DPR, overload and recovery fixtures.

The authority must preserve the existing declarative recipe and renderer ownership. It should coordinate budgets rather than move rendering into simulation or browser-event handlers.