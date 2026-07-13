# Validation: MyCozyIsland Three.js menu presentation lifecycle

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Scope

Documentation-only review of the four-commit menu presentation change across `README.md`, `menu.html`, `src/menu.js` and `tests/menu-game-shell-smoke.mjs`, plus the retained hidden-game preload, entry handoff, package wiring and deployed route boundary.

## Plan ledger

**Goal:** record exact source evidence and the executable proof required before menu-provider independence and complete presentation retirement are claimed.

- [x] Compare the prior repo-local documentation head with the current runtime head.
- [x] Inspect the four intervening commits and four changed files.
- [x] Read current `menu.html`, `src/menu.js`, `game.html`, README taxonomy and menu smoke.
- [x] Read retained preload-handoff and game renderer ownership.
- [x] Inspect package test wiring and current commit status checks.
- [x] Preserve 65 DSK/kit surfaces and five browser/product adapters.
- [x] Update the menu adapter from Canvas2D to Three.js services.
- [ ] Run source, browser, built-output and Pages lifecycle fixtures.

## Source-backed observations

```txt
commits ahead of prior documentation: 4
changed files: 4
reviewed runtime head: a0077808c0344b52850c2cd4c5c787c521ee61db
Three.js menu provider: jsDelivr three@0.185.0
menu renderer: one low-power THREE.WebGLRenderer
menu visual contract: one semantic sky, one hero palm, one Play gate
palm fronds: 11
palm coconuts: 4
menu frame loop: recursive requestAnimationFrame
hidden game loop: independent renderer.setAnimationLoop
preload scheduling: after menu module construction and first RAF scheduling
stored menu RAF ID: no
first menu frame acknowledgement: no
entry fallback reveal: 900 ms
menu retirement delay: 820 ms
explicit menu scene-resource disposal: no
renderer.dispose call: yes
listener retirement: no
context/canvas retirement receipt: no
combined commit status checks reported: none
```

## Existing executable coverage

`npm test` runs:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The menu smoke verifies syntax and source markers for routing, one Three.js canvas, one Play gate, one hidden game iframe, Three.js import, sky and palm construction, stable palm identity, absence of Canvas2D/island/terrain menu code, 99 percent progress cap, ready/enter messages, history replacement, freeze/resume markers and Pages HTML copying.

It does not instantiate a browser, intercept the Three.js provider, disable WebGL, compile/render the shader, count GPU contexts, acknowledge the first menu frame, inspect concurrent menu/game renderer work, dispatch real entry input, dispose scene resources, inspect listeners, test late callbacks, force context loss, exercise BFCache or validate deployed lifecycle results.

## Required fixtures

```txt
provider-independent iframe preload start
Three.js provider rejection
CSP or MIME rejection
WebGL-disabled/constructor rejection
shader/resource preparation failure
normal first menu frame
reduced-motion first menu frame
resize and DPR before/after first frame
explicit dual-renderer overlap policy
rapid duplicate Play
entry timeout preserving menu
first visible game frame before retirement
one stopped RAF chain
late callback rejection
owned listener retirement
geometry/material disposal receipts
renderer and context policy receipt
canvas/reference retirement
partial retirement reporting
context loss during transition
pagehide/BFCache lifecycle
fresh built root/menu/direct-game routes
GitHub Pages parity
```

## Validation result

```txt
runtime source changed by this audit: no
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
menu shell smoke source inspected: yes
package test wiring inspected: yes
commit status checks reported: none
npm test independently run: no
browser menu lifecycle smoke: not run
built-output menu lifecycle smoke: not run
Pages menu lifecycle smoke: not run
```

No provider-independent preload, menu first-frame, bounded dual-renderer use, complete resource retirement, visible entry, lifecycle parity or production-readiness claim is made.