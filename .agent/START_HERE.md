# START HERE: MyCozyIsland

Last aligned: `2026-07-10T19-11-19-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: layered-grass source consumption, resource ownership, disposal, and host-visible proof.

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory contains ten repositories. All nine eligible non-Cavalry repositories are represented in the central ledger and have root `.agent` state. `TheCavalryOfRome` remains excluded.

`MyCozyIsland` was the oldest eligible documented fallback at the start of this pass.

```txt
MyCozyIsland       selected / prior 2026-07-10T17-38-35-04-00
TheOpenAbove       tracked  / 2026-07-10T17-51-35-04-00
PrehistoricRush    tracked  / 2026-07-10T18-01-03-04-00
AetherVale         tracked  / 2026-07-10T18-08-37-04-00
IntoTheMeadow      tracked  / 2026-07-10T18-22-01-04-00
HorrorCorridor     tracked  / 2026-07-10T18-31-21-04-00
PhantomCommand     tracked  / 2026-07-10T18-40-13-04-00
ZombieOrchard      tracked  / 2026-07-10T18-49-54-04-00
TheUnmappedHouse   tracked  / 2026-07-10T19-00-19-04-00
TheCavalryOfRome   excluded by rule
```

Only `MyCozyIsland` was changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit manifests
  -> compose deterministic terrain/ocean/vegetation/atmosphere snapshot
  -> createStylizedWorldRenderer(snapshot)
     -> renderer-world-layered-grass.js
     -> suppress grass-patch rows before calling renderer-world.js
     -> generate one CanvasTexture atlas
     -> create one three-layer BufferGeometry
     -> create one MeshBasicNodeMaterial
     -> create one InstancedMesh for all grass-patch rows
     -> attach grass group to the base world group
  -> create ocean, foam, cloud, fog, and post consumers
  -> run camera-rail-to-first-person scenario
  -> sample adaptive performance and submit the post pipeline
  -> expose aggregate state through globalThis.CozyIsland
```

## Main finding

The active grass renderer now has a clear visual implementation but still has no authoritative ownership boundary.

```txt
source production owner: vegetation-placement-domain-kit
legacy suppression owner: renderer-world-layered-grass.js wrapper
resource creation owner: implicit local functions
resource disposal owner: none
host readback owner: none
one-consumer proof: none
```

The material constructor creates the atlas internally, so the texture handle is not retained as a first-class owned resource. The grass renderer may return a mesh internally, but the outer world renderer discards that handle and returns only `group` and `update()`. Neither the grass renderer nor the base world renderer exposes `dispose()`, resource counts, source reconciliation, or a JSON-safe snapshot.

A repeated route mount, hot reload, future scene replacement, or explicit restart can therefore allocate a new texture, geometry, material, and mesh without a defined release path. The current one-shot page lifecycle masks the issue.

## Read this pass first

```txt
.agent/trackers/2026-07-10T19-11-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T19-11-19-04-00.md
.agent/architecture-audit/2026-07-10T19-11-19-04-00-grass-consumer-resource-ownership-dsk-map.md
.agent/render-audit/2026-07-10T19-11-19-04-00-layered-grass-resource-handle-gap.md
.agent/grass-system-audit/2026-07-10T19-11-19-04-00-grass-source-consumption-ledger.md
.agent/resource-lifecycle-audit/2026-07-10T19-11-19-04-00-grass-resource-owner-disposal-contract.md
.agent/interaction-audit/2026-07-10T19-11-19-04-00-scenario-grass-state-observation-map.md
.agent/gameplay-audit/2026-07-10T19-11-19-04-00-exploration-render-consumer-loop.md
.agent/deploy-audit/2026-07-10T19-11-19-04-00-grass-owner-fixture-gate.md
```

## Next safe ledge

```txt
MyCozyIsland Layered Grass Consumer Ledger + Resource Ownership Fixture Gate
```

## Do not start next with

- additional grass visual tuning or density changes
- wind animation before update authority is explicit
- cloud, fog, ocean, terrain, camera, or lighting retuning
- renderer replacement
- route-token churn
- new island content
- screenshot automation

## Validation state

Documentation only. Runtime source, package scripts, dependencies, route behavior, rendering output, and deployment configuration did not change. No branch or pull request was created.