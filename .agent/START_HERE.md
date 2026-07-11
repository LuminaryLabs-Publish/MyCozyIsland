# START HERE: MyCozyIsland

Last aligned: `2026-07-10T20-48-55-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: route-level runtime-session authority, event-loop ownership, and complete WebGPU/Three resource disposal.

## Selection result

The accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are represented in the central ledger and have root `.agent` state. `TheCavalryOfRome` remains excluded.

```txt
MyCozyIsland       selected / prior 2026-07-10T19-11-19-04-00
PrehistoricRush    tracked  / 2026-07-10T19-30-36-04-00
AetherVale         tracked  / 2026-07-10T19-38-41-04-00
IntoTheMeadow      tracked  / 2026-07-10T19-48-39-04-00
TheOpenAbove       tracked  / 2026-07-10T19-58-34-04-00
HorrorCorridor     tracked  / 2026-07-10T20-08-46-04-00
PhantomCommand     tracked  / 2026-07-10T20-19-35-04-00
ZombieOrchard      tracked  / 2026-07-10T20-30-23-04-00
TheUnmappedHouse   tracked  / 2026-07-10T20-38-24-04-00
TheCavalryOfRome   excluded by rule
```

Only `MyCozyIsland` was changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPURenderer and choose quality
  -> compose deterministic terrain/ocean/vegetation/weather snapshot
  -> create world, ocean, foam, cloud, fog, sky, and post resources
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> renderer.setAnimationLoop
  -> tick scenario and camera
  -> update world and foam
  -> sample adaptive performance
  -> render post pipeline
  -> expose live objects and latest aggregate state through globalThis.CozyIsland
```

## Main finding

The route has complete construction authority but no complete runtime-session owner.

```txt
start owner: main()
frame owner: anonymous renderer.setAnimationLoop callback
listener owner: anonymous closures in main()
rollback owner: none
dispose owner: none
restart owner: none
host lifecycle proof: none
```

The route allocates the renderer, sky texture/material/geometry, world resources, atmosphere volume textures and compute nodes, cloud/fog geometry and materials, ocean/foam resources, and post-processing resources. It also installs global and canvas listeners. None of those resources are coordinated behind one stop/dispose/restart boundary, and `fail()` reports startup errors without rolling back partially created state.

The previous layered-grass resource ownership finding remains valid, but it is now classified as the first child-resource family beneath the larger route-session lifecycle boundary.

## Read this pass first

```txt
.agent/trackers/2026-07-10T20-48-55-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T20-48-55-04-00.md
.agent/architecture-audit/2026-07-10T20-48-55-04-00-runtime-session-resource-authority-dsk-map.md
.agent/render-audit/2026-07-10T20-48-55-04-00-webgpu-resource-disposal-coverage-gap.md
.agent/gameplay-audit/2026-07-10T20-48-55-04-00-scenario-frame-session-loop.md
.agent/interaction-audit/2026-07-10T20-48-55-04-00-listener-session-admission-map.md
.agent/lifecycle-audit/2026-07-10T20-48-55-04-00-stop-dispose-restart-contract.md
.agent/deploy-audit/2026-07-10T20-48-55-04-00-session-resource-fixture-gate.md
```

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority + WebGPU Resource Disposal Fixture Gate
```

## Do not start next with

- cloud, fog, ocean, terrain, grass, camera, or lighting retuning
- renderer replacement
- route-token churn
- new island content
- screenshot automation
- additional GPU resource creation without lifecycle ownership

## Validation state

Documentation only. Runtime source, package scripts, dependencies, route behavior, rendering output, and deployment configuration did not change. No branch or pull request was created.