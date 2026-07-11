# Gameplay Audit: Reset During the Live Frame Loop

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

The public `CozyIsland.worldRuntime` reference allows reset or disposal while the host frame continues to tick scenario state and read the same wrapper. The current Boolean guards prevent some Core World work after reset, but they do not create a coherent gameplay/session transition.

## Plan ledger

**Goal:** map the gameplay consequences of resetting semantic world state without quiescing scenario, camera, input, materialization, rendering, or observations.

- [x] Trace public world-runtime exposure.
- [x] Trace scenario and camera work in the frame callback.
- [x] Trace wrapper behavior after reset.
- [x] Identify mixed old/new state surfaces.
- [x] Define gameplay admission and recovery requirements.

## Current reset interaction

```txt
external page script
  -> CozyIsland.worldRuntime.reset()
  -> Core World definitions/cells/providers cleared
  -> materializer cleared
  -> prepared=false and snapshot=null

next animation frame
  -> scenario.tick continues
  -> camera continues
  -> updateWorldFocus returns false because prepared=false
  -> compatibility world renderer continues with startup snapshot
  -> postPipeline.render continues
  -> processMaterializationFrame returns cleared state
  -> debug/global readback publishes mixed state
```

## Mixed-state consequences

```txt
scenario clock and camera generation: old and still advancing
semantic Core World generation: cleared
compatibility render snapshot: old and still visible
materialization state: reset
input state: still admitted
performance controller: still sampling and mutating quality
public host: still exposes all live references
```

The game can therefore appear stable while semantic world authority has been removed. A later attempted `prepare()` fails under the current definition-clearing reset contract, leaving the route in a partially live state rather than a typed failed or blocked phase.

## Required gameplay/session result

```txt
ResetWorldSessionResult {
  commandId
  sessionId
  priorSessionGeneration
  nextSessionGeneration
  priorWorldGeneration
  nextWorldGeneration
  inputRetired
  scenarioFrozen
  worldRecoveryResult
  firstFrameResult
  status
  failures[]
}
```

## Required behavior

```txt
reset requested
  -> stop accepting gameplay input
  -> freeze scenario clock and camera progression
  -> stop focus/materialization work
  -> execute world recovery
  -> reset or intentionally preserve scenario state by policy
  -> rebuild correlated observations
  -> acknowledge first fresh frame
  -> resume input and scenario
```

Policies must explicitly state whether a world reset preserves or resets:

```txt
scenario elapsed time
camera rail progress
first-person position and held keys
environment clock
adaptive performance tier
debug visibility
```

## Fixture cases

```txt
reset during rail camera
reset while first-person keys are held
reset after partial materialization
reset during adaptive-quality transition
reset after a focus cell crossing
reset failure leaves session blocked, not half-running
terminal disposal prevents further gameplay ticks
```

## Acceptance boundary

World recovery is not complete until scenario, input, camera, semantic world, renderer, and observations agree on one new session/world generation or the session enters an explicit blocked/terminal phase.