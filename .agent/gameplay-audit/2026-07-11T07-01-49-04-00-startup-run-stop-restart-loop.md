# Gameplay Audit: Startup, Run, Stop and Restart Loop

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** map the player-visible route lifecycle to the missing runtime session transitions so gameplay cannot continue, restart or fail on top of stale state.

- [x] Trace route startup through the first frame.
- [x] Trace the rail and first-person loop.
- [x] Trace pagehide and fatal behavior.
- [x] Identify missing stop and restart semantics.

## Current loop

```txt
load page
  -> loader progresses through renderer, world and atmosphere construction
  -> rail reveal begins
  -> scroll advances descent
  -> pointer drag changes view
  -> WASD explores the clearing
  -> H toggles diagnostics
  -> frames continuously tick scenario, focus, render and performance
  -> pagehide resets only Core World state
```

## Missing lifecycle gameplay states

The route has no explicit player/runtime states for:

```txt
starting
ready
running
stopping
stopped
failed
restarting
```

The loader and error panel imply startup states, but no authority controls gameplay admission around them.

## Failure behavior

`main().catch(fail)` updates the error panel and loader copy. It does not prove that partially created world or render resources stop. A player can therefore receive a fatal screen while prior callbacks or GPU resources remain live.

## Stop behavior

There is no player or host stop command. `pagehide` is the only terminal signal and calls only `domains.dispose()`.

## Restart behavior

There is no restart transaction. A future retry button or remount could create:

```txt
duplicate input listeners
duplicate loader timers
multiple animation owners
old Core World focus work reaching a new session
stale global host references
multiple renderer/backend graphs
```

## Required gameplay lifecycle

```txt
StartRuntimeSession
  -> starting
  -> ready/running only after initial world and render commit

StopRuntimeSession
  -> freeze input and scenario admission
  -> stop frame/focus/render work
  -> dispose owned resources
  -> stopped

RestartRuntimeSession
  -> terminalize previous session
  -> increment epoch
  -> build a fresh world/scenario/render graph
  -> publish one new host
```

## Required player-visible policy

```txt
startup failure:
  show fatal state only after rollback result exists

stop/navigation:
  reject further input immediately

restart:
  show loader for the new session
  restore one clean camera/scenario baseline
  expose one new diagnostics host

partial disposal failure:
  do not silently start a second session
  report named residual resources and policy
```

## Required fixtures

```txt
first frame occurs once
input before running is rejected
stop freezes scenario clock
stop freezes camera and focus movement
old input after stop is rejected
restart begins from deterministic baseline
old frame does not advance new scenario
old focus result does not change new world
loader/error state matches lifecycle result
```

## Current status

```txt
explicit gameplay lifecycle: absent
stop/restart controls: absent
session baseline proof: absent
runtime source changed by audit: no
```
