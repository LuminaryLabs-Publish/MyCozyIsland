# Deploy Audit: Multi-Domain Transaction Failure Fixture Gate

Timestamp: `2026-07-12T10-20-02-04-00`

## Current gate

`package.json` runs the established static, world, render, camera, foam and disposal tests. It does not invoke:

```txt
tests/adventure-domains-smoke.mjs
tests/core-transaction-ledger-smoke.mjs
```

The first proves only the happy-path adventure loop. The second proves only standalone core-ledger duplicate reuse and snapshot restore.

## Missing release gate

A deploy should not be considered transaction-safe until CI runs deterministic product failure fixtures for:

```txt
plant: fail after seed removal
harvest: fail after inventory reward
forage: fail after coconut reward
forage: fail between coconut and sprout reward
fail before parent ledger record
save while transaction is incomplete
restore incomplete transaction family
retry same transaction ID
retry new command ID
first visible frame after commit or rollback
```

## Required matrix

```txt
Node headless product-domain fixtures
  -> exact participant and ledger snapshots

WebGL2 browser smoke
  -> no visible partial state
  -> save blocked during incomplete transaction

WebGPU browser smoke
  -> same transaction/frame revision as WebGL2

Pages smoke
  -> committed action survives reload
  -> incomplete action is reconciled or rejected
```

## Gate outputs

```txt
transaction fixture result
participant parity result
ledger parity result
save admission result
rollback receipt set
first transaction frame acknowledgement
backend parity result
```

## Current validation

No workflow, package script or runtime source changed. No fixture was executed. Transaction-safe deployment is not proven.