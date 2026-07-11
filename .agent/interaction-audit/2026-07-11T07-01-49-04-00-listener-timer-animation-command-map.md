# Interaction Audit: Listener, Timer and Animation Command Map

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** convert implicit browser callbacks into named session-owned leases so stop, failure and restart can close admission deterministically.

- [x] List every installed listener and timer.
- [x] Identify callback mutations and consumers.
- [x] Map missing session and command correlation.
- [x] Define stale-callback rejection requirements.

## Current callback map

```txt
canvas wheel
  -> input.wheel

canvas pointerdown
  -> create drag state
  -> optional pointer capture

canvas pointerup
  -> clear drag state
  -> optional pointer release

canvas pointercancel
  -> clear drag state

canvas pointermove
  -> input.drag

window keydown
  -> debugOverlay.toggle on H
  -> input.key true

window keyup
  -> input.key false

window blur
  -> input.clear

window resize
  -> renderer.setSize
  -> camera aspect/projection update

loader timeout 1
  -> add is-complete class
  -> schedule timeout 2

loader timeout 2
  -> hide loader

renderer animation loop
  -> scenario tick
  -> camera mutation
  -> Core World focus update
  -> render updates and submit

window pagehide
  -> domains.dispose
```

## Current command gap

Callbacks invoke live closures directly. They carry no:

```txt
sessionId
sessionEpoch
callbackId
commandId
admission result
applied result
rejection reason
```

Removing a DOM listener later also requires the exact callback reference, but the current inline handlers are not retained in one registry.

## Required lease record

```txt
leaseId
sessionId
sessionEpoch
kind
target
eventName
callbackId
installedAt
active
remove()
removedAt
removeResult
```

Timer and animation leases add:

```txt
nativeHandle
scheduledAt
firedAt
cancelledAt
executionCount
staleExecutionCount
```

## Callback admission

Every callback should begin with:

```txt
admit(sessionId, sessionEpoch, callbackId)
```

Allowed outcomes:

```txt
accepted
rejected-stale-session
rejected-stale-epoch
rejected-stopping
rejected-disposed
rejected-duplicate
```

## Stop behavior

```txt
close callback admission
  -> clear animation loop
  -> cancel loader timers
  -> remove listeners
  -> clear drag/input state
  -> await current accepted callback boundary
  -> continue resource disposal
```

## Restart proof

After restart:

```txt
one wheel handler mutates the new input service
one keydown handler toggles the new overlay
one resize handler mutates the new renderer/camera
one animation owner advances the new scenario
old timeout callbacks are rejected
old pagehide closure cannot dispose the new world
```

## Current status

```txt
callback registry: absent
callback identities: absent
session admission: absent
stale callback readback: absent
runtime source changed by audit: no
```
