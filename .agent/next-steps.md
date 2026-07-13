# Next steps: MyCozyIsland Three.js menu presentation lifecycle

**Timestamp:** `2026-07-13T14-39-40-04-00`  
**Publication status:** `threejs-menu-presentation-lifecycle-authority-audited`

## Summary

Keep the minimal Three.js sky, hero palm and Play gate. Move hidden game preload into a provider-independent shell path, then give the menu renderer explicit provider, first-frame, scheduler, resource and retirement results.

## Plan ledger

**Goal:** allow factual game preload to proceed even when decorative menu presentation fails, and retire every accepted menu generation exactly once after visible game entry.

- [ ] Add `MenuPresentationAttemptId`, provider, renderer, resource, context and scheduler generations.
- [ ] Start the hidden game preload from a local provider-independent shell boundary.
- [ ] Add an immutable Three.js provider manifest and capability probe.
- [ ] Define a local degraded menu fallback that preserves Play/progress/error access.
- [ ] Prepare the renderer and scene resource set before adopting it as active.
- [ ] Publish renderer-derived `MenuFrameSubmissionResult` and `FirstMenuFrameAck`.
- [ ] Store one RAF ID and reject duplicate or stale successor scheduling.
- [ ] Register every owned event and media listener.
- [ ] Dispose every menu geometry and material exactly once.
- [ ] Clear scene graph, arrays, callbacks, canvas and renderer references.
- [ ] Define explicit WebGL context retention/release policy and receipt.
- [ ] Publish terminal menu boot and retirement results.
- [ ] Compose retirement with accepted player entry and first visible game-frame proof.
- [ ] Run source, browser, built-output and GitHub Pages fixtures.

## Minimal implementation order

```txt
1. provider-independent shell bootstrap
2. shell, menu, provider, canvas and preload generations
3. game preload starts independently
4. menu provider manifest and WebGL capability admission
5. degraded local menu policy
6. detached renderer and resource candidate
7. first menu frame submission and acknowledgement
8. single stored menu RAF scheduler
9. owned listener registry
10. accepted player-entry binding
11. complete resource and renderer retirement
12. context/canvas/reference retirement receipts
13. first game-only frame acknowledgement
14. fixture matrix
```

## Target files

```txt
menu.html
src/menu.js
src/game-preload-bridge.js
src/main-adventure.js
tests/menu-game-shell-smoke.mjs
tests/menu-presentation-lifecycle-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

A small local shell bootstrap module may be added if it can begin iframe preload and project terminal failures without depending on Three.js.

## Required acceptance cases

```txt
game preload begins when Three.js provider is rejected
game preload begins when WebGL is unavailable
degraded local menu still exposes progress, failure and Play
one accepted menu renderer and one RAF chain
first menu frame cites accepted provider and resource generations
menu and hidden game renderer overlap is explicit and bounded
rapid duplicate Play admits one entry attempt
first visible game frame precedes menu retirement
all declared menu geometries and materials receive disposal receipts
all owned listeners are removed
late RAF callback after retirement is rejected
duplicate retirement is idempotent
stale predecessor retirement cannot affect successor menu
context loss during transition returns a typed result
pagehide and BFCache do not duplicate or orphan renderers
direct game route remains functional
source, built output and Pages return equivalent terminal results
```

## Ownership constraints

Core Startup owns factual game readiness. The menu shell owns product copy and Play intent. The menu presentation domain owns Three.js provider, WebGL renderer, scene resources, menu frames and retirement. The existing preload-handoff parent owns cross-document entry and consumes menu lifecycle results without absorbing renderer mechanics.

## Taxonomy constraint

The fifteen-level sky, palm and Play taxonomy remains semantic. Do not create fifteen executable kits. Only the application, entry experience, menu and menu-scene levels are executable ownership boundaries.

## Retained work

The preload-handoff scheduler, static game-module bootstrap, resource settlement, public capabilities, browser page lifecycle, durable saves, input and adaptive quality authorities remain open and must compose with this work.

## Do not claim

Do not claim provider-independent preload, first-menu-frame readiness, bounded dual-renderer usage, complete resource retirement, sole game-surface ownership, visible entry completion, lifecycle convergence or deployed readiness until the matrix passes on `main`.