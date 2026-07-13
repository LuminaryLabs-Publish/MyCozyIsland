# Next steps: MyCozyIsland browser page-lifecycle authority

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

Replace the direct once-only `pagehide` effect with a lifecycle coordinator that classifies retained suspension, resume and terminal retirement and waits for complete participant receipts.

## Plan ledger

**Goal:** prevent partial disposal and make every lifecycle transition generation-fenced, idempotent and observable.

- [ ] Add runtime-session and page-lifecycle generation identities.
- [ ] Define `PageLifecycleCommand`, lifecycle phases and terminal result schemas.
- [ ] Adapt `pagehide`, `pageshow`, visibility and explicit stop into command envelopes.
- [ ] Classify `pagehide.persisted` before choosing Suspend or Retire.
- [ ] Register animation loop, input, save and render resources as lifecycle participants.
- [ ] Implement suspension without destructive renderer disposal.
- [ ] Implement resume with wall-time reset, a new input generation and participant validation.
- [ ] Rebuild gameplay presentation only when retention validation fails.
- [ ] Implement complete terminal retirement in dependency order.
- [ ] Add save write/readback receipts to suspend and retire barriers.
- [ ] Reject duplicate and stale lifecycle events.
- [ ] Revoke `globalThis.CozyIsland` capabilities after retirement.
- [ ] Publish first resumed visible-frame acknowledgement.
- [ ] Add WebGPU, WebGL2, source-server and Pages fixtures.

## Minimal implementation order

```txt
1. lifecycle identities, states, commands and results
2. browser event adapters and classification
3. participant registry and dependency graph
4. animation/input/save participant adapters
5. renderer/resource participant adapters
6. BFCache-safe suspension
7. validated resume and timing/input reset
8. terminal retirement and exactly-once receipts
9. diagnostics and lifecycle journal
10. visible resumed-frame acknowledgement
11. browser/backend/Pages fixtures
```

## Required acceptance cases

```txt
persisted pagehide does not dispose gameplay presentation
pageshow resumes the same runtime under a new lifecycle/frame generation
crop and forage visuals match authoritative state after return
target marker remains coherent after return
second and third round trips remain idempotent
terminal retirement stops frame production and detaches listeners
all registered resources retire exactly once
save flush failure is reported truthfully
late predecessor lifecycle events perform zero mutation
WebGPU and WebGL2 expose equivalent lifecycle results
Pages behavior matches the audited source
```

## Retained work

Adaptive-quality authority, durable-save commit authority, browser-input ownership, Agriculture transaction recovery and broader deployed parity remain open after this slice.