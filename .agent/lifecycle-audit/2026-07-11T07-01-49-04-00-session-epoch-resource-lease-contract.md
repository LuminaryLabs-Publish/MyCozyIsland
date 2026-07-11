# Lifecycle Audit: Session Epoch and Resource Lease Contract

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** define the exact identity and lifecycle rules that make startup rollback, stop, disposal and restart deterministic across browser, Core World and WebGPU resources.

- [x] Identify current lifecycle signals.
- [x] Define session identity and state transitions.
- [x] Define resource lease and release semantics.
- [x] Define stale-work admission and terminal results.

## Current lifecycle signals

```txt
main() call
main().catch(fail)
renderer.setAnimationLoop(callback)
pagehide -> domains.dispose()
```

These signals do not form a state machine and do not share one owner.

## Required identity

```txt
sessionId: stable identifier for one route instance
sessionEpoch: monotonic generation used for admission
commandId: stable identity for each lifecycle command
resourceId: stable identity for each acquired resource
callbackId: stable identity for each listener/timer/frame callback
```

## Required states

```txt
idle
starting
running
stopping
disposing
stopped
failed
```

Legal transitions:

```txt
idle -> starting
starting -> running
starting -> disposing
starting -> failed
running -> stopping
stopping -> disposing
disposing -> stopped
disposing -> failed
stopped -> starting with a newer epoch
failed -> starting only through explicit recovery policy
```

## Resource lease contract

A resource is owned only after its acquisition result is appended to the session ledger.

```txt
resourceId
kind
ownerSessionId
ownerEpoch
acquisitionOrder
releaseOrder
state
releaseAttempts
releaseResult
```

Allowed resource states:

```txt
acquiring
active
releasing
released
release-failed
```

A release operation must be idempotent. Repeating it returns the prior terminal result rather than performing duplicate work.

## Epoch rule

Closing a session must make old-epoch work inadmissible before resource teardown begins.

Applies to:

```txt
input listeners
loader timers
animation frames
Core World focus updates
provider results
render submits
debug projections
pagehide callbacks
global host commands
```

## Startup rollback

Every acquisition pushes one cleanup function. If a later acquisition fails:

```txt
state = disposing
close old-epoch admission
run cleanup stack in reverse order
record every release result
publish failed-rolled-back or failed-partial
```

## Terminal disposal result

```txt
commandId
sessionId
sessionEpoch
previousState
state
status
reason
acquiredResourceCount
releasedResourceCount
residualResources
disposalFailures
staleWorkRejected
startedAt
completedAt
resourceFingerprint
resultFingerprint
```

Allowed terminal statuses:

```txt
disposed
failed-rolled-back
failed-partial
unchanged
rejected-stale
rejected-state
```

## Restart handoff

A new session may start only when the previous session has:

```txt
closed admission
stopped animation
removed/cancelled browser leases
retired global exposure
completed the declared resource disposal policy
published a terminal result
```

The new session must use a greater epoch and fresh world/scenario/render objects.

## Required observations

```txt
current session and epoch
current lifecycle state
active resource count by kind
active listener/timer/frame count
in-flight focus/render count
last terminal result
residual resources
recent stale-work rejections
bounded lifecycle journal
```

## Current status

```txt
session contract implemented: no
resource lease registry implemented: no
epoch admission implemented: no
terminal disposal result implemented: no
runtime source changed by audit: no
```
