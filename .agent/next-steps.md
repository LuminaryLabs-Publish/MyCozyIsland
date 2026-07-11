# Next Steps: MyCozyIsland

Last updated: `2026-07-11T17-50-37-04-00`

## Summary

Browser startup admission remains first. Runtime Session Lifecycle Authority is the next implementation slice and must own one session identity, one animation-loop lease, removable listeners and timers, complete world/render retirement, explicit bfcache behavior and a clean restart frame.

## Plan ledger

**Goal:** implement stop, dispose and restart as distinct lifecycle transactions without creating parallel session, world, renderer or frame identities.

- [ ] Complete Browser Startup Admission and Failure Rollback Authority.
- [ ] Introduce `sessionId` and monotonic `generation` at admitted startup.
- [ ] Add a lifecycle state machine for starting, running, suspended, stopping, stopped, disposing, disposed, restarting and failed.
- [ ] Replace direct page events with typed lifecycle commands.
- [ ] Define persisted-page suspend/resume versus final dispose policy.
- [ ] Wrap `renderer.setAnimationLoop` in an exclusive lease.
- [ ] Stop the loop with `renderer.setAnimationLoop(null)` before retirement.
- [ ] Fence animation, input, resize, timer, focus, materialization and quality callbacks by generation.
- [ ] Register every event listener with retained function and options.
- [ ] Register and cancel every loader or delayed-work timer.
- [ ] Release pointer capture, drag state and held input during stop.
- [ ] Inventory scene, post, volume and renderer resources by identity.
- [ ] Retire shared textures, materials and geometries exactly once.
- [ ] Dispose post resources and off-scene render targets.
- [ ] Dispose renderer/backend resources.
- [ ] Integrate Core World, provider, materializer and scenario retirement.
- [ ] Revoke raw `globalThis.CozyIsland` authority after stop/dispose.
- [ ] Add typed Stop, Dispose, Resume and Restart results.
- [ ] Add a bounded lifecycle journal and retirement receipts.
- [ ] Require a first resumed/restarted frame receipt before reporting running.
- [ ] Add headless ownership tests and real browser page lifecycle fixtures.

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

## Candidate lifecycle kits

```txt
runtime-session-id-kit
runtime-session-generation-kit
runtime-lifecycle-state-kit
lifecycle-command-envelope-kit
lifecycle-command-admission-kit
animation-loop-lease-kit
page-lifecycle-adapter-kit
bfcache-policy-kit
event-listener-registry-kit
timeout-registry-kit
renderer-resource-registry-kit
scene-resource-inventory-kit
stale-callback-fence-kit
runtime-stop-transaction-kit
runtime-dispose-transaction-kit
core-world-retirement-adapter-kit
gpu-resource-retirement-kit
global-readback-revocation-kit
runtime-restart-transaction-kit
lifecycle-result-kit
lifecycle-journal-kit
first-restarted-frame-ack-kit
runtime-lifecycle-fixture-kit
browser-pagehide-pageshow-smoke-kit
```

## Required state model

```txt
RuntimeSession
  sessionId
  generation
  state
  backend
  worldMode
  animationLoopLease
  listenerLeases
  timerLeases
  worldOwner
  scenarioOwner
  renderResourceRegistry
  postResourceRegistry
  lastCommittedFrameId
  lastLifecycleResult
  retirementFingerprint
```

## Required stop transaction

```txt
StopCommand
  -> admit current session/generation
  -> move running/suspended -> stopping
  -> revoke new work
  -> stop animation loop
  -> fence old callbacks
  -> clear pointer/input state
  -> cancel timers
  -> remove listeners
  -> publish StopResult
  -> move -> stopped
```

## Required dispose transaction

```txt
DisposeCommand
  -> stop first when necessary
  -> inventory resources
  -> retire post and volume resources
  -> retire scene textures/materials/geometries exactly once
  -> dispose renderer/backend
  -> retire Core World/providers/materializer/scenario
  -> revoke global readback
  -> assert no active leases
  -> publish DisposeResult
  -> move -> disposed
```

## Required restart transaction

```txt
RestartCommand
  -> verify prior generation terminal or validly suspended
  -> create new sessionId/generation
  -> run startup admission
  -> install one listener/timer/loop set
  -> prepare world/scenario baseline
  -> render first frame
  -> publish FirstRestartedFrameReceipt
  -> expose clone-safe observation
  -> move -> running
```

## Minimum fixture matrix

```txt
cold start ownership counts
stop while running
stop twice
dispose while running
dispose after stop
dispose twice
late frame/input/resize/timer callback
persisted pagehide/pageshow
non-persisted pagehide
shared render resource exactly-once retirement
post and volume resource retirement
Core World/materializer retirement
restart with new generation
old generation cannot update new observation
first restarted frame parity
WebGPU and WebGL2 lifecycle parity
```

## Acceptance conditions

```txt
one running session owns one animation-loop lease
all browser callbacks are removable and generation-fenced
final dispose leaves zero active listener/timer/loop leases
all required world and render resources have retirement receipts
duplicate lifecycle commands are idempotent
bfcache behavior is explicit
restart creates a new generation
running is reported only after a first valid frame
raw disposed authority is not exposed globally
```

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ Stop / Dispose / Pagehide / Pageshow / Restart / Resource-Retirement Fixture Gate
```

Do not implement downstream world reset, focus, materialization, render-commit or adaptive-quality authority with separate session identities. They must consume this lifecycle boundary.