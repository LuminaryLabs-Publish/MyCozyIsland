# START HERE: MyCozyIsland

Last aligned: `2026-07-11T08-58-02-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make lazy Core World cell materialization an admitted, session-owned frame service whose readiness results can be consumed by rendering.

## Summary

`MyCozyIsland` now registers lightweight Core World descriptors and includes deterministic row-bounded terrain, biome, shoreline, and presentation materialization. The isolated scheduler test is useful, but the live route never calls `processMaterializationFrame()`, so the production queue never advances after startup. The static compatibility island continues rendering while Core World provider records remain queued.

## Plan ledger

**Goal:** connect first-frame admission, bounded work, cell readiness, focus/release epochs, presentation refresh, render handoff, and diagnostics under one lazy-materialization authority.

- [x] Compare the full Publish inventory with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` because runtime work landed after the prior audit.
- [x] Trace the live route, world wrapper, scheduler, provider stages, presentation refresh, and deterministic test.
- [x] Identify all domains, all 50 local kits, runtime-implied kits, and services.
- [x] Add timestamped architecture, render, gameplay, interaction, Core World, and deploy audits.
- [x] Change no runtime source or deployment configuration in this documentation pass.
- [x] Push only to `main`; create no branch or pull request.

## Current interaction loop

```txt
route startup
  -> validate 50 local kit descriptors
  -> initialize WebGPU/WebGL2
  -> create Core World wrapper and seven providers
  -> prepare origin and register 49 lightweight cell descriptors
  -> build the existing whole-island compatibility render snapshot
  -> construct scene, ocean, atmosphere, post, and input
  -> start renderer animation loop

per frame
  -> scenario tick
  -> camera projection
  -> updateWorldFocus()
  -> update compatibility render uniforms
  -> render
  -> no processMaterializationFrame() call
```

The wrapper exposes `processMaterializationFrame()`, but `src/main-cloudform.js` does not invoke it. The queue therefore remains registered but unprocessed in the live browser path.

## Implemented lazy path

```txt
active Core World cell
  -> terrain descriptor queued
  -> terrain rows materialize
  -> biome rows consume terrain arrays
  -> shoreline rows reuse terrain shore distance
  -> presentation descriptor refreshes to ready
```

Priority is deterministic by LOD, distance to focus, then cell ID. Configuration currently permits one cell stage per frame, one terrain row per terrain step, and four classification rows per step.

## Main finding

The repository has two disconnected truths:

```txt
live route truth:
  compatibility island renders
  lazy scheduler is never stepped

isolated fixture truth:
  scheduler is stepped directly
  cells eventually reach ready
```

The test proves scheduler order and bounded row progress, not host admission, first-frame start, focus/release fencing, failure recovery, or render consumption.

## Required authority flow

```txt
first committed compatibility frame
  -> admit MaterializationFrameCommand for current session/epoch/world revision
  -> synchronize active cells
  -> reject stale or released work
  -> spend bounded row/time budget
  -> record provider-stage result
  -> commit CellReadinessRevision when all required stages are ready
  -> refresh presentation descriptor
  -> publish clone-safe observation
  -> hand accepted readiness revision to a later render-commit transaction
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Pinned Core World Focus Transaction Authority
3. Lazy Cell Materialization Authority
4. Core World Render Commit Authority
5. Camera Rail Baseline Authority
6. Dynamic Environment Frame Authority
7. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T08-58-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T08-58-02-04-00.md
.agent/architecture-audit/2026-07-11T08-58-02-04-00-lazy-cell-materialization-dsk-map.md
.agent/render-audit/2026-07-11T08-58-02-04-00-compatibility-render-materialization-commit-gap.md
.agent/gameplay-audit/2026-07-11T08-58-02-04-00-camera-focus-lazy-cell-work-loop.md
.agent/interaction-audit/2026-07-11T08-58-02-04-00-first-frame-materialization-admission-map.md
.agent/core-world-audit/2026-07-11T08-58-02-04-00-lazy-provider-readiness-contract.md
.agent/deploy-audit/2026-07-11T08-58-02-04-00-lazy-materialization-fixture-gate.md
```

## Do not start next with

- claiming heavy Core World work runs after the first browser frame
- wiring provider cells into visible rendering before readiness revisions exist
- expanding active radius or materialization budgets
- replacing the compatibility island before rollback and resource retirement exist
- treating isolated scheduler success as live-route proof
- creating a parallel world framework instead of extending the existing wrapper and Core World DSK
