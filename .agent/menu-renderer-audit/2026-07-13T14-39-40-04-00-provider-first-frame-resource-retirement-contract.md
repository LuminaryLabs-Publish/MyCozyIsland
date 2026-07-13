# Menu renderer audit: provider, first-frame and resource-retirement contract

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

The menu renderer lifecycle currently has implicit top-level construction, anonymous frames and a partial delayed disposal path. This contract defines the smallest terminal lifecycle needed by the shell.

## Plan ledger

**Goal:** make one menu renderer generation observable from provider admission through complete retirement.

- [x] Identify identities and revisions.
- [x] Define boot, frame and retirement results.
- [x] Define resource classes and disposal evidence.
- [x] Define stale/duplicate behavior.
- [ ] Implement and prove the contract.

## Identities

```txt
MenuPresentationAttemptId
MenuProviderGeneration
MenuCanvasGeneration
MenuContextGeneration
MenuRendererGeneration
MenuResourceGeneration
MenuSchedulerGeneration
MenuFrameSequence
PlayerEntryAttemptId
```

## Prepared resource set

```txt
MenuSceneResourceSet {
  scene
  camera
  skyGeometry
  skyMaterial
  trunkGeometry
  trunkMaterial
  frondGeometries[]
  leafMaterials[]
  coconutGeometries[]
  coconutMaterial
  lights[]
  ownedListeners[]
}
```

Preparation must produce a detached candidate and receipt before active ownership is published.

## First-frame contract

```txt
MenuFrameSubmissionResult {
  attemptId
  rendererGeneration
  resourceGeneration
  schedulerGeneration
  frameSequence
  viewport
  pixelRatio
  submitted
  failureReason?
}

FirstMenuFrameAck {
  rendererGeneration
  resourceGeneration
  frameSequence
  canvasGeneration
  visibleEligibility
}
```

The button may expose factual game-preload progress before menu first-frame acceptance, but the shell must know whether presentation is normal or degraded.

## Retirement contract

```txt
MenuPresentationRetireCommand {
  attemptId
  expectedRendererGeneration
  expectedResourceGeneration
  expectedSchedulerGeneration
  playerEntryAttemptId
  reason
}
```

Required execution order:

```txt
mark generation retiring
  -> cancel stored RAF callback
  -> prevent successor scheduling
  -> detach resize, message, keyboard, click and media listeners
  -> dispose sky geometry/material
  -> dispose trunk geometry/material
  -> dispose every frond geometry and leaf material
  -> dispose every coconut geometry and shared material
  -> clear scene graph references
  -> dispose renderer internals
  -> apply explicit context-retention/release policy
  -> remove or inert the canvas
  -> publish terminal result
```

## Retirement receipt

```txt
MenuPresentationRetirementResult {
  status
  rendererGeneration
  resourceGeneration
  schedulerGeneration
  schedulerStopped
  lateCallbackCount
  listenersRemoved
  geometriesDisposed
  materialsDisposed
  rendererDisposed
  contextPolicy
  canvasState
  retainedResources[]
  failureReason?
}
```

## Required statuses

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
one active renderer per menu generation
one active RAF chain per scheduler generation
no frame submission after retiring begins
no successor RAF after terminal retirement
all resource counts are bounded and reported
shared materials dispose exactly once
stale entry attempts cannot retire successor menu generations
degraded menu mode can retire without a WebGL resource set
```

## Fixture ledger

```txt
normal first frame and retirement
reduced-motion first frame
resize before first frame
provider rejection
WebGL construction failure
shader compile/render failure
entry during pending first frame
duplicate retire command
stale retire command
late callback after retirement
resource disposal fault
context-loss during transition
pagehide during transition
```

## Validation boundary

No claim is made that current `renderer.dispose()` leaks or releases a specific driver resource. The proven gap is that repository code records no per-resource, scheduler, listener, context or terminal retirement evidence.