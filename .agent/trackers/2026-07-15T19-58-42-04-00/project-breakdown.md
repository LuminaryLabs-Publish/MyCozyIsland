# Project breakdown: MyCozyIsland accessible HUD, progress and interaction projection

**Timestamp:** `2026-07-15T19-58-42-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `dc3ef1a0c638fcef11123e4819af53f71f8aeb5e`  
**Status:** `accessible-hud-progress-interaction-projection-authority-audited`

## Summary

MyCozyIsland has a complete deterministic adventure and rich visual HUD, but startup and gameplay semantics are incomplete. Progress, stamina, seed selection, interaction and save state are either visual-only, mixed with an action control or rewritten every RAF callback without semantic change admission.

## Plan ledger

**Goal:** preserve one accepted semantic gameplay view alongside the visual frame.

- [x] Compare the complete 11-repository Publish inventory.
- [x] Exclude `LuminaryLabs-Publish/TheCavalryOfRome`.
- [x] Confirm ten eligible ledgers and root `.agent` states.
- [x] Confirm no new, missing, undocumented or runtime-ahead eligible repository.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Trace menu progress, entry focus, loader and HUD projection.
- [x] Preserve all 70 implemented kit and adapter surfaces.
- [x] Define one parent accessibility authority and 21 coordinating surfaces.
- [x] Change documentation only.
- [ ] Implement and execute browser accessibility fixtures.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T15-01-22-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T15-41-21-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Complete interaction loop

```txt
menu boot
  -> create WebGPU/WebGL2 postcard
  -> start hidden same-origin game preload
  -> receive progress messages
  -> rewrite disabled live Play button with Preparing N%
  -> receive ready and convert the same element into Play

entry
  -> activate Play
  -> send cozy-game-enter
  -> reveal iframe and remove aria-hidden
  -> focus iframe window and game canvas
  -> no typed focus/accessible-frame result

game startup
  -> Core Startup settles preparation state
  -> startup adapter updates loader text and visual fill
  -> loader live region exposes copy but not determinate value

adventure frame
  -> browser events enter cozy-input
  -> player, scenario, Agriculture, Foraging and interaction settle
  -> render snapshot publishes HUD descriptor
  -> Three.js renders the world
  -> updateHud rewrites objective, prompt, resources, stamina, save and hotbar every RAF
  -> no immutable semantic snapshot or change-filtered announcement result
```

## Domains in use

```txt
static menu and game routes
same-origin iframe preload, messaging, entry and focus handoff
Core Startup, Object and Transaction Ledger
seeded world, input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
portable save and render snapshots
startup progress and action-gate semantics
objective, resource, stamina, seed-selection, interaction and save-status semantics
focus adoption, gameplay canvas alternative and semantic frame acknowledgement
WebGPU/WebGL2, atmosphere, ocean, terrain, vegetation and DOM HUD
validation, build, Pages and central governance
```

## Implemented kits and services

### Engine-installed kits

| Kit | Domain | Services |
|---|---|---|
| `core-startup-kit` | `n:core-startup` | launch, preparation, readiness, failure, continuation, first frame, playable entry, snapshot, load, reset |
| `core-object-kit` | `n:core-object` | registration, lookup, listing |
| `core-transaction-ledger-kit` | `n:core-transaction-ledger` | ledger, idempotency, record, apply-once, snapshot, reset |
| `cozy-world-domain-kit` | `n:cozy-world` | seeded world, surface query, plot/forage layout, render base, snapshot, reset |
| `cozy-input-domain-kit` | `n:cozy-input` | normalization, queue, frame admission, held actions, clear, snapshot, reset |
| `cozy-inventory-domain-kit` | `n:cozy-inventory` | items, seed selection, transactions, batch settlement, snapshot, reset |
| `agriculture-domain-kit` | `n:production:agriculture` | land, soil, cultivation, water, growth, harvest, perennials, descriptors, events, snapshot, reset |
| `cozy-foraging-domain-kit` | `n:cozy-foraging` | coconut nodes, collection, respawn, snapshot, reset |
| `cozy-player-domain-kit` | `n:cozy-player` | movement, grounding, view, stamina, snapshot, reset |
| `cozy-scenario-domain-kit` | `n:cozy-scenario` | time, objective, snapshot, reset |
| `cozy-interaction-domain-kit` | `n:cozy-interaction` | targeting, context action, Agriculture/Foraging settlement, prompt, result, snapshot, reset |
| `cozy-camera-domain-kit` | `n:cozy-camera` | aerial intro, first-person view, terrain clearance, descriptor |
| `cozy-save-domain-kit` | `n:cozy-save` | capture, checksum validation, migration, restore, rollback, reset, diagnostics |
| `cozy-render-snapshot-domain-kit` | `n:cozy-render-snapshot` | static world, Agriculture, frame, HUD and debug descriptors |

### Cataloged world, render and host kits

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

Their services cover renderer fallback, atmosphere volumes, ocean/foam/post passes, adaptive quality, camera/scenario descriptors, terrain and vegetation queries, cloud/fog/weather fields, illumination, shoreline/ocean optics, render archetypes, deterministic seeds and environment time.

### Composition and browser adapters

| Surface | Services |
|---|---|
| `cozy-ocean-composition-kit` | layer graph, pass order, depth/blend validation |
| `browser-startup-presentation-adapter` | startup/failure DOM projection, timeout and update bridge |
| `cozy-startup-host` | preparation order, engine reuse, continuation, global errors, disposal |
| `cozy-menu-scene-adapter` | WebGPU/WebGL2 postcard, atlases, wind, water, fog, lighting, post, resize, animation, retirement |
| `cozy-menu-game-shell-adapter` | iframe preload, progress, Play gate, entry, crossfade, history, focus, fallback |
| `cozy-game-preload-bridge-adapter` | embed classification, messaging, simulation/presentation freeze-resume, entry preparation and acknowledgement |

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
additional composition kits: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total implemented surfaces: 70
planned accessibility authority surfaces: 21
```

## Source-backed finding

`menu.html` places `aria-live="polite"` on a disabled Play button. `src/menu.js` mutates that one control through `Preparing N%`, `Play`, `Entering` and `Could Not Start`. Progress state and action state therefore share one semantic owner and there is no independent progressbar result.

`game.html` exposes startup copy through a live region, but the visual track is `aria-hidden` and has no determinate progress value. Stamina is visual width only. Seed slots are `div` elements whose selected state exists only as a CSS class. Interaction, resource and save state are visible text without an authored semantic-update policy.

`src/main-adventure.js` updates the complete HUD on every animation frame. It does not compare a semantic revision, classify meaningful changes or suppress repeated announcements. Adding live regions directly to this loop would risk frame-rate announcement spam.

The menu attempts focus transfer after revealing the iframe, but no command/result contract proves that the target document is active, the canvas is accepted and the corresponding gameplay frame is visible.

## Required authority

```txt
cozy-island-accessible-hud-progress-focus-authority-domain
```

```txt
AccessibleProjectionCommand
  -> bind document, route, startup, engine-frame, HUD, interaction and focus revisions
  -> derive one immutable semantic snapshot
  -> separate progress status from Play action identity
  -> expose startup and stamina progress values
  -> expose resources and selected seed
  -> classify objective, interaction, save and failure transitions
  -> suppress duplicate RAF-only evidence
  -> adopt focus after accepted entry
  -> publish AccessibleProjectionResult
  -> publish FirstAccessibleMenuFrameAck
  -> publish FirstAccessibleGameplayFrameAck
```

## Planned authority surfaces

```txt
accessible-semantic-snapshot-kit
accessible-semantic-revision-kit
semantic-change-classification-kit
menu-progress-status-kit
menu-play-action-identity-kit
startup-progressbar-projection-kit
stamina-progressbar-projection-kit
resource-group-semantic-kit
seed-selection-semantic-kit
interaction-status-projection-kit
objective-announcement-policy-kit
save-status-announcement-policy-kit
failure-alert-policy-kit
announcement-deduplication-kit
announcement-rate-policy-kit
gameplay-canvas-alternative-kit
document-focus-identity-kit
focus-admission-result-kit
first-accessible-menu-frame-ack-kit
first-accessible-gameplay-frame-ack-kit
accessibility-source-build-pages-fixture-kit
```

## Validation boundary

Documentation only. Runtime JavaScript, HTML, CSS, gameplay, rendering, accessibility behavior, dependencies, tests, workflows and deployment were not changed.
