# Gameplay Audit: Start, Stop, Restart and Scenario Loop

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** map how gameplay/scenario state is created and advanced, then define how stop and restart must preserve deterministic world identity while retiring the previous session.

- [x] Trace scenario construction and frame updates.
- [x] Trace camera, clock and input state ownership.
- [x] Check for runtime stop, restart, and stale-frame admission.
- [x] Define deterministic restart invariants.

## Current scenario loop

```txt
createDomainSnapshot()
  -> deterministic seed service
  -> environment clock
  -> terrain and world descriptors
  -> camera rail sequence
  -> cozy-island scenario

renderer animation callback
  -> compute frameMs and dt
  -> scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> project camera
  -> update world and foam
  -> sample performance
  -> render
```

The scenario has tick/reset state, but it is not a route-session owner. It does not own renderer frames, listeners, timeouts, global publication, resource disposal, or restart admission.

## Current lifecycle behavior

```txt
page load -> one startup attempt
startup success -> running indefinitely
startup failure -> error text only
stop -> unavailable
dispose -> unavailable
restart -> unavailable
```

There is no frame guard that checks a session epoch before ticking or rendering. A future restart implemented by calling `main()` again could leave the old animation callback active and allow both sessions to advance.

## Gameplay-state risks

- Held-key state can survive until blur or keyup; there is no stop-time clear result.
- Pointer-drag state is local to `main()` and has no session status guard.
- Scenario clock and camera can keep advancing until the animation loop is explicitly cleared.
- Performance degradation callbacks can mutate old render consumers after a replacement session starts.
- Debug projection can continue reporting the old session if its loop remains live.
- A second route startup has no deterministic choice between reusing, resetting, or replacing the old world graph.

## Required runtime state

```txt
sessionEpoch
status
seed
sourceFingerprint
frameIndex
lastAcceptedFrame
clockRevision
scenarioRevision
inputRevision
activeLoop: true | false
stopReason
disposeReason
```

## Required restart semantics

```txt
restart requested
  -> reject if current epoch is already restarting
  -> freeze new input admission
  -> clear held keys and drag state
  -> stop old frame loop
  -> dispose old resource graph
  -> create new epoch
  -> rebuild deterministic source graph from explicit seed/options
  -> publish new host state
  -> admit frames only for new epoch
```

Same seed and options should produce the same semantic source fingerprint. Renderer/resource identities should be new. Frame, input, clock and performance journals should restart under the new epoch rather than silently continue.

## Fixture assertions

```txt
start from idle succeeds once
second start while running is rejected or explicitly unchanged
stop freezes clock, camera and frame count
dispose clears input and prevents further tick/render
restart creates epoch + 1
old epoch callbacks are rejected
same-seed semantic snapshot fingerprint is identical
resource identity set is disjoint across epochs
second stop/dispose is unchanged and non-throwing
startup failure leaves no running scenario or frame loop
```

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ Start/Stop/Restart Scenario Fidelity Fixture Gate
```
