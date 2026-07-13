# Validation: MyCozyIsland

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Scope

Documentation-only audit of the browser-global host, raw runtime/presentation references, representative mutating domain services, reset exposure, host lifecycle and visible-frame provenance. Runtime source, dependencies, gameplay, rendering, persistence and deployment configuration are unchanged.

## Plan ledger

**Goal:** record exact source evidence and executable proof required before public-host capability claims are made.

- [x] Read `src/main-adventure.js` startup, animation loop, page lifecycle and `globalThis.CozyIsland` publication.
- [x] Confirm raw renderer, scene, camera, adventure and engine references are public.
- [x] Confirm the frozen wrapper does not freeze referenced owners.
- [x] Read `src/adventure/composition-runtime.js` and confirm the adventure exposes the engine and tick.
- [x] Read `src/adventure/runtime-domains.js` and confirm public input enqueue/clear and snapshot/reset services.
- [x] Read `src/adventure/resource-domains.js` and confirm Inventory and Foraging mutation/load/reset services.
- [x] Read `src/adventure/persistence-render-domains.js` and confirm save restore and multi-domain reset services.
- [x] Preserve all 64 kit surfaces and services.
- [x] Add timestamped audits and root routing.
- [x] Push documentation only to `main` without a branch or pull request.
- [ ] Implement and run public-capability fixtures.

## Source-backed findings

```txt
src/main-adventure.js
  -> unconditionally assigns globalThis.CozyIsland
  -> exposes renderer, scene, camera, adventure and engine
  -> exposes world, input, player, inventory, agriculture, foraging, interaction and save APIs
  -> exposes captureSave and resetAdventure
  -> has no host channel, capability grant, caller identity or revoke path

src/adventure/composition-runtime.js
  -> returned adventure includes raw engine
  -> adventure.tick advances engine state

src/adventure/runtime-domains.js
  -> input API can enqueue key, pointer, wheel and clear commands
  -> APIs expose loadSnapshot and reset surfaces

src/adventure/resource-domains.js
  -> Inventory exposes add, remove, applyChanges, loadSnapshot and reset
  -> Foraging exposes harvest, loadSnapshot and reset

src/adventure/persistence-render-domains.js
  -> save API exposes restore and resetAll
  -> resetAll directly resets transaction, world, scenario, Inventory, Agriculture, Foraging, player and interaction participants
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
grant/expiry/revoke
raw-owner exclusion
unknown/stale/duplicate command rejection
single-writer tick admission
Inventory/Foraging/save mutation receipts
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
