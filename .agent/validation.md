# Validation: MyCozyIsland

Last updated: `2026-07-11T17-50-37-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible documented repository after full Publish/ledger comparison
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

**Goal:** separate source-backed lifecycle findings from executable proof and define the exact stop, dispose, page lifecycle, resource-retirement and restart fixture gate.

- [x] Inspect route startup and animation-loop installation.
- [x] Inspect browser listeners and loader timers.
- [x] Inspect `pagehide` behavior.
- [x] Inspect Core World reset/dispose behavior.
- [x] Inspect renderer factory contracts and resource ownership.
- [x] Confirm explicit render-loop stop is absent.
- [x] Confirm complete route-level resource retirement is absent.
- [x] Document session, bfcache, stale callback and restart gaps.
- [x] Change documentation only.
- [ ] Add and run lifecycle ownership fixtures.
- [ ] Add and run production-route browser fixtures.
- [ ] Run deployed Pages lifecycle smoke.

## Source-backed checks

```txt
renderer.setAnimationLoop(callback): yes
renderer.setAnimationLoop(null): no
pagehide handler: yes
pagehide handler once-only: yes
pagehide calls domains.dispose(): yes
pageshow handler: no
session ID/generation: no
lifecycle state machine: no
listener registry/removal: no
timeout registry/cancellation: no
stale callback fence: no
scene/post/volume/renderer retirement transaction: no
global readback revocation: no
restart transaction: no
first restarted frame receipt: no
```

## Source-backed render ownership checks

```txt
WebGPURenderer created by route: yes
scene/camera/sky/lights created by route: yes
world/ocean/foam/cloud/fog renderers created by route: yes
volume textures created by route: yes
post pipeline created by route: yes
route calls renderer.dispose(): no
route traverses and disposes scene resources: no
route disposes volume textures: no
route disposes post resources: no
renderer factories expose unified dispose: no
```

## Existing validation surface

```txt
static architecture checks: present
semantic domain tests: present
Core World/provider tests: present
materialization utility tests: present
renderer cell-cache tests: present
renderer resource-disposal utility tests: present
production route lifecycle fixture: absent
pagehide/pageshow fixture: absent
animation-loop lease fixture: absent
listener/timer retirement fixture: absent
complete GPU retirement fixture: absent
restart fixture: absent
Pages lifecycle smoke: absent
```

## Required fixture matrix

```txt
1. lifecycle state table
   valid transitions, invalid transitions and duplicate commands

2. animation-loop ownership
   exactly one lease while running and zero after stop

3. browser callback retirement
   listeners removable, timers cancelled, pointer/input cleared

4. stale work
   old-generation frame, input, resize, timer, world and quality callbacks rejected

5. page lifecycle
   persisted pagehide/pageshow follows declared suspend/resume policy
   non-persisted pagehide follows final dispose policy

6. render retirement
   post, volume, texture, material, geometry, renderer and backend receipts

7. shared resources
   cloud geometry/material and other shared resources disposed exactly once

8. world retirement
   Core World, providers and materializer reach declared terminal state

9. restart
   new sessionId/generation, one listener/loop set and clean baseline

10. first frame
   first resumed/restarted frame carries the active session and generation

11. backend parity
   WebGPU and WebGL2 expose the same lifecycle result schema

12. deployment
   Pages smoke records lifecycle results, leaks, console output and first-frame evidence
```

## Commands not run

```txt
npm test
browser/WebGPU smoke
browser/WebGL2 smoke
pagehide/pageshow browser fixture
resource retirement capture
Pages live smoke
```

## Reason executable validation was not claimed

This run used repository-source inspection and GitHub documentation writes. The current repository does not contain the production-route lifecycle fixtures required to prove stop, resource retirement, bfcache behavior or restart correctness.

## Acceptance gate

```txt
one running session owns one animation-loop lease
no browser callback mutates after stop or disposal
final dispose leaves zero listener, timer and loop leases
all required world and render resources have retirement receipts
shared resources retire exactly once
duplicate lifecycle commands are idempotent
persisted and non-persisted page lifecycle behavior is explicit
restart uses a new generation
old-generation work cannot alter the new session
first resumed/restarted frame acknowledges the active session generation
global readback exposes no disposed raw authority
```
