# Deploy audit: production-host capability central fixture gate

**Timestamp:** `2026-07-13T04-21-10-04-00`

## Summary

The source audit proves that successful browser startup publishes the live `CozyIsland` host unconditionally. Deployment readiness requires proof that source, built output and GitHub Pages enforce the same channel policy and expose no unintended mutable owners.

## Plan ledger

**Goal:** block capability-safety claims until production-host policy and command behavior are executable across every delivery surface.

- [x] Identify source host publication.
- [x] Define source/build/Pages parity requirements.
- [x] Define production read-only baseline.
- [x] Define adversarial command and revocation fixtures.
- [ ] Implement and run the fixture matrix.

## Required fixture matrix

```txt
source browser host
production build host
GitHub Pages host
WebGPU backend
WebGL2 backend
fresh startup
save-restored startup
page lifecycle suspend/resume
terminal retirement
```

## Required assertions

```txt
production host publishes only detached projections
raw renderer, scene, camera, adventure, engine and domain APIs are absent
unknown caller or capability is rejected
expired/revoked grant performs zero mutation
duplicate/stale command performs zero mutation
permitted command returns participant receipts
reset requires explicit confirmation and scope
terminal lifecycle revokes the host
first changed visible frame references the command result
source, build and Pages expose equivalent policy
```

## Current evidence

```txt
runtime source changed: no
build configuration changed: no
Pages workflow changed: no
npm test: not run
npm run build: not run
production host inspection: not run
browser capability fixture: unavailable
Pages capability smoke: not run
```

## Gate

Do not claim least authority, production-safe public diagnostics, revocation safety, deterministic external control or deployment parity until the complete matrix passes on `main`.