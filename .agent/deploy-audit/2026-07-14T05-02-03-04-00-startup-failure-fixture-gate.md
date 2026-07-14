# Deploy audit: startup failure fixture gate

**Timestamp:** `2026-07-14T05-02-03-04-00`  
**Status:** `menu-failure-game-bootstrap-fallback-authority-audited`

## Summary

The current Node smoke proves source markers and syntax. It does not prove that the game remains available when the menu provider or renderer fails. Production readiness requires browser fault injection across source, built output and the deployed Pages route.

## Plan ledger

**Goal:** require executable evidence that optional menu failure cannot block the primary game route.

- [x] Inspect package scripts and current menu smoke.
- [x] Identify untested failure boundaries.
- [x] Define source, browser, build and Pages gates.
- [ ] Implement a browser fixture harness.
- [ ] Add deterministic fault-injection hooks or request interception.
- [ ] Run the matrix on `main` and retain artifacts.

## Existing checks

```txt
npm test
  -> node tests/menu-game-shell-smoke.mjs
  -> node tests/startup-domain-smoke.mjs
  -> node tests/adventure-domains-smoke.mjs
```

The menu smoke:

```txt
runs node --check on two source files
reads HTML and JavaScript as text
asserts WebGPU, TSL, bloom and compute-wind markers
asserts iframe preload and sleep/resume markers
asserts Pages copies the HTML files
```

It does not open a browser or execute a failure path.

## Required source fixture

```txt
shell bootstrap code contains an iframe preload launch independent of menu main
menu reportFailure does not disable the game lane
shell owns degraded controls and game progress projection
attempt IDs and terminal results are present
```

Source markers remain diagnostic only.

## Required browser matrix

| Case | Injection | Required result |
|---|---|---|
| Menu provider unavailable | Block `three.webgpu.js` or TSL module | Game iframe starts, progress appears, direct entry succeeds |
| Menu renderer init rejects | Stub initialization rejection | `degraded-menu`, no terminal game failure |
| Menu renderer init times out | Hold initialization promise | Menu timeout, game attempt unaffected |
| Palm construction throws | Inject scene preparation failure | Partial resources retired, game remains available |
| RenderPipeline construction throws | Inject pipeline failure | DOM fallback, game remains available |
| Menu first frame fails | Throw on menu render | Menu lane retires, game lane continues |
| Game provider unavailable | Block game-only provider | Menu remains usable, game failure visible |
| Both lanes fail | Block shared and game providers | Terminal DOM failure with retry |
| Menu retry | Restore provider after failure | New menu attempt, existing healthy game retained |
| Game retry | Restore game provider | New iframe attempt, healthy menu retained |
| Repeated Play | Click/keyboard repeatedly | One current entry attempt |
| Reduced motion | Emulate preference | Zero-delay path still waits for game frame ack |

## First fallback-frame proof

Capture and retain:

```txt
ShellGeneration
MenuAttemptId and failure code
GamePreloadAttemptId
Core Startup revision
entry attempt ID
backend
first visible game frame ID
screenshot hash
DOM mode and route
```

## Build and Pages parity

The same semantics must pass against:

```txt
source server
production artifact or copied dist
https://luminarylabs-publish.github.io/MyCozyIsland/
```

Verify import-map paths, iframe route resolution, cache-key behavior and same-origin messaging on the deployed base path.

## CI gate

Do not mark the startup fallback authority implemented until the browser matrix passes on `main` and artifacts identify the exact source and deployed revisions.

## Validation not performed in this audit

```txt
npm test
browser launch
module request interception
renderer failure injection
build generation
Pages deployment
Pages smoke
artifact capture
```
