# Current audit: page lifecycle runtime suspension and retirement

**Timestamp:** `2026-07-17T08-01-59-04-00`  
**Status:** `page-lifecycle-runtime-suspension-retirement-authority-audited`

## Summary

MyCozyIsland was selected through the oldest synchronized documented-selection rule. The menu renderer owns a bounded `dispose()` path, but the gameplay host does not own one lifecycle transaction for page suspension, BFCache restoration and terminal retirement.

## Source-backed behavior

```txt
active gameplay
  -> WebGPURenderer animation loop ticks simulation and renders
  -> anonymous pointer, keyboard, blur, visibility and resize listeners remain installed
  -> startup host retains global error listeners

pagehide
  -> storeSave(adventure)
  -> gameplayRenderer.dispose()
  -> no event.persisted classification
  -> no renderer-loop stop
  -> no input retirement
  -> no full scene/GPU/post/volume disposal
  -> no startupHost.dispose()
  -> no terminal or suspended result

pageshow/BFCache restore
  -> no admission or resource-validity check
  -> no clock rebase
  -> no first resumed-frame acknowledgement
```

## Main gap

The page can be retained with one gameplay presentation subtree disposed while the outer animation loop, engine, renderer, listeners and remaining GPU resources still exist. Terminal retirement is also incomplete and has no apply-once identity. The menu renderer demonstrates explicit loop, listener, texture, geometry, material and renderer retirement, but the gameplay host does not compose equivalent ownership.

This is a lifecycle convergence and resource-ownership gap, not proof of a production crash, memory leak or corrupted BFCache restore.

## Required authority

`cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

Required results:

- `PageLifecycleAdmissionResult`
- `RuntimeSuspensionResult`
- `RuntimeRetirementResult`
- `RuntimeResumeResult`
- `SaveRetirementSettlementResult`
- `FirstResumedFrameAck`

## Domains and services

The current composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 16 explicit menu domain/kit surfaces and four browser/product adapters. Complete IDs, loops and offered services are in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. No runtime JavaScript, HTML, CSS, simulation, input, save, renderer, resource-disposal, test, workflow or deployment behavior was changed.
