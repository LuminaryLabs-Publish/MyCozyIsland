# Current audit: MyCozyIsland adaptive render-quality authority

**Timestamp:** `2026-07-12T23-08-37-04-00`  
**Status:** `adaptive-render-quality-transition-authority-audited`  
**Branch:** `main`

## Summary

The active audit is adaptive render-quality transition authority. `createPerformanceBudget()` raises or lowers an integer level from frame-time hysteresis. The browser host mutates cloud steps, fog steps, fog resolution and renderer DPR directly from callbacks.

The transition is asymmetric: `onDegrade` changes all four participants, while `onRecover` restores only cloud steps, fog steps and fog resolution. Renderer DPR can remain at the lowest reached scale after the budget level returns to zero.

## Plan ledger

**Goal:** define one admitted and verified transaction whose committed quality revision matches every participant and the first visible frame.

- [x] Compare the Publish inventory and central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only MyCozyIsland by the oldest eligible synchronized rule.
- [x] Trace quality policy, budget sampling, callbacks and render participants.
- [x] Preserve the full 64-kit and service inventory.
- [x] Define the missing parent domain and candidate kits.
- [x] Add required timestamped audit output.
- [ ] Implement transition commands, revisions, verification and fixtures.

## Source-backed behavior

```txt
static tier inputs:
  backend
  URL override
  device memory
  viewport pixels
  device pixel ratio
  reduced-motion preference

budget behavior:
  moving average smoothing
  degrade after 90 over-budget samples
  recover after 360 under-budget samples
  levels 0..2

onDegrade participants:
  cloud steps
  fog steps
  fog resolution
  renderer pixel ratio

onRecover participants:
  cloud steps
  fog steps
  fog resolution
  renderer pixel ratio: omitted
```

## Concrete recovery mismatch

For high quality with device DPR at least `1.5`:

```txt
level 0 DPR: 1.50
level 1 DPR: 1.32
level 2 DPR: 1.14
recover to 1: cloud/fog level 1, DPR still 1.14
recover to 0: cloud/fog level 0, DPR still 1.14
```

This is a source-derived configuration path, not a measured production incident.

## Interaction loop

```txt
browser startup
  -> choose static quality
  -> configure renderer and participants
  -> install NexusEngine adventure

animation frame
  -> adventure.tick
  -> camera/world/gameplay/HUD update
  -> performanceBudget.sample(frameMs)
  -> direct quality callback mutation
  -> postPipeline.render

observability
  -> debug overlay shows static tier, FPS and cloud/fog steps
  -> actual DPR, fog resolution, quality revision and render generation are not projected
```

## Domains in use

```txt
browser shell, canvas, HUD, storage and lifecycle
backend capability and static quality policy
performance sampling and adaptive level hysteresis
quality transition planning, admission, commit and rollback
render-generation and visible-frame provenance
NexusEngine composition and snapshots
Core Object and Core Transaction Ledger
world, terrain, Agriculture, Foraging, Inventory and player
input, interaction, camera, scenario and saves
renderer-neutral snapshots
WebGPU/WebGL2 atmosphere, ocean, foam, clouds, fog and post-processing
validation, CI, Pages deployment and central tracking
```

## Kit and service census

```txt
engine-installed core/adventure kits: 13
cataloged world/render/host kits: 50
additional composition kit: 1
source-backed total: 64
active route: 62
retained inactive entries: 2
ordered Core World providers: 9
```

The complete per-kit service inventory is in `.agent/trackers/2026-07-12T23-08-37-04-00/project-breakdown.md` and `.agent/kit-registry.json`.

## Missing authority

```txt
transition command ID and source
quality-level revision
render-surface generation
participant registry and capability contract
current-value readback
detached multi-participant plan
atomic commit
verification
rollback
stale-result rejection
typed terminal result
truthful diagnostics
first visible matching frame
```

## Required parent domain

```txt
cozy-island-adaptive-render-quality-transition-authority-domain
```

## Required result

`AdaptiveQualityTransitionResult` must identify the runtime session, predecessor and successor quality revisions, render generation, requested and actual participant values, verification result, rollback result and first visible frame ID.

## Validation boundary

Documentation only. No runtime, quality, rendering, gameplay, dependency, package-script or deployment behavior changed. No adaptive-quality fixture or browser/Pages smoke was run.