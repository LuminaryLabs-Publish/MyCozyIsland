# START HERE: MyCozyIsland

Last aligned: `2026-07-11T05-10-36-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: reconcile the newly deployed NexusEngine Core World provider lifecycle with the visible Three/WebGPU render graph while preserving the existing lifecycle, rollback, and visual-parity gates.

## Plan ledger

**Goal:** document the post-`0e30393b` Core World migration, identify the interaction loop, domains, services, and complete kit graph, and define the authority boundary required for provider cells to become auditable render resources.

- [x] Compare the complete accessible `LuminaryLabs-Publish` inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` because a production runtime migration landed after its previous audit.
- [x] Read the route host, Core World runtime, provider bridge, catalog, migration guide, package scripts, and renderer-cell fixtures.
- [x] Identify the interaction loop, all active domains, all local kits, imported NexusEngine services, provider modules, runtime adapters, and validation services.
- [x] Trace Core World focus, provider prepare/update/release, presentation descriptors, compatibility bridging, and visible renderer consumption.
- [x] Add timestamped architecture, render, gameplay, interaction, world-provider, and deploy audits.
- [x] Refresh all required root `.agent` documents and the kit registry.
- [x] Change no runtime source, package dependency, route behavior, rendering, or deployment configuration.
- [x] Create no branch or pull request.

## Selection result

All nine eligible non-Cavalry repositories were already documented. `MyCozyIsland` took priority over the oldest-documented fallback because the source changed after its prior alignment:

```txt
previous alignment: 2026-07-11T04-09-54-04-00
runtime commit:     0e30393bfd433a23bf207c8c87d5defd44aed69a
change:             migrate Cozy Island to Core World providers
```

Only `LuminaryLabs-Publish/MyCozyIsland` is changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0
  -> NexusEngine 38229f59c22cb40024ffd13a9f48040de759f5d7
  -> src/main-cloudform.js?v=core-world-1
  -> validate exactly 50 local kit descriptors
  -> choose WebGPU/WebGL2 backend and startup quality
  -> createCozyIslandWorldRuntime(core by default, legacy rollback available)
  -> register Core World, 48 m grid, flat surface, and seven ordered providers
  -> prepare 49 active cells around the island
  -> create one compatibility render snapshot
  -> create the whole-island world/ocean/foam/cloud/fog/post graph
  -> register wheel, pointer, keyboard, blur, resize, timers, and animation loop
  -> scenario/camera tick
  -> update Core World focus and provider stores
  -> update the original renderer by elapsed time only
  -> render post pipeline and publish CozyIsland diagnostics
```

## Newly documented finding

Core World now owns semantic world-cell lifecycle, but the production renderer does not consume that lifecycle.

`domains.createLegacyRenderSnapshot()` is called once after initial preparation. `createStylizedWorldRenderer(snapshot)` then builds one whole-island graph. Later `domains.updateWorldFocus()` can advance active cells and provider stores, but it emits no presentation commit to `worldRenderer`.

```txt
semantic authority
  focus -> world revision -> provider prepare/update/release -> presentation descriptors

visible authority
  startup compatibility snapshot -> one whole-island graph -> elapsed-time update
```

The new renderer-cell cache, disposal, and world-cell controllers are present and have isolated utility fixtures, but `src/main-cloudform.js` does not wire them into the production route. The compatibility bridge can also silently fall back to the original global vegetation, rock, or prop graph when active-cell counts do not equal the full graph.

The seven-by-seven island-centered active set and central-clearing movement currently mask most visible differences. They do not prove provider/render revision parity, exact cell resource prepare/update/release, or browser disposal safety.

## Ordered safe ledges

```txt
1. Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal and Restart Fixture Gate

2. Core World Render Commit Authority
   + Provider/Cell Consumer Fidelity Fixture Gate

3. Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

4. Dynamic Environment Frame Authority
   + Consumer Coherence Fixture Gate

5. Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

Lifecycle remains first because a cell-aware renderer introduces more dynamic GPU and Three resource churn and should reuse one authoritative resource registry.

## Read this pass first

```txt
.agent/trackers/2026-07-11T05-10-36-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T05-10-36-04-00.md
.agent/architecture-audit/2026-07-11T05-10-36-04-00-core-world-render-commit-dsk-map.md
.agent/render-audit/2026-07-11T05-10-36-04-00-cell-lifecycle-whole-island-render-gap.md
.agent/gameplay-audit/2026-07-11T05-10-36-04-00-focus-provider-render-loop.md
.agent/interaction-audit/2026-07-11T05-10-36-04-00-focus-command-render-result-map.md
.agent/world-provider-audit/2026-07-11T05-10-36-04-00-provider-cell-consumption-contract.md
.agent/deploy-audit/2026-07-11T05-10-36-04-00-provider-render-fixture-gate.md
```

## Do not start next with

- new island content, expanded movement, or additional streamed regions
- removal of `?world=legacy`
- visible cell-renderer cutover without shadow parity
- more persistent WebGPU/Three resources before lifecycle ownership
- changes to terrain, biome, placement, cloud, fog, ocean, grass, or quality algorithms
- public kit promotion before browser lifecycle and parity proof