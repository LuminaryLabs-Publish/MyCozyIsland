# Project Breakdown: MyCozyIsland Browser Runtime Session Lifecycle

Timestamp: `2026-07-11T11-19-10-04-00`

## Summary

`MyCozyIsland` was selected because its repo-local Core World reset/re-prepare audit had advanced beyond the central ledger. The follow-up trace found that the browser host has no session owner capable of quiescing the animation loop, input listeners, loader timers, renderer resources, or the global host while world reset or disposal runs.

## Plan ledger

**Goal:** map the complete live browser ownership graph and define one session-fenced startup, reset, stop, dispose, and restart contract without changing runtime behavior.

- [x] Compare all 10 accessible `LuminaryLabs-Publish` repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Prioritize only `MyCozyIsland` because current repo-local audit state was newer than its central ledger.
- [x] Read the production route, Core World wrapper, reset path, render loop, public host, listeners, timers, and pagehide path.
- [x] Identify the interaction loop, domains, services, 50 local kits, seven providers, and runtime-implied adapters.
- [x] Define session phases, leases, reset quiescence, resource retirement, and fixture boundaries.
- [x] Change no runtime, rendering, package, or deployment behavior.
- [x] Push documentation directly to `main`; create no branch or pull request.

## Interaction loop

```txt
module boot
  -> create WebGPU renderer
  -> construct Core World wrapper and seven providers
  -> prepare 49 cells
  -> construct compatibility world, ocean, foam, cloud, fog, and post resources
  -> attach wheel, pointer, keyboard, blur, resize, and pagehide listeners
  -> schedule loader timers
  -> install renderer.setAnimationLoop
  -> expose globalThis.CozyIsland including raw worldRuntime

frame
  -> scenario.tick
  -> camera projection
  -> updateWorldFocus
  -> compatibility renderer updates
  -> postPipeline.render
  -> processMaterializationFrame
  -> debug/global readback

reset or dispose
  -> callable through raw CozyIsland.worldRuntime
  -> animation loop and listeners remain live
  -> pagehide calls domains.dispose only
  -> renderer loop, renderer resources, scene resources, timers, listeners, and global host have no joined retirement result
```

## Domains in use

```txt
browser route and loader projection
WebGPU/WebGL2 renderer startup
Core World coordination and seven-provider lifecycle
product world wrapper and lazy materializer
camera rail and first-person input
scenario/environment clock
compatibility world rendering
ocean, foam, cloud, fog, and post processing
adaptive performance and debug projection
browser listener and timer lifecycle
animation-loop lifecycle
world reset/re-prepare lifecycle
renderer, scene, texture, and global-host lifecycle
validation and Pages deployment
```

## Kits and services

The repository retains 50 local source kits, six imported NexusEngine construction services, seven ordered Core World providers, and runtime adapters for world coordination, lazy materialization, queries, compatibility rendering, cell caches, disposal, input, loader/error projection, animation hosting, and diagnostics.

The new lifecycle boundary adds candidate services for session identity, phase admission, acquisition rollback, listener/timer/animation leases, reset quiescence, resource retirement, idempotent stop/dispose, global-host revocation, and restart proof.

## Main finding

`renderer.setAnimationLoop()` remains active while the raw world runtime can be reset or disposed. The callback continues calling scenario, focus, materialization, renderer, and debug services without a session phase or generation check. `pagehide` retires only the world wrapper, leaving the renderer loop and browser-owned resources outside one observable teardown.

## Required parent domain

```txt
cozy-island-runtime-session-lifecycle-domain
```

Required composition:

```txt
runtime-session-authority-kit
runtime-session-phase-kit
runtime-session-generation-kit
startup-acquisition-ledger-kit
startup-rollback-kit
animation-loop-lease-kit
listener-lease-kit
timer-lease-kit
reset-quiescence-kit
world-session-adapter-kit
renderer-resource-inventory-kit
renderer-retirement-kit
global-host-revocation-kit
idempotent-session-stop-kit
session-disposal-result-kit
session-lifecycle-journal-kit
browser-single-session-fixture-kit
```

## Required output

```txt
START_HERE.md
current-audit.md
next-steps.md
known-gaps.md
validation.md
kit-registry.json
turn-ledger timestamp
architecture audit
render audit
gameplay audit
interaction audit
lifecycle audit
deploy audit
central ledger and internal change log
```