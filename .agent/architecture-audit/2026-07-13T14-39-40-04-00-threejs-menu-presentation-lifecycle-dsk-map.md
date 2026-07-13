# Architecture audit: Three.js menu presentation lifecycle DSK map

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

The new menu is not a new gameplay domain. It is a browser presentation participant with provider, renderer, scene-resource, scheduler, first-frame and retirement responsibilities. Its result should compose with the existing menu/game preload handoff authority.

## Plan ledger

**Goal:** keep Three.js implementation details inside a bounded menu-presentation lifecycle domain while exposing typed results to the shell handoff.

- [x] Separate semantic menu taxonomy from executable ownership.
- [x] Preserve Core Startup and game renderer ownership.
- [x] Identify provider, renderer, resource, scheduler and retirement boundaries.
- [x] Define candidate kits, commands, results and invariants.
- [ ] Implement after contract review.

## Existing bounded ownership

```txt
Core Startup
  owns factual game preparation and playable readiness

Menu shell
  owns product copy, progress and Play intent

Menu presentation
  owns sky, palm, WebGL renderer and menu frames

Preload handoff
  owns iframe readiness, entry admission, history/focus and visible game completion

Game renderer
  owns WebGPU/WebGL2 world presentation
```

## Required parent domain

```txt
cozy-island-threejs-menu-presentation-lifecycle-authority-domain
```

## Candidate DSK decomposition

```txt
Identity
  menu-presentation-attempt-id-kit
  menu-provider-generation-kit
  menu-renderer-generation-kit
  menu-resource-generation-kit
  menu-scheduler-generation-kit

Provider and capability admission
  menu-provider-manifest-kit
  menu-provider-admission-kit
  menu-webgl-capability-probe-kit
  menu-fallback-presentation-policy-kit

Preparation
  menu-renderer-candidate-kit
  menu-scene-resource-candidate-kit
  menu-sky-resource-kit
  menu-palm-resource-kit
  menu-resource-preparation-receipt-kit

Presentation
  menu-frame-command-kit
  menu-frame-submission-result-kit
  first-menu-frame-ack-kit
  menu-single-raf-scheduler-kit
  menu-reduced-motion-policy-kit
  menu-resize-dpr-policy-kit

Retirement
  menu-presentation-retire-command-kit
  menu-listener-retirement-kit
  menu-scene-resource-disposal-kit
  menu-renderer-disposal-kit
  menu-context-release-policy-kit
  menu-retirement-result-kit

Observation and proof
  menu-presentation-observation-kit
  menu-provider-failure-fixture-kit
  menu-webgl-failure-fixture-kit
  menu-resource-retirement-fixture-kit
  menu-game-dual-renderer-budget-fixture-kit
  browser-build-pages-menu-lifecycle-smoke-kit
```

## Boot command

```txt
MenuPresentationBootCommand {
  attemptId
  shellGeneration
  providerPolicyRevision
  expectedCanvasGeneration
  reducedMotion
  viewport
}
```

## Boot result

```txt
MenuPresentationBootResult {
  attemptId
  status
  providerGeneration?
  rendererGeneration?
  resourceGeneration?
  schedulerGeneration?
  firstMenuFrameAck?
  fallbackDescriptor?
  failureReason?
}
```

Required statuses:

```txt
Ready
Degraded
ProviderRejected
CapabilityUnavailable
RendererCreationFailed
ResourcePreparationFailed
FirstFrameFailed
Cancelled
Stale
```

## Retirement command and result

```txt
MenuPresentationRetireCommand {
  shellGeneration
  entryAttemptId
  expectedRendererGeneration
  expectedResourceGeneration
  expectedSchedulerGeneration
  reason
}

MenuPresentationRetirementResult {
  status
  schedulerReceipt
  listenerReceipt
  geometryReceipt
  materialReceipt
  rendererReceipt
  contextReceipt
  clearedReferenceReceipt
}
```

Required statuses:

```txt
Retired
AlreadyRetired
Partial
Failed
Stale
Cancelled
```

## Invariants

```txt
game preload is not blocked by menu provider failure
no live menu scene adopts before provider/capability admission
first menu readiness requires a renderer-derived frame result
one accepted menu generation owns one RAF chain
entry can retire only the accepted menu generation
retirement rejects predecessor and duplicate commands
all owned geometries and materials receive terminal disposal receipts
listeners and callbacks cannot mutate after retirement
preload handoff consumes menu results but does not own Three.js mechanics
```

## Promotion boundary

Keep this product-specific until another project uses a persistent parent menu with a concurrently preloaded GPU game surface. Generic provider, scheduler, resource-disposal and frame-ack primitives may come from Nexus Engine Core domains.