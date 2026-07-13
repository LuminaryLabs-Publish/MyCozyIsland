# Current audit: MyCozyIsland Core Startup and bootstrap admission

**Timestamp:** `2026-07-13T10-41-40-04-00`  
**Status:** `core-startup-integrated-bootstrap-admission-gap-audited`  
**Branch:** `main`

## Summary

Ten commits integrated NexusEngine Core Startup into MyCozyIsland. One engine now owns startup and gameplay; six factual preparations drive the existing loader; save inspection selects new or restored continuation; renderer and atmosphere waits are bounded; structured pre-playable failures are projected; and playable entry is blocked until after one render call. The active gap is earlier: the static browser module graph must load before any of that authority exists.

## Plan ledger

**Goal:** define one evidence chain from document bootstrap through module admission, Core Startup preparation, renderer submission and the first visible playable frame.

- [x] Compare all ten Publish repositories with nine eligible central ledgers and root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland because its runtime was ten commits ahead of central documentation.
- [x] Inspect startup host, composition runtime, browser loop, import map, post pipeline, startup smoke and package wiring.
- [x] Preserve all kit/service mappings and add Core Startup.
- [x] Add architecture, render, gameplay, interaction, startup, deploy and central-sync audits.
- [ ] Implement provider-independent bootstrap admission and executable browser/deployment fixtures.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new eligible repositories: 0
central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
runtime-ahead-of-central repositories: 1
selected repository: LuminaryLabs-Publish/MyCozyIsland
reason: ten Core Startup source/test/docs commits were newer than the central documentation head
```

Only `LuminaryLabs-Publish/MyCozyIsland` is modified in the Publish organization.

## Complete interaction loop

```txt
static HTML loader
  -> import map resolves remote Three/NexusEngine/Kits providers
  -> static main-adventure module graph loads and evaluates
  -> create one Core Startup engine and launch
  -> mark runtime ready
  -> initialize renderer under timeout
  -> reuse startup engine and install complete adventure composition
  -> inspect save and select continuation
  -> build world and atmosphere under timeout
  -> install input adapters
  -> mark preparations ready
  -> first animation tick updates gameplay and presentation state
  -> postPipeline.render()
  -> publish caller-authored first-frame fact
  -> enter playable
  -> steady input/tick/render/save loop
```

## Source-backed findings

- `createCozyStartupHost()` installs `core-startup-kit`, launches six preparations and connects a renderer-neutral descriptor to product DOM copy.
- `createCozyAdventure()` accepts the host engine and installs the remaining 13 core/adventure kits, avoiding split startup and gameplay state.
- Renderer initialization is bounded to 15 seconds and atmosphere preparation to 20 seconds.
- Save restore result is mapped into Core Startup continuation state before world construction.
- `enter()` is rejected until a first-frame fact exists; the startup smoke proves that domain rule.
- `index.html` still statically imports `src/main-adventure.js`, whose complete module graph includes remote Three.js and NexusEngine providers.
- The startup host and its global failure listeners are created only after that graph resolves, parses and evaluates.
- `postPipeline.render()` returns no submission result; the first-frame receipt is authored by the host and carries no visible-frame evidence.
- `startupHost.dispose()` exists but is not called by the current page-retirement path.

## Domains in use

```txt
static HTML/import-map/module-provider bootstrap
Core Startup launch, preparation, continuation, failure and playable admission
browser startup descriptor projection and product copy
NexusEngine composition, scheduler, clock and service graph
Core Object and Core Transaction Ledger
world, terrain, farm plots and forage descriptors
input, Inventory, Agriculture, Foraging and interaction
player, scenario and camera
portable save and renderer-neutral snapshots
WebGPU/WebGL2 scene, atmosphere, ocean, foam, post and quality
browser storage, page lifecycle and diagnostics
bootstrap generation, provider manifest, module admission, retry/fallback,
renderer submission and visible-frame proof
validation, Actions, Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
active route surfaces: 63
retained inactive catalog entries: 2
startup adapters outside kit census: 2
ordered Core World providers retained: 9
```

The complete per-kit service inventory is preserved in `.agent/trackers/2026-07-13T10-41-40-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
BootstrapAttemptId and bootstrap generation
immutable provider manifest and provider receipts
provider-independent static failure projection
bounded module-load result
export-contract validation
stale/duplicate/cancelled attempt rejection
retry and fallback policy
Core Startup launch binding to accepted module graph
renderer-derived first-frame submission result
visible canvas acknowledgement
bootstrap observation journal and retirement receipt
browser/build/Pages parity fixtures
```

## Required parent domain

`cozy-island-static-module-bootstrap-admission-authority-domain`

## Validation boundary

Documentation only. No runtime, gameplay, render, save, dependency, package-script, workflow or deployment behavior changed. The startup smoke was inspected but not independently run.