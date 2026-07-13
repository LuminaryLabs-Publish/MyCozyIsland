# Next steps: MyCozyIsland adaptive render-quality authority

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

Move adaptive quality out of direct host callbacks and into a composed transaction that plans, commits, verifies and rolls back every registered render participant under one revision.

## Plan ledger

**Goal:** replace asymmetric callback mutation with verified quality transitions and visible-frame proof.

- [ ] Add runtime-session, quality-revision and render-generation identities.
- [ ] Define `AdaptiveQualityTransitionCommand` and terminal result types.
- [ ] Register DPR, cloud steps, fog steps and fog resolution as participants.
- [ ] Add capability and current-value readback for every participant.
- [ ] Build detached target plans for degrade and recover.
- [ ] Apply identical participant coverage in both directions.
- [ ] Verify actual values after commit.
- [ ] Roll back every changed participant on failure.
- [ ] Reject stale transitions after resize, backend or lifecycle generation changes.
- [ ] Project actual committed DPR, fog resolution and quality revision into diagnostics.
- [ ] Acknowledge the first visible frame for the committed render generation.
- [ ] Add WebGPU, WebGL2, source/build and Pages fixtures.

## Minimal implementation order

```txt
1. identity and command/result schemas
2. participant adapters and readback
3. detached transition planner
4. admission and stale rejection
5. atomic commit and verification
6. rollback
7. diagnostics projection
8. visible-frame receipt
9. browser/backend/Pages fixtures
```

## Required acceptance cases

```txt
0 -> 1 degrade restores all expected values
1 -> 2 degrade restores all expected values
2 -> 1 recover restores DPR and atmosphere values
1 -> 0 recover restores DPR and atmosphere values
failed participant leaves predecessor intact
failed verification rolls back all participants
late transition cannot mutate a newer generation
diagnostics equal actual readback
visible frame cites committed revision
```

## Retained work

Durable-save authority, browser-input ownership, coordinated runtime retirement, Agriculture transaction recovery and deployed parity remain open after this slice.