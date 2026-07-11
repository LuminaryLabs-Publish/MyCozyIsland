# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T11-10-29-04-00`

## Summary

The current world wrapper cannot safely reset and prepare again. Its reset clears the pinned Core World runtime definitions, while the next prepare assumes the definition still exists.

## Reset and recovery gaps

```txt
soft reset policy: absent
hard teardown policy: implicit
terminal disposal state: absent
world generation: absent
world definition checkpoint: absent
world re-registration: absent
provider release result: absent
provider reset result: absent
materializer cancellation result: absent
reset/re-prepare transaction: absent
recovery fingerprint: absent
bounded recovery journal: absent
stale callback rejection: absent
```

## Concrete defect

- The world definition is registered once during wrapper construction.
- `reset()` calls `coreWorld.resetWorlds()`.
- The pinned implementation clears runtime definitions.
- Product state is marked unprepared.
- A later `prepare()` calls `setFocus(worldId)` without re-registering.
- Existing tests never call `reset(); prepare();` on the same wrapper.

## Provider-state gaps

- Core World calls provider release and provider reset, but product code receives no structured release ledger.
- Provider reset exceptions are swallowed by the pinned runtime.
- Product provider stores have no joined before/after fingerprint.
- Terrain materialization jobs are cleared separately from Core World provider release.
- No proof establishes that all seven provider stores are empty before re-registration.
- No generation fence prevents old provider or materializer work from writing after recovery.

## Snapshot and checkpoint gaps

- `getWorldSnapshot()` exposes coordination state only.
- The compatibility render snapshot is not a recovery checkpoint.
- Provider snapshots are not joined with product wrapper fields.
- Materializer partial rows and stage progress are not checkpointed.
- Focus accumulator and last-cell identity are not versioned.
- Scenario, environment, renderer, and world snapshots do not share one checkpoint ID.
- No rollback can restore the pre-reset world if re-registration or prepare fails.

## Lifecycle gaps retained

- No route-level session owner or session epoch.
- No startup acquisition/rollback stack.
- Input, timers, animation loop, renderer, volume textures, and global host are not leased by one session.
- `pagehide` invokes world disposal only.
- Terminal disposal does not mark the wrapper unusable or return a typed result.
- Rendering and materialization do not reject stale generations.

## Focus and materialization gaps retained

- `updateWorldFocus()` returns Boolean rather than a typed revision.
- Materialization has no world/focus/generation admission fence.
- Provider readiness is not a canonical version set.
- No elapsed-time work budget or classified provider failure result.
- Ready descriptors are still not consumed by visible cell-aware rendering.

## Render gaps

- Reset has no render freeze/retire handshake.
- The compatibility renderer can retain the old world while semantic state is cleared.
- No renderer generation identifies which world generation a frame consumed.
- No cell-resource rollback or first-visible-frame acknowledgement exists.
- Cell cache/disposal utilities are disconnected from the live route.

## Validation gaps

```txt
reset followed by prepare
reset after partial materialization
reset after focus crosses a cell
provider release failure
provider reset failure
re-registration failure
prepare failure after reset
rollback to preceding generation
stale materializer completion after reset
stale focus callback after reset
soft reset versus terminal dispose
idempotent dispose
disposed-command rejection
browser restart with one animation loop
renderer/world generation correlation
```

## Deployment blockers

```txt
reset semantics contradict reusable wrapper shape
no re-registration after definition-clearing reset
no release/reset diagnostics
no product checkpoint or rollback
no world generation or stale-work fence
no browser reset/restart fixture
```

## Not currently blocked by

- repository identity or main-branch policy;
- pinned Three.js and NexusEngine revisions;
- the 50 local kit descriptors;
- seven ordered providers;
- initial 49-cell preparation;
- deterministic focus selection;
- isolated lazy materialization;
- compatibility rendering;
- GitHub Pages configuration.
