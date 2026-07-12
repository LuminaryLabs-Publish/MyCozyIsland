# Gameplay Audit: Global Input Consumption Central Reconciliation

Timestamp: `2026-07-12T17-10-31-04-00`

## Summary

Gameplay consumers are renderer-neutral and deterministic once they receive an `InputFrame`, but the browser host can populate that frame from globally owned or mismatched events. The gameplay defect is therefore upstream admission, not player, interaction, Agriculture, Inventory, or camera logic.

## Plan ledger

**Goal:** preserve the complete gameplay consumption path while keeping DOM ownership outside gameplay domains.

- [x] Trace held movement and one-shot actions.
- [x] Trace input into player, interaction and camera state.
- [x] Identify the cross-domain evidence that is missing.
- [x] Keep Agriculture, Inventory and rendering outside browser ownership policy.
- [ ] Add typed consumer receipts.
- [ ] Add browser-level gameplay fixtures.

## Gameplay loop

```txt
admitted InputFrame
  -> player consumes movement, sprint, look and intro skip
  -> player updates terrain-constrained position, yaw, pitch and stamina
  -> interaction consumes seed-cycle, seed-select and interact actions
  -> interaction settles Agriculture or wild Foraging results
  -> camera derives intro or first-person view
  -> render snapshot projects player, objective, prompt, inventory and save state
```

## Current strengths

```txt
input frames are renderer-neutral
movement and interaction are separated
one-shot actions reject native key repeat
player movement queries canonical terrain constraints
Agriculture and Foraging transactions remain domain-owned
camera derives from committed player state
```

## Current gameplay risks

```txt
unfocused KeyW can advance player movement
unfocused KeyE can trigger contextual interaction
secondary pointer input can alter look direction
second pointer can disturb the active gesture
commands after blur clear can restore movement
repeated caller-supplied IDs can replay one-shot actions
no consumer proves which accepted commands it used
```

## Required consumer results

```txt
PlayerInputReceipt
  input frame revision
  consumed command IDs
  movement and look result
  player revision

InteractionInputReceipt
  input frame revision
  consumed command IDs
  selected action and target
  Agriculture or Foraging result ID
  interaction revision

CameraInputReceipt
  player revision
  input frame revision
  camera revision
```

## Boundary

The gameplay domains should consume only admitted renderer-neutral frames. They should not inspect DOM focus, pointer types, buttons, capture state, active elements, or browser visibility directly.