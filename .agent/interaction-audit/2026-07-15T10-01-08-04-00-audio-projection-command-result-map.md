# Interaction audit: audio projection command/result map

**Timestamp:** `2026-07-15T10-01-08-04-00`

## Plan ledger

**Goal:** route sound from accepted semantic results, never directly from raw keyboard, pointer or touch input.

- [x] Identify current command and result owners.
- [x] Define audio admission inputs and outputs.
- [x] Define rejection, deduplication and lifecycle results.
- [ ] Implement and execute result-order fixtures.

## Current ownership

```txt
Browser input
  -> n:cozy-input frame
  -> simulation and resolve systems
  -> n:cozy-interaction.lastAction
  -> Agriculture, Foraging, Inventory and Player revisions
  -> frame snapshot and visual projection
```

## Planned command map

```txt
AudioProjectionAdmissionCommand
  commandId
  documentGeneration
  runtimeGeneration
  audioPolicyRevision
  expectedSimulationRevision
  expectedCameraRevision
  acceptedSemanticResults[]
  previousCueBatchRevision

AudioProjectionResult
  accepted
  reason
  audioGeneration
  cueBatchRevision
  consumedSemanticResultIds[]
  suppressedDuplicateIds[]
  projectedCueDescriptors[]
  listenerRevision
  lifecycleDisposition

FirstAudibleCueAck
  audioGeneration
  cueBatchRevision
  cueId
  startedAt
  disposition

FirstAudioVisualConvergenceAck
  simulationRevision
  cameraRevision
  cueBatchRevision
  visualFrameRevision
```

## Admission rules

```txt
reject raw-input success cues
reject stale simulation or camera revisions
reject duplicate semantic result IDs
reject cues for failed or rolled-back settlements unless an authored failure cue exists
reject hidden-preload ambience before entry admission
reject late work after audio-generation retirement
accept silence as an explicit policy result when muted or unsupported
```

## Lifecycle map

```txt
menu Play gesture
  -> eligible audio unlock intent
hidden preload
  -> audio context absent or explicitly suspended
accepted game entry
  -> admit game audio generation
visibility hidden or preload sleep
  -> suspend ambience and reject new noncritical cues
resume
  -> resume through a new lifecycle result
pagehide or route retirement
  -> stop voices, disconnect nodes and close/retire generation exactly once
```

## Validation boundary

No input, interaction or browser audio behavior changed.