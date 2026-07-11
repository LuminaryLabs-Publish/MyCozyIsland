# Runtime Lifecycle Audit: Stop, Dispose and Restart Ownership Contract

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

The route has no single runtime owner. Browser events, renderer loop, Core World, scenario state, scene resources, post resources and global diagnostics are created together but retired independently or not at all. This audit defines the ownership ledger and transaction ordering required for deterministic stop, dispose and restart behavior.

## Plan ledger

**Goal:** assign every long-lived object and callback to one runtime session generation, then make retirement complete, ordered, idempotent and observable.

- [x] Inventory runtime-owned objects.
- [x] Classify stop, suspend, dispose and restart behavior.
- [x] Define an ownership ledger.
- [x] Define retirement dependencies.
- [x] Define idempotency and stale-work rules.
- [x] Define lifecycle receipts and fixture expectations.

## Ownership ledger

```txt
session authority
  sessionId, generation, lifecycle state, command sequence

animation authority
  renderer animation-loop lease, last frame timestamp, frame counter

browser adapter authority
  listener leases, pointer capture, drag state, held input, resize state

timer authority
  loader completion timers and future delayed work

world authority
  NexusEngine engine, Core World registration, providers, focus, snapshot and diagnostics

materialization authority
  lazy materializer queues, active cells, completed cells and pending work

scenario authority
  camera rail, first-person state, input, environment clock and render snapshot

render authority
  renderer, scene, camera, sky, lights, world, ocean, foam, clouds, fog and post pipeline

quality authority
  performance samples, moving average, counters, level and callbacks

readback authority
  debug overlay and globalThis.CozyIsland projection
```

## Ownership invariants

```txt
every lease/resource has exactly one sessionId and generation
a resource may be shared by objects but has one retirement owner
no old-generation callback can mutate new-generation state
stop revokes work without pretending resources are disposed
dispose requires or performs stop first
restart always creates a new generation
duplicate stop/dispose is idempotent
retirement receipts are append-only and bounded
global readback never grants raw mutable access to disposed authority
```

## Suspend versus stop

```txt
suspend
  intended for a persisted page when policy allows resource retention
  stops frame and input work
  preserves declared world/scenario/render resources
  resets timing baselines
  can resume the same session generation only after readiness validation

stop
  permanently revokes work admission for the active generation
  clears listeners, timers, pointer capture and animation loop
  preserves resources only until dispose

final dispose
  retires all owned resources and marks generation terminal

restart
  constructs a new session generation from admitted startup inputs
```

## Required stop sequence

```txt
1. admit StopCommand
2. move lifecycle running/suspended -> stopping
3. revoke new input, resize, frame, quality, focus and materialization work
4. invalidate callback generation token
5. call renderer.setAnimationLoop(null)
6. release pointer capture and clear drag/held input
7. cancel timers
8. remove listeners using retained references/options
9. wait for or reject in-flight callbacks
10. publish StopResult
11. move stopping -> stopped
```

## Required disposal dependency graph

```txt
stopped loop and callbacks
  -> post-pipeline retirement
  -> volume/compute texture retirement
  -> scene resource inventory
  -> scene material/texture/geometry retirement
  -> renderer/backend retirement
  -> Core World/provider/materializer retirement
  -> scenario/input/clock reset
  -> debug/global readback revocation
  -> final leak assertions
  -> DisposeResult
```

## Required restart sequence

```txt
1. verify prior generation disposed or validly suspended
2. create new sessionId/generation
3. run startup admission and rollback boundary
4. prepare world and scenario baseline
5. construct render and post resources
6. install one listener registry and one animation-loop lease
7. clear stale input and timing state
8. render first frame
9. publish FirstRestartedFrameReceipt
10. expose clone-safe observation
11. move starting -> running
```

## Minimum lifecycle observation

```txt
RuntimeLifecycleObservation
  sessionId
  generation
  state
  backend
  worldMode
  animationLoopActive
  listenerLeaseCount
  timerLeaseCount
  inputActive
  worldPrepared
  activeCellCount
  materializationPendingCount
  renderResourceCount
  postResourceCount
  lastCommittedFrameId
  stoppedAtFrameId
  retirementFingerprint
  lastResult
```

## Idempotency rules

```txt
second StopCommand after stopped
  -> completed duplicate with original stop receipt

second DisposeCommand after disposed
  -> completed duplicate with original retirement receipt

late old-generation frame/input/timer callback
  -> rejected-stale before mutation

RestartCommand while running
  -> rejected-state

DisposeCommand during stopping
  -> queued or composed with the active stop transaction, never parallel
```

## Failure policy

```txt
resource retirement failure
  -> continue best-effort retirement for independent resources
  -> retain failure rows
  -> state becomes disposed-with-errors or failed-terminal
  -> restart admission depends on policy and leak severity

startup failure during restart
  -> rollback newly created generation only
  -> prior disposed generation remains terminal
  -> no partial global readback or animation-loop lease
```

## Fixture matrix

```txt
single stop
stop twice
dispose while running
dispose after stop
dispose twice
stop during animation callback
late input/resize/timer callback
persisted pagehide suspend/resume
non-persisted pagehide dispose
restart after complete dispose
restart after retirement failure
listener/timer count returns to zero
scene/GPU resource count returns to zero
new generation receives first-frame acknowledgement
old generation never writes new observation
```

## Acceptance

```txt
one session generation owns the entire runtime graph
stop, dispose and restart are distinct typed transactions
resource and callback retirement is complete and ordered
all stale work is fenced before mutation
browser page lifecycle maps to an explicit policy
restart proves one new clean frame before reporting running
```
