# Deploy audit: embed-context browser fixture gate

**Timestamp:** `2026-07-14T20-05-56-04-00`  
**Status:** `embed-context-route-admission-authority-audited`

## Summary

The current Node smoke proves source markers only. Static build and Pages publication do not prove route, iframe, origin, transport, suspension or first-frame behavior.

## Plan ledger

**Goal:** require executable context-admission proof against source, built output and the deployed Pages origin before readiness claims.

- [x] Inspect existing shell smoke.
- [x] Identify missing context cases.
- [x] Define artifact parity requirements.
- [ ] Add and execute browser fixtures.

## Required fixture matrix

```txt
source top-level game.html
source top-level game.html?preload=1
source admitted same-origin menu iframe
source same-origin arbitrary iframe
source cross-origin iframe
wrong origin and wrong source
missing parent handshake
stale shell generation and reused nonce
duplicate and reordered messages
direct-play first frame
shell-preload ready and resumed first frame
unsupported-embed visible recovery
built-output equivalents
Pages-origin equivalents
```

## Gate

A passing source regex does not prove context admission. Publication readiness requires browser results containing context ID, route result, shell identity when applicable, suspension decision, frame ID, screenshot or equivalent visible-frame artifact, build hash and deployed URL.