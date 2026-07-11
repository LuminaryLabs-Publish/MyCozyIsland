# START HERE: MyCozyIsland

Last aligned: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: establish one route-owned runtime session that can start, stop, roll back, dispose, and restart the WebGPU scene without leaked listeners, timers, animation loops, GPU resources, or stale global state.

## Plan ledger

**Goal:** document the complete 50-kit route and define the first implementation gate around runtime-session identity, resource ownership, ordered disposal, and deterministic restart.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` as the oldest eligible documented repository.
- [x] Read route startup, renderer factories, browser side effects, package scripts, tests, and prior audits.
- [x] Reconfirm the interaction loop, domains, services, and all 50 implemented kits.
- [x] Trace startup, partial failure, running, stop, disposal, restart, and stale-session admission.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, and deployment audits.
- [x] Refresh all required root `.agent` files.
- [x] Change no runtime source, dependency, route behavior, rendering, or deployment configuration.
- [x] Create no branch or pull request.

## Selection result

All nine eligible non-Cavalry repositories were already tracked and documented. At selection, the central timestamps were:

```txt
MyCozyIsland       2026-07-11T02-02-59-04-00  selected
AetherVale         2026-07-11T02-10-13-04-00
IntoTheMeadow      2026-07-11T02-28-12-04-00
PrehistoricRush    2026-07-11T02-48-17-04-00
TheOpenAbove       2026-07-11T03-01-38-04-00
HorrorCorridor     2026-07-11T03-18-44-04-00
PhantomCommand     2026-07-11T03-41-49-04-00
ZombieOrchard      2026-07-11T03-48-31-04-00
TheUnmappedHouse   2026-07-11T04-00-07-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing, root-`.agent`-missing, or recently added undocumented repository took precedence. Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPU or WebGL2 renderer and startup quality
  -> compose deterministic world and environment source graph
  -> create scenario, camera, scene, sky, lights and all render consumers
  -> install wheel, pointer, keyboard, blur and resize listeners
  -> schedule loader completion timeouts
  -> renderer.setAnimationLoop
  -> scenario tick, camera projection, world/foam update, performance sample and post render
  -> globalThis.CozyIsland publishes live runtime objects
```

## Newly documented lifecycle finding

`main()` is the effective owner of the complete route, but it returns no runtime-session handle. It acquires browser and GPU resources through local variables, installs anonymous side effects, starts the animation loop, publishes live objects globally, and has no common release path.

```txt
startup
  -> no acquisition journal
  -> no startup transaction
  -> no partial-failure rollback
  -> no session epoch

running
  -> no stop
  -> no stale-callback admission

teardown
  -> no listener removal
  -> no timeout cancellation
  -> no animation-loop clear
  -> no scene/resource disposal
  -> no renderer disposal
  -> no global-host tombstone

restart
  -> no old-session retirement proof
```

Renderer factories expose operational handles but no shared `dispose()` contract. Geometry, materials, 2D/3D textures, storage textures, compute nodes, passes, pipeline resources, shadow resources, listeners, timers, and the renderer backend have no authoritative owner.

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal and Restart Fixture Gate

2. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. Terrain Clearing Surface Authority
   + Edge/Seating/Layer-Coherence Fixture Gate

4. Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

5. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T04-09-54-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T04-09-54-04-00.md
.agent/architecture-audit/2026-07-11T04-09-54-04-00-runtime-session-resource-authority-dsk-map.md
.agent/render-audit/2026-07-11T04-09-54-04-00-webgpu-resource-disposal-restart-gap.md
.agent/gameplay-audit/2026-07-11T04-09-54-04-00-start-stop-restart-scenario-loop.md
.agent/interaction-audit/2026-07-11T04-09-54-04-00-listener-timeout-session-admission-map.md
.agent/lifecycle-audit/2026-07-11T04-09-54-04-00-route-session-epoch-disposal-contract.md
.agent/deploy-audit/2026-07-11T04-09-54-04-00-runtime-lifecycle-fixture-gate.md
```

## Do not start next with

- more cloud, fog, ocean, grass, terrain, lighting, post-processing, or quality resources
- renderer replacement
- new island content
- more camera or visual tuning
- runtime restart by simply calling `main()` again
- public kit promotion before lifecycle fixture proof

Every later authority slice should bind to a stable session epoch and disposal path.
