# START HERE: MyCozyIsland gameplay adaptive-quality recovery

**Last updated:** `2026-07-18T06-40-59-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous documentation head:** `776fbcc3a258bf3a6f9f038a63be689ee80aefe3`  
**Status:** `gameplay-adaptive-quality-recovery-parity-authority-audited`

## Summary

The gameplay adaptive-quality budget has symmetric cloud and fog projection, but asymmetric renderer-resolution projection. Degradation reduces renderer pixel ratio; recovery does not restore it. A recovered logical level can therefore coexist with a still-degraded drawing buffer.

This is source-backed control-flow evidence. No browser performance incident, pixel-quality regression or deployed-origin defect was reproduced.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
proposed adaptive-quality surfaces:     20
```

## Active authority proposal — not implemented

`cozy-island-gameplay-adaptive-quality-recovery-parity-authority-domain`

```txt
AdaptiveQualitySampleCommand
  -> AdaptiveQualitySampleResult

QualityTransitionAdmissionCommand
  -> QualityTransitionAdmissionResult

QualityEffectPlanCommand
  -> complete cloud, fog and renderer effect plan
  -> QualityEffectPlanResult

QualityTransitionSettlementCommand
  -> applied-state readback
  -> QualityTransitionSettlementResult

QualityProjectionCommitCommand
  -> AdaptiveQualityFrameDigest
  -> FirstAdaptiveQualityBoundFrameAck
```

The smallest safe runtime correction is one shared `applyQualityLevel(level)` path used by degradation, recovery and resize reconciliation.

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-18T06-40-59-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-18T06-40-59-04-00-gameplay-adaptive-quality-recovery-dsk-map.md`
4. `performance-system-audit/2026-07-18T06-40-59-04-00-adaptive-quality-recovery-contract.md`
5. `render-audit/2026-07-18T06-40-59-04-00-pixel-ratio-recovery-parity-gap.md`
6. `gameplay-audit/2026-07-18T06-40-59-04-00-adaptive-quality-frame-loop.md`
7. `interaction-audit/2026-07-18T06-40-59-04-00-quality-transition-command-result-map.md`
8. `deploy-audit/2026-07-18T06-40-59-04-00-quality-degrade-recover-browser-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

Device-input coverage, page lifecycle, save durability, menu-ready handoff, menu adaptive quality and pointer-look gesture audits remain unresolved in their timestamped audit families.

## Do not claim

Do not claim adaptive-quality recovery parity, restored physical resolution, measured performance improvement, browser parity, artifact parity, Pages parity or production readiness until executable transition and frame fixtures pass.