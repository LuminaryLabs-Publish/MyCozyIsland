# Validation: MyCozyIsland public runtime capability reconciliation

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Scope

Documentation-only reconciliation of the browser-global host audit, raw runtime/presentation references, representative mutating domain services, reset exposure, host lifecycle and visible-frame provenance. Runtime source, dependencies, gameplay, rendering, persistence and deployment configuration are unchanged.

## Plan ledger

**Goal:** record exact source evidence, publication state and executable proof required before public-host capability claims are made.

- [x] Read `src/main-adventure.js` startup, animation loop, page lifecycle and `globalThis.CozyIsland` publication.
- [x] Confirm raw renderer, scene, camera, adventure and engine references are public.
- [x] Confirm the frozen wrapper does not freeze referenced owners.
- [x] Confirm public input, Inventory, Foraging, save restore and multi-domain reset services.
- [x] Preserve all 64 kit surfaces and services.
- [x] Confirm the `04-10-37` technical audit was newer than central tracking.
- [x] Add the `04-21-10` reconciliation audit family.
- [x] Refresh required root routing and machine state.
- [ ] Implement and run public-capability fixtures.

## Source-backed findings

```txt
src/main-adventure.js
  -> unconditionally assigns globalThis.CozyIsland
  -> exposes renderer, scene, camera, adventure and engine
  -> exposes world, input, player, Inventory, Agriculture, Foraging, interaction and save APIs
  -> exposes captureSave and resetAdventure
  -> has no host channel, capability grant, caller identity or revoke path

representative domain surfaces
  -> input can enqueue key, pointer, wheel and clear commands
  -> Inventory can add, remove, apply changes, load snapshots and reset
  -> Foraging can harvest, load snapshots and reset
  -> save can capture, restore and reset all participating domains
```

## Deterministic observations

```txt
source-backed kit surfaces: 64
public host raw participant references: at least 13
public top-level object frozen: yes
referenced participant objects deeply frozen: no
host channel policies: 0
capability grant types: 0
typed public command result types: 0
host revocation results: 0
visible capability-effect acknowledgements: 0
production-build capability fixtures: 0
```

## Required fixtures

```txt
production read-only projection
development capability manifest
grant, expiry and revoke
raw-owner exclusion
unknown, stale, duplicate and revoked command rejection
single-writer tick admission
Inventory, Foraging and save mutation receipts
reset confirmation and rollback result
page lifecycle revocation
first visible capability-effect frame
source/build/Pages parity
```

## Validation result

```txt
runtime source changed: no
dependencies changed: no
package scripts changed: no
gameplay behavior changed: no
input behavior changed: no
save behavior changed: no
render behavior changed: no
deployment changed: no
branch created: no
pull request created: no

npm test: not run
npm run build: not run
public-capability fixtures: unavailable / not run
browser host smoke: unavailable / not run
production-build host inspection: not run
Pages host smoke: not run
```

No least-authority, safe-public-host, deterministic external-control, revocation, reset-safety or visible-effect claim is made.