# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T08-41-02-04-00`

## Summary

The immediate new gap is focus transaction integrity. The wrapper, production Core World and provider stores do not share one accepted revision, and current tests cannot reproduce the production failure modes because they inject a simplified fake runtime.

## Critical focus gaps

1. `prepare()` sets `prepared = true` before initial focus and cell preparation succeed.
2. A failed initial prepare can poison later `prepare()` calls into returning `null` or stale state without retry.
3. `commitFocus()` changes wrapper `lastFocus` before production Core World work completes.
4. Production `setFocus()` commits independently before `updateWorld()`.
5. No wrapper transaction restores the previous focus after an update failure.
6. Provider runtime stores mutate during release/update/prepare without a wrapper-level checkpoint.
7. `updateWorldFocus()` returns Boolean and loses complete, degraded, rejected, rolled-back and partial outcomes.
8. No monotonic product `worldRevision` exists.
9. No provider revision set or provider transition journal exists.
10. No focus command carries expected session, epoch or world revision.
11. No repeat-command idempotency policy exists.
12. The visible renderer cannot identify which accepted world revision it represents.

## Production/fake parity gaps

- production partition selection uses `required`, `updated`, `retained` and `released`; the fake returns one flat array;
- production validates selections; the fake does not;
- production evaluates provider `matches()`; the fake invokes every provider;
- production checks required capabilities; the fake does not;
- production records provider statuses and diagnostics; the fake does not;
- production can mark cells failed; the fake always stores active rows;
- production rolls back prepared providers for failed new cells; fake rollback is absent;
- production rejects async provider methods; parity is untested;
- production commits `focusChanged` and `cellsChanged` separately; the fake mutates direct maps;
- production provider release/update failure semantics are not represented;
- all current world-runtime tests inject the fake rather than the pinned modules.

## Focus failure splits

### Failure after `setFocus()`

```txt
Core World focus: target
wrapper lastFocus: target
wrapper worldSnapshot: previous or null
wrapper lastCellKey: previous
focus accumulator: previous value
provider stores: possibly changed
visible renderer: startup snapshot
```

### Failure during provider work

```txt
some releases may have run
some prepares/updates may have run
Core World state commit may not have run
provider runtime stores can differ from last accepted worldSnapshot
wrapper exposes no residual or rollback result
```

### Failure during initial prepare

```txt
prepared: true
worldSnapshot: null or partial/stale
second prepare: early return
recovery command: absent
```

## Missing focus authority types

```txt
FocusCommand
FocusAdmissionResult
FocusCheckpoint
ProviderStoreCheckpoint
FocusSelectionPlan
ProviderTransitionResult
FocusTransactionResult
FocusRollbackResult
WorldRevision
ProviderRevisionSet
FocusJournalEntry
FocusObservation
```

## Lifecycle gaps retained

- no route-level runtime-session owner;
- no `sessionId`, `sessionEpoch` or lifecycle state machine;
- no startup rollback stack;
- no listener, timer, animation-loop or global-host lease registry;
- `pagehide` resets only the world wrapper;
- no complete render/GPU teardown;
- no restart or stale-callback rejection proof.

Focus authority must consume lifecycle identity when implemented.

## Render-consumer gaps

- the whole-island renderer is built once from the startup compatibility snapshot;
- later provider transitions are not applied to visible resources;
- focus failure can be visually masked because the global graph keeps rendering;
- no render admission policy exists for incomplete or degraded world revisions;
- no cell prepare/update/release render transaction is wired into the route;
- no world revision to render commit mapping exists;
- no visible provider-cell fingerprint or readback exists;
- the implemented renderer-cell controller remains disconnected from the live host.

## Scenario and environment gaps retained

- pointer drag during rail mode mutates authored rail points and reset does not restore the baseline;
- environment time advances while multiple render descriptors remain startup-frozen;
- adaptive quality can report recovery while renderer DPR remains degraded;
- performance sampling is not tied to a render-submit result.

## Missing proof matrix

```txt
exact pinned Core World Node import
production/fake contract matrix
initial prepare failure and retry
failure after focusChanged commit
partition selection failure
provider capability-block failure
critical provider prepare rollback
noncritical provider degraded commit
provider release failure
provider-store checkpoint and restore
wrapper/Core World focus parity
active-cell/provider-store parity
world revision monotonicity
stale session/epoch/revision rejection
repeat command idempotency
focus result snapshot portability
focus-to-render revision correlation
```

## Deployment blockers

```txt
fake-runtime success is treated as production proof
failed initial prepare cannot be retried
focusChanged can commit without a classified cellsChanged outcome
provider stores can diverge from wrapper snapshot without readback
Boolean focus result hides degraded or partial state
rendering consumes no accepted world revision
focus parity fixtures are absent from npm test
browser smoke does not inject production provider failure
```

## Secondary risks

- central-clearing movement bounds make cross-cell failures rare in manual testing;
- the static whole-island graph makes world-streaming divergence visually subtle;
- future live cell rendering will amplify provider-store and resource ownership mismatches;
- a NexusEngine upgrade can change provider behavior without a pinned parity fixture;
- lifecycle restart without focus revision identity can replay stale world work into a new session.

## Not currently blocked by

- repository identity;
- pinned dependency coordinates;
- local 50-kit catalog count;
- deterministic normal-path generation;
- seven provider definitions;
- static Pages deployment configuration;
- availability of a legacy rollback mode.
