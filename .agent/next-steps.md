# Next Steps: MyCozyIsland

Last updated: `2026-07-11T04-09-54-04-00`

## Plan ledger

**Goal:** introduce one runtime-session authority that owns startup, rollback, running, stop, disposal, restart, and stale-session rejection before adding more persistent WebGPU or Three resources.

- [ ] Add a route-session state machine with `idle`, `starting`, `running`, `stopping`, `stopped`, `disposing`, `disposed`, `rolling-back`, and `failed` states.
- [ ] Allocate a monotonic `sessionEpoch` for every startup attempt that reaches resource acquisition.
- [ ] Wrap startup in a transaction that records every acquired resource and release function in order.
- [ ] Roll back acquired resources in reverse order when startup fails.
- [ ] Replace anonymous canvas/window callbacks with removable listener leases.
- [ ] Track and cancel both loader completion timeouts.
- [ ] Own exactly one renderer animation-loop lease and clear it before teardown.
- [ ] Add a resource registry for renderer, scene, geometry, materials, 2D/3D textures, storage textures, compute nodes, passes, pipeline resources, lights, shadow resources, listeners, timers, and globals.
- [ ] Add explicit `dispose()` contracts to world, grass, ocean, foam, atmosphere-volume, cloud, fog, post, debug, and host adapters.
- [ ] Deduplicate shared geometry, material, and texture disposal by identity.
- [ ] Retire or tombstone `globalThis.CozyIsland` without retaining live renderer/service objects.
- [ ] Add typed start, stop, dispose, restart, rollback, and stale-session results.
- [ ] Add bounded JSON-safe lifecycle and resource readback.
- [ ] Add a DOM-free runtime-lifecycle fixture to `npm test`.
- [ ] Add a browser WebGPU/WebGL2 repeated-restart smoke.
- [ ] Preserve camera, terrain, environment, and quality authority work behind the lifecycle gate.

## Immediate implementation slice

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ WebGPU Resource Disposal and Restart Fixture Gate
```

## Candidate kits

```txt
route-session-state-kit
runtime-session-epoch-kit
runtime-command-admission-kit
startup-transaction-kit
resource-registration-kit
startup-rollback-kit
listener-lease-kit
timeout-lease-kit
animation-loop-lease-kit
renderer-resource-owner-kit
three-resource-disposal-kit
atmosphere-volume-disposal-kit
post-pipeline-disposal-kit
global-host-publication-kit
runtime-session-result-kit
runtime-lifecycle-observation-kit
runtime-lifecycle-fixture-kit
browser-webgpu-restart-smoke-kit
```

## Minimum session state

```txt
sessionId
sessionEpoch
startupAttemptId
status
seed
optionsFingerprint
sourceFingerprint
resourceRegistryFingerprint
frameIndex
activeLoop
listenerLeaseCount
timeoutLeaseCount
resourceCountsByKind
terminalReason
lastResult
recentResults
```

## Required start result

```txt
commandId
sessionEpoch
status: accepted | unchanged | rejected | failed
reason
beforeLifecycle
afterLifecycle
acquiredCount
rolledBackCount
remainingCount
sourceFingerprint
resourceRegistryFingerprint
```

## Required disposal order

```txt
freeze new input/frame admission
  -> clear renderer animation loop
  -> remove listeners and release pointer capture
  -> cancel timeouts
  -> stop performance/debug/global publication
  -> dispose post pipeline and passes
  -> dispose cloud/fog consumers
  -> dispose 3D/storage textures and compute resources
  -> dispose foam/ocean/world/grass/sky scene resources
  -> dispose lights and shadow resources
  -> clear scene references
  -> dispose renderer/backend
  -> mark epoch disposed
```

## Required fixture assertions

```txt
start from idle succeeds exactly once
start while running returns rejected or unchanged
failure after each acquisition step rolls back only acquired rows
rollback release order is reverse acquisition order
one release failure does not stop remaining rollback
stop freezes frame, clock and input revisions
first dispose releases all owned resources once
second dispose is unchanged and non-throwing
restart increments sessionEpoch
old callbacks and commands are rejected
same seed/options preserve semantic source fingerprint
new runtime resource identities are disjoint from retired epoch
one listener set, one timeout set, one animation loop and one global host remain active
bounded observation contains no live functions, Three objects, renderer, scene, materials, textures or pipeline objects
```

## Ordered follow-up slices

```txt
2. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. Terrain Clearing Surface Authority
   + Edge/Seating/Layer-Coherence Fixture Gate

4. Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

5. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Deferred

- more terrain, grass, vegetation, rock, fence, ocean, cloud, fog, sky, lighting, post-processing, or quality work
- renderer replacement
- new island content
- public kit promotion
- restart implemented as an unguarded second call to `main()`
