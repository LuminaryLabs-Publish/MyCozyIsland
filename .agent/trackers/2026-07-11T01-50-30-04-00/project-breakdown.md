# Project Breakdown: MyCozyIsland Dynamic Environment Frame Authority

Timestamp: `2026-07-11T01-50-30-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch policy: `main` only

## Plan ledger

**Goal:** audit one eligible Publish repository, preserve the complete interaction/domain/service/kit map, and identify the next missing authority contract without changing runtime behavior.

- [x] List the full accessible `LuminaryLabs-Publish` inventory.
- [x] Compare all eligible repositories against `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only the oldest eligible repository.
- [x] Confirm root `.agent` state exists.
- [x] Read the latest central ledger and repo-local audit state.
- [x] Read `README.md`, `package.json`, route composition, environment, atmosphere, sequence, render descriptor, renderer, catalog, and test sources.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all current kit services.
- [x] Reconfirm all 50 source-backed kits.
- [x] Add a new DSK/domain authority map.
- [x] Add render, gameplay, interaction, environment-state, and deploy audits.
- [x] Refresh required root `.agent` files.
- [x] Push only documentation to `main`.
- [x] Create no branch or pull request.

## Selection comparison

```txt
MyCozyIsland      2026-07-11T00-10-28-04-00
AetherVale        2026-07-11T00-18-24-04-00
IntoTheMeadow     2026-07-11T00-30-48-04-00
PrehistoricRush   2026-07-11T00-39-25-04-00
TheOpenAbove      2026-07-11T00-49-45-04-00
HorrorCorridor    2026-07-11T01-10-28-04-00
PhantomCommand    2026-07-11T01-20-51-04-00
ZombieOrchard     2026-07-11T01-31-15-04-00
TheUnmappedHouse  2026-07-11T01-38-28-04-00
```

All nine eligible repositories were tracked and had root `.agent` state. `MyCozyIsland` was therefore selected under the oldest documented-selection rule.

## Product read

`MyCozyIsland` is a static WebGPU-first scenic exploration route with a deterministic 50-kit semantic composition and Three/WebGPU presentation. Its current experience is an aerial scroll reveal followed by bounded first-person exploration of a central clearing.

## Interaction loop

```txt
route load
  -> kit validation
  -> backend and quality selection
  -> deterministic world/environment composition
  -> immutable render snapshot
  -> renderer/resource construction
  -> input registration
  -> animation loop
  -> scenario clock/camera tick
  -> static snapshot + current clock/camera projection
  -> world/foam elapsed-time updates
  -> adaptive performance sample
  -> post render
  -> debug/host state projection
```

## Domain groups

```txt
platform/host/render adapters
authored camera/scenario sequence
determinism and environment time
weather, wind, illumination, aerial perspective
terrain, biome, shoreline, contact, LOD
ocean floor, waves, optics, underwater, caustics, glitter, foam
vegetation, grass, rocks, props, campfire
cloud and fog atmosphere
materials, archetypes, quality, render snapshot
missing lifecycle, reset, environment-frame, consumer, and quality authority
```

## Services

The 50 kits provide deterministic composition, clock and environment sampling, world and atmosphere descriptors, render snapshot composition, GPU/CPU volume generation, WebGPU/WebGL2 rendering, camera/scenario input, adaptive performance, and diagnostics.

## New finding

The clock, wind, and illumination services are live, but the route samples their downstream descriptors only during startup. Later scenario frames update `clock` and `camera` while retaining startup illumination, vegetation wind, campfire wind, cloud weather, cloud lighting, cloud shadow drift, and fog advection.

No shared environment frame identifies which semantic state each renderer consumed. Generic shader time creates visible motion, but it does not prove that the declared domain dependencies remain current or synchronized.

## Next safe ledge

```txt
MyCozyIsland Dynamic Environment Frame Authority
+ Clock/Wind/Illumination Consumer Coherence Fixture Gate
```

This remains behind route lifecycle and camera baseline/reset authority, and ahead of adaptive-quality transaction work.
