# My Cozy Island Agent Start

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Last aligned:** `2026-07-10T05-49-25-04-00`

## Purpose

This `.agent/` folder is the repo-local operating memory for scheduled and manual work on `MyCozyIsland`.

Read it before changing runtime source.

## Selection result

The current public `LuminaryLabs-Publish` repository list was compared with `LuminaryLabs-Dev/LuminaryLabs` central ledger state and sampled root `.agent` state.

No eligible non-Cavalry repository was new, ledger-absent, missing root `.agent` state, recently added but undocumented, or otherwise undocumented.

`MyCozyIsland` was selected as the oldest eligible documented fallback after `TheUnmappedHouse` advanced to `2026-07-10T05-40-17-04-00`.

`LuminaryLabs-Publish/TheCavalryOfRome` remains excluded.

## Current route

```txt
index.html
  -> canvas#game + loader + debug + error panel
  -> importmap: three / three-webgpu / three-tsl at 0.185.0
  -> ./src/main-cloudform.js?v=webgpu-volumetric-2
  -> validate 50 DomainServiceKit manifests
  -> compose deterministic environment / terrain / ocean / vegetation / atmosphere / render snapshots
  -> create WebGPURenderer, volumetric cloud/fog renderers, WebGPU ocean/foam, and post pipeline
  -> wheel / pointer / keyboard / resize consumers mutate camera-sequence and scenario state
  -> animation loop ticks scenario, copies camera, updates renderers, samples performance, renders post pipeline
  -> globalThis.CozyIsland legacy diagnostics expose live runtime objects plus aggregate getState()
```

## Read this pass first

```txt
.agent/trackers/2026-07-10T05-49-25-04-00/project-breakdown.md
.agent/turn-ledger/2026-07-10T05-49-25-04-00.md
.agent/architecture-audit/2026-07-10T05-49-25-04-00-webgpu-source-consumer-readback-dsk-map.md
.agent/render-audit/2026-07-10T05-49-25-04-00-webgpu-render-consumption-readback-gap.md
.agent/interaction-audit/2026-07-10T05-49-25-04-00-webgpu-input-scenario-result-map.md
.agent/gameplay-audit/2026-07-10T05-49-25-04-00-scenario-camera-runtime-loop.md
.agent/grass-system-audit/2026-07-10T05-49-25-04-00-vegetation-ground-contact-readback.md
.agent/cloud-system-audit/2026-07-10T05-49-25-04-00-volumetric-cloud-fog-texture-readback.md
.agent/host-proof-audit/2026-07-10T05-49-25-04-00-cozy-island-webgpu-host-contract.md
.agent/deploy-audit/2026-07-10T05-49-25-04-00-node-test-webgpu-fixture-gate.md
```

## Main finding

`MyCozyIsland` should not get a visual rewrite next.

The source-domain layer and WebGPU route are useful, and `npm test` already provides static/domain smoke coverage. The missing layer is WebGPU source/consumer readback: route token, kit catalog status, source fingerprints, input/scenario result rows, camera rows, volume texture rows, performance degrade/recover rows, render consumption rows, and a JSON-serializable additive `CozyIslandHost`.

## Next safe ledge

```txt
MyCozyIsland WebGPU Source Consumer Readback Refresh + Node Fixture Gate
```

## Operating rules

```txt
Only push to main.
Do not create branches.
Do not work on TheCavalryOfRome.
Keep scheduled breakdown work moving.
Preserve visible WebGPU behavior until source/consumer readback is fixture-proven.
```
