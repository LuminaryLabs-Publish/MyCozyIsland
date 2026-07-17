# START HERE: MyCozyIsland menu adaptive quality

**Last updated:** `2026-07-16T21-38-30-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `c280f86a7057532bcd4815cd4270846a84effd8a`  
**Status:** `menu-frame-budget-adaptive-quality-authority-audited`

## Summary

The new WebGPU-first menu uses a declarative scene recipe and three quality tiers. The tier is selected once from startup backend, viewport, DPR and CPU-concurrency heuristics. Resize changes dimensions and responsive framing but reuses the original tier and tier-bound resources. The frame loop supplies no sustained CPU/GPU budget evidence, quality transition result or first matching frame acknowledgement.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     15
other browser/product adapters:         4
total implemented surfaces:            84
planned menu quality surfaces:          18
```

## Active authority proposal

`cozy-island-menu-frame-budget-adaptive-quality-authority-domain`

```txt
MenuQualityAdmissionCommand
  -> admit backend, viewport, DPR, hardware and recipe revisions

MenuFrameBudgetEvidenceCommand
  -> collect bounded CPU/GPU and missed-frame evidence
  -> exclude hidden, disposed and entering periods

MenuQualityTransitionCommand
  -> apply sustained overload/recovery hysteresis
  -> stage and retire quality-bound resources exactly once

MenuQualityFrameCommitCommand
  -> render one accepted quality generation
  -> publish FirstMenuQualityBoundFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-16T21-38-30-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-16T21-38-30-04-00-menu-adaptive-quality-dsk-map.md`
4. `menu-quality-audit/2026-07-16T21-38-30-04-00-frame-budget-transition-contract.md`
5. `render-audit/2026-07-16T21-38-30-04-00-static-tier-visible-frame-gap.md`
6. `gameplay-audit/2026-07-16T21-38-30-04-00-menu-readiness-frame-budget-loop.md`
7. `interaction-audit/2026-07-16T21-38-30-04-00-menu-quality-command-result-map.md`
8. `deploy-audit/2026-07-16T21-38-30-04-00-menu-quality-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

Prior pointer gesture, lifecycle, startup, save, rendering, accessibility, input and deployment audits remain retained in the historical `.agent` folders and machine registry.

## Do not claim

Do not claim runtime adaptive menu quality, resize/DPR re-admission, overload recovery, transition hysteresis, first quality-bound frame convergence, artifact parity, Pages parity or production readiness until executable browser fixtures pass.