# Architecture Audit: Runtime Session Lifecycle Authority DSK Map

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

The route currently treats module lifetime, renderer lifetime, Core World lifetime and page lifetime as the same thing. They are not coordinated by a session identity or lifecycle state machine. `pagehide` resets the world runtime, but does not stop the renderer loop or retire the resources and callbacks that continue to reference it.

## Plan ledger

**Goal:** define one parent domain that owns runtime session identity, lifecycle commands, browser page events, callback fencing, resource retirement and restart evidence.

- [x] Identify current owners.
- [x] Identify cross-owner lifecycle gaps.
- [x] Define the parent domain.
- [x] Define candidate coordinating kits.
- [x] Define lifecycle states and transition admission.
- [x] Define stop, dispose and restart transactions.
- [x] Define required receipts and fixtures.

## Current ownership map

```txt
module host
  main(), DOM references, loader state, fail projection

renderer host
  WebGPURenderer, animation loop, pixel ratio and size

scene host
  scene, camera, sky, lights, world group, ocean, foam, clouds and fog

post host
  RenderPipeline, scene/depth/fog passes and resolution state

browser adapters
  wheel, pointer, keyboard, blur, resize, pagehide and loader timers

world runtime
  NexusEngine engine, Core World, providers, focus, materializer and query

scenario
  camera rail, input, clock, tick and render snapshots

global readback
  raw references through globalThis.CozyIsland
```

No owner can currently prove that all other owners stopped or retired for the same runtime generation.

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-authority-domain
```

## Candidate kits

```txt
runtime-session-id-kit
  one stable identity per admitted runtime construction

runtime-session-generation-kit
  monotonic generation used to reject late callbacks and results

runtime-lifecycle-state-kit
  starting, running, suspending, suspended, stopping, stopped, disposing, disposed, restarting and failed

lifecycle-command-envelope-kit
  typed Stop, Suspend, Resume, Dispose and Restart commands

lifecycle-command-admission-kit
  state, session, generation and duplicate validation

animation-loop-lease-kit
  exclusive ownership of renderer.setAnimationLoop and its callback generation

page-lifecycle-adapter-kit
  pagehide, pageshow, visibility and persisted-event normalization

bfcache-policy-kit
  explicit suspend/resume or dispose/restart behavior for persisted pages

event-listener-registry-kit
  listener identity, target, options, installation and removal receipts

timeout-registry-kit
  loader and delayed-work timer ownership and cancellation

renderer-resource-registry-kit
  renderer, pipeline, render target, texture, material and geometry identity

scene-resource-inventory-kit
  complete traversal inventory with shared-resource deduplication

stale-callback-fence-kit
  generation check before frame, input, timeout, materialization and quality work

runtime-stop-transaction-kit
  revoke work admission, stop animation, clear timers and detach listeners

runtime-dispose-transaction-kit
  deterministic resource retirement and final state transition

core-world-retirement-adapter-kit
  reset/dispose result from Core World, provider stores and materializer

gpu-resource-retirement-kit
  dispose passes, textures, geometries, materials, renderer and backend resources

global-readback-revocation-kit
  replace raw global references with disposed observation or remove them

runtime-restart-transaction-kit
  create a new session generation and rebuild one complete runtime graph

lifecycle-result-kit
  typed accepted, duplicate, stale, failed, rolled-back and completed outcomes

lifecycle-journal-kit
  bounded command, state, resource and frame evidence

first-restarted-frame-ack-kit
  prove the first visible frame belongs to the new session and generation

runtime-lifecycle-fixture-kit
  headless ownership/order/idempotency tests

browser-pagehide-pageshow-smoke-kit
  real page lifecycle, bfcache, GPU retirement and restart proof
```

## Lifecycle state machine

```txt
idle
  -> starting
  -> running

running
  -> suspending -> suspended -> resuming -> running
  -> stopping -> stopped
  -> failed

stopped
  -> disposing -> disposed
  -> restarting -> starting

failed
  -> stopping or disposing

disposed
  -> restarting -> starting
```

Invalid examples:

```txt
disposed -> frame callback
stopping -> new world focus command
suspended -> performance sample
old generation -> input mutation
old session -> first-frame acknowledgement
running -> second animation-loop lease
```

## Required stop transaction

```txt
StopCommand
  sessionId
  generation
  reason
  pageLifecycleContext
  commandId

admit
  -> verify running/suspended state
  -> mark stopping
  -> reject new frame/input/world/quality commands
  -> call renderer.setAnimationLoop(null)
  -> invalidate generation token for queued callbacks
  -> cancel timers
  -> remove listeners
  -> clear held input and pointer capture
  -> publish StopResult and retirement counts
  -> mark stopped
```

## Required dispose transaction

```txt
DisposeCommand
  -> stop if not already stopped
  -> snapshot resource inventory
  -> dispose post pipeline and pass-owned render targets
  -> dispose atmosphere storage/data textures
  -> traverse scene and deduplicate shared geometry/material/texture ownership
  -> dispose scene resources
  -> dispose renderer/backend
  -> dispose/reset Core World, providers and materializer
  -> reset scenario/input/clock ownership
  -> revoke global readback
  -> assert zero active loop/listener/timer leases
  -> publish DisposeResult and final fingerprint
  -> mark disposed
```

## Required restart transaction

```txt
RestartCommand
  previousSessionId
  expectedDisposedGeneration
  reason

admit
  -> create new sessionId and generation
  -> run browser startup transaction
  -> acquire one animation-loop lease
  -> install one listener/timer registry
  -> prepare Core World and scenario baseline
  -> render one frame
  -> publish first-restarted-frame acknowledgement
  -> expose clone-safe read model
  -> mark running
```

## Integration dependencies

```txt
Browser Startup Admission Authority
  provides admitted construction graph and rollback

Runtime Session Lifecycle Authority
  provides sessionId, generation, lifecycle state and leases

Core World Reset/Re-prepare Authority
  consumes session generation and retirement command

Render Commit Authority
  consumes session generation and publishes frame acknowledgement

Adaptive Quality Authority
  rejects samples and transitions outside running state
```

## Acceptance

```txt
one runtime has one session identity and one animation-loop lease
pagehide behavior is explicit for persisted and non-persisted pages
no frame/input/timeout callback mutates state after stop
all listeners and timers are removable and counted
all GPU/scene/Core World resources retire exactly once
duplicate stop/dispose commands are idempotent
restart creates a new generation rather than reusing disposed identity
first restarted frame proves the new session and generation
global readback exposes no disposed raw authority
```
