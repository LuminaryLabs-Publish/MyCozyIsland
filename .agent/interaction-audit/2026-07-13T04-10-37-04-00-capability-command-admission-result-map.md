# Interaction audit: capability command admission and result map

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

The normal browser-input path produces queued commands, but the global host bypasses that path and hands callers raw service objects. A capability gateway must make external control explicit, typed and independently revocable.

## Plan ledger

**Goal:** map caller intent to one admitted command, one bounded effect and one terminal result.

- [x] Map normal browser-input ownership.
- [x] Map direct public-host ownership transfer.
- [x] Identify missing identities, revisions and rejection results.
- [x] Define the target command/result flow.
- [ ] Implement and execute interaction fixtures.

## Current map

```txt
normal browser interaction
  event -> adapter -> cozy-input command -> InputFrame -> consumers

public host interaction
  caller -> raw object method -> immediate mutation/result
  no host command envelope
  no source/capability identity
  no expected revision
  no stale/duplicate/revoked rejection
  no visible result acknowledgement
```

## Required map

```txt
caller intent
  -> resolve PublicHostId and generation
  -> resolve HostChannel
  -> validate CapabilityGrantId and expiry
  -> allocate PublicCapabilityCommandId and sequence
  -> validate expected runtime/domain/render revisions
  -> prepare participant operation
  -> commit one effect or zero mutation
  -> publish PublicCapabilityResult
  -> publish participant receipts
  -> append bounded observation
  -> acknowledge first matching visible frame
```

## Command classes

```txt
inspect
  read-only state and manifest projection
capture
  read-only portable save envelope
input
  normalized synthetic input under a declared test/support source
mutation
  bounded domain action with operation ID and expected revision
reset
  destructive multi-participant action requiring confirmation and new generation
render-debug
  renderer participant command that cannot mutate authoritative gameplay
```

## Terminal classifications

```txt
accepted
rejected-unknown-host
rejected-wrong-channel
rejected-unknown-capability
rejected-expired
rejected-revoked
rejected-stale-generation
rejected-stale-revision
rejected-duplicate
rejected-missing-confirmation
failed-prepare
failed-commit
rolled-back
superseded
visible
```

## Required fixtures

```txt
read-only inspection
grant and expiry
revocation
unknown/stale/duplicate command
synthetic input source identity
reset confirmation
participant rollback
host lifecycle revocation
visible effect acknowledgement
```

## Non-claims

No browser input or public-host interaction behavior changed.
