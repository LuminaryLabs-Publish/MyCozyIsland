# Next steps: MyCozyIsland preload suspension lease and resumed-frame authority

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Publication status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

Keep the sleeping hidden game, but stop mutating engine and renderer ownership without a typed lease. Entry should restore one exact participant generation, execute a probe step and frame, then allow reveal only after a matching resumed-frame acknowledgement.

## Plan ledger

**Goal:** add the smallest targeted authority that makes preload suspension safe, retryable, and visibly proven.

- [ ] Add `PreloadGeneration`, `SuspensionAttemptId`, `SuspensionLeaseId`, `EntryAttemptId`, and `GameFrameId`.
- [ ] Bind the Core Startup descriptor revision to the suspension request.
- [ ] Capture engine, scheduler, renderer, callback, input and player participant identities.
- [ ] Replace direct method mutation with explicit suspend/resume services where available.
- [ ] Publish `PreloadSuspensionPreparationResult` before changing live participants.
- [ ] Commit suspension atomically and publish `PreloadSuspensionResult`.
- [ ] Reject stale, duplicate, missing and superseded entry requests.
- [ ] Validate that the engine and renderer still match the accepted suspension lease.
- [ ] Restore simulation, presentation, input and intro state as one transaction.
- [ ] Roll back to the coherent suspended predecessor when restoration fails.
- [ ] Execute one resumed simulation step and render probe.
- [ ] Publish `GameEntryResult` and `FirstResumedGameFrameAck`.
- [ ] Make the parent reveal depend on the matching frame acknowledgement.
- [ ] Replace the 900 ms reveal with a classified timeout result and explicit recovery controls.
- [ ] Add schema, origin, sequence and revision admission to both message listeners.
- [ ] Cancel interval and timeout work through owned lifecycle handles.
- [ ] Preserve the retained postcard, startup-fallback, save, input and menu-retirement work.
- [ ] Add source, browser, built-output and Pages fixtures.

## Minimal implementation order

```txt
1. revision and lease identities
2. typed message envelopes
3. suspension preparation and participant manifest
4. atomic suspension result
5. correlated entry admission
6. atomic restoration and rollback
7. resumed simulation probe
8. resumed render probe
9. first visible-frame acknowledgement
10. timeout classification and recovery controls
11. browser fault matrix
12. build and Pages parity
```

## Target files

```txt
src/game-preload-bridge.js
src/menu.js
src/main-adventure.js
menu.html
game.html
tests/menu-game-shell-smoke.mjs
tests/preload-suspension-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
normal WebGPU preload and entry
normal WebGL2 preload and entry
repeated Play command
stale entry attempt
entry after engine replacement
entry after renderer replacement
missing animation callback
renderer restore exception
player intro preparation exception
parent acknowledgement timeout
child message delay and reordering
wrong origin and wrong source
pagehide during suspension
BFCache restore while suspended
reduced-motion zero-duration crossfade
first resumed tick identity
first resumed frame identity
source/build/Pages parity
```

## Ownership constraints

Core Startup remains the factual playable-readiness owner. The preload-suspension authority owns sleep and restoration leases. The shell owns reveal, history and recovery controls. Adventure kits retain gameplay truth. Renderer adapters perform frame submission but do not decide gameplay readiness.

## Do not claim

Do not claim coherent suspension, exact restoration, safe timeout fallback, visible entry, artifact parity, or deployed readiness until the executable matrix passes on `main`.
