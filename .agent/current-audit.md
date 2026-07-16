# Current audit: MyCozyIsland renderer device and context loss recovery

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`  
**Branch:** `main`  
**Reviewed runtime revision:** `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`  
**Reviewed pre-audit documentation head:** `6505b5dd0c3ff9b6524e93b1d7bf841a6de4df54`

## Summary

MyCozyIsland was selected after the current Publish inventory comparison found no new, ledger-missing, root-agent-missing, undocumented or runtime-ahead eligible repository. Its renderer startup and first-frame path are explicit, but renderer lifetime loss and recovery are not owned by a product domain.

## Plan ledger

**Goal:** make renderer loss, suspension, reconstruction, fallback and recovered-frame proof explicit across the menu, hidden preload and active game.

- [x] Confirm selection and synchronization.
- [x] Inspect renderer initialization and animation on both visual surfaces.
- [x] Inspect hidden presentation freeze/resume and startup error capture.
- [x] Identify the renderer generation and recovery boundary.
- [x] Preserve all kits and services.
- [x] Define 20 coordinating recovery surfaces.
- [ ] Implement and execute the authority.

## Selection comparison

```txt
accessible Publish repositories: 11
eligible after Cavalry exclusion: 10
central ledger entries: 10
root .agent states: 10
new or ledger-missing: 0
root-agent-missing: 0
undocumented: 0
runtime-ahead: 0

selected: LuminaryLabs-Publish/MyCozyIsland
selection rule: oldest synchronized central timestamp
prior timestamp: 2026-07-15T19-58-42-04-00
next oldest: LuminaryLabs-Publish/IntoTheMeadow at 2026-07-15T20-38-13-04-00
excluded: LuminaryLabs-Publish/TheCavalryOfRome
```

## Source-backed finding

`src/menu.js` creates a `THREE.WebGPURenderer`, awaits initialization, creates a `RenderPipeline` and starts an animation loop. Its explicit failure path catches `main()` startup rejection, but no product-owned runtime loss result is defined.

`src/main-adventure.js` creates a second `THREE.WebGPURenderer`, bounds initialization through Core Startup, constructs atmosphere and post resources and starts the game animation loop. The inspected product source does not define a renderer-generation identity, WebGPU device-loss observer or WebGL context lost/restored observer.

`src/adventure/startup-host.js` deliberately ignores global errors after the startup descriptor becomes playable, so its startup failure authority is not a runtime renderer-health authority.

`src/game-preload-bridge.js` freezes the hidden renderer by removing its animation loop and later restores the same callback. It publishes successful entry without first requiring a fresh renderer-health result or recovered-frame acknowledgement.

This is a source-backed ownership and proof gap. It does not assert that the browser or Three.js has no internal behavior, and no forced-loss incident was reproduced.

## Interaction loop

```txt
menu renderer startup
  -> WebGPU/WebGL2 backend admitted
  -> menu frame loop begins
  -> hidden game preload begins

hidden game readiness
  -> game renderer and resources admitted
  -> first frame presented
  -> animation loop removed while hidden

entry
  -> old animation callback restored
  -> game revealed
  -> no renderer-health re-admission

runtime renderer loss
  -> no product loss observation result
  -> no presentation suspension result
  -> no renderer/resource generation rebuild
  -> no fallback result
  -> no first recovered frame acknowledgement
```

## Domains and census

```txt
menu and game renderer providers
hidden-preload and active-route presentation lifecycle
Core Startup and first playable frame
renderer-neutral world and frame snapshots
WebGPU device and WebGL context observation
renderer/resource generation retirement
bounded recovery and fallback
simulation/input policy during presentation loss
recovered visible-frame acknowledgement
build, artifact and Pages proof
```

```txt
implemented surfaces: 70
planned renderer-recovery surfaces: 20
```

## Required authority

```txt
cozy-island-render-device-context-recovery-authority-domain
```

```txt
RenderRecoveryAdmissionCommand
  -> bind document, route, renderer, backend, device/context and resource generations
  -> normalize WebGPU/WebGL loss evidence
  -> retire the stale renderer generation
  -> suspend presentation and apply simulation/input policy
  -> reconstruct renderer and registered GPU resources under a deadline
  -> reject stale recovery work
  -> publish RenderRecoveryResult or RenderFallbackResult
  -> publish FirstRecoveredFrameAck
```

## Existing proof boundary

Current tests verify shell structure, source patterns, startup-domain behavior and adventure-domain behavior. They do not force WebGPU device loss, WebGL context loss/restoration, hidden-preload loss, renderer reconstruction, resource rehydration, stale callback rejection, fallback or a recovered visible frame.