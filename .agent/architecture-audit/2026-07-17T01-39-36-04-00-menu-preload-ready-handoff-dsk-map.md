# Architecture audit — Menu preload-to-ready handoff DSK map

**Timestamp:** `2026-07-17T01-39-36-04-00`

## Current ownership map

```txt
n:entry:menu:game-preload
  -> hidden same-origin iframe
  -> progress and ready messages
  -> simulation/presentation freeze and resume

n:entry:menu:play-gate
  -> progress label
  -> ready boolean
  -> Play enablement
  -> entry request

n:entry:menu:scene
  -> menu active/preloading state
  -> renderer lifetime
  -> crossfade and retirement

n:entry:menu:camera
n:entry:menu:particles
n:entry:menu:palm-motion
n:entry:menu:post-effects
  -> visible menu presentation under preload/idle/interactive budgets
```

The current implementation distributes one logical handoff across the iframe bridge, menu host, renderer adapter and Play button without one result-owning parent domain.

## Source flow

```txt
game-preload-bridge.inspect
  -> descriptor.playable
  -> freezeSimulation
  -> freezePresentation
  -> post cozy-game-ready

menu message listener
  -> markReady
  -> setPreloading(false)
  -> renderer.resize
  -> enable Play

renderer animation loop
  -> later render using ready DPR/frame policy

requestEntry
  -> post cozy-game-enter
  -> reveal/focus game
  -> dispose menu
```

## Proposed parent domain

`cozy-island-menu-preload-ready-presentation-handoff-authority-domain`

### Child DSKs

| DSK | Owned services |
|---|---|
| `preload-session-identity-kit` | preload session ID, iframe document revision, retirement |
| `preload-ready-message-admission-kit` | source/origin validation, ready admission, result |
| `startup-continuation-binding-kit` | Core Startup continuation and playable revision binding |
| `menu-presentation-generation-kit` | menu renderer, viewport, quality and DPR generation identity |
| `preload-frame-budget-policy-kit` | preload DPR and frame-rate policy |
| `ready-frame-budget-policy-kit` | ready/idle DPR and frame-rate policy |
| `menu-dpr-transition-kit` | accepted DPR transition plan and result |
| `menu-frame-rate-transition-kit` | accepted frame-mode transition plan and result |
| `menu-resize-settlement-kit` | renderer size/projection settlement |
| `menu-render-commit-result-kit` | committed backend, viewport, DPR and mode evidence |
| `first-ready-menu-frame-ack-kit` | first frame bound to the accepted ready generation |
| `play-gate-convergence-kit` | Play enablement only after game-ready and menu-frame proof |
| `stale-ready-message-rejection-kit` | stale iframe/session/generation rejection |
| `duplicate-ready-settlement-kit` | apply-once ready settlement |
| `entry-generation-binding-kit` | activation, game resume and menu retirement binding |
| `reduced-motion-handoff-policy-kit` | explicit zero-duration visual transition policy |
| `menu-ready-browser-fixture-kit` | real-browser ready/Play timing fixtures |
| `artifact-pages-ready-handoff-fixture-kit` | source, artifact and Pages parity proof |

## Command and result boundary

```txt
GamePreloadReadyAdmissionCommand
  -> GamePreloadReadyAdmissionResult

MenuPresentationBudgetTransitionCommand
  -> MenuPresentationBudgetTransitionResult

ReadyMenuFrameCommitCommand
  -> MenuRenderCommitResult
  -> FirstReadyMenuFrameAck

PlayGateAdmissionCommand
  -> PlayGateAdmissionResult

EntryHandoffCommand
  -> EntryHandoffResult
```

## Architectural rule

Three.js remains a renderer adapter. The proposed authority owns identities, policies, commands, results and convergence evidence; it does not move browser rendering into deterministic simulation.

## Retained boundaries

The previous adaptive-quality authority remains unresolved. This handoff authority is narrower: it governs the already implemented preload-to-ready budget transition and the exact frame that unlocks Play.