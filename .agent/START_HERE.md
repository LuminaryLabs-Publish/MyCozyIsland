# START HERE: MyCozyIsland

Last aligned: `2026-07-11T00-10-28-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: preserve runtime-session lifecycle authority first, then make camera-rail reset deterministic before adaptive-quality transaction work.

## Selection result

The complete accessible `LuminaryLabs-Publish` inventory contains ten repositories. `TheCavalryOfRome` remains excluded. All nine eligible repositories are centrally tracked and have root `.agent` state, so the oldest documented-selection rule applied. `MyCozyIsland` had the oldest central ledger timestamp at selection: `2026-07-10T22-29-21-04-00`.

Only `LuminaryLabs-Publish/MyCozyIsland` was changed in the Publish organization during this pass.

## Current route

```txt
index.html
  -> Three/WebGPU 0.185.0 import map
  -> src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate 50 DomainServiceKit descriptors
  -> initialize renderer and startup quality
  -> compose deterministic world snapshot
  -> create world/ocean/foam/cloud/fog/post consumers
  -> install wheel, pointer, keyboard, blur, and resize listeners
  -> renderer.setAnimationLoop
  -> scenario.tick(dt)
  -> camera-sequence descriptor
  -> render consumers and adaptive-quality sample
  -> post render and host diagnostics
```

## Newly documented finding

`camera-rail-sequence-kit` declares an authored deterministic reveal and an explicit reset policy, but its pre-first-person drag handler mutates the authored `railPositions` array in place.

```txt
pointer drag while progress < 0.985
  -> input.drag(deltaX, deltaY)
  -> every rail control point x value is changed

scenario.reset()
  -> clock.reset()
  -> cameraSequence.reset()
  -> progress/yaw/pitch/pressed/player reset
  -> rail control points are not restored
```

A reset after any rail drag therefore does not return the camera sequence to its original authored path. Repeated drag/reset cycles can accumulate path drift. The current descriptor exposes no baseline fingerprint, path revision, orbit offset, input result, or reset result, and the Node smoke test never performs drag followed by reset.

## Ordered safe ledges

```txt
1. MyCozyIsland Runtime Session Lifecycle Authority
   + WebGPU Resource Disposal Fixture Gate

2. MyCozyIsland Camera Rail Baseline Authority
   + Drag/Reset Fidelity Fixture Gate

3. MyCozyIsland Adaptive Quality Transaction Authority
   + Full-Recovery Fixture Gate
```

## Read this pass first

```txt
.agent/trackers/2026-07-11T00-10-28-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-11T00-10-28-04-00.md
.agent/architecture-audit/2026-07-11T00-10-28-04-00-camera-rail-baseline-authority-dsk-map.md
.agent/render-audit/2026-07-11T00-10-28-04-00-camera-projection-reset-drift-gap.md
.agent/gameplay-audit/2026-07-11T00-10-28-04-00-reveal-drag-reset-exploration-loop.md
.agent/interaction-audit/2026-07-11T00-10-28-04-00-wheel-drag-reset-result-map.md
.agent/sequence-authority-audit/2026-07-11T00-10-28-04-00-authored-rail-baseline-reset-contract.md
.agent/deploy-audit/2026-07-11T00-10-28-04-00-camera-rail-reset-fixture-gate.md
```

## Do not start next with

- cloud, fog, ocean, terrain, grass, camera feel, or lighting retuning
- renderer replacement
- additional camera rail points
- new quality tiers
- route-token churn
- new island content
- more GPU allocation before lifecycle ownership
