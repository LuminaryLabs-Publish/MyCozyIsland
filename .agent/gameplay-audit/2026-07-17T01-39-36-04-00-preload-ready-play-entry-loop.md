# Gameplay audit — Preload, ready, Play and entry loop

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Player-facing loop

```txt
open game
  -> watch the menu while the island prepares
  -> see Preparing 1..99%
  -> background game becomes playable
  -> Play becomes enabled
  -> activate Play
  -> enter the prepared island without a second load
```

The product loop is strong: the hidden game owns factual readiness, freezes at playable state, and resumes only on entry.

## Current settlement order

```txt
background game playable
  -> freeze game simulation
  -> freeze game presentation
  -> announce ready
  -> menu marks ready
  -> menu requests higher ready presentation budget
  -> menu enables Play
  -> next menu frame may commit later
  -> player may activate entry
```

## Gameplay risk boundary

The simulation is already frozen before ready, so the finding is not a deterministic gameplay-state defect. The unresolved boundary is the player-facing transition into gameplay:

- Play readiness is factual for the game, but not yet converged with the menu's ready presentation generation.
- Immediate activation can retire the menu before a post-preload frame is acknowledged.
- Entry carries no ready-generation identity proving that the game resume and menu retirement belong to the same admitted handoff.
- Duplicate ready or entered messages settle through booleans rather than typed apply-once results.

## Required gameplay result chain

```txt
GamePreloadReadyAdmissionResult
  -> MenuPresentationBudgetTransitionResult
  -> FirstReadyMenuFrameAck
  -> PlayGateAdmissionResult
  -> EntryHandoffResult
```

## Acceptance criteria

- The game remains the sole source of factual playable readiness.
- Play cannot enable from progress alone.
- The ready menu frame must bind the same preload session and continuation.
- Immediate pointer, touch or keyboard activation must settle once.
- Entry must resume the prepared game once.
- Fallback entry timeout must not create a second generation.
- Menu disposal must retire all later ready-frame work.
- Reduced-motion entry may skip animation duration but not identity or settlement checks.

No player-facing failure was reproduced.