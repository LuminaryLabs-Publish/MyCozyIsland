# Deploy audit: save compatibility browser fixture gate

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

Current tests prove successful same-version restore and one legacy schema migration. Release readiness also requires browser, built-artifact and Pages fixtures that exercise changed world/content identities and verify reject, migrate, rebuild or fallback behavior.

## Plan ledger

**Goal:** define the executable gate for save compatibility across source, artifact and deployed Pages.

- [x] Record existing same-version smoke coverage.
- [x] Identify missing cross-version and topology fixtures.
- [x] Define required artifact and Pages parity checks.
- [ ] Implement and run the fixtures.

## Required fixtures

```txt
same-manifest exact restore
changed world seed
changed world-config dimensions
changed farm rows/columns and plot IDs
changed forage-node topology
changed terrain/vegetation generation version
removed or renamed item
removed or changed crop definition
changed Agriculture content-pack version
changed DSK participant schema
changed NexusEngine/NexusEngine-Kits contract revision
registered deterministic migration
unregistered incompatibility
corrupt checksum
stale duplicate restore command
restore rollback after injected participant failure
quarantine and new-island fallback
first restored visible frame
```

## Assertions

Each fixture must prove:

```txt
one compatibility classification
no participant mutation before admission
one restore generation
atomic participant commit or rollback
model and topology rebuild when required
no silent blending of incompatible state
stable terminal receipt for duplicates
matching renderer-neutral snapshot
FirstRestoredWorldFrameAck
canonical post-migration save
```

## Environments

```txt
source modules
assembled/static artifact
GitHub Pages deployed origin
WebGPU path
WebGL2 fallback path
menu hidden-preload path
direct game route
```

## Current status

No cross-version, changed-seed, changed-layout, changed-content, incompatible-save, quarantine, fallback or restored-frame fixture has been executed. Deployment parity is unproven.