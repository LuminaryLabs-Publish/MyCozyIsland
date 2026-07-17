# Interaction Audit — Semantic Action Command and Result Map

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Current map

```txt
DOM key code
  -> cozyInput.enqueueKey(code, down)
  -> cozy-input-domain-kit interprets code
  -> input frame fields
  -> player, interaction, inventory, and camera systems

DOM pointer delta
  -> cozyInput.enqueuePointer(dx, dy)
  -> lookX/lookY
  -> player view
```

Gameplay meaning is currently inferred inside `n:cozy-input` from `KeyW`, `KeyA`, `KeyS`, `KeyD`, `Shift`, `KeyE`, `KeyQ`, `Digit1-Digit4`, `Space`, and `Enter`. This makes keyboard coverage complete but gives touch adapters no source-neutral command surface.

## Proposed semantic map

```txt
source adapter
  -> SemanticActionCommand {
       action: move | look | sprint | interact |
               cycle-seed | select-seed | skip-intro,
       phase: begin | update | end | pulse,
       value,
       SourceId,
       DeviceProfileId,
       InputContextId,
       CommandId
     }
  -> SemanticActionAdmissionResult
  -> InputSourceSettlementResult
  -> normalized input frame
  -> existing consumer domains
```

## Required results

- `InputCapabilityManifestResult`
- `SemanticActionAdmissionResult`
- `TouchControlProjectionResult`
- `InputSourceSettlementResult`
- `InputFrameDigest`
- `FirstInputActionBoundFrameAck`

## Arbitration rules

- Keyboard and touch movement combine only under an explicit policy.
- One-shot interaction and seed-selection commands settle once per command ID.
- Touch look and mouse/pointer look retain separate gesture identities.
- A source losing capture or focus cannot leave movement or sprint held.
- UI touches do not leak into camera look.
- The accepted input context determines whether intro, gameplay, menu, or suspended actions are legal.

## Existing transaction boundaries retained

Agriculture, Foraging, inventory, player, camera, save, and Core Transaction Ledger behavior remain unchanged. The proposal adds browser/source admission before the existing normalized frame.