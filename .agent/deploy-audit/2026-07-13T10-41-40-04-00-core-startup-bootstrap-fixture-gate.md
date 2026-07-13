# Deploy audit: Core Startup bootstrap fixture gate

**Timestamp:** `2026-07-13T10-41-40-04-00`

## Summary

The repository has a Node startup smoke and package wiring, but deployment readiness still requires browser-level proof for import maps, CDN/provider failures, WebGPU/WebGL2 initialization, first visible frame, retry isolation and Pages parity.

## Plan ledger

**Goal:** require executable evidence from source through built and deployed surfaces before claiming startup reliability.

- [x] Inspect `package.json` startup test wiring.
- [x] Inspect the startup-domain smoke.
- [x] Inspect import-map provider pins.
- [x] Inspect the current commit status surface.
- [x] Define the missing fixture matrix.
- [ ] Run and retain the fixture evidence.

## Existing proof

```txt
npm test
  -> tests/startup-domain-smoke.mjs
  -> tests/adventure-domains-smoke.mjs

startup smoke covers:
  Core Startup launch
  six preparations
  product preparation order
  continuation selection
  enter blocked before first-frame fact
  first-frame fact then playable entry
  failure descriptor and DOM projection
  startup snapshot reset/load
```

## Missing source/browser fixtures

```txt
invalid import-map target
unreachable Three.js provider
unreachable NexusEngine provider
module parse failure
module evaluation failure
entry timeout
retry after failed attempt
stale predecessor completion after retry
WebGPU renderer success
WebGL2 fallback success
renderer initialization timeout
atmosphere preparation timeout
first-frame synchronous failure
post-submit device loss
visible canvas acknowledgement
startup-host disposal
```

## Required deployment matrix

```txt
Node source smoke
local HTTP browser smoke
built/static output smoke
GitHub Actions npm test result
GitHub Pages route load
GitHub Pages provider resolution
GitHub Pages WebGPU path
GitHub Pages WebGL2 fallback path
GitHub Pages failed-provider projection
GitHub Pages first-visible-frame receipt
```

## Current validation result

```txt
runtime source changed by this audit: no
package scripts changed by this audit: no
dependencies changed by this audit: no
workflow changed by this audit: no
branch created: no
pull request created: no

startup smoke inspected: yes
npm test independently run: no
commit status checks reported: none
browser startup smoke: not run
built-output smoke: not run
Pages smoke: not run
```

No provider availability, bootstrap recovery, first-visible-frame or production-readiness claim is made.