# Validation: MyCozyIsland embed-context route admission

**Timestamp:** `2026-07-14T20-05-56-04-00`

## Scope

Documentation-only inspection of route classification, iframe context, parent messaging, startup readiness, suspension entry and source-test coverage. No runtime behavior was modified or executed.

## Plan ledger

**Goal:** distinguish confirmed source implementation from unproved route, embedding, transport, suspension and visible-frame guarantees.

- [x] Compare the full Publish inventory and central ledgers.
- [x] Compare every eligible head with its documented head.
- [x] Select MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect route, shell, game and bridge source.
- [x] Inspect source-pattern test coverage.
- [x] Preserve 65 kits and five adapters.
- [x] Query combined status for the pre-audit head.
- [ ] Run `npm test` independently.
- [ ] Execute browser context fixtures.
- [ ] Execute built-output and Pages fixtures.

## Confirmed observations

```txt
reviewed runtime revision: 6c5e465b7b431ff6758f78e7ceb25d0f763f658f
reviewed pre-audit head: 4a382d17d13425a7a5f01ef7933248ba9e0058b1
preload classifier: preload=1 OR window.parent !== window
outgoing parent target origin: location.origin
inbound admission: event.source only
playable preload action: freeze engine and renderer
context admission result: absent
shell handshake: absent
FirstContextAdmittedGameFrameAck: absent
```

## Existing executable coverage

`npm test` is configured around source and domain smokes. `tests/menu-game-shell-smoke.mjs` reads files, runs JavaScript syntax checks and matches source patterns. It does not instantiate route contexts or browser windows.

## Required fixtures

```txt
top-level direct game
top-level preload query
admitted same-origin menu iframe
same-origin arbitrary iframe
cross-origin iframe
missing shell
wrong source and wrong origin
stale generation and reused nonce
duplicate/reordered messages
direct first frame
resumed preload first frame
unsupported-embed visible recovery
source/build/Pages parity
```

## Combined status

The combined-status endpoint returned no status entries for pre-audit head `4a382d17d13425a7a5f01ef7933248ba9e0058b1`.

## Validation result

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
gameplay changed: no
render behavior changed: no
dependencies or package scripts changed: no
tests or workflows changed: no
deployment changed: no
branch created: no
pull request created: no

source inspection: completed
repository comparison: completed
combined status checks: none
npm test: not run
browser context fixtures: unavailable
built-output smoke: not run
Pages smoke: not run
```

No route safety, shell authentication, context-bound suspension, visible-frame convergence, artifact parity or production readiness is claimed.