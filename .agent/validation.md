# Validation: MyCozyIsland

Last updated: `2026-07-11T07-01-49-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: newer repo-local audit was not yet synchronized to central tracking
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
MyCozyIsland repo-local audit before this pass: 2026-07-11T06-50-30-04-00
MyCozyIsland central ledger before this pass: 2026-07-11T05-10-36-04-00
selected: MyCozyIsland
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
initial active cells: 49
local kit descriptors: 50
Core World providers: 7
```

## Lifecycle facts verified from source

```txt
one top-level main() owns construction: yes
top-level failure path: main().catch(fail)
startup rollback stack: absent
session ID: absent
session epoch: absent
lifecycle state machine: absent
stop command: absent
restart command: absent
renderer animation loop installed: yes
route-level animation-loop cancellation: absent
canvas/window listeners installed: yes
listener lease registry: absent
two nested loader timers: yes
timer lease registry: absent
pagehide listener: yes
pagehide action: domains.dispose only
complete render graph disposal: absent
renderer/backend disposal: absent
global host publication: globalThis.CozyIsland
global host retirement: absent
```

## Acquired resources identified

```txt
browser:
  wheel, pointerdown, pointerup, pointercancel, pointermove
  keydown, keyup, blur, resize, pagehide
  loader completion timeout, loader hide timeout
  renderer animation loop
  global host assignment

world:
  legacy semantic composition
  pinned engine and Core World registration
  partition, surface, providers and stores
  query, bridge, scenario and clock

render:
  WebGPURenderer/backend
  scene, camera, sky, lights and shadows
  world and layered-grass graph
  ocean and foam
  cloud/fog volume textures
  cloud and fog renderers
  RenderPipeline and passes
  performance and debug services
```

## Disposal capability facts verified

```txt
domains.dispose resets Core World state: yes
live route invokes disposeRendererObject: no
disposeRendererObject can release graph geometry/material/texture resources: yes
whole-island renderer common dispose result: no
ocean renderer common dispose result: no
foam renderer common dispose result: no
cloud/fog common dispose result: no
post pipeline common dispose result: no
exact-once resource identity ledger: no
residual-resource readback: no
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
  -> renderer-cell-cache
  -> renderer-resource-disposal
```

These tests cover normal-path semantics and isolated renderer utilities. They do not prove route-level session ownership or complete browser/WebGPU teardown.

## Validation not executed in this documentation run

```txt
npm install
npm test
browser smoke
WebGPU initialization
WebGL2 fallback initialization
startup failure injection
stop/dispose/restart fixture
listener and timer lease fixture
animation-loop cancellation fixture
resource residual-count fixture
global-host retirement fixture
old-callback rejection fixture
pinned-runtime contract parity fixture
provider failure injection
provider-to-render synchronization fixture
```

The GitHub connector was used for source inspection and documentation writes. A runnable checkout and browser were unavailable, so no executable pass claim is made.

## Required lifecycle fixture matrix

Inject a failure or stop at each row:

```txt
before renderer construction
after renderer construction
inside renderer.init
after Core World creation
during initial world prepare
after scene/sky/lights
after world renderer
after ocean
after foam
during atmosphere texture creation
after cloud
after fog
after post pipeline
after listener registration
after timer registration
after animation-loop registration
after global-host publication
before first frame
during frame
during focus update
during render submit
```

For every row prove:

```txt
one terminal lifecycle result exists
all acquired leases have release results
no unowned listener or timeout remains
animation loop is inactive
old-epoch callbacks are rejected
Core World state is reset or explicitly reported residual
scene/GPU resources have zero unexplained residuals
global host is retired or restored
repeat disposal is unchanged and safe
newer session starts without duplicate work
```

## Browser proof required

```txt
WebGPU core start -> stop -> restart
WebGL2 core start -> stop -> restart
legacy start -> stop -> restart
startup failure -> error projection -> clean retry
pagehide -> zero live leases
old frame callback after restart is rejected
old focus callback after restart is rejected
input after restart mutates only the new session
H overlay after restart has one listener
```

## Second-gate proof retained

After lifecycle passes, run the exact pinned Core World contract and provider-failure matrix against both production and fake adapters. Prove retriable prepare, typed focus results, provider rollback and session-epoch correlation before visible cell rendering.

## Readiness statement

The route is visually and semantically functional, but `pagehide -> domains.dispose()` is not a complete runtime teardown. Runtime session identity, startup rollback, callback fencing, exact disposal and restart proof remain the first implementation gate.
