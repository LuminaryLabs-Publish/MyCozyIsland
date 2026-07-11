# Validation: MyCozyIsland

Last updated: `2026-07-11T11-19-10-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: repo-local reset/reprepare audit newer than central ledger
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

**Goal:** record exactly what was verified from source and define executable proof required before browser session lifecycle, reset, disposal, or restart can be considered authoritative.

- [x] Verify current production route and dependency identity.
- [x] Verify full browser ingress and animation-loop behavior.
- [x] Verify raw global-host exposure.
- [x] Verify pagehide disposal scope.
- [x] Verify Core World reset/re-prepare defect remains relevant.
- [x] Define lifecycle fixture matrix.
- [ ] Execute Node and browser fixtures after implementation exists.

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
recent repo-local audit newer than central record: MyCozyIsland
excluded: TheCavalryOfRome
```

## Source identity verified

```txt
route: src/main-cloudform.js?v=core-world-1
Three.js: 0.185.0
NexusEngine: 38229f59c22cb40024ffd13a9f48040de759f5d7
world default: core
world rollback: ?world=legacy
world id: world:cozy-island-webgpu-v3
initial cells: 49
local kit descriptors: 50
Core World providers: 7
package version: 0.3.1
```

## Browser lifecycle facts verified from source

```txt
renderer created inside main: yes
renderer.setAnimationLoop installed: yes
animation loop cleared by route: no
wheel listener retained for removal: no
pointer listeners retained for removal: no
keyboard/blur listeners retained for removal: no
resize listener retained for removal: no
loader timeout handles retained: no
sessionId/sessionGeneration exists: no
session phase exists: no
startup rollback ledger exists: no
reset quiescence exists: no
global host exposes raw world/runtime/render objects: yes
global host revocation exists: no
pagehide calls domains.dispose: yes
pagehide disposes complete render graph: no
idempotent session-disposal result exists: no
```

## Reset interaction facts verified

```txt
world definition registered during construction: yes
prepare registers definition: no
product reset calls coreWorld.resetWorlds: yes
pinned resetWorlds clears runtime definitions: yes
product reset clears materializer and wrapper fields: yes
world reset callable through global host: yes
animation callback can continue after reset: yes
compatibility renderer retains startup snapshot: yes
world generation exists: no
renderer/world generation correlation exists: no
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

Current tests prove initial world/provider and isolated renderer-utility behavior. They do not construct the production browser ownership graph or prove startup rollback, callback quiescence, complete pagehide disposal, reset under the live frame loop, or clean restart.

## Validation not executed in this documentation run

```txt
npm install
npm test
browser launch
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
startup failure injection
reset/re-prepare execution
pagehide disposal
renderer/resource census
browser restart
```

The GitHub connector was used for source inspection and documentation writes. A runnable checkout and browser were unavailable, so no executable validation claim is made.

## Required lifecycle fixture matrix

```txt
startup creates one renderer, animation loop, listener set, timer set and global host
failure after each acquisition rolls back all prior acquisitions
old callbacks cannot mutate after session generation retirement
loader timers cannot mutate after stop/failure
reset enters quiescing before world recovery
held keyboard and pointer drag state retire before reset
scenario/focus/materialization/render publication freeze during reset
world reset/reprepare produces a fresh world generation
first visible frame identifies new world and renderer generations
retained old global host is inert
pagehide during booting, running, resetting and disposed is idempotent
terminal stop clears animation loop
terminal stop removes listeners and timers
terminal stop retires complete render-resource inventory
second stop returns already-disposed
restart creates exactly one successor session
WebGPU, WebGL2 and legacy paths pass
```

## Required proof fields

```txt
sessionId
sessionGeneration
worldGeneration
rendererGeneration
phase
animationLeaseCount
listenerLeaseCount
timerLeaseCount
resourceAcquireCount
resourceReleaseCount
firstVisibleFrameId
staleCallbackRejectCount
disposalStatus
failures[]
```

## Required browser proof

```txt
no duplicate renderer, loop, listener set, timer chain or host
no world reset while old frame work is admitted
no old-generation materialization after reset
no rendering after terminal disposal
no delayed DOM mutation after failure/stop
pagehide and explicit stop converge on one terminal result
restart leaves one clean session
```

## Readiness statement

The current route is suitable for one startup followed by a page exit only as an unproven best-effort path. It is not safe to advertise reusable reset, complete disposal, or clean restart until session phases, callback leases, startup rollback, reset quiescence, full render-resource retirement, host revocation, idempotent disposal, and executable browser fixtures exist.