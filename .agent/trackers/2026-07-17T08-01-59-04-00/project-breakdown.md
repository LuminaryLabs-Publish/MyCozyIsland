# MyCozyIsland Breakdown — Page Lifecycle Runtime Suspension and Retirement

**Timestamp:** `2026-07-17T08-01-59-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous repo-local documentation head:** `9f2543ed2d6aa346ce5339a3eb215ba1c452dbd0`  
**Selection class:** oldest documented-selection rule

## Selection

The accessible `LuminaryLabs-Publish` inventory contains 11 repositories:

`AetherVale`, `HorrorCorridor`, `IntoTheMeadow`, `MyCozyIsland`, `PhantomCommand`, `PrehistoricRush`, `TheCavalryOfRome`, `TheLongHaul`, `TheOpenAbove`, `TheUnmappedHouse`, and `ZombieOrchard`.

`LuminaryLabs-Publish/TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger entries, root `.agent` state and `main` heads matching their documented repo-local heads. No eligible repository was new, ledger-missing, root-agent-missing, undocumented or runtime-ahead. MyCozyIsland had the oldest synchronized central timestamp.

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
undocumented: 0
runtime-ahead requiring reconciliation: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized eligible repository
selected prior timestamp: 2026-07-17T03-06-12-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-17T03-44-31-04-00
reviewed runtime revision: 347c78f358994822f9fedf91c3e16d33d6909e7e
previous repo-local documentation head: 9f2543ed2d6aa346ce5339a3eb215ba1c452dbd0
```

## Interaction loop

```txt
root route
  -> redirect to menu.html
  -> initialize particle-first WebGPU/WebGL2 menu
  -> preload game.html in a same-origin iframe
  -> freeze prepared simulation and presentation at playable readiness
  -> enable Play
  -> resume game, focus canvas and dispose menu renderer

game startup
  -> initialize WebGPURenderer with WebGL2 fallback
  -> install Core Startup, Object, Transaction Ledger and adventure domains
  -> restore checksum save when present
  -> create island, gameplay, ocean, foam, cloud, fog and post resources
  -> install browser input and resize listeners
  -> enter renderer animation loop
  -> publish first playable frame

gameplay frame
  -> normalize and admit input
  -> tick scenario, player, Agriculture, Foraging and interaction
  -> project camera, lighting, world, gameplay and HUD state
  -> sample performance budget
  -> render fused world/water, atmosphere, foam-depth, foam and output passes
  -> autosave changed state every five simulated seconds

page lifecycle today
  -> pagehide calls storeSave(adventure)
  -> pagehide disposes gameplayRenderer only
  -> renderer animation loop, engine, listeners and remaining resources stay owned
  -> event.persisted is not classified
  -> no pageshow resume admission or frame-clock rebase exists
```

## Domains in use

- Repository identity, central selection, audit routing and validation governance.
- Static route, same-origin iframe preload, message handoff, history, focus and entry.
- Core Startup, Object and Transaction Ledger.
- Seeded island world, terrain, biome, shoreline, plots, forage nodes and static render descriptors.
- Input, inventory, Agriculture, Foraging, player, scenario, interaction, camera, saves and render snapshots.
- Environment clock, deterministic seed, weather, wind, illumination and aerial perspective.
- Vegetation, grass, rocks, props, ground contact and terrain/vegetation LOD.
- Ocean floor, waves, optics, caustics, glitter, shoreline foam and underwater atmosphere.
- Cloud density, lighting, LOD, weather, shadows, horizon bands, fog density, advection and placement.
- WebGPU/WebGL2 renderer, compute textures, world/gameplay objects, ocean, foam, fog, clouds and post-processing.
- Performance budget, debug projection, render-layer graph and physical pass ordering.
- Browser input, resize, page lifecycle, global error capture and public host publication.
- Runtime suspension, terminal retirement, BFCache resume, clock rebase and exact-frame proof.
- Source, browser, artifact and Pages deployment evidence.

## Implemented kits and offered services

### Engine-installed core and adventure kits — 14

- `core-startup-kit` (`n:core-startup`): launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load, reset.
- `core-object-kit` (`n:core-object`): object registration, lookup, listing.
- `core-transaction-ledger-kit` (`n:core-transaction-ledger`): ledger identity, idempotency, record, apply-once settlement, snapshot, reset.
- `cozy-world-domain-kit` (`n:cozy-world`): seeded world, surface query, plot layout, forage layout, render base, snapshot, reset.
- `cozy-input-domain-kit` (`n:cozy-input`): normalization, command queue, frame admission, held actions, clear, snapshot, reset.
- `cozy-inventory-domain-kit` (`n:cozy-inventory`): items, seed selection, transactions, batch settlement, snapshot, reset.
- `agriculture-domain-kit` (`n:production:agriculture`): land, soil, cultivation, watering, growth, harvest, perennials, descriptors, events, snapshot, reset.
- `cozy-foraging-domain-kit` (`n:cozy-foraging`): wild coconut nodes, collection, respawn, snapshot, reset.
- `cozy-player-domain-kit` (`n:cozy-player`): movement, grounding, view, stamina, snapshot, reset.
- `cozy-scenario-domain-kit` (`n:cozy-scenario`): time, objective, snapshot, reset.
- `cozy-interaction-domain-kit` (`n:cozy-interaction`): targeting, context action, Agriculture settlement, wild-forage action, prompt, result, snapshot, reset.
- `cozy-camera-domain-kit` (`n:cozy-camera`): aerial introduction, first-person view, terrain clearance, camera descriptors.
- `cozy-save-domain-kit` (`n:cozy-save`): capture, checksum validation, migration, restore, rollback, reset, fingerprint, diagnostics.
- `cozy-render-snapshot-domain-kit` (`n:cozy-render-snapshot`): static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor.

### Cataloged world, render and host kits — 50

`debug-overlay-host-kit`, `webgl2-fallback-renderer-kit`, `webgpu-compute-atmosphere-renderer-kit`, `webgpu-foam-renderer-kit`, `webgpu-ocean-renderer-kit`, `webgpu-performance-budget-kit`, `webgpu-post-processing-renderer-kit`, `webgpu-rolling-fog-renderer-kit`, `webgpu-stylized-material-renderer-kit`, `webgpu-volumetric-cloud-renderer-kit`, `camera-rail-sequence-kit`, `cozy-island-scenario-kit`, `terrain-surface-domain-kit`, `vegetation-placement-domain-kit`, `aerial-perspective-domain-kit`, `campfire-atmosphere-domain-kit`, `cloud-density-field-domain-kit`, `cloud-horizon-band-domain-kit`, `cloud-lighting-domain-kit`, `cloud-lod-domain-kit`, `cloud-shadow-domain-kit`, `cloud-weather-domain-kit`, `fog-advection-domain-kit`, `fog-field-domain-kit`, `fog-volume-placement-domain-kit`, `ground-contact-domain-kit`, `illumination-domain-kit`, `ocean-caustics-domain-kit`, `ocean-floor-profile-domain-kit`, `ocean-optics-domain-kit`, `ocean-wave-domain-kit`, `prop-archetype-domain-kit`, `render-archetype-domain-kit`, `render-quality-domain-kit`, `render-snapshot-domain-kit`, `rock-archetype-domain-kit`, `shoreline-field-domain-kit`, `shoreline-foam-domain-kit`, `stylized-material-descriptor-domain-kit`, `sun-glitter-domain-kit`, `terrain-biome-field-domain-kit`, `terrain-lod-domain-kit`, `underwater-atmosphere-domain-kit`, `vegetation-archetype-domain-kit`, `vegetation-lod-domain-kit`, `vegetation-wind-domain-kit`, `weather-state-domain-kit`, `wind-field-domain-kit`, `deterministic-seed-domain-kit`, `environment-clock-domain-kit`.

Together these provide renderer fallback, compute atmosphere, ocean and foam presentation, post-processing, performance policy, terrain and vegetation queries, cloud/fog/weather fields, illumination, ocean/shoreline optics, archetype descriptors, deterministic seeds, environment time and host diagnostics.

### Additional composition kit — 1

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth-blend contracts.

### Explicit menu domain and kit registry — 16

- `n:entry:menu:scene`: scene state and entry transition.
- `n:entry:menu:composition`: rule-of-thirds composition and negative space.
- `n:entry:menu:camera`: camera descriptor and responsive framing.
- `n:entry:menu:hero-palm`: hero-palm descriptor.
- `n:entry:menu:palm-material`: bark and alpha-cut frond shading.
- `n:entry:menu:palm-motion`: trunk and batched-frond wind deformation.
- `n:entry:menu:sky`: sunset gradient, sun disc and glow.
- `n:entry:menu:shoreline`: curved distant shoreline.
- `n:entry:menu:water`: opaque wave strip, depth write and foam edge.
- `n:entry:menu:flowers`: atlas-backed flower batch.
- `n:entry:menu:particles`: wind motes, water sparkles, petals and combined batching.
- `n:entry:menu:lighting`: hemisphere, key, fill, rim and static contact shadow.
- `n:entry:menu:atmosphere`: horizon haze, fog and depth separation.
- `n:entry:menu:post-effects`: ACES exposure and direct final output.
- `n:entry:menu:play-gate`: progress, ready state and entry request.
- `n:entry:menu:game-preload`: background preparation, simulation/presentation freeze, resume and handoff.

### Browser and product adapters — 4

- `browser-startup-presentation-adapter`: descriptor DOM projection, failure projection, timeout helper and render updates.
- `cozy-startup-host`: preparation ordering, engine reuse, continuation mapping, global error capture and disposal.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, Play gate, entry, crossfade, history, focus and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze/resume, entry preparation and acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned lifecycle surfaces:            19
```

## Main finding

The active gameplay host registers the renderer loop and anonymous wheel, pointer, keyboard, blur, visibility and resize listeners. It also creates and owns the island scene, sky textures, environment map, world renderer, gameplay renderer, atmosphere volume textures, cloud renderer, fog renderer, ocean renderer, foam renderer, post pipeline, startup host and public `globalThis.CozyIsland`.

The only page-retirement path is:

```txt
pagehide
  -> storeSave(adventure)
  -> gameplayRenderer.dispose()
```

That path does not inspect `event.persisted`. It does not stop the animation loop, clear input, remove listeners, dispose the startup host, retire the scene/GPU/post/volume resources, clear the public host or publish a suspension/retirement result.

The gameplay renderer disposal is destructive: it disposes geometries and materials and clears farm/forage/crop maps. If the document enters BFCache, a later persisted `pageshow` can resume the same outer runtime generation with this child presentation already disposed. There is no retained-resource validation, loop restoration policy, frame-clock rebase or `FirstResumedFrameAck`.

The menu renderer provides a useful local precedent: its `dispose()` stops the loop, removes resize, disposes geometries/materials/atlases and disposes the renderer. The gameplay host has not composed the equivalent ownership boundary.

This is a source-backed lifecycle and resource-convergence gap. No BFCache failure, browser crash, stale input incident or memory leak was reproduced.

## Required authority

`cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

```txt
PageLifecycleAdmissionCommand
  -> bind HostSessionId, RuntimeGeneration, RendererGeneration,
     SaveGeneration and LifecycleTransitionId
  -> classify hidden, pagehide-persisted, pagehide-terminal
     or pageshow-persisted
  -> publish PageLifecycleAdmissionResult

RuntimeSuspensionCommand
  -> stop the accepted renderer loop
  -> clear held input and pointer drag
  -> retain only declared BFCache-safe resources
  -> publish RuntimeSuspensionResult

RuntimeRetirementCommand
  -> reject stale callbacks
  -> settle the terminal save result
  -> remove listener leases
  -> dispose scene, renderer, volume, post and startup resources once
  -> clear public host publication
  -> publish RuntimeRetirementResult

RuntimeResumeCommand
  -> validate retained generations and resources
  -> rebase frame and simulation clocks
  -> restore listeners and renderer loop
  -> publish RuntimeResumeResult
  -> publish FirstResumedFrameAck
```

### Proposed coordinating surfaces — 19

`page-lifecycle-event-admission-kit`, `host-session-identity-kit`, `runtime-generation-identity-kit`, `lifecycle-persisted-classifier-kit`, `runtime-suspension-result-kit`, `renderer-loop-suspension-kit`, `held-input-retirement-kit`, `frame-clock-rebase-kit`, `runtime-retirement-result-kit`, `listener-lease-retirement-kit`, `scene-resource-retirement-kit`, `gpu-renderer-retirement-kit`, `volume-texture-retirement-kit`, `post-pipeline-retirement-kit`, `startup-host-retirement-kit`, `stale-callback-rejection-kit`, `global-host-publication-retirement-kit`, `first-resumed-frame-ack-kit`, `bfcache-browser-artifact-pages-fixture-kit`.

## Required output added in this run

- `.agent/turn-ledger/2026-07-17T08-01-59-04-00.md`
- `.agent/architecture-audit/2026-07-17T08-01-59-04-00-page-lifecycle-retirement-dsk-map.md`
- `.agent/render-audit/2026-07-17T08-01-59-04-00-bfcache-disposed-child-resume-gap.md`
- `.agent/gameplay-audit/2026-07-17T08-01-59-04-00-pagehide-resume-gameplay-loop.md`
- `.agent/interaction-audit/2026-07-17T08-01-59-04-00-page-lifecycle-command-result-map.md`
- `.agent/runtime-lifecycle-audit/2026-07-17T08-01-59-04-00-suspension-retirement-resume-contract.md`
- `.agent/deploy-audit/2026-07-17T08-01-59-04-00-bfcache-browser-fixture-gate.md`
- `.agent/central-sync-audit/2026-07-17T08-01-59-04-00-oldest-selection-lifecycle-reconciliation.md`

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, save behavior, gameplay, simulation, input, renderer disposal, tests, workflows and deployment are unchanged. Relevant source files were inspected through the GitHub connector. `npm test`, BFCache fixtures, terminal-retirement fixtures, resource-count observations, artifact smoke and Pages smoke were not run.
