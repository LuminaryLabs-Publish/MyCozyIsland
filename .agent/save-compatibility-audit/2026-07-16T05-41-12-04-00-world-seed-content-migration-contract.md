# Save compatibility audit: world seed, content and migration contract

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

A portable save must describe the release contract it was produced under, not only the participant values it contains. MyCozyIsland currently identifies save schema v2 and product version 1.0.0, but not the complete world/content/domain contract needed to prove future compatibility.

## Plan ledger

**Goal:** define the compatibility manifest and migration obligations required before any participant restore.

- [x] Identify current save envelope fields.
- [x] Identify current world and content identities.
- [x] Identify current participant topology.
- [x] Define compatibility classes and migration obligations.
- [ ] Implement manifest capture and restore admission.

## Required save release manifest

```txt
save schema
product release ID
world ID and seed
world-generation algorithm version
world-config digest
terrain/vegetation generation contract digest
farm-layout topology digest
forage-layout topology digest
item definition digest
crop definition and Agriculture content-pack digest
installed DSK IDs, versions and participant schema fingerprints
NexusEngine revision
NexusEngine-Kits revision
transaction-ledger schema
migration graph version
```

## Compatibility classes

```txt
exact-compatible
  all required identities match

migratable
  a registered deterministic migration path exists

rebuild-required
  saved durable state is compatible but the runtime model must be reconstructed

incompatible
  required content or participant meaning cannot be preserved

corrupt
  checksum or structural validation fails
```

## Migration contract

A migration must:

```txt
name source and destination manifests
be deterministic and repeat-safe
validate every participant before commit
preserve or explicitly retire operation identities
map or quarantine removed items, crops, plots and forage nodes
validate player position against the accepted world
rebuild object, world and render descriptors when required
publish a terminal migration receipt
produce one canonical post-migration save
```

## Fallback contract

An incompatible save must not be silently blended into the current island. The product must expose a typed quarantine, export, user-decision or new-island fallback result while retaining the original envelope unchanged.

## Current boundary

The current v1-to-v2 migration only translates legacy `farming` state into Agriculture. It is not a general release/world/content compatibility system.