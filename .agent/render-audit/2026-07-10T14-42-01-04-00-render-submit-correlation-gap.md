# Render Audit: Render Submission Correlation Gap

Timestamp: 2026-07-10T14-42-01-04-00

## Current render surface

The route creates a Three `WebGPURenderer`, selects quality by backend, builds scene/sky/lights, installs stylized world, ocean, foam, computed atmosphere textures, volumetric clouds, rolling fog, and a WebGPU post pipeline.

Each animation frame updates scenario/camera/world/foam, samples performance, and calls `postPipeline.render()`.

## What is observable now

- backend and quality
- current camera descriptor
- current clock and performance aggregate
- current cloud/fog step counts and active scale
- kit count
- live renderer/scene/consumer objects

## Missing render proof

- no render submission sequence or frame identity
- no source snapshot fingerprint used by the submitted frame
- no camera-projection record linked to submission
- no consumer outcome rows for world/ocean/foam/cloud/fog/post
- no record of quality level and pixel ratio at submission time
- no reason row for skipped/failed/fallback submission
- no bounded history for deterministic fixture comparison

## Required render record

```txt
kind: render-submit
sequence
frameId
correlationId
sourceRevision
cameraRecordSequence
scenarioRecordSequence
qualityLevel
pixelRatio
consumerStatuses[]
status: render_submitted | render_skipped | render_failed
reason
```

## Constraint

The proof adapter must wrap existing consumers. It must not replace shaders, geometry, post processing, cloud/fog stepping, or visual configuration.

## Decision

The next render change is readback instrumentation only: one render-submit record per host frame, connected to the same frame chain as scenario and camera records.