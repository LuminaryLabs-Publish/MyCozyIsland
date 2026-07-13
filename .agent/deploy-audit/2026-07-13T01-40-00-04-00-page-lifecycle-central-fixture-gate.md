# Deploy audit: page-lifecycle central fixture gate

**Timestamp:** `2026-07-13T01-40-00-04-00`

## Summary

Source review is insufficient to claim BFCache safety or complete retirement. The lifecycle authority requires browser, backend, built-output and deployed-origin proof.

## Plan ledger

**Goal:** block lifecycle-readiness claims until deterministic and browser-observed fixtures prove suspend, resume, retirement and visible-state parity.

- [x] Define pure lifecycle-domain fixtures.
- [x] Define browser round-trip fixtures.
- [x] Define WebGPU/WebGL2 parity and Pages gates.
- [ ] Implement and execute the fixture matrix.

## Required fixture matrix

```txt
pure domain
  persisted pagehide -> Suspended, no disposal
  pageshow -> successor generation and Resumed
  terminal pagehide -> ordered Retired
  duplicate/stale event -> zero mutation
  mandatory participant failure -> Degraded or Failed

browser source server
  Agriculture mutation -> BFCache round trip -> matching crop frame
  Foraging mutation -> BFCache round trip -> matching node frame
  active target -> round trip -> matching target marker
  repeated back/forward cycles remain idempotent
  terminal stop halts frame production and detaches listeners
  save failure is reported truthfully

backend parity
  WebGPU and WebGL2 emit equivalent lifecycle results
  resource receipts cover backend-specific allocations

build and deployment
  production build preserves source behavior
  GitHub Pages origin supports the same round-trip semantics
  first resumed frame cites successor lifecycle generation
```

## Required artifacts

```txt
command/result JSON
participant receipt ledger
save write/readback receipt
before/after state fingerprints
first resumed frame ID and screenshot/capture
console error log
WebGPU/WebGL2 comparison
source/build/Pages parity report
```

## Current proof state

```txt
npm test: not run
BFCache browser round trip: not run
repeated navigation: not run
terminal retirement: not run
resource receipt fixture: unavailable
first resumed frame fixture: unavailable
WebGPU/WebGL2 parity: not run
Pages lifecycle smoke: not run
```

No production-readiness claim is made.