# Architecture audit: menu/game preload handoff scheduler DSK map

**Timestamp:** `2026-07-13T12-38-45-04-00`

## Summary

The new application shell composes a Canvas2D menu, a hidden same-origin game document, Core Startup, NexusEngine simulation, and WebGPU/WebGL2 presentation without one parent authority for scheduler ownership or entry completion.

## Plan ledger

**Goal:** place every current responsibility under a bounded domain and define the missing parent transaction.

- [x] Map current browser, startup, gameplay, rendering, persistence, and deployment domains.
- [x] Preserve the 65 DSK/kit surfaces.
- [x] Classify five browser/product adapters outside the kit census.
- [x] Define one parent authority and its participant contracts.
- [ ] Implement generation-bound commands, results, leases, and fixtures.

## Current composition

```txt
Root route domain
  index.html -> menu.html

Menu presentation domain
  cozy-menu-scene-adapter
  Canvas2D scene, DPR sizing, reduced motion, RAF

Preload shell domain
  cozy-menu-game-shell-adapter
  iframe, progress, Play gate, history, focus, fallback reveal

Startup domain
  core-startup-kit
  browser-startup-presentation-adapter
  cozy-startup-host

Game composition domain
  13 additional engine-installed adventure kits
  50 cataloged world/render/host kits
  cozy-ocean-composition-kit

Preload bridge domain
  cozy-game-preload-bridge-adapter
  descriptor polling, parent messaging, tick/step freeze-resume, entry prep

Presentation domain
  renderer.setAnimationLoop
  WebGPU/WebGL2 world, atmosphere, ocean, foam, post and HUD

Lifecycle/deploy domain
  visibility, pagehide, static smoke, Actions, Pages
```

## Boundary failure

```txt
menu RAF generation: absent
game presentation generation: absent
preload generation: absent
entry attempt identity: absent
quiescence lease: absent
cross-window protocol revision: absent
stale/duplicate message result: absent
first post-resume presentation frame: absent
visible game-frame acknowledgement: absent
atomic scheduler/focus ownership transfer: absent
```

## Required parent domain

```txt
cozy-island-menu-game-preload-handoff-scheduler-authority-domain
```

This parent owns only cross-domain admission and completion. It does not own Agriculture, player movement, renderer internals, menu artwork, or product copy.

## Required child surfaces

```txt
identity and generation
  menu-shell-generation-kit
  preload-surface-generation-kit
  entry-attempt-id-kit

scheduler and quiescence
  menu-frame-scheduler-kit
  single-raf-chain-guard-kit
  simulation-quiescence-lease-kit
  presentation-quiescence-lease-kit
  hidden-game-presentation-policy-kit

protocol and admission
  core-startup-preload-binding-kit
  preload-progress-envelope-kit
  cross-window-message-contract-kit
  message-source-generation-admission-kit
  stale-message-rejection-kit
  duplicate-result-suppression-kit

entry and proof
  player-entry-command-kit
  player-entry-result-kit
  history-transition-result-kit
  focus-transfer-result-kit
  first-post-resume-frame-kit
  visible-game-frame-ack-kit

lifecycle and proof
  menu-scheduler-retirement-kit
  preload-surface-retirement-kit
  visibility-transition-kit
  page-lifecycle-composition-kit
  menu-game-handoff-observation-kit
  preload-handoff-fixture-gate-kit
```

## Required result flow

```txt
PreloadStarted
  -> PreloadReady | Failed | Cancelled | Stale | Retired

PlayerEntryCommand
  -> resume at admitted boundary
  -> render successor frame
  -> visible-frame acknowledgement
  -> atomic menu retirement/history/focus transfer
  -> Entered | Failed | Cancelled | Stale | Retired
```

## Dependency rule

Core Startup remains the factual readiness source. The menu shell may project progress, but only the parent handoff authority may convert readiness into an entry candidate and only renderer/visible-frame participants may complete entry.