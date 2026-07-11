# Validation: MyCozyIsland

Last updated: `2026-07-11T12-50-35-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible current central-ledger entry
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** record source-backed adaptive-quality facts and the executable proof required before the feature can be described as stable.

- [x] Verify the complete Publish selection comparison.
- [x] Verify startup quality policy and active route identity.
- [x] Verify performance EMA, thresholds, counters and adaptive levels.
- [x] Verify every currently mutated render consumer.
- [x] Verify frame-count dwell produces refresh-rate-dependent behavior.
- [x] Verify level-zero recovery skips pixel-ratio restoration.
- [x] Verify no prepare/commit/rollback or typed result exists.
- [x] Verify current tests do not execute the production adaptive loop.
- [ ] Execute adaptive fixtures after implementation exists.

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
selected oldest eligible: MyCozyIsland
excluded: TheCavalryOfRome
```

## Source identity verified

```txt
route: src/main-cloudform.js?v=core-world-1
Three.js: 0.185.0
NexusEngine: 38229f59c22cb40024ffd13a9f48040de759f5d7
world default: core
world rollback: ?world=legacy
local kit descriptors: 50
Core World providers: 7
package version: 0.3.1
```

## Adaptive facts verified

```txt
startup tiers: low, medium, high, ultra
adaptive levels: 0, 1, 2
sample cadence: once per rendered frame
sample clamp: 1..100 ms
EMA weight: 0.93 previous + 0.07 current
degrade threshold: target * 1.26
recover threshold: target * 0.86
degrade dwell: 90 samples
recover dwell: 360 samples
mutated consumers: cloud steps, fog steps, fog resolution, pixel ratio
consumer transaction: absent
transition result: absent
quality frame receipt: absent
```

## Cadence calculation verified

```txt
90 samples at 30 Hz: 3.00 s
90 samples at 60 Hz: 1.50 s
90 samples at 120 Hz: 0.75 s
360 samples at 30 Hz: 12.00 s
360 samples at 60 Hz: 6.00 s
360 samples at 120 Hz: 3.00 s
```

## Recovery defect verified

```txt
applyPerformanceLevel(0)
  cloud step scale: restored
  fog step scale: restored
  fog resolution scale: restored
  pixel ratio: not restored
```

The pixel-ratio call is guarded by `if (level > 0)`.

## Existing test surface identified

```txt
npm test
  -> static-check
  -> domain-smoke
  -> world-baseline
  -> core-world-runtime
  -> world-provider-order
  -> world-query-parity
  -> world-population-parity
  -> world-snapshot-portability
  -> world-cell-lifecycle
  -> lazy-world-materialization
  -> renderer-cell-cache
  -> renderer-resource-disposal
```

No current test constructs the production performance loop or checks adaptive level timing, full recovery, consumer rollback or frame correlation.

## Validation not executed

```txt
npm install
npm test
browser launch
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
adaptive transition execution
cadence simulation
failure injection
frame receipt capture
```

The GitHub connector was used for source inspection and documentation writes. No runnable browser checkout was available, so no executable runtime claim is made.

## Required adaptive fixture matrix

```txt
same elapsed evidence at 30/60/90/120 Hz produces same decision time
irregular frame schedules preserve decision parity
hidden/suspended frames follow declared policy
minimum-level dwell prevents oscillation
0 -> 1 and 1 -> 2 commit all consumers
2 -> 1 and 1 -> 0 recover all consumers
pixel ratio returns to startup value at level 0
prepare rejection causes no mutation
commit failure rolls back every consumer
stale session, renderer generation and revision reject
reset/stop/dispose phases reject transitions
duplicate command is idempotent
WebGPU and WebGL2 produce valid consumer plans
effective quality fingerprint is stable
first visible frame acknowledges committed revision
```

## Required proof fields

```txt
sessionId
sessionGeneration
rendererGeneration
performanceSampleId
monotonicTimeMs
qualityPolicyRevision
qualityRevision
fromLevel
toLevel
decisionEvidence
consumerReceipts[]
rollbackReceipts[]
effectiveQualityFingerprint
committedFrameId
status
failures[]
```

## Readiness statement

Startup quality selection is source-backed, but adaptive quality is not yet transactionally reliable. Do not claim cadence-independent adaptation or full recovery until elapsed-time policy, session fencing, consumer prepare/commit/rollback, pixel-ratio restoration, effective-state fingerprinting and visible-frame fixtures pass.
