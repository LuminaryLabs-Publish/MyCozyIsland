# Gameplay audit: postcard menu to game entry loop

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Plan ledger

**Goal:** document how the new visual menu participates in the existing preload and gameplay transition without assigning gameplay authority to presentation code.

- [x] Trace menu construction, game preload, readiness, Play and reveal.
- [x] Preserve Core Startup and preload-bridge ownership.
- [x] Identify frame and retirement gaps.
- [ ] Add executable entry convergence fixtures.

## Current loop

```txt
menu visual main()
  -> create postcard scene and begin menu frames
  -> schedule startPreload after successful menu preparation
  -> hidden game performs Core Startup
  -> game reports progress and playable readiness
  -> bridge freezes hidden simulation and presentation
  -> Play sends cozy-game-enter
  -> game prepares player and acknowledges entered
  -> parent reveals iframe
  -> 900 ms fallback reveals without acknowledgement
  -> after crossfade menu loop, pipeline and renderer stop
  -> gameplay continues in iframe
```

## Gameplay ownership

```txt
menu presentation: no gameplay truth
shell: preload, Play, reveal and focus
Core Startup: game readiness and first game-frame admission
preload bridge: freeze, resume, player preparation and acknowledgement
adventure kits: world, inventory, agriculture, foraging, movement, interaction and saves
```

## Findings

- The postcard refactor does not alter adventure-domain truth.
- The primary game still starts only after successful menu preparation, so the retained startup-fallback gap remains.
- Play still has a 900 ms reveal fallback that is not tied to a resumed visible game frame.
- Menu retirement begins after a timer, not after a typed handoff result carrying complete participant receipts.
- No proof shows that the accepted menu frame and the game-ready revision belong to one shell generation.

## Required settlement

```txt
MenuPostcardFrameResult
  -> cited by current ShellGeneration
GamePreloadResult
  -> cited by current ShellGeneration
EntryCommand
  -> cites current playable game revision
FirstVisibleGameFrameAck
  -> commits reveal
MenuPostcardRetirementResult
  -> settles predecessor presentation ownership
```

## Do not claim

Do not claim gameplay-entry frame convergence, menu/game generation correlation or complete predecessor retirement until browser fixtures execute the full loop.