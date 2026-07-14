# Validation: MyCozyIsland postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`

## Scope

Documentation-only reconciliation of the alpha-card postcard-menu runtime, source-pattern smoke, render evidence boundary and resource-retirement path. No runtime behavior was modified or executed by this audit.

## Plan ledger

**Goal:** distinguish confirmed source implementation from unproved browser-visible atlas, frame and lifecycle guarantees.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Select MyCozyIsland as the sole runtime-ahead eligible repository.
- [x] Inspect the three runtime/test commits and current menu source.
- [x] Preserve 65 source-backed kits and five adapters.
- [x] Inspect source-pattern test coverage.
- [x] Query combined commit status.
- [ ] Run `npm test` independently.
- [ ] Execute browser WebGPU and WebGL2 fixtures.
- [ ] Execute built-output and Pages fixtures.

## Source-backed observations

```txt
reviewed runtime head: 6c5e465b7b431ff6758f78e7ceb25d0f763f658f
frond cards: 8
frond variants: 4
frond card segments: 5
frond atlas: 1280 x 256, four 320 x 256 cells
flower atlas: 384 x 128, three 128 x 128 cells
frond alphaTest: 0.48
frond transparent sorting: disabled
frond/flower mipmaps: enabled
frond/flower cell gutters: absent
frond/flower UV cell boundaries: exact
menu backend policy: WebGPU preferred, WebGL2 fallback
menu frame identity: absent
browser screenshot/readback artifact: absent
scene traversal disposal: absent
atlas disposal receipts: absent
resize listener removal: absent
CozyMenu revocation: absent
```

The atlas-cell concern is an unverified risk. No visible defect is claimed without browser evidence.

## Existing executable coverage

`npm test` is configured to include:

```txt
tests/menu-game-shell-smoke.mjs
tests/startup-domain-smoke.mjs
tests/adventure-domains-smoke.mjs
```

The menu smoke performs syntax and source-pattern assertions. It confirms constants, function names and wiring for the alpha-card implementation, but it does not import the modules in a browser, initialize a GPU backend, inspect atlas pixels, render a frame, capture an image or observe resource retirement.

## Required fixtures

```txt
deterministic frond and flower atlas hashes
atlas cell bounds, gutters and UV interiors
alpha occupancy and transparent-edge checks
mip-sensitive adjacent-cell contamination probe
normal WebGPU first frame
normal WebGL2 fallback first frame
DPR 1 and 1.5
wide, square and narrow viewports
reduced-motion path
resize before and after first frame
frame and screenshot artifact correlation
normal game entry and 900 ms fallback reveal
menu scene, texture, compute and listener retirement
public CozyMenu revocation
source/build/Pages semantic parity
```

## Combined status

The GitHub combined-status endpoint returned no status entries for runtime head `6c5e465b7b431ff6758f78e7ceb25d0f763f658f`.

## Validation result

```txt
documentation changed: yes
runtime JavaScript changed by audit: no
HTML or CSS changed by audit: no
gameplay changed by audit: no
render behavior changed by audit: no
dependencies changed by audit: no
package scripts changed by audit: no
test behavior changed by audit: no
workflow changed by audit: no
deployment changed by audit: no
branch created: no
pull request created: no

source files inspected: yes
runtime diff inspected: yes
package test wiring inspected: yes
combined status checks reported: none
npm test independently run: no
browser WebGPU fixture: not run
browser WebGL2 fixture: not run
built-output smoke: not run
Pages smoke: not run
```

No atlas-isolation, exact visible-frame, backend-parity, complete-retirement, deployed-parity or production-readiness claim is made.