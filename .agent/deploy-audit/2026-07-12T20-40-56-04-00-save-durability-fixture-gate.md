# Deploy audit: save durability fixture gate

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

The existing Node smoke proves portable snapshot capture, v2 restore and v1 migration. It does not prove browser storage durability, truthful rollback, page lifecycle completion or visible status on WebGPU, WebGL2 and GitHub Pages.

## Plan ledger

**Goal:** block durable-save readiness claims until source, browser, built output and deployed Pages produce equivalent typed results.

- [x] Inventory current proof.
- [x] Define storage failure and rollback fixtures.
- [x] Define visible-status and deployment parity gates.
- [ ] Add and execute the fixture matrix.

## Existing proof

```txt
npm test target: tests/adventure-domains-smoke.mjs
in-memory v2 capture: covered
in-memory v2 restore: covered
v1 Agriculture migration: covered
checksum behavior during normal restore: indirectly covered
localStorage adapter: not covered
storage failure: not covered
rollback failure: not covered
HUD status: not covered
pagehide completion: not covered
browser/Pages parity: not covered
```

## Required deterministic fixtures

```txt
candidate capture -> does not publish durable success
successful write + readback -> one DurableSaveReceipt
quota exceeded -> predecessor preserved and no Saved status
SecurityError -> typed storage failure and no Saved status
storage unavailable -> typed non-durable result
serialization failure -> no write and no receipt
missing readback -> reject commit
readback checksum mismatch -> reject and preserve predecessor
late commit generation -> stale rejection
v1 migration -> validate candidate before durable replacement
participant restore failure -> exact rollback result
rollback participant failure -> rollbackSucceeded=false
pagehide save -> explicit completed, failed or best-effort result
```

## Required browser fixtures

```txt
WebGPU normal autosave
WebGL2 fallback normal autosave
injected quota failure
injected security failure
readback corruption
startup malformed JSON
startup checksum mismatch
restore rollback failure
HUD Saved withheld until receipt
first visible save receipt frame
pagehide lifecycle result
```

## Required parity matrix

```txt
source modules
built/static output
local browser WebGPU
local browser WebGL2
GitHub Pages WebGPU where available
GitHub Pages WebGL2 fallback
```

Every surface must agree on command ID, commit generation, slot revision, result class, predecessor preservation and visible status.

## Readiness gate

Do not claim durable autosave, crash safety, truthful rollback, pagehide persistence or deployed save reliability until the matrix passes on `main` and the evidence records commands, browser versions, output hashes and final receipt revisions.