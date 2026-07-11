# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T09-08-59-04-00`

## Summary

The production route now runs lazy materialization after the compatibility frame. The remaining critical gap is that scheduler progress is not a versioned readiness transaction and is not consumed by visible rendering.

## Integration state

```txt
live host calls processMaterializationFrame: yes
first call occurs after second rendered frame: yes
aggregate progress reaches debug/global host: yes
presentation descriptors can become ready: yes
visible renderer consumes ready descriptors: no
renderer-cell cache is wired to host: no
visible-frame acknowledgement exists: no
```

## Authority gaps

```txt
session identity and epoch: absent
accepted world revision: absent
accepted focus revision: absent
materialization command identity: absent
cell generation: absent
provider version fence: absent
elapsed-time work budget: absent
classified failure result: absent
retry/backoff/quarantine policy: absent
stale completion rejection: absent
cell readiness revision: absent
provider readiness set: absent
renderer commit result: absent
visible-frame acknowledgement: absent
bounded journal: absent
```

## Scheduler gaps

- Candidate count and row count are bounded, but elapsed CPU time is not.
- A provider exception can escape synchronously through the animation callback.
- `sync()` removes released state without a typed cancellation or retirement result.
- Partial state has no `cellGeneration`, so later asynchronous work would have no stale-result fence.
- Completed state is Boolean instead of revisioned.
- Progress is based on completed cells, not aggregate partial row completion.
- Materialization cost is not correlated with a specific frame result.
- No concurrency guard prevents accidental re-entry if the path later becomes asynchronous.

## Provider readiness gaps

- Core World provider admission still means descriptors exist, not that heavy data is ready.
- Presentation readiness is derived from store presence and status, not a canonical source-version set.
- Vegetation, rocks, and props are referenced without a joined readiness fingerprint.
- Descriptor versions can increment without a cell-wide readiness revision.
- No policy declares which providers are mandatory, optional, degraded, or blocking for rendering.
- Runtime stores expose implementation records rather than immutable readiness rows.
- No provider failure can mark a cell as retriable, degraded, quarantined, or terminal.

## Focus and release gaps

- `updateWorldFocus()` returns Boolean rather than a typed accepted revision.
- Materialization work is not fenced to the focus transaction that admitted the active cell set.
- A released cell has no cancellation sequence or generation increment.
- Reset and dispose clear state but do not publish stale-command rejection results.
- The wrapper has no checkpoint or rollback spanning Core World and provider stores.

## Render gaps

- The whole-island compatibility snapshot is created once at startup.
- `worldRenderer.update()` receives elapsed time only.
- `getPresentationDescriptors()` is not read by the host.
- `createRendererCellCache()` is not connected to the route.
- Ready provider fields do not create or update visible terrain, vegetation, rock, prop, grass, or shoreline resources.
- No detached renderer plan cites `cellReadinessRevision`.
- No atomic prepare/update/release transaction exists.
- No rollback keeps the previous visible cell revision when preparation fails.
- No first visible frame cites the provider and renderer revisions it consumed.
- Resource disposal helpers are not exercised by live cell turnover.

## Lifecycle gaps retained

- No route-level runtime-session owner.
- No startup acquisition and rollback stack.
- Input listeners, timers, animation loop, renderer resources, and global host are not leased by one session.
- `pagehide` disposes the world wrapper only.
- Renderer, scene graph, volume textures, post resources, listeners, and animation loop are not fully retired.
- No restart or stale-callback fixture exists.

## Validation gaps

```txt
live route fixture for progress > 0
materialization command/result fixture
session/world/focus revision rejection
elapsed-time budget fixture
provider exception and retry fixture
cell-generation release fixture
provider readiness version parity
readiness fingerprint determinism
renderer-cell prepare/update/release fixture
render rollback fixture
visible-frame correlation
WebGPU browser smoke
WebGL2 browser smoke
Pages smoke with Core World progress
```

## Deployment blockers

```txt
no typed failure containment around live materialization
no accepted provider readiness revision
no render consumer for ready cells
no atomic renderer-cell rollback/disposal
no visible-frame proof
runtime lifecycle and focus prerequisites remain incomplete
```

## Secondary risks

- Static compatibility visuals can hide incorrect provider readiness indefinitely.
- A resolution increase can make one nominal row exceed the expected frame budget.
- Debug counters may look healthy while no visible resource changes.
- Future asynchronous provider work would make the current missing generation fence immediately unsafe.
- Repeated descriptor refreshes can allocate future cell resources without a disposal contract.

## Not currently blocked by

- repository identity or main-branch policy;
- pinned Three.js and NexusEngine revisions;
- 50 local kit descriptors;
- seven ordered provider definitions;
- lightweight registration;
- deterministic priority and row stepping;
- production invocation of the materializer;
- static compatibility fallback;
- GitHub Pages configuration.