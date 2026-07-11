# Next Steps: MyCozyIsland

Last updated: `2026-07-11T14-41-28-04-00`

## Summary

Make startup authoritative before extending runtime, world or rendering behavior. The browser must admit an immutable module graph, choose one renderer backend, track every acquired resource, roll back partial startup, expose a typed failure state, retry under a new generation and acknowledge the first visible frame.

## Plan ledger

**Goal:** replace implicit top-level startup with one staged, observable and retriable transaction.

- [ ] Add an immutable module-source manifest with source and capability fingerprints.
- [ ] Move route boot behind a small loader boundary that can catch module-fetch and evaluation failure.
- [ ] Define `StartupCommand`, `StartupStagePlan` and `StartupResult`.
- [ ] Assign startup transaction and generation identities.
- [ ] Classify WebGPU and WebGL2 backend candidates explicitly.
- [ ] Admit startup quality only after backend capability checks pass.
- [ ] Register renderer, world, textures, scene resources, listeners, timers, loop and global host in one resource ledger.
- [ ] Roll back all acquired resources in reverse order on any failed stage.
- [ ] Project a stable failure code and explicit retry command.
- [ ] Reject stale callbacks and results from previous startup generations.
- [ ] Hide the loader only after a first-frame readiness receipt.
- [ ] Add module, backend, rollback, retry and Pages cold-load fixtures.

## Ordered implementation queue

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

## Candidate startup kits

```txt
module-source-manifest-kit
module-graph-admission-kit
startup-command-kit
startup-transaction-id-kit
startup-generation-kit
startup-stage-plan-kit
startup-stage-result-kit
renderer-backend-candidate-kit
renderer-backend-admission-kit
startup-quality-admission-kit
startup-resource-ledger-kit
startup-cleanup-stack-kit
startup-rollback-kit
startup-failure-classification-kit
loader-state-projection-kit
startup-retry-kit
first-frame-readiness-kit
startup-result-kit
startup-journal-kit
startup-observation-kit
module-fetch-failure-fixture-kit
renderer-backend-fallback-fixture-kit
partial-startup-rollback-fixture-kit
browser-startup-smoke-kit
```

## Required transaction

```txt
receive StartupCommand
  -> create startupId and generation
  -> resolve ModuleSourceManifest
  -> admit module graph and required capabilities
  -> create renderer backend candidates
  -> initialize and admit one backend
  -> derive startup quality fingerprint
  -> execute ordered stages
  -> register cleanup after every successful stage
  -> prepare Core World and all render consumers
  -> commit listeners, timers, loop and public host
  -> render first frame
  -> publish StartupReadyReceipt

on failure
  -> classify failed stage and error code
  -> reject new work for the failed generation
  -> execute cleanup stack in reverse order
  -> publish StartupFailedResult
  -> admit retry only with a new generation
```

## Required stage set

```txt
MODULE_GRAPH
KIT_CATALOG
RENDERER_INIT
BACKEND_ADMISSION
QUALITY_ADMISSION
WORLD_CREATE
WORLD_PREPARE
SNAPSHOT_CREATE
SCENE_CREATE
ATMOSPHERE_TEXTURES
RENDER_CONSUMERS
INPUT_AND_RESIZE
LOADER_AND_LOOP
PUBLIC_HOST
FIRST_FRAME
COMMITTED
```

## Fixture matrix

```txt
Three.js module fetch failure before main()
NexusEngine module fetch failure inside world creation
renderer.init rejection
WebGPU candidate rejected and WebGL2 candidate admitted
no compatible backend
Core World prepare failure
cloud/fog volume creation failure
post-pipeline creation failure
listener installation failure
first-frame render failure
reverse cleanup order after each failed stage
retry creates a new generation
stale old-generation completion is rejected
duplicate retry is idempotent
loader remains truthful through failure and retry
first visible frame carries startup/backend/world fingerprints
Pages cold-load smoke on WebGPU and WebGL2-capable browsers
```

## Acceptance conditions

```txt
one boot attempt has one startupId and generation
every successful stage has a typed result and cleanup lease
module failures reach a stable visible error state
partial startup leaves no live resources after rollback
backend and quality are admitted, not inferred
retry cannot reuse stale resources or callbacks
loader completion follows first-frame acknowledgement
public observations are clone-safe and do not expose raw authority
```