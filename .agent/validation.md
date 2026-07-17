# Validation: menu preload-to-ready presentation handoff audit

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Completed

- [x] Full `LuminaryLabs-Publish` inventory compared.
- [x] `LuminaryLabs-Publish/TheCavalryOfRome` excluded.
- [x] Ten eligible central ledgers and root `.agent` states confirmed.
- [x] MyCozyIsland selected by runtime-ahead priority.
- [x] Six-commit, six-file performance delta inspected.
- [x] Interaction loop, domains, kits, adapters and services documented.
- [x] 85 implemented surfaces reconciled.
- [x] Required timestamped `.agent` documents added.
- [x] Required root `.agent` indexes refreshed.
- [ ] Runtime handoff authority implemented.
- [ ] Browser handoff fixtures executed.

## Change boundary

```txt
documentation changed: yes
runtime JavaScript changed: no
HTML or CSS changed: no
scene recipe or procedural textures changed: no
shader or render behavior changed: no
preload, Play or entry behavior changed: no
gameplay, simulation, input or saves changed: no
tests or package scripts changed: no
workflow or deployment changed: no
branch created: no
pull request created: no
```

## Source evidence inspected

```txt
menu.html
src/menu.js
src/menu/menu-scene-recipe.js
src/menu/menu-three-renderer-lite.js
src/game-preload-bridge.js
tests/menu-game-shell-smoke.mjs
package.json
previous .agent tracker and machine registry
central MyCozyIsland ledger
```

## Executable evidence

```txt
npm test: not run
npm build: no build script declared
WebGPU browser fixture: not run
WebGL2 browser fixture: not run
ready DPR/frame transition fixture: unavailable
immediate Play activation fixture: unavailable
stale/duplicate ready-message fixture: unavailable
resize/DPR-change fixture: unavailable
visibility/reduced-motion fixture: unavailable
FirstReadyMenuFrameAck fixture: unavailable
built-output smoke: not run
Pages-origin smoke: not run
```

The public repository could not be cloned in this runtime because external DNS access was unavailable, so source inspection used the GitHub connector.

## Claims withheld

No first-ready-frame convergence, Play-gate convergence, stale-ready rejection, duplicate-ready safety, entry-generation correctness, browser parity, artifact parity, Pages parity or production readiness is claimed.