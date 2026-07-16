# Architecture audit: save, world and content compatibility DSK map

**Timestamp:** `2026-07-16T05-41-12-04-00`  
**Status:** `save-world-content-compatibility-admission-authority-audited`

## Summary

The installed domains correctly separate world, Inventory, Agriculture, Foraging, Player, Save and renderer-neutral snapshots. The missing boundary is a product authority that admits a save against the exact current world/content/domain release before participant mutation and visible projection.

## Plan ledger

**Goal:** define the smallest coordinating authority without moving domain truth into Save or the renderer.

- [x] Map current domain ownership.
- [x] Map save capture and restore dependencies.
- [x] Map current-model construction and snapshot loading.
- [x] Preserve all existing DSK ownership.
- [x] Define coordinating commands, results and receipts.
- [ ] Implement the authority and fixtures.

## Current DSK map

```txt
n:core-startup
  -> launch and first playable frame

n:core-object
  -> stable world object descriptors

n:core-transaction-ledger
  -> repeat-safe operation records

n:cozy-world
  -> current seeded model, surface queries, plots, forage layout and render base

n:cozy-inventory
  -> item balances and seed selection

n:production:agriculture
  -> current configured plots, crop lifecycle and harvest

n:cozy-foraging
  -> current wild-node availability and respawn

n:cozy-player / n:cozy-scenario / n:cozy-interaction / n:cozy-camera
  -> active adventure state

n:cozy-save
  -> checksum, v1-to-v2 migration, capture, ordered restore and rollback

n:cozy-render-snapshot
  -> current-model plus participant projection
```

## Existing restore graph

```txt
create current world model and current Agriculture config
  -> read save
  -> checksum validation
  -> schema v1/v2 decision
  -> load world resource snapshot
  -> load ledger and participants
  -> reset interaction
  -> return ok
  -> project current model plus restored participant state
```

## Missing authority

```txt
cozy-island-save-world-content-compatibility-admission-authority-domain
```

This authority coordinates identities and settlement only. It does not own terrain generation, crop rules, item balances, forage rules, save transport or GPU resources.

## Command/result map

```txt
SaveCompatibilityAdmissionCommand
  inputs:
    save schema and checksum
    product release identity
    world-generation version
    world-config digest
    content-pack digest
    installed DSK/schema fingerprints
    dependency revisions

  result classes:
    exact-compatible
    compatible-with-migration
    rebuild-required
    incompatible
    corrupt
    stale

RestoreGenerationCommand
  -> choose migration/rebuild graph
  -> stage participant snapshots
  -> rebuild/rebind world topology when required
  -> commit atomically or restore prior generation
  -> publish RestoreGenerationResult

RestoredFrameProjectionCommand
  -> require accepted RestoreGeneration
  -> project matching model and participant revisions
  -> publish FirstRestoredWorldFrameAck
```

## Planned surfaces

```txt
save-release-manifest-kit
world-generation-version-kit
world-config-digest-kit
content-pack-identity-kit
dependency-contract-fingerprint-kit
participant-schema-fingerprint-kit
save-compatibility-admission-kit
save-migration-graph-kit
world-model-rebuild-kit
agriculture-layout-rebind-kit
foraging-layout-rebind-kit
object-registry-rebind-kit
transaction-ledger-compatibility-kit
incompatible-save-quarantine-kit
new-island-fallback-kit
restore-generation-identity-kit
stale-restore-rejection-kit
restored-frame-convergence-kit
first-restored-world-frame-ack-kit
save-compatibility-source-build-pages-fixture-kit
```

## Ownership rule

World rebuilds the model. Agriculture and Foraging validate or migrate their own snapshots. Core Transaction Ledger preserves operation identity. Save orchestrates the accepted migration graph. Render Snapshot projects only an accepted restore generation.