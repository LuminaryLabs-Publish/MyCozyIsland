# Architecture Audit: Runtime Session Lifecycle DSK Map

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** define the smallest composable DSK boundary that owns the full route lifetime without moving world, renderer or gameplay logic into one monolith.

- [x] Identify current construction and cleanup owners.
- [x] Separate lifecycle authority from world and renderer services.
- [x] Define commands, state, leases, results and observations.
- [x] Preserve the existing 50-kit content/runtime catalog.

## Current composition

```txt
main-cloudform.js
  owns construction order
  owns direct listener/timer registration
  owns renderer animation loop
  owns global host publication

world-runtime.js
  owns Core World wrapper state
  exposes reset/dispose for world semantics only

renderer factories
  own live objects and update methods
  do not share a common route-level dispose result

renderer-disposal.js
  can traverse and dispose one graph
  is not wired into the live host
```

## Proposed parent domain

```txt
runtime-session-authority-domain
```

It owns only lifecycle identity, admission, resource leases, cleanup ordering and terminal results. Existing world, scenario and render kits remain service providers.

## Proposed kits

```txt
runtime-session-id-kit
  create monotonic session identity and epoch

runtime-session-state-kit
  own idle/starting/running/stopping/disposing/stopped/failed transitions

runtime-session-command-kit
  normalize Start, Stop, Dispose and Restart commands

runtime-session-result-kit
  produce bounded JSON-safe terminal results

runtime-session-owner-kit
  coordinate construction, frame admission and teardown

startup-acquisition-ledger-kit
  record every successful resource acquisition

reverse-cleanup-stack-kit
  execute release callbacks in deterministic reverse order

listener-lease-kit
  add/remove named canvas and window listeners

timer-lease-kit
  retain/cancel named loader timeouts

animation-loop-lease-kit
  install and clear renderer.setAnimationLoop

session-epoch-admission-kit
  reject work from prior epochs

frame-generation-fence-kit
  validate each animation callback before mutation/render

focus-work-generation-fence-kit
  validate Core World focus work and results

render-resource-registry-kit
  identify owned scene, texture, pipeline and renderer resources

renderer-disposal-adapter-kit
  normalize disposal across world/ocean/foam/cloud/fog/post/backend

global-exposure-lease-kit
  publish, retire and optionally restore globalThis.CozyIsland

startup-rollback-kit
  execute partial-construction cleanup on failure

terminal-disposal-kit
  perform idempotent exact-once teardown

restart-handoff-kit
  start a new epoch only after prior terminal policy resolves

lifecycle-observation-kit
  expose state, counts, failures and fingerprints

runtime-lifecycle-journal-kit
  retain bounded command/result/resource events

runtime-lifecycle-fixture-kit
  inject failures and stale callbacks deterministically

browser-restart-smoke-kit
  prove WebGPU/WebGL2/legacy start-stop-restart behavior
```

## Dependency direction

```txt
route host
  -> runtime-session-authority-domain
       -> existing world runtime
       -> existing scenario
       -> existing renderer factories
       -> renderer-disposal helper
       -> browser APIs
```

The lifecycle domain depends on provider interfaces. World and renderer kits must not depend back on the route host.

## Commit boundary

A session becomes `running` only after:

```txt
renderer/backend initialized
Core World initial prepare accepted
all required render resources created
listeners and timers leased
animation loop installed
host exposure committed
```

A stop becomes terminal only after every acquired lease has one release result and residual resources are explicitly zero or named.

## Observation contract

```txt
sessionId
sessionEpoch
state
activeCommandId
resourceCountByKind
listenerLeaseCount
timerLeaseCount
animationLoopActive
inFlightFrameCount
inFlightFocusCount
globalLeaseActive
releasedResourceCount
residualResourceIds
disposalFailures
lastResult
recentJournal
```

## Non-goals

- changing terrain or visual algorithms
- moving Core World provider logic into lifecycle authority
- making cells visibly authoritative
- replacing the existing 50 local kits
- adding a new branch or deployment route
