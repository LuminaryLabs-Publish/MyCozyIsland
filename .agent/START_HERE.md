# START HERE: MyCozyIsland

Last aligned: `2026-07-11T11-10-29-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make Core World reset, dispose, and re-prepare behavior explicit before any browser restart, recovery, or live cell-render cutover depends on it.

## Summary

`MyCozyIsland` registers its Core World definition once during construction. Its public `reset()` then calls `coreWorld.resetWorlds()`, which releases active cells and clears the pinned runtime world definitions. The wrapper marks itself unprepared, but a later `prepare()` only calls `setFocus()` and `updateWorld()`; it never registers the world again. Reset therefore appears reusable at the product API while actually invalidating the runtime definition required by the next prepare.

## Plan ledger

**Goal:** document the reset/re-prepare defect and define one recoverable world-session transaction that preserves provider ordering, clears heavy state exactly once, re-registers the world definition when appropriate, and proves a fresh 49-cell state before rendering resumes.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` under the oldest eligible fallback rule.
- [x] Trace `createCozyIslandWorldRuntime()`, `prepare()`, `reset()`, `dispose()`, the pinned Core World reset contract, provider stores, materializer state, and existing tests.
- [x] Identify the interaction loop, domains, services, 50 local kits, seven providers, and runtime-implied adapters.
- [x] Confirm `resetWorlds()` clears runtime definitions in the pinned NexusEngine implementation.
- [x] Confirm product `prepare()` does not re-register the cleared world definition.
- [x] Confirm existing tests dispose once but never prove reset followed by prepare.
- [x] Add timestamped architecture, render, gameplay, interaction, recovery, and deploy audits.
- [x] Change no runtime or deployment behavior.
- [x] Push only to `main`; create no branch or pull request.

## Current interaction loop

```txt
route startup
  -> construct legacy semantic composition
  -> create seven provider adapters and stores
  -> create Core World engine
  -> register world definition once
  -> prepare at origin
  -> build compatibility render graph
  -> update focus and materialization each frame

reset path
  -> coreWorld.resetWorlds()
       release active provider cells
       reset providers
       clear runtime world definitions
       replace coordination state
  -> materializer.reset()
  -> clear wrapper prepared/snapshot/focus fields

subsequent prepare
  -> commitFocus(origin)
  -> setFocus(worldId)
  -> fails because the runtime definition was cleared
```

## Main finding

The wrapper currently conflates three different operations:

```txt
soft reset
  clear active cells and provider/materializer progress, retain definition

hard world teardown
  release cells, clear provider state, remove definition

final disposal
  retire the Core World domain and make the wrapper permanently unusable
```

`reset()` performs hard teardown but exposes soft-reset semantics. `dispose()` calls that reset and then resets the whole domain. Neither operation returns a typed result, generation, before/after fingerprint, release journal, or explicit reusable/terminal state.

## Required authority flow

```txt
ResetWorldCommand
  -> admit current session/world generation
  -> freeze focus and materialization admission
  -> checkpoint definition and provider identities
  -> release active cells in reverse provider order
  -> clear provider and materializer state exactly once
  -> choose soft-reset, recreate, or terminal-dispose policy
  -> re-register definition for reusable reset
  -> prepare origin and verify 49 active cells / seven provider layers
  -> publish WorldRecoveryResult and new generation
  -> allow rendering and materialization to resume
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T11-10-29-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T11-10-29-04-00.md
.agent/architecture-audit/2026-07-11T11-10-29-04-00-core-world-reset-reprepare-dsk-map.md
.agent/render-audit/2026-07-11T11-10-29-04-00-reset-render-state-divergence-gap.md
.agent/gameplay-audit/2026-07-11T11-10-29-04-00-reset-reprepare-world-loop.md
.agent/interaction-audit/2026-07-11T11-10-29-04-00-reset-prepare-result-map.md
.agent/recovery-audit/2026-07-11T11-10-29-04-00-world-definition-provider-store-recovery-contract.md
.agent/deploy-audit/2026-07-11T11-10-29-04-00-reset-reprepare-fixture-gate.md
```

## Do not start next with

- treating `reset()` and `dispose()` as synonyms;
- calling `prepare()` after reset without re-registering or retaining the world definition;
- reconnecting cell-aware rendering before reset/disposal ownership is fixture-backed;
- restoring only Core World coordination state while ignoring provider/materializer state;
- swallowing provider release failures;
- adding browser restart behavior without a monotonic world generation and stale-callback fence.
