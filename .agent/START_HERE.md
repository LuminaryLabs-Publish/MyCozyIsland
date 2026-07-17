# START HERE: MyCozyIsland page lifecycle retirement

**Last updated:** `2026-07-17T08-01-59-04-00`  
**Repository:** `LuminaryLabs-Publish/MyCozyIsland`  
**Branch:** `main`  
**Reviewed runtime revision:** `347c78f358994822f9fedf91c3e16d33d6909e7e`  
**Previous documentation head:** `9f2543ed2d6aa346ce5339a3eb215ba1c452dbd0`  
**Status:** `page-lifecycle-runtime-suspension-retirement-authority-audited`

## Summary

MyCozyIsland has explicit menu-renderer disposal and a gameplay child-renderer disposal helper, but the active game host has no single page-lifecycle authority. Its `pagehide` listener saves and disposes only `gameplayRenderer`; it does not classify BFCache persistence, stop the main animation loop, clear input, remove host listeners, retire the startup host, dispose the renderer or settle the remaining scene, atmosphere and post-processing resources.

A BFCache restore can therefore resume a partially disposed generation, while a terminal unload can leave ownership without an exact retirement receipt. This is a source-backed lifecycle and resource-ownership gap; no browser crash or production leak was reproduced.

## Census

```txt
engine-installed core/adventure kits: 14
cataloged world/render/host kits:     50
additional composition kits:           1
explicit menu domain/kit surfaces:     16
other browser/product adapters:         4
total implemented surfaces:            85
planned lifecycle surfaces:            19
```

## Active authority proposal

`cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

```txt
PageLifecycleAdmissionCommand
  -> classify hidden, pagehide-persisted, pagehide-terminal or pageshow-persisted
  -> bind host, runtime, renderer and save generations

RuntimeSuspensionCommand
  -> pause the loop, clear held input and retain restart-safe BFCache resources

RuntimeRetirementCommand
  -> stop stale callbacks, settle save, remove listeners and dispose owned resources once

RuntimeResumeCommand
  -> validate retained resources, rebase the clock and restore the accepted generation
  -> publish FirstResumedFrameAck
```

## Read this run first

1. `current-audit.md`
2. `trackers/2026-07-17T08-01-59-04-00/project-breakdown.md`
3. `architecture-audit/2026-07-17T08-01-59-04-00-page-lifecycle-retirement-dsk-map.md`
4. `runtime-lifecycle-audit/2026-07-17T08-01-59-04-00-suspension-retirement-resume-contract.md`
5. `render-audit/2026-07-17T08-01-59-04-00-bfcache-disposed-child-resume-gap.md`
6. `gameplay-audit/2026-07-17T08-01-59-04-00-pagehide-resume-gameplay-loop.md`
7. `interaction-audit/2026-07-17T08-01-59-04-00-page-lifecycle-command-result-map.md`
8. `deploy-audit/2026-07-17T08-01-59-04-00-bfcache-browser-fixture-gate.md`
9. `next-steps.md`
10. `known-gaps.md`
11. `validation.md`

## Retained audit state

The save-durability, menu ready-handoff, adaptive-quality and pointer-look gesture audits remain unresolved in their timestamped audit families.

## Do not claim

Do not claim BFCache safety, complete runtime retirement, resource-leak freedom, clock-resume correctness, durable page-retirement saves, artifact parity, Pages parity or production readiness until executable fixtures pass.
