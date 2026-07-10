# Gameplay Audit: Scenario Camera Readback Loop

Timestamp: `2026-07-10T13-08-51-04-00`

## Current gameplay loop

```txt
createCameraRailSequence(terrain)
  -> createCozyIslandScenario({ clock, cameraSequence, snapshot })
  -> animation loop calls scenario.tick(dt)
  -> getRenderSnapshot()
  -> copy renderState.camera.position into Three camera
  -> camera.lookAt(renderState.camera.lookAt)
  -> update world and foam renderers
  -> sample performance budget
  -> render post pipeline
```

## Current gameplay identity

The active product loop is still exploration and atmospheric island viewing. There is no combat or objective game loop in this route. The live route is camera/scenario/render progression over deterministic island descriptors.

## Gap

The scenario loop exposes aggregate render state, but not fixture-readable rows for:

```txt
scenario_tick_id
scenario_delta_seconds
scenario_elapsed_seconds
camera_frame_id
camera_mode
camera_position
camera_look_at
camera_input_source
camera_clamp_reason
render_frame_source_id
```

## Needed kit split

```txt
scenario-tick-result-kit
camera-frame-readback-kit
cozy-island-host-readback-kit
```

## Next proof

Add a DOM-free scenario/camera fixture that proves deterministic camera frame rows and JSON-safe host state before any camera retune or visual pass.
