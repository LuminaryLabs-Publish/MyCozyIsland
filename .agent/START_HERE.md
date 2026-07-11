# START HERE: MyCozyIsland

Last aligned: `2026-07-11T06-50-30-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: establish contract parity between the pinned NexusEngine Core World runtime used by the browser and the local fake runtime used by Node tests, then make focus and active-cell transitions return a typed, failure-visible result.

## Plan ledger

**Goal:** prove that the test harness exercises the same provider lifecycle and failure semantics as the pinned production runtime, and define the transaction boundary required before Core World cells can become visible render authority.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` as the oldest eligible documented repository.
- [x] Read the production host, world wrapper, provider stores, provider implementations, local fake runtime, Node fixtures, and pinned Core World implementation.
- [x] Identify the interaction loop, active domains, services, complete 50-kit catalog, imported Core World services, providers, adapters, and validation surfaces.
- [x] Compare production cell-selection, capability, rollback, failure, diagnostic, and release behavior with the local test double.
- [x] Add timestamped architecture, render, gameplay, interaction, world-provider, and deploy audits.
- [x] Refresh the required root `.agent` documents.
- [x] Change no runtime source, package scripts, rendering, or deployment configuration.
- [x] Create no branch or pull request.

## Selection result

All nine eligible non-Cavalry repositories were already documented. Central timestamps placed `MyCozyIsland` at `2026-07-11T05-10-36-04-00`, earlier than every other eligible repository, so the oldest-documented fallback selected it.

```txt
MyCozyIsland       2026-07-11T05-10-36-04-00  selected
TheOpenAbove       2026-07-11T05-25-29-04-00
HorrorCorridor     2026-07-11T05-28-29-04-00
PrehistoricRush    2026-07-11T05-39-11-04-00
PhantomCommand     2026-07-11T05-50-43-04-00
ZombieOrchard      2026-07-11T06-02-00-04-00
TheUnmappedHouse   2026-07-11T06-21-57-04-00
AetherVale         2026-07-11T06-29-11-04-00
IntoTheMeadow      2026-07-11T06-38-59-04-00
TheCavalryOfRome   excluded
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current interaction loop

```txt
index.html
  -> pinned Three.js and NexusEngine imports
  -> validate 50 local kit descriptors
  -> initialize WebGPU/WebGL2 backend and quality
  -> create legacy semantic composition
  -> create Core World wrapper and seven providers
  -> prepare 49 active cells
  -> bridge provider rows into one startup render snapshot
  -> construct the whole-island Three/WebGPU graph
  -> sample wheel, pointer, keyboard, blur, resize and time
  -> tick scenario and camera
  -> submit focus to Core World
  -> production Core World releases, updates and prepares cells
  -> wrapper returns only true/false
  -> visible renderer continues from the startup snapshot
  -> post render and diagnostics
```

## Newly documented finding

The browser uses pinned NexusEngine commit `38229f59c22cb40024ffd13a9f48040de759f5d7`, but the Node world fixtures inject `tests/helpers/fake-nexus-world.mjs`.

The fake does not model the production contract:

```txt
production Core World
  partition result: required / retained / released / updated
  provider matching and capability requirements
  critical-provider failure states
  per-cell rollback and diagnostics
  release-before-prepare world transitions
  failed cell records committed into the world snapshot

local fake
  partition result: bare cell array
  unconditional provider execution
  no capability admission
  no critical failure or diagnostics
  no rollback behavior
  always-active cell rows
```

There is also a wrapper retry defect: `prepare()` sets `prepared = true` before `commitFocus()`. If the pinned runtime throws, later `prepare()` calls return the still-null snapshot instead of retrying.

The current compatibility renderer masks most provider failures because it was built from the initial global snapshot. A future cell-aware renderer would expose missing or failed cells unless focus transitions become typed, staged, correlated, and failure-visible first.

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal and Restart Fixture Gate

2. Pinned Core World Contract Parity and Focus Transaction Authority
   + Production-Runtime Failure Parity Fixture Gate

3. Core World Render Commit Authority
   + Provider/Cell Consumer Fidelity Fixture Gate

4. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

5. Dynamic Environment Frame Authority
   + Consumer Coherence Fixture Gate

6. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

Lifecycle remains first. Contract parity is now second because render commits cannot safely consume a world revision whose provider failures and active-cell completeness were never proven against the shipped runtime.

## Read this pass first

```txt
.agent/trackers/2026-07-11T06-50-30-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T06-50-30-04-00.md
.agent/architecture-audit/2026-07-11T06-50-30-04-00-pinned-core-world-contract-dsk-map.md
.agent/render-audit/2026-07-11T06-50-30-04-00-provider-failure-render-consumption-gap.md
.agent/gameplay-audit/2026-07-11T06-50-30-04-00-focus-cell-transition-loop.md
.agent/interaction-audit/2026-07-11T06-50-30-04-00-focus-command-result-map.md
.agent/world-provider-audit/2026-07-11T06-50-30-04-00-production-runtime-test-double-parity-contract.md
.agent/deploy-audit/2026-07-11T06-50-30-04-00-pinned-runtime-failure-parity-fixture-gate.md
```

## Do not start next with

- visible cell-render authority
- expanded movement or active radius
- removal of `?world=legacy`
- new world content or visual systems
- additional persistent GPU resources
- changes to terrain, biome, vegetation, grass, rocks, ocean, cloud, fog, lighting, or quality algorithms
- treating the current fake-runtime fixtures as production Core World proof
