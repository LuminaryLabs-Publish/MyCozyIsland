# Next steps: MyCozyIsland menu/game preload handoff

**Timestamp:** `2026-07-13T12-38-45-04-00`  
**Publication status:** `menu-game-preload-handoff-scheduler-authority-audited`

## Summary

Keep the living menu and one-time world construction. Replace implicit RAF ownership, engine monkey-patching, unversioned messages, and timer-based acceptance with explicit preload and entry commands, leases, terminal results, and visible-frame proof.

## Plan ledger

**Goal:** make every shell run end in one typed ready, entered, failed, cancelled, stale, or retired result with exactly one active scheduler per surface.

- [ ] Add `MenuShellGeneration`, `PreloadGeneration`, and `PlayerEntryAttemptId`.
- [ ] Wrap menu RAF ownership in one scheduler with duplicate-chain rejection.
- [ ] Define hidden game presentation policy: running, throttled, paused, or retired.
- [ ] Replace tick/step monkey-patching with a simulation quiescence lease.
- [ ] Add a separate presentation quiescence lease.
- [ ] Bind Core Startup readiness to the accepted preload generation.
- [ ] Version every cross-window command and result.
- [ ] Reject stale, duplicate, predecessor, and retired messages.
- [ ] Remove accepted-looking fallback reveal; timeout must return a typed non-entered result.
- [ ] Resume simulation at one admitted boundary.
- [ ] Return renderer-derived post-resume submission evidence.
- [ ] Require the first matching visible iframe frame before entry completes.
- [ ] Commit history, focus, visibility, and menu retirement once.
- [ ] Compose pagehide, BFCache, iframe reload, and direct-game lifecycle behavior.
- [ ] Add source/browser/build/Pages fixtures.

## Minimal implementation order

```txt
1. shell/preload/entry identities and generations
2. single menu RAF scheduler
3. explicit simulation quiescence lease
4. explicit hidden-presentation policy and lease
5. revisioned cross-window protocol
6. preload terminal result
7. entry command and reservation
8. post-resume renderer submission receipt
9. first visible game-frame acknowledgement
10. atomic history/focus/menu retirement
11. lifecycle composition
12. fixture matrix
```

## Target files

```txt
src/menu.js
src/game-preload-bridge.js
src/main-adventure.js
src/adventure/composition-runtime.js
src/adventure/startup-host.js
game.html
menu.html
tests/menu-game-shell-smoke.mjs
tests/menu-game-handoff-browser.fixture.mjs
package.json
```

## Required acceptance cases

```txt
one menu RAF chain after repeated hide/show
one preload surface and one game animation loop
zero simulation advancement while quiesced
hidden presentation follows authored policy
predecessor ready/entered messages rejected
rapid double Play admits one entry
entry timeout preserves menu and reports failure
post-resume render failure preserves menu
first visible successor frame completes entry
history and focus commit once
menu scheduler retires once
iframe reload creates successor generation
pagehide and BFCache do not duplicate participants
direct game route remains functional
source/build/Pages return equivalent results
```

## Ownership constraints

Core Startup owns factual readiness. The menu owns artwork and product copy. NexusEngine owns simulation. The renderer owns submission evidence. The handoff parent owns cross-domain admission and completion only.

## Retained work

Static module bootstrap admission, resource settlement/recovery, public capabilities, browser page lifecycle, durable saves, input, and adaptive quality remain open and must compose with this authority.

## Do not claim

Do not claim scheduler uniqueness, hidden-render quiescence, exact freeze/resume, stale-message isolation, visible entry completion, lifecycle convergence, or deployed handoff readiness until the matrix passes on `main`.