# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T07-01-49-04-00`

## Critical lifecycle gaps

1. No runtime-session owner exists above `main()`.
2. No `sessionId`, monotonic `sessionEpoch` or lifecycle state exists.
3. Startup is a sequence of direct acquisitions rather than a transaction with rollback.
4. `main().catch(fail)` projects an error but does not release resources acquired before the failure.
5. `renderer.setAnimationLoop()` is installed without a route-level stop or generation fence.
6. Wheel, pointer, keyboard, blur, resize and pagehide listeners are not represented as removable leases.
7. Two nested loader timers are not retained or cancellable.
8. `pagehide` calls only `domains.dispose()` and does not dispose the render graph or browser host.
9. No restart path proves that an old callback cannot affect a new session.
10. `globalThis.CozyIsland` is never retired, restored or tombstoned.

## Startup rollback gaps

- no acquisition sequence or reverse cleanup stack
- no failure injection by acquisition boundary
- no typed startup result
- no distinction between clean rollback and partial rollback
- no proof `renderer.init()` failure retires the renderer
- no proof initial Core World prepare failure resets engine/provider state
- no proof atmosphere-generation failure disposes earlier world/ocean/foam resources
- no proof listener or animation-loop setup failure removes prior callbacks
- no second-start proof after a failed first start

## Callback-admission gaps

- no session epoch on frame callbacks
- no session epoch on Core World focus work
- no session epoch on loader timeouts
- no stale callback rejection count
- no close-admission phase before disposal
- no in-flight frame/focus/render barrier
- no exact terminal callback result

## Browser lease gaps

```txt
canvas wheel
canvas pointerdown
canvas pointerup
canvas pointercancel
canvas pointermove
window keydown
window keyup
window blur
window resize
window pagehide
loader completion timeout
loader hide timeout
renderer animation loop
globalThis.CozyIsland
```

None of these are registered in one owner-controlled ledger.

## Render-resource gaps

- no route-level render-resource registry
- no shared renderer-consumer disposal interface
- whole-island renderer exposes no `dispose()`
- layered grass allocates a canvas texture, geometry, material and instanced mesh without a host teardown path
- ocean allocates geometry and node material without a host teardown path
- foam allocates per-band geometry and material without a host teardown path
- generated cloud and fog volume textures have no route-level release result
- cloud and fog renderer factories have no common disposal result
- post pipeline/pass graph is not explicitly disposed
- WebGPURenderer/backend is not explicitly disposed
- sky texture, material and geometry are not explicitly retired
- existing `disposeRendererObject()` is not called by the live route
- no resource counts, identities or residual-resource fingerprint are exposed

## Global-host gaps

- live renderer, scene, camera, world runtime and render adapters remain reachable
- host has no `stop`, `dispose` or `restart`
- host has no lifecycle state or session epoch
- host has no resource ownership or disposal readback
- previous global values are not preserved
- failed startup before host publication has no controller surface

## Core World contract-parity gaps

- browser ships the pinned production runtime while Node fixtures inject a simpler fake
- fake selection shape does not model required/retained/released/updated
- fake omits provider matching and capability admission
- fake omits critical failure, diagnostics, failed cells and provider rollback
- `prepare()` sets `prepared = true` before initial `commitFocus()` succeeds
- `updateWorldFocus()` collapses complete, degraded, rejected and partial outcomes to Boolean
- provider stores have no wrapper-level checkpoint or transaction
- no focus/world/provider revision is correlated with the runtime session epoch

## Render-consumer gaps

- one whole-island renderer is constructed from the startup compatibility snapshot
- later provider changes are not synchronized into visible resources
- failed provider transitions can be masked by the global graph
- no render admission policy for incomplete world revisions
- no cell prepare/update/release commit in the live host
- no world/render fingerprint comparison
- no visible shadow-parity mode

## Scenario and quality gaps

- pointer drag during rail mode mutates authored rail points and reset does not restore the baseline
- environment clock advances while several descriptors remain startup-frozen
- adaptive-quality level zero can report recovery while renderer DPR remains degraded
- performance sampling is not a direct GPU/render-submit result

## Proof gaps

```txt
startup acquisition rollback fixture
listener/timer/animation lease fixture
stop-before-first-frame fixture
stop-during-frame fixture
stop-during-focus fixture
idempotent disposal fixture
resource residual-count fixture
global-host retirement fixture
old-callback-after-restart fixture
WebGPU start/stop/restart smoke
WebGL2 start/stop/restart smoke
legacy-mode lifecycle smoke
pinned Core World contract fixture
provider failure and focus transaction fixture
provider-to-render commit fixture
camera baseline/reset fixture
environment-frame coherence fixture
adaptive-quality full-recovery fixture
```

## Secondary risks

- future cell-owned GPU resources will multiply cleanup paths before ownership is solved
- the central-clearing movement bound masks many cross-cell lifecycle races
- global compatibility rendering can make provider failures look harmless
- stale `globalThis.CozyIsland` references can keep the complete graph alive after navigation
- repeated module or host startup could register duplicate listeners and animation work
- upgrading Three.js or NexusEngine can alter disposal requirements without a lifecycle contract

## Not currently blocked by

- repository identity
- pinned Three.js and NexusEngine coordinates
- local 50-kit catalog count
- deterministic world generation
- visual content availability
- isolated renderer-disposal helper existence
- static Pages configuration
