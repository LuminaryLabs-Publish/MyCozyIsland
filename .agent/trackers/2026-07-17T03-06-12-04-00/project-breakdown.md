# MyCozyIsland Breakdown — Host Save Commit Durability Settlement

**Timestamp:** `2026-07-17T03-06-12-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous repo-local documentation head:** `161170e8eb2c2eeff499c45efe1a52350addf0a5`  
**Selection class:** oldest documented-selection rule

## Selection

The full accessible `LuminaryLabs-Publish` inventory contains 11 repositories:

`AetherVale`, `HorrorCorridor`, `IntoTheMeadow`, `MyCozyIsland`, `PhantomCommand`, `PrehistoricRush`, `TheCavalryOfRome`, `TheLongHaul`, `TheOpenAbove`, `TheUnmappedHouse`, and `ZombieOrchard`.

`LuminaryLabs-Publish/TheCavalryOfRome` is excluded. All ten eligible repositories have central ledger entries and root `.agent` state. No eligible repository was new, ledger-missing, root-agent-missing, undocumented, or ahead of its central record. MyCozyIsland was selected as the oldest synchronized eligible repository.

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger missing: 0
root .agent missing: 0
undocumented: 0
runtime-ahead requiring reconciliation: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest synchronized eligible repository
reviewed runtime revision: 347c78f358994822f9fedf91c3e16d33d6909e7e
previous repo-local documentation head: 161170e8eb2c2eeff499c45efe1a52350addf0a5
```

## Interaction loop

```txt
index route
  -> menu.html
  -> initialize particle-first WebGPU/WebGL2 menu
  -> preload game.html in a same-origin iframe
  -> freeze prepared game when Core Startup reports playable
  -> enable Play after cozy-game-ready
  -> resume game and retire menu on entry

game startup
  -> initialize WebGPU/WebGL2 renderer
  -> install Core Startup, Object, Transaction Ledger and adventure domains
  -> read localStorage key my-cozy-island.adventure-save.v1
  -> parse and restore the checksum-validated save when present
  -> create static island and renderer resources
  -> present first frame and admit player input

gameplay frame
  -> admit browser input
  -> tick scenario, player, Agriculture, Foraging and interaction
  -> project camera, world, HUD and save-domain state
  -> render ocean, foam, clouds, fog and post-processing
  -> sample performance budget

autosave
  -> every five simulated seconds compare durable-state fingerprint
  -> cozySave.capture() creates a checksum envelope
  -> capture immediately sets save-domain status to captured
  -> host calls localStorage.setItem
  -> host returns ok or error outside the save domain
  -> fingerprint advances only when setItem succeeds
  -> HUD renders Saved whenever domain status remains captured

page retirement
  -> pagehide calls the same host storeSave helper
  -> gameplay renderer disposes
  -> no durable commit receipt is projected before retirement
```

## Domains in use

- Static routes, import maps, cache keys, same-origin preload, history and focus handoff.
- Core Startup, Object and Transaction Ledger.
- Seeded island world, terrain surfaces, plots, forage nodes and renderer descriptors.
- Input, Inventory, Agriculture, Foraging, player, scenario, interaction, camera and saves.
- Save envelope capture, checksum validation, v1-to-v2 migration, rollback-safe restore, reset and durable fingerprinting.
- Browser `localStorage` read/write, page lifecycle and HUD save-status projection.
- Renderer-neutral snapshots plus WebGPU/WebGL2 terrain, vegetation, ocean, foam, cloud, fog, lighting and post-processing.
- Declarative menu scene, composition, camera, palm, water, particles, lighting, atmosphere, Play gate and game preload.
- Validation, Pages deployment and central documentation governance.

## Implemented kits and offered services

### Engine-installed core and adventure kits — 14

- `core-startup-kit`: launch, preparation registration, readiness, failure, continuation, first-frame admission, playable entry, snapshot, load and reset.
- `core-object-kit`: object registration, lookup and listing.
- `core-transaction-ledger-kit`: ledger identity, idempotency, record, apply-once settlement, snapshot and reset.
- `cozy-world-domain-kit`: seeded world, surface query, plot layout, forage layout, render base, snapshot and reset.
- `cozy-input-domain-kit`: normalization, command queue, frame admission, held actions, clear, snapshot and reset.
- `cozy-inventory-domain-kit`: items, seed selection, transactions, batch settlement, snapshot and reset.
- `agriculture-domain-kit`: land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot and reset.
- `cozy-foraging-domain-kit`: wild coconut nodes, collection, respawn, snapshot and reset.
- `cozy-player-domain-kit`: movement, grounding, view, stamina, snapshot and reset.
- `cozy-scenario-domain-kit`: time, objective, snapshot and reset.
- `cozy-interaction-domain-kit`: targeting, context action, Agriculture settlement, wild-forage action, prompt, result, snapshot and reset.
- `cozy-camera-domain-kit`: aerial introduction, first-person view, terrain clearance and camera descriptors.
- `cozy-save-domain-kit`: envelope capture, checksum validation, migration, restore, rollback, reset, fingerprint and diagnostics.
- `cozy-render-snapshot-domain-kit`: static world, Agriculture descriptors, frame snapshot, HUD descriptor and debug descriptor.

### Cataloged world, render and host kits — 50

`debug-overlay-host-kit`, `webgl2-fallback-renderer-kit`, `webgpu-compute-atmosphere-renderer-kit`, `webgpu-foam-renderer-kit`, `webgpu-ocean-renderer-kit`, `webgpu-performance-budget-kit`, `webgpu-post-processing-renderer-kit`, `webgpu-rolling-fog-renderer-kit`, `webgpu-stylized-material-renderer-kit`, `webgpu-volumetric-cloud-renderer-kit`, `camera-rail-sequence-kit`, `cozy-island-scenario-kit`, `terrain-surface-domain-kit`, `vegetation-placement-domain-kit`, `aerial-perspective-domain-kit`, `campfire-atmosphere-domain-kit`, `cloud-density-field-domain-kit`, `cloud-horizon-band-domain-kit`, `cloud-lighting-domain-kit`, `cloud-lod-domain-kit`, `cloud-shadow-domain-kit`, `cloud-weather-domain-kit`, `fog-advection-domain-kit`, `fog-field-domain-kit`, `fog-volume-placement-domain-kit`, `ground-contact-domain-kit`, `illumination-domain-kit`, `ocean-caustics-domain-kit`, `ocean-floor-profile-domain-kit`, `ocean-optics-domain-kit`, `ocean-wave-domain-kit`, `prop-archetype-domain-kit`, `render-archetype-domain-kit`, `render-quality-domain-kit`, `render-snapshot-domain-kit`, `rock-archetype-domain-kit`, `shoreline-field-domain-kit`, `shoreline-foam-domain-kit`, `stylized-material-descriptor-domain-kit`, `sun-glitter-domain-kit`, `terrain-biome-field-domain-kit`, `terrain-lod-domain-kit`, `underwater-atmosphere-domain-kit`, `vegetation-archetype-domain-kit`, `vegetation-lod-domain-kit`, `vegetation-wind-domain-kit`, `weather-state-domain-kit`, `wind-field-domain-kit`, `deterministic-seed-domain-kit`, and `environment-clock-domain-kit`.

These provide renderer fallback, atmosphere preparation, ocean and foam presentation, post-processing, frame-budget policy, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline and ocean optics, archetype descriptors, deterministic seeds and environment time.

### Additional composition kit — 1

- `cozy-ocean-composition-kit`: layer graph, pass-order validation, transparent-depth validation, terrain handoff and depth-blend contracts.

### Explicit menu domain and kit registry — 16

- `n:entry:menu:scene`: scene state and entry transition.
- `n:entry:menu:composition`: rule-of-thirds composition and negative space.
- `n:entry:menu:camera`: camera descriptor and responsive framing.
- `n:entry:menu:hero-palm`: hero palm descriptor.
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
- `n:entry:menu:game-preload`: background preparation, freeze, resume and handoff.

### Browser and product adapters — 4

- `browser-startup-presentation-adapter`: descriptor DOM projection, failure projection, timeout helper and render updates.
- `cozy-startup-host`: preparation ordering, engine reuse, continuation mapping, global error capture and disposal.
- `cozy-menu-game-shell-adapter`: iframe preload, progress, Play gate, entry, crossfade, history, focus and fallback.
- `cozy-game-preload-bridge-adapter`: embed classification, messaging, simulation/presentation freeze and resume, entry preparation and acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned save-durability surfaces:       18
```

## Main finding

`cozySave.capture()` creates the checksum envelope and immediately mutates the engine save state to `status: "captured"`, increments `saveCount`, clears `lastError` and records the checksum. The browser host then attempts `localStorage.setItem` outside that domain.

```txt
cozySave.capture()
  -> domain status becomes captured
  -> saveCount increments
  -> lastError clears
  -> checksum is published

localStorage.setItem(...)
  -> success: host returns ok and advances lastSaveFingerprint
  -> failure: host warns and returns error
  -> domain status remains captured
  -> HUD can still display Saved
```

The HUD maps every frame whose domain save status equals `captured` to `Saved`. A failed storage write therefore has no authoritative error settlement in the engine and no accurate visible status. The autosave loop will retry because its host fingerprint is not advanced, but the player-facing state can remain `Saved` while no new durable record was committed.

The `pagehide` path calls the same helper and immediately disposes gameplay rendering. It publishes no apply-once commit result, no durable digest acknowledgement and no retirement settlement. Existing tests prove in-memory capture, checksum restore and migration, but do not exercise quota denial, disabled storage, serialization failure, storage exceptions, stale commits, duplicate commits, page retirement or HUD convergence.

This is a source-backed host-persistence ownership and durability-projection gap. It is not proof that a production save has been lost.

## Required authority

`cozy-island-host-save-commit-durability-projection-authority-domain`

```txt
SaveEnvelopeCaptureCommand
  -> bind world, scenario, transaction, inventory, Agriculture,
     Foraging and player revisions
  -> create immutable envelope and digest
  -> publish SaveEnvelopeCaptureResult
  -> do not claim durable persistence

HostSaveCommitCommand
  -> bind save generation, storage origin, key and expected predecessor digest
  -> check storage availability and payload budget
  -> execute one localStorage commit
  -> publish HostSaveCommitResult as persisted, failed or indeterminate

SaveDurabilitySettlementCommand
  -> admit only the matching host commit result
  -> retain last durable digest and failure diagnostics
  -> reject stale or duplicate results
  -> publish SaveDurabilitySettlementResult

SaveStatusProjectionCommand
  -> project saving, saved, failed and unavailable states
  -> bind visible status to the matching settlement generation
  -> publish FirstDurableSaveStatusFrameAck

PageLifecycleSaveCommand
  -> flush one admitted generation on pagehide or visibility retirement
  -> reuse the same commit and settlement path
  -> publish PageLifecycleSaveResult
```

### Proposed coordinating surfaces — 18

`save-generation-identity-kit`, `save-envelope-capture-result-kit`, `host-storage-capability-kit`, `host-save-admission-kit`, `local-storage-commit-adapter-kit`, `save-commit-receipt-kit`, `durable-fingerprint-binding-kit`, `save-state-settlement-kit`, `save-error-retention-kit`, `save-retry-policy-kit`, `page-lifecycle-save-kit`, `stale-save-result-rejection-kit`, `duplicate-save-result-kit`, `save-status-projection-kit`, `first-durable-save-status-frame-ack-kit`, `corrupted-save-quarantine-kit`, `browser-storage-failure-fixture-kit`, and `artifact-pages-save-fixture-kit`.

## Required output added in this run

- `.agent/turn-ledger/2026-07-17T03-06-12-04-00.md`
- `.agent/architecture-audit/2026-07-17T03-06-12-04-00-host-save-durability-dsk-map.md`
- `.agent/render-audit/2026-07-17T03-06-12-04-00-saved-label-without-durable-receipt-gap.md`
- `.agent/gameplay-audit/2026-07-17T03-06-12-04-00-autosave-capture-commit-loop.md`
- `.agent/interaction-audit/2026-07-17T03-06-12-04-00-save-commit-command-result-map.md`
- `.agent/save-system-audit/2026-07-17T03-06-12-04-00-host-persistence-settlement-contract.md`
- `.agent/deploy-audit/2026-07-17T03-06-12-04-00-storage-failure-browser-fixture-gate.md`
- `.agent/central-sync-audit/2026-07-17T03-06-12-04-00-oldest-selection-save-durability-reconciliation.md`

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, domain implementations, save payloads, localStorage behavior, gameplay, rendering, tests, workflows and deployment were not changed. Source inspection covered `src/main-adventure.js`, `src/adventure/persistence-render-domains.js`, `src/adventure/composition-runtime.js`, `tests/adventure-domains-smoke.mjs`, the current root `.agent` state and the central ledger.

`npm test`, browser storage-failure fixtures, page-lifecycle fixtures, artifact smoke and Pages-origin smoke were not run. No durable-save correctness, save-loss incident, HUD convergence, storage-quota resilience, page-retirement correctness, artifact parity, Pages parity or production readiness is claimed.
