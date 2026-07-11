# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T08-58-02-04-00`

## Summary

The new lazy scheduler exists and has an isolated deterministic fixture, but the live browser route never steps it. Core World cells can therefore be active at the descriptor level while terrain, biome, shoreline, presentation, and visible rendering remain at different readiness states with no shared revision.

## Critical integration gaps

1. `src/main-cloudform.js` never calls `domains.processMaterializationFrame()`.
2. No explicit first-frame acknowledgement starts materialization.
3. The design document describes host startup behavior that the host does not implement.
4. The isolated fixture bypasses the route and wrapper animation loop.
5. No browser proof shows materialization progress above zero.
6. `getState().providerCellCounts` counts queued records, not ready provider outputs.
7. Core World active-cell status does not imply heavy provider data is ready.
8. The compatibility renderer cannot identify materialized or ready cells.

## Authority gaps

```txt
session identity and epoch: absent
accepted world revision: absent
materialization command identity: absent
cell work generation: absent
provider version fence: absent
first-frame admission: absent
elapsed-time work budget: absent
failure result: absent
retry/backoff policy: absent
stale completion rejection: absent
cell readiness revision: absent
provider readiness set: absent
bounded journal: absent
render handoff result: absent
```

## Scheduler gaps

- the scheduler limits candidate count, not actual elapsed work time;
- one stage call can have different computational cost by provider and resolution;
- provider exceptions propagate through `processFrame()` without a classified result;
- no per-cell attempt count, retry delay, terminal failure, or quarantine state exists;
- `sync()` removes released scheduler state but publishes no cancellation result;
- a released cell can lose partial job state without an explicit retirement record;
- focus/world revision changes are not attached to queued work;
- no re-entry policy distinguishes resumed work from a new cell generation;
- completed cell state is Boolean rather than revisioned;
- progress counts completed cells only and does not aggregate partial row progress.

## Provider readiness gaps

- terrain, biome, and shoreline descriptors become active before their heavy data is ready;
- provider descriptor versions increment during registration and readiness refresh without a shared cell revision;
- presentation readiness checks provider stores but records no provider version set;
- vegetation, rock, and prop data follow the existing eager provider path while terrain classifications are lazy;
- there is no canonical required-provider readiness policy for a render cell;
- a presentation descriptor can be rebuilt without a transaction joining its source versions;
- provider runtime stores expose mutable implementation records rather than clone-safe readiness results.

## Focus and release gaps

- lazy work is not fenced to the focus transaction that selected the cell;
- focus updates can change active cells while work is partially complete;
- released work has no cancellation sequence or stale-result rejection token;
- `updateWorldFocus()` still returns Boolean and exposes no accepted world revision;
- failed focus updates can split wrapper/Core World/provider state before lazy scheduling is considered;
- reset and disposal clear state but have no in-flight materialization admission fence.

## Render gaps

- the whole-island compatibility graph remains the only live visual source;
- materialized provider fields are not consumed by visible resources;
- no detached render plan cites `cellReadinessRevision`;
- no atomic cell prepare/update/release render transaction exists;
- no compatibility-to-cell-render handoff or rollback policy exists;
- no first visible frame acknowledges the provider versions it consumed;
- existing cell cache/controller/disposal helpers remain disconnected from the host.

## Lifecycle gaps retained

- no route-level runtime-session owner;
- no startup acquisition and rollback stack;
- no listener, timer, animation-loop, resource, or global-host leases;
- `pagehide` disposes only the world wrapper;
- no complete renderer/GPU teardown;
- no restart and stale-callback fixture.

## Missing fixture matrix

```txt
live host invokes materialization after first frame
no materialization before first frame
session/world revision admission
row and elapsed-time budgets
priority stability across identical runs
focus reprioritization
release during terrain stage
release during biome stage
release during shoreline stage
reset/dispose during work
terrain provider exception
classification provider exception
presentation refresh exception
bounded retries and terminal failure
provider readiness version parity
stale completion rejection
compatibility rendering during partial work
cell readiness to visible render correlation
WebGPU and WebGL2 browser smoke
```

## Deployment blockers

```txt
production queue is never stepped
isolated fixture is not route proof
no browser progress readback
no failure containment around animation-loop materialization
no cell readiness revision
no render consumer for ready cells
focus transaction and lifecycle prerequisites remain absent
```

## Secondary risks

- static whole-island rendering hides the dead integration path;
- small clearing movement makes cell turnover uncommon in manual testing;
- increasing active radius or resolution magnifies unbounded stage cost;
- provider version increments can appear healthy while runtime data remains queued;
- future cell rendering can expose stale or partially materialized records if readiness remains Boolean.

## Not currently blocked by

- repository identity or main-branch policy;
- pinned Three.js and NexusEngine coordinates;
- 50 local kit descriptors;
- seven registered provider definitions;
- deterministic scheduler priority;
- row-based terrain, biome, and shoreline implementations;
- isolated lazy materialization fixture;
- static compatibility render fallback;
- GitHub Pages configuration.
