# Next steps: MyCozyIsland cross-window preload and entry protocol

**Timestamp:** `2026-07-13T19-40-56-04-00`  
**Publication status:** `cross-window-preload-entry-protocol-authority-audited`

## Summary

Replace informal type-only parent/iframe messages with one versioned, generation-bound protocol. Keep Core Startup as readiness authority, but require entry preparation and the first visible game frame before reveal/history/focus are committed.

## Plan ledger

**Goal:** reject stale, duplicate, malformed and out-of-order cross-window work while preserving seamless hidden preload.

- [ ] Add `ProtocolVersion`, `ShellGeneration`, `FrameGeneration`, `PreloadAttemptId` and `EntryAttemptId`.
- [ ] Add immutable protocol envelopes with `MessageId`, sequence and payload fingerprint.
- [ ] Verify both `event.origin` and expected source window.
- [ ] Validate every message payload against a closed schema.
- [ ] Establish HELLO/PROGRESS/READY|FAILED ordering.
- [ ] Return typed admission results for malformed, foreign, stale, duplicate and out-of-order messages.
- [ ] Bind one entry request to the current ready revision.
- [ ] Make simulation resume and player preparation idempotent under `EntryAttemptId`.
- [ ] Return preparation failure instead of warning and continuing.
- [ ] Add renderer-derived post-resume submission evidence.
- [ ] Require `FirstVisibleGameFrameAck` before normal entry commit.
- [ ] Replace the anonymous 900 ms fallback with explicit `TimedOut` or `Degraded` policy.
- [ ] Atomically commit iframe reveal, history and focus.
- [ ] Retire timers, message ports and predecessor generations on pagehide/navigation.
- [ ] Add reload, BFCache, duplicate Play, timeout and deployed parity fixtures.

## Minimal implementation order

```txt
1. protocol envelope and version
2. shell/frame/preload generations
3. origin and source-window admission
4. schema validation and sequence policy
5. progress/ready/failure terminal results
6. entry attempt and ready-revision binding
7. idempotent resume/player preparation
8. entry prepared result
9. post-resume renderer submission receipt
10. first visible game-frame acknowledgement
11. reveal/history/focus commit
12. timeout/degraded policy
13. cancellation and retirement
14. fixture matrix and Pages parity
```

## Target files

```txt
src/menu.js
src/game-preload-bridge.js
src/main-adventure.js
tests/menu-game-shell-smoke.mjs
tests/cross-window-protocol-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

A small local protocol module should own envelopes, validation, IDs and admission results. Do not turn generic `postMessage` transport into a gameplay domain.

## Required acceptance cases

```txt
normal progress/ready/entry/frame/commit
wrong origin
wrong source
wrong protocol version
malformed payload
stale iframe generation
stale preload attempt
duplicate ready
duplicate Play
out-of-order progress after terminal ready
reload during preload
reload during entry
player preparation exception
entry timeout
explicit degraded reveal
late visible frame
pagehide and BFCache restoration
direct game route
source/build/Pages result parity
```

## Ownership constraints

Core Startup owns factual readiness. The protocol authority owns cross-window semantic admission and correlation. The game bridge owns freeze/resume and player preparation. The renderer owns frame evidence. The parent shell owns Play intent and commits visibility/history/focus only after a terminal protocol result.

## Retained work

Menu presentation lifecycle, provider-independent preload, complete renderer/resource retirement, durable saves, input authority, adaptive quality and page lifecycle remain open and must compose with this protocol.

## Do not claim

Do not claim protocol safety, stale-message fencing, entry atomicity, first-visible-frame completion, BFCache convergence or deployed parity until the fixture matrix passes on `main`.