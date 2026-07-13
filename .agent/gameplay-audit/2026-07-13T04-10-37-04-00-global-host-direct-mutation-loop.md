# Gameplay audit: global host direct-mutation loop

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

The global host allows gameplay state to be mutated outside the normal browser-input and NexusEngine frame path. Representative exposed services can enqueue input, change Inventory, harvest Foraging nodes, restore snapshots or reset all durable participants.

## Plan ledger

**Goal:** keep gameplay mutation single-writer, revision-bound and attributable even when support or test control is enabled.

- [x] Trace the normal input-to-frame gameplay path.
- [x] Trace public access to input, Inventory, Foraging and save/reset services.
- [x] Identify direct mutation and second-writer gaps.
- [x] Define gameplay participant receipts.
- [ ] Implement and execute command-admission fixtures.

## Normal loop

```txt
browser event
  -> input adapter
  -> cozy-input queue
  -> admitted InputFrame
  -> player and interaction systems
  -> Agriculture/Foraging/Inventory transaction services
  -> renderer-neutral frame
```

## Public-host loop

```txt
caller obtains CozyIsland
  -> input.enqueue* / inventory.add|remove|applyChanges
     / foraging.harvest / save.restore / resetAdventure
  -> direct domain or multi-domain mutation
  -> no host capability command or expected revision
  -> no caller identity or bounded journal
  -> normal simulation and rendering continue
```

## Reachable consequences

```txt
second tick writer
  -> external adventure.tick or engine.tick interleaves with animation-loop tick

direct resource mutation
  -> Inventory/Foraging state changes without browser interaction provenance

snapshot mutation
  -> load/restore can replace multiple participant revisions while the host is running

direct reset
  -> transaction, world, scenario, Inventory, Agriculture, Foraging, player and interaction reset
  -> no confirmation, lifecycle generation or first reset-frame receipt
```

These are source-derived reachable paths, not claims of production misuse.

## Required gameplay result

```txt
PublicCapabilityResult
  command ID
  caller/source
  runtime and run generation
  capability and scope
  expected and committed participant revisions
  changed domains
  transaction IDs
  accepted/rejected/failed reason
  rollback result
  first visible effect frame
```

## Required fixtures

```txt
external tick rejected while host loop owns clock
Inventory mutation requires capability and operation ID
Foraging mutation requires capability and current node revision
snapshot restore requires paused lifecycle and participant barrier
reset requires confirmation and new generation
duplicate command applies once
stale command applies zero mutations
visible frame cites committed result
```

## Non-claims

No gameplay, Agriculture, Inventory, Foraging, input, save or reset behavior changed.
