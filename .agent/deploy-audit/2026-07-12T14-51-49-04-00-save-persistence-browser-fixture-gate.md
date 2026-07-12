# Deploy Audit: Save Persistence Browser Fixture Gate

Timestamp: `2026-07-12T14-51-49-04-00`

## Summary

The existing Node smoke validates engine-level capture and restore but does not exercise the browser storage adapter. Deployment confidence requires a browser matrix for durability, corruption, conflicts, lifecycle and first-frame provenance.

## Plan ledger

**Goal:** block persistence release claims until browser and Pages fixtures prove truthful save commit and restore behavior.

- [x] Identify existing Node test coverage.
- [x] Identify missing browser storage coverage.
- [x] Define local-browser fixture matrix.
- [x] Define built/Pages smoke matrix.
- [ ] Implement the fixture harness later.

## Existing proof

```txt
npm test
  -> tests/adventure-domains-smoke.mjs
  -> official Agriculture installed
  -> annual and perennial crop paths
  -> wild Foraging separation
  -> engine save-v2 round trip
  -> synthetic save-v1 migration
```

This test does not instantiate `window`, `localStorage`, page lifecycle, multiple tabs or the WebGPU/WebGL2 host.

## Required local browser fixtures

### Commit truth

- dirty state writes a new verified storage generation.
- HUD says `Saved` only after verified commit.
- unchanged state returns a no-op without capture count inflation.
- quota/security failure retains dirty state and projects failure.
- readback corruption preserves the predecessor.

### Restore and quarantine

- valid active generation restores and produces first-frame receipt.
- corrupt active generation is quarantined and valid backup restores.
- unsupported schema is quarantined with a typed result.
- legacy `.v1` key migrates to canonical storage with a receipt.
- rollback failure returns `restore-rollback-failed`, never `rolledBack: true`.

### Conflict

- two tabs from one predecessor cannot silently overwrite.
- stale writer lease is rejected.
- storage-event observation updates conflict state.
- explicit replacement policy creates a new generation.

### Lifecycle

- visibility-hidden flush follows policy.
- pagehide commits within the supported synchronous budget.
- bfcache pageshow rearms a fresh lifecycle generation.
- second pagehide after bfcache is handled.
- stale predecessor callbacks cannot commit.

### Reset

- reset immediately commits a baseline or tombstone.
- crash/reload after reset cannot resurrect the old record.
- duplicate reset returns the prior committed result.

### Presentation

- WebGPU and WebGL2 project identical save status fields.
- first restored frame cites restore and storage generation.
- first reset frame cites reset commit generation.

## Required Pages smoke

```txt
open deployed game
  -> make a durable gameplay change
  -> wait for committed save status
  -> reload
  -> verify restored world and first-frame receipt
  -> simulate corrupt active record with retained backup
  -> reload and verify recovery status
  -> verify no console error or stale Saved state
```

## Release gate

Persistence can be described as durable only when:

```txt
browser commit truth fixtures pass
corruption/backup fixtures pass
multi-tab conflict fixtures pass
page lifecycle fixtures pass
reset durability fixtures pass
WebGPU/WebGL2 status parity passes
Pages round-trip and recovery smoke passes
```

## Current result

```txt
Node engine smoke: source exists, not run in this documentation turn
browser storage fixtures: not implemented
multi-tab fixtures: not implemented
bfcache fixtures: not implemented
Pages persistence smoke: not run
runtime or deployment source changed: no
```
