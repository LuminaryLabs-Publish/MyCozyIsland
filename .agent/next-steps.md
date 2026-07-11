# Next Steps: MyCozyIsland

Last updated: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** keep lifecycle ownership first, then make the wrapper and test harness faithfully expose pinned Core World selection, provider-failure, rollback, diagnostic and active-cell completeness semantics before any provider revision reaches visible rendering.

- [ ] Complete the route-session lifecycle and exact WebGPU/Three disposal gate.
- [ ] Load the exact pinned Core World modules in a Node contract harness.
- [ ] Run the same contract matrix against the pinned runtime and the local fake.
- [ ] Replace or upgrade the fake until selection, capability, failure, diagnostic, rollback and release behavior match.
- [ ] Fix `prepare()` so a thrown initial focus commit leaves the wrapper retriable.
- [ ] Add monotonic session, focus, world and provider revisions.
- [ ] Replace Boolean focus results with a typed result envelope.
- [ ] Define whether an incomplete provider transition is rejected, rolled back or accepted as explicit degradation.
- [ ] Stage provider-store and active-cell changes before committing an accepted focus revision.
- [ ] Preserve the prior accepted focus and active-cell set on rejected transitions.
- [ ] Correlate every provider result with session epoch, focus command, world revision, cell ID and provider ID.
- [ ] Expose failed cells, missing capabilities, release failures and diagnostics through bounded JSON-safe readback.
- [ ] Add deterministic failure injection for each provider phase.
- [ ] Add a pinned-runtime focus/failure fixture to `npm test`.
- [ ] Add a browser smoke that proves the pinned import, failure result and recovery path.
- [ ] Keep the current compatibility renderer visible until contract parity and shadow render parity both pass.

## First infrastructure slice

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ WebGPU Resource Disposal and Restart Fixture Gate
```

Lifecycle remains first because focus commands, provider work and future render commits must be fenced by a session epoch and exact teardown boundary.

## Second infrastructure slice

```txt
MyCozyIsland Pinned Core World Contract Parity
+ Focus Transaction and Production-Runtime Failure Fixture Gate
```

## Candidate kits

```txt
core-world-runtime-identity-kit
core-world-contract-adapter-kit
focus-command-envelope-kit
focus-admission-kit
focus-transition-stage-kit
active-cell-set-transaction-kit
provider-failure-policy-kit
provider-result-journal-kit
provider-store-checkpoint-kit
focus-rollback-kit
focus-result-kit
world-correlation-kit
pinned-runtime-test-harness-kit
fake-runtime-contract-fixture-kit
production-runtime-failure-fixture-kit
browser-focus-failure-smoke-kit
```

## Minimum focus transaction state

```txt
sessionEpoch
runtimeCommit
worldId
worldSeed
focusCommandId
focusRevision
previousFocusRevision
requestedPosition
acceptedPosition
previousWorldRevision
worldRevision
previousActiveCellIds
activeCellIds
requiredCellIds
retainedCellIds
updatedCellIds
releasedCellIds
failedCellIds
providerResults
providerStoreVersions
status
reason
degradationPolicy
sourceFingerprint
resultFingerprint
recentResults
```

## Required focus result

```txt
commandId
sessionEpoch
runtimeCommit
worldId
previousFocusRevision
focusRevision
previousWorldRevision
worldRevision
status
reason
requestedPosition
acceptedPosition
requiredCellIds
retainedCellIds
updatedCellIds
releasedCellIds
failedCellIds
missingCapabilities
providerFailures
releaseFailures
rolledBackProviderIds
previousStatePreserved
sourceFingerprint
resultFingerprint
```

Allowed statuses should be explicit:

```txt
accepted-complete
accepted-degraded
unchanged
rejected-stale
rejected-invalid
failed-rolled-back
failed-partial
```

`accepted-degraded` and `failed-partial` must never be represented as Boolean success.

## Required contract matrix

Run each row against the pinned runtime and the fake adapter:

```txt
initial 49-cell prepare
same-cell unchanged focus
cross-cell required/retained/released selection
retained-cell update
provider not-applicable
missing required capability on noncritical provider
missing required capability on critical provider
foundation prepare failure
classification prepare failure
population prepare failure
presentation prepare failure
provider update failure
provider release failure
failed-cell retry
reset and dispose
snapshot portability
```

## Required fixture assertions

```txt
pinned runtime commit identity is recorded
fake and production selection deltas match
provider phase order matches
capability blocking and critical failure status match
provider diagnostics use stable codes
per-cell rollback order matches
prepare failure does not poison wrapper retry
rejected focus preserves previous accepted focus
rejected focus preserves previous active-cell set
rejected focus preserves provider-store fingerprints
partial/degraded outcomes are explicit
stale session or focus command is rejected
results structured-clone successfully
bounded journals contain no typed arrays, Maps, functions or GPU objects
```

If the chosen policy intentionally permits a partial world commit, the fixture must instead prove that failed cells are named, previous visible resources remain authoritative, and the render admission layer rejects the incomplete world revision.

## Third slice after contract parity

```txt
MyCozyIsland Core World Render Commit Authority
+ Provider/Cell Consumer Fidelity Fixture Gate
```

It should reuse the lifecycle resource registry and consume only focus/world results that satisfy the chosen completeness policy.

## Ordered follow-up slices

```txt
4. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

5. Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

6. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Deferred

- new world content or expanded movement
- active-radius changes
- immediate removal of `?world=legacy`
- visible cell-authoritative rendering
- terrain, biome, vegetation, grass, rocks, ocean, clouds, fog, lighting or post changes
- public kit promotion
