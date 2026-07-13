# Validation: MyCozyIsland cross-window preload and entry protocol

**Timestamp:** `2026-07-13T19-40-56-04-00`

## Scope

Documentation-only review of the active parent-menu/hidden-game messaging boundary in `src/menu.js` and `src/game-preload-bridge.js`, plus package test wiring and retained menu, startup, rendering and lifecycle documentation.

## Plan ledger

**Goal:** distinguish source-backed protocol facts from unimplemented or unexecuted safety claims.

- [x] Compare the full Publish inventory and central ledger.
- [x] Confirm MyCozyIsland is the oldest eligible synchronized repository.
- [x] Inspect both cross-window message handlers and producers.
- [x] Inspect entry timeout, simulation resume and player preparation.
- [x] Inspect package test wiring.
- [x] Preserve 65 DSK/kit surfaces and five adapters.
- [x] Define required protocol and visible-frame fixtures.
- [ ] Run executable source, browser, build and Pages fixtures.

## Source-backed observations

```txt
parent outbound targetOrigin: location.origin
child outbound targetOrigin: location.origin
parent inbound source-window check: yes
child inbound source-window check: yes
parent inbound event.origin check: no
child inbound event.origin check: no
message types: informal string discriminators
protocol version: no
message ID: no
sequence: no
shell/frame/preload/entry generations: no
payload schema validation: no
replay/duplicate classification: no
stale/out-of-order classification: no
child poll interval: 120 ms
parent entry fallback: 900 ms
child ready announcement: once
child poll stops at ready: no
simulation freeze: engine tick/step replacement
simulation resume: restore retained function references
player preparation errors: console warning, entry continues
entry acknowledgement timing: before post-resume visible-frame proof
first visible game-frame acknowledgement: no
```

## Existing executable coverage

`npm test` runs:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The current menu smoke checks source markers for route, iframe, progress, ready/enter message names, history replacement and freeze/resume behavior. It does not create a parent/iframe browser pair or test semantic message admission, ordering, reload, timeout, BFCache or visible-frame correlation.

## Required protocol fixtures

```txt
normal HELLO/progress/ready/entry/frame/commit
wrong origin
wrong source window
unsupported protocol version
unknown message type
malformed payload
oversized/deep payload
stale shell generation
stale frame generation
stale preload attempt
stale entry attempt
duplicate message ID
replayed ready result
out-of-order progress after ready
duplicate Play request
iframe reload during preload
iframe reload during entry
player preparation exception
entry timeout with explicit TimedOut result
explicit Degraded reveal policy
late frame acknowledgement
pagehide during preload/entry
BFCache restore with predecessor timers/messages
direct game route
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
test behavior changed by this audit: no
workflow changed by this audit: no
deployment changed by this audit: no
branch created: no
pull request created: no

source files inspected: yes
package test wiring inspected: yes
combined status checks reported: none
npm test independently run: no
browser protocol smoke: not run
built-output protocol smoke: not run
Pages protocol smoke: not run
```

No protocol integrity, stale-message fencing, duplicate suppression, entry rollback, visible-frame completion, BFCache convergence, deployment parity or production-readiness claim is made.