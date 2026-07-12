# Interaction Audit: Agriculture Recovery Admission Map

Timestamp: `2026-07-12T12-50-46-04-00`

## Current admission

```txt
input frame
  -> nearest target
  -> target revision
  -> selected crop
  -> operation ID
  -> parent ledger duplicate check
  -> Agriculture child recovery shortcut
  -> plot and Inventory validation
  -> live settlement
```

## Current recovery shortcut

```txt
parent record absent
Agriculture child record present
  -> write parent record from Agriculture result
  -> return recovered success
```

This path does not require:

```txt
paired Inventory child record
resource-delta fingerprint
current Inventory balance proof
matching Agriculture plan ID
matching actor, plot and predecessor revision
legacy-ledger classification
save generation
session generation
```

## Required admission result

```txt
AgricultureRecoveryAdmissionResult
  accepted: boolean
  reason
  transactionId
  expectedParentLedger
  expectedInventoryChildId
  expectedAgricultureChildId
  expectedResourceDelta
  actualInventoryRecord
  actualAgricultureRecord
  participantParity
  stateParity
  legacyClassification
  recoveryPolicy
```

## Rules

1. A missing parent record is not sufficient evidence of a recoverable transaction.
2. Recovery must prove every required child record and participant mutation.
3. Conflicting or incomplete history enters `indeterminate` or `quarantined-legacy`, not success.
4. Reconciliation must be repeat-safe and carry its own operation identity.
5. New gameplay input is blocked for the affected plot while reconciliation is unresolved.
6. Save and frame projection cannot report success before recovery commits.

## Compatibility alias

`engine.n.cozyFarming` currently points directly to `engine.n.agriculture`. This preserves a property name but not the old farming API contract. Any retained compatibility surface needs an explicit adapter schema, deprecation state and typed unsupported-operation result.