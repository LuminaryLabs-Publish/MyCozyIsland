# Agriculture Cutover Audit: Central Ledger Reconciliation

Timestamp: `2026-07-12T12-58-08-04-00`

## Reconciled source state

```txt
runtime cutover commit:
  6b642344d2875f76eef1184111793ff0e206109f

official provider:
  n:production:agriculture

removed installed authority:
  cozy-farming-domain-kit

current repo-local audit family:
  2026-07-12T12-50-46-04-00

previous central ledger boundary:
  2026-07-12T10-20-02-04-00
```

## Ownership result

The cutover follows the intended NexusEngine composition model:

- Agriculture owns reusable agricultural meaning.
- Inventory owns product balances and resource settlement.
- Foraging owns wild coconuts.
- World owns the procedural island and farm layout.
- Interaction coordinates product actions.
- Save owns portable capture and migration policy.
- Render Snapshot exposes descriptors.
- Browser and renderer adapters own storage transport and presentation implementation.

No executable `n:production` parent kit is required.

## Recovery finding

The current product adapter performs a best-effort snapshot reload after failure, but recovery is not effect-complete.

```txt
state payloads can reload
queued Agriculture events cannot retract
ECS journal candidate rows cannot retract
Inventory and ledger snapshot loading advances observation sequence
Agriculture child history can authorize parent recovery alone
legacy cozy-farming ledger records remain untranslated
```

## Required classification

Every failed or incomplete action must end in one typed state:

```txt
rejected
committed
rolled-back
reconciled
quarantined-legacy
indeterminate
```

No retry, save, render or parent-record recovery should proceed until the classification and its participant receipts are durable.

## Central tracking requirement

The `LuminaryLabs-Dev/LuminaryLabs` ledger must record:

- selection evidence,
- the official Agriculture cutover,
- the 13 installed kits and 64 total source-backed kit surfaces,
- the full interaction loop,
- domain and service ownership,
- the recovery/event/migration/frame findings,
- all new timestamped `.agent` paths,
- the documentation-only validation boundary,
- the final repo-local head.

## Result

This audit synchronizes documentation only. It does not claim that rollback, event suppression, partial-history recovery, legacy-ledger migration or visible-frame provenance is implemented.