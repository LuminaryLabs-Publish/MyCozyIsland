# Save-system audit — Host persistence settlement contract

**Timestamp:** `2026-07-17T03-06-12-04-00`

## Current strengths

- Versioned v2 envelope.
- Stable checksum.
- v1 Agriculture migration.
- Multi-domain rollback-safe restore.
- Durable-state fingerprinting.
- Five-second changed-state autosave cadence.
- Pagehide save attempt.

## Ownership gap

The save domain owns capture and restore, while the browser host owns durable persistence. No command/result seam binds those authorities. Capture changes the domain to `captured` before the host write settles, and a host failure cannot update domain diagnostics or visible status.

## Required state

```txt
saveGeneration
pendingDigest
lastDurableDigest
lastDurableAt
hostCommitStatus
hostCommitError
retryCount
storageCapability
pageLifecycleState
revision
```

## Settlement invariants

1. Capture never means persisted.
2. One host commit result settles one save generation at most once.
3. A stale result cannot overwrite a newer pending generation.
4. Failed writes preserve the previous durable digest.
5. Successful writes clear only the matching failure.
6. HUD state derives from durability settlement, not capture state.
7. Pagehide uses the same admitted commit path and records indeterminate retirement when proof is unavailable.
8. Corrupt loaded data is quarantined or reported without overwriting the last known good record.
