# Next steps: MyCozyIsland postcard-menu atlas and frame admission

**Timestamp:** `2026-07-14T09-39-44-04-00`  
**Publication status:** `menu-postcard-atlas-frame-admission-audited`

## Summary

Keep the eight-card postcard menu, but add deterministic atlas manifests, interior UV bounds, first-frame evidence and complete resource retirement. Do not restructure NexusEngine or move adventure truth into the menu.

## Plan ledger

**Goal:** prove the new menu visual and retire it cleanly with the smallest targeted changes.

- [ ] Add `VisualRevision`, `AtlasRevision`, `SceneRevision` and `MenuFrameId`.
- [ ] Return deterministic frond and flower `AtlasCellManifest` values.
- [ ] Add per-cell gutters or edge extrusion.
- [ ] Remap card UVs to interior cell bounds.
- [ ] Validate alpha occupancy and mip isolation.
- [ ] Bind compute storage and fallback wind to the visual revision.
- [ ] Publish `MenuPostcardPreparationResult`.
- [ ] Submit and acknowledge one exact menu frame.
- [ ] Capture backend, viewport, DPR, reduced-motion and artifact hashes.
- [ ] Add scene traversal disposal.
- [ ] Dispose frond and flower atlases explicitly.
- [ ] Retire compute storage and pending callbacks.
- [ ] Remove the resize listener.
- [ ] Revoke `globalThis.CozyMenu`.
- [ ] Publish `MenuPostcardRetirementResult` with participant receipts.
- [ ] Preserve independent game-preload and degraded-menu work from the retained startup audit.
- [ ] Add source, browser, built-output and Pages parity fixtures.

## Minimal implementation order

```txt
1. atlas and visual identities
2. cell manifests and gutters
3. interior UV remapping
4. alpha/mip validation
5. frame submission result
6. screenshot/readback artifact
7. traversal and texture disposal
8. listener, callback and public-capability retirement
9. WebGPU/WebGL2 browser matrix
10. build and Pages parity
```

## Target files

```txt
src/menu.js
menu.html
tests/menu-game-shell-smoke.mjs
tests/menu-postcard-browser.fixture.mjs
package.json
.github/workflows/pages.yml
```

## Acceptance matrix

```txt
WebGPU and WebGL2
DPR 1 and 1.5
wide, square and narrow viewports
reduced motion
near and mip-sensitive camera distances
frond alpha halo and neighbor-cell probes
flower transparency probe
resize before first frame
normal Play handoff
900 ms fallback reveal
pagehide and BFCache
complete resource retirement
source/build/Pages artifact parity
```

## Ownership constraints

The menu authority owns postcard assets, frames and retirement. The shell-startup authority owns independent preload and degraded fallback. Core Startup owns game readiness. The preload bridge owns game sleep/resume. Adventure kits own gameplay truth.

## Do not claim

Do not claim atlas isolation, exact postcard appearance, backend parity, complete menu cleanup or deployed readiness until the executable matrix passes on `main`.