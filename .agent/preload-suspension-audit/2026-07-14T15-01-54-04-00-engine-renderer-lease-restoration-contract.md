# Preload suspension audit: engine and renderer lease restoration contract

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

The bridge stores mutable object references and method callbacks in module globals. A reliable implementation should instead issue one suspension lease that identifies every participant and can be restored exactly once or rolled back without exposing a mixed active/suspended state.

## Plan ledger

**Goal:** define the normative suspension lease and restoration transaction.

- [x] Identify current engine and renderer mutations.
- [x] Identify player/input preparation participants.
- [x] Define lease identity and receipts.
- [x] Define restoration, rollback and terminal results.
- [ ] Implement the contract.

## Suspension lease

```txt
SuspensionLease {
  leaseId
  shellGeneration
  preloadAttemptId
  startupRevision
  playableRevision
  engineRevision
  schedulerRevision
  rendererRevision
  animationLoopRevision
  inputRevision
  playerRevision
  suspendedAt
  participantFingerprints
  status
}
```

## Preparation requirements

```txt
Core Startup descriptor is playable and current
engine exposes supported suspension service or exact method identities
renderer exposes supported animation-loop service
no active suspension lease already owns the same participants
player and input snapshots are readable
parent and child agree on shell/preload generations
candidate handles can be disposed without touching predecessors
```

## Suspension commit

```txt
prepare simulation suspension
prepare presentation suspension
prepare input suspension
verify all participant fingerprints
commit all participants together
publish PreloadSuspensionResult
retain immutable predecessor references only inside the lease
```

## Entry restoration

```txt
validate GameEntryCommand against lease
validate current public participant identities
prepare engine/scheduler restoration
prepare renderer/callback restoration
prepare player intro and input-clear state
commit all participants together
execute one deterministic simulation probe
execute one render probe
publish GameEntryResult
publish FirstResumedGameFrameAck
retire the lease
```

## Rollback

```txt
restoration preparation fails
  -> dispose candidates
  -> retain coherent suspended state
  -> publish rejected GameEntryResult

restoration commit partially fails
  -> restore every participant to suspended predecessor
  -> publish rollback receipts
  -> expose retry/reload recovery

frame probe fails
  -> do not commit shell reveal
  -> classify render failure
  -> preserve recoverable state
```

## Forbidden outcomes

```txt
engine active while renderer remains suspended without explicit degraded result
renderer active while engine remains suspended
new engine paired with predecessor callback
entered acknowledgement without accepted restoration result
shell reveal based only on elapsed time
second restoration from an already retired lease
```

## Validation boundary

This is a documentation contract. No lease, service, command, result or fixture exists in runtime code yet.
