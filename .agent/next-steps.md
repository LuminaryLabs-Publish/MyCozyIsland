# Next Steps: MyCozyIsland Adventure Persistence Authority

Last updated: `2026-07-12T08:00:16-04:00`

## Goal

Implement one session-scoped persistence authority that writes only semantic durable changes, reports storage truth, restores atomically, preserves command identity across runtime generations, and proves the restored frame.

## Ordered implementation checklist

- [ ] Add `cozy-island-adventure-persistence-authority-domain`.
- [ ] Define a versioned durable-state schema separate from render and transient state.
- [ ] Replace revision-number fingerprinting with canonical durable projection fingerprinting.
- [ ] Add a semantic dirty set updated only by committed durable mutations.
- [ ] Give every save attempt a save operation ID and observed durable revision.
- [ ] Move localStorage behind a typed adapter capability.
- [ ] Commit `Saved` only after an adapter write receipt.
- [ ] Publish typed quota, privacy, serialization and stale-write failures.
- [ ] Add slot revision and compare-and-swap semantics.
- [ ] Stage restore in a candidate graph, or retain complete predecessor snapshots for rollback.
- [ ] Restore input runtime generation and transaction-ledger continuity as one unit.
- [ ] Replace frame-index-only interaction IDs with session/generation/sequence-based IDs.
- [ ] Include `cozyInput.reset()` in reset authority.
- [ ] Add migration registration and unsupported-version results.
- [ ] Correlate restored state, camera/HUD snapshot and first rendered frame.
- [ ] Wire `tests/adventure-domains-smoke.mjs` into `npm test`.
- [ ] Add idle-write, storage-failure, rollback, collision and browser-reload fixtures.
- [ ] Pin NexusEngine browser imports to one reviewed commit.
- [ ] Remove or explicitly deprecate the duplicate composition path.

## Acceptance criteria

```txt
idle for 60 seconds
  -> zero durable writes after initial synchronization

storage adapter failure
  -> save result is failed
  -> HUD never reports Saved
  -> dirty state remains retryable

late restore failure
  -> every live domain remains on the predecessor revision

reload
  -> transaction and input identities never collide
  -> the same user action executes exactly once

reset
  -> input, transaction ledger, durable domains and visible frame share one new generation

successful restore
  -> candidate graph validates
  -> authority transfers atomically
  -> first visible frame cites restore result and save checksum
```
