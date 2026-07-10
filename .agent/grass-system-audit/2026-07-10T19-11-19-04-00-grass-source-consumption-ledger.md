# Grass System Audit: Source Consumption Ledger

Timestamp: `2026-07-10T19-11-19-04-00`

## Source authority

`vegetation-placement-domain-kit` produces deterministic `grass-patch` rows inside `snapshot.vegetation.byType`.

Expected row fields:

```txt
position.x
position.y
position.z
rotation
scale
phase
optional tint
```

## Current handoff

```txt
original source rows
  -> wrapper reads rows
  -> wrapper creates filtered shallow snapshot
  -> base renderer receives [] for grass-patch
  -> layered renderer projects every original row
```

This prevents visible duplicate grass in the normal path, but no result proves the handoff.

## Required ledger

```txt
{
  sourceFingerprint,
  sourceCount,
  acceptedCount,
  rejectedCount,
  suppressedLegacyCount,
  renderedInstanceCount,
  duplicateConsumerCount,
  status,
  rejectionReasons
}
```

## Required invariants

```txt
sourceCount = acceptedCount + rejectedCount
suppressedLegacyCount = acceptedCount
renderedInstanceCount = acceptedCount
duplicateConsumerCount = 0
original snapshot remains unchanged
same input produces the same fingerprint and ledger
zero source rows produce a valid empty ledger
invalid rows never reach matrix projection
```

## Current missing evidence

- no validation before `dummy.position`, `rotation`, and `scale` writes
- no typed rejected rows
- no fingerprint
- no accepted/rejected reconciliation
- no proof that the base renderer consumed zero accepted rows
- no proof that one and only one layered consumer rendered each accepted row
- no host-readable source result

## Policy decision

Wind, LOD, and adaptive-quality changes are not required for this slice. The ledger should declare the current update mode as `static-startup-only` so lack of animation is explicit rather than accidental.