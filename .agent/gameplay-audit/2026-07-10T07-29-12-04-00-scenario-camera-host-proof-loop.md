# Gameplay Audit: Scenario Camera Host Proof Loop

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Runtime loop under audit

```txt
create camera rail sequence
  -> create cozy island scenario
  -> browser input mutates runtime state
  -> animation loop ticks scenario
  -> scenario camera is copied into Three camera
  -> renderers consume camera/world state
  -> debug updates every 12 frames
```

## Current gameplay domains

- Camera rail sequence.
- Cozy island scenario state.
- Input-to-camera mutation.
- Frame loop timing.
- Render readback and debug state.

## Gap

Scenario and camera updates are visible through the rendered route and aggregate diagnostics, but not as stable rows. A fixture cannot assert the current route source, scenario tick result, camera mode, camera source, accepted/rejected movement, or frame-level render linkage.

## Required host proof

- Stable scenario source ID.
- Scenario tick row with before/after state.
- Camera frame readback row.
- Input result rows linked to camera/scenario rows.
- Render frame rows linked to camera frame IDs.
- JSON-safe `CozyIslandHost.getState().scenario` and `.camera` blocks.

## What to preserve

- Current WebGPU visual route.
- Current route token.
- Current importmap and renderer setup.
- Current scenario behavior.
- Current legacy `globalThis.CozyIsland` diagnostics.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
