# Next steps: MyCozyIsland save, world and content compatibility

**Timestamp:** `2026-07-16T05-41-12-04-00`  
**Status:** `save-world-content-compatibility-admission-authority-audited`

## Summary

Add one release-aware save compatibility boundary before restore mutates any participant. Exact-compatible saves may load directly; all other saves must follow a registered migration, world rebuild, quarantine or new-island fallback path.

## Plan ledger

**Goal:** make save upgrades deterministic, topology-aware and bound to one accepted restored world frame.

- [ ] Define a save release manifest containing product, world-generation, config, content, dependency and participant-schema identities.
- [ ] Add stable digests for `COZY_WORLD_CONFIG`, item definitions, crop definitions and the tropical Agriculture content pack.
- [ ] Record installed DSK IDs, versions and participant schema fingerprints.
- [ ] Extend the save envelope without silently invalidating existing v1/v2 migration behavior.
- [ ] Compare the save manifest with the current release before participant mutation.
- [ ] Classify each envelope as exact, migratable, rebuild-required, incompatible or corrupt.
- [ ] Add one deterministic migration graph with explicit source and destination manifests.
- [ ] Rebuild the world runtime model when the accepted save requires a different compatible model.
- [ ] Rebind Core Object descriptors, Agriculture plots and Foraging nodes to the accepted topology.
- [ ] Validate transaction-ledger records against the installed participant contracts.
- [ ] Validate the restored player position against the accepted terrain and apply only an authored safe-relocation policy.
- [ ] Allocate one `RestoreGeneration` and reject stale or duplicate restore callbacks.
- [ ] Stage all participant state and commit atomically or restore the prior generation.
- [ ] Preserve the original incompatible envelope in quarantine.
- [ ] Publish an explicit new-island or user-decision fallback result.
- [ ] Capture one canonical post-migration save after successful adoption.
- [ ] Publish `SaveCompatibilityAdmissionResult` and `RestoreGenerationResult`.
- [ ] Publish `FirstRestoredWorldFrameAck` with save, world, participant, renderer and frame revisions.
- [ ] Add source, built-artifact and Pages fixtures for changed world/content/domain releases.

## Minimal implementation order

```txt
1. release manifest and stable digests
2. save-envelope compatibility metadata
3. pre-mutation admission and result classes
4. migration graph
5. restore generation and staging
6. world-model rebuild
7. object, Agriculture and Foraging topology rebind
8. ledger and player-position validation
9. quarantine and fallback
10. canonical post-migration save
11. restored-frame acknowledgement
12. source, artifact and Pages fixtures
```

## Target files

```txt
src/adventure/definitions.js
src/adventure/world-domain.js
src/adventure/agriculture-config.js
src/adventure/resource-domains.js
src/adventure/persistence-render-domains.js
src/adventure/composition-runtime.js
src/main-adventure.js
tests/save-compatibility.fixture.mjs
tests/adventure-domains-smoke.mjs
package.json
.github/workflows/pages.yml
```

## Preserve

Do not move world generation into Save, crop rules into the migration coordinator, item balances into the renderer or GPU state into the portable envelope. Each owning domain validates and migrates its own state; the product compatibility authority only coordinates admission, ordering, rollback, fallback and restored-frame proof.