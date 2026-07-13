# Interaction audit: capability command publication reconciliation map

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

The browser-global host is currently a direct object-reference interaction surface. It has no explicit request envelope, capability check, command admission, typed terminal result or visible-effect correlation.

## Plan ledger

**Goal:** convert public/debug/support interactions from raw calls into one identified command/result protocol.

- [x] Identify current public interaction entrypoints.
- [x] Separate read-only observations from mutating commands.
- [x] Define admission and rejection stages.
- [x] Define participant and visible-frame receipts.
- [ ] Implement the protocol and adapters.

## Current map

```txt
caller
  -> globalThis.CozyIsland
  -> choose any exposed object or method
  -> invoke immediately
  -> mutation may occur
  -> no terminal protocol result
```

## Required map

```txt
caller
  -> request a published capability manifest
  -> receive a detached projection and bounded grant
  -> submit PublicCapabilityCommand
  -> authenticate host generation, channel, grant and caller
  -> validate command ID, sequence and expected revisions
  -> delegate to one owning participant
  -> collect prepare/commit/rollback receipt
  -> publish PublicCapabilityResult
  -> append bounded observation
  -> correlate first visible frame when presentation changes
```

## Required rejection classes

```txt
unknown host
wrong host generation
channel not permitted
unknown or expired grant
revoked grant
unknown capability
malformed payload
duplicate command
stale sequence
stale runtime/domain/render revision
participant rejection
commit failure
visible acknowledgement timeout
```

## Observation boundary

Observations must be detached, bounded and secret-free. They may expose command identity, status, revisions and participant receipts, but never raw mutable engine or renderer owners.

## Validation boundary

Documentation only. No public interaction protocol exists at runtime and no fixture was executed.