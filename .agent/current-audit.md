# Current audit: MyCozyIsland shell startup fault isolation

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`  
**Branch:** `main`  
**Reviewed pre-audit repository head:** `b7edce0ac6c7fc7005be56f649141e31690e4eee`

## Summary

MyCozyIsland’s parent shell contains a WebGPU-first palm menu and a hidden game iframe. The iframe is initially inert. `src/menu.js` assigns `game.html?preload=1` only from `startPreload()`, and `startPreload()` is scheduled only after the menu has successfully imported Three.js/TSL, initialized `WebGPURenderer`, created the palm scene, constructed `RenderPipeline` and installed its animation loop.

`main().catch(reportFailure)` disables Play and does not start the game. A static module import failure occurs before even that catch path exists. The optional menu presentation is therefore a single point of failure for the primary game route, despite the game having its own Core Startup timeout, WebGPU/WebGL2 backend result, failure projection and first-frame admission.

## Plan ledger

**Goal:** define one shell-startup transaction that runs menu preparation and game preload independently, classifies menu failure as degraded when the game remains viable and proves the first visible fallback game frame.

- [x] Compare 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm all eligible heads match their documented heads.
- [x] Select MyCozyIsland by the oldest eligible timestamp.
- [x] Inspect root, menu, game, bridge, startup and test paths.
- [x] Map the interaction loop, domains, kits and services.
- [x] Preserve 65 source-backed kits and five adapters.
- [x] Define commands, attempts, failure classes and terminal results.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible repositories: 10
central ledger entries: 10
root .agent folders: 10
new eligible repositories: 0
ledger-missing eligible repositories: 0
root-agent-missing eligible repositories: 0
runtime-ahead eligible repositories: 0
selected: LuminaryLabs-Publish/MyCozyIsland
selection basis: oldest eligible central timestamp
previous central timestamp: 2026-07-13T23-58-48-04-00
reviewed repository head: b7edce0ac6c7fc7005be56f649141e31690e4eee
```

## Complete interaction loop

```txt
index redirects to menu
  -> menu module imports WebGPU/TSL providers
  -> menu renderer initializes
  -> menu sky, palm, wind, lights and pipeline prepare
  -> menu loop starts
  -> hidden game iframe preload is finally scheduled
  -> game Core Startup prepares renderer, domains, save, world and input
  -> game first frame makes startup playable
  -> bridge sleeps game simulation and presentation
  -> parent enables Play
  -> Play resumes game and reveals iframe
  -> player walks, farms, forages and auto-saves
```

Current failure loop:

```txt
menu import/init/scene/pipeline failure
  -> no independent game-preload attempt
  -> iframe remains without src
  -> no Core Startup result
  -> no save restore, world, input or gameplay frame
  -> Play remains disabled
```

## Domains in use

```txt
routing, history, focus and page lifecycle
module/import-map provider admission
menu shell and accessible controls
menu WebGPU/WebGL2 rendering, TSL, palm compute wind and bloom
iframe preload and same-origin messaging
Core Startup readiness, continuation and first frame
NexusEngine object and transaction services
world, input, Inventory, Agriculture, Foraging and interaction
player, camera, scenario, save and render snapshots
game WebGPU/WebGL2 world, atmosphere, ocean and post-processing
adaptive quality and presentation sleep/resume
shell attempt identity and fault classification
primary-game capability policy
degraded-menu progress, retry and direct entry
first fallback-game-frame settlement
validation, build, Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed DSK/kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned startup-fallback surfaces: 24
```

Installed services cover Core Startup, objects, transactions, deterministic world queries, input, Inventory, Agriculture, Foraging, player movement, scenario, interaction, camera, saves and renderer-neutral snapshots.

Cataloged services cover terrain, vegetation, atmosphere, cloud/fog/ocean presentation, materials, render archetypes, LOD, quality budgets, deterministic seeds, weather, wind, environment time and WebGPU/WebGL2 render passes.

Adapters cover startup DOM projection, product startup orchestration, menu presentation, iframe/Play shell handling and game preload sleep/resume.

## Source-backed findings

```txt
iframe src in menu.html: absent
only iframe src assignment: startPreload()
preload scheduling: after successful menu main()
menu renderer init timeout: absent
menu import failure application handler: absent
reportFailure starts game: no
menu retry: absent
direct game fallback: absent
game Core Startup timeout: present
game backend classification: webgpu or webgl2
game first-frame admission: present
degraded-menu result: absent
menu-failure/game-success browser fixture: absent
```

## Required authority

```txt
cozy-island-shell-startup-fault-isolation-authority-domain
```

## Required transaction

```txt
ShellBootstrapCommand
  -> bind shell, menu and game attempt identities
  -> launch game preload independently from menu success
  -> prepare menu provider, renderer, scene and pipeline separately
  -> publish MenuPresentationResult and GamePreloadResult
  -> classify recoverable menu failures as degraded
  -> preserve progress, Play, retry and direct-entry projection
  -> reject stale, duplicate or superseded results
  -> admit entry against the current playable game revision
  -> publish FirstFallbackGameFrameAck
  -> publish terminal ShellBootstrapResult
```

## Validation boundary

Documentation only. No runtime, test, dependency, script, workflow or deployment behavior changed. The current tests are source-pattern checks and do not execute menu-failure/game-success browser paths.
