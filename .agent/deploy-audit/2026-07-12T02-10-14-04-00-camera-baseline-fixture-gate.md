# Deploy Audit: Camera Baseline Fixture Gate

Timestamp: `2026-07-12T02-10-14-04-00`

## Summary

The current test chain proves terrain clearance and first-person eye/FOV behavior, but it does not prove authored rail immutability, reset fidelity, repeated-drift resistance, browser input parity, or the first visible camera frame after reset.

## Plan ledger

**Goal:** prevent deployment claims until camera baseline and reset behavior are executable and observable across Node, browser, both render backends, and Pages.

- [x] Inventory existing camera tests.
- [x] Identify missing pure fixtures.
- [x] Identify missing browser fixtures.
- [x] Identify missing deployed-route proof.
- [ ] Add and run fixtures later.

## Existing checks

```txt
camera-rail-ground-clearance.mjs
camera-first-person-contract.mjs
```

## Required Node fixtures

```txt
camera-rail-baseline-fingerprint.mjs
camera-rail-baseline-immutability.mjs
camera-rail-reset-fidelity.mjs
camera-rail-repeated-drift.mjs
camera-command-revision.mjs
camera-stale-generation.mjs
camera-threshold-transition.mjs
camera-replay-determinism.mjs
```

## Required browser fixtures

```txt
wheel command parity
mouse drag command parity
pen drag command parity
touch/pointer lease isolation
pointercancel and blur cleanup
reset then first visible frame
WebGPU camera receipt
WebGL2 camera receipt
```

## Required Pages smoke

```txt
load deployed route
capture initial camera receipt and frame
apply bounded rail drag sequence
advance toward first-person threshold
reset through the public authority
capture first reset frame
compare baseline, path, reset and camera revisions
verify initial/reset descriptor and framing parity
```

## Failure gate

Deployment proof is incomplete if any of the following is true:

```txt
baseline points change after input
post-reset descriptor differs from initial descriptor
repeated cycles accumulate path displacement
old-generation commands mutate current state
multiple pointers share one unowned drag state
camera receipt lacks baseline or revision provenance
first visible reset frame cannot be identified
WebGPU and WebGL2 result schemas differ
```

## Current validation state

```txt
runtime camera code changed: no
new tests added: no
npm test run: no
browser smoke run: no
Pages smoke run: no
camera reset correctness claimed: no
```