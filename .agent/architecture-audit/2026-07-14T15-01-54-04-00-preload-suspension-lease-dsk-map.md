# Architecture audit: preload suspension lease DSK map

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

The current composition already separates Core Startup, adventure truth, rendering, shell presentation, and the preload bridge. The missing boundary is a coordinating authority that turns live engine/renderer mutation into explicit suspension and restoration commands/results.

## Plan ledger

**Goal:** map existing ownership and define the narrowest new coordination domain without moving gameplay truth out of current kits.

- [x] Map readiness, simulation, rendering, player, input and shell ownership.
- [x] Preserve all existing kit responsibilities.
- [x] Identify direct cross-domain mutation in the preload bridge.
- [x] Define command, result and participant-receipt boundaries.
- [x] Define stale, duplicate, timeout and rollback handling.
- [ ] Implement the coordination domain.

## Current ownership map

```txt
core-startup-kit
  owns playable readiness, continuation and startup evidence

cozy-player-domain-kit
  owns player mode, intro progress, movement and stamina

cozy-input-domain-kit
  owns queued and held input plus clear/reset

engine runtime
  owns world advancement through tick/step

Three.js renderer adapter
  owns animation callback and GPU submission

cozy-game-preload-bridge-adapter
  currently captures and mutates engine/renderer methods directly

cozy-menu-game-shell-adapter
  owns progress, Play, fallback reveal, history and focus
```

## Current dependency crossing

```txt
Core Startup descriptor.playable
  -> preload bridge directly mutates engine.tick/step
  -> preload bridge directly mutates renderer animation loop
  -> shell trusts an unversioned entered message or elapsed timeout
```

The bridge is therefore acting as an implicit parent transaction across startup, simulation, rendering, player, input and shell domains.

## Required parent domain

```txt
cozy-island-preload-suspension-lease-resume-frame-authority-domain
```

## Required commands

```txt
PreloadSuspensionCommand
GameEntryCommand
EntryRecoveryCommand
```

## Required results

```txt
PreloadSuspensionPreparationResult
PreloadSuspensionResult
GameEntryPreparationResult
GameEntryResult
EntryTimeoutResult
EntryRecoveryResult
FirstResumedGameFrameAck
```

## Participant receipts

```txt
CoreStartupReceipt
EngineParticipantReceipt
SchedulerParticipantReceipt
RendererParticipantReceipt
AnimationLoopReceipt
InputParticipantReceipt
PlayerParticipantReceipt
ShellRevealReceipt
HistoryReceipt
FocusReceipt
FrameSubmissionReceipt
```

## Admission contract

```txt
PreloadSuspensionCommand
  requires current playable startup revision
  requires exact engine and renderer identities
  prepares but does not expose partial suspension
  commits all simulation/presentation participants together

GameEntryCommand
  requires accepted SuspensionLeaseId
  requires expected startup and participant revisions
  rejects stale, duplicate and superseded attempts
  restores all participants together
  rolls back to the suspended predecessor on failure
  executes a resumed tick and frame probe

shell reveal
  requires matching GameEntryResult
  requires matching FirstResumedGameFrameAck
  must not treat timeout alone as success
```

## Domain boundaries retained

```txt
Core Startup remains readiness authority
Adventure kits remain gameplay truth
Save kit remains persistence authority
Renderer remains frame-submission adapter
Shell remains reveal/history/focus authority
Preload suspension domain coordinates but does not absorb those domains
```

## Validation boundary

No runtime DSK, adapter, command or result was implemented. This document defines a future coordination boundary only.
