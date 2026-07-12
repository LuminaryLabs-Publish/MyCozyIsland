# Gameplay Audit: Reset Environment Phase Divergence Loop

Timestamp: `2026-07-12T03-39-52-04-00`

## Summary

Reset is not a complete world-state reset. It restarts the scenario clock and camera, but the visible ocean, cloud and fog phases continue from renderer lifetime. The player can return to the initial camera and repository time while the surrounding environment remains in a later visual phase.

## Current loop

```txt
play
  -> environment clock advances
  -> foam, vegetation and campfire animate from scenario time
  -> ocean, cloud and fog animate from TSL time

reset
  -> clock returns to 48
  -> camera returns to initial progress and player position
  -> foam, vegetation and campfire return to the 48-second phase
  -> ocean, cloud and fog continue

resume
  -> one visible world contains restarted and non-restarted systems
```

## Gameplay impact

```txt
replay fidelity
  repeated runs do not begin from one visual environment state

camera reset proof
  the camera can return to a baseline while the environment does not

pause and time scale
  repository clock policy cannot guarantee matching GPU behavior

diagnostics
  two runs with the same scenario state can show different ocean/cloud/fog phases

recording and screenshots
  state readback cannot reproduce the exact visible environment
```

## Missing gameplay authority

```txt
environment reset command
reset result and generation
canonical environment time
complete environment snapshot
all-consumer phase reset
stale callback rejection
replay fingerprint
first visible reset-frame acknowledgement
```

## Required reset result

```txt
EnvironmentResetResult {
  commandId
  accepted
  previousResetGeneration
  nextResetGeneration
  previousEnvironmentRevision
  nextEnvironmentRevision
  canonicalTime
  descriptorFingerprint
  requiredConsumers[]
  acceptedReceipts[]
  rejectionReason
}
```

## Required invariant

```txt
The same admitted reset command must reproduce the same camera,
clock, wind, illumination, ocean, foam, cloud, fog, vegetation,
campfire, sky and light frame before gameplay resumes.
```

## Minimum gameplay fixtures

```txt
initial versus post-reset frame fingerprint
100 reset cycles with zero phase drift
pause and resume across all environment consumers
time-scale change across all environment consumers
same state plus same environment revision produces same visible plan
stale pre-reset callback cannot update post-reset environment
```

## Validation boundary

```txt
gameplay source changed: no
reset behavior changed: no
replay behavior proved: no
browser reset smoke run: no
```