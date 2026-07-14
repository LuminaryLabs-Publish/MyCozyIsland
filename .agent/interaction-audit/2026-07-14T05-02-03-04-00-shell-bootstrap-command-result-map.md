# Interaction audit: shell bootstrap command and result map

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The parent shell currently infers startup state from local booleans, button copy and unversioned child messages. It has no command/result model that can distinguish an optional menu failure from a primary game failure or correlate retries with the current shell generation.

## Plan ledger

**Goal:** define explicit commands and terminal results for normal startup, degraded-menu startup, retry and direct game entry.

- [x] Map current DOM events and cross-window messages.
- [x] Identify uncorrelated attempts and implicit state.
- [x] Define shell, menu and game result types.
- [x] Define stale, duplicate and superseded handling.
- [ ] Implement the result model.
- [ ] Execute retry and failure-order fixtures.

## Current interactions

| Input/event | Current mutation | Current output |
|---|---|---|
| Menu module evaluates | Begins menu `main()` | None |
| Menu initialization succeeds | Creates animation loop and schedules preload | `CozyMenu` global |
| Menu initialization fails | Sets button disabled/copy/title | Console plus DOM only |
| Idle preload callback | Sets iframe `src` | Child navigation |
| Child progress | Mutates `lastProgress` and button text | DOM only |
| Child ready | Sets `gameReady` | Enabled Play |
| Play click/Enter/Space | Posts `cozy-game-enter` | No attempt ID |
| Child entered | Starts reveal | No frame-correlated result |
| 900 ms timeout | Reveals if not entered | Timer-driven fallback |

## Missing identity

```txt
ShellGeneration
MenuPresentationAttemptId
GamePreloadAttemptId
EntryAttemptId
ProviderRevision
MenuBackendGeneration
GameStartupRevision
ShellProjectionRevision
FallbackMode
TerminalBootstrapResult
```

## Target commands

```txt
ShellBootstrapCommand {
  shellGeneration
  targetGameUrl
  menuAttemptId
  gamePreloadAttemptId
}

RetryMenuPresentationCommand {
  shellGeneration
  predecessorMenuAttemptId
  nextMenuAttemptId
}

RetryGamePreloadCommand {
  shellGeneration
  predecessorGameAttemptId
  nextGameAttemptId
}

DirectGameEntryCommand {
  shellGeneration
  gamePreloadAttemptId
  expectedStartupRevision
  entryAttemptId
}
```

## Target results

```txt
MenuPresentationResult {
  attemptId
  status: working | ready | degraded | failed | superseded
  providerRevision?
  backend?
  frameId?
  failure?
}

GamePreloadResult {
  attemptId
  status: working | playable | failed | superseded
  startupRevision?
  progress
  continuation?
  failure?
}

ShellProjectionResult {
  shellGeneration
  mode: preparing | normal | degraded-menu | game-failed | shell-failed
  playEnabled
  menuRetryEnabled
  gameRetryEnabled
  directEntryEnabled
}

ShellBootstrapResult {
  shellGeneration
  menuAttemptId
  gamePreloadAttemptId
  terminalMode
  entryAllowed
  failure?
}
```

## Result reduction

```txt
menu.ready + game.working
  -> normal preparing

menu.ready + game.playable
  -> normal playable

menu.failed + game.working
  -> degraded-menu preparing

menu.failed + game.playable
  -> degraded-menu playable

menu.ready|failed + game.failed
  -> game-failed

stale attempt result
  -> reject without DOM or iframe mutation

duplicate terminal result
  -> idempotent readback only
```

## Ordering hazards to test

```txt
menu failure before iframe load
menu failure after game progress
menu retry while game remains playable
game retry while menu remains healthy
old child ready after iframe retry
old menu ready after menu attempt replacement
repeated Play during degraded mode
entry timeout followed by late entered message
pagehide during either attempt
BFCache restore with prior terminal booleans
```

## Public readback

Expose an immutable bounded descriptor rather than raw renderer or frame references:

```txt
getShellStartupDescriptor() {
  shellGeneration
  mode
  menuResult
  gameResult
  entryResult
  updatedAt
}
```

The existing public-capability audit remains applicable. This result surface must not expose mutable GPU, engine or iframe internals.
