# Project Breakdown: MyCozyIsland Layered Grass Renderer Authority

Timestamp: 2026-07-10T17-38-35-04-00
Repository: LuminaryLabs-Publish/MyCozyIsland
Branch: main
Change type: documentation-only audit refresh

## Goal

Document the newly active layered alpha-cutout grass renderer, identify every domain/service/kit boundary it touches, and define the smallest safe proof-first implementation ledge before more visual work.

## Plan ledger

- [x] Compare the complete accessible LuminaryLabs-Publish inventory with the central ledger.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm all nine eligible repositories have central ledger and root `.agent` state.
- [x] Select only MyCozyIsland as the oldest eligible ledger entry.
- [x] Detect the later undocumented runtime grass-renderer commits.
- [x] Read the active route, renderer facade, layered grass adapter, catalog, tests, and prior audit state.
- [x] Identify the interaction loop.
- [x] Identify all domains in use.
- [x] Identify all services offered by kits.
- [x] Identify all declared and runtime-implied kits.
- [x] Add timestamped architecture, render, grass, interaction, gameplay, deploy, and turn-ledger records.
- [x] Refresh root `.agent` routing files and kit registry.
- [ ] Implement runtime changes; explicitly outside this documentation pass.
- [ ] Run new grass contract/lifecycle fixtures; they do not exist yet.

## Selection comparison

```txt
MyCozyIsland       selected / oldest ledger state 2026-07-10T16-08-56-04-00
                   recent undocumented runtime commits 2026-07-10T16:49:20-04:00 and 16:49:58-04:00
TheOpenAbove       tracked / latest central activity 2026-07-10T16:28:54-04:00
PrehistoricRush    tracked / latest central activity 2026-07-10T16:37:25-04:00
AetherVale         tracked / latest central activity 2026-07-10T16:48:42-04:00
IntoTheMeadow      tracked / latest central activity 2026-07-10T16:58:28-04:00
HorrorCorridor     tracked / latest central activity 2026-07-10T17:11:55-04:00
PhantomCommand     tracked / latest central activity 2026-07-10T17:19:17-04:00
ZombieOrchard      tracked / latest central activity 2026-07-10T17:27:07-04:00
TheUnmappedHouse   tracked / latest central activity 2026-07-10T17:35:42-04:00
TheCavalryOfRome   excluded by rule
```

## Product identity

MyCozyIsland is a static scenic exploration route. It composes a deterministic island snapshot, starts with an authored aerial camera rail, transitions into grounded first-person exploration, and renders the scene through Three/WebGPU with WebGL2 fallback behavior.

## Interaction loop

```txt
load index.html
  -> resolve Three/WebGPU import map
  -> load main-cloudform.js
  -> validate 50 DomainServiceKit manifests
  -> initialize WebGPURenderer
  -> choose quality from backend and host hints
  -> compose deterministic environment snapshot
  -> create camera rail and scenario
  -> create active stylized world renderer
     -> call layered grass wrapper
     -> suppress grass rows for base world renderer
     -> build base world
     -> generate grass alpha atlas
     -> build three-plane grass geometry
     -> instance one mesh over grass-patch rows
     -> attach grass to base world group
  -> create ocean, foam, cloud, fog, and post consumers
  -> consume wheel, pointer, keyboard, blur, resize, and debug-toggle input
  -> animation callback calculates frame interval
  -> scenario ticks clock and camera
  -> camera projects scenario render snapshot
  -> base world and foam update
  -> grass update remains no-op
  -> performance budget samples frame interval
  -> post pipeline submits the scene
  -> debug overlay and CozyIsland host expose aggregate state
```

## Domains in use

```txt
1. static route shell
2. import map and Three/WebGPU version pin
3. loader/error/hint/debug DOM host
4. DomainServiceKit definition and catalog validation
5. deterministic seed, hash, random stream, and noise
6. deterministic environment clock
7. wind field
8. weather state
9. illumination
10. aerial perspective
11. terrain surface and height sampling
12. terrain continuous fields
13. terrain biome blending
14. shoreline signed distance and breaker fields
15. terrain LOD
16. ground-contact placement
17. path network
18. ocean floor
19. ocean waves
20. ocean optics
21. shoreline foam
22. underwater atmosphere
23. ocean caustics
24. sun glitter
25. vegetation archetypes
26. vegetation placement graph
27. vegetation by-type grouping
28. vegetation wind descriptors
29. vegetation LOD
30. rock placement
31. prop placement
32. campfire atmosphere
33. grass-patch source rows
34. cloud weather
35. cloud density
36. cloud lighting
37. cloud LOD
38. cloud shadows
39. cloud horizon bands
40. fog density
41. fog advection
42. fog volume placement
43. stylized material descriptors
44. render archetypes
45. render quality selection
46. WebGL2 fallback policy
47. immutable render snapshot
48. camera rail input and sequence
49. first-person clearing movement
50. Cozy Island scenario
51. base stylized world renderer
52. layered grass source suppression
53. layered grass atlas generation
54. layered grass geometry generation
55. layered grass unlit alpha-cutout material
56. layered grass instancing and transform projection
57. sky and lighting composition
58. WebGPU ocean rendering
59. WebGPU foam rendering
60. atmosphere volume texture generation
61. volumetric cloud rendering
62. rolling fog rendering
63. WebGPU post pipeline
64. adaptive performance budget
65. inline quality actuation
66. animation loop
67. input and resize adapters
68. debug overlay
69. legacy CozyIsland diagnostics
70. static and deterministic Node validation
```

## Services offered by kits

```txt
catalog: define kit metadata, declare capabilities, declare dependencies, validate graph
seed: stable scoped randomness, stable IDs, hash/noise/FBM
clock: deterministic elapsed environment time
weather: preset weather intent and environment coupling
terrain: sample height, slope, curvature, moisture, exposure, coast, biome, and contact
shoreline: signed distance, wetness, breaker likelihood, coast normal
vegetation: define archetypes, generate placements, group by type, seat to ground, attach phase/tint/scale
rocks/props: deterministic world-object graphs
ocean: floor, waves, optics, foam, underwater haze, caustics, glitter
cloud/fog: density recipes, lighting, LOD, shadows, horizon, advection, placement
render description: materials, archetypes, quality, fallback, immutable snapshot
scenario: camera input, rail sequence, first-person movement, tick, reset, render snapshot
base world render: terrain, seabed, non-grass vegetation, rocks, props, paths, campfire
layered grass: suppress legacy grass, generate atlas, build crossed planes, project instance transforms/colors, attach group
ocean/foam render: TSL water and shoreline consumers
atmosphere render: compute/CPU volume textures, cloud raymarching, rolling fog
post: scene/depth/fog composition and final render
performance: frame-interval smoothing, hysteresis, degrade/recover callbacks
host: loader, errors, debug display, live object access, aggregate state
validation: static source/catalog assertions and deterministic domain composition
```

## Declared source-backed kits: 50

```txt
debug-overlay-host-kit
webgl2-fallback-renderer-kit
webgpu-compute-atmosphere-renderer-kit
webgpu-foam-renderer-kit
webgpu-ocean-renderer-kit
webgpu-performance-budget-kit
webgpu-post-processing-renderer-kit
webgpu-rolling-fog-renderer-kit
webgpu-stylized-material-renderer-kit
webgpu-volumetric-cloud-renderer-kit
camera-rail-sequence-kit
cozy-island-scenario-kit
terrain-surface-domain-kit
vegetation-placement-domain-kit
aerial-perspective-domain-kit
campfire-atmosphere-domain-kit
cloud-density-field-domain-kit
cloud-horizon-band-domain-kit
cloud-lighting-domain-kit
cloud-lod-domain-kit
cloud-shadow-domain-kit
cloud-weather-domain-kit
fog-advection-domain-kit
fog-field-domain-kit
fog-volume-placement-domain-kit
ground-contact-domain-kit
illumination-domain-kit
ocean-caustics-domain-kit
ocean-floor-profile-domain-kit
ocean-optics-domain-kit
ocean-wave-domain-kit
prop-archetype-domain-kit
render-archetype-domain-kit
render-quality-domain-kit
render-snapshot-domain-kit
rock-archetype-domain-kit
shoreline-field-domain-kit
shoreline-foam-domain-kit
stylized-material-descriptor-domain-kit
sun-glitter-domain-kit
terrain-biome-field-domain-kit
terrain-lod-domain-kit
underwater-atmosphere-domain-kit
vegetation-archetype-domain-kit
vegetation-lod-domain-kit
vegetation-wind-domain-kit
weather-state-domain-kit
wind-field-domain-kit
deterministic-seed-domain-kit
environment-clock-domain-kit
```

## Runtime-implied kits: 25

```txt
webgpu-static-shell-kit
webgpu-importmap-kit
webgpu-route-token-kit
webgpu-render-host-kit
webgpu-quality-selection-kit
webgpu-scene-composition-kit
sky-gradient-kit
lighting-composition-kit
world-render-consumer-kit
layered-alpha-grass-render-consumer-kit
grass-alpha-atlas-generator-kit
grass-render-substitution-adapter-kit
ocean-render-consumer-kit
foam-render-consumer-kit
atmosphere-texture-compute-kit
volumetric-cloud-consumer-kit
rolling-fog-consumer-kit
post-pipeline-consumer-kit
performance-budget-consumer-kit
input-consumer-kit
resize-consumer-kit
animation-loop-kit
legacy-CozyIsland-diagnostics-kit
node-static-check-kit
node-domain-smoke-kit
```

## Current grass renderer contract

```txt
source: snapshot.vegetation.byType["grass-patch"]
layer count: 3
atlas panels: 3 x 64 by 128
material: MeshBasicNodeMaterial
lighting: unlit
alpha clip: 0.52
alpha-to-coverage: enabled
depth test: enabled
depth write: enabled
blending: none / transparent false
shadows: disabled
fog: enabled
tone mapping: disabled
geometry: three crossed quad layers
rendering: one InstancedMesh
animation: no-op update
lifecycle: no dispose
readback: local mesh.userData only
catalog identity: implicit
```

## Main finding

The active grass renderer works as a visual substitution, but not yet as an auditable service boundary. It hides behind the old export name, is absent from the declared kit capability graph, couples pure policy to DOM/Three.js resource creation, has no typed consumption result, and has no resource disposal or JSON-safe host readback.

## Next safe ledge

```txt
MyCozyIsland Layered Grass Renderer Authority + Lifecycle Fixture Gate
```

## Validation status

```txt
runtime files changed by this pass: no
root documentation changed: yes
new timestamped audit records: yes
npm test: not run
browser smoke: not run
WebGPU validation: not run
branch created: no
pull request created: no
push target: main
```
