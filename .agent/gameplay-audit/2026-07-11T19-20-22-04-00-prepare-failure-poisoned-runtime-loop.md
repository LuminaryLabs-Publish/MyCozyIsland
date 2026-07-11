# Gameplay Audit: Prepare Failure Poisoned Runtime Loop

Timestamp: `2026-07-11T19-20-22-04-00`

## Summary

Core World preparation is not atomic. The runtime sets its `prepared` flag before the initial focus/provider update succeeds. A thrown update can leave the runtime claiming it is prepared while its committed snapshot is still null.

## Current loop

```txt
main()
  -> createCozyIslandWorldRuntime()
  -> domains.prepare()
     -> if prepared, return worldSnapshot
     -> prepared = true
     -> commitFocus(origin)
        -> set Core World focus
        -> update world/providers
        -> assign worldSnapshot
        -> sync materializer
```

## Failure path

```txt
prepared = true
  -> setFocus or updateWorld throws
  -> prepare rejects
  -> main catches and displays error
  -> prepared remains true
  -> worldSnapshot remains null or incomplete
  -> retrying prepare returns null immediately
  -> no provider/focus retry occurs
```

## Gameplay impact

The island’s scenario and render snapshot depend on a valid prepared world baseline. A poisoned prepare state can prevent clean retry, produce missing active cells, leave provider stores partially populated, or force a full page reload without proving that the first attempt was retired.

## Missing authority

```txt
prepare transaction ID
candidate world snapshot
provider readiness results
atomic prepared/snapshot commit
prepare failure result
provider rollback receipts
materializer rollback
retry generation
baseline fingerprint
```

## Required prepare transaction

```txt
PrepareWorldCommand
  -> validate unprepared or retryable state
  -> allocate prepareTransactionId
  -> compute candidate focus and provider update
  -> validate candidate snapshot and provider readiness
  -> synchronize candidate materialization baseline
  -> atomically commit snapshot + prepared=true
  -> publish PrepareWorldResult

on failure
  -> retain prepared=false
  -> clear candidate snapshot
  -> reset partial provider/materializer state
  -> publish failure and rollback receipts
  -> permit clean retry under a new attempt ID
```

## Required invariants

```txt
prepared=true implies worldSnapshot is non-null and valid
prepared=false implies focus/materialization work is not admitted
failed prepare cannot short-circuit a later retry
provider stores after rollback match the pre-attempt baseline
startup cannot commit before PrepareWorldResult is accepted
```

## Fixtures

```txt
setFocus failure
world update failure
critical provider failure
presentation-provider failure
materializer sync failure
retry after each failure
same seed/config produces baseline parity after retry
startup first frame consumes the accepted prepare result
```

## Validation status

```txt
runtime source changed: no
world behavior changed: no
Core World tests run: no
failure injection fixtures: absent
clean retry proof: absent
```
