# Interaction Audit: Input Movement Result Ledger

**Timestamp:** `2026-07-10T01-11-51-04-00`

## Current inputs

```txt
resize updates renderer and camera aspect
keydown adds code to keys
keyup removes code from keys
wheel mutates normalized progress directly
pointerdown starts drag
pointerup clears drag
pointermove mutates yaw or yaw/pitch depending on progress
```

## Current movement loop

```txt
if progress >= 0.985
  -> read WASD keys
  -> build movement vector
  -> move by 2.6 * dt
  -> sample terrain height
  -> valid(next)
  -> accept by copying player.position
  -> reject silently by keeping old position
```

## Missing result rows

```txt
wheel accepted
wheel clamped min
wheel clamped max
pointer not dragging
pointer rail yaw accepted
pointer inactive transition band
pointer first-person look accepted
movement no input
movement accepted
movement rejected clearing boundary
movement rejected campfire keepout
```

## Required result shape

```txt
{
  actionId,
  inputKind,
  status,
  reason,
  before,
  after,
  changedFields,
  sourceThresholds,
  timestampMode
}
```

## Interaction finding

The current route feels simple, but it is hard to validate because accepted, rejected, and no-change input paths are implicit. Add a deterministic input and movement result ledger before camera or controller tuning.
