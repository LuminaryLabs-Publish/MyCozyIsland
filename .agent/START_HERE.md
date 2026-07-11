# START HERE: MyCozyIsland

Last aligned: `2026-07-11T07-01-49-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: establish one route-session owner for startup, frame admission, input, timers, Core World focus work, global exposure, WebGPU resources, stop, disposal and restart before making provider cells visually authoritative.

## Plan ledger

**Goal:** make every browser-side resource and asynchronous callback belong to one identified runtime session, then prove that stopping or failing that session releases exactly what it acquired and rejects all stale work before another session can start.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain tracked and have root `.agent` state.
- [x] Prioritize `MyCozyIsland` because its `2026-07-11T06-50-30-04-00` repo-local audit was newer than the central `2026-07-11T05-10-36-04-00` record.
- [x] Read the route host, Core World wrapper, renderer constructors, renderer-disposal utility, input registration, loader timers, animation loop and global host exposure.
- [x] Identify the interaction loop, domains, all 50 local kits, imported Core World services, runtime-implied hosts and lifecycle-owned resources.
- [x] Trace startup success, startup failure, pagehide, frame execution and the absent restart path.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle and deploy audits.
- [x] Refresh all required root `.agent` documents.
- [x] Change no runtime source, package scripts, rendering or deployment configuration.
- [x] Push only to `main` and create no branch or pull request.

## Selection result

The accessible Publish inventory contains ten repositories. Nine are eligible after excluding `TheCavalryOfRome`. Every eligible repository is centrally tracked and has root `.agent` documentation, but `MyCozyIsland` had a newer repo-local breakdown that was not yet represented by the central ledger. That documentation drift takes priority over the oldest-documented fallback.

```txt
MyCozyIsland repo-local audit:  2026-07-11T06-50-30-04-00
MyCozyIsland central ledger:    2026-07-11T05-10-36-04-00
selected:                       MyCozyIsland
excluded:                       TheCavalryOfRome
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current interaction loop

```txt
index.html
  -> pinned Three.js 0.185.0 and NexusEngine commit imports
  -> validate 50 local kit descriptors
  -> construct and initialize one WebGPURenderer
  -> choose backend and startup quality
  -> create Core World wrapper and prepare 49 active cells
  -> flatten providers into one compatibility render snapshot
  -> construct scene, camera, sky, lights, world, ocean, foam,
     atmosphere textures, cloud, fog, post, performance and debug resources
  -> register canvas and window listeners
  -> schedule two nested loader timers
  -> install one renderer animation loop
  -> each frame:
       scenario tick
       camera projection
       Core World focus update
       world and foam presentation update
       performance sampling
       post render
       debug projection
  -> publish live resources through globalThis.CozyIsland
  -> pagehide calls only domains.dispose()
```

## Newly documented finding

The route has no session object or acquisition ledger. `main()` creates resources in sequence and publishes them only after the animation loop is active. A failure at any earlier await or constructor reaches `main().catch(fail)` without rolling back resources already acquired.

The current page-exit path is also partial:

```txt
pagehide
  -> domains.dispose()
  -> Core World reset

not released:
  renderer animation loop
  wheel/pointer/keyboard/blur/resize listeners
  loader timers
  scene geometries, materials and textures
  ocean, foam, cloud and fog resources
  atmosphere volume textures
  post pipeline
  renderer/backend
  globalThis.CozyIsland
```

The repository contains `disposeRendererObject()`, but the live whole-island host does not call it. Most renderer factories expose only live objects and update methods, not a common idempotent disposal result. There is no `stop()`, `restart()`, session epoch, stale-frame fence or previous-global restoration policy.

## Priority order

```txt
1. Runtime Session Lifecycle Authority
   + Startup Rollback / Stop / Dispose / Restart Fixture Gate

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

Lifecycle remains first because every later focus, provider and render transaction requires a live session epoch, resource ownership and stale-work rejection boundary.

## Read this pass first

```txt
.agent/trackers/2026-07-11T07-01-49-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T07-01-49-04-00.md
.agent/architecture-audit/2026-07-11T07-01-49-04-00-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-11T07-01-49-04-00-webgpu-resource-ownership-disposal-gap.md
.agent/gameplay-audit/2026-07-11T07-01-49-04-00-startup-run-stop-restart-loop.md
.agent/interaction-audit/2026-07-11T07-01-49-04-00-listener-timer-animation-command-map.md
.agent/lifecycle-audit/2026-07-11T07-01-49-04-00-session-epoch-resource-lease-contract.md
.agent/deploy-audit/2026-07-11T07-01-49-04-00-lifecycle-restart-fixture-gate.md
```

## Do not start next with

- visible cell-render authority
- expanded movement or active radius
- removal of `?world=legacy`
- new world content or visual systems
- additional persistent GPU resources
- terrain, biome, vegetation, grass, rocks, ocean, cloud, fog, lighting or quality changes
- treating `pagehide -> domains.dispose()` as complete route disposal
