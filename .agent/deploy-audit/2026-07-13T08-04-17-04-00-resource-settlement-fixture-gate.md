# Deploy audit: resource-settlement fixture gate

**Timestamp:** `2026-07-13T08-04-17-04-00`

## Summary

The existing Node smoke test proves successful Agriculture, Foraging, save and migration flows. It does not exercise participant failures, partial ledger evidence, event visibility, save consistency or deployed visible-frame correlation.

## Plan ledger

**Goal:** prevent publication claims until source, built output and GitHub Pages prove identical settlement and recovery behavior.

- [x] Inspect current package scripts and smoke coverage.
- [x] Identify missing fault and recovery cases.
- [x] Define source, browser, build and Pages gates.
- [ ] Add executable fixtures.
- [ ] Run the matrix on `main`.

## Existing proof

```txt
npm test
  -> tests/adventure-domains-smoke.mjs
  -> prepare, plant, water and harvest happy path
  -> perennial coconut regrowth
  -> wild coconut collection
  -> save-v2 reset/restore
  -> save-v1 migration
```

## Missing gates

```txt
participant prepare failure
participant commit failure
aggregate ledger-record failure
Agriculture event buffering
Foraging nested Inventory result handling
participant-only recovery
aggregate-only recovery
divergent evidence quarantine
save consistency during attempted settlement
visible settlement-frame acknowledgement
built-output parity
GitHub Pages parity
```

## Proposed scripts

```txt
npm run test:settlement
npm run test:settlement:faults
npm run test:settlement:recovery
npm run smoke:settlement:browser
npm run smoke:settlement:build
npm run smoke:settlement:pages
```

## Required fixture rows

```txt
prepare soil: committed and duplicate
plant crop: committed, missing seed, stale plot, Inventory failure
water crop: committed, duplicate, stale plot
harvest crop: committed, deterministic yield, Inventory failure
wild forage: committed, coconut-add failure, sprout-add failure
partial Agriculture participant evidence
partial Foraging participant evidence
aggregate-only evidence
divergent participant fingerprints
save capture after committed settlement
save capture during rejected settlement
restore partial settlement payload
first visible frame for committed and recovered results
```

## Release condition

Do not mark resource settlement atomic, recovery-safe, durable or visibly coherent until every row passes against:

```txt
source modules
built static output
served browser origin
GitHub Pages origin
```

## Validation result

No script or deployment workflow changed. No fixture was run.
