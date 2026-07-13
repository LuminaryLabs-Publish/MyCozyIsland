# Deploy audit: Three.js menu lifecycle fixture gate

**Timestamp:** `2026-07-13T14-39-40-04-00`

## Summary

The current menu smoke validates source structure. Deployment readiness additionally requires real-browser proof for provider failure, WebGL capability, first frame, concurrent renderers, retirement and route parity.

## Plan ledger

**Goal:** define the minimum source, browser, built-output and GitHub Pages matrix for the new menu renderer lifecycle.

- [x] Inspect current test and package wiring.
- [x] Identify source-marker coverage.
- [x] Identify missing executable browser evidence.
- [x] Define promotion gates.
- [ ] Run the matrix.

## Existing coverage

`npm test` includes `tests/menu-game-shell-smoke.mjs`. It checks:

```txt
menu canvas, Play gate and hidden iframe exist
Three.js module is imported
createSky and createPalm are present
stable palm identity exists
2D fallback, island and terrain are absent
progress caps at 99 percent
ready/enter messages and history replacement exist
freeze/resume markers exist
Pages copies the HTML routes
```

This is useful static contract proof. It is not runtime lifecycle proof.

## Required source checks

```txt
provider manifest or authored provider policy
provider-independent preload bootstrap
stored RAF identity
explicit listener registry
resource-set disposal path
typed boot and retirement results
no semantic taxonomy level accidentally exported as an executable kit
```

## Required browser fixtures

```txt
normal menu first frame
reduced-motion menu first frame
DPR and resize behavior
Three.js provider rejection
CSP or MIME rejection
WebGL disabled or constructor failure
shader/render failure
hidden game preload continues under degraded menu policy
menu and game concurrent renderer observation
rapid Play and keyboard duplicate admission
entry timeout preserves menu
first visible game frame precedes retirement
exact RAF retirement
all owned listeners removed
all declared geometries/materials receive disposal receipts
late callback rejected
pagehide/BFCache during menu and transition
context loss during transition
```

## Required built-output and Pages fixtures

```txt
fresh root route
fresh menu route
fresh direct game route
provider URLs resolve with expected versions
source and deployed import maps match
menu lifecycle statuses match source run
fallback/degraded shell is local and provider-independent
no stale service-worker or CDN artifact changes the result
```

## Promotion gate

Do not promote `threejs-menu-presentation-lifecycle-authority` to implemented or production-ready until:

```txt
source checks pass
browser matrix passes
built-output matrix passes
Pages matrix passes
first-menu-frame and retirement receipts are captured
preload remains independently observable during menu failure
no unbounded retained menu resource class is reported
```

## Validation boundary

No commands were executed in this documentation turn. The current commit reports no combined status checks.