# START HERE: MyCozyIsland host save durability

**Last updated:** `2026-07-17T03-06-12-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Status:** `host-save-commit-durability-projection-authority-audited`

## Summary

MyCozyIsland has a versioned, checksum-protected and rollback-safe save domain. The unresolved boundary is host durability: `cozySave.capture()` marks the domain as captured before `localStorage.setItem` succeeds, while the HUD renders `Saved` from that capture status.

A failed storage write is returned only from the browser helper. The engine save state can remain captured, its error remains clear, and the visible HUD can still say `Saved` even though the host retained the previous durable fingerprint.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned save-durability surfaces:       18
```

## Active authority proposal

`cozy-island-host-save-commit-durability-projection-authority-domain`

```txt
SaveEnvelopeCaptureCommand
  -> produce an immutable envelope without claiming persistence

HostSaveCommitCommand
  -> execute and receipt one browser storage commit

SaveDurabilitySettlementCommand
  -> advance the durable digest only from the matching persisted result

SaveStatusProjectionCommand
  -> project saving, saved, failed or unavailable
  -> publish FirstDurableSaveStatusFrameAck

PageLifecycleSaveCommand
  -> settle one apply-once retirement save attempt
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T03-06-12-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T03-06-12-04-00-host-save-durability-dsk-map.md`
4. `save-system-audit/2026-07-17T03-06-12-04-00-host-persistence-settlement-contract.md`
5. `render-audit/2026-07-17T03-06-12-04-00-saved-label-without-durable-receipt-gap.md`
6. `gameplay-audit/2026-07-17T03-06-12-04-00-autosave-capture-commit-loop.md`
7. `interaction-audit/2026-07-17T03-06-12-04-00-save-commit-command-result-map.md`
8. `deploy-audit/2026-07-17T03-06-12-04-00-storage-failure-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

The menu ready-handoff, adaptive-quality and pointer-look gesture authority audits remain unresolved in their timestamped audit families.

## Do not claim

Do not claim durable-save correctness, storage-failure resilience, HUD convergence, page-retirement correctness, artifact parity, Pages parity or production readiness until executable fixtures pass.
