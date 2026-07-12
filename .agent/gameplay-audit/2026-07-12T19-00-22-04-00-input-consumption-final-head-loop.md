# Gameplay audit: input-consumption final-head loop

**Timestamp:** `2026-07-12T19-00-22-04-00`

## Summary

Player and interaction domains consume the normalized InputFrame correctly as renderer-neutral gameplay data, but they receive no receipt tying consumption to a current browser surface, focus generation or command-admission result.

## Plan ledger

**Goal:** preserve gameplay ownership while requiring proof that each consumed input frame was admitted by the current browser-input generation.

- [x] Preserve player ownership of movement, grounding, view and stamina.
- [x] Preserve interaction ownership of seed selection and contextual actions.
- [x] Preserve Agriculture, Inventory and Foraging ownership.
- [x] Identify missing input-consumption receipts.
- [ ] Add stale-generation rejection before gameplay consumption.
- [ ] Add exact consumer and visible-frame fixtures.

## Loop

```txt
InputFrame
  -> player movement/look/sprint/intro
  -> interaction seed/context action
  -> Inventory/Agriculture/Foraging settlement when accepted
  -> scenario and camera projection
  -> render snapshot
```

## Missing proof

```txt
PlayerInputConsumptionReceipt
InteractionInputConsumptionReceipt
input generation mismatch rejection
one-shot action idempotency result
command-to-transaction correlation
first visible gameplay frame acknowledgement
```

## Boundary

Browser ownership must not move into Agriculture, Inventory, Foraging, player or interaction. Those domains should consume only an admitted renderer-neutral InputFrame plus typed provenance.