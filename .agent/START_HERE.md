# START HERE: MyCozyIsland

Last aligned: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland
Current focus: WebGPU host fixture readback and Node consumer fixture proof.

## Read this first

This repo is currently a WebGPU volumetric Cozy Island route. Do not use the older Three `0.160.0` / `hero-cloud-4` assumptions as the live route source of truth.

## Current route

```txt
index.html
  -> canvas#game + loader + debug + hint + error panel
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validateKitCatalog(kitCatalog)
  -> create WebGPURenderer and choose quality by backend
  -> create deterministic domain snapshot
  -> create render snapshot and camera rail sequence
  -> create cozy island scenario
  -> create scene, fog, sky, lights, and camera
  -> create stylized world, WebGPU ocean, WebGPU foam, atmosphere volume textures, volumetric clouds, rolling fog, and WebGPU post pipeline
  -> wheel / pointer / keyboard / blur / resize consumers update input or camera state
  -> animation loop ticks scenario, copies scenario camera, updates renderers, samples performance, renders post pipeline, debug every 12 frames
  -> globalThis.CozyIsland exposes live renderer objects and aggregate getState()
```

## Current finding

The source-domain layer is useful and tested by `npm test`, but the browser host proof layer is still missing. `globalThis.CozyIsland` exposes live WebGPU/Three objects and aggregate diagnostics, not a stable JSON-safe fixture ledger.

## Read this pass first

```txt
.agent/trackers/2026-07-10T10-19-39-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T10-19-39-04-00.md
.agent/architecture-audit/2026-07-10T10-19-39-04-00-webgpu-host-fixture-readback-dsk-map.md
.agent/render-audit/2026-07-10T10-19-39-04-00-webgpu-render-consumption-fixture-gap.md
.agent/interaction-audit/2026-07-10T10-19-39-04-00-input-scenario-host-result-map.md
.agent/gameplay-audit/2026-07-10T10-19-39-04-00-scenario-camera-host-readback-loop.md
.agent/grass-system-audit/2026-07-10T10-19-39-04-00-vegetation-ground-contact-fixture-ledger.md
.agent/cloud-system-audit/2026-07-10T10-19-39-04-00-volume-texture-cloud-fog-fixture.md
.agent/host-proof-audit/2026-07-10T10-19-39-04-00-cozy-island-host-fixture-contract.md
.agent/deploy-audit/2026-07-10T10-19-39-04-00-node-webgpu-fixture-gate.md
```

## Do not start next with

- visual rewrite
- cloud rewrite
- ocean rewrite
- fog rewrite
- camera retune
- renderer replacement
- route-token churn
- new route content

## Start next with

```txt
MyCozyIsland WebGPU Host Fixture Readback Refresh + Node Consumer Fixture Gate
```

## Required next implementation shape

- Add stable route/source fingerprints.
- Add kit catalog readback rows.
- Normalize render snapshot rows.
- Add input accepted/rejected/no-change results.
- Add scenario tick and camera frame readback rows.
- Add cloud/fog/atmosphere volume texture result rows.
- Add performance degrade/recover reason rows.
- Add render-consumption ledger rows.
- Add additive JSON-safe `globalThis.CozyIslandHost` beside legacy `globalThis.CozyIsland`.
- Add a Node fixture that proves these rows without requiring browser WebGPU capture.

## Validation state

Docs-only refresh. Runtime source changed: no. Branch created: no. Pull request created: no. `npm test`: not run in this pass.
