# Lifecycle Audit: Stop, Dispose, and Restart Contract

Timestamp: `2026-07-10T20-48-55-04-00`

## Current lifecycle

```txt
page load -> main() -> running until page teardown or failure
```

There is no explicit host-level stop, dispose, rollback, or restart transaction.

## Required lifecycle states

```txt
created
starting
running
stopping
stopped
disposing
disposed
failed
```

## State transitions

```txt
created -> starting -> running
starting -> failed -> rollback -> disposed
running -> stopping -> stopped
stopped -> running
running|stopped|failed -> disposing -> disposed
disposed -> create new session ID before restart
```

## Stop contract

Stop must:

- disable input admission
- clear held keys and drag state
- stop frame commits with `renderer.setAnimationLoop(null)`
- preserve resources only when an explicit paused/stopped policy requires reuse
- publish a stop result and stable lifecycle snapshot

## Dispose contract

Dispose must:

- be callable from running, stopped, or failed state
- stop the loop first
- remove all listeners
- release pointer capture
- dispose child resources in reverse construction order
- release the renderer last
- clear global live references
- publish final resource and listener counts
- return a typed no-op on repeated calls

## Partial-start rollback

Every successful construction step must register a compensating release step before the next allocation begins. A failure during volume compute, cloud/fog construction, post construction, or listener installation must release all prior resources.

## Restart contract

Restart must create a new session ID, rebuild owned resources once, reinstall listeners once, reset scenario/camera state, and start exactly one animation loop.

## Host proof

Expose an additive JSON-safe surface:

```txt
CozyIslandHost.getLifecycleState()
CozyIslandHost.getResourceSnapshot()
CozyIslandHost.getListenerSnapshot()
CozyIslandHost.getResultJournal()
CozyIslandHost.stop()
CozyIslandHost.dispose()
CozyIslandHost.restart()
```

Do not expose mutable Three objects through the proof surface.

## First child owner

The layered grass resource owner should be the first concrete child migrated into this lifecycle contract because its missing texture/geometry/material/mesh ownership is already documented.
