# Deploy Audit: Host Save Persistence Central Sync Gate

Timestamp: `2026-07-12T14-59-01-04-00`

## Summary

Static deployment does not prove browser save durability. The existing Node smoke bypasses localStorage, tab conflicts, page lifecycle behavior, bfcache restoration and deployed Pages storage conditions.

## Plan ledger

**Goal:** keep deployment readiness blocked until browser persistence transactions are executable and observable.

- [x] Record current documentation-only change boundary.
- [x] Preserve existing Node smoke as engine-level proof only.
- [x] Define browser and Pages persistence gates.
- [x] Define multi-tab and bfcache fixture requirements.
- [ ] Run the fixture matrix after implementation.

## Required fixture matrix

```txt
local browser
  quota/security write rejection
  serialization and readback mismatch
  staged write and active-pointer commit
  corrupt active record with valid backup
  canonical key migration
  reset followed by crash/reload
  restore rollback failure
  save-status HUD truth
  restore-to-first-frame acknowledgement

multi-tab
  predecessor checksum conflict
  writer lease acquisition/expiry
  stale writer rejection
  storage-event adoption

page lifecycle
  pagehide flush
  bfcache pageshow re-arm
  visibility suspension and resume

render backends
  WebGPU save/restore provenance
  WebGL2 save/restore provenance

GitHub Pages
  fresh save round trip
  reload restore
  corrupt-record recovery
  reset durability
  first restored-frame proof
```

## Current gate

```txt
npm test: not run
browser smoke: not run
multi-tab smoke: not run
bfcache smoke: not run
WebGPU/WebGL2 parity smoke: not run
Pages persistence smoke: not run
```

No deployment-readiness or durable-save claim is made.