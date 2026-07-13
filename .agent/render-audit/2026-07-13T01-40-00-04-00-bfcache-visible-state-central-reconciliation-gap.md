# Render audit: BFCache visible-state reconciliation gap

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

A retained page can resume after `gameplayRenderer.dispose()` has destroyed materials/geometry and cleared the lookup maps used by later frame projection. No lifecycle generation or first-resumed-frame receipt proves that the visible world matches Agriculture, Foraging and interaction state.

## Plan ledger

**Goal:** require retained presentation to remain valid or be transactionally rebuilt before a resumed frame is accepted.

- [x] Trace gameplay renderer construction, update and disposal.
- [x] Trace active frame projection after possible page restoration.
- [x] Identify missing render participant and visible-frame evidence.
- [ ] Add browser fixtures for retained and reconstructed presentation.

## Source-backed gap

```txt
pagehide
  -> gameplayRenderer.dispose()
  -> geometry/material disposal
  -> plotEntries.clear()
  -> forageEntries.clear()
  -> cropGroups.clear()

later frame after retained return
  -> gameplayRenderer.update(frame)
  -> no plot entries to update soil/crops
  -> no forage entries to update availability
  -> no target lookup for plot/forage marker
```

Other active resources, including world, sky, volume textures, clouds, fog, ocean, foam and post pipeline, have no aggregate lifecycle receipt or retained-generation validation.

## Missing render evidence

```txt
render participant registry
retained-resource validation
reconstruction result
resource generation/fingerprint
partial-disposal detection
first resumed visible-frame acknowledgement
WebGPU/WebGL2 lifecycle parity
```

## Required frame contract

A resumed frame must cite runtime session, lifecycle generation, participant generations, authoritative frame revision and a terminal resume/rebuild result. It must not be acknowledged until Agriculture plots, forage nodes, target marker, HUD and rendered world all project the same successor state.

## Validation boundary

No browser or deployed render lifecycle fixture was executed.