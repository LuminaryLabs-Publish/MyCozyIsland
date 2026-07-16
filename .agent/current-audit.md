# Current audit: MyCozyIsland save, world and content compatibility

**Timestamp:** `2026-07-16T05-41-12-04-00`  
**Status:** `save-world-content-compatibility-admission-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `75a1941e1305780b06276b15a3d9d8834f6a3530`

## Summary

MyCozyIsland was selected after the current Publish comparison found no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository. Save v2 proves payload integrity and one legacy schema migration, but not compatibility with the current world-generation algorithm, world config, content pack, dependency revisions or installed participant schemas.

## Plan ledger

**Goal:** make restore compatibility an explicit admission result before participant mutation and visible gameplay projection.

- [x] Confirm selection and synchronization.
- [x] Inspect save capture, validation, migration, restore and rollback.
- [x] Inspect world-model construction and loadSnapshot behavior.
- [x] Inspect Agriculture, Foraging and render-snapshot adoption.
- [x] Preserve all kits and services.
- [x] Define 20 coordinating compatibility surfaces.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
prior timestamp: 2026-07-16T00-59-16-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-16T01-38-56-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Source-backed finding

`cozy-save-domain-kit` captures world, transaction ledger, scenario, Inventory, Agriculture, Foraging and Player state under `cozy-island-adventure-save/2`. The envelope contains `version: 1.0.0` and a checksum, but no complete release/world/content/participant compatibility manifest.

`validateEnvelope()` checks the checksum. `migrateSavePayload()` recognizes v1 and v2 only. Restore begins loading participants without first comparing world-generation, config, content or installed-domain fingerprints.

`createCozyWorldDomain()` constructs a closed-over runtime model from current `COZY_WORLD_CONFIG` before restore. `loadSnapshot()` merges saved state but forces the current configured ID and seed. `getRenderBase()`, `getPlots()`, `getForageNodes()`, `surfaceAt()` and movement constraints continue to use the current model rather than rebuilding from the accepted save.

Agriculture is installed from the current tropical config before restore. Render Snapshot then combines current model descriptors with restored participant state without a RestoreGeneration or compatibility revision.

The current same-version path is coherent under its fixed configuration. The gap concerns future release changes and lacks an executable mismatch reproduction.

## Interaction loop

```txt
boot current release
  -> create current world model and participant topology
  -> read save
  -> checksum and schema validation
  -> optional v1 farming migration
  -> ordered participant loads
  -> current model remains active
  -> first frame combines current model and restored state
  -> no compatibility result or restored-frame acknowledgement
```

## Domains and census

```txt
routes and preload
Core Startup, Object and Transaction Ledger
world, input, Inventory, Agriculture and Foraging
player, scenario, interaction, camera, save and render snapshots
WebGPU/WebGL2 presentation and atmosphere
save/world/content compatibility admission
migration, rebuild, quarantine and fallback
restored-frame convergence
build, Pages and central proof

implemented surfaces: 70
planned save-compatibility surfaces: 20
```

## Required authority

```txt
cozy-island-save-world-content-compatibility-admission-authority-domain
```

```txt
SaveCompatibilityAdmissionCommand
  -> bind save schema/checksum and release identities
  -> compare world generation, config, content, dependencies and participant schemas
  -> classify exact, migratable, rebuild-required, incompatible or corrupt
  -> create one RestoreGeneration
  -> migrate/rebuild/rebind participants atomically
  -> quarantine or fall back when required
  -> publish SaveCompatibilityAdmissionResult
  -> publish FirstRestoredWorldFrameAck
```

## Existing proof boundary

Current tests verify successful same-version Agriculture, Foraging, v2 save/restore and v1 migration. They do not change world seed/config, farm or forage topology, items/crops, DSK schemas or dependencies and then prove compatibility rejection, migration, rebuild, quarantine, fallback or a matching restored visible frame.