# START HERE: MyCozyIsland

Last aligned: `2026-07-11T08-41-02-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make Core World focus movement one retriable, observable transaction across wrapper state, the pinned production runtime, provider stores and the visible world before wiring provider cells into live rendering.

## Summary

`MyCozyIsland` has a deterministic 50-kit semantic world, seven Core World providers and a WebGPU-first renderer. The current wrapper commits focus in two steps, mutates its own bookkeeping before the production update completes, collapses every outcome to a Boolean and is tested only through a simplified fake runtime. A failed focus update can therefore split Core World focus, wrapper state, provider stores and the last visible snapshot without a typed result or retry boundary.

## Plan ledger

**Goal:** establish one versioned focus transaction that either commits a complete world/provider revision or returns a classified failure while preserving the last accepted revision and allowing deterministic retry.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked with root `.agent` state.
- [x] Avoid `IntoTheMeadow` because same-minute documentation commits were actively landing during selection.
- [x] Select only `MyCozyIsland` as the next stable oldest eligible repository.
- [x] Read the route host, Core World wrapper, production pinned world builder, fake runtime and lifecycle fixtures.
- [x] Identify the interaction loop, active domains, all kits and all service groups.
- [x] Trace initial prepare, normal focus movement and failure boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, Core World and deploy audits.
- [x] Refresh every required root `.agent` document.
- [x] Change no runtime source, package scripts, rendering or deployment configuration.
- [x] Push only to `main`; create no branch or pull request.

## Selection result

The accessible Publish inventory contains ten repositories. `TheCavalryOfRome` is excluded. All nine eligible repositories are already tracked and contain root `.agent` state. `IntoTheMeadow` was the nominal oldest entry, but it received active same-minute documentation writes during this run, so `MyCozyIsland` was selected as the next stable eligible target to avoid concurrent edits.

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current interaction loop

```txt
index.html
  -> pinned Three.js 0.185.0 and NexusEngine commit imports
  -> validate 50 local kit descriptors
  -> construct and initialize WebGPURenderer
  -> create Core World wrapper
  -> prepare initial focus at origin
       wrapper prepared = true
       wrapper lastFocus = origin
       Core World setFocus commits focusChanged
       Core World updateWorld prepares 49 cells through seven providers
       wrapper stores worldSnapshot and lastCellKey
  -> flatten provider state into one startup compatibility render snapshot
  -> construct scene, world, ocean, atmosphere, post and debug resources
  -> register input and animation loop
  -> each frame:
       scenario tick
       derive camera transform
       updateWorldFocus(camera position, mode, dt)
       update static whole-island presentation
       render
```

## Main finding

The wrapper has no atomic focus operation.

```txt
commitFocus(target)
  -> mutate wrapper lastFocus
  -> Core World setFocus(target) commits focusChanged
  -> Core World updateWorld() releases, updates and prepares cells/providers
  -> mutate wrapper worldSnapshot, lastCellKey and accumulator
```

If `updateWorld()` throws after `setFocus()` succeeds:

```txt
Core World focus: new
wrapper lastFocus: new
wrapper worldSnapshot: previous or null
wrapper lastCellKey: previous
focus accumulator: not reset
provider stores: may have release/prepare side effects
visible renderer: unchanged startup snapshot
public result: exception or Boolean only
retry identity: absent
```

Initial `prepare()` has an additional poison path: it sets `prepared = true` before `commitFocus()` succeeds. A failed first prepare can make later calls return the stale `worldSnapshot` instead of retrying.

The test adapter does not model the pinned production contract. It returns a flat cell array rather than `required/retained/released/updated`, omits provider matching, capability admission, diagnostics, failed cells and production rollback semantics, and every current world-runtime test injects that fake.

## Required authority flow

```txt
FocusCommand
  -> session/epoch and expected world revision admission
  -> capture accepted wrapper/Core World/provider checkpoint
  -> validate target and partition selection
  -> stage provider release/update/prepare outcomes
  -> classify complete, degraded, rejected or failed result
  -> commit wrapper focus, world snapshot, cell key and provider revision together
  -> publish immutable FocusTransactionResult
  -> admit render consumption only for accepted world revision
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
   + Startup Rollback / Stop / Dispose / Restart Fixture Gate

2. Pinned Core World Focus Transaction Authority
   + Production/Fake Contract Parity and Failure Fixture Gate

3. Core World Render Commit Authority
   + Provider/Cell Consumer Fidelity Fixture Gate

4. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

5. Dynamic Environment Frame Authority
   + Consumer Coherence Fixture Gate

6. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

Lifecycle remains prerequisite infrastructure. This pass defines the complete second gate so implementation can proceed without treating a Boolean focus change as an accepted world revision.

## Read this pass first

```txt
.agent/trackers/2026-07-11T08-41-02-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T08-41-02-04-00.md
.agent/architecture-audit/2026-07-11T08-41-02-04-00-core-world-focus-transaction-dsk-map.md
.agent/render-audit/2026-07-11T08-41-02-04-00-focus-world-render-revision-split.md
.agent/gameplay-audit/2026-07-11T08-41-02-04-00-camera-focus-cell-transition-loop.md
.agent/interaction-audit/2026-07-11T08-41-02-04-00-focus-command-admission-map.md
.agent/core-world-audit/2026-07-11T08-41-02-04-00-production-fake-focus-contract.md
.agent/deploy-audit/2026-07-11T08-41-02-04-00-focus-transaction-parity-fixture-gate.md
```

## Do not start next with

- visible provider-cell rendering before focus results have accepted revision identity
- replacing the pinned NexusEngine runtime without a contract comparison
- expanding the active radius or movement bounds
- removing `?world=legacy`
- adding new terrain, vegetation, grass, ocean, cloud, fog or quality systems
- treating `updateWorldFocus() === true` as proof of a complete provider commit
- treating fake-runtime success as production-runtime parity
