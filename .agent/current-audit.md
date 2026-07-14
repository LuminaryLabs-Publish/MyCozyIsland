# Current audit: MyCozyIsland postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`  
**Status:** `menu-postcard-atlas-frame-admission-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`

## Summary

MyCozyIsland is the sole runtime-ahead eligible Publish repository in this run. Three commits replaced the menu palm's modeled leaflet/rib meshes with eight five-segment alpha-cut frond cards using a deterministic four-cell canvas atlas, added three flower cards, one animated water strip, shoreline haze, new camera framing and a source-pattern test update.

The new path is lighter and avoids blended frond sorting, but its visual truth is not admitted through a browser frame. Frond and flower UVs touch exact atlas-cell boundaries while linear mip filtering is enabled and no gutters are authored. The source tests cannot rule out adjacent-cell or transparent-edge contamination. The reveal path also disposes only the pipeline and renderer, leaving explicit scene traversal, atlas, compute, listener and public-capability retirement unproved.

## Plan ledger

**Goal:** define one transaction from deterministic atlas generation through an exact admitted postcard frame and complete menu-resource retirement.

- [x] Compare 11 Publish repositories and ten eligible central ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Confirm no new, ledger-missing or root-agent-missing eligible repository.
- [x] Select MyCozyIsland as the sole runtime-ahead repository.
- [x] Inspect the runtime diff, menu source, smoke test and retained audits.
- [x] Map the interaction loop, domains, all kits and all offered services.
- [x] Preserve 65 source-backed kit surfaces and five adapters.
- [x] Define frame-admission and retirement commands/results.
- [x] Change documentation only.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible repositories: 10
central ledger entries: 10
root .agent folders: 10
new eligible repositories: 0
ledger-missing repositories: 0
root-agent-missing repositories: 0
runtime-ahead repositories: 1
selected: LuminaryLabs-Publish/MyCozyIsland
prior repo-local documentation head: 8fbc1617418f4a0701c76928e4b5da3956812e13
reviewed runtime head: 6c5e465b7b431ff6758f78e7ceb25d0f763f658f
```

## Runtime delta

```txt
cbef80b
  -> four-cell procedural frond atlas
  -> eight curved alpha-cut frond cards
  -> three-cell flower atlas and cards
  -> water strip, shoreline, fog and postcard camera
  -> compute storage reduced from 12 to 8 values

aff9e65
  -> menu description, background and cache key updated

6c5e465
  -> static smoke rewritten around the alpha-card postcard source shape
```

## Complete interaction loop

```txt
index redirects to menu
  -> import Three.js WebGPU, TSL and Bloom
  -> initialize renderer/backend
  -> generate frond and flower canvas atlases
  -> build trunk, hub, eight frond cards and three flower cards
  -> build sky, glow, water, shoreline, fog and lighting
  -> create compute wind on WebGPU
  -> create RenderPipeline and begin frames
  -> schedule hidden game preload
  -> game Core Startup prepares world/save/input and first frame
  -> bridge sleeps hidden game
  -> parent enables Play
  -> Play requests entry
  -> acknowledge or timeout fallback reveals game
  -> parent stops menu loop and disposes pipeline/renderer
  -> player walks, farms, forages and auto-saves
```

## Domains in use

```txt
routing, history, focus and page lifecycle
module/import-map provider admission
menu shell and controls
WebGPU/WebGL2 backend admission
procedural Canvas2D atlas generation
alpha-cut card geometry and sampling
TSL materials, storage compute and vertex deformation
postcard camera, atmosphere, water, shoreline, lighting and bloom
menu frame evidence and resource retirement
iframe preload and same-origin messaging
Core Startup, objects and transactions
world, input, Inventory, Agriculture, Foraging and interaction
player, scenario, camera, saves and render snapshots
game WebGPU/WebGL2 presentation and adaptive quality
simulation/presentation sleep and resume
validation, build, Pages and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed kit surfaces: 65
browser/product adapters: 5
total documented surfaces: 70
planned postcard authority surfaces: 23
```

The exact kit-by-kit service inventory is in `.agent/kit-registry.json` and the timestamped project breakdown.

## Source-backed findings

```txt
frond count: 8
frond variants: 4
frond card segments: 5
alpha test: 0.48
frond transparent sorting: disabled
frond/flower mipmaps: enabled
frond/flower atlas gutters: absent
UV cell boundaries: exact
browser frame capture: absent
backend image parity: absent
scene traversal disposal: absent
atlas disposal receipt: absent
resize listener removal: absent
CozyMenu revocation: absent
```

The atlas concern is recorded as an unverified risk, not a confirmed visible defect.

## Required authority

```txt
cozy-island-menu-postcard-atlas-frame-admission-authority-domain
```

```txt
MenuPostcardFrameAdmissionCommand
  -> bind visual, provider, backend, viewport, DPR and reduced-motion revisions
  -> generate and fingerprint atlas candidates
  -> validate cell bounds, gutters, UV interiors, alpha occupancy and mip policy
  -> prepare scene, cards, compute and pipeline
  -> submit and capture one exact frame
  -> publish MenuPostcardFrameResult and FirstMenuPostcardFrameAck

MenuPostcardRetirementCommand
  -> stop frame admission
  -> remove listeners and callbacks
  -> dispose scene, textures, storage, pipeline and renderer
  -> revoke CozyMenu
  -> publish participant receipts and terminal retirement result
```

## Validation boundary

Documentation only. No runtime, test, dependency, script, workflow or deployment behavior changed. No browser, build or Pages proof was executed.