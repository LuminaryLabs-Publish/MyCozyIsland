# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T11-19-10-04-00`

## Summary

The production page has no authoritative runtime-session owner. Startup acquisitions, animation work, input listeners, loader timers, world recovery, renderer resources, global host exposure, pagehide, stop, disposal, and restart are not coordinated by one phase or generation.

The Core World reset/re-prepare defect remains active: reset clears runtime definitions and a later prepare does not re-register them.

## Runtime-session gaps

```txt
sessionId: absent
session generation: absent
session phase machine: absent
command admission: absent
startup acquisition ledger: absent
startup rollback: absent
quiescing phase: absent
blocked phase: absent
bounded lifecycle journal: absent
detached lifecycle result: absent
```

## Callback and lease gaps

```txt
animation-loop lease: absent
animation-loop clear on pagehide: absent
animation callback generation check: absent
listener handler registry: absent
listener option registry: absent
listener removal result: absent
timer handle registry: absent
timer generation check: absent
held input retirement: absent
pointer drag retirement: absent
stale callback rejection: absent
```

## Public host gaps

- `globalThis.CozyIsland` exposes the raw renderer, scene, camera, world runtime, scenario, renderers, post pipeline, and performance controller.
- A same-page caller can invoke world reset or disposal without session admission.
- Old host references cannot be revoked after stop or restart.
- The host has no command sequence, semantic result, session identity, generation, or bounded journal.
- Observations are assembled from live mutable objects rather than detached committed state.

## Reset and recovery gaps

```txt
soft reset policy: absent
hard recreate policy: implicit
terminal disposal state: absent
world generation: absent
world definition checkpoint: absent
world re-registration: absent
provider release/reset results: absent
materializer cancellation result: absent
reset/re-prepare transaction: absent
recovery fingerprint and rollback: absent
```

- Reset can run while scenario, camera, input, renderer, performance, and debug work remain live.
- No session quiescence precedes world recovery.
- No first-visible-frame acknowledgement completes recovery.
- No renderer generation identifies which world generation a frame consumed.

## Startup failure gaps

- `main().catch(fail)` projects failure but does not unwind acquired resources.
- Renderer initialization may succeed before later world or render-resource creation fails.
- Partial scene, volume texture, listener, timer, animation, or host acquisitions have no rollback entries.
- Failure cleanup errors cannot be aggregated or inspected.

## Render-resource gaps

```txt
renderer.setAnimationLoop(null): never called by route
scene resource inventory: absent
geometry/material/texture retirement result: absent
cloud/fog volume texture retirement: absent
post target/pipeline retirement: absent
world/ocean/foam/cloud/fog renderer retirement: incomplete or unproven
WebGPURenderer disposal result: absent
canvas/context ownership result: absent
```

`pagehide` invokes only `domains.dispose()`. The compatibility renderer and GPU resource graph remain outside the world wrapper's disposal boundary.

## Gameplay and interaction gaps

- Scenario time and camera continue after semantic world reset.
- Held keys and drag state are not retired before recovery.
- Input callbacks have no phase admission.
- Resize can mutate renderer/camera during disposal.
- Adaptive performance callbacks can mutate renderer quality during reset or stop.
- Loader timers can mutate DOM after startup failure or session retirement.

## Focus, materialization, and render gaps retained

- `updateWorldFocus()` returns Boolean rather than a typed revision.
- Materialization has no session/world/focus/generation admission fence.
- Provider readiness is not a canonical version set.
- No elapsed-time work budget or classified provider failure result.
- Ready descriptors are not consumed by visible cell-aware rendering.
- No cell-resource commit, rollback, or visible-frame acknowledgement exists.

## Validation gaps

```txt
single active animation loop
single listener and timer lease set
startup rollback after every acquisition stage
reset quiescence before world recovery
held-input and pointer-drag retirement
reset followed by re-prepare
new world and renderer generation correlation
first visible frame after reset
retained old callback rejection
retained old host rejection
pagehide during startup/reset/running
complete render-resource disposal
idempotent stop/dispose
clean browser restart
WebGPU/WebGL2/legacy mode parity
```

## Deployment blockers

```txt
raw mutable global host
unleased live callbacks
world reset under active frame loop
no startup rollback
pagehide world-only disposal
no complete renderer/resource retirement
no idempotent terminal result
no clean restart proof
```

## Not currently blocked by

- repository identity or direct-main policy;
- pinned Three.js and NexusEngine revisions;
- 50 local kit descriptors;
- seven ordered providers;
- initial 49-cell preparation;
- deterministic focus selection;
- isolated lazy materialization;
- startup compatibility rendering;
- GitHub Pages configuration.