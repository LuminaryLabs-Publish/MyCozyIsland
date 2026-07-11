# Interaction Audit: Listener, Timeout and Session Admission Map

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** make every browser interaction side effect attributable to one runtime-session epoch and removable during stop, rollback, disposal, or restart.

- [x] Inventory canvas listeners.
- [x] Inventory window listeners.
- [x] Inventory loader timeouts.
- [x] Map current input destinations.
- [x] Identify missing session admission and removal services.

## Current listener map

```txt
canvas wheel
  -> preventDefault
  -> cameraSequence.input.wheel(deltaY)

canvas pointerdown
  -> create local drag state
  -> request pointer capture

canvas pointerup
  -> clear drag state
  -> release pointer capture

canvas pointercancel
  -> clear drag state

canvas pointermove
  -> when drag active, call input.drag(dx, dy)

window keydown
  -> KeyH toggles debug overlay
  -> input.key(code, true)

window keyup
  -> input.key(code, false)

window blur
  -> input.clear()

window resize
  -> resize renderer
  -> update camera projection
```

All callbacks are created inline. The route keeps no callback registry, so later `removeEventListener()` cannot use the same function identity.

## Timeout map

```txt
startup complete
  -> timeout 260 ms
     -> add loader completion class
     -> timeout 520 ms
        -> hide loader
```

The timeout IDs are not retained. Stop, restart, or startup failure cannot cancel pending loader mutations. An old session can therefore hide or modify the loader after a newer startup begins.

## Missing admission checks

Current input callbacks do not verify:

```txt
sessionEpoch
lifecycle status == running
input lease active
canvas belongs to current session
pointer capture belongs to current epoch
command sequence
```

The animation callback and performance callbacks also have no epoch check. A stale callback can mutate scenario, camera, render resources, loader UI, or debug state after replacement.

## Required lease contract

Each browser side effect should be registered as:

```txt
leaseId
sessionEpoch
kind: listener | timeout | animation-loop | global-publication
owner
sourceTarget
eventName or timerPurpose
active
acquiredAtOrder
releasedAtOrder
releaseResult
```

The lease service should expose:

```txt
listen(target, type, handler, options)
timeout(callback, delay, purpose)
animationLoop(renderer, callback)
publishGlobal(name, value)
release(leaseId)
releaseAll(sessionEpoch)
getState()
```

## Typed interaction result

```txt
interactionId
sessionEpoch
source
status: accepted | unchanged | rejected
reason
inputRevisionBefore
inputRevisionAfter
lifecycleStatus
```

Required rejection reasons include:

```txt
session-not-running
stale-session-epoch
lease-released
canvas-not-current
pointer-not-captured
invalid-wheel-delta
```

## Disposal behavior

```txt
freeze interaction admission
  -> clear drag and held keys
  -> release pointer capture when owned
  -> remove canvas listeners
  -> remove window listeners
  -> cancel loader timeouts
  -> clear animation loop
  -> reject later callbacks from old epoch
```

## Fixture assertions

```txt
exactly five canvas listeners and four window listeners are registered
all listener identities are removable
all timeout IDs are tracked
stop removes interaction admission before resource disposal
old callback invocation returns stale-session rejection
repeated dispose does not attempt duplicate removal as success
restart installs one fresh listener set
loader from old epoch cannot hide new loader
```
