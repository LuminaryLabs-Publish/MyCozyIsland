# Architecture Audit — Device Input Action Coverage DSK Map

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Current ownership

```txt
browser adapter
  keyboard code -> cozyInput.enqueueKey()
  pointer delta -> cozyInput.enqueuePointer()
  wheel delta   -> cozyInput.enqueueWheel()

n:cozy-input
  physical command queue
  -> key-code interpretation
  -> frame axis, sprint, look, interact, seed, and intro fields

consumer domains
  n:cozy-player
  n:cozy-interaction
  n:cozy-inventory
  n:cozy-camera
  n:cozy-render-snapshot
```

The existing DSK boundary normalizes input timing and frame admission, but gameplay meaning remains coupled to physical keyboard codes. Browser touch input currently enters only through pointer-look deltas.

## Proposed parent authority — not implemented

`cozy-island-device-input-action-coverage-semantic-command-authority-domain`

```txt
n:cozy-device-input-authority
├─ n:cozy-device-input-authority:capability-manifest
├─ n:cozy-device-input-authority:device-profile
├─ n:cozy-device-input-authority:semantic-actions
├─ n:cozy-device-input-authority:source-adapters
│  ├─ keyboard
│  ├─ pointer
│  └─ touch
├─ n:cozy-device-input-authority:touch-controls
├─ n:cozy-device-input-authority:focus-context
├─ n:cozy-device-input-authority:held-action-retirement
├─ n:cozy-device-input-authority:frame-proof
└─ n:cozy-device-input-authority:fixtures
```

## Command and result flow

```txt
InputCapabilityManifestCommand
  -> InputCapabilityManifestResult

SemanticActionAdmissionCommand
  -> SemanticActionAdmissionResult

TouchControlProjectionCommand
  -> TouchControlProjectionResult

InputSourceSettlementCommand
  -> InputSourceSettlementResult

SemanticInputFrameCommitCommand
  -> InputFrameDigest
  -> FirstInputActionBoundFrameAck
```

## Required invariants

- Gameplay domains consume semantic actions, not DOM key codes.
- Every required gameplay action has at least one admitted source for the active device profile.
- Touch controls remain reachable inside safe-area and compact viewport constraints.
- Keyboard, pointer, and touch can coexist without duplicate one-shot actions or stuck held actions.
- Focus loss, capture loss, visibility change, lifecycle suspension, and control removal settle held actions exactly once.
- The visible control generation and accepted input-frame generation are traceable to the matching rendered frame.

## Existing graph retained

All 85 implemented core, adventure, world, render, menu, composition, host, and adapter surfaces remain unchanged. This audit proposes 20 coordinating input surfaces without restructuring existing simulation, Agriculture, Foraging, camera, save, or rendering domains.