# Gameplay Audit: Pagehide, Pageshow and World Session Loop

Timestamp: `2026-07-11T17-50-37-04-00`

## Summary

Gameplay and camera state are advanced inside the renderer animation callback. The only page-exit handling resets the Core World runtime. It does not stop the callback, clear held input, reset the camera scenario, or define what happens when a persisted page returns from bfcache. This can produce a mixed session where the scenario and renderer continue while the world runtime has been reset.

## Plan ledger

**Goal:** define the gameplay-state behavior for suspend, stop, dispose and restart so page lifecycle events cannot create a half-running world session.

- [x] Trace scenario tick and camera update.
- [x] Trace world focus and materialization calls.
- [x] Trace input clearing and page lifecycle handling.
- [x] Identify mixed-state and stale-callback risks.
- [x] Define suspend/resume and dispose/restart policies.
- [x] Define gameplay lifecycle fixtures.

## Current frame loop

```txt
animation callback
  -> calculate dt from previous callback timestamp
  -> domains.scenario.tick(dt)
  -> read camera render snapshot
  -> update camera transform
  -> domains.updateWorldFocus(...)
  -> update visible world and foam
  -> sample adaptive performance
  -> render
  -> domains.processMaterializationFrame(...)
```

## Current page lifecycle

```txt
blur
  -> input.clear()

pagehide
  -> domains.dispose()
  -> world reset and prepared=false

pageshow
  -> no handler
```

## Mixed-state failure mode

```txt
running session
  scenario clock and camera rail are active
  renderer loop is registered
  Core World is prepared

pagehide
  Core World reset
  materializer reset
  scenario state retained
  input listeners retained
  animation-loop callback retained
  previous last-frame timestamp retained

persisted pageshow or resumed callback
  scenario advances from retained state
  updateWorldFocus returns false because prepared=false
  materialization returns reset state
  renderer continues drawing the old whole-island snapshot
  diagnostics can show running camera with reset world state
```

The current whole-island compatibility renderer masks some consequences because it uses one startup snapshot, but future cell-aware rendering will make this split visible as stale or missing world content.

## Required policy choices

### Suspend/resume policy

```txt
pagehide persisted=true
  -> suspend frame, input, materialization and quality sampling
  -> retain admitted render/world resources
  -> preserve scenario state
  -> reset frame-time baseline

pageshow persisted=true
  -> verify same session generation
  -> revalidate renderer and Core World readiness
  -> clear held input
  -> reset last-frame timestamp
  -> reacquire one animation-loop lease
  -> acknowledge first resumed frame
```

### Dispose/restart policy

```txt
pagehide persisted=false
  -> stop input and frame work
  -> dispose runtime graph

new navigation or explicit restart
  -> create new session and generation
  -> prepare new Core World and scenario baseline
  -> render first restarted frame
```

## Gameplay lifecycle state

```txt
scenario revision
camera sequence state
input held-key state
pointer drag state
environment clock
world prepared state
world focus revision
materialization generation
adaptive quality revision
committed frame identity
```

These values must either all belong to one live session generation or be classified as retained across a declared suspend.

## Required fixtures

```txt
blur clears held input without ending session
persisted pagehide suspends without resetting only one subsystem
persisted pageshow resumes with fresh dt baseline
non-persisted pagehide fully stops and disposes
no scenario tick after stop
no world focus/materialization after stop
no stale input after resume
same-session resume retains declared scenario state
full restart resets declared scenario state
first resumed/restarted frame carries correct session generation
```

## Acceptance

```txt
scenario, world, materialization, quality and render work share one lifecycle state
no callback advances gameplay after stop or dispose
bfcache behavior is explicit and tested
resume cannot inject a large stale frame delta
restart cannot reuse old input, world or frame generation
```
