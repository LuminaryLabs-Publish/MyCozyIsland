# Next steps: MyCozyIsland durable save commit authority

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

Add a composed durable-save authority around the existing portable save DSK and browser storage adapter. Do not move `localStorage` into the engine kit; connect them through explicit candidate, write, readback, rollback and visible-receipt results.

## Plan ledger

**Goal:** replace inferred save success with verified durable commit and truthful restore outcomes.

- [ ] Define `SaveCommandId`, `SaveSessionId`, `SaveCommitGeneration` and `SaveSlotId`.
- [ ] Make portable capture return a detached candidate without setting durable success.
- [ ] Add typed browser storage write results.
- [ ] Read back the written envelope and verify schema and checksum.
- [ ] Preserve a last-known-good predecessor slot and revision.
- [ ] Classify quota, security, availability, serialization, write and readback failures.
- [ ] Advance the host durable fingerprint only from `DurableSaveReceipt`.
- [ ] Derive HUD save status only from commit results.
- [ ] Add explicit retry and backoff policy.
- [ ] Add restore generation and participant registry.
- [ ] Validate post-restore participant revisions and durable fingerprint.
- [ ] Return an independent `RollbackResult` with participant receipts.
- [ ] Report rollback failure truthfully and expose partial-state diagnostics.
- [ ] Define pagehide best-effort/completed/failed semantics.
- [ ] Carry save receipt and restore generation into renderer-neutral frames.
- [ ] Add first-visible-save-frame acknowledgement.
- [ ] Add Node, browser, WebGPU, WebGL2 and Pages fixtures.

## Immediate safe ledge

1. Change `capture()` so its state is `candidate-captured`, not `captured` or `saved`.
2. Add a host `persistCandidate(candidate, context)` adapter returning a typed result.
3. On success, read the slot back and compare checksums.
4. Add `commitDurableReceipt(receipt)` to the save authority.
5. Replace the HUD string condition with receipt-derived states.
6. Track the predecessor slot before replacement.
7. Split restore failure from rollback success/failure.
8. Add a quota-failure fixture proving `Saved` is not displayed.
9. Add a rollback-failure fixture proving `rolledBack` is false.
10. Add reload-after-save proof in local and deployed browsers.

## Required runtime flow

```txt
changed durable fingerprint
  -> SaveCommitCommand
  -> detached candidate capture
  -> storage write
  -> storage readback validation
  -> DurableSaveReceipt
  -> advance last durable fingerprint
  -> project Saved with receipt revision

restore request
  -> read validated slot
  -> detached migration candidate
  -> participant restore barrier
  -> post-restore validation
  -> RestoreResult
  -> verified rollback result on failure
  -> matching visible frame
```

## Target files

```txt
src/adventure/persistence-render-domains.js
src/adventure/composition-runtime.js
src/main-adventure.js
src/adventure/durable-save-authority.js
src/adventure/browser-save-storage-adapter.js
tests/adventure-domains-smoke.mjs
tests/save-durable-commit.fixture.mjs
tests/save-rollback.fixture.mjs
scripts/smoke-save-browser.mjs
package.json
```

## Required fixtures

```txt
normal write/readback -> one durable receipt
quota failure -> predecessor preserved, no Saved
SecurityError -> typed failure
corrupt readback -> rejected commit
late generation -> stale rejection
v1 migration -> validated durable successor
restore failure -> full verified rollback
rollback failure -> explicit false/partial result
pagehide -> explicit result
HUD -> receipt-bound status
reload -> state matches reported durable receipt
source/WebGPU/WebGL2/Pages -> equivalent results
```

## Completion criteria

A save may display `Saved` only after the candidate is written, read back, checksum-validated and committed under the current generation. Any restore failure must report the actual rollback state and preserve or explicitly identify every affected participant.