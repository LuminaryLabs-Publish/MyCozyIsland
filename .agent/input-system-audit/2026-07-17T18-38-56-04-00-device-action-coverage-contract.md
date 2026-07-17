# Input System Audit — Device Action Coverage Contract

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Current capability matrix

| Action | Keyboard | Pointer/mouse | Touch-only | Domain consumer |
|---|---:|---:|---:|---|
| Move | yes | no | no | `n:cozy-player` |
| Look | no | yes | partial | `n:cozy-player` / camera |
| Sprint | yes | no | no | `n:cozy-player` |
| Interact | yes | no | no | `n:cozy-interaction` |
| Cycle seed | yes | no | no | `n:cozy-inventory` |
| Select seed 1–4 | yes | no | no | `n:cozy-inventory` |
| Skip intro | yes | wheel assists | no direct control | player/camera intro |
| Clear held input | host events | host events | host events | `n:cozy-input` |

Touch pointer events can produce camera-look deltas, but no complete touch gameplay profile is admitted.

## Proposed admission rule

A device profile is playable only when every required action for the active input context has at least one available source.

```txt
required gameplay actions:
  move
  look
  interact
  cycle-seed or direct-select-seed

optional/degradable actions:
  sprint
  direct-select-seed when cycle-seed exists
  explicit intro skip when passive completion remains available
```

The final product policy may classify sprint and direct selection differently, but that classification must be explicit and observable.

## State identities

- `DeviceProfileId`
- `InputContextId`
- `ActionSourceId`
- `TouchLayoutRevision`
- `SemanticCommandId`
- `InputFrameGeneration`
- `RenderedControlGeneration`

## Settlement requirements

- Begin/update/end phases are explicit for held actions.
- Pulse actions use apply-once command IDs.
- Pointer/touch cancellation emits action-end settlement.
- Blur, hidden visibility, page suspension, and route retirement clear all active sources.
- Mixed input cannot double-submit interaction or seed commands.
- Control layout replacement retires touches owned by the prior revision.

## Proposed surfaces

`device-profile-admission-kit`, `input-capability-manifest-kit`, `semantic-action-command-kit`, `semantic-action-result-kit`, `action-source-identity-kit`, `keyboard-action-adapter-kit`, `touch-movement-stick-kit`, `touch-look-gesture-kit`, `touch-interact-control-kit`, `touch-sprint-control-kit`, `touch-seed-selection-control-kit`, `mobile-control-layout-kit`, `accessible-control-projection-kit`, `input-source-priority-kit`, `pointer-capture-settlement-kit`, `held-action-release-kit`, `focus-context-admission-kit`, `input-frame-digest-kit`, `first-input-action-bound-frame-ack-kit`, `touch-browser-artifact-pages-fixture-kit`.

## Boundary

This is a documentation contract. None of these proposed surfaces is implemented by this audit.