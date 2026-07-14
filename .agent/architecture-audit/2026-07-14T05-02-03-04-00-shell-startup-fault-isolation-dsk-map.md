# Architecture audit: shell startup fault isolation DSK map

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The shell currently treats menu presentation preparation as an undeclared prerequisite of game preload. The target architecture separates shell bootstrap, optional menu presentation and primary game preload into independent participants with typed results.

## Plan ledger

**Goal:** define a narrow authority above the existing menu, preload bridge and Core Startup domains without moving their local responsibilities.

- [x] Preserve Core Startup as game-readiness authority.
- [x] Preserve the menu renderer as owner of menu-local GPU resources.
- [x] Preserve the preload bridge as owner of game sleep/resume manipulation.
- [x] Preserve the parent shell as owner of Play, progress, history and focus.
- [x] Add one composition boundary for attempt identity, fault classification and degraded entry.
- [ ] Implement the authority and participant receipts.

## Current graph

```txt
root-route adapter
  -> menu HTML
    -> Three.js WebGPU/TSL provider imports
      -> menu scene adapter
        -> renderer.init
        -> palm/sky/light construction
        -> RenderPipeline construction
        -> animation loop
        -> delayed startPreload
          -> game iframe
            -> Core Startup
            -> NexusEngine composition
            -> game renderer and first frame
```

The graph has an accidental hard dependency:

```txt
game-preload-attempt requires menu-presentation-success
```

No product contract declares that dependency, and the game route is capable of reporting its own backend, startup and first-frame result.

## Target graph

```txt
cozy-island-shell-startup-fault-isolation-authority-domain
  -> shell-generation-kit
  -> shell-bootstrap-command-kit
  -> startup-attempt-correlation-kit

  -> optional menu lane
     -> provider-import-admission-kit
     -> menu-presentation-attempt-kit
     -> renderer-initialization-result-kit
     -> render-pipeline-preparation-result-kit
     -> menu-failure-classification-kit
     -> menu-degraded-result-kit
     -> menu-retry-command-kit

  -> primary game lane
     -> preload-launch-independence-kit
     -> game-preload-attempt-kit
     -> game-preload-result-kit
     -> primary-game-capability-policy-kit
     -> game-preload-retry-command-kit

  -> shell projection and settlement
     -> shell-progress-projection-kit
     -> fallback-control-projection-kit
     -> direct-game-entry-command-kit
     -> first-fallback-game-frame-ack-kit
     -> shell-bootstrap-result-kit
```

## Authority boundaries

| Participant | Owns | Must publish |
|---|---|---|
| Root redirect | Initial route selection | Resolved shell URL |
| Shell bootstrap authority | Attempt correlation, lane independence, fault classification, terminal settlement | `ShellBootstrapResult` |
| Menu provider admission | Three.js/TSL module availability and revision | `ProviderImportResult` |
| Menu presentation adapter | Renderer, scene, pipeline and local frame loop | `MenuPresentationResult` |
| Parent shell projection | Progress, Play, degraded fallback and retry controls | `ShellProjectionReceipt` |
| Game preload lane | Iframe generation and Core Startup attempt | `GamePreloadResult` |
| Core Startup | Game preparations, continuation, first frame and playable readiness | Existing startup descriptor/result |
| Preload bridge | Game sleep/resume and parent messages | Local preparation and entry receipts |
| Game renderer | Visible frame production | `FirstFallbackGameFrameAck` when entered without menu |

## Admission rules

```txt
menu success + game success
  -> normal authored entry

menu failure + game success
  -> degraded-menu state
  -> preserve game progress and Play
  -> allow direct entry against current game revision

menu success + game failure
  -> visible game failure
  -> menu may remain active
  -> offer game retry

menu failure + game failure
  -> terminal shell failure
  -> preserve explicit retry/reload affordance
```

## Command and result model

```txt
ShellBootstrapCommand {
  shellGeneration
  menuAttemptId
  gamePreloadAttemptId
  targetGameUrl
  expectedProviderRevision?
}

MenuPresentationResult {
  attemptId
  status: ready | degraded | failed | superseded
  backend?
  providerRevision?
  failure?
}

GamePreloadResult {
  attemptId
  status: working | playable | failed | superseded
  startupRevision?
  continuation?
  failure?
}

ShellBootstrapResult {
  shellGeneration
  menuResult
  gameResult
  terminalMode: normal | degraded-menu | game-failed | shell-failed
  entryAllowed
}
```

## Failure classes

```txt
menu.module-import-failed
menu.renderer-init-failed
menu.renderer-init-timeout
menu.scene-preparation-failed
menu.pipeline-preparation-failed
menu.first-frame-failed
menu.provider-incompatible
menu.attempt-superseded

game.preload-navigation-failed
game.startup-failed
game.startup-timeout
game.first-frame-failed
game.attempt-superseded
```

Menu-local failures must not become terminal product failures while the game lane remains viable.

## DSK composition rule

The new authority composes existing services. It does not absorb Core Startup, renderer construction, game simulation or cross-window transport. Its only product-level responsibility is to ensure that optional shell presentation cannot silently prevent the primary capability from attempting startup.
