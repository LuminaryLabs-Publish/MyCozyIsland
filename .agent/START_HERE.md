# START HERE: MyCozyIsland Adventure Persistence Authority

Last updated: `2026-07-12T08:00:16-04:00`

## Summary

`MyCozyIsland` has completed a major route cutover from the earlier camera-rail showcase to a NexusEngine-composed farming and foraging adventure. The new runtime installs world, input, scenario, inventory, farming, foraging, player, interaction, camera, save, and render-snapshot domains, then projects them through the existing WebGPU/WebGL2 island renderer.

The highest-priority gap is persistence truth. Idle frames continuously advance `player.revision`, the auto-save fingerprint includes that revision, and the host therefore writes localStorage every five seconds even when no durable gameplay value changed. Capture status is committed before the storage adapter succeeds, restore mutates domains sequentially without rollback, and the transaction ledger is restored while input frame identity is not.

## Plan ledger

**Goal:** make the new farming-adventure cutover persist only meaningful durable changes, commit storage truth only after the host write succeeds, restore atomically, preserve operation identity across reloads, and prove the first restored visible frame.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Prioritize only `MyCozyIsland` because 27 newer commits replaced the active route with a NexusEngine farming adventure after its previous audit.
- [x] Identify the complete interaction loop.
- [x] Identify all active domains.
- [x] Reconcile all engine-installed, world-generation, rendering, host, and retained legacy kits and their services.
- [x] Trace input, farming, foraging, transaction IDs, auto-save, localStorage, restore, reset, HUD projection, tests, and deployment.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh all required root `.agent` files and machine registry.
- [x] Push `LuminaryLabs-Publish/MyCozyIsland` directly to `main`.
- [x] Synchronize `LuminaryLabs-Dev/LuminaryLabs` on `main`.
- [x] Create no branch or pull request.
- [ ] Runtime fixes and executable persistence fixtures remain future work.

## Active route

```txt
index.html
  -> src/main-adventure.js?v=cozy-adventure-cutover-1
  -> src/adventure/composition-runtime.js
  -> NexusEngine domains
  -> existing procedural world and WebGPU/WebGL2 render services
```

## Read order

1. `current-audit.md`
2. `known-gaps.md`
3. `architecture-audit/2026-07-12T08-00-16-04-00-adventure-persistence-authority-dsk-map.md`
4. `persistence-audit/2026-07-12T08-00-16-04-00-autosave-restore-operation-continuity-contract.md`
5. `next-steps.md`
6. `validation.md`

## Main findings

```txt
idle simulation
  -> cozy-player revision increments every tick
  -> save fingerprint changes
  -> five-second host check writes localStorage indefinitely

save capture
  -> domain status becomes captured
  -> host attempts localStorage.setItem
  -> storage failure leaves domain status captured
  -> later HUD can still say Saved

restore
  -> world, ledger, scenario, inventory, farming, foraging and player mutate in sequence
  -> any late failure leaves a partially restored graph
  -> no candidate graph, rollback or replacement-session commit exists

reload continuity
  -> transaction ledger is restored
  -> cozy input state is not restored
  -> interaction operation IDs reuse input frame indices from zero
  -> old ledger entries can collide with new-session commands
```

## Next safe ledge

Implement `cozy-island-adventure-persistence-authority-domain` before expanding save slots or long-form progression. It must own semantic dirty detection, adapter-backed commit results, atomic candidate restore, input/transaction continuity, and restored-frame acknowledgement.
