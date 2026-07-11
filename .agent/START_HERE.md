# START HERE: MyCozyIsland

Last aligned: `2026-07-11T09-08-59-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: turn the newly live lazy Core World materialization loop into a revisioned readiness commit that visible rendering can consume safely.

## Summary

`MyCozyIsland` now calls `processMaterializationFrame()` from the production animation loop after the compatibility island has rendered. This fixes the earlier dead integration path: terrain, biome, shoreline, and presentation work can now advance in the live route. The remaining boundary is authority and consumption. Materialization has no session/world/cell generation fence, no typed failure result or elapsed-time budget, and no ready-cell revision reaches the renderer.

## Plan ledger

**Goal:** document the post-integration runtime and define the smallest command/result, readiness, and render-commit boundary needed before replacing the whole-island compatibility graph with cell-aware resources.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` because new runtime commits landed after the prior central audit.
- [x] Trace the production animation loop, world wrapper, materializer, provider stores, presentation descriptors, bridge, cache, and tests.
- [x] Identify the interaction loop, domains, 50 local kits, runtime-implied kits, and services.
- [x] Confirm live materialization starts after the second committed compatibility frame.
- [x] Confirm ready presentation descriptors are not consumed by visible rendering.
- [x] Add timestamped architecture, render, gameplay, interaction, Core World, and deploy audits.
- [x] Change no runtime or deployment behavior in this documentation pass.
- [x] Push only to `main`; create no branch or pull request.

## Current interaction loop

```txt
route startup
  -> validate 50 local kit descriptors
  -> initialize WebGPU/WebGL2
  -> create Core World wrapper and seven providers
  -> prepare origin and register 49 lightweight cells
  -> create one compatibility render snapshot
  -> build the whole-island scene, ocean, atmosphere, and post graph
  -> register input and animation loop

per frame
  -> scenario.tick(dt)
  -> project camera
  -> updateWorldFocus(camera, mode, dt)
  -> update compatibility world and foam
  -> sample performance
  -> render compatibility frame
  -> after frame 2, process one configured materialization stage
  -> expose aggregate progress in debug and global host state
```

## Main finding

The production queue is no longer dead. The new gap is that a synchronous helper result is treated as readiness authority without carrying the identity required to make it safe or renderable.

```txt
materialization currently proves:
  one scheduler step ran
  aggregate counters changed
  a provider stage may have advanced
  a presentation descriptor may now say ready

materialization does not prove:
  which session/world/focus revision admitted the work
  whether the cell generation is still current
  which provider descriptor versions were joined
  whether a failure was classified and contained
  whether an elapsed-time budget was respected
  whether a renderer accepted the ready revision
  whether a visible frame consumed it
```

`getPresentationDescriptors()` and `createRendererCellCache()` exist, but `src/main-cloudform.js` never reads or commits them. The visible world remains the startup compatibility snapshot.

## Required authority flow

```txt
committed compatibility frame
  -> admit MaterializationFrameCommand
  -> fence to sessionEpoch + worldRevision + focusRevision
  -> synchronize active cells and cellGeneration
  -> spend bounded row and elapsed-time budget
  -> classify provider-stage result or failure
  -> join required provider versions
  -> commit CellReadinessRevision
  -> refresh presentation descriptor with source versions
  -> prepare/update/release detached cell resources
  -> atomically commit renderer-cell revision
  -> acknowledge first visible frame
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Focus Transaction Authority
3. Live Materialization Readiness Commit Authority
4. Core World Render Commit Authority
5. Camera Rail Baseline Authority
6. Dynamic Environment Frame Authority
7. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T09-08-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T09-08-59-04-00.md
.agent/architecture-audit/2026-07-11T09-08-59-04-00-live-materialization-readiness-commit-dsk-map.md
.agent/render-audit/2026-07-11T09-08-59-04-00-ready-cell-render-consumption-gap.md
.agent/gameplay-audit/2026-07-11T09-08-59-04-00-camera-focus-materialize-render-loop.md
.agent/interaction-audit/2026-07-11T09-08-59-04-00-frame-materialization-result-map.md
.agent/core-world-audit/2026-07-11T09-08-59-04-00-live-materialization-generation-readiness-contract.md
.agent/deploy-audit/2026-07-11T09-08-59-04-00-live-materialization-render-fixture-gate.md
```

## Do not start next with

- reverting to claims that the live queue never advances;
- replacing the compatibility world before renderer rollback and disposal exist;
- treating `materialization: "ready"` as a versioned render commit;
- increasing active radius, row budgets, or terrain resolution;
- swallowing provider exceptions inside the animation loop;
- creating a parallel world framework instead of extending the existing wrapper and Core World DSK.