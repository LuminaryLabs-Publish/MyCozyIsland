# Startup audit: menu provider and game-preload independence

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

The root shell now depends on the menu's remote Three.js provider and WebGL renderer before it schedules the hidden game preload. This couples decorative menu presentation to factual game preparation.

## Plan ledger

**Goal:** ensure game preload and terminal startup reporting remain available even when the Three.js menu presentation cannot initialize.

- [x] Trace document parsing, import-map resolution and module evaluation.
- [x] Trace the first reachable `startPreload()` call.
- [x] Identify failure windows before product-owned error projection.
- [x] Define provider-independent shell responsibilities.
- [ ] Implement and execute failure fixtures.

## Current order

```txt
menu.html parses
  -> disabled button shows Preparing 1%
  -> import map resolves three@0.185.0 from jsDelivr
  -> browser imports src/menu.js
  -> src/menu.js imports Three.js
  -> module constructs WebGLRenderer
  -> module constructs complete scene graph
  -> resize and first menu RAF are scheduled
  -> a later idle callback schedules startPreload()
```

## Failure window

Any of the following can occur before the game iframe receives a source URL:

```txt
provider fetch or MIME failure
module evaluation failure
WebGL capability rejection
WebGLRenderer constructor failure
shader/material/geometry construction failure
unexpected top-level exception
```

`reportFailure()` cannot recover an import failure because the module never evaluates. Constructor or top-level scene failures can also occur before preload scheduling. The static button can remain disabled at `Preparing 1%` with no terminal reason.

## Required separation

A provider-independent shell path should own:

```txt
preload attempt identity
iframe creation/source assignment
bounded preload timeout
local progress/failure projection
menu presentation boot attempt
policy for menu failure with game preload success
policy for game failure with menu success
terminal shell result
```

Recommended ordering:

```txt
inline/local shell bootstrap
  -> allocate shell and preload generations
  -> start game preload
  -> independently start menu presentation attempt
  -> combine typed menu and game results under policy
  -> enable Play only from accepted game readiness
```

The menu presentation can degrade to CSS background plus Play/progress without blocking factual game startup.

## Result matrix

```txt
menu ready + game ready       -> normal Play
menu failed + game ready      -> degraded local shell permits Play
menu ready + game failed      -> menu shows typed game failure
menu failed + game failed     -> provider-independent failure projection
menu stale + game successor   -> reject predecessor menu result
```

## Validation boundary

No provider outage was observed. This is a source-derived control gap. No browser provider rejection, offline, CSP, WebGL-disabled or fallback fixture was run.