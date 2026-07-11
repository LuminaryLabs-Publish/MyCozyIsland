# Deploy Audit: Single-Loop Reset / Disposal Fixture Gate

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

GitHub Pages should not advertise browser restart, reusable world recovery, or complete teardown until fixtures prove one active session, one animation loop, one listener set, generation-fenced callbacks, and complete resource retirement.

## Plan ledger

**Goal:** define the minimum Node, browser, WebGPU/WebGL2, and Pages gates for runtime-session lifecycle authority.

- [x] Review current route startup and pagehide behavior.
- [x] Confirm no session lifecycle fixture exists.
- [x] Define startup rollback, reset quiescence, stop/dispose, and restart cases.
- [x] Define public-host and renderer-resource acceptance.

## Required DOM-free lifecycle fixture

```txt
create session harness
acquire mock world, render graph, listeners, timers and animation lease
commit running
request reusable world reset
assert callbacks quiesced before world recovery
assert fresh world and renderer generations
assert first frame acknowledged before resume
request stop twice
assert second result is already-disposed
invoke retained old callbacks
assert no work or mutation occurs
```

## Required startup rollback fixture

Inject failure after each acquisition stage:

```txt
renderer init
world construction
world prepare
volume texture creation
cloud/fog renderer creation
post pipeline creation
listener registration
animation-loop installation
global-host publication
```

For every failure:

```txt
all prior acquisitions retire in reverse order
no animation callback survives
no listener/timer survives
no mutable global host survives
all rollback failures are reported
```

## Required browser smoke

```txt
boot core mode
assert one renderer and one animation loop
assert one listener/timer lease set
advance world and materialization
request reusable reset through typed command
observe frozen scenario/input/focus/materialization
observe fresh world generation and first visible frame
request terminal stop
observe animation loop cleared
observe listeners/timers removed
observe raw host revoked
observe world and render resources retired
restart once
assert exactly one new session and no old callback activity
```

## Backend matrix

```txt
WebGPU primary
WebGL2 fallback
legacy world rollback mode
pagehide during startup
pagehide during reset
pagehide after terminal stop
```

## Required proof fields

```txt
sessionId
sessionGeneration
worldGeneration
rendererGeneration
phase
animationLeaseCount
listenerLeaseCount
timerLeaseCount
resourceAcquireCount
resourceReleaseCount
firstVisibleFrameId
staleCallbackRejectCount
disposalStatus
failures[]
```

## Pages acceptance

```txt
no duplicate renderer, loop, listener set, timer chain or global host
no callback mutates after generation retirement
no old-world materialization after reset
no render after terminal disposal
pagehide is idempotent
restart creates one clean session
all failures surface in detached diagnostics
```

## Current status

```txt
runtime source changed: no
npm test run: no
browser smoke run: no
single-session fixture exists: no
startup rollback fixture exists: no
reset quiescence fixture exists: no
complete disposal fixture exists: no
Pages restart proof exists: no
```