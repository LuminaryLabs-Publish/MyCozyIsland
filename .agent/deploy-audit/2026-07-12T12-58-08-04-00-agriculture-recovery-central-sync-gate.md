# Deploy Audit: Agriculture Recovery Central Sync Gate

Timestamp: `2026-07-12T12-58-08-04-00`

## Current deployment surface

```txt
npm test
  -> adventure Agriculture smoke

GitHub Actions
  -> npm install --ignore-scripts
  -> npm test

GitHub Pages
  -> static browser application
  -> WebGPU primary / WebGL2 fallback
```

## Existing proof

The current source includes happy-path assertions for:

```txt
official Agriculture installation
absence of the old farming domain
annual crop lifecycle
perennial coconut regrowth
wild coconut Foraging separation
save-v2 round trip
synthetic save-v1 farming-state migration
Agriculture render descriptors
```

## Missing deployment gates

```txt
failure after Inventory settlement
failure after Agriculture state mutation
failure after event enqueue
event-queue rollback parity
ECS-journal rollback parity
missing Inventory child recovery
conflicting resource-delta recovery
authentic pre-cutover save and ledger migration
post-migration exactly-once retry
save during indeterminate transaction
transaction/recovery-to-first-visible-frame proof
WebGPU/WebGL2 recovery-revision parity
Pages restored-save smoke
```

## Required gate order

```txt
source and schema checks
  -> headless happy path
  -> failure-injection transaction fixtures
  -> event and journal rollback fixtures
  -> partial-history reconciliation fixtures
  -> authentic legacy migration fixtures
  -> save/render transaction-revision fixtures
  -> WebGPU and WebGL2 browser parity
  -> deployed Pages restored-save smoke
```

## Promotion rule

Do not describe Agriculture cutover recovery as atomic, exactly-once, migration-complete or frame-proven until the corresponding executable fixture passes and its result is recorded in `.agent/validation.md` and the central ledger.

## Validation boundary

No workflow, package script, dependency, runtime source or deployment configuration was changed in this documentation run. No command or Pages result is claimed.