# Validation: MyCozyIsland dual-surface GPU handoff and retirement

**Timestamp:** `2026-07-13T23-58-48-04-00`

## Scope

Documentation-only review of seven runtime commits that introduced the WebGPU/TSL menu, physical palm lighting, bloom, hidden game presentation sleep and WebGPU compute wind. Inspected the menu and game presentation loops, preload bridge, static tests, package scripts and existing audit state.

## Plan ledger

**Goal:** distinguish confirmed source behavior from unimplemented GPU handoff and cleanup guarantees.

- [x] Compare the full Publish inventory and central ledger.
- [x] Detect MyCozyIsland as the sole runtime-ahead repository.
- [x] Compare prior documentation head with current runtime head.
- [x] Inspect all changed runtime and test files.
- [x] Inspect game renderer and startup loop dependencies.
- [x] Preserve 65 DSK/kit surfaces and five adapters.
- [x] Define required WebGPU/WebGL2 handoff and retirement fixtures.
- [ ] Run executable browser, build and Pages fixtures.

## Source-backed observations

```txt
prior repo-local documentation head: 500aa3f5ffc69beefd98443bafc834468d43e679
reviewed runtime head: 9416ecd21622e2a5b940ee27aac6224b09979dba
runtime commits reconciled: 7
changed files: menu.html game.html src/menu.js src/game-preload-bridge.js tests/menu-game-shell-smoke.mjs
menu renderer: WebGPURenderer
menu WebGPU compute: present
menu WebGL2 fallback path: present through renderer backend selection
menu render pipeline and bloom: present
hidden game renderer: independent WebGPURenderer
hidden game presentation sleep: setAnimationLoop(null)
hidden game simulation freeze: tick/step replacement
entry acknowledgement before resumed-frame proof: yes
menu/game fade overlap: up to 780 ms
parent fallback reveal: 900 ms
menu scene traversal retirement: not found
menu listener/timer retirement registry: not found
CozyMenu revocation: not found
```

## Existing executable coverage

`npm test` is configured to run:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The menu smoke runs `node --check` and source-pattern assertions for WebGPU imports, TSL, RenderPipeline, bloom, compute wind and hidden presentation sleep. It does not create a real browser GPU device/context, two presentation surfaces or a retirement lifecycle.

## Required fixtures

```txt
WebGPU menu initialization
WebGL2 menu fallback
hidden game initialization and readiness
presentation sleeping after readiness
simulation frozen while waiting
single resume under repeated Play
first resumed game-frame acknowledgement
bounded overlap measurement
compute and frame stop receipts
complete resource retirement
post-retirement resize and stale callback
capability revocation
WebGPU device loss
WebGL2 context loss
pagehide and reduced-motion paths
source/build/Pages semantic parity
```

## Validation result

```txt
documentation changed: yes
runtime JavaScript changed by this audit: no
HTML or CSS changed by this audit: no
gameplay changed by this audit: no
render behavior changed by this audit: no
dependencies changed by this audit: no
package scripts changed by this audit: no
test behavior changed by this audit: no
workflow changed by this audit: no
deployment changed by this audit: no
branch created: no
pull request created: no

source files inspected: yes
package test wiring inspected: yes
combined status checks reported on reviewed runtime head: none
npm test independently run: no
browser GPU handoff smoke: not run
built-output GPU handoff smoke: not run
Pages GPU handoff smoke: not run
```

No bounded-overlap, complete-retirement, capability-revocation, first-resumed-frame, device/context convergence, deployment-parity or production-readiness claim is made.