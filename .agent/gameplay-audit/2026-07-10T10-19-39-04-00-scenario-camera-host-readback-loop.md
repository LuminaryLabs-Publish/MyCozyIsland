# Gameplay Audit: Scenario Camera Host Readback Loop

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current loop

```txt
cozy island scenario source rows
  -> scenario runtime state
  -> animation loop tick
  -> camera rail copy
  -> renderer consumer updates
  -> performance sampling
  -> post pipeline render
  -> aggregate CozyIsland diagnostics
```

## Gameplay/readback gap

The route has source-owned scenario and camera descriptors, but the runtime loop does not expose fixture-readable scenario tick or camera frame result rows.

A future worker cannot prove why the camera moved, which scenario frame was accepted, or which frame was consumed by render without reading live runtime objects.

## Needed next rows

```txt
scenario_tick_started
scenario_tick_accepted
scenario_tick_no_change
camera_frame_created
camera_frame_clamped
camera_frame_consumed_by_renderer
camera_frame_exposed_to_host
```

## Safe implementation shape

Add a small additive journal layer around the existing scenario and camera loop. Do not retune camera constants or scenario content in the same pass.

## Next safe ledge

```txt
Scenario tick + camera frame host readback rows
```
