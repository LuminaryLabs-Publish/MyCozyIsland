# Gameplay Audit: Reveal, Drag, Reset, Exploration Loop

Timestamp: `2026-07-11T00-10-28-04-00`

## Loop

```txt
scroll wheel advances or reverses reveal progress
pointer drag changes yaw/pitch
pointer drag during reveal also offsets rail positions
progress >= 0.985 enables first-person movement
WASD moves within clearing bounds
Shift increases speed
scenario tick advances clock and camera state
```

## State transitions

```txt
rail
  -> wheel progress
  -> optional drag mutation
  -> first-person threshold
  -> constrained exploration
  -> scenario reset
  -> rail
```

The final transition is not a full return to the original rail because mutated control points survive reset.

## Gameplay risk

- restart/replay can begin with a shifted cinematic path
- repeated retries can accumulate different framing
- deterministic route comparison can fail despite identical seed and scalar state
- a future New Session command would inherit stale sequence geometry

## Required invariant

```txt
construction camera state
  == reset camera state
  == reset state after N arbitrary accepted interactions
```

The gate is fidelity, not a camera-feel redesign.