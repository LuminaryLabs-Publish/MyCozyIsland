# Next Steps: MyCozyIsland

Last updated: `2026-07-11T05-10-36-04-00`

## Plan ledger

**Goal:** preserve the new Core World semantic authority while introducing one lifecycle-safe, revisioned render-consumer path that can prove provider-to-visible-resource fidelity before the compatibility bridge is retired.

- [ ] Complete the route-session lifecycle and exact WebGPU/Three disposal gate first.
- [ ] Add a monotonic world revision for every accepted Core World update.
- [ ] Record ordered provider prepare/update/release results by world revision and cell ID.
- [ ] Produce one immutable presentation descriptor snapshot per accepted world revision.
- [ ] Add a typed world-render commit command and stable accepted/unchanged/rejected/failed result.
- [ ] Wire `renderer-world-cells` through a named cell-render resource owner.
- [ ] Track prepared, updated, retained, released, and rejected cell IDs.
- [ ] Track shared geometry, material, texture, and pipeline resources separately from cell-owned resources.
- [ ] Add explicit legacy, shadow-cell-consumer, and cell-authoritative policies.
- [ ] Make compatibility fallback explicit by object kind and revision.
- [ ] Correlate world revision, presentation revision, render revision, frame index, and source/render fingerprints.
- [ ] Add bounded JSON-safe focus, provider, and render result journals to `CozyIsland.getState()`.
- [ ] Add a DOM-free provider-to-render commit fixture to `npm test`.
- [ ] Add a browser focus-movement and cell-disposal smoke for WebGPU and WebGL2 fallback.
- [ ] Keep visible output on the compatibility renderer until shadow parity passes.

## Immediate infrastructure slice

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ WebGPU Resource Disposal and Restart Fixture Gate
```

The current source migration increases the importance of this gate because a cell-aware renderer will create and release resources dynamically.

## Immediate migration slice after lifecycle

```txt
MyCozyIsland Core World Render Commit Authority
+ Provider/Cell Consumer Fidelity Fixture Gate
```

## Candidate kits

```txt
world-revision-kit
focus-admission-result-kit
provider-result-journal-kit
presentation-descriptor-snapshot-kit
world-render-command-kit
world-revision-admission-kit
cell-render-resource-owner-kit
cell-render-prepare-kit
cell-render-update-kit
cell-render-release-kit
shared-render-resource-registry-kit
render-commit-result-kit
compatibility-render-policy-kit
world-render-correlation-kit
world-render-observation-kit
provider-render-fixture-kit
browser-cell-lifecycle-smoke-kit
```

These should reuse the lifecycle resource registry rather than create a second disposal system.

## Minimum world/render state

```txt
sessionEpoch
worldId
worldRevision
focusRevision
focusPosition
activeCellIds
providerRevisionById
presentationRevision
presentationFingerprint
renderPolicy
renderRevision
renderedCellIds
fallbackKinds
resourceCountsByKind
resourceCountsByCell
sourceFingerprint
renderFingerprint
lastFocusResult
lastWorldResult
lastRenderResult
recentResults
```

## Required render commit result

```txt
commandId
sessionEpoch
worldId
worldRevision
previousRenderRevision
renderRevision
status
reason
preparedCellIds
updatedCellIds
retainedCellIds
releasedCellIds
fallbackKinds
resourceDelta
sourceFingerprint
renderFingerprint
```

## Required fixture assertions

```txt
initial prepare produces one world revision and one render commit
same revision is unchanged
stale revision is rejected
provider phase order is stable
presentation rows match active cell IDs
one descriptor is consumed exactly once
released descriptors release cell-only resources exactly once
shared resources survive while referenced
compatibility fallback is explicit
shadow consumer matches legacy bounds, counts, IDs, and fingerprints
world and render revisions remain correlated
bounded readback structured-clones successfully
session stop/dispose rejects later world and render commits
```

## Browser proof

```txt
core mode boots under WebGPU
core mode boots under WebGL2 fallback
legacy mode remains available
shadow consumer changes no visible output
focus movement advances world and render revisions together
no duplicate cell groups appear
released groups leave the scene
pagehide/stop retires loop, listeners, timers, cell resources, shared resources, and global host
```

## Ordered follow-up slices

```txt
3. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

4. Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

5. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Deferred

- new world content or expanded movement
- active-radius changes
- terrain, biome, vegetation, grass, rock, ocean, cloud, fog, lighting, or post changes
- immediate removal of `?world=legacy`
- visible cell-authoritative cutover without shadow parity
- public kit promotion