# Startup fallback audit: menu provider and game bootstrap isolation contract

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

This contract makes the game preload lane independent from optional menu GPU preparation. It does not remove the menu. It prevents failures in menu provider import, renderer initialization, scene construction or post-processing from suppressing the game’s own Core Startup attempt.

## Plan ledger

**Goal:** define the smallest reliable change that preserves the menu-first product while admitting the primary game whenever its own dependencies are healthy.

- [ ] Move game-preload launch to shell-owned code that does not depend on menu module success.
- [ ] Give the shell one generation and independent menu/game attempt IDs.
- [ ] Add explicit menu preparation results and timeouts.
- [ ] Keep game progress and readiness projection active when the menu is degraded.
- [ ] Provide accessible retry and direct-entry controls.
- [ ] Require a matching game first-frame acknowledgement before fallback success.
- [ ] Fence stale results and retries.
- [ ] Compose with existing GPU handoff, protocol and lifecycle authorities.

## Required invariant

```txt
The primary game preload attempt MUST NOT require successful construction or first-frame submission of the optional menu presentation.
```

## Current violation

```txt
startPreload() is the only iframe source assignment
startPreload() is scheduled at the end of menu main()
menu main() awaits renderer.init()
menu main() constructs scene and RenderPipeline first
main().catch(reportFailure) does not call startPreload()
static import failure prevents the catch path from being installed
```

## Minimal implementation shape

### Shell-owned bootstrap

Use a tiny dependency-free module or inline shell script to:

```txt
allocate ShellGeneration
allocate GamePreloadAttemptId
assign game iframe src
project initial progress and fallback controls
listen for child startup messages
```

This bootstrap must execute independently from the Three.js menu module.

### Menu-owned preparation

The menu module should:

```txt
receive or read ShellGeneration and MenuAttemptId
import/initialize the provider
prepare renderer, scene and pipeline
publish MenuPresentationResult
never own whether the game iframe is allowed to start
```

### Degraded projection

On menu failure:

```txt
stop or avoid menu frame submission
preserve a static DOM background
show concise degraded preparation state
continue projecting game progress
keep Play disabled until the game is playable
allow menu retry without restarting a healthy game
```

### Direct entry

When the current game attempt is playable:

```txt
enable Play
post entry command bound to GamePreloadAttemptId
wait for game resume preparation
wait for first visible game frame
commit reveal/history/focus
publish FirstFallbackGameFrameAck
```

## Failure policy

| Failure | Classification | Shell action |
|---|---|---|
| Menu CDN import | Recoverable menu failure | Continue game preload, expose menu retry |
| Menu WebGPU/WebGL2 init | Recoverable menu failure | Continue game preload, use DOM background |
| Menu scene/pipeline | Recoverable menu failure | Dispose partial candidates, continue game preload |
| Game navigation | Primary capability failure | Keep menu if healthy, expose game retry |
| Game Core Startup | Primary capability failure | Show child failure and retry policy |
| Both lanes fail | Terminal shell failure | DOM-only failure with reload/retry |

## Disposal requirement

A failed menu attempt may have partial resources. It must publish a candidate-retirement receipt covering any created renderer, device/context, geometry, material, storage, pipeline, listener or timer. This composes with the existing dual-surface retirement authority.

## Retry requirement

```txt
menu retry
  -> new MenuAttemptId
  -> does not replace a healthy game iframe

game retry
  -> new GamePreloadAttemptId and iframe generation
  -> does not rebuild a healthy menu unless policy requests it
```

## Compatibility requirement

The normal successful path must retain:

```txt
WebGPU-first menu
WebGL2 menu fallback
hidden game preload
Core Startup readiness
sleeping game presentation
Play-triggered resume
authored crossfade
history and focus transfer
```

## Acceptance result

```txt
ShellBootstrapResult.status = normal | degraded-menu | game-failed | shell-failed
```

A `degraded-menu` result is successful only after the matching game attempt has produced a visible frame acknowledgement.
