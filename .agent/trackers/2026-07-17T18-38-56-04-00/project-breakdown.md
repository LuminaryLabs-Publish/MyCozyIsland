# MyCozyIsland Breakdown — Device Input Action Coverage

**Timestamp:** `2026-07-17T18-38-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous repo-local documentation head:** `3cf8b764c861e922413df41b847c7bdd93dc60af`  
**Selection class:** oldest synchronized documented-selection rule

## Selection

The current `LuminaryLabs-Publish` inventory contains 11 repositories:

`AetherVale`, `HorrorCorridor`, `IntoTheMeadow`, `MyCozyIsland`, `PhantomCommand`, `PrehistoricRush`, `TheCavalryOfRome`, `TheLongHaul`, `TheOpenAbove`, `TheUnmappedHouse`, and `ZombieOrchard`.

`LuminaryLabs-Publish/TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger entries, root `.agent` state, and `main` heads matching their documented repo-local heads. No repository is new, ledger-missing, root-agent-missing, undocumented, or runtime-ahead. MyCozyIsland has the oldest synchronized central timestamp.

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
undocumented: 0
runtime-ahead: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized eligible repository
selected prior timestamp: 2026-07-17T08-01-59-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-17T08-45-46-04-00
```

## Interaction loop

```txt
root and menu
  -> redirect to menu.html
  -> prepare the game in a same-origin iframe
  -> enable Play after simulation and presentation readiness
  -> resume the game, focus #game, and dispose the menu renderer

desktop gameplay
  -> keyboard maps WASD to movement
  -> Shift maps to sprint
  -> E maps to contextual interaction
  -> Q and Digit1-Digit4 map to seed selection
  -> Space or Enter skips the intro
  -> pointer drag maps to camera look
  -> wheel advances the intro camera
  -> normalized input frame drives player, interaction, Agriculture, Foraging, camera, HUD, save, and rendering

touch-only gameplay today
  -> pointer drag can rotate the camera
  -> no implemented movement control
  -> no implemented sprint control
  -> no implemented interaction control
  -> no implemented seed-cycle or direct-selection control
  -> hotbar entries are non-interactive divs under a pointer-events:none HUD
  -> the compact-screen help surface is hidden
  -> the main gather/farm loop cannot be completed through touch controls alone
```

## Domains in use

- Repository identity, selection, central reconciliation, audit routing, and validation governance.
- Root redirect, menu scene, iframe preload, readiness handoff, focus, and route entry.
- Core Startup, Core Object, and Core Transaction Ledger.
- Seeded island world, terrain, biome, shoreline, plots, forage nodes, and static render descriptors.
- Input normalization, inventory, Agriculture, Foraging, player, scenario, interaction, camera, saves, and render snapshots.
- Environment clock, deterministic seed, weather, wind, illumination, and aerial perspective.
- Vegetation, grass, rocks, props, ground contact, and terrain/vegetation LOD.
- Ocean floor, waves, optics, caustics, glitter, shoreline foam, and underwater atmosphere.
- Cloud density, lighting, LOD, weather, shadows, horizon bands, fog density, advection, and placement.
- WebGPU/WebGL2 rendering, compute textures, world/gameplay objects, ocean, foam, fog, clouds, and post-processing.
- Browser keyboard, pointer, wheel, focus, visibility, resize, page lifecycle, and public host publication.
- Device-profile admission, semantic action mapping, touch control projection, source arbitration, held-action retirement, and exact-frame proof.
- Source, browser, artifact, and Pages evidence.

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
- `cozy-player-domain-kit` (`n:cozy-player`): movement, terrain grounding, view, stamina, snapshot, reset.
- `cozy-scenario-domain-kit` (`n:cozy-scenario`): time, objective, snapshot, reset.
- `cozy-interaction-domain-kit` (`n:cozy-interaction`): targeting, context action, Agriculture settlement, wild-forage action, prompt, result, snapshot, reset.
- `cozy-camera-domain-kit` (`n:cozy-camera`): aerial introduction, first-person view, terrain clearance, camera descriptors.
- `cozy-save-domain-kit` (`n:cozy-save`): capture, checksum validation, migration, restore, rollback, reset, fingerprint, diagnostics.
- `cozy-render-snapshot-domain-kit` (`n:cozy-render-snapshot`): static world, Agriculture descriptors, frame snapshot, HUD descriptor, debug descriptor.

### Cataloged world, render, and host kits — 50

- `debug-overlay-host-kit`: backend, quality, timing, volumetric-budget, and domain-count projection.
- `webgl2-fallback-renderer-kit`: deterministic CPU-volume and reduced-ray fallback policy.
- `webgpu-compute-atmosphere-renderer-kit`: reusable cloud/fog 3D texture computation.
- `webgpu-foam-renderer-kit`: shoreline contour, breakup, animation, and transparent-depth presentation.
- `webgpu-ocean-renderer-kit`: wave displacement, normals, Fresnel, optics, and sun-glitter presentation.
- `webgpu-performance-budget-kit`: sustained-frame sampling and volumetric/resolution/DPR degradation.
- `webgpu-post-processing-renderer-kit`: opaque scene, shared depth, reduced fog, denoising, and final output composition.
- `webgpu-rolling-fog-renderer-kit`: terrain-adjacent fog integration, noise, advection, depth clipping, and jitter.
- `webgpu-stylized-material-renderer-kit`: island, seabed, vegetation, rocks, props, paths, and campfire presentation.
- `webgpu-volumetric-cloud-renderer-kit`: bounded cloud raymarch, erosion, directional lighting, early exit, and horizon LOD.
- `camera-rail-sequence-kit`: deterministic aerial reveal and first-person transition.
- `cozy-island-scenario-kit`: environment composition and scenario render snapshots.
- `terrain-surface-domain-kit`: island height, slope, curvature, moisture, exposure, and coast fields.
- `vegetation-placement-domain-kit`: biome/slope/exclusion placement and deterministic spacing.
- `aerial-perspective-domain-kit`: distance haze, horizon blending, extinction tint, and exposure compensation.
- `campfire-atmosphere-domain-kit`: fire, local light, embers, and wind-reactive smoke descriptors.
- `cloud-density-field-domain-kit`: volume dimensions, lobe/noise structure, erosion, and thresholds.
- `cloud-horizon-band-domain-kit`: inexpensive distant cloud continuation.
- `cloud-lighting-domain-kit`: sunlit tops, cool undersides, silver lining, extinction, and ambient contribution.
- `cloud-lod-domain-kit`: volume size, ray steps, termination, horizon policy, and quality cadence.
- `cloud-shadow-domain-kit`: projected shadow scale, opacity, motion, and update cadence.
- `cloud-weather-domain-kit`: weather-to-cloud coverage, altitude, depth, drift, and evolution mapping.
- `fog-advection-domain-kit`: wind/clock-driven fog offsets, speeds, curl, and dissipation.
- `fog-field-domain-kit`: density, height falloff, shoreline concentration, terrain adherence, and quality sampling.
- `fog-volume-placement-domain-kit`: bounded lowland, shoreline, and ocean fog placement.
- `ground-contact-domain-kit`: terrain seating and slope/burial rejection.
- `illumination-domain-kit`: sun direction, sky colors, ambient intensity, and exposure.
- `ocean-caustics-domain-kit`: caustic frequency, intensity, attenuation, and quality thresholds.
- `ocean-floor-profile-domain-kit`: shelf, submerged mound, reef belt, and deep-ocean floor.
- `ocean-optics-domain-kit`: absorption, Fresnel, shallow color, refraction, roughness, and clearcoat.
- `ocean-wave-domain-kit`: multidirectional wave spectrum for displacement, normals, foam, and glitter.
- `prop-archetype-domain-kit`: fence, driftwood, path-marker, clearing, and campfire descriptors.
- `render-archetype-domain-kit`: semantic type to geometry, material, shadow, instance group, and layer mapping.
- `render-quality-domain-kit`: backend/memory/viewport/DPR/motion quality selection.
- `render-snapshot-domain-kit`: immutable terrain, ocean, vegetation, atmosphere, lighting, and material snapshots.
- `rock-archetype-domain-kit`: boulder, shore-rock, reef-rock, and submerged-rock descriptors.
- `shoreline-field-domain-kit`: signed shore distance, wetness, breaker likelihood, coast normal, and contact influence.
- `shoreline-foam-domain-kit`: breaker contours, contact foam, breakup, current advection, and decay.
- `stylized-material-descriptor-domain-kit`: palette, shadow tint, roughness, rim response, and outline classes.
- `sun-glitter-domain-kit`: view-dependent wave-normal glitter descriptor.
- `terrain-biome-field-domain-kit`: blended sand, wet sand, grass, soil, forest, moss, and rock weights.
- `terrain-lod-domain-kit`: terrain density, material detail, shadow, and culling budgets.
- `underwater-atmosphere-domain-kit`: haze, caustic attenuation, color shift, extinction, and camera thresholds.
- `vegetation-archetype-domain-kit`: broadleaf, palm, sapling, bush, fern, and grass silhouette metadata.
- `vegetation-lod-domain-kit`: near geometry, middle silhouettes, far impostor intent, and culling distances.
- `vegetation-wind-domain-kit`: bend frequency, gust response, root stiffness, and per-instance phase.
- `weather-state-domain-kit`: stable atmosphere, cloud, fog, and precipitation intent.
- `wind-field-domain-kit`: direction, gust envelope, and vertical turbulence.
- `deterministic-seed-domain-kit`: scoped random streams, stable identities, and reproducible hashes.
- `environment-clock-domain-kit`: deterministic environment time advancement from engine delta.

### Additional composition kit — 1

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff, and depth-blend contracts.

### Explicit menu domain and kit surfaces — 16

- `n:entry:menu:scene`: scene state and entry transition.
- `n:entry:menu:composition`: rule-of-thirds composition and negative space.
- `n:entry:menu:camera`: camera descriptor and responsive framing.
- `n:entry:menu:hero-palm`: hero-palm descriptor.
- `n:entry:menu:palm-material`: bark and alpha-cut frond shading.
- `n:entry:menu:palm-motion`: trunk and batched-frond wind deformation.
- `n:entry:menu:sky`: sunset gradient, sun disc, and glow.
- `n:entry:menu:shoreline`: curved distant shoreline.
- `n:entry:menu:water`: opaque wave strip, depth write, and foam edge.
- `n:entry:menu:flowers`: atlas-backed flower batch.
- `n:entry:menu:particles`: wind motes, water sparkles, petals, and combined batching.
- `n:entry:menu:lighting`: hemisphere, key, fill, rim, and static contact shadow.
- `n:entry:menu:atmosphere`: horizon haze, fog, and depth separation.
- `n:entry:menu:post-effects`: ACES exposure and direct final output.
- `n:entry:menu:play-gate`: progress, ready state, and entry request.
- `n:entry:menu:game-preload`: background preparation, simulation/presentation freeze, resume, and handoff.

### Browser and product adapters — 4

- `browser-startup-presentation-adapter`: descriptor DOM projection, failure projection, timeout helper, and render updates.
- `cozy-startup-host`: preparation ordering, engine reuse, continuation mapping, global error capture, and disposal.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, Play gate, entry, crossfade, history, focus, and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze/resume, entry preparation, and acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
proposed device-input surfaces:        20
```

## Source-backed finding

`game.html` is responsive and declares `touch-action:none`, but the gameplay surface contains no mobile control buttons or touch movement area. The hotbar is composed from non-button `div` elements and its parent HUD has `pointer-events:none`. The compact-screen media rule hides the only control legend.

`src/main-adventure.js` maps pointer input only to camera-look deltas and maps movement, sprint, interaction, seed selection, and intro skipping to keyboard codes. `cozy-input-domain-kit` admits only `key`, `pointer`, `wheel`, and `clear` command types, then derives semantic actions directly from keyboard codes. The domain smoke test exercises action coverage only through `enqueueKey()`.

This does not establish a desktop input failure or a reproduced mobile incident. It establishes that a touch-only device has no implemented command path for the core walk, farm, forage, sprint, or seed-selection loop, and that semantic actions are not owned independently of physical input sources.

## Proposed authority — not implemented

`cozy-island-device-input-action-coverage-semantic-command-authority-domain`

```txt
InputCapabilityManifestCommand
  -> bind DeviceProfileId, InputContextId, supported sources, required actions, and layout revision
  -> publish InputCapabilityManifestResult

SemanticActionAdmissionCommand
  -> accept source-neutral move, look, sprint, interact, cycle-seed, select-seed, and skip-intro actions
  -> preserve source identity without encoding gameplay meaning as key codes
  -> publish SemanticActionAdmissionResult

TouchControlProjectionCommand
  -> project reachable, labeled, safe-area-aware movement, interaction, sprint, and seed controls
  -> publish TouchControlProjectionResult

InputSourceSettlementCommand
  -> arbitrate keyboard, pointer, touch, and mixed-source ownership
  -> retire held actions on capture loss, blur, visibility, route change, suspension, and control removal
  -> publish InputSourceSettlementResult

SemanticInputFrameCommitCommand
  -> publish InputFrameDigest
  -> publish FirstInputActionBoundFrameAck
```

### Proposed coordinating surfaces — 20

`device-profile-admission-kit`, `input-capability-manifest-kit`, `semantic-action-command-kit`, `semantic-action-result-kit`, `action-source-identity-kit`, `keyboard-action-adapter-kit`, `touch-movement-stick-kit`, `touch-look-gesture-kit`, `touch-interact-control-kit`, `touch-sprint-control-kit`, `touch-seed-selection-control-kit`, `mobile-control-layout-kit`, `accessible-control-projection-kit`, `input-source-priority-kit`, `pointer-capture-settlement-kit`, `held-action-release-kit`, `focus-context-admission-kit`, `input-frame-digest-kit`, `first-input-action-bound-frame-ack-kit`, `touch-browser-artifact-pages-fixture-kit`.

## Required output added in this run

- `.agent/turn-ledger/2026-07-17T18-38-56-04-00.md`
- `.agent/architecture-audit/2026-07-17T18-38-56-04-00-device-input-action-coverage-dsk-map.md`
- `.agent/render-audit/2026-07-17T18-38-56-04-00-touch-controls-visible-command-gap.md`
- `.agent/gameplay-audit/2026-07-17T18-38-56-04-00-touch-only-gameplay-loop.md`
- `.agent/interaction-audit/2026-07-17T18-38-56-04-00-semantic-action-command-result-map.md`
- `.agent/input-system-audit/2026-07-17T18-38-56-04-00-device-action-coverage-contract.md`
- `.agent/deploy-audit/2026-07-17T18-38-56-04-00-mobile-input-browser-fixture-gate.md`
- `.agent/central-sync-audit/2026-07-17T18-38-56-04-00-oldest-selection-device-input-reconciliation.md`

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, simulation, input, rendering, tests, workflows, and deployment were not changed. No touch-control availability, mixed-input correctness, accessibility conformance, browser parity, artifact parity, Pages parity, or production readiness is claimed.