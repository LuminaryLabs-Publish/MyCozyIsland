# Project Breakdown: Core World Provider to Render Consumer Authority

Timestamp: `2026-07-11T05-10-36-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Branch: `main`

## Plan ledger

**Goal:** reconcile the newly deployed NexusEngine Core World provider path with the renderer, lifecycle, diagnostics, and validation surfaces so world-cell authority is not reduced to a one-time legacy render snapshot.

- [x] Compare the full accessible `LuminaryLabs-Publish` inventory with `LuminaryLabs-Dev/LuminaryLabs`.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories remain centrally tracked and have root `.agent` state.
- [x] Prioritize `MyCozyIsland` because runtime commit `0e30393bfd433a23bf207c8c87d5defd44aed69a` landed after its previous audit and introduced an undocumented Core World migration.
- [x] Work on only `LuminaryLabs-Publish/MyCozyIsland` in the Publish organization.
- [x] Read the route host, Core World runtime, provider bridge, kit catalog, migration guide, package scripts, and renderer-cell fixture surface.
- [x] Identify the interaction loop, active domains, services, local kits, imported NexusEngine services, provider modules, and runtime adapters.
- [x] Trace provider prepare/update/release authority into the compatibility snapshot and current whole-island renderer.
- [x] Record the missing world-revision, render-commit, cell-resource, disposal, and browser proof boundaries.
- [x] Add timestamped architecture, render, gameplay, interaction, world-provider, and deploy audits.
- [x] Refresh all required root `.agent` documents and the kit registry.
- [x] Change no runtime source, dependency, visual output, route behavior, or deployment workflow.
- [x] Create no branch and no pull request.

## Selection result

The Publish inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are tracked and have root `.agent` state.

`MyCozyIsland` was selected before the oldest-documented fallback because the production route changed after the previous central audit:

```txt
previous repo-local alignment: 2026-07-11T04-09-54-04-00
new runtime commit:          0e30393bfd433a23bf207c8c87d5defd44aed69a
runtime commit time:         2026-07-11T05:06:15-04:00
change:                      migrate Cozy Island to pinned Core World providers
```

## Current interaction loop

```txt
index.html
  -> pinned Three.js 0.185.0
  -> pinned NexusEngine commit 38229f59c22cb40024ffd13a9f48040de759f5d7
  -> src/main-cloudform.js?v=core-world-1
  -> validate 50 local kit descriptors
  -> create WebGPU/WebGL2 renderer and startup quality
  -> createCozyIslandWorldRuntime(mode=core by default)
  -> create legacy semantic composition
  -> register Core World, 48 m grid, flat surface, and seven ordered providers
  -> prepare 49 active cells around the island
  -> flatten active provider records through the legacy render-snapshot bridge
  -> construct one whole-island Three/WebGPU render graph
  -> process wheel, pointer, keyboard, blur, and resize input
  -> tick scenario and camera
  -> update Core World focus at cell boundaries or 10 Hz movement threshold
  -> update worldSnapshot and provider runtime stores
  -> update the original whole-island renderer by elapsed time only
  -> sample performance and render post pipeline
  -> publish CozyIsland world/runtime diagnostics
```

## Main finding

Core World now owns semantic cell lifecycle, but the active renderer does not consume that lifecycle.

`createLegacyRenderSnapshot()` is called once after initial `prepare()`. The resulting snapshot constructs the whole-island renderer once. Later `updateWorldFocus()` calls update Core World and provider stores, but no new snapshot or cell descriptor commit reaches `worldRenderer`.

```txt
Core World side
  focus -> prepare/update/release cells -> worldSnapshot/provider stores advance

Render side
  startup snapshot -> one whole-island resource graph -> elapsed-time update only
```

The repository includes `renderer-cell-cache`, `renderer-disposal`, and `renderer-world-cells` utilities plus isolated Node fixtures, but `src/main-cloudform.js` does not create or synchronize the cell-aware renderer controller.

This is presently masked by the island-centered seven-by-seven active set and constrained clearing movement. It remains an authority gap because active-cell revisions, prepare/update/release results, resource ownership, render commits, and visual parity are not correlated.

## Required implementation order

```txt
runtime-session lifecycle and disposal authority
  -> stable world revision and provider-result journal
  -> immutable presentation descriptor commit
  -> cell-aware renderer owner
  -> exact prepare/update/release resource transactions
  -> compatibility bridge quarantine and rollback policy
  -> world/render revision correlation in CozyIsland.getState()
  -> DOM-free provider-to-render fixture
  -> browser WebGPU/WebGL2 focus-movement and disposal smoke
```

## Validation boundary

This run updates documentation only. The expanded Node suite was identified from `package.json`, but it was not executed because this environment has connector-based source access rather than a runnable checkout. No runtime-completion claim is made.