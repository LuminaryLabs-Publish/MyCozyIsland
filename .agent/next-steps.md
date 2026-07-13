# Next steps: MyCozyIsland Core Startup and bootstrap admission

**Timestamp:** `2026-07-13T10-41-40-04-00`  
**Publication status:** `core-startup-integrated-bootstrap-admission-gap-audited`

## Summary

Keep Core Startup as the renderer-neutral owner of factual launch readiness. Add a thin product/browser bootstrap authority before the static module graph, then bind accepted provider/module evidence and a renderer-derived visible-frame receipt into the existing Core Startup launch.

## Plan ledger

**Goal:** make every browser launch end in one typed playable, failed, cancelled or retired result without leaving a permanently unchanged loading shell.

- [ ] Replace the direct static `main-adventure.js` module tag with a minimal local bootstrap entry.
- [ ] Install provider-independent loader failure and retry projection before remote imports.
- [ ] Define `BootstrapAttemptId`, generation and immutable provider manifest.
- [ ] Load the browser entry module under timeout and cancellation policy.
- [ ] Validate the bootstrap export contract before adventure mutation.
- [ ] Bind the accepted module graph to exactly one Core Startup launch.
- [ ] Reject stale and duplicate completions after retry or retirement.
- [ ] Preserve product preparation order and wording outside Core Startup.
- [ ] Return renderer-derived first-frame submission evidence.
- [ ] Add a matching visible canvas acknowledgement before `enter()`.
- [ ] Call startup/bootstrap disposal during terminal page retirement.
- [ ] Add import, provider, parse, evaluation, renderer and Pages fixtures.
- [ ] Retain resource-settlement, lifecycle, save, input and quality work as composed follow-on authorities.

## Minimal implementation order

```txt
1. local bootstrap entry and provider-independent error projection
2. BootstrapAttemptId and generation
3. immutable provider manifest
4. bounded dynamic entry-module admission
5. export-contract validation
6. Core Startup launch binding
7. retry, fallback, cancellation and stale fencing
8. renderer submission result
9. first visible startup-frame acknowledgement
10. lifecycle disposal
11. source/browser/build/Pages fixture matrix
```

## Target files

```txt
index.html
src/bootstrap.js
src/adventure/startup-host.js
src/main-adventure.js
src/kits/renderer-post.js
tests/startup-domain-smoke.mjs
tests/bootstrap-admission.fixture.mjs
scripts/smoke-startup-browser.mjs
package.json
```

## Required acceptance cases

```txt
valid providers create one Core Startup launch
invalid provider URL returns typed failure before adventure mutation
module timeout exposes retry
parse/evaluation failure exposes bounded evidence
retry retires predecessor generation
stale predecessor completion is ignored
WebGPU success enters playable once
WebGL2 fallback enters playable once
renderer failure never publishes first-frame success
device loss before acknowledgement never enters playable
visible canvas acknowledgement matches launch and frame generations
terminal page retirement removes startup listeners
source, built output and Pages return equivalent terminal results
```

## Ownership constraints

- Core Startup continues to own facts, not product copy or DOM.
- The browser host owns module/provider loading and retry UI.
- The renderer owns submission evidence.
- The visible-frame adapter owns presentation acknowledgement.
- Gameplay domains remain unchanged.

## Retained work

Resource settlement/recovery, public runtime capabilities, BFCache lifecycle, durable saves, browser input and adaptive quality remain open and must compose with this startup authority.

## Do not claim

Do not claim provider-independent startup recovery, first-visible-frame proof, retry isolation or deployed startup readiness until the full matrix passes on `main`.