# Sequence Authority Audit: Authored Rail Baseline Reset Contract

Timestamp: `2026-07-11T00-10-28-04-00`

## Source authority

The seven rail positions and seven look targets are authored sequence data. They should remain immutable for the lifetime of the route revision.

## Current violation

`input.drag()` loops over `railPositions` and increments each point's X coordinate. That turns a user interaction into a permanent source-data mutation. `reset()` does not reconstruct or copy the original points.

## Target state split

```txt
authored baseline:
  route revision
  positions
  look targets
  baseline fingerprint

runtime sequence state:
  progress
  yaw
  pitch
  orbit offset
  player position
  pressed keys
  revision
  reset count
```

Sampling should combine baseline plus runtime offset without writing into baseline rows.

## Reset transaction

```txt
capture before state
validate baseline
clear transient input
restore progress/yaw/pitch/orbit/player
verify descriptor fingerprint
commit revision/reset count
return typed result
```

If verification fails, the transaction should report failure and preserve or restore the prior valid state rather than partially resetting.

## Acceptance criteria

- baseline objects are deeply frozen or privately copied and never mutated
- every descriptor is derived from baseline plus explicit runtime state
- reset returns exact construction fingerprint
- repeated reset is idempotent
- repeated drag/reset cycles never accumulate offset
- scenario reset correlates clock and camera results