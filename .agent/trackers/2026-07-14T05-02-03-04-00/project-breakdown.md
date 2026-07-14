# Project breakdown: MyCozyIsland shell startup fault isolation

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`  
**Reviewed repository head:** `b7edce0ac6c7fc7005be56f649141e31690e4eee`

## Summary

MyCozyIsland is a NexusEngine island-adventure runtime behind a WebGPU-first palm-tree menu. The game route has its own Core Startup host, WebGPU/WebGL2 renderer, world composition, agriculture, foraging, saves and first-frame admission, but the parent shell does not begin that route until the decorative menu renderer has fully initialized.

`startPreload()` is scheduled only at the end of successful menu `main()`. A Three.js module import failure, `WebGPURenderer.init()` rejection, palm construction error or render-pipeline failure therefore prevents the iframe from receiving `game.html?preload=1`. The catch path only disables the Play control. The primary game never gets an opportunity to prove that it can start.

## Plan ledger

**Goal:** keep the authored WebGPU menu while removing it as a single point of failure for the primary game route.

- [x] Enumerate all 11 accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Compare the ten eligible repositories with central ledger coverage.
- [x] Confirm all ten eligible repositories have root `.agent` state.
- [x] Compare each eligible repository head with its recorded documentation head.
- [x] Confirm no eligible repository is new, missing, undocumented or runtime-ahead.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland` by the oldest documented-selection rule.
- [x] Inspect the root redirect, menu shell, menu renderer, game route, preload bridge, game startup host and static smoke test.
- [x] Identify the complete interaction loop, domains, kits and offered services.
- [x] Preserve 65 source-backed DSK/kit surfaces and five browser/product adapters.
- [x] Define one shell-startup fault-isolation authority and its terminal results.
- [x] Change documentation only.
- [ ] Implement independent game-preload launch and degraded-menu entry.
- [ ] Add executable module-import, renderer-init, pipeline and Pages failure fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest eligible documented repository
```

```txt
2026-07-13T23-58-48-04-00  MyCozyIsland        selected
2026-07-14T00-38-19-04-00  ZombieOrchard
2026-07-14T01-00-28-04-00  TheUnmappedHouse
2026-07-14T01-39-09-04-00  TheOpenAbove
2026-07-14T01-59-05-04-00  AetherVale
2026-07-14T02-40-58-04-00  TheLongHaul
2026-07-14T02-58-28-04-00  PhantomCommand
2026-07-14T03-39-56-04-00  PrehistoricRush
2026-07-14T04-00-15-04-00  IntoTheMeadow
2026-07-14T04-38-29-04-00  HorrorCorridor
```

Every current repository head matched its recorded repo-local documentation head before this write.

## Complete interaction loop

### Successful shell path

```txt
index.html
  -> redirect to menu.html
  -> browser resolves Three.js WebGPU and TSL imports
  -> menu main constructs WebGPURenderer
  -> await renderer.init()
  -> construct sky, palm, lights, compute wind and RenderPipeline
  -> install menu resize and animation loop
  -> publish CozyMenu
  -> schedule startPreload from requestAnimationFrame/idle callback
  -> assign iframe.src = game.html?preload=1
  -> game route resolves Three.js, NexusEngine and Agriculture providers
  -> Core Startup prepares renderer, composition, save, world and input
  -> game renders first frame and becomes playable
  -> preload bridge freezes simulation and presentation
  -> ready message enables Play
  -> Play resumes game and begins crossfade
```

### Current menu-failure path

```txt
module import, renderer init, scene or pipeline failure
  -> menu main rejects, or module body never evaluates
  -> reportFailure may disable Play when the body did evaluate
  -> startPreload is never scheduled
  -> iframe remains without src
  -> game Core Startup never runs
  -> no retry, direct-game entry or degraded-menu result exists
```

### Primary capability boundary

```txt
menu presentation = optional authored shell capability
game route = primary playable capability

current dependency:
menu presentation success -> game preload admission

target dependency:
shell bootstrap -> menu presentation attempt
                -> game preload attempt
                -> independent typed results
```

## Domains in use

```txt
root-route redirection
browser document, module and page lifecycle
CDN import-map provider resolution
menu shell and accessible Play gate
menu WebGPU/WebGL2 backend admission
TSL material, procedural palm and compute-wind presentation
menu bloom, lighting, tone mapping, resize and animation loop
iframe creation, preload, route history and focus transfer
same-origin parent/child messaging
Core Startup preparation, failure, continuation and first-frame admission
NexusEngine object and transaction services
world, input, inventory, agriculture, foraging and interaction
player movement, camera, scenario and save state
renderer-neutral world and HUD snapshots
game WebGPU/WebGL2 world, atmosphere, ocean and post-processing
adaptive render quality
simulation and presentation sleep/resume
shell startup fault classification
primary-game capability policy
degraded-menu fallback and retry
first fallback-game-frame evidence
source checks, browser fixtures, build, Pages and central tracking
```

## Implemented kit and service inventory

### Engine-installed kits: 14

| Kit | Domain | Offered services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation registration, waiting, working, ready, failure, retry/fallback descriptor, continuation selection, first-frame admission, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot layout, forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, command queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | wild-coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, contextual action, agriculture settlement, forage action, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor |

### Cataloged world, render and host kits: 50

| Kit | Offered services |
|---|---|
| `debug-overlay-host-kit` | draw, toggle, show, hide |
| `webgl2-fallback-renderer-kit` | fallback capability policy, CPU volume source, feature-disable policy |
| `webgpu-compute-atmosphere-renderer-kit` | cloud/fog volume generation, CPU fallback |
| `webgpu-foam-renderer-kit` | shoreline foam geometry, animation, render-layer contract |
| `webgpu-ocean-renderer-kit` | ocean geometry, wave deformation, optics, water-layer contract |
| `webgpu-performance-budget-kit` | frame sampling, moving average, FPS state, degrade/recover callbacks |
| `webgpu-post-processing-renderer-kit` | scene, fog and foam passes, depth mask, resolution scaling, pass-order readback |
| `webgpu-rolling-fog-renderer-kit` | fog volume, material, step scaling, readback |
| `webgpu-stylized-material-renderer-kit` | material descriptors and construction |
| `webgpu-volumetric-cloud-renderer-kit` | cloud volumes, raymarch materials, step scaling, readback |
| `camera-rail-sequence-kit` | rail progression, camera-sequence descriptors; retained inactive |
| `cozy-island-scenario-kit` | scenario and sequence descriptors; retained inactive |
| `terrain-surface-domain-kit` | height, normal, material and surface queries |
| `vegetation-placement-domain-kit` | deterministic placement graph |
| `aerial-perspective-domain-kit` | horizon, distance and atmosphere descriptors |
| `campfire-atmosphere-domain-kit` | campfire light, smoke and heat descriptors |
| `cloud-density-field-domain-kit` | density recipe, texture budget |
| `cloud-horizon-band-domain-kit` | horizon placement descriptors |
| `cloud-lighting-domain-kit` | color, shadow and silver lining |
| `cloud-lod-domain-kit` | step and volume-count policy |
| `cloud-shadow-domain-kit` | shadow projection descriptors |
| `cloud-weather-domain-kit` | coverage and weather state |
| `fog-advection-domain-kit` | direction and speed |
| `fog-field-domain-kit` | density recipe and texture budget |
| `fog-volume-placement-domain-kit` | bounds and readability mask |
| `ground-contact-domain-kit` | terrain contact and clearance query |
| `illumination-domain-kit` | sun, sky, ambient and exposure state |
| `ocean-caustics-domain-kit` | caustic projection descriptors |
| `ocean-floor-profile-domain-kit` | seafloor shape and depth profile |
| `ocean-optics-domain-kit` | color, opacity, transmission, absorption and reflection |
| `ocean-wave-domain-kit` | deterministic wave components and sea level |
| `prop-archetype-domain-kit` | prop geometry and material archetypes |
| `render-archetype-domain-kit` | renderer-neutral object archetypes |
| `render-quality-domain-kit` | static tier selection and quality budgets |
| `render-snapshot-domain-kit` | renderer-neutral world snapshot |
| `rock-archetype-domain-kit` | rock placement and presentation archetypes |
| `shoreline-field-domain-kit` | shoreline classification and distance field |
| `shoreline-foam-domain-kit` | foam-band descriptors |
| `stylized-material-descriptor-domain-kit` | color, roughness, rim and outline |
| `sun-glitter-domain-kit` | water-highlight descriptors |
| `terrain-biome-field-domain-kit` | deterministic biome classification |
| `terrain-lod-domain-kit` | terrain-resolution and distance policy |
| `underwater-atmosphere-domain-kit` | underwater color and attenuation |
| `vegetation-archetype-domain-kit` | tree, palm, fern, bush and grass archetypes |
| `vegetation-lod-domain-kit` | density and distance policy |
| `vegetation-wind-domain-kit` | wind-deformation descriptor |
| `weather-state-domain-kit` | weather state and transitions |
| `wind-field-domain-kit` | deterministic direction and strength |
| `deterministic-seed-domain-kit` | seed derivation and deterministic random |
| `environment-clock-domain-kit` | elapsed time and environmental phase |

### Additional composition kit: 1

| Kit | Offered services |
|---|---|
| `cozy-ocean-composition-kit` | logical render-layer graph, pass-order validation, transparent-depth validation, terrain handoff validation, per-layer depth/blend contracts |

### Browser/product adapters: 5

| Adapter | Offered services |
|---|---|
| `browser-startup-presentation-adapter` | descriptor DOM projection, failure projection, timeout helper, render-update bridge |
| `cozy-startup-host` | product preparation order, copy, engine reuse, continuation mapping, pre-playable global error capture, host disposal |
| `cozy-menu-scene-adapter` | Three.js WebGPU import, backend admission, TSL materials, procedural palm, compute wind, pipeline, bloom, tone mapping, shadows, resize, loop, readback, delayed retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, Play gate, entry request, crossfade, history, focus, fallback reveal, error display |
| `cozy-game-preload-bridge-adapter` | startup polling, parent messaging, simulation freeze/resume, presentation sleep/resume, player preparation, entry acknowledgement |

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
```

## Source-backed findings

```txt
iframe src in menu HTML: absent
only iframe src assignment: startPreload()
startPreload scheduling point: end of successful menu main()
menu provider import failure handler: absent
menu renderer initialization timeout: absent
menu renderer failure classification: generic reportFailure
reportFailure effect: disable Play and show Could Not Start
reportFailure starts game preload: no
menu retry command: absent
direct game fallback control: absent
independent game-preload attempt: absent
game route startup timeout: present through Core Startup host
game renderer backend result: webgpu or webgl2
game startup failure projection: present
first game frame admission: present within game route
menu-failure/game-success fixture: absent
```

## Required parent domain

```txt
cozy-island-shell-startup-fault-isolation-authority-domain
```

## Required transaction

```txt
ShellBootstrapCommand
  -> bind ShellGeneration, MenuAttemptId and GamePreloadAttemptId
  -> launch the game preload independently from menu renderer readiness
  -> prepare menu provider, backend, scene and pipeline as an optional participant
  -> publish MenuPresentationResult
  -> publish GamePreloadResult from Core Startup evidence
  -> classify menu failure as degraded when the primary game remains viable
  -> preserve shell-owned progress, Play, retry and direct-entry controls
  -> reject stale, duplicate or superseded attempt results
  -> admit entry only against the current playable game revision
  -> publish FirstFallbackGameFrameAck when entry succeeds without a menu surface
  -> publish one terminal ShellBootstrapResult
```

## Planned authority surfaces: 24

```txt
cozy-island-shell-startup-fault-isolation-authority-domain
shell-generation-kit
shell-bootstrap-command-kit
startup-attempt-correlation-kit
menu-presentation-attempt-kit
game-preload-attempt-kit
provider-import-admission-kit
renderer-initialization-result-kit
render-pipeline-preparation-result-kit
menu-failure-classification-kit
primary-game-capability-policy-kit
preload-launch-independence-kit
shell-progress-projection-kit
fallback-control-projection-kit
direct-game-entry-command-kit
menu-retry-command-kit
game-preload-retry-command-kit
menu-degraded-result-kit
game-preload-result-kit
shell-bootstrap-result-kit
first-fallback-game-frame-ack-kit
module-import-failure-fixture-kit
renderer-pipeline-failure-fixture-kit
browser-build-pages-startup-parity-kit
```

## Validation boundary

This run changes documentation only. The source was inspected, current repository heads were compared and the combined status list was empty. `npm test`, real browser fault injection, production build and Pages startup fallback were not executed.
