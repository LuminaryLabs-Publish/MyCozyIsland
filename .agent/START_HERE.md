# START HERE: MyCozyIsland save, world and content compatibility

**Last updated:** `2026-07-16T05-41-12-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `75a1941e1305780b06276b15a3d9d8834f6a3530`  
**Status:** `save-world-content-compatibility-admission-authority-audited`

**Retained statuses:** `renderer-device-context-loss-recovery-authority-audited`, `accessible-hud-progress-interaction-projection-authority-audited`, `save-writer-lease-revision-admission-authority-audited`, `game-audio-event-projection-authority-audited`, `host-clock-fixed-step-simulation-authority-audited`, `device-control-surface-action-coverage-authority-audited`, `embed-context-route-admission-authority-audited`, `preload-suspension-lease-resume-frame-authority-audited`, `menu-postcard-atlas-frame-admission-audited`, `menu-failure-game-bootstrap-fallback-authority-audited`, `dual-surface-gpu-handoff-retirement-authority-audited`, `cross-window-preload-entry-protocol-authority-audited`, `threejs-menu-presentation-lifecycle-authority-central-reconciled`, `menu-game-preload-handoff-scheduler-authority-central-reconciled`, `core-startup-integration-central-reconciled`, `resource-settlement-recovery-authority-central-reconciled`, `public-runtime-capability-publication-central-reconciled`, `browser-page-lifecycle-authority-central-reconciled`, `adaptive-render-quality-transition-authority-audited`, `durable-save-commit-authority-audited`, `browser-input-authority-audited`

## Summary

MyCozyIsland validates save checksums and supports one v1-to-v2 Agriculture migration, but it does not admit a save against a complete world-generation, content-pack, dependency and participant-schema manifest. Restore loads participant snapshots into an already-created current world model, so future release changes lack an explicit reject, migrate, rebuild, quarantine or new-island decision and a first matching restored-frame acknowledgement.

## Plan ledger

**Goal:** make every restore prove that the save, current world model, installed content and visible frame belong to one compatible release generation.

- [x] Compare the full 11-repository Publish inventory with ten eligible ledgers.
- [x] Exclude TheCavalryOfRome.
- [x] Select only MyCozyIsland by the oldest synchronized timestamp.
- [x] Inspect save capture, validation, migration, restore and rollback.
- [x] Inspect world construction, snapshot loading, model queries, Agriculture/Foraging topology and render projection.
- [x] Preserve all 70 implemented surfaces.
- [x] Add the `2026-07-16T05-41-12-04-00` compatibility audit family.
- [ ] Implement compatibility manifests, migration/rebuild and executable fixtures.

## Interaction loop

```txt
current release boot
  -> construct current seeded world model
  -> install current Agriculture and Foraging topology
  -> discover local save
  -> validate checksum and save schema
  -> migrate v1 farming or accept v2
  -> load participant snapshots
  -> keep current closed-over world model and render base
  -> project current model plus restored participant state
  -> publish no compatibility or restored-frame result
```

## Active domains

```txt
routes and same-origin preload
Core Startup, Object and Transaction Ledger
seeded world and surface queries
input, Inventory, Agriculture and Foraging
player, scenario, interaction and camera
save capture, migration, restore and rollback
renderer-neutral static and frame snapshots
WebGPU/WebGL2 presentation and atmosphere
save-release compatibility admission
world/content topology migration and rebuild
restored visible-frame convergence
validation, build, Pages and central governance
```

## Census

```txt
engine-installed kits: 14
cataloged world/render/host kits: 50
composition kits: 1
browser/product adapters: 5
total implemented surfaces: 70
planned save-compatibility surfaces: 20
```

## Active authority

```txt
cozy-island-save-world-content-compatibility-admission-authority-domain
```

```txt
SaveCompatibilityAdmissionCommand
  -> bind save, product, world-generation, config, content,
     dependency and participant-schema identities
  -> classify exact, migratable, rebuild-required, incompatible or corrupt
  -> create one RestoreGeneration
  -> migrate/rebuild and commit participants atomically
  -> quarantine or fall back when required
  -> render one matching restored world frame
  -> publish FirstRestoredWorldFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T05-41-12-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T05-41-12-04-00-save-world-content-compatibility-dsk-map.md`
4. `save-compatibility-audit/2026-07-16T05-41-12-04-00-world-seed-content-migration-contract.md`
5. `gameplay-audit/2026-07-16T05-41-12-04-00-save-restore-world-version-loop.md`
6. `interaction-audit/2026-07-16T05-41-12-04-00-save-compatibility-command-result-map.md`
7. `render-audit/2026-07-16T05-41-12-04-00-restored-state-current-world-visible-frame-gap.md`
8. `deploy-audit/2026-07-16T05-41-12-04-00-save-compatibility-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Do not claim

Do not claim cross-version save compatibility, changed-world migration, content compatibility, world-model rebuild, topology rebind, incompatible-save safety, restored-frame convergence, artifact parity or production readiness until executable fixtures pass on `main`.