# Architecture audit: renderer device and context loss recovery DSK map

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

Renderer loss is currently below the product's explicit domain model. Startup, simulation, snapshots and presentation have owners, but runtime renderer generation, loss, reconstruction and recovered-frame proof do not.

## Plan ledger

**Goal:** place renderer loss and recovery into one bounded renderer-neutral authority without moving simulation truth into Three.js or browser event callbacks.

- [x] Map current domain ownership.
- [x] Preserve existing startup, snapshot and presentation boundaries.
- [x] Identify missing loss and recovery ownership.
- [x] Define commands, results, revisions and acknowledgements.
- [ ] Implement the authority and provider adapters.

## Current domain graph

```txt
Core Startup
  -> startup preparation and first playable frame

Cozy adventure domains
  -> world, input, inventory, Agriculture, Foraging
  -> player, scenario, interaction, camera and save
  -> renderer-neutral static and frame snapshots

Browser presentation
  -> menu WebGPURenderer and post pipeline
  -> hidden game WebGPURenderer and atmosphere resources
  -> active world, gameplay, ocean, foam, cloud, fog and post passes

Missing boundary
  -> renderer generation
  -> device/context loss observation
  -> recovery admission and deadline
  -> GPU resource reconstruction
  -> stale generation rejection
  -> fallback and recovered-frame proof
```

## Proposed parent domain

```txt
cozy-island-render-device-context-recovery-authority-domain
```

### Inputs

```txt
RenderRecoveryAdmissionCommand
DocumentGeneration
RouteGeneration
RendererGeneration
BackendDescriptor
DeviceOrContextGeneration
ResourceRegistryRevision
StaticRenderSnapshotRevision
FrameSnapshotRevision
PreloadLeaseRevision
RecoveryPolicyRevision
```

### Results

```txt
RendererLossObservedResult
RenderSuspensionResult
RenderRecoveryAttemptResult
RenderResourceRehydrationResult
RenderRecoveryResult
RenderFallbackResult
FirstRecoveredFrameAck
```

## Proposed DSK/service split

| Surface | Services |
|---|---|
| `renderer-capability-observation-kit` | backend capability snapshot, adapter identity, health query |
| `renderer-generation-identity-kit` | renderer/device/context/resource generations and retirement |
| `webgpu-device-loss-observer-kit` | device-loss observation, reason normalization, adapter receipt |
| `webgl-context-loss-observer-kit` | context lost/restored observation and prevent-default policy |
| `context-loss-admission-kit` | loss classification, duplicate suppression, recovery eligibility |
| `render-suspension-on-loss-kit` | stop presentation, stop stale callbacks, publish suspension |
| `simulation-policy-on-render-loss-kit` | continue, pause or bounded-headless policy |
| `input-policy-on-render-loss-kit` | clear held actions, block unsafe interaction, recovery UI input |
| `recovery-attempt-command-kit` | attempt identity, deadline, cancellation and supersession |
| `renderer-reconstruction-kit` | recreate WebGPU/WebGL2 renderer and backend settings |
| `render-resource-rehydration-kit` | rebuild textures, buffers, materials, render targets and compute state |
| `scene-resource-registry-kit` | stable descriptors and reconstruction callbacks for GPU-owned resources |
| `post-pipeline-rebuild-kit` | reconstruct pass graph, cloud/fog/foam targets and composition order |
| `preload-recovery-coordination-kit` | hidden/active route ownership and entry gating during recovery |
| `stale-render-generation-rejection-kit` | reject stale animation callbacks, results and frame receipts |
| `recovery-timeout-policy-kit` | bounded retry count, timeout and escalation |
| `renderer-failure-fallback-kit` | semantic failure shell, WebGL2 fallback or reload action |
| `render-recovery-result-kit` | immutable typed recovery/fallback result |
| `first-recovered-frame-ack-kit` | bind recovered renderer, frame and visible route revisions |
| `renderer-loss-source-build-pages-fixture-kit` | source, browser, build artifact and Pages proof matrix |

## Ownership rules

```txt
simulation domains own accepted game truth
render-snapshot domains own renderer-neutral descriptors
provider adapters own Three.js/WebGPU/WebGL2 objects
recovery authority owns renderer-generation admission and settlement
browser event callbacks only emit loss/restoration evidence
no callback directly mutates simulation truth
no recovered state is accepted until one matching frame is presented
```

## Minimal command flow

```txt
loss evidence
  -> normalize provider event
  -> admit one loss for the active renderer generation
  -> suspend presentation and apply simulation/input policy
  -> create bounded recovery attempt
  -> reconstruct renderer and registered GPU resources
  -> render accepted static and frame snapshots
  -> publish RenderRecoveryResult
  -> publish FirstRecoveredFrameAck
  -> resume normal presentation
```

## Proof boundary

No implementation exists in this audit. Three.js or browser-internal behavior is not treated as product proof. Product readiness requires executable forced-loss fixtures and a revision-bound recovered-frame acknowledgement.