# Render Audit: Compatibility Render and Materialization Commit Gap

Timestamp: `2026-07-11T08-58-02-04-00`

## Summary

The visible world is still created once from the compatibility snapshot. Lazy provider readiness never reaches the live render graph, and the production host does not advance the scheduler that would produce ready cells.

## Current render loop

```txt
startup compatibility snapshot
  -> stylized whole-island geometry
  -> ocean and foam
  -> atmosphere volumes
  -> clouds and fog
  -> post pipeline
  -> animation loop updates time and camera
  -> postPipeline.render()
```

Missing from the loop:

```txt
processMaterializationFrame
cell readiness observation
cell render-plan preparation
resource preflight
atomic cell commit
released-cell retirement
first visible frame acknowledgement
```

## Divergence states

```txt
Core World cell: active
terrain descriptor: queued
biome descriptor: queued
shoreline descriptor: queued
presentation descriptor: queued
compatibility island: visible
cell renderer: disconnected
```

Even after isolated materialization completion, no live render consumer reads the ready presentation descriptor.

## Required render contract

```txt
CellReadinessRevision
  -> detached CellRenderPlan
  -> geometry/material/instance capacity preflight
  -> prepare resources without replacing accepted visuals
  -> atomic commit by cell ID and readiness revision
  -> first-frame acknowledgement
  -> retire replaced/released resources
  -> RenderCommitResult
```

## Required proof

```txt
partial cells never become visible
ready cells cite exact provider versions
compatibility world stays visible during preparation
failed cell preparation leaves previous visuals intact
released cells cannot render after epoch change
resource counts return after retirement
every visible cell maps to a readiness and render revision
```

## Finding

Lazy generation reduces potential startup cost only after host integration. It does not by itself establish visible cell streaming, render authority, or resource lifecycle correctness.
