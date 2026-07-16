# Interaction audit: render recovery command and result map

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

Browser renderer-loss events should be evidence, not direct owners of gameplay, renderer reconstruction or route state. One command/result boundary must arbitrate loss, recovery, fallback and resume.

## Plan ledger

**Goal:** define the exact interaction contract from provider loss evidence to a recovered visible frame.

- [x] Separate browser/provider evidence from product commands.
- [x] Define admission, recovery and fallback results.
- [x] Bind hidden preload and active route ownership.
- [ ] Implement and execute the contract.

## Evidence producers

```txt
WebGPU device lost promise or provider callback
WebGL webglcontextlost event
WebGL webglcontextrestored event
animation/render rejection
backend health probe
hidden-preload resume request
page visibility and route lifecycle
```

## Command

```txt
RenderRecoveryAdmissionCommand {
  commandId
  documentGeneration
  routeGeneration
  rendererGeneration
  backend
  deviceOrContextGeneration
  lossEvidenceId
  lossReason
  resourceRegistryRevision
  staticSnapshotRevision
  frameSnapshotRevision
  preloadLeaseRevision
  policyRevision
  deadline
}
```

## Admission result

```txt
RenderLossAdmissionResult {
  commandId
  accepted
  duplicate
  stale
  recoverable
  retiredRendererGeneration
  recoveryAttemptId
  simulationPolicy
  inputPolicy
  reason
}
```

## Recovery result

```txt
RenderRecoveryResult {
  recoveryAttemptId
  ok
  rendererGeneration
  backend
  deviceOrContextGeneration
  resourceRegistryRevision
  reconstructedResources
  rejectedStaleResources
  fallbackUsed
  reason
}
```

## Frame result

```txt
FirstRecoveredFrameAck {
  recoveryAttemptId
  documentGeneration
  routeGeneration
  rendererGeneration
  frameSnapshotRevision
  presentationId
  visibleSurfaceId
  presentedAt
}
```

## Rejection classes

```txt
duplicate-loss-evidence
stale-renderer-generation
superseded-route-generation
retired-document-generation
expired-recovery-attempt
resource-rehydration-failed
backend-unavailable
hidden-preload-no-longer-owned
fallback-exhausted
```

## Required ordering

```txt
loss evidence
  -> admission result
  -> presentation suspension
  -> simulation/input policy result
  -> renderer reconstruction
  -> resource rehydration result
  -> first recovered frame acknowledgement
  -> gameplay or entry resume
```

No `cozy-game-entered` acknowledgement should be treated as complete when renderer recovery is pending or no matching fresh frame has been presented.

## Validation boundary

The current source does not publish these typed commands or results. This audit changes documentation only.