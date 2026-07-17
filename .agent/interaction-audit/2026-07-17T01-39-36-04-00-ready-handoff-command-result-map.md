# Interaction audit — Ready handoff command/result map

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Current evidence

```txt
cozy-game-progress
cozy-game-ready
cozy-game-failed
cozy-game-enter
cozy-game-entered
pointermove
pointerenter
click
Enter
Space
visibilitychange
```

The iframe message listener validates source and origin. The active host state is otherwise carried by booleans (`gameReady`, `entering`, `preloadStarted`, `preloading`, `active`, `disposed`) and timers.

## Proposed commands

### `GamePreloadReadyAdmissionCommand`

Required fields:

```txt
preloadSessionId
iframeDocumentRevision
sourceWindowRevision
origin
startupRevision
continuationRevision
rendererRevision
qualityRevision
viewportRevision
dprRevision
messageSequence
```

Terminal results:

```txt
accepted
stale-session
stale-document
invalid-source
invalid-origin
duplicate
already-entered
retired
```

### `MenuPresentationBudgetTransitionCommand`

Required fields:

```txt
presentationGeneration
fromMode=preload
toMode=ready
qualityTier
backend
viewportRevision
devicePixelRatio
requestedPixelRatio
requestedFrameRate
```

Terminal results:

```txt
committed
superseded
resize-failed
renderer-retired
stale-generation
```

### `ReadyMenuFrameCommitCommand`

Required evidence:

```txt
presentationGeneration
backend
viewportRevision
appliedPixelRatio
frameMode
recipeId
frameTimestamp
```

Publishes:

```txt
MenuRenderCommitResult
FirstReadyMenuFrameAck
```

### `PlayGateAdmissionCommand`

Required evidence:

```txt
GamePreloadReadyAdmissionResult
FirstReadyMenuFrameAck
current presentation generation
current entry state
```

Terminal results:

```txt
enabled
waiting-for-game
waiting-for-frame
stale-generation
already-entering
retired
```

### `EntryHandoffCommand`

Required fields:

```txt
entryId
activationSource
preloadSessionId
presentationGeneration
continuationRevision
```

Terminal results:

```txt
entered
already-entered
stale-generation
game-window-missing
resume-failed
fallback-entered
retired
```

## Interaction rule

Pointer, touch, keyboard and fallback timers must consume the same `PlayGateAdmissionResult` and `EntryHandoffResult`. No surface may infer readiness independently from button text, progress or a raw boolean.