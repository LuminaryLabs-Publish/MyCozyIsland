# START HERE: MyCozyIsland

Last aligned: `2026-07-11T14-41-28-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: define one browser-startup admission transaction that owns module-source identity, renderer-backend selection, staged resource allocation, failure rollback, loader projection, retry and first-frame readiness.

## Summary

The route is WebGPU-first and pins Three.js plus NexusEngine through an import map. Those module imports execute before `main()` and therefore before the route's `main().catch(fail)` error projection exists. A CDN or module-graph failure can leave the page on its initial loader without a classified startup result.

After imports succeed, `main()` allocates the renderer, Core World runtime, scene graph, atmosphere textures and render consumers in sequence. Any later exception is displayed by `fail(error)`, but already-created GPU, world and DOM resources are not retired because cleanup ownership and the `pagehide` handler are installed only after startup has completed.

## Plan ledger

**Goal:** make browser startup an explicit, observable and retriable transaction before runtime-session, world, render and environment authority are allowed to begin.

- [x] Compare all ten accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible central entry.
- [x] Trace import-map admission, `main()`, renderer initialization, world preparation, render-resource creation, loader completion, listeners, animation loop and pagehide cleanup.
- [x] Identify the interaction loop, domains, all 50 local kits, imported NexusEngine services and seven ordered providers.
- [x] Define startup identity, staged results, resource ownership, rollback, retry and first-frame readiness proof.
- [x] Add timestamped architecture, render, gameplay, interaction, startup and deploy audits.
- [x] Change no runtime or deployment behavior.
- [x] Push directly to `main`; create no branch or pull request.

## Current interaction loop

```txt
HTML parse
  -> install import map
  -> fetch Three.js and route module graph
  -> evaluate static imports
  -> call main()
  -> validate 50 kits
  -> initialize WebGPURenderer
  -> infer WebGPU or WebGL2 backend
  -> choose startup quality
  -> create and prepare Core World runtime
  -> create scene, camera, lights and static snapshot consumers
  -> create atmosphere textures and cloud/fog/ocean/post resources
  -> install input and resize listeners
  -> schedule loader completion timers
  -> start renderer animation loop
  -> install pagehide callback
  -> expose CozyIsland global host
```

## Main finding

```txt
module-graph admission result: absent
startup transaction id/revision: absent
stage result journal: absent
backend candidate/admission result: absent
resource ledger and cleanup stack: absent
rollback after partial allocation: absent
retry command/result: absent
first-frame readiness receipt: absent
module-fetch failure projection: absent
```

The static `three/webgpu` import can fail before `main()` runs. Later failures are caught, but `fail()` only updates the error panel and loader text. It does not stop a partial animation loop, dispose renderer resources, reset Core World, remove listeners, cancel loader timers or revoke the global host.

## Required authority flow

```txt
StartupCommand
  -> resolve immutable ModuleSourceManifest
  -> admit required module capabilities
  -> allocate startup transaction and generation
  -> execute ordered StartupStagePlan
  -> register every acquired resource in reverse cleanup order
  -> classify renderer backend and quality candidate
  -> prepare Core World and render consumers
  -> commit listeners, loop, loader state and public host
  -> render first frame
  -> publish StartupReadyReceipt

on any failure
  -> classify failed stage
  -> fence callbacks
  -> rollback acquired resources in reverse order
  -> project stable failure state
  -> admit explicit retry or terminal stop
```

## Priority order

```txt
1. Browser Startup Admission + Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T14-41-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T14-41-28-04-00.md
.agent/architecture-audit/2026-07-11T14-41-28-04-00-browser-startup-admission-dsk-map.md
.agent/render-audit/2026-07-11T14-41-28-04-00-renderer-init-first-frame-readiness-gap.md
.agent/gameplay-audit/2026-07-11T14-41-28-04-00-loader-startup-interaction-loop.md
.agent/interaction-audit/2026-07-11T14-41-28-04-00-module-startup-retry-admission-map.md
.agent/startup-audit/2026-07-11T14-41-28-04-00-module-backend-rollback-contract.md
.agent/deploy-audit/2026-07-11T14-41-28-04-00-startup-failure-fixture-gate.md
```

## Do not start next with

- adding a second ad-hoc renderer constructor;
- hiding module failures behind a longer loader timeout;
- treating `renderer.init()` success as complete application readiness;
- retrying without a new startup generation and old-resource rollback;
- adding more globals before startup commit;
- claiming WebGL2 fallback without an executable backend-admission fixture.