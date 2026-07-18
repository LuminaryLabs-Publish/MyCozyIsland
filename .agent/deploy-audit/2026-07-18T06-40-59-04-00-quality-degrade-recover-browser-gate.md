# Deploy audit: quality degrade/recover browser gate

**Timestamp:** `2026-07-18T06-40-59-04-00`

## Current proof boundary

The package declares Node smoke tests for the menu shell, startup domains and adventure domains. It declares no build script and no executable browser fixture that drives the performance budget through degrade and recover transitions.

## Required gate — proposed

```txt
source route
  -> launch game.html
  -> capture initial quality tier, renderer DPR and drawing buffer
  -> inject sustained over-budget frame samples
  -> observe level 1 and level 2 settlements
  -> verify all projected effects
  -> inject sustained under-budget samples
  -> observe level 1 and level 0 recoveries
  -> verify renderer DPR and drawing buffer restore
  -> resize at each level
  -> capture matching quality/frame digest

static artifact
  -> repeat the same transition matrix

Pages origin
  -> repeat the same transition matrix
  -> compare source/artifact/Pages effect digests
```

## Required evidence

- backend and static quality tier;
- device DPR and pixel-ratio cap;
- transition IDs and quality generations;
- requested and applied cloud/fog scales;
- requested and applied fog target scale;
- requested and applied renderer DPR;
- drawing-buffer dimensions;
- frame IDs and screenshots;
- artifact origin and Pages origin;
- mismatch and stale-transition diagnostics.

## Current status

```txt
Node smoke tests: not run in this audit
browser degrade/recover fixture: unavailable
DPR readback fixture: unavailable
resize reconciliation fixture: unavailable
artifact smoke: not run
Pages smoke: not run
```

No deployment-parity or production-readiness claim is made.