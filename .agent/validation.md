# Validation: MyCozyIsland

Last updated: `2026-07-12T05-00-19-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible synchronized central entry
runtime source changed by this pass: no
quality behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed adaptive-quality defects from executable proof and define the exact policy, timing, transition, recovery, resize, consumer, backend, and visible-output gate.

- [x] Inspect the active route, package version, and quality catalog entries.
- [x] Inspect startup tier selection and URL override behavior.
- [x] Inspect performance-budget moving average and hysteresis.
- [x] Inspect every renderer mutation in `applyPerformanceLevel()`.
- [x] Inspect resize, visibility, page lifecycle, diagnostics, and public readback.
- [x] Inspect the current test chain.
- [x] Confirm level-zero recovery does not restore base DPR.
- [x] Confirm dwell thresholds count frames rather than elapsed time.
- [x] Confirm no quality revision or receipt proves one coherent transition.
- [x] Document policy, timing, recovery, resize, backend, and visible-frame fixtures.
- [x] Change documentation only.
- [ ] Implement and run the new executable fixtures.

## Source-backed checks

```txt
package version: 0.4.1
route cache key: foam-depth-camera-1
base quality tiers: low, medium, high, ultra
URL override accepted: yes
explicit fixed/adaptive override mode: no
performance levels: 0, 1, 2
moving average alpha: 0.07
degrade condition: movingAverage > target * 1.26
degrade dwell: 90 qualifying frames
recover condition: movingAverage < target * 0.86
recover dwell: 360 qualifying frames
cloud and fog step scale mutate: yes
fog resolution scale mutates: yes
DPR reduces above level zero: yes
DPR restores at level zero: no
resize re-evaluates quality: no
visibility gates timing samples: no
quality transition revision exists: no
consumer receipt exists: no
visible quality-frame acknowledgement exists: no
```

## Existing test surface

```txt
npm test chain: present
static/domain/world tests: present
render graph and terrain tests: present
camera tests: present
foam and renderer resource tests: present
performance-budget test: absent
adaptive-quality browser fixture: absent
```

## Existing tests do not prove

```txt
30/60/120 Hz transition timing parity
exact DPR restoration after full recovery
hidden-tab timing rejection
URL override policy semantics
resize transaction coherence
partial consumer rollback
base/active quality diagnostic parity
WebGPU/WebGL2 transition parity
first visible quality-frame acknowledgement
```

## Required fixture matrix

```txt
1. cadence parity
   equivalent elapsed over/under budget at 30, 60 and 120 Hz produces equivalent transition timing

2. full recovery
   level 2 -> level 1 -> level 0 restores exact base DPR and every mutable consumer

3. override policy
   URL override is explicitly fixed, bounded-adaptive or starting-tier adaptive

4. invalid timing
   first frame, hidden tab, suspension and large discontinuities are rejected or classified

5. resize
   viewport and device-DPR change commit one coherent policy revision

6. partial consumer failure
   one failed adapter prevents active-quality revision commit or triggers rollback

7. stale transition
   predecessor-generation callback cannot mutate replacement renderer state

8. backend parity
   WebGPU and WebGL2 expose equivalent policy and result semantics

9. diagnostics
   base tier, active level, DPR, reason and revision agree across debug and public readback

10. visible frame
    first rendered frame after transition cites the accepted quality revision and receipts

11. deployed route
    Pages reproduces cadence, recovery and visible-frame proof
```

## Commands not run

```txt
npm test
adaptive quality cadence fixture
pixel-ratio recovery fixture
override policy fixture
visibility/discontinuity fixture
resize transaction fixture
partial consumer failure fixture
WebGPU browser smoke
WebGL2 browser smoke
Pages adaptive-quality smoke
```

## Acceptance gate

```txt
quality policy is explicit and revisioned
dwell is elapsed-time based rather than refresh-rate based
invalid timing samples cannot trigger transitions
level-zero recovery restores exact base DPR
all mutable consumers commit or roll back together
immutable resources are explicitly classified
resize and replacement runtime generations fence stale work
diagnostics and public readback cite one active-quality revision
first visible transition frame carries the committed receipts
```