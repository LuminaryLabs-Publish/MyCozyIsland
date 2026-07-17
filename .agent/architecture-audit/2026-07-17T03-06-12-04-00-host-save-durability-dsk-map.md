# Architecture audit — Host save durability DSK map

**Timestamp:** `2026-07-17T03-06-12-04-00`

## Current ownership

```txt
n:cozy-save
  capture
  checksum validation
  migration
  restore and rollback
  reset
  durable fingerprint

browser host in src/main-adventure.js
  localStorage getItem
  localStorage setItem
  five-second autosave cadence
  pagehide flush
  HUD status projection
```

The save domain correctly declares `hostPersistence: adapter-owned`, but the adapter has no typed service boundary. `capture()` mutates domain status before the host persistence effect settles.

## Required parent domain

`cozy-island-host-save-commit-durability-projection-authority-domain`

## Proposed DSK map

```txt
n:cozy-save
  -> save-envelope-capture-result-kit
  -> save-generation-identity-kit

n:cozy-save:host-commit
  -> host-storage-capability-kit
  -> host-save-admission-kit
  -> local-storage-commit-adapter-kit
  -> save-commit-receipt-kit

n:cozy-save:durability
  -> durable-fingerprint-binding-kit
  -> save-state-settlement-kit
  -> save-error-retention-kit
  -> save-retry-policy-kit
  -> stale-save-result-rejection-kit
  -> duplicate-save-result-kit

n:cozy-save:presentation
  -> save-status-projection-kit
  -> first-durable-save-status-frame-ack-kit

n:cozy-save:lifecycle
  -> page-lifecycle-save-kit
  -> corrupted-save-quarantine-kit

n:cozy-save:proof
  -> browser-storage-failure-fixture-kit
  -> artifact-pages-save-fixture-kit
```

## Contract rule

In-memory envelope capture is not durable persistence. Only an admitted `HostSaveCommitResult` may advance the last durable digest or project `Saved`.
