# Next steps: MyCozyIsland embed-context route admission

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

Replace the boolean preload heuristic with a typed three-way context decision. Only an authenticated menu shell should be able to acquire the sleeping-preload lease.

## Plan ledger

**Goal:** add the smallest authority that preserves direct play, authenticates shell preload and prevents silent frozen embeds.

- [ ] Add `DocumentGeneration`, `EmbedContextId`, `ShellGeneration`, `PreloadToken` and `ParentOrigin`.
- [ ] Parse query intent separately from window hierarchy.
- [ ] Define `DirectPlay`, `ShellPreload` and `UnsupportedEmbed` outcomes.
- [ ] Require a shell nonce and exact parent origin for preload mode.
- [ ] Validate message schema, source, origin, sequence and replay.
- [ ] Reject top-level `preload=1` without a parent shell.
- [ ] Reject implicit iframe preload without a shell manifest.
- [ ] Keep direct-play simulation, HUD, input and rendering active.
- [ ] Give unsupported embeds an explicit standalone or visible failure policy.
- [ ] Bind suspension and entry leases to the admitted context.
- [ ] Publish `EmbedContextAdmissionResult`.
- [ ] Publish `FirstContextAdmittedGameFrameAck`.
- [ ] Preserve existing Core Startup, suspension, postcard, save and gameplay ownership.
- [ ] Add source, built-output and Pages browser fixtures.

## Minimal implementation order

```txt
1. route-intent parser
2. window-hierarchy classifier
3. shell manifest and nonce
4. parent-origin policy
5. context admission result
6. typed message channel
7. context-bound suspension lease
8. direct and unsupported policies
9. first context-admitted frame
10. browser and artifact parity matrix
```

## Target files

```txt
src/game-preload-bridge.js
src/menu.js
menu.html
game.html
tests/menu-game-shell-smoke.mjs
tests/embed-context-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
top-level game.html
top-level game.html?preload=1
admitted same-origin menu preload
same-origin arbitrary iframe
cross-origin iframe
missing shell manifest
wrong origin
wrong source
stale shell generation
reused nonce
duplicate/reordered message
direct-play first frame
preload resumed first frame
unsupported-embed visible recovery
source/build/Pages parity
```

## Ownership constraints

The context authority decides host relationship only. Core Startup remains the playable-readiness owner. The suspension authority owns engine and renderer sleep. Adventure kits own gameplay. The shell owns progress, Play, reveal, focus and history.