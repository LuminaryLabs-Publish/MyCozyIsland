# Menu handoff audit — Preload-to-ready presentation contract

**Timestamp:** `2026-07-17T01-39-36-04-00`

## State model

```txt
booting
  -> preloading
  -> game-ready-presentation-pending
  -> game-ready-frame-committed
  -> play-enabled
  -> entering
  -> entered
  -> retired

failure may settle from booting, preloading or pending
```

## Invariants

1. One preload iframe document owns one `PreloadSessionId`.
2. A playable Core Startup continuation may admit one ready result.
3. A ready result creates one new menu presentation generation.
4. The preload budget remains authoritative until the ready transition commits.
5. Play remains disabled while the ready frame is pending.
6. `FirstReadyMenuFrameAck` must report the accepted viewport, DPR, backend, recipe and presentation generation.
7. Pointer, touch, Enter and Space consume the same Play admission.
8. Entry resumes the prepared game once.
9. Menu retirement rejects later frame, ready and entry results.
10. Reduced motion may shorten visual duration but may not bypass settlement identity.

## Current policy values

```txt
preload frame target:       24 FPS
idle-ready frame target:    30 FPS
interactive frame target:   60 FPS
interactive lease:          900 ms
preload applied DPR cap:     min(1, quality.dprCap)
ready applied DPR cap:       quality.dprCap
quality tiers:               high, balanced, low
render path:                 direct ACES scene render
full-screen bloom:           disabled
dynamic shadow maps:         disabled
```

## Required snapshots

```txt
MenuHandoffSnapshot {
  preloadSessionId,
  iframeDocumentRevision,
  startupRevision,
  continuationRevision,
  presentationGeneration,
  state,
  backend,
  recipeId,
  qualityTier,
  viewportRevision,
  dprRevision,
  appliedPixelRatio,
  frameMode,
  gameReadyResult,
  readyFrameAck,
  playGateResult,
  entryResult
}
```

## Apply-once keys

```txt
ready: preloadSessionId + startupRevision
presentation transition: presentationGeneration
ready frame: presentationGeneration + viewportRevision + dprRevision
Play admission: presentationGeneration
entry: preloadSessionId + continuationRevision
```

## Failure policy

- Invalid source/origin: reject without mutation.
- Stale iframe/session: reject without mutation.
- Duplicate ready: return the retained terminal result.
- Renderer resize or render failure: keep Play disabled and publish a safe failure result.
- Game window missing at activation: reject entry and keep the admitted ready state recoverable.
- Menu retirement: reject all later transition and frame work.

## Non-goal

This contract does not replace the broader adaptive-quality authority. It only makes the existing preload-to-ready performance transition ordered, observable and safe.