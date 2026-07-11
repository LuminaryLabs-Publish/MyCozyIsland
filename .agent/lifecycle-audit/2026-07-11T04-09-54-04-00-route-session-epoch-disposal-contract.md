# Lifecycle Audit: Route Session Epoch and Disposal Contract

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** specify the authoritative lifecycle state machine, command results, resource journal, rollback behavior, and restart invariants for the complete route.

- [x] Define lifecycle states.
- [x] Define command admission.
- [x] Define acquisition and release journals.
- [x] Define rollback and idempotency.
- [x] Define host readback and fixture gates.

## State machine

```txt
idle
  -> start accepted
starting
  -> startup committed -> running
  -> startup failed -> rolling-back -> failed
running
  -> stop accepted -> stopping -> stopped
  -> dispose accepted -> disposing -> disposed
stopped
  -> start/restart accepted -> starting with epoch + 1
  -> dispose accepted -> disposing -> disposed
failed
  -> retry accepted -> starting with epoch + 1
  -> dispose accepted -> disposing -> disposed
disposed
  -> restart accepted -> starting with epoch + 1
```

No frame, input, timeout, performance callback, debug update, or global publication is accepted unless its epoch matches the active epoch and the status permits that operation.

## Session identity

```txt
sessionId
sessionEpoch
startupAttemptId
seed
optionsFingerprint
sourceFingerprint
resourceRegistryFingerprint
status
createdAtMonotonicMs
startedAtFrame
stoppedAtFrame
disposedAtFrame
terminalReason
```

The epoch is monotonic within the page context. It must not be reused after failure or disposal.

## Lifecycle commands

```txt
start(options)
stop(reason)
dispose(reason)
restart(options)
getState()
getJournal(limit)
```

Every command returns a stable result:

```txt
commandId
command
sessionEpoch
status: accepted | unchanged | rejected | failed
reason
beforeLifecycle
afterLifecycle
acquiredCount
disposedCount
remainingCount
journalRange
fingerprint
```

## Startup transaction

Every successful acquisition registers a release closure before startup advances:

```txt
acquire renderer
register renderer release
acquire source graph
register source release or no-op marker
acquire scene and render consumers
register each consumer release
acquire listener/timer/loop/global leases
register each lease release
commit startup
```

If any step fails, rollback walks the committed release stack in reverse order. Rollback failures are recorded but do not prevent remaining releases from running.

## Resource journal

```txt
rowId
sessionEpoch
resourceId
kind
ownerKit
operation: acquire | activate | release | rollback
status
reason
sequence
sharedIdentity
errorSummary
```

The journal is bounded. Host readback exposes counts and recent rows, not live objects or release functions.

## Idempotency rules

```txt
start while running -> rejected: already-running
stop after stopped -> unchanged: already-stopped
dispose after disposed -> unchanged: already-disposed
release already released lease -> unchanged: already-released
old epoch command -> rejected: stale-session-epoch
old epoch callback -> rejected: stale-session-epoch
```

## Global host contract

Replace the current live-object aggregate with a bounded host facade:

```txt
globalThis.CozyIsland
  -> sessionId
  -> sessionEpoch
  -> lifecycleStatus
  -> start/stop/dispose/restart command surface
  -> getState()
  -> getRecentResults(limit)
```

The facade must not expose live renderer, scene, camera, materials, textures, pipeline, or mutable service objects. On disposal it should either be removed or remain as a tombstone that reports the terminal epoch and rejects operations except explicit restart.

## Required disposal assertions

```txt
animation loop cleared before scene resources are disposed
listeners removed before their targets are released
timeouts cancelled before loader/global state is retired
shared geometry/material/texture disposed exactly once
volume textures released
global host no longer references retired resources
renderer disposed last among GPU render resources
resource remaining count equals zero or declared external/shared count
second dispose is unchanged and non-throwing
```

## Restart invariants

```txt
new epoch > old epoch
old callbacks rejected
old resource IDs absent from active registry
same seed/options -> same semantic source fingerprint
new renderer/resource identities -> different runtime registry fingerprint
one active listener set
one active animation loop
one active global host publication
```

## Next safe ledge

```txt
MyCozyIsland Runtime Session Lifecycle Authority
+ WebGPU Resource Disposal and Restart Fixture Gate
```
