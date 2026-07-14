# Current audit: MyCozyIsland dual-surface GPU handoff and retirement

**Timestamp:** `2026-07-13T23-58-48-04-00`  
**Status:** `dual-surface-gpu-handoff-retirement-authority-audited`  
**Branch:** `main`  
**Reviewed runtime head:** `9416ecd21622e2a5b940ee27aac6224b09979dba`

## Summary

MyCozyIsland now renders its menu through a WebGPU-first Three.js `WebGPURenderer`, TSL node materials, a `RenderPipeline`, bloom and a twelve-value compute wind field. In parallel, a hidden game iframe initializes a second WebGPU/WebGL2 renderer, the full island scene and post-processing stack. The bridge sleeps the game simulation and animation loop only after Core Startup reports playable readiness.

On Play, the game resumes and reports entered before any post-resume frame acknowledgement. The parent then crossfades both surfaces for up to 780 ms and disposes the menu pipeline and renderer. No shared generation, presentation lease, overlap policy, complete resource manifest, retirement result or public-capability revocation joins those operations.

## Plan ledger

**Goal:** define one presentation handoff transaction that admits the ready game surface, proves its resumed frame, bounds overlap and retires the predecessor menu surface completely.

- [x] Compare all Publish repositories and central ledger entries.
- [x] Exclude TheCavalryOfRome.
- [x] Select MyCozyIsland as the sole runtime-ahead repository.
- [x] Reconcile seven runtime commits after the prior documentation head.
- [x] Inspect the two renderer loops, compute work, freeze/resume bridge and tests.
- [x] Map the full interaction loop and domain ownership.
- [x] Preserve 65 kit surfaces plus five adapters.
- [x] Define command, participant and terminal result requirements.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible repositories: 9
central ledger entries: 9
root .agent folders: 9
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
selection basis: sole runtime-ahead repository
prior central timestamp: 2026-07-13T19-40-56-04-00
prior repo-local documentation head: 500aa3f5ffc69beefd98443bafc834468d43e679
reviewed runtime head: 9416ecd21622e2a5b940ee27aac6224b09979dba
```

## Complete interaction loop

```txt
index -> menu.html
menu -> WebGPURenderer init and backend selection
menu -> TSL palm, compute wind, bloom and animation loop
menu -> idle-scheduled hidden game iframe preload
game -> WebGPURenderer, NexusEngine composition and world presentation
game -> animation loop and Core Startup first-frame/playable entry
bridge -> poll readiness every 120 ms
bridge -> replace engine tick/step and stop game animation loop
bridge -> ready message
Play -> entry message
bridge -> restore simulation and game animation loop
bridge -> prepare player intro and clear input
bridge -> entered message before resumed-frame proof
parent -> reveal and crossfade
menu and game -> concurrent GPU work during fade
parent -> delayed pipeline/renderer disposal
```

## Domains in use

```txt
routing history focus and page lifecycle
same-origin iframe and cross-window protocol
Core Startup readiness and continuation
simulation freeze/resume and player-entry preparation
NexusEngine object transaction world input inventory agriculture foraging player scenario interaction save and render snapshot
menu WebGPU/WebGL2 backend admission
TSL materials procedural palm compute wind lighting bloom and tone mapping
game WebGPU/WebGL2 world atmosphere ocean post-processing and adaptive quality
dual-surface presentation leases and overlap policy
GPU resource manifests and retirement
first visible game-frame settlement
browser input resize visibility and public capabilities
static validation build Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
```

Installed services cover Core Startup, object registration, idempotent transactions, deterministic world queries, input, Inventory, Agriculture, Foraging, movement, scenario, contextual interaction, camera, portable saves and renderer-neutral snapshots.

Cataloged services cover terrain, biome, vegetation, atmosphere, clouds, fog, ocean, shoreline, materials, archetypes, quality budgets, WebGPU/WebGL2 passes, deterministic seeds, weather, wind and environmental time.

Adapters cover startup projection, product startup orchestration, WebGPU menu presentation, iframe/Play shell handling and hidden-game simulation/presentation sleep and resume.

## Source-backed findings

```txt
menu backend: WebGPU-first with WebGL2 fallback
menu compute: 12-value storage field, dispatched each active WebGPU frame
menu post-processing: RenderPipeline plus bloom
hidden game: independent WebGPU/WebGL2 renderer and post pipeline
game sleep: after Core Startup playable readiness
entry acknowledgement: before post-resume frame proof
menu/game overlap: up to 780 ms
fallback reveal: 900 ms
menu scene traversal disposal: absent
compute/storage retirement receipt: absent
listener/timer retirement registry: absent
CozyMenu capability revocation: absent
browser GPU fixtures: absent
```

## Required authority

```txt
cozy-island-dual-surface-gpu-handoff-retirement-authority-domain
```

## Required transaction

```txt
PresentationHandoffCommand
  -> bind shell iframe menu game backend and device generations
  -> admit one current playable revision
  -> prepare simulation and game-presentation resume
  -> reject stale duplicate or failed work
  -> acknowledge the first resumed game frame
  -> begin a bounded overlap window
  -> stop menu compute and frame submission
  -> retire pipeline scene compute renderer listeners timers and public capability
  -> publish MenuPresentationRetirementResult
  -> commit reveal history and focus
  -> publish PresentationHandoffResult
```

## Validation boundary

Documentation only. No runtime, test, dependency, script, workflow or deployment behavior changed. Existing checks are source-marker tests rather than browser GPU handoff or retirement proof.