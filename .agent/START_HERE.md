# START HERE: MyCozyIsland

Last aligned: `2026-07-10T22-29-21-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: preserve runtime-session lifecycle authority as the first implementation gate, then repair adaptive-quality transaction and recovery authority.

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are represented in the central ledger and have root `.agent` state. `TheCavalryOfRome` remains excluded, so the oldest documented-selection rule applied.

```txt
MyCozyIsland       selected / prior 2026-07-10T20-48-55-04-00
PrehistoricRush    tracked  / 2026-07-10T21-00-16-04-00
AetherVale         tracked  / 2026-07-10T21-08-52-04-00
IntoTheMeadow      tracked  / 2026-07-10T21-19-36-04-00
TheOpenAbove       tracked  / 2026-07-10T21-31-01-04-00
HorrorCorridor     tracked  / 2026-07-10T21-39-22-04-00
PhantomCommand     tracked  / 2026-07-10T21-49-26-04-00
ZombieOrchard      tracked  / 2026-07-10T22-11-24-04-00
TheUnmappedHouse   tracked  / 2026-07-10T22-21-17-04-00
TheCavalryOfRome   excluded by rule
```

Only `MyCozyIsland` was changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPURenderer and choose startup quality
  -> compose deterministic terrain/ocean/vegetation/weather snapshot
  -> create world, ocean, foam, cloud, fog, sky, and post resources
  -> install browser listeners
  -> renderer.setAnimationLoop
  -> scenario/camera tick
  -> world and foam update
  -> performanceBudget.sample(frameMs)
  -> sequential adaptive-quality mutations
  -> post render
  -> periodic debug and aggregate host readback
```

## Newly documented finding

The adaptive quality path can report a full recovery while leaving the renderer at a degraded pixel ratio.

```txt
level 0 startup
  -> pixel ratio = min(devicePixelRatio, quality.pixelRatioCap)

degrade to level 1
  -> cloud/fog steps = 0.78 scale
  -> fog resolution = 0.82 scale
  -> pixel ratio = 0.88 scale

recover to level 0
  -> cloud/fog steps restored
  -> fog resolution restored
  -> pixel ratio restoration skipped because setPixelRatio only runs when level > 0
```

The performance budget then reports `level: 0`, while the actual renderer can remain at the level-1 pixel ratio. The debug overlay shows only the static startup quality tier, and host readback omits the applied pixel ratio and fog resolution. There is no atomic transition result, rollback, transition journal, or policy for whether `?quality=` is a lock, ceiling, floor, or starting point.

## Preserved first gate

The route still lacks a complete runtime-session owner for animation-loop cancellation, listener removal, startup rollback, resource disposal, and restart. That remains the first implementation gate. Adaptive-quality authority is the second bounded gate because it should be owned and observed by the future session host.

## Read this pass first

```txt
.agent/trackers/2026-07-10T22-29-21-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T22-29-21-04-00.md
.agent/architecture-audit/2026-07-10T22-29-21-04-00-adaptive-quality-transaction-dsk-map.md
.agent/render-audit/2026-07-10T22-29-21-04-00-quality-recovery-pixel-ratio-commit-gap.md
.agent/gameplay-audit/2026-07-10T22-29-21-04-00-scenario-performance-control-loop.md
.agent/interaction-audit/2026-07-10T22-29-21-04-00-quality-override-runtime-admission-map.md
.agent/performance-system-audit/2026-07-10T22-29-21-04-00-degrade-recover-state-machine-contract.md
.agent/deploy-audit/2026-07-10T22-29-21-04-00-adaptive-quality-transition-fixture-gate.md
```

## Ordered safe ledges

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Do not start next with

- cloud, fog, ocean, terrain, grass, camera, or lighting retuning
- renderer replacement
- new quality tiers
- route-token churn
- new island content
- more GPU resource allocation without session ownership
