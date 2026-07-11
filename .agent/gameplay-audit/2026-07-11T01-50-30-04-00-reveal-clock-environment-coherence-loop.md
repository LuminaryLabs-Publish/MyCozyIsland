# Gameplay Audit: Reveal Clock and Environment Coherence Loop

Timestamp: `2026-07-11T01-50-30-04-00`

## Goal

Map the player-visible route loop against the simulation clock and environment semantics.

## Current loop

```txt
scroll reveal or clearing exploration
  -> RAF delta
  -> scenario.tick(dt)
  -> clock advances
  -> camera advances
  -> static semantic environment remains
  -> shader and elapsed-time presentation animates
  -> frame renders
```

The route is not a mission timer, but the clock still represents authoritative environment time. Reset also explicitly resets that clock.

## Current asymmetry

```txt
clock state:
  current

camera descriptor:
  current

illumination descriptor:
  construction time

wind-derived cloud/fog/vegetation/campfire descriptors:
  construction time

renderer animation:
  current presentation time
```

This means a player can spend time in the reveal or clearing while the reported clock advances without a corresponding semantic environment-frame transition.

## Reset impact

`scenario.reset()` resets clock and camera. It does not publish or apply an environment reset receipt because environment descriptors have no frame identity. Once dynamic environment consumption is implemented, reset must be atomic across session, clock, camera, environment frame, renderer consumers, and debug/host readback.

## Gameplay-safe policy

- keep the current subtle sunrise behavior
- use a declared low-frequency environment cadence if per-tick changes are unnecessary
- separate semantic environment changes from high-frequency shader animation
- preserve deterministic results across 30/60/120 Hz rendering
- do not retune visuals during authority implementation
