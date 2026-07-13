# Validation: MyCozyIsland Core Startup reconciliation

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Scope

Documentation-only review of the ten-commit Core Startup integration across the HTML import map, product startup host, shared adventure composition, renderer/world preparation, first-frame gate, startup smoke and package wiring.

## Plan ledger

**Goal:** record exact source evidence and the executable proof still required before browser startup reliability is claimed.

- [x] Compare the prior repo-local documentation head with current `main`.
- [x] Inspect all ten intervening commits and changed files.
- [x] Read `index.html` provider/import entrypoints.
- [x] Read `src/adventure/startup-host.js`.
- [x] Read `src/adventure/composition-runtime.js`.
- [x] Read the startup path in `src/main-adventure.js`.
- [x] Read `src/kits/renderer-post.js` first-frame submission contract.
- [x] Read `tests/startup-domain-smoke.mjs` and `package.json` wiring.
- [x] Inspect current commit status checks.
- [x] Update the census to 65 kit surfaces and two startup adapters.
- [ ] Run source, browser, built-output and Pages startup fixtures.

## Source-backed observations

```txt
runtime commits ahead of previous documentation: 10
engine-installed kits before integration: 13
engine-installed kits after integration: 14
source-backed kit surfaces after integration: 65
startup adapters outside kit census: 2
Core Startup preparation facts: 6
renderer initialization timeout: 15000 ms
atmosphere preparation timeout: 20000 ms
first render call before enter: yes
renderer-derived first-frame result: no
visible first-frame acknowledgement: no
static module/provider admission result: no
```

## Existing executable coverage

`npm test` now runs:

```txt
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The startup smoke verifies:

```txt
Core Startup launch and runtime-ready state
six preparation IDs
product preparation display order
renderer/composition/world/input readiness
new continuation selection
enter rejected before first-frame fact
first-frame fact then playable entry
loader progress and completion projection
startup snapshot reset/load
structured retryable failure projection
```

It does not execute browser import maps, remote CDN failures, module parsing/evaluation, WebGPU device behavior, canvas visibility or GitHub Pages.

## Required fixtures

```txt
invalid import map
unreachable Three provider
unreachable NexusEngine provider
entry-module timeout
module parse failure
module evaluation failure
invalid bootstrap export
retry and stale predecessor completion
WebGPU first frame
WebGL2 fallback first frame
renderer initialization timeout
atmosphere timeout
pipeline failure
post-submit device loss
visible canvas acknowledgement
startup listener disposal
source/build/Pages terminal-result parity
```

## Validation result

```txt
runtime source changed by this audit: no
gameplay changed by this audit: no
rendering changed by this audit: no
save behavior changed by this audit: no
dependencies changed by this audit: no
package scripts changed by this audit: no
workflow changed by this audit: no
deployment changed by this audit: no
branch created: no
pull request created: no

source files inspected: yes
startup smoke source inspected: yes
package test wiring inspected: yes
commit status checks reported: none
npm test independently run: no
browser startup smoke: not run
built-output startup smoke: not run
Pages startup smoke: not run
```

No provider-independent bootstrap, retry isolation, renderer submission, visible-frame, deployed parity or production-readiness claim is made.