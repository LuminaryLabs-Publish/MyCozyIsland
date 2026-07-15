# Architecture audit: save-writer lease and revision DSK map

**Timestamp:** `2026-07-15T15-01-22-04-00`  
**Status:** `save-writer-lease-revision-admission-authority-audited`

## Summary

Portable capture is domain-owned and durable storage is host-owned. The missing boundary is a shared-slot authority between them.

## Plan ledger

**Goal:** define semantic ownership for multi-document save admission.

- [x] Keep gameplay domains authoritative for world state.
- [x] Keep `cozy-save-domain-kit` authoritative for portable capture/restore.
- [x] Keep browser storage effects in an adapter.
- [x] Add slot-head, writer-lease and conflict-result services between capture and storage.
- [ ] Implement and prove the boundary.

## Domain map

```txt
simulation domains
  -> cozy-save-domain-kit
     -> SaveCandidate

save-writer authority
  -> document identity
  -> writer session and lease
  -> slot-head revision
  -> base-revision validation
  -> compare-and-swap admission
  -> conflict/stale result
  -> durable readback receipt

browser persistence adapter
  -> localStorage / future IndexedDB effect
  -> storage-event head observation
  -> pagehide lease release

presentation
  -> SaveCommitResult
  -> truthful HUD status
  -> FirstDurableSaveFrameAck
```

## Existing ownership

The repository retains 14 engine-installed kits, 50 cataloged world/render/host kits, one ocean-composition kit and five browser/product adapters. Their complete IDs and services are preserved in the timestamped tracker and `.agent/kit-registry.json`.

## Required parent domain

```txt
cozy-island-save-writer-lease-revision-authority-domain
```

```txt
SaveCommitCommand
  -> bind slot, document, writer, lease, commit and base revision
  -> classify active, preload, suspended and retiring writers
  -> verify current head and compare-and-swap one revision
  -> reject stale, duplicate, expired and read-only work
  -> verify durable readback
  -> publish commit/conflict results and visible-frame acknowledgement
```

## Planned surfaces

```txt
save-document-identity-kit
save-writer-session-kit
save-slot-head-revision-kit
save-candidate-base-revision-kit
writer-lease-admission-kit
writer-lease-heartbeat-expiry-kit
preload-readonly-save-policy-kit
storage-head-observer-kit
cross-document-head-sync-kit
stale-write-rejection-kit
compare-and-swap-save-commit-kit
predecessor-readback-verification-kit
save-conflict-result-kit
pagehide-save-policy-kit
writer-retirement-kit
save-commit-result-kit
first-durable-save-frame-ack-kit
multi-tab-conflict-fixture-kit
hidden-preload-stale-writer-fixture-kit
source-build-pages-save-parity-kit
```
