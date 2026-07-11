# Known Gaps: MyCozyIsland

Last updated: `2026-07-10T22-29-21-04-00`

## Priority 1: runtime-session lifecycle

The route still has no authoritative runtime-session owner.

- no session ID or lifecycle state machine
- no retained stop/dispose/restart controller
- no coordinated listener removal
- no explicit animation-loop cancellation surface
- no partial-start rollback
- no route-wide GPU/Three resource ledger
- no idempotent disposal result
- no restart or remount proof
- no lifecycle state in host readback

## Priority 2: adaptive-quality transaction authority

The adaptive quality controller has split declared and applied state.

- recovery to level 0 skips `renderer.setPixelRatio()`
- `performance.level` can be 0 while renderer pixel ratio remains degraded
- no canonical applied-quality descriptor exists
- no atomic transition result exists
- no rollback exists if a control application throws
- no transition sequence, timestamp, source frame, or reason row exists
- no policy defines whether `?quality=` locks, caps, floors, or initializes adaptation
- debug overlay displays startup tier rather than complete applied controls
- host readback omits actual pixel ratio and fog-resolution scale
- no deterministic full-degrade/full-recovery fixture exists

## Resource ownership gaps

- sky texture/material/geometry have no route owner
- atmosphere storage/data textures and compute nodes have no disposal contract
- cloud, fog, ocean, foam, post, world, and layered-grass resources do not compose one disposal boundary
- shared geometry/material/texture ownership is implicit
- renderer disposal is not coordinated with child resources

## Interaction and frame gaps

- input calls return no accepted/rejected/no-op result rows
- frame IDs and committed-frame rows are absent
- input sequences are not correlated with render commits
- performance transitions are not correlated with source frames
- diagnostic drawing is periodic latest-state only

## Host proof gaps

`globalThis.CozyIsland` exposes live Three objects plus an aggregate snapshot but not:

```txt
sessionId
lifecycleState
resource counts
dispose results
frameId
appliedQuality
actualPixelRatio
fogResolutionScale
qualityTransitionId
qualityTransitionResult
qualityTransitionJournal
qualityOverridePolicy
```

## Validation gaps

The current `npm test` gate validates catalog, source, deterministic-domain, and route tokens. It does not instantiate the browser renderer and cannot prove lifecycle disposal or adaptive-quality application fidelity.
