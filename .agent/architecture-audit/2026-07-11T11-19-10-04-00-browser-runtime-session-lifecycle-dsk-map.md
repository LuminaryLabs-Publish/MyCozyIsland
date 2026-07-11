# Architecture Audit: Browser Runtime Session Lifecycle DSK Map

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

The production route composes world coordination, scenario state, browser input, WebGPU rendering, post-processing, timers, and diagnostics directly inside `main()`. No parent domain owns their acquisition order, live phase, reset quiescence, rollback, or retirement.

## Plan ledger

**Goal:** define a composed lifecycle authority that can admit startup, freeze live work, coordinate Core World recovery, and retire every browser-owned resource exactly once.

- [x] Trace startup acquisition order.
- [x] Trace the live frame callback.
- [x] Trace public raw-runtime access.
- [x] Trace pagehide disposal.
- [x] Separate world recovery from route/session lifecycle.
- [x] Define parent and child kit responsibilities.

## Current composition

```txt
main()
  -> renderer.init
  -> createCozyIslandWorldRuntime
  -> domains.prepare
  -> create scene/camera/lights
  -> create compatibility world renderer
  -> create ocean/foam/cloud/fog/post resources
  -> create performance/debug services
  -> attach listeners and timers
  -> renderer.setAnimationLoop
  -> publish globalThis.CozyIsland
  -> pagehide calls domains.dispose
```

The route is the implicit composition root but exposes no lifecycle object, phase machine, lease registry, rollback stack, or disposal result.

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-domain
```

## Child kit map

```txt
runtime-session-authority-kit
  owns sessionId, phase, generation and command admission

runtime-session-phase-kit
  booting -> running -> quiescing -> resetting -> running
  booting -> failed -> disposing -> disposed
  running -> stopping -> disposed

runtime-session-generation-kit
  fences animation, listener, timer, world and renderer callbacks

startup-acquisition-ledger-kit
  records every acquired world, listener, timer, scene and GPU resource

startup-rollback-kit
  unwinds partial startup in reverse acquisition order

animation-loop-lease-kit
  installs, pauses and clears renderer.setAnimationLoop ownership

listener-lease-kit
  retains exact handler/options tuples and removes them deterministically

timer-lease-kit
  retains loader timeout handles and prevents post-stop DOM mutation

reset-quiescence-kit
  blocks tick, focus, materialization, render and debug publication during recovery

world-session-adapter-kit
  converts world reset/reprepare/dispose into session-phase results

renderer-resource-inventory-kit
  inventories scene graphs, geometries, materials, textures, targets and pipelines

renderer-retirement-kit
  retires post, cloud, fog, ocean, foam, world, renderer and canvas ownership

global-host-revocation-kit
  replaces raw mutable host exposure with a revoked or detached read model

idempotent-session-stop-kit
  makes repeated stop/dispose commands return the same terminal result

session-disposal-result-kit
  reports released leases/resources, failures and terminal state

session-lifecycle-journal-kit
  stores bounded startup, phase, reset, stop and disposal rows

browser-single-session-fixture-kit
  proves one active loop, listener set, host and renderer generation
```

## Required transaction boundaries

### Startup

```txt
admit StartSession
  -> allocate session/generation
  -> acquire renderer and world
  -> prepare world
  -> acquire render graph
  -> acquire listeners/timers
  -> install animation lease
  -> publish read-only host
  -> commit running phase
```

### Reusable world reset

```txt
admit ResetWorld
  -> quiesce animation work under current generation
  -> retire held input
  -> execute world recovery transaction
  -> correlate renderer/world generations
  -> acknowledge first fresh frame
  -> resume running
```

### Terminal disposal

```txt
admit StopSession
  -> retire generation
  -> clear animation loop
  -> clear timers
  -> remove listeners
  -> revoke global host
  -> dispose world and render graph
  -> dispose renderer/canvas ownership
  -> publish detached terminal result
```

## Existing DSKs to update first

```txt
browser route host in src/main-cloudform.js
cozy-island-world-recovery-domain
camera/scenario input domain
renderer and post-processing adapters
debug/global-host projection
```

## Acceptance boundary

A session is authoritative only when no callback can mutate or render after its generation is retired, reset freezes all live consumers before world recovery begins, partial startup rolls back, repeated disposal is idempotent, and the terminal result accounts for every acquired lease and resource.