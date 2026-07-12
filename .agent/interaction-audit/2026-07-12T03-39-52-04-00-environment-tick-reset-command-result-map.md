# Interaction Audit: Environment Tick and Reset Command Result Map

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

Environment advancement currently occurs as an untyped side effect of the renderer callback, and reset is a direct method call. Neither path has command identity, predecessor revision, reset generation, typed result, stale rejection, consumer receipts, or visible-frame acknowledgement.

## Current interaction map

```txt
renderer callback(now)
  -> derive frameMs and dt
  -> scenario.tick(dt)
     -> clock.tick(dt)
     -> camera.tick(dt)
  -> read render snapshot
  -> update mixed-time render consumers
  -> render

public caller
  -> CozyIsland.scenario.reset()
     -> clock.reset()
     -> camera.reset()
  -> no typed result
  -> no renderer reset transaction
```

## Missing command envelopes

```txt
EnvironmentFrameCommand
EnvironmentPauseCommand
EnvironmentTimeScaleCommand
EnvironmentResetCommand
```

Each command requires:

```txt
commandId
sessionId
runtimeGeneration
resetGeneration
expectedClockRevision
expectedEnvironmentRevision
sequence
source
payload
```

## Required classifications

```txt
accepted
duplicate
stale-session
stale-runtime-generation
stale-reset-generation
stale-clock-revision
stale-environment-revision
invalid-delta
clamped-delta
paused
partial-consumer-result
rejected
```

## Required result flow

```txt
command
  -> validate identity and predecessor revisions
  -> derive candidate canonical time
  -> evaluate dynamic environment snapshot
  -> update CPU and GPU consumers
  -> collect receipts
  -> commit or reject atomically
  -> publish typed result
  -> acknowledge visible output
```

## Required observation

```txt
EnvironmentObservation {
  clockSourceId
  clockRevision
  environmentFrameId
  environmentRevision
  resetGeneration
  canonicalTime
  paused
  timeScale
  descriptorFingerprint
  requiredConsumerIds[]
  acceptedConsumerReceipts[]
  lastCommandId
  lastResult
  lastVisibleFrameId
}
```

## Browser adapter boundary

The renderer callback should remain an adapter. It should submit `EnvironmentFrameCommand`, not directly advance mutable time and then independently drive consumers.

```txt
requestAnimationFrame / setAnimationLoop
  -> normalized frame command
  -> authority result
  -> render plan
```

## Public host boundary

`globalThis.CozyIsland` should not expose raw mutable scenario or renderer authority for environment control. A safe gateway should expose clone-safe observation and admitted commands only.

## Minimum fixtures

```txt
duplicate frame command
stale reset generation
invalid and clamped delta
pause and time-scale result
partial consumer receipt
stale GPU callback
reset command to visible frame acknowledgement
browser and headless command parity
```

## Validation boundary

```txt
interaction source changed: no
public host changed: no
command fixtures implemented: no
browser adapter smoke run: no
```