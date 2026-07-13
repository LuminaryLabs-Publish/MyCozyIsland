# Lifecycle audit: suspend, resume and retire contract

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

The browser host needs two distinct lifecycle paths. BFCache-compatible suspension must preserve reconstructable runtime and renderer ownership, while terminal retirement must stop and dispose every registered participant exactly once. The current `pagehide` handler performs neither contract completely.

## Plan ledger

**Goal:** define state, ordering, participant and result contracts for complete lifecycle ownership.

- [x] Define lifecycle phases and legal transitions.
- [x] Separate suspension from retirement.
- [x] Define participant registration and dependency order.
- [x] Define save, timing, input and visible-frame requirements.
- [x] Define failure and degraded terminal states.
- [ ] Implement lifecycle coordinator and participant adapters.

## Lifecycle phases

```txt
Created
Starting
Running
Suspending
Suspended
Resuming
Retiring
Retired
Degraded
Failed
```

## Legal transitions

```txt
Created -> Starting -> Running
Running -> Suspending -> Suspended
Suspended -> Resuming -> Running
Running -> Retiring -> Retired | Degraded | Failed
Suspended -> Retiring -> Retired | Degraded | Failed
Starting -> Retiring | Failed
```

All other transitions return `Rejected` or `Stale` with zero mutation.

## Suspend contract

```txt
input
  -> reject new commands
  -> clear held actions
  -> close current input generation

frame loop
  -> stop admitting new simulation/render frames
  -> preserve resources
  -> record final admitted frame ID

save
  -> capture, write and verify through a typed receipt

render participants
  -> remain retained
  -> publish retain/suspend receipts

result
  -> publish Suspended only after mandatory receipts complete
```

## Resume contract

```txt
validate same runtime session and suspended lifecycle generation
validate retained participant revisions
recreate only participants that cannot be retained
reset performance.now baseline and frame generation
open a new input generation
project current authoritative adventure snapshot
resume animation loop
publish Resumed
publish first matching visible-frame acknowledgement
```

## Retire contract

```txt
reject new commands and frames
cancel or stop animation loop
detach window and canvas listeners
flush and verify save
retire debug/global capability surfaces
dispose post/depth pipeline resources
dispose gameplay and world scene graphs
dispose cloud, fog, ocean, foam and sky resources
dispose atmosphere textures and compute resources
dispose renderer/backend resources
collect exactly-once participant receipts
publish Retired, Degraded or Failed
```

## Participant contract

```txt
LifecycleParticipant {
  participantId
  dependencyIds
  mandatoryForSuspend
  mandatoryForResume
  mandatoryForRetire
  suspend(context) -> ParticipantLifecycleResult
  resume(context) -> ParticipantLifecycleResult
  retire(context) -> ParticipantLifecycleResult
  getState() -> ParticipantLifecycleSnapshot
}
```

## Failure policy

```txt
suspend mandatory failure
  -> return Failed or remain Running under explicit policy

resume mandatory failure
  -> do not admit frames
  -> remain Suspended or enter Failed

retirement failure
  -> continue independent cleanup
  -> publish Degraded/Failed with incomplete participant IDs
  -> never report Retired while mandatory ownership remains
```

## Required evidence

```txt
lifecycle journal with command/result identity
save flush and readback receipt
animation-loop stop/resume receipt
listener detach/rebind receipt
participant retain/rebuild/dispose receipts
first resumed frame receipt
bounded retirement completion result
```

## Do not claim

Do not claim lifecycle safety from the presence of `pagehide` alone. The contract requires classification, complete participant coverage, exactly-once results and executable browser evidence.