# Next steps: MyCozyIsland resource settlement and recovery authority

**Timestamp:** `2026-07-13T08-04-17-04-00`  
**Publication status:** `resource-settlement-recovery-authority-audited`

## Summary

Replace sequential cross-domain mutation with detached participant preparation, one aggregate commit decision, buffered event release and evidence-complete recovery. Preserve Inventory, Agriculture and Foraging ownership while making the product-level settlement result authoritative.

## Plan ledger

**Goal:** ensure every resource-changing interaction commits all affected participants exactly once or leaves all participants unchanged.

- [ ] Define `SettlementId`, settlement generation and monotonic command sequence.
- [ ] Bind commands to expected Inventory, Agriculture/Foraging and ledger revisions.
- [ ] Add detached Inventory change candidates that do not mutate balances during preparation.
- [ ] Add detached Agriculture adoption candidates around official plans.
- [ ] Add detached Foraging node candidates and explicit Inventory resource changes.
- [ ] Add participant prepare results and fingerprints.
- [ ] Buffer Agriculture and Foraging events until aggregate commit succeeds.
- [ ] Commit participant successors and aggregate ledger evidence under one settlement generation.
- [ ] Publish typed participant receipts and `ResourceSettlementResult`.
- [ ] Reject stale, duplicate, divergent and partial evidence with zero new mutation.
- [ ] Replace Agriculture-only recovery with all-participant evidence validation.
- [ ] Add quarantine for unsafe partial attempts.
- [ ] Bind save eligibility to committed settlement generations.
- [ ] Add settlement provenance to renderer-neutral frames and HUD results.
- [ ] Publish `FirstVisibleSettlementFrameAck`.
- [ ] Add fault-injection, partial-save, browser, build and Pages fixtures.

## Minimal implementation order

```txt
1. SettlementId, generation and expected revisions
2. Inventory prepare adapter
3. Agriculture prepare/event-buffer adapter
4. Foraging prepare adapter
5. aggregate prepare validation
6. atomic commit result and participant receipts
7. partial-attempt evidence scanner
8. recovery and quarantine policy
9. save-consistency generation
10. renderer-neutral settlement frame
11. first visible settlement acknowledgement
12. executable source/browser/build/Pages matrix
```

## Target files

```txt
src/adventure/agriculture-config.js
src/adventure/resource-domains.js
src/adventure/interaction-agriculture-domain.js
src/adventure/persistence-render-domains.js
src/adventure/resource-settlement-domain.js
src/adventure/resource-settlement-adapters.js
src/main-adventure.js
tests/resource-settlement.fixture.mjs
tests/resource-settlement-recovery.fixture.mjs
scripts/smoke-resource-settlement-browser.mjs
package.json
```

The generic Core Transaction Ledger should remain an idempotency mechanism. Do not silently turn it into a game-specific transaction coordinator.

## Required acceptance cases

```txt
prepare soil commits no Inventory change
plant commits one seed removal and one plot successor together
water commits one plot successor with no Inventory change
harvest commits plot successor and all yield changes together
perennial harvest commits regrowth state and all resource changes together
wild forage commits coconut/sprout additions and node depletion together
unknown/stale/duplicate command produces zero new mutation
participant preparation failure publishes no event
participant commit failure publishes no visible partial state
participant-only evidence is recovered only with matching receipts and fingerprints
unsafe partial evidence is quarantined
save capture includes only committed settlement generations
restore rejects or quarantines divergent settlement state
committed and recovered settlement receive one matching visible-frame acknowledgement
source, built output and Pages produce equivalent terminal results
```

## Retained work

Public-runtime capability authority, page lifecycle, adaptive quality, durable storage commit, browser input ownership and wider deployed parity remain open and must compose with this settlement authority.

## Do not claim

Do not claim atomic settlement, rollback-safe events, recovery convergence, settlement-consistent persistence or visible settlement provenance until the full matrix passes on `main`.
