# Gameplay audit: renderer loss non-interactive loop

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

Gameplay truth and presentation are cleanly separated, but no policy states what simulation and input should do when the active renderer is lost. The game can therefore lack a product-owned transition from playable interaction to recovery, pause, fallback or resumed play.

## Plan ledger

**Goal:** keep simulation, input and visible presentation coherent during renderer loss and recovery.

- [x] Trace input, simulation, snapshots and rendering.
- [x] Identify the missing renderer-loss gameplay policy.
- [x] Define required suspension and recovery results.
- [ ] Execute the policy with forced-loss fixtures.

## Normal loop

```txt
keyboard/pointer evidence
  -> cozy-input frame
  -> player, scenario, Agriculture, Foraging and interaction
  -> renderer-neutral frame snapshot
  -> Three.js world and DOM HUD projection
  -> visible presented frame
```

## Loss loop without product authority

```txt
accepted playable state
  -> renderer/device/context becomes unavailable
  -> simulation/input policy is unspecified
  -> held movement or interaction state may remain admitted
  -> visual feedback may stop or become stale
  -> no recovery mode or fallback route is accepted
  -> no result proves when play is safe again
```

This audit does not claim the simulation definitely continues after every browser or Three.js loss mode. It records that the product has no explicit, testable policy binding simulation and input to renderer-loss state.

## Required gameplay policy

```txt
RendererLossObservedResult
  -> clear held input
  -> reject new world-changing actions or enter declared bounded-headless mode
  -> preserve the latest accepted save and renderer-neutral snapshot
  -> expose recovery state through DOM
  -> attempt renderer reconstruction
  -> present one recovered frame
  -> resume simulation/input only after recovery acknowledgement
```

## Interaction safety

- Agriculture and Foraging settlement must not be accepted solely because a stale visual target remains on screen.
- Input should be cleared when the active renderer generation is retired.
- Recovery UI actions must remain separate from gameplay actions.
- Hidden preload must not publish successful entry until a fresh active frame exists.
- Save capture must identify whether it occurred during active, recovering or fallback presentation state.

## Validation boundary

No gameplay behavior changed and no forced-loss interaction fixture was run.