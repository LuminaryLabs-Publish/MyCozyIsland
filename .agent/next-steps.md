# Next steps: MyCozyIsland shell startup fault isolation

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Publication status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

Move game-preload launch into a dependency-free shell bootstrap so the primary route starts even when the optional WebGPU menu cannot import, initialize or render. Keep the existing menu, Core Startup, preload bridge and handoff work, but connect them through independent attempt results.

## Plan ledger

**Goal:** remove the menu presentation lane from the game-startup critical path with the smallest targeted change.

- [ ] Add `ShellGeneration`, `MenuPresentationAttemptId` and `GamePreloadAttemptId`.
- [ ] Move iframe `src` assignment out of successful menu `main()`.
- [ ] Start the game preload from shell-owned code before or alongside menu preparation.
- [ ] Add a bounded menu provider/renderer/pipeline preparation timeout.
- [ ] Publish typed menu ready, degraded, failed and superseded results.
- [ ] Preserve game progress projection when the menu is degraded.
- [ ] Keep Play disabled only until the current game attempt is playable.
- [ ] Add an accessible DOM-only degraded state.
- [ ] Add menu retry without recreating a healthy game attempt.
- [ ] Add game retry without recreating a healthy menu attempt.
- [ ] Add direct fallback entry bound to the current game startup revision.
- [ ] Require `FirstFallbackGameFrameAck` before fallback entry succeeds.
- [ ] Dispose partial menu candidates after preparation failure.
- [ ] Fence stale child and menu results.
- [ ] Compose with presentation leases, overlap and retirement receipts.
- [ ] Add source, browser, built-output and Pages fixture coverage.

## Minimal implementation order

```txt
1. dependency-free shell bootstrap
2. shell and attempt identities
3. independent game iframe preload
4. menu preparation result and timeout
5. degraded DOM projection
6. current game progress/readiness projection
7. menu and game retry commands
8. direct fallback entry
9. first fallback-game-frame acknowledgement
10. partial menu candidate retirement
11. stale/duplicate result fencing
12. browser/build/Pages fault matrix
```

## Target files

```txt
menu.html
src/shell-bootstrap.js
src/menu.js
src/game-preload-bridge.js
src/main-adventure.js
tests/menu-game-shell-smoke.mjs
tests/shell-startup-fault-isolation-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Required acceptance cases

```txt
normal WebGPU menu and game
normal WebGL2 fallback menu and game
menu Three.js import blocked while game succeeds
menu TSL or Bloom import blocked while game succeeds
menu renderer initialization rejection
menu renderer initialization timeout
menu scene construction failure
menu RenderPipeline failure
menu first-frame failure
menu failure before game progress
menu failure after game progress
menu retry with healthy game retained
game retry with healthy menu retained
both lanes fail
repeated Play during degraded state
late ready after retry
pagehide and BFCache restore
reduced-motion path
first visible fallback game frame
source/build/Pages semantic parity
```

## Ownership constraints

The shell authority owns attempt identity, lane independence, fault classification and terminal settlement. The menu adapter owns menu-local GPU preparation and cleanup. Core Startup owns game readiness. The preload bridge owns local sleep/resume. The game renderer owns frame receipts. Existing protocol, GPU handoff, page lifecycle and public-capability audits remain active.

## Do not claim

Do not claim independent game startup, graceful menu degradation, retry isolation, direct fallback entry or deployed parity until the executable matrix passes on `main`.
