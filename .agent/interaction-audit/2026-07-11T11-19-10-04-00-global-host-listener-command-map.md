# Interaction Audit: Global Host / Listener Command Ownership Map

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

Input and lifecycle actions enter through anonymous browser listeners and a raw global host. Neither path produces typed commands, session admission, revocable leases, or stale-generation results.

## Plan ledger

**Goal:** define how browser callbacks and public automation access must route through one session-fenced command boundary.

- [x] Inventory browser listeners.
- [x] Inventory timer callbacks.
- [x] Inventory global host mutation paths.
- [x] Trace pagehide disposal.
- [x] Define listener leases and command admission.

## Current browser ingress

```txt
canvas wheel
  -> camera input.wheel

canvas pointerdown / pointermove / pointerup / pointercancel
  -> drag state
  -> camera input.drag

window keydown / keyup
  -> debug toggle
  -> camera input.key

window blur
  -> input.clear

window resize
  -> renderer and camera mutation

loader timeout chain
  -> loader DOM mutation

window pagehide
  -> domains.dispose

globalThis.CozyIsland
  -> raw renderer, scene, camera, worldRuntime, scenario,
     post pipeline, renderers and performance controller
```

## Ownership gaps

```txt
listener handler references retained: no
listener option tuples retained: no
listener removal result: no
callback session generation: no
input command sequence: no
stale callback rejection: no
timer handle registry: no
global host revocation: no
raw reset/dispose quarantine: no
pagehide idempotency result: no
```

## Required interaction boundary

```txt
BrowserSessionCommand {
  commandId
  sessionId
  sessionGeneration
  sequence
  source
  type
  payload
}
```

Sources:

```txt
pointer
wheel
keyboard
blur
resize
timer
pagehide
debug-host
automation-host
```

Results:

```txt
accepted
rejected-stale
rejected-phase
rejected-disposed
duplicate
no-op
failed
```

## Required lease model

```txt
ListenerLease {
  target
  type
  handler
  options
  sessionGeneration
  status
}

TimerLease {
  handle
  purpose
  sessionGeneration
  status
}
```

All callbacks must check the current session generation before mutating input, camera, DOM, world, renderer, or debug state.

## Public host rule

Replace the raw mutable object graph with:

```txt
read-only detached observations
typed command methods
session and generation identity
revocation status
bounded result journal
```

The old host must become inert after stop or restart even when another script retains the previous object reference.

## Acceptance boundary

One session owns one listener set and one timer set. Every callback is removable, generation-fenced, and observable. Public automation cannot bypass command admission by retaining raw runtime, renderer, scene, scenario, or input references.