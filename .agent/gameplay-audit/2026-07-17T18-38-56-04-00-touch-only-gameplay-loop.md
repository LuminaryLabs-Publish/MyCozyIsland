# Gameplay Audit — Touch-Only Gameplay Loop

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Intended loop

```txt
enter island
  -> walk to a plot or coconut node
  -> select or cycle a seed
  -> till
  -> plant
  -> water
  -> harvest
  -> gather wild coconuts
  -> sprint and explore
  -> autosave changed state
```

## Implemented desktop action path

```txt
WASD -> move
Shift -> sprint
E -> interact
Q -> cycle seed
1-4 -> direct seed selection
Space/Enter -> skip intro
pointer drag -> look
wheel -> intro progression
```

## Touch-only path

```txt
pointer drag -> look
movement -> absent
sprint -> absent
interact -> absent
cycle/select seed -> absent
skip intro -> absent except passive time progression
```

The simulation and interaction domains are capable of the full loop, but the browser adapter does not expose those actions to a touch-only source. The game can render a nearby plot prompt while providing no touch command that settles the prompted action.

## Required gameplay contract — proposed

- The active device profile declares required gameplay actions.
- Every required action has at least one admitted source before playable entry.
- Missing optional actions may degrade; missing required actions block or clearly classify touch playability.
- One-shot actions cannot duplicate when touch and keyboard are used together.
- Held movement and sprint settle on pointer cancellation, focus loss, visibility change, and route/lifecycle transitions.
- Interaction and seed-selection results preserve operation IDs and existing transaction semantics.

## Non-finding

No desktop keyboard failure, touch-user incident, or broken Agriculture/Foraging transaction was reproduced. The gap is missing browser action coverage, not missing simulation capability.