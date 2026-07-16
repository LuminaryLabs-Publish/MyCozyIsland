# Known gaps: MyCozyIsland save, world and content compatibility

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

Save integrity and one schema migration exist, but release, world, content and participant compatibility remain implicit. A checksum-valid save can be accepted without proving that the current runtime model has the same meaning and topology.

## Plan ledger

**Goal:** keep every compatibility and restored-frame blocker explicit until implementation and executable proof exist.

- [ ] No complete save release manifest.
- [ ] No world-generation algorithm identity in the save contract.
- [ ] No stable world-config digest admission.
- [ ] No terrain or vegetation generation contract digest.
- [ ] No farm-layout or forage-layout topology digest.
- [ ] No item-definition or crop-definition digest.
- [ ] No Agriculture content-pack compatibility identity.
- [ ] No NexusEngine or NexusEngine-Kits compatibility fingerprint.
- [ ] No installed DSK and participant-schema fingerprint set.
- [ ] Checksum validation proves integrity, not semantic compatibility.
- [ ] Migration supports v1 farming to v2 Agriculture only.
- [ ] No general deterministic migration graph.
- [ ] `cozyWorld.loadSnapshot()` forces the current configured world ID and seed.
- [ ] The closed-over current runtime model is not rebuilt from an accepted save.
- [ ] Current `renderBase`, plots, forage nodes, surface queries and movement constraints remain active after restore.
- [ ] Agriculture plot topology is not explicitly rebound or rejected.
- [ ] Foraging node topology is not explicitly rebound or rejected.
- [ ] Core Object descriptors are not reconciled with a restored topology.
- [ ] Restored player position is not compatibility-validated against a changed terrain model.
- [ ] Transaction-ledger records are not admitted against installed participant contract versions.
- [ ] No incompatible-save quarantine result.
- [ ] No authored new-island or user-decision fallback result.
- [ ] No `RestoreGeneration` identity or stale-restore rejection.
- [ ] No canonical post-migration save receipt.
- [ ] Render Snapshot has no compatibility or restore-generation revision.
- [ ] No `FirstRestoredWorldFrameAck`.
- [ ] No changed-seed, changed-layout, changed-content, changed-schema, artifact or Pages fixture.

## Important distinction

The current fixed release and same-version smoke path can remain coherent. These gaps concern future upgrade safety and evidence; they do not prove that an existing user save is currently corrupt or visibly mismatched.