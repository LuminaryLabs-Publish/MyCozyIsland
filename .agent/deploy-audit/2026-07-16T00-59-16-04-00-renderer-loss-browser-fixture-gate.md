# Deploy audit: renderer-loss browser fixture gate

**Timestamp:** `2026-07-16T00-59-16-04-00`  
**Status:** `renderer-device-context-loss-recovery-authority-audited`

## Summary

Syntax and normal startup tests do not prove renderer-loss behavior. Release confidence requires forced-loss fixtures against source, built output and the Pages deployment.

## Plan ledger

**Goal:** prevent renderer recovery claims unless each backend, route state and deployment surface proves bounded failure or a matching recovered frame.

- [x] Identify current test coverage.
- [x] Define the missing source/browser/artifact/Pages fixture matrix.
- [x] Define required receipts and rejection cases.
- [ ] Implement and execute the fixtures.

## Current proof

```txt
npm test
  -> menu/game shell source assertions
  -> startup-domain smoke
  -> adventure-domain smoke

not currently proven
  -> WebGPU device loss
  -> WebGL context loss/restoration
  -> hidden-preload loss and resume
  -> resource rehydration
  -> stale animation-loop rejection
  -> fallback presentation
  -> first recovered frame
  -> built artifact and Pages parity
```

## Required fixture matrix

| Fixture | Menu | Hidden preload | Active game | WebGPU | WebGL2 |
|---|---:|---:|---:|---:|---:|
| loss observation | required | required | required | required | required |
| presentation suspension | required | required | required | required | required |
| input/simulation policy | n/a | required | required | required | required |
| renderer reconstruction | required | required | required | required | required |
| GPU resource rehydration | required | required | required | required | required |
| stale generation rejection | required | required | required | required | required |
| fallback on exhaustion | required | required | required | required | required |
| first recovered frame | required | required | required | required | required |

## Required assertions

```txt
one loss result per renderer generation
no stale callback presents after retirement
held input is cleared according to policy
hidden preload revokes readiness while recovering
cozy-game-entered is withheld until a fresh frame exists
new renderer/resource generations differ from retired generations
physical render pass order is restored
first recovered frame binds route and frame revisions
fallback is visible and actionable when recovery fails
save remains restorable
```

## Suggested files

```txt
tests/renderer-loss-recovery.fixture.mjs
tests/preload-renderer-loss.fixture.mjs
tests/render-resource-rehydration.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Deployment gate

Do not claim production readiness until the same fixture assertions pass against:

```txt
source server
assembled dist artifact
downloaded Pages workflow artifact
public GitHub Pages URL
```

## Validation boundary

No browser, artifact or Pages fixture was run in this documentation-only audit.