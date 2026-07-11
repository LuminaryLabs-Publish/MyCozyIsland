# START HERE: MyCozyIsland

Last aligned: `2026-07-11T17-50-37-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: give the browser route one runtime session identity and one complete stop, dispose and restart transaction across the animation loop, page lifecycle, browser callbacks, Core World, scenario, GPU resources and global readback.

## Summary

`MyCozyIsland` creates one long-lived runtime graph inside `main()`. It installs anonymous input and resize listeners, schedules loader timers, starts `renderer.setAnimationLoop(...)`, prepares Core World, allocates scene and post resources, and publishes raw references through `globalThis.CozyIsland`.

The only exit handling is a once-only `pagehide` listener that calls `domains.dispose()`. It does not stop the animation loop, remove listeners, cancel timers, dispose scene/post/volume/renderer resources, clear input or revoke global references. Because `pagehide` can preserve a page in bfcache, a later resume can continue callbacks against a world runtime that was reset during the hide event.

## Plan ledger

**Goal:** document the exact lifecycle boundary needed so every live object and callback belongs to one session generation and is stopped, retired or restarted as one observable transaction.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central-ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible repository.
- [x] Trace startup, animation, input, resize, timers, pagehide and potential pageshow behavior.
- [x] Trace Core World reset and renderer resource ownership.
- [x] Inventory all active domains, 50 kits and offered services.
- [x] Define the runtime-session lifecycle authority domain.
- [x] Define stop, dispose, restart, stale-callback and first-frame fixture gates.
- [x] Change documentation only.
- [x] Push directly to `main` without a branch or pull request.
- [ ] Implement the lifecycle state machine, ownership registries and browser fixtures.

## Read this first

```txt
.agent/trackers/2026-07-11T17-50-37-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T17-50-37-04-00-runtime-session-lifecycle-authority-dsk-map.md
.agent/render-audit/2026-07-11T17-50-37-04-00-pagehide-gpu-resource-retirement-gap.md
.agent/gameplay-audit/2026-07-11T17-50-37-04-00-pagehide-pageshow-world-session-loop.md
.agent/interaction-audit/2026-07-11T17-50-37-04-00-page-lifecycle-command-admission-map.md
.agent/runtime-lifecycle-audit/2026-07-11T17-50-37-04-00-stop-dispose-restart-ownership-contract.md
.agent/deploy-audit/2026-07-11T17-50-37-04-00-runtime-lifecycle-browser-fixture-gate.md
.agent/turn-ledger/2026-07-11T17-50-37-04-00.md
.agent/kit-registry.json
```

## Product interaction loop

```txt
startup
  -> validate kit catalog
  -> create WebGPU/WebGL2 renderer
  -> choose startup quality
  -> create and prepare Core World
  -> create scene, camera, sky and lights
  -> create world, ocean, foam, cloud, fog and post resources
  -> install input, resize and page listeners
  -> schedule loader timers
  -> start renderer animation loop
  -> publish global readback

frame
  -> derive dt
  -> tick camera/scenario
  -> update world focus
  -> update presentation
  -> sample performance
  -> render post pipeline
  -> process materialization
  -> project diagnostics

pagehide today
  -> reset/dispose only the world runtime
  -> leave animation, listeners, timers, render resources and globals alive
```

## Main finding

```txt
runtime session ID: absent
session generation: absent
lifecycle state machine: absent
animation-loop lease: absent
renderer.setAnimationLoop(null): absent
pagehide persisted policy: absent
pageshow resume/restart policy: absent
listener registry/removal: absent
timeout registry/cancellation: absent
GPU/scene/post retirement: absent
global readback revocation: absent
stale callback fencing: absent
restart transaction: absent
first restarted frame receipt: absent
```

Concrete mixed-state path:

```txt
running page
  -> pagehide calls domains.dispose()
  -> Core World and materializer reset
  -> renderer callback and scenario remain retained
  -> page resumes from bfcache
  -> scenario and renderer can continue against prepared=false world state
  -> once-only pagehide handler is no longer available for a second hide
```

## Domains in use

```txt
browser module and startup admission
renderer backend and startup quality
runtime session and page lifecycle
animation-loop and frame ownership
input, resize and loader timer adapters
Core World, providers, focus, reset and diagnostics
lazy materialization
camera rail and first-person scenario
terrain, biome, shoreline and population
ocean, foam, clouds, fog, weather and illumination
scene graph, GPU resources and post processing
adaptive performance and quality callbacks
diagnostics, validation and Pages deployment
```

## Implemented kits

The source-backed catalog remains exactly 50 local kits. The lifecycle-critical surfaces are:

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
```

The complete 50-kit inventory and per-kit service map are in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Kit services

```txt
render adapters
  backend fallback, atmosphere textures, ocean/foam/world/cloud/fog rendering, post processing and diagnostics

scenario
  camera rail, input, deterministic tick, reset and render snapshots

world generation
  terrain fields, classification, population, contact and LOD

environment
  deterministic clock, wind, weather, illumination, ocean and atmosphere

Core World
  grid partition, provider ordering, focus, cell lifecycle, snapshots, materialization and query

lifecycle gap
  no kit currently owns the complete browser session, loop, listener, timer, resource and restart transaction
```

## Required lifecycle domain

```txt
cozy-island-runtime-session-lifecycle-authority-domain
  -> runtime-session-id-kit
  -> runtime-session-generation-kit
  -> runtime-lifecycle-state-kit
  -> lifecycle-command-envelope-kit
  -> lifecycle-command-admission-kit
  -> animation-loop-lease-kit
  -> page-lifecycle-adapter-kit
  -> bfcache-policy-kit
  -> event-listener-registry-kit
  -> timeout-registry-kit
  -> renderer-resource-registry-kit
  -> scene-resource-inventory-kit
  -> stale-callback-fence-kit
  -> runtime-stop-transaction-kit
  -> runtime-dispose-transaction-kit
  -> core-world-retirement-adapter-kit
  -> gpu-resource-retirement-kit
  -> global-readback-revocation-kit
  -> runtime-restart-transaction-kit
  -> lifecycle-result-kit
  -> lifecycle-journal-kit
  -> first-restarted-frame-ack-kit
  -> runtime-lifecycle-fixture-kit
  -> browser-pagehide-pageshow-smoke-kit
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. Core World Reset / Re-prepare Authority
4. Pinned Core World Focus Transaction Authority
5. Live Materialization Readiness Commit Authority
6. Core World Render Commit Authority
7. Camera Rail Baseline Authority
8. Dynamic Environment Frame Authority
9. Adaptive Quality Transaction Authority
```

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ Stop / Dispose / Pagehide / Pageshow / Restart / Resource-Retirement Fixture Gate
```

This is the second implementation slice. It must consume the admitted startup graph and then provide session identity, generation, lifecycle state and first-frame evidence to every downstream world, render, environment and quality authority.