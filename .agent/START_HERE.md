# START HERE: MyCozyIsland

Last aligned: `2026-07-11T02-02-59-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: preserve the new terrain-relative clearing while making its plateau, transition, biome, placement, and render-consumption contract observable and fixture-backed.

## Plan ledger

**Goal:** document the complete 50-kit route after the clearing-height change and define one terrain-layer authority boundary before further world-layer tuning.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only `MyCozyIsland` because its central ledger was stale and runtime terrain changed after the last central review.
- [x] Re-read route composition, terrain, biome, ground contact, vegetation, props, campfire, world rendering, and tests.
- [x] Reconfirm the interaction loop, domains, services, and all 50 implemented kits.
- [x] Add timestamped architecture, render, gameplay, interaction, terrain-system, and deployment audits.
- [x] Refresh all required root `.agent` files.
- [x] Change no runtime source, dependencies, route behavior, or deployment configuration.
- [x] Create no branch or pull request.

## Selection result

The accessible Publish inventory contains ten repositories. `TheCavalryOfRome` remains excluded.

`MyCozyIsland` was selected before the oldest-documented fallback because the central ledger still reported `2026-07-11T00-10-28-04-00`, while repo-local documentation had advanced to `2026-07-11T01-50-30-04-00` and the runtime subsequently changed through:

```txt
ff7bca6 Replace central bowl with terrain-relative plateau
c771480 Add deterministic clearing plateau tests
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate exactly 50 DomainServiceKit descriptors
  -> initialize WebGPU or WebGL2 renderer and startup quality
  -> compose deterministic seed, clock, weather, terrain, biome, placement, ocean, atmosphere, and render snapshots
  -> create scenario, camera rail, world, ocean, foam, cloud, fog, and post consumers
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> renderer.setAnimationLoop
  -> scenario.tick(dt) advances clock and camera
  -> world and foam update from elapsed time
  -> performance budget samples frame cadence
  -> debug and global host project aggregate state
```

## Newly documented terrain finding

The fixed `7.1`-meter clearing depression was correctly replaced with a terrain-relative plateau. The plateau height is now the average of twelve natural-terrain samples at `1.32 × clearingRadius`, with slight deterministic surface variation and a narrower blend.

The remaining gap is contract visibility and cross-layer proof:

```txt
natural terrain ring samples
  -> hidden clearingPlateauHeight scalar
  -> blended sampleHeight
  -> normals, slope, curvature, biome weights
  -> ground contact
  -> vegetation, rocks, fence, campfire, paths
  -> static render snapshot
  -> terrain mesh and instanced consumers
```

`clearingPlateauHeight`, sample-ring metadata, blend radii, variation budget, and a terrain revision/fingerprint are not exposed. The current test proves only deterministic inner-clearing flatness below `0.5 m`; it does not prove transition continuity, fence seating, campfire seating, biome continuity, placement stability, or renderer consumption.

The fence radius is `1.14 × clearingRadius`, while the plateau blend ends at `1.16 × clearingRadius`. The fence therefore sits almost exactly on the unproven transition edge.

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. Terrain Clearing Surface Authority
   + Edge/Seating/Layer-Coherence Fixture Gate

4. Dynamic Environment Frame Authority
   + Clock/Wind/Illumination Consumer Coherence Fixture Gate

5. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T02-02-59-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T02-02-59-04-00.md
.agent/architecture-audit/2026-07-11T02-02-59-04-00-terrain-clearing-layer-authority-dsk-map.md
.agent/render-audit/2026-07-11T02-02-59-04-00-plateau-biome-placement-render-consumption-gap.md
.agent/gameplay-audit/2026-07-11T02-02-59-04-00-clearing-ground-contact-exploration-loop.md
.agent/interaction-audit/2026-07-11T02-02-59-04-00-camera-player-reset-terrain-revision-map.md
.agent/terrain-system-audit/2026-07-11T02-02-59-04-00-plateau-edge-seating-layer-contract.md
.agent/deploy-audit/2026-07-11T02-02-59-04-00-terrain-layer-fixture-gate.md
```

## Do not start next with

- more terrain height or clearing-radius tuning
- new biome colors, textures, grass, rocks, props, or fence placement
- erosion or world-layer replacement before the current surface contract is observable
- cloud, fog, ocean, lighting, or camera retuning
- renderer replacement
- new quality tiers
- new island content
- more GPU allocation before lifecycle ownership
