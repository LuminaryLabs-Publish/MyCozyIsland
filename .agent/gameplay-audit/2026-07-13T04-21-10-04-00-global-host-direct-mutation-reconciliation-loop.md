# Gameplay audit: global-host direct-mutation reconciliation loop

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

The normal game loop is the intended writer, but the public browser host exposes `adventure.tick`, raw engine services, Inventory mutation, Foraging harvest, snapshot load, save restore and multi-domain reset. External calls can become an untracked second writer.

## Plan ledger

**Goal:** make every externally requested gameplay effect pass through one admitted, revision-checked and result-producing command.

- [x] Trace normal input to simulation and presentation.
- [x] Trace public access to representative mutating services.
- [x] Identify missing command identity, sequence and expected revisions.
- [x] Identify missing participant receipts and reset confirmation.
- [ ] Route permitted support/debug effects through the capability authority.
- [ ] Reject raw direct mutation.

## Current loop

```txt
normal writer
  browser input
    -> cozy-input queue
    -> adventure.tick
    -> player / interaction / Agriculture / Foraging / Inventory transitions
    -> renderer-neutral frame
    -> visible frame

unowned writer
  same-realm caller
    -> globalThis.CozyIsland
    -> tick, enqueue, clear, add, remove, harvest, loadSnapshot, restore or resetAll
    -> no caller, command, predecessor or result identity
    -> next normal frame projects the resulting state
```

## Missing gameplay evidence

```txt
expected runtime and domain revisions
single-writer admission
command deduplication
stale command rejection
cross-domain prepare/commit/rollback
changed-participant receipts
reset scope and confirmation
terminal rejection after host revocation
first visible effect acknowledgement
```

## Required policy

Public projections remain detached and read-only. Mutating debug or support operations must be explicit capabilities and must delegate to the existing owning domain rather than copying gameplay logic into the host authority.

## Validation boundary

Documentation only. No gameplay, input, Agriculture, Inventory, Foraging, save or reset behavior changed.