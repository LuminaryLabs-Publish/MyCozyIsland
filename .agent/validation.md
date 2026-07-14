# Validation: MyCozyIsland shell startup fault isolation

**Timestamp:** `2026-07-14T05-02-03-04-00`

## Scope

Documentation-only review of the current shell, menu presentation, hidden game preload, Core Startup and static smoke boundaries. The audit tests the source dependency graph conceptually and does not claim runtime fallback behavior.

## Plan ledger

**Goal:** distinguish confirmed source behavior from unimplemented menu-failure/game-startup guarantees.

- [x] Compare the full Publish inventory and central ledger.
- [x] Confirm all eligible repository heads match documented heads.
- [x] Select MyCozyIsland through the oldest eligible rule.
- [x] Inspect root, shell, menu, game, bridge, startup and test files.
- [x] Preserve 65 DSK/kit surfaces and five adapters.
- [x] Define the browser fault-injection matrix.
- [ ] Run `npm test` independently.
- [ ] Execute browser, build and Pages fixtures.

## Source-backed observations

```txt
reviewed repository head: b7edce0ac6c7fc7005be56f649141e31690e4eee
root route: redirects to menu.html
menu iframe initial src: absent
iframe source assignment: frame.src = ./game.html?preload=1
source assignment owner: startPreload()
startPreload scheduling: end of successful menu main()
menu renderer: THREE.WebGPURenderer
menu renderer init timeout: absent
menu main catch: reportFailure
reportFailure starts preload: no
module import failure handler: absent
game renderer init timeout: 15000 ms through Core Startup host
game backend result: webgpu or webgl2
game first-frame admission: startupHost.presentFirstFrame
game playable entry: startupHost.enter
menu-failure/game-success browser proof: absent
```

## Existing executable coverage

`npm test` is configured to run:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The menu smoke runs syntax checks and source-pattern assertions. It confirms authored wiring but does not load modules in a browser, create GPU contexts, intercept CDN requests or inject initialization failures.

## Required fixtures

```txt
normal WebGPU startup
normal WebGL2 fallback startup
menu Three.js module blocked
the TSL module blocked
Bloom addon blocked
menu renderer init rejects
menu renderer init times out
palm scene construction throws
RenderPipeline construction throws
menu render throws before first frame
game remains playable after each menu-only failure
game failure while menu remains healthy
both lanes fail
menu and game retry isolation
stale result rejection
first visible fallback game frame
pagehide and BFCache paths
source/build/Pages semantic parity
```

## Combined status

The GitHub combined-status endpoint returned no status entries for `b7edce0ac6c7fc7005be56f649141e31690e4eee`.

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
combined status checks reported: none
npm test independently run: no
browser fault isolation smoke: not run
built-output startup smoke: not run
Pages startup fallback smoke: not run
```

No menu-fault tolerance, independent game preload, degraded entry, retry isolation, first fallback-frame, deployment-parity or production-readiness claim is made.
