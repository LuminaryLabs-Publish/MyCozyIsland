# START HERE: MyCozyIsland

Last aligned: `2026-07-12T05-00-19-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make adaptive quality a revisioned transaction whose requested policy, measured load, accepted transition, renderer consumers, diagnostics, recovery, resize behavior, and visible frame all agree.

## Summary

The runtime selects one immutable base quality tier at startup, then samples browser callback time through `createPerformanceBudget()`. Sustained over-budget samples raise a mutable performance level and immediately reduce cloud steps, fog steps, fog resolution, and device-pixel ratio.

The recovery path is asymmetric. Returning to level `0` restores cloud/fog settings, but `applyPerformanceLevel(0)` never restores the original pixel ratio because `renderer.setPixelRatio(...)` only runs when `level > 0`. A temporary slowdown can therefore leave the canvas permanently below its startup resolution until the page is recreated.

The transition thresholds are counted in frames rather than elapsed time. Ninety over-budget frames and 360 under-budget frames represent different real durations at 30, 60, and 120 Hz. The budget also samples RAF callback spacing rather than a typed CPU/GPU frame-cost result, and the debug overlay continues to label only the immutable base tier.

## Plan ledger

**Goal:** preserve automatic performance protection while making every degrade and recovery decision symmetric, cadence-independent, policy-aware, observable, resettable, and correlated with the frame that actually used it.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have central ledger entries and root `.agent` state.
- [x] Select only `MyCozyIsland` as the oldest eligible synchronized repository.
- [x] Trace startup quality selection, URL override behavior, RAF timing, moving-average hysteresis, renderer mutations, resize, diagnostics, public readback, and tests.
- [x] Identify the interaction loop, all domains, all 50 cataloged kits, one extra runtime kit, nine providers, and five imported NexusEngine services.
- [x] Confirm pixel ratio is reduced on degrade but not restored when level returns to zero.
- [x] Confirm degrade/recovery dwell is frame-count based and refresh-rate dependent.
- [x] Confirm the quality override selects a base tier but does not explicitly lock adaptive degradation.
- [x] Confirm diagnostics expose base tier and performance level separately without one active-quality revision.
- [x] Define quality policy, sample, transition, consumer receipt, recovery, resize, journal, fixture, and visible-frame contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable adaptive-quality fixtures remain future work.

## Selection comparison

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or central-ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0

MyCozyIsland       2026-07-12T03-39-52-04-00  selected
PrehistoricRush    2026-07-12T03-51-15-04-00
TheOpenAbove       2026-07-12T04-00-32-04-00
IntoTheMeadow      2026-07-12T04-11-54-04-00
PhantomCommand     2026-07-12T04-18-44-04-00
HorrorCorridor     2026-07-12T04-28-03-04-00
ZombieOrchard      2026-07-12T04-38-12-04-00
AetherVale         2026-07-12T04-50-41-04-00
TheUnmappedHouse   active repo-local work at prior comparison; not selected
TheCavalryOfRome   excluded
```

## Runtime identity

```txt
route:               index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:             0.4.1
Three.js:            0.185.0
NexusEngine commit:  481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:            world:cozy-island-webgpu-v4
cataloged kits:      50
extra runtime kits:  1
providers:           9
default world mode:  core
fallback mode:       legacy
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T05-00-19-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-12T05-00-19-04-00-adaptive-quality-transaction-authority-dsk-map.md
.agent/render-audit/2026-07-12T05-00-19-04-00-sticky-pixel-ratio-visible-frame-gap.md
.agent/performance-audit/2026-07-12T05-00-19-04-00-frame-count-hysteresis-recovery-contract.md
.agent/interaction-audit/2026-07-12T05-00-19-04-00-quality-sample-transition-result-map.md
.agent/deploy-audit/2026-07-12T05-00-19-04-00-adaptive-quality-fixture-gate.md
.agent/turn-ledger/2026-07-12T05-00-19-04-00.md
```

## Interaction loop

```txt
startup
  -> choose immutable base quality from URL, backend, memory, viewport, DPR, and motion preference
  -> set startup pixel ratio and allocate quality-dependent resources
  -> create performance budget at level 0

frame
  -> calculate RAF callback spacing
  -> advance scenario and update world/foam
  -> sample callback spacing into moving average
  -> possibly mutate performance level
  -> immediately change cloud steps, fog steps, fog resolution, and sometimes DPR
  -> render
  -> periodically project base tier plus separate performance state

degrade
  -> 90 qualifying over-budget frames
  -> level increments up to 2
  -> lower volumetric work and DPR

recover
  -> 360 qualifying under-budget frames
  -> level decrements
  -> restore volumetric work
  -> level 0 does not restore startup DPR
```

## Main finding

```txt
base quality descriptor: immutable startup value
active quality descriptor: absent
quality transition ID/revision: absent
sample source identity: absent
CPU/GPU timing separation: absent
time-based dwell: absent
visibility/throttling admission: absent
URL override lock policy: ambiguous
pixel-ratio recovery to level 0: missing
resize reclassification: absent
consumer receipts: absent
first visible quality-frame acknowledgement: absent
adaptive-quality fixture coverage: absent
```

## Implemented surface

```txt
50 catalog-admitted DomainKit entries
1 source-backed composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services
```

The complete per-kit service map is in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Required parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Validation boundary

```txt
runtime source changed by this pass: no
quality behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
npm test: not run
adaptive quality fixtures: unavailable
browser/WebGPU/WebGL2 adaptive smoke: not run
visible quality-frame receipt: unavailable
```