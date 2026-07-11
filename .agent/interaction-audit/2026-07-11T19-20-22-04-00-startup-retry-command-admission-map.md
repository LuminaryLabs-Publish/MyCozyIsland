# Interaction Audit: Startup Retry Command Admission Map

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

Startup is invoked once by module evaluation. There is no typed Start or Retry command, no startup state, and no admission rule preventing a second attempt from overlapping retained resources from the first attempt.

## Current ingress

```txt
ES module evaluation
  -> main()
  -> promise rejection
  -> fail(error)
```

The error panel is presentation only. It does not expose retry, rollback status, failed phase, retained capability count or terminal/retryable classification.

## Missing command surface

```txt
StartCommand
RetryStartCommand
CancelStartCommand
StartupCommandResult
StartupFailureResult
StartupRollbackResult
StartupObservation
```

## Required admission inputs

```txt
startupTransactionId
expected lifecycle state
expected prior failure ID
catalog fingerprint
world mode
quality override
backend preference
pinned dependency identity
DOM/canvas identity
command sequence
```

## Required admission rules

```txt
Start accepted only from IDLE or fully rolled-back retryable failure
Retry accepted only after rollback completion
Cancel accepted only while STARTING and before commit
commands with stale transaction or failure IDs rejected
no second renderer/world/loop acquisition while prior leases remain
no input or gameplay commands admitted before first-frame startup commit
```

## Required result classes

```txt
ACCEPTED
REJECTED_ALREADY_STARTING
REJECTED_ALREADY_RUNNING
REJECTED_ROLLBACK_INCOMPLETE
REJECTED_STALE_FAILURE
FAILED_RETRYABLE
FAILED_TERMINAL
CANCELLED
COMMITTED
```

## Required public projection

```txt
startup state
active transaction ID
current phase
backend/world mode
acquired capability count
rollback pending count
last failure summary
retry eligibility
first committed frame ID
```

Public projection must be clone-safe and must not expose raw partial renderer or world objects.

## Retry flow

```txt
failure
  -> classify retryability
  -> complete rollback
  -> verify zero active startup leases
  -> issue RetryStartCommand with prior failure ID
  -> create new transaction ID
  -> reacquire from clean baseline
  -> commit only after first valid frame
```

## Fixtures

```txt
duplicate Start during backend init
duplicate Start during world prepare
Retry before rollback completion
Retry with stale failure ID
Cancel before renderer acquisition
Cancel after partial scene acquisition
input before startup commit
clean Retry after injected failure
```

## Validation status

```txt
runtime interaction changed: no
retry UI added: no
browser fixture run: no
command admission fixtures: absent
```
