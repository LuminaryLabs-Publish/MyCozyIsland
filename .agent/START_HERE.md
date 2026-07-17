# START HERE: MyCozyIsland menu preload-to-ready handoff

**Last updated:** `2026-07-17T01-39-36-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Status:** `menu-preload-ready-presentation-handoff-authority-audited`

## Summary

The current menu is a direct particle-first WebGPU/WebGL2 presentation with no bloom or dynamic shadows. During background preload it targets 24 rendered FPS and caps DPR at one; after the game reports ready it restores the selected quality DPR cap and targets 30 FPS.

The unresolved handoff is ordering: `markReady()` requests the ready presentation transition and immediately enables Play. No first frame proves that the ready DPR, viewport and frame mode reached the canvas before entry can begin.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned ready-handoff surfaces:        18
```

## Active authority proposal

`cozy-island-menu-preload-ready-presentation-handoff-authority-domain`

```txt
GamePreloadReadyAdmissionCommand
  -> admit one session-bound game-ready result

MenuPresentationBudgetTransitionCommand
  -> settle preload DPR/frame policy into ready policy

ReadyMenuFrameCommitCommand
  -> render the accepted ready generation
  -> publish FirstReadyMenuFrameAck

PlayGateAdmissionCommand
  -> enable Play only for the matching ready frame

EntryHandoffCommand
  -> resume the game and retire the menu exactly once
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T01-39-36-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T01-39-36-04-00-menu-preload-ready-handoff-dsk-map.md`
4. `menu-handoff-audit/2026-07-17T01-39-36-04-00-preload-ready-presentation-contract.md`
5. `render-audit/2026-07-17T01-39-36-04-00-ready-budget-first-frame-gap.md`
6. `gameplay-audit/2026-07-17T01-39-36-04-00-preload-ready-play-entry-loop.md`
7. `interaction-audit/2026-07-17T01-39-36-04-00-ready-handoff-command-result-map.md`
8. `deploy-audit/2026-07-17T01-39-36-04-00-ready-handoff-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

The prior adaptive-quality and pointer-look gesture authority audits remain unresolved and retained in their timestamped audit families.

## Do not claim

Do not claim first-ready-frame convergence, Play-gate convergence, stale-ready rejection, duplicate-ready safety, entry-generation correctness, browser parity, artifact parity, Pages parity or production readiness until executable fixtures pass.