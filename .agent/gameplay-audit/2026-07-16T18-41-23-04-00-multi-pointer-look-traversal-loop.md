# Gameplay audit: multi-pointer look and traversal loop

**Timestamp:** `2026-07-16T18-41-23-04-00`

## Plan ledger

**Goal:** prevent non-owner pointer evidence from changing the player's look direction or movement basis.

- [x] Trace pointer deltas through the input frame.
- [x] Trace look deltas into player yaw and pitch.
- [x] Confirm yaw also determines first-person movement direction.
- [x] Identify the missing owner and gesture revisions.
- [ ] Add deterministic traversal fixtures for mixed-pointer evidence.

## Current loop

```txt
pointer deltas
  -> input.lookX / input.lookY
  -> player yaw / pitch
  -> forward and right movement vectors
  -> constrained island movement
  -> camera descriptor
  -> rendered traversal frame
```

Because the host admits pointermove whenever any drag record exists, a secondary pointer can influence both camera orientation and the basis used by subsequent WASD movement. Any pointerup or pointercancel can also end the shared gesture.

## Required gameplay boundary

- Only an accepted owner pointer may publish look deltas.
- Secondary pointers must receive an explicit ignored, rejected or replacement result.
- Owner replacement must settle the previous gesture before the next is admitted.
- Lost capture, blur, hidden state, route retirement and preload transitions must terminate the matching gesture.
- Player and movement truth remain inside `cozy-player-domain-kit`.

No gameplay incident was reproduced. The gap is ownership and executable proof.