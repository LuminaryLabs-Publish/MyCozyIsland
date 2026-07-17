# Current audit: menu frame-budget adaptive quality

**Timestamp:** `2026-07-16T21-38-30-04-00`  
**Status:** `menu-frame-budget-adaptive-quality-authority-audited`

## Summary

MyCozyIsland now has a declarative high-fidelity menu with explicit quality tiers, WebGPU/WebGL2 backend detection, procedural atlases, GPU wind, animated water, responsive composition, shadows and bloom. Quality admission remains startup-only.

## Source-backed behavior

```txt
createMenuThreeRenderer
  -> initialize renderer and backend
  -> chooseMenuQuality(initial width, height, DPR, CPU concurrency)
  -> allocate tier-bound geometry, particles, shadows and post pipeline
  -> start animation loop

resize
  -> set DPR using original quality.dprCap
  -> set renderer dimensions
  -> update camera and palm composition
  -> do not re-run chooseMenuQuality
  -> do not replace tier-bound resources

render
  -> update pointer parallax and wind boost
  -> dispatch WebGPU compute when available
  -> render scene plus bloom
  -> do not publish frame-cost evidence
  -> do not transition quality
```

## Main gap

The renderer has no authority connecting sustained runtime frame pressure to a controlled quality transition. It also has no quality generation, transition result, stale-resource rejection or first matching visible-frame acknowledgement.

This is an ownership and executable-proof gap, not proof of a visible performance failure on a particular device.

## Required authority

`cozy-island-menu-frame-budget-adaptive-quality-authority-domain`

Required results:

- `MenuQualityAdmissionResult`
- `MenuFrameBudgetEvidenceResult`
- `MenuQualityTransitionResult`
- `FirstMenuQualityBoundFrameAck`

## Domains and services

The current composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 15 explicit menu domain/kit surfaces and four other browser/product adapters. Complete IDs, interaction loops and services are in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. No JavaScript, HTML, CSS, shaders, scene content, tests, workflows or deployment were changed by this audit.