# Gameplay Audit: Scenario Camera Runtime Loop

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-10T05-49-25-04-00`

## Current gameplay shape

`MyCozyIsland` is not a win/loss game route. Its interaction loop is atmospheric exploration: scroll, drag, key input, scenario tick, camera rail/state, performance adaptation, and visual readback.

## Runtime loop

```txt
createCozyIslandScenario({ clock, cameraSequence, snapshot })
  -> input handlers update cameraSequence.input
  -> renderer animation loop clamps frame delta to max 0.05s
  -> scenario.tick(dt)
  -> scenario.getRenderSnapshot()
  -> camera position/lookAt copied to Three camera
  -> worldRenderer.update(clock elapsed)
  -> foamRenderer.update(clock elapsed)
  -> performanceBudget.sample(frameMs)
  -> postPipeline.render()
  -> debug overlay updates every 12 frames
```

## Current proof

`tests/domain-smoke.mjs` composes deterministic source domains, compares repeated terrain/shoreline/vegetation/rock samples, ticks the scenario once, and asserts the world id and rail camera mode.

## Gaps

```txt
No scenario tick result rows.
No camera rail frame ledger.
No input-to-camera causality rows.
No performance budget degrade/recover fixture rows.
No stable route/session state snapshot.
No serializable host state beyond aggregate legacy getState().
```

## Recommendation

Treat scenario/camera as the gameplay loop for this repo. Add fixture-readable scenario tick and camera frame rows before adding new exploration features, camera retunes, or route content.
