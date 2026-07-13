# Validation: MyCozyIsland menu/game preload handoff

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Scope

Documentation-only review of the ten-commit menu/game shell change across root routing, menu Canvas2D presentation, iframe preload, Core Startup progress, game bridge, simulation freeze/resume, entry reveal, tests, package wiring, workflow, and README.

## Plan ledger

**Goal:** record exact source evidence and the executable proof required before seamless handoff reliability is claimed.

- [x] Compare prior documentation head with current runtime head.
- [x] Inspect all ten intervening commits and nine changed files.
- [x] Read `index.html`, `menu.html`, `game.html`, `src/menu.js`, and `src/game-preload-bridge.js`.
- [x] Read adventure tick and game animation-loop ownership.
- [x] Read menu/game shell smoke and package wiring.
- [x] Inspect current commit status checks.
- [x] Preserve 65 DSK/kit surfaces and document five browser/product adapters.
- [ ] Run source/browser/build/Pages handoff fixtures.

## Source-backed observations

```txt
commits ahead of prior documentation: 10
changed files: 9
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
menu presentation loop: recursive requestAnimationFrame
game presentation loop: renderer.setAnimationLoop
simulation freeze: engine.tick and engine.step replacement
hidden game presentation stopped by freeze: no
preload descriptor poll interval: 120 ms
entry fallback reveal: 900 ms
cross-window generation fields: none
post-resume renderer result: none
first visible game-frame acknowledgement: none
```

## Existing executable coverage

`npm test` now runs:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The menu shell smoke verifies syntax and source markers for routing, menu canvas, Play gate, iframe, adventure and bridge modules, 99 percent progress cap, ready/enter messages, history replacement, procedural palm rendering, freeze/resume markers, intro progress, Core Startup readiness, and Pages HTML copy.

It does not instantiate a browser, count RAF chains, execute the iframe protocol, measure hidden rendering, assert zero simulation ticks, force timeouts/races, inspect GPU submission, test BFCache, or acknowledge a visible post-resume frame.

## Required fixtures

```txt
single menu RAF across repeated visibility transitions
single hidden game animation loop
explicit hidden presentation policy
zero simulation ticks while quiesced
preload readiness bound to generation
duplicate and stale messages rejected
rapid double Play admits one entry
entry timeout preserves menu
bridge exception preserves menu
post-resume render failure preserves menu
first visible post-resume frame completes entry
history/focus/menu retirement commit once
iframe reload creates successor generation
pagehide/BFCache do not duplicate schedulers
direct game route remains functional
source/build/Pages terminal-result parity
```

## Validation result

```txt
runtime source changed by this audit: no
HTML or CSS changed by this audit: no
gameplay changed by this audit: no
render behavior changed by this audit: no
dependencies changed by this audit: no
package scripts changed by this audit: no
workflow changed by this audit: no
deployment changed by this audit: no
branch created: no
pull request created: no

source files inspected: yes
menu shell smoke source inspected: yes
package test wiring inspected: yes
commit status checks reported: none
npm test independently run: no
browser handoff smoke: not run
built-output handoff smoke: not run
Pages handoff smoke: not run
```

No scheduler uniqueness, quiescence correctness, race isolation, visible-frame completion, lifecycle parity, or production-readiness claim is made.