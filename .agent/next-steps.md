# Next steps: MyCozyIsland save-writer lease and revision admission

**Timestamp:** `2026-07-15T15-01-22-04-00`  
**Status:** `save-writer-lease-revision-admission-authority-audited`

## Summary

Insert a conflict-aware save-writer authority between portable capture and localStorage. Hidden preload must be read-only until accepted entry.

## Plan ledger

**Goal:** guarantee monotonic durable progress across multiple documents.

- [ ] Add `DocumentId`, `WriterSessionId`, `SaveSlotId`, `CommitId` and `commitRevision`.
- [ ] Extend the durable record with predecessor/base revision and writer metadata.
- [ ] Add a read-only preload policy.
- [ ] Acquire a bounded writer lease on accepted game entry.
- [ ] Renew while active; expire safely after crash or abandonment.
- [ ] Observe external slot-head changes with `storage`.
- [ ] Require compare-and-swap against the current head.
- [ ] Reject stale autosave and pagehide commits.
- [ ] Verify writes by readback before publishing success.
- [ ] Publish `SaveCommitResult` and `SaveConflictResult`.
- [ ] Bind HUD save status to accepted durable revision.
- [ ] Release leases on retirement and pagehide.
- [ ] Add two-tab and two-preload browser fixtures.
- [ ] Run source/build/Pages parity.

## Minimal implementation order

```txt
1. durable record v3 and migration
2. document/writer identity
3. slot-head observer
4. lease admission and expiry
5. preload read-only policy
6. compare-and-swap commit
7. conflict and readback results
8. HUD durable-revision projection
9. lifecycle release
10. browser fixture matrix
```

## Target files

```txt
src/adventure/persistence-render-domains.js
src/adventure/composition-runtime.js
src/main-adventure.js
src/game-preload-bridge.js
tests/save-multi-document.fixture.mjs
tests/adventure-domains-smoke.mjs
package.json
.github/workflows/pages.yml
```
