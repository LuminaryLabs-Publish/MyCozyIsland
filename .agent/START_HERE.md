# START HERE: MyCozyIsland

Last aligned: 2026-07-10T17-38-35-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Current focus: layered alpha-cutout grass renderer authority, lifecycle ownership, and proof.

## Selection result

The complete accessible `LuminaryLabs-Publish` installation contains ten repositories. All nine eligible non-Cavalry repositories are represented in the central ledger and have root `.agent` state. `TheCavalryOfRome` remains excluded.

`MyCozyIsland` was selected because it was the oldest eligible central-ledger entry and received two later runtime commits that had not yet been reflected in its audit state:

```txt
3d3a9b0  Add unlit layered alpha-cutout grass renderer
0fd5a50  Use unlit layered alpha-cutout grass
```

Only `MyCozyIsland` was changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit manifests
  -> compose deterministic terrain/ocean/vegetation/atmosphere snapshot
  -> src/kits/renderers.js
  -> renderer-world-layered-grass.js
     -> remove grass-patch rows from the snapshot passed to renderer-world.js
     -> build the legacy world without legacy grass
     -> generate a three-panel CanvasTexture alpha atlas
     -> build three crossed alpha-cutout planes
     -> instance them over every grass-patch descriptor
     -> attach the grass group to the base world group
  -> create ocean/foam/cloud/fog/post consumers
  -> run camera-rail-to-first-person scenario
  -> sample adaptive performance and submit the post pipeline
  -> expose aggregate live state through globalThis.CozyIsland
```

## Current finding

The new grass renderer is active, but its architectural identity is implicit.

- The public renderer facade silently redirects `createStylizedWorldRenderer()` from `renderer-world.js` to `renderer-world-layered-grass.js`.
- The 50-kit source catalog still declares only the generic `webgpu-stylized-material-renderer-kit`; it does not identify layered grass as a distinct adapter or capability.
- The wrapper strips `grass-patch` rows from a shallow snapshot copy, then consumes the original rows itself. There is no result proving one-and-only-one grass consumer.
- Atlas texture, geometry, material, and instance mesh are created inside the renderer and have no explicit disposal contract.
- The returned world renderer exposes only `group` and `update()`. It has no grass snapshot, policy readback, resource counts, or `dispose()` method.
- Grass `update()` is empty. The renderer is unlit and static even though placement rows carry phase data and the world snapshot includes vegetation-wind descriptors.
- No test imports or exercises the layered grass path, because the current Node suite validates descriptors and source tokens rather than browser renderer behavior.

## Read this pass first

```txt
.agent/trackers/2026-07-10T17-38-35-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T17-38-35-04-00.md
.agent/architecture-audit/2026-07-10T17-38-35-04-00-layered-grass-renderer-authority-dsk-map.md
.agent/render-audit/2026-07-10T17-38-35-04-00-layered-grass-substitution-lifecycle-gap.md
.agent/grass-system-audit/2026-07-10T17-38-35-04-00-alpha-cutout-grass-consumption-contract.md
.agent/interaction-audit/2026-07-10T17-38-35-04-00-camera-grass-consumption-map.md
.agent/gameplay-audit/2026-07-10T17-38-35-04-00-scenario-presentation-separation-loop.md
.agent/deploy-audit/2026-07-10T17-38-35-04-00-layered-grass-contract-fixture-gate.md
```

## Do not start next with

- more grass visual tuning, extra atlas layers, denser placement, or wind animation
- cloud, fog, ocean, terrain, camera, or lighting retuning
- renderer replacement
- new island content
- route-token churn
- screenshot automation

## Start next with

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```

## Required implementation shape

- Give the layered grass renderer an explicit kit/capability identity without inflating the catalog accidentally.
- Separate pure grass policy/geometry/atlas descriptors from DOM and Three.js resource creation.
- Define one authoritative grass-consumption result proving source count, consumed count, suppressed legacy count, and rendered instance count.
- Define explicit ownership and `dispose()` behavior for atlas texture, geometry, material, mesh, and wrapper resources.
- Expose JSON-safe grass policy and resource readback through an additive host surface.
- State whether wind, LOD, adaptive quality, shadows, and tone mapping are intentionally unsupported or delegated.
- Add a DOM-free fixture for descriptor determinism and a browser integration smoke for resource creation/disposal.
- Preserve the current three-layer unlit alpha-cutout visual output while making its boundary inspectable.

## Validation state

Documentation-only refresh. Runtime source changed before this pass in commits `3d3a9b0` and `0fd5a50`; this pass changed no runtime files. No branch or pull request was created. Existing tests and the missing layered-grass fixtures were not run.