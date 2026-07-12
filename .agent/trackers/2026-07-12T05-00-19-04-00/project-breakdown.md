# Project Breakdown: MyCozyIsland Adaptive Quality Transaction Authority

Timestamp: `2026-07-12T05-00-19-04-00`

## Goal

Document the complete adaptive-quality interaction loop, domains, kits, services, concrete defects, required authority boundary, and executable proof gate without changing runtime behavior.

## Selection

```txt
accessible LuminaryLabs-Publish repositories: 10
eligible after excluding TheCavalryOfRome: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible synchronized ledger entry
```

## Interaction loop

```txt
startup
  -> renderer backend detection
  -> base quality selection
  -> startup DPR and quality-dependent allocation
  -> performance budget construction

frame
  -> derive RAF callback spacing
  -> update scenario/world/foam
  -> sample moving average
  -> count qualifying over/under-budget frames
  -> maybe accept level transition
  -> apply cloud/fog/fog-resolution/DPR mutations
  -> render
  -> periodically project diagnostics

resize
  -> resize renderer and camera projection
  -> preserve original base quality and current adaptive state

recovery
  -> lower performance level after 360 qualifying frames
  -> restore volumetric controls
  -> fail to restore base DPR when reaching level zero
```

## Domains in use

```txt
browser startup, loading, failure and diagnostics
kit catalog and render graph validation
backend and base-quality policy
adaptive frame-cost budget and renderer mutation
Core/legacy world lifecycle and providers
camera rail and first-person exploration
scenario clock and snapshots
terrain, biome, shoreline and contact
vegetation, rocks, props, paths and campfire
ocean, foam and underwater atmosphere
clouds, fog, weather, wind and illumination
render layers, post-processing and output
input, resize, visibility, page lifecycle and public host
tests and Pages deployment
```

## Kits and services

```txt
catalog-admitted kits: 50
additional source-backed composition kits: 1
Core World providers: 9
imported NexusEngine services: 5
```

The full 50-kit service inventory is preserved in `.agent/current-audit.md` and `.agent/kit-registry.json`. The quality-critical implemented kits are:

```txt
render-quality-domain-kit
  -> startup tier selection from override, backend, memory, viewport, DPR and motion preference

webgpu-performance-budget-kit
  -> moving average, over/under counters, degrade/recover callbacks and diagnostic state

webgpu-volumetric-cloud-renderer-kit
  -> mutable step scale

webgpu-rolling-fog-renderer-kit
  -> mutable step scale

webgpu-post-processing-renderer-kit
  -> mutable fog resolution scale

debug-overlay-host-kit
  -> backend, base tier, FPS, step and kit-count projection
```

## Main findings

```txt
level-zero DPR restoration: missing
transition dwell source: qualifying frame count
refresh-rate-independent dwell: no
GPU timing consumed: no
visibility/discontinuity admission: absent
URL override fixed/adaptive policy: absent
resize quality transaction: absent
active quality revision: absent
consumer receipts: absent
visible quality-frame acknowledgement: absent
performance-budget fixtures: absent
```

## Required parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Required transaction

```txt
valid frame-cost sample
  -> time-based observation window
  -> explicit policy and predecessor revision admission
  -> complete mutable/immutable consumer plan
  -> symmetric renderer mutation
  -> typed consumer receipts
  -> atomic quality revision commit
  -> diagnostic/public projection
  -> first visible quality-frame acknowledgement
```

## Output

```txt
.agent/START_HERE.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/kit-registry.json
.agent/trackers/2026-07-12T05-00-19-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-12T05-00-19-04-00.md
.agent/architecture-audit/2026-07-12T05-00-19-04-00-adaptive-quality-transaction-authority-dsk-map.md
.agent/render-audit/2026-07-12T05-00-19-04-00-sticky-pixel-ratio-visible-frame-gap.md
.agent/interaction-audit/2026-07-12T05-00-19-04-00-quality-sample-transition-result-map.md
.agent/performance-audit/2026-07-12T05-00-19-04-00-frame-count-hysteresis-recovery-contract.md
.agent/deploy-audit/2026-07-12T05-00-19-04-00-adaptive-quality-fixture-gate.md
```

## Validation

```txt
runtime source changed: no
quality behavior changed: no
render output changed: no
npm test run: no
browser smoke run: no
branch created: no
pull request created: no
```