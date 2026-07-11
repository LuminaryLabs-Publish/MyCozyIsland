# Validation: MyCozyIsland

Last updated: `2026-07-11T12-58-06-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: repo-local documentation newer than central tracking
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

**Goal:** record source-backed environment coherence facts and the executable proof required before dynamic environment behavior can be described as authoritative.

- [x] Verify the complete Publish selection comparison.
- [x] Verify route, dependency, world, provider and kit identities.
- [x] Verify the environment clock advances in the scenario.
- [x] Verify wind and illumination services are time-dependent when queried.
- [x] Verify world composition samples dependent descriptors once.
- [x] Verify scenario render snapshots refresh only clock and camera.
- [x] Verify render consumers mix elapsed animation and startup-frozen environment values.
- [x] Verify no environment frame transaction or visible-frame receipt exists.
- [ ] Execute environment fixtures after implementation exists.

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
repo-local newer than central: MyCozyIsland
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

## Environment facts verified

```txt
clock tick: live each scenario frame
clock reset: present
wind field: time-dependent when sampled
illumination state: time-dependent when sampled
weather preset: immutable
startup snapshot: frozen
scenario snapshot refreshes clock: yes
scenario snapshot refreshes camera: yes
scenario snapshot refreshes wind: no
scenario snapshot refreshes illumination: no
scenario snapshot refreshes cloud/fog state: no
```

## Consumer split verified

```txt
elapsed-time consumers:
  world generic sway
  campfire flame/light pulse
  ocean animation
  foam animation

startup-frozen consumers:
  sky gradient
  hemisphere light
  sun transform/color/intensity
  renderer exposure
  scene fog
  vegetation wind
  campfire smoke wind
  cloud weather/lighting/shadow/horizon
  fog density/advection/placement
```

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

No current test constructs a canonical live EnvironmentFrame or proves consumer coherence, reset replay, rollback or visible-frame acknowledgement.

## Validation not executed

```txt
npm install
npm test
browser launch
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
environment frame derivation
consumer transaction failure injection
reset replay
frame receipt capture
```

The GitHub connector was used for source inspection and documentation writes. No runnable browser checkout was available, so no executable runtime claim is made.

## Required environment fixture matrix

```txt
same seed and tick sequence produces same fingerprints
one tick commits one revision across all consumers
wind consumers agree across vegetation/campfire/cloud/fog
illumination consumers agree across sky/sun/hemisphere/exposure
reset reproduces the canonical initial frame
prepare rejection causes no mutation
commit failure rolls back every consumer
stale session/generation/tick/revision rejects
duplicate command is idempotent
WebGPU and WebGL2 produce valid consumer plans
effective environment fingerprint is stable
first visible frame acknowledges committed revision
```

## Required proof fields

```txt
sessionId
sessionGeneration
simulationTickId
environmentFrameId
environmentRevision
clockSample
weatherRevision
windRevision
illuminationRevision
consumerReceipts[]
rollbackReceipts[]
environmentFingerprint
committedFrameId
status
failures[]
```

## Readiness statement

The clock, wind and illumination services are source-backed, but dynamic environment rendering is not coherent. Do not claim live weather, lighting or wind parity until one environment frame is derived per admitted tick, all consumers prepare and commit one revision, reset reproduces the baseline, failures roll back, observations expose the effective frame, and one visible frame acknowledges the fingerprint.
