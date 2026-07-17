# START HERE: MyCozyIsland device input action coverage

**Last updated:** `2026-07-17T18-38-56-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous documentation head:** `3cf8b764c861e922413df41b847c7bdd93dc60af`  
**Status:** `device-input-action-coverage-semantic-command-authority-audited`

## Summary

MyCozyIsland has a complete keyboard gameplay path and touch pointer-drag camera look, but no touch-only movement, sprint, interaction, or seed-selection path. The visible hotbar is non-interactive, the HUD rejects pointer input, and compact-screen CSS hides the control legend.

The normalized input DSK interprets physical key codes into gameplay meaning instead of admitting source-neutral semantic actions. This is a source-backed device-action coverage gap; no desktop failure or mobile incident was reproduced.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
proposed device-input surfaces:        20
```

## Active authority proposal — not implemented

`cozy-island-device-input-action-coverage-semantic-command-authority-domain`

```txt
InputCapabilityManifestCommand
  -> declare required actions and available sources for the active device profile

SemanticActionAdmissionCommand
  -> admit source-neutral move, look, sprint, interact, seed, and intro actions

TouchControlProjectionCommand
  -> project reachable, labeled, safe-area-aware controls

InputSourceSettlementCommand
  -> arbitrate mixed sources and retire held actions exactly once

SemanticInputFrameCommitCommand
  -> InputFrameDigest
  -> FirstInputActionBoundFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T18-38-56-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T18-38-56-04-00-device-input-action-coverage-dsk-map.md`
4. `input-system-audit/2026-07-17T18-38-56-04-00-device-action-coverage-contract.md`
5. `render-audit/2026-07-17T18-38-56-04-00-touch-controls-visible-command-gap.md`
6. `gameplay-audit/2026-07-17T18-38-56-04-00-touch-only-gameplay-loop.md`
7. `interaction-audit/2026-07-17T18-38-56-04-00-semantic-action-command-result-map.md`
8. `deploy-audit/2026-07-17T18-38-56-04-00-mobile-input-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

The page-lifecycle, save-durability, menu-ready handoff, adaptive-quality, and pointer-look gesture audits remain unresolved in their timestamped audit families.

## Do not claim

Do not claim touch-complete gameplay, mobile-complete action coverage, mixed-input correctness, accessible control semantics, browser parity, artifact parity, Pages parity, or production readiness until executable fixtures pass.