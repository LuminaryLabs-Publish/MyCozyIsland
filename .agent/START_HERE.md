# START HERE: MyCozyIsland

Last aligned: `2026-07-11T11-19-10-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make the browser runtime session the sole owner of startup, callbacks, world recovery, rendering, stop, disposal, and restart before reusable reset or live cell rendering depends on it.

## Summary

The Core World reset/re-prepare audit established that the world definition is cleared without re-registration. This follow-up identifies the parent lifecycle problem: `src/main-cloudform.js` installs a permanent renderer animation loop, anonymous browser listeners, delayed loader timers, a mutable global host, and a large render-resource graph, while `pagehide` calls only `domains.dispose()`.

A raw `CozyIsland.worldRuntime.reset()` or `.dispose()` can therefore run while scenario, camera, focus, materialization, rendering, performance adaptation, and diagnostics continue executing. The route needs one session generation, phase machine, lease registry, startup rollback stack, reset-quiescence handshake, complete render retirement, and idempotent terminal result.

## Plan ledger

**Goal:** document the complete browser ownership graph and define a fixture-backed session lifecycle that quiesces live work before world recovery and retires every acquired callback and resource on stop.

- [x] Compare all accessible Publish repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` because its repo-local reset audit was newer than central tracking.
- [x] Trace production startup, listeners, timers, animation loop, public host, world reset, pagehide, and render resources.
- [x] Identify the interaction loop, domains, services, 50 local kits, seven providers, and runtime-implied adapters.
- [x] Confirm the animation callback has no session phase or generation admission.
- [x] Confirm pagehide disposes only the world wrapper.
- [x] Define runtime-session, quiescence, acquisition rollback, lease, disposal-result, and fixture boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, lifecycle, and deploy audits.
- [x] Change no runtime or deployment behavior.
- [x] Push directly to `main`; create no branch or pull request.

## Current interaction loop

```txt
route startup
  -> initialize WebGPU/WebGL2 renderer
  -> construct Core World wrapper and seven providers
  -> prepare 49 cells
  -> create compatibility world/ocean/foam/cloud/fog/post resources
  -> attach wheel, pointer, keyboard, blur, resize and pagehide listeners
  -> schedule loader timers
  -> install renderer.setAnimationLoop
  -> expose globalThis.CozyIsland with raw runtime and render objects

frame
  -> scenario.tick
  -> camera projection
  -> updateWorldFocus
  -> compatibility renderer updates
  -> postPipeline.render
  -> processMaterializationFrame
  -> debug/global observations

reset/dispose
  -> raw worldRuntime remains callable
  -> loop/listeners/timers remain admitted
  -> semantic world can clear while old compatibility frame continues
  -> pagehide retires only domains
```

## Main finding

```txt
session owner: absent
session phase/generation: absent
startup acquisition ledger: absent
startup rollback: absent
animation-loop lease: absent
listener/timer leases: absent
reset quiescence: absent
global host revocation: absent
complete render-resource retirement: absent
idempotent session disposal result: absent
single-session/restart fixture: absent
```

World recovery is a child transaction of the browser session. It cannot become safe while the route continues admitting callbacks and rendering without a generation fence.

## Required authority flow

```txt
StartSession
  -> allocate session and generation
  -> acquire renderer, world, render graph, listeners and timers
  -> install one animation lease
  -> publish a read-only command/observation host
  -> commit running

ResetWorld
  -> enter quiescing
  -> retire held input and successor frame work
  -> freeze focus/materialization/render publication
  -> execute Core World recovery
  -> correlate new world and renderer generations
  -> acknowledge first visible frame
  -> resume running

StopSession
  -> retire generation
  -> clear animation loop and timers
  -> remove listeners
  -> revoke public host
  -> dispose world and complete render graph
  -> publish detached idempotent result
```

## Priority order

```txt
1. Runtime Session Lifecycle Authority
2. Core World Reset / Re-prepare Authority
3. Pinned Core World Focus Transaction Authority
4. Live Materialization Readiness Commit Authority
5. Core World Render Commit Authority
6. Camera Rail Baseline Authority
7. Dynamic Environment Frame Authority
8. Adaptive Quality Transaction Authority
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T11-19-10-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T11-19-10-04-00.md
.agent/architecture-audit/2026-07-11T11-19-10-04-00-browser-runtime-session-lifecycle-dsk-map.md
.agent/render-audit/2026-07-11T11-19-10-04-00-animation-loop-world-generation-correlation-gap.md
.agent/gameplay-audit/2026-07-11T11-19-10-04-00-reset-during-live-frame-loop.md
.agent/interaction-audit/2026-07-11T11-19-10-04-00-global-host-listener-command-map.md
.agent/lifecycle-audit/2026-07-11T11-19-10-04-00-session-quiescence-disposal-contract.md
.agent/deploy-audit/2026-07-11T11-19-10-04-00-single-loop-reset-disposal-fixture-gate.md
```

## Do not start next with

- calling world reset or dispose directly through `globalThis.CozyIsland`;
- adding restart before the animation loop and callbacks are leased;
- treating `pagehide` world disposal as complete browser teardown;
- reconnecting cell-aware rendering before session/world/renderer generations exist;
- disposing scene children without an inventory and typed result;
- allowing retained old host or listener references to stay mutable after restart.