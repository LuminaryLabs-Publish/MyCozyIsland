# Gameplay audit: adaptive-quality frame loop

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Interaction loop

```txt
player enters from menu
  -> startup prepares renderer and domains
  -> first playable frame presented
  -> keyboard/pointer/wheel commands admitted
  -> adventure.tick(dt)
  -> player, interaction, Agriculture, Foraging and scenario settle
  -> world/gameplay/HUD descriptors update
  -> frame time sampled
  -> quality level may degrade or recover
  -> render effects are projected
  -> post pipeline presents frame
  -> changed state autosaves
```

Adaptive quality does not alter game rules, but it controls whether the interaction loop remains readable and responsive under sustained load.

## Current quality behavior

- Frame time is sampled every animation frame.
- Degradation requires 90 sustained over-budget samples.
- Recovery requires 360 sustained under-budget samples.
- Level is bounded to `0..2`.
- Gameplay simulation continues while visual effects change.
- Degradation reduces cloud/fog work and renderer DPR.
- Recovery restores cloud/fog work but not renderer DPR.

## Gameplay-facing consequence

The logical quality state can recover while the visible world remains at a lower physical resolution. This does not block farming or foraging, but it can make prompts, distant targets, vegetation edges and interaction readability inconsistent with the reported quality level.

## Required settlement — proposed

```txt
frame budget evidence
  -> accepted quality transition
  -> complete effect plan
  -> apply all effects exactly once
  -> read back actual renderer state
  -> render one matching frame
  -> acknowledge quality generation
```

No gameplay code was changed and no gameplay degradation was reproduced.