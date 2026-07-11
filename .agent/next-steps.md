# Next Steps: MyCozyIsland

Last updated: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** introduce one route-session authority that can start, fail, stop, dispose and restart the complete browser runtime without leaking listeners, timers, animation work, Core World state, GPU resources or global references.

- [ ] Create a session owner before constructing the renderer.
- [ ] Assign monotonic `sessionId` and `sessionEpoch` values.
- [ ] Model `idle`, `starting`, `running`, `stopping`, `disposing`, `stopped` and `failed` states.
- [ ] Route all resource acquisition through a reverse-order cleanup stack.
- [ ] Register every listener and timeout as a named lease.
- [ ] Wrap `renderer.setAnimationLoop()` in an animation-loop lease with explicit cancellation.
- [ ] Fence frame, focus and render callbacks by session epoch.
- [ ] Give each renderer/host adapter an idempotent structured disposal result.
- [ ] Use `disposeRendererObject()` for owned scene graphs while preserving explicitly shared resources.
- [ ] Dispose generated volume, sky, grass and post resources exactly once.
- [ ] Dispose the renderer/backend after dependent resources retire.
- [ ] Retire or restore `globalThis.CozyIsland` through an ownership lease.
- [ ] Roll back partial startup failures automatically.
- [ ] Make `stop()` safe during startup, a frame, a focus update or disposal.
- [ ] Add a fresh-session restart transaction that begins only after prior disposal succeeds or reports an explicit degraded policy.
- [ ] Expose bounded lifecycle and resource observations through the host.
- [ ] Add deterministic Node fixtures and a real browser WebGPU/WebGL2 restart smoke.
- [ ] Keep Core World contract parity second and visible cell rendering third.

## First implementation slice

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ Startup Rollback / Stop / Dispose / Restart Fixture Gate
```

## Candidate kits

```txt
runtime-session-id-kit
runtime-session-state-kit
runtime-session-command-kit
runtime-session-result-kit
runtime-session-owner-kit
startup-acquisition-ledger-kit
reverse-cleanup-stack-kit
listener-lease-kit
timer-lease-kit
animation-loop-lease-kit
session-epoch-admission-kit
frame-generation-fence-kit
focus-work-generation-fence-kit
render-resource-registry-kit
renderer-disposal-adapter-kit
global-exposure-lease-kit
startup-rollback-kit
terminal-disposal-kit
restart-handoff-kit
lifecycle-observation-kit
runtime-lifecycle-journal-kit
runtime-lifecycle-fixture-kit
browser-restart-smoke-kit
```

## Required session commands

```txt
StartRuntimeSession
StopRuntimeSession
DisposeRuntimeSession
RestartRuntimeSession
```

Each command must carry:

```txt
commandId
expectedSessionId
expectedSessionEpoch
reason
requestedAt
```

## Required result envelope

```txt
commandId
sessionId
previousSessionEpoch
sessionEpoch
previousState
state
status
reason
startedAt
completedAt
acquiredResourceCount
releasedResourceCount
residualResourceCount
listenerLeaseCount
timerLeaseCount
animationLoopActive
globalLeaseActive
staleCallbacksRejected
disposalFailures
resourceFingerprint
resultFingerprint
```

Allowed statuses:

```txt
started
stopped
disposed
restarted
unchanged
rejected-stale
rejected-state
failed-rolled-back
failed-partial
```

## Acquisition contract

Every successful acquisition appends one cleanup entry containing:

```txt
resourceId
resourceKind
ownerSessionId
ownerEpoch
acquiredAt
releaseOrder
release()
released
releaseResult
```

Acquisition groups:

```txt
module and backend admission
Core World and providers
scene and camera
world, ocean and foam
atmosphere textures
cloud, fog and post
performance and debug
input listeners
resize and page lifecycle listeners
loader timers
animation loop
global host
```

## Stop and disposal contract

```txt
stop admission
  -> state = stopping
  -> increment epoch or close old-epoch admission
  -> clear animation loop
  -> cancel timers
  -> remove listeners
  -> await or reject in-flight focus/render work
  -> state = disposing
  -> execute cleanup stack in reverse order
  -> release global host
  -> publish one terminal result
  -> state = stopped or failed
```

Calling stop/dispose again must return `unchanged` with the original terminal result fingerprint.

## Startup rollback fixtures

Inject failure after each acquisition boundary:

```txt
renderer construction
renderer initialization
Core World creation
initial prepare
world renderer creation
ocean creation
foam creation
atmosphere texture creation
cloud creation
fog creation
post creation
listener registration
timer registration
animation-loop registration
global-host publication
```

For every row prove:

```txt
all earlier resources are released
later resources were never acquired
no animation callback remains admissible
no listener or timeout remains owned
Core World has no active session-owned state
renderer/backend status is explicit
no live global host references the failed session
second start succeeds with a newer epoch
```

## Runtime stop/restart fixtures

```txt
stop before first frame
stop during frame callback
stop during Core World focus update
stop while loader timers are pending
pagehide after explicit stop
repeat stop/dispose
restart after clean stop
restart after rollback failure
old frame callback after restart
old focus result after restart
old timeout after restart
```

## Browser smoke matrix

```txt
WebGPU core mode start -> stop -> restart
WebGL2 core mode start -> stop -> restart
legacy mode start -> stop -> restart
startup failure -> visible error -> clean retry
pagehide -> zero live session leases
H overlay and input after restart belong only to the new epoch
```

## Second implementation slice

```txt
MyCozyIsland Pinned Core World Contract Parity
+ Focus Transaction and Production-Runtime Failure Fixture Gate
```

After lifecycle authority exists:

- load the exact pinned Core World modules in Node
- run the same contract matrix against production and fake adapters
- fix retriable `prepare()` state
- replace Boolean focus results with typed results
- add provider-store checkpoints, failure policy and rollback proof
- correlate world/focus/provider results with the session epoch

## Third implementation slice

```txt
MyCozyIsland Core World Render Commit Authority
+ Provider/Cell Consumer Fidelity Fixture Gate
```

It must reuse the lifecycle resource registry and accept only world revisions whose session epoch and completeness policy are valid.

## Ordered follow-up slices

```txt
4. Camera Rail Baseline Authority
5. Dynamic Environment Frame Authority
6. Adaptive Quality Transaction Authority
```

## Deferred

- new world content or expanded movement
- active-radius changes
- immediate removal of `?world=legacy`
- visible cell-authoritative rendering
- terrain, biome, vegetation, grass, rocks, ocean, clouds, fog, lighting or post changes
- public kit promotion
