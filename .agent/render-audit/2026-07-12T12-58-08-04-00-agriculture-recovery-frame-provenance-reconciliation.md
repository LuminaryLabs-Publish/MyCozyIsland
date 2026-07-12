# Render Audit: Agriculture Recovery Frame Provenance Reconciliation

Timestamp: `2026-07-12T12-58-08-04-00`

## Current projection loop

```txt
committed or recovered domain state
  -> cozy-render-snapshot-domain-kit
  -> Agriculture descriptors and plot revisions
  -> HUD interaction result
  -> WebGPU/WebGL2 renderer
  -> visible crop, soil and inventory frame
```

## Existing evidence

- Render snapshots use the official Agriculture domain as crop-state authority.
- Agriculture and Inventory revisions are observable.
- The renderer remains descriptor-driven and does not own gameplay state.
- WebGPU and WebGL2 share the same renderer-neutral snapshot source.

## Remaining gap

The frame does not identify the product Agriculture transaction or recovery generation that authorized it.

```txt
present:
  Agriculture revision
  Inventory revision
  plot descriptors
  HUD lastAction

absent:
  product transaction ID
  parent and child record IDs
  resource-delta fingerprint
  event publication receipt
  rollback/reconciliation result
  recovery generation
  save transaction revision
  render transaction revision
  first visible frame acknowledgement
```

A snapshot rollback can restore participant payloads after an exception while queued events, ECS journal rows and revision/sequence changes remain observable. The next rendered frame can therefore look restored without proving that state, ledger history, events and HUD all represent the same recovery boundary.

## Required frame contract

```txt
AgricultureTransactionResult
  -> committed or reconciled transaction revision
  -> participant and record receipts
  -> Agriculture event publication receipt
  -> renderer-neutral snapshot admission
  -> backend presentation result
  -> FirstAgricultureFrameAck
```

The acknowledgement must include:

```txt
runtime session ID
transaction or recovery generation
Agriculture revision
Inventory revision
parent and child record fingerprints
resource-delta fingerprint
render snapshot revision
backend identity
presented frame identity
```

## Acceptance criteria

1. A failed candidate transaction cannot produce a committed crop/HUD frame.
2. A recovered frame cites a declared recovery generation rather than silently reusing predecessor identity.
3. Save, HUD, WebGPU and WebGL2 projections agree on one committed transaction revision.
4. The first visible frame after plant, water, harvest or recovery acknowledges the exact result that authorized it.
5. Backend parity fixtures compare transaction/recovery identity as well as pixels or descriptors.

## Validation boundary

Documentation only. No render source, shader, backend, snapshot schema or visible output was changed.