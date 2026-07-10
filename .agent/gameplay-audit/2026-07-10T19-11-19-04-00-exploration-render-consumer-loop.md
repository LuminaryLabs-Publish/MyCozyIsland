# Gameplay Audit: Exploration and Render Consumer Loop

Timestamp: `2026-07-10T19-11-19-04-00`

## Core interaction loop

```txt
startup reveal on camera rail
  -> first-person clearing exploration
  -> wheel and drag camera control
  -> keyboard movement
  -> deterministic scenario tick
  -> camera projection
  -> scenic world rendering
  -> continuous exploration without combat, score, or fail state
```

## Grass role

Grass is presentation support for the exploration loop. It communicates terrain softness, scale, and proximity but does not own gameplay state.

The current grass renderer consumes startup source rows once and remains static. This is acceptable for the present interaction model, provided that the static policy is explicit and inspectable.

## Gameplay/render separation

```txt
scenario owns camera and movement state
vegetation domain owns grass source rows
layered grass consumer owns visual projection
host should expose readback without moving authority into gameplay
```

## Current coupling risk

Because the source-consumption result is absent, future gameplay additions such as clearing grass, interaction volumes, quality-driven density, or scene reloads could mutate renderer-local state without a stable source authority.

## Decision

Do not add grass gameplay. First establish a source ledger and resource owner so future interaction can compose against a documented boundary.