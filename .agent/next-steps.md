# Next steps: MyCozyIsland browser page-lifecycle authority

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

Replace the direct once-only `pagehide` side effect with a lifecycle coordinator that classifies retained suspension, resume and terminal retirement and waits for complete participant receipts.

## Plan ledger

**Goal:** prevent partial disposal and make every lifecycle transition generation-fenced, idempotent and observable.

- [ ] Add runtime-session, lifecycle-command and lifecycle-generation identities.
- [ ] Define lifecycle phases and terminal `PageLifecycleResult` schemas.
- [ ] Adapt `pagehide`, `pageshow`, visibility and explicit stop into command envelopes.
- [ ] Classify `pagehide.persisted` before choosing Suspend or Retire.
- [ ] Register animation loop, input, save and every render resource as lifecycle participants.
- [ ] Suspend without destructive renderer disposal.
- [ ] Resume with wall-time reset, new input/frame generations and participant validation.
- [ ] Rebuild gameplay presentation transactionally when retained validation fails.
- [ ] Retire all resources in dependency order and exactly once.
- [ ] Add save write/readback receipts to suspend and retire barriers.
- [ ] Reject duplicate and stale lifecycle events.
- [ ] Revoke `globalThis.CozyIsland` capabilities after retirement.
- [ ] Publish first resumed visible-frame acknowledgement.
- [ ] Add WebGPU, WebGL2, source-build and Pages fixtures.

## Minimal implementation order

```txt
1. lifecycle identities, states, commands and results
2. browser event adapters and persisted classification
3. participant registry and dependency graph
4. animation/input/save participant adapters
5. renderer/resource participant adapters
6. BFCache-safe suspension
7. validated resume and timing/input reset
8. terminal retirement and exactly-once receipts
9. observations and lifecycle journal
10. first resumed visible-frame acknowledgement
11. browser/backend/build/Pages fixtures
```

## Required acceptance cases

```txt
persisted pagehide does not dispose gameplay presentation
pageshow resumes the retained runtime under a successor generation
crop, forage, target-marker and HUD state match after return
repeated round trips remain idempotent
terminal retirement stops frames and detaches listeners
all mandatory resources retire exactly once
save failure is reported truthfully
late predecessor events perform zero mutation
WebGPU and WebGL2 expose equivalent lifecycle results
production build and Pages match audited source behavior
```

## Retained work

Adaptive-quality authority, durable-save commit authority, browser-input ownership, Agriculture transaction recovery and broader deployed parity remain open.