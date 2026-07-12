# Project Breakdown: MyCozyIsland Render Layer Graph and Physical Binding

Timestamp: `2026-07-11T22-20-00-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch: `main`

## Summary

This run selected `MyCozyIsland` after comparing the full accessible Publish inventory with central tracking. A new separated-terrain and layered-render runtime series landed after the prior audit. The runtime now contains a logical ocean composition kit that is not present in the canonical kit catalog, and the physical post pipeline does not prove the resource bindings declared by that logical graph.

## Plan ledger

**Goal:** document one authority from kit/catalog admission through logical graph compilation, physical resource binding, pass execution, and visible-frame proof.

- [x] Enumerate all accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare all eligible repositories with `LuminaryLabs-Dev/LuminaryLabs` ledger entries.
- [x] Confirm root `.agent` coverage for the selected repository and no ledger-missing candidate.
- [x] Select only `MyCozyIsland`.
- [x] Read current runtime, render graph, renderer adapters, provider graph, tests, and prior audits.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all kits and kit services.
- [x] Identify all Core World providers and imported NexusEngine services.
- [x] Add root and timestamped `.agent` documentation.
- [x] Push directly to `main` without a branch or PR.
- [ ] Implement or execute the proposed runtime fixtures.

## Full Publish comparison

```txt
accessible repositories: 10
eligible repositories: 9
excluded repositories: 1
new or central-ledger-missing eligible repositories: 0
selected repository: MyCozyIsland

MyCozyIsland       2026-07-11T20-51-14-04-00 selected; layered runtime series postdated audit
PrehistoricRush    2026-07-11T21-00-00-04-00
TheOpenAbove       2026-07-11T21-08-57-04-00
HorrorCorridor     2026-07-11T21-21-12-04-00
PhantomCommand     2026-07-11T21-31-19-04-00
ZombieOrchard      2026-07-11T21-40-49-04-00
TheUnmappedHouse   2026-07-11T21-48-44-04-00
AetherVale         2026-07-11T22-02-01-04-00
IntoTheMeadow      2026-07-11T22-08-13-04-00
TheCavalryOfRome   excluded
```

## Selection reason

`MyCozyIsland` was the oldest eligible central entry. Its prior root audit described world lifecycle parity at `20:51:14`, while the current head includes a later series that added independent island/sea-floor providers, a render-layer graph, fused physical passes, a final foam scene, new tests, and updated engine pins.

## Runtime interaction loop

```txt
boot
  -> validate 50 catalog entries
  -> create the extra cozy-ocean-composition-kit
  -> initialize renderer and select backend/quality
  -> prepare legacy or Core world
  -> create one compatibility render snapshot
  -> build scene and physical render resources
  -> install listeners, loader timers, RAF, and public host

frame
  -> tick scenario/environment
  -> update camera and Core World focus
  -> update world/foam animation
  -> sample performance budget
  -> execute fused base-scene pass
  -> execute atmosphere pass
  -> execute separate final foam pass
  -> execute output transform
  -> process lazy materialization
  -> update diagnostics every 12 frames
```

## Active domains

```txt
browser startup and DOM projection
kit catalog and validation
render composition declaration and validation
logical/physical pass planning and binding
renderer backend and quality selection
legacy/Core world compatibility
Core World registration, focus, providers, active cells, and materialization
world query and compatibility snapshots
camera rail, first-person input, scenario, and clock
island terrain, sea floor, biome, shoreline, and ground contact
vegetation, rock, prop, grass, path, and campfire population
ocean waves, optics, caustics, foam, and underwater atmosphere
clouds, fog, weather, wind, illumination, and aerial perspective
scene layers, depth, blend, post-processing, and output
adaptive performance and resolution
browser callbacks, readback, validation, and deployment
```

## Kit accounting

```txt
catalog-admitted kits: 50
active source-backed runtime kit surfaces: 51
extra runtime kit: cozy-ocean-composition-kit
render-layer helper services: 3
Core World providers: 9
imported NexusEngine services used: 5
```

The complete 50-entry kit/service map is retained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

The logical graph declares that `foam-overlay` consumes:

```txt
atmosphere-composited-color
water-mask
water-surface-depth
shoreline-distance
foam-state
fog-transmittance
opaque-depth as its depth source
```

The physical pipeline creates a foam-only scene and pass with:

```txt
depthBuffer: false
no scene-depth binding
no water-mask binding
no rolling-fog-transmittance binding
foam materials depthTest: true
```

The graph validator checks logical descriptor data but does not inspect physical passes. The physical pass order and readback arrays are hard-coded independently.

## Required authority boundary

```txt
cozy-island-render-layer-binding-authority-domain
```

It must own catalog completeness, graph revision admission, compilation, pass fusion, named resources, bindings, attachment revisions, backend support, execution receipts, and first layered-frame proof.

## Documentation output

Refreshed:

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
```

Added:

```txt
.agent/trackers/2026-07-11T22-20-00-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T22-20-00-04-00.md
.agent/architecture-audit/2026-07-11T22-20-00-04-00-render-layer-binding-authority-dsk-map.md
.agent/render-audit/2026-07-11T22-20-00-04-00-logical-physical-pass-resource-gap.md
.agent/gameplay-audit/2026-07-11T22-20-00-04-00-final-foam-occlusion-loop.md
.agent/interaction-audit/2026-07-11T22-20-00-04-00-render-readback-admission-map.md
.agent/render-graph-audit/2026-07-11T22-20-00-04-00-pass-binding-depth-provenance-contract.md
.agent/deploy-audit/2026-07-11T22-20-00-04-00-webgpu-webgl2-layer-parity-fixture-gate.md
```

## Validation boundary

```txt
source inspection: complete
documentation update: complete
runtime implementation: not changed
npm test: not run
browser render smoke: not run
physical binding fixture: unavailable
foam occlusion fixture: unavailable
backend parity fixture: unavailable
```
