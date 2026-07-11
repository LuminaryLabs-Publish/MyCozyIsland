# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T17-50-37-04-00`

## Summary

The route has no authoritative runtime session lifecycle. `pagehide` resets only the world runtime while the renderer loop, browser callbacks, timers, scenario state, render resources and global readback remain retained. There is no explicit bfcache policy, complete disposal transaction, stale-callback fence or clean restart proof.

## Concrete lifecycle defect

```txt
running page
  -> renderer loop advances scenario and rendering
  -> pagehide calls domains.dispose()
  -> Core World prepared=false
  -> materializer reset
  -> renderer loop still retained
  -> browser listeners and timers still retained
  -> scene/GPU/post resources still retained
  -> globalThis.CozyIsland still exposes references
  -> no pageshow handler restores or rebuilds a coherent session
```

## Session authority gaps

```txt
runtime session ID: absent
session generation: absent
lifecycle state machine: absent
lifecycle command sequence: absent
exclusive animation-loop lease: absent
stop result: absent
dispose result: absent
restart result: absent
bounded lifecycle journal: absent
```

## Browser callback gaps

```txt
listener registry: absent
listener removal receipts: absent
timeout registry: absent
timeout cancellation: absent
pointer-capture retirement: absent
held-input retirement: partial, blur-only
resize admission: absent
stale callback fencing: absent
pagehide persisted policy: absent
pageshow handler: absent
visibility lifecycle policy: absent
```

## Render-resource gaps

```txt
post-pipeline disposal contract: absent
pass/render-target retirement: absent
cloud/fog volume texture retirement: absent
scene resource inventory: absent
shared-resource deduplication: absent
world-renderer dispose: absent
ocean-renderer dispose: absent
foam-renderer dispose: absent
cloud-renderer dispose: absent
fog-renderer dispose: absent
renderer.dispose() from route: absent
backend retirement receipt: absent
resource fingerprint: absent
```

## World and gameplay gaps

```txt
Core World retirement result: absent
provider-store retirement receipt: absent
materializer in-flight work fence: absent
scenario stop/reset ownership: absent
camera/input lifecycle result: absent
environment clock suspend/resume policy: absent
world/scenario/render session parity: absent
```

## Global readback gaps

```txt
raw renderer exposure: present
raw scene/camera exposure: present
raw world runtime exposure: present
raw renderer component exposure: present
global revocation after dispose: absent
clone-safe lifecycle observation: absent
first resumed/restarted frame receipt: absent
```

## bfcache and restart gaps

```txt
persisted pagehide classification: absent
same-session suspend/resume contract: absent
full dispose/restart contract: absent
frame-time baseline reset: absent
resource readiness revalidation: absent
new generation on restart: absent
old generation callback rejection: absent
first restarted frame acknowledgement: absent
```

## Retained upstream and downstream gaps

```txt
P0 browser startup admission and rollback
P0 runtime session lifecycle
P1 Core World reset/re-prepare
P1 focus transaction authority
P1 materialization generation/readiness
P1 renderer cell commit/disposal
P1 camera baseline authority
P1 dynamic environment frame authority
P1 adaptive quality transaction authority
```

## Missing fixtures

```txt
lifecycle state transition table
animation-loop stop
listener install/remove parity
timeout cancellation
stale callback rejection
persisted pagehide/pageshow
non-persisted pagehide
scene/post/volume/renderer retirement
shared resource exactly-once disposal
Core World/materializer retirement
duplicate stop/dispose
restart generation monotonicity
first resumed/restarted frame parity
WebGPU/WebGL2 lifecycle parity
Pages lifecycle smoke
```

## Risk ranking

```txt
P0  startup failure leaves partial resource graph
P0  page lifecycle can create mixed reset/live runtime state
P0  stale callbacks can outlive world or future session generation
P0  final disposal does not retire browser and GPU ownership
P1  bfcache resume and restart behavior are undefined
P1  global raw references preserve disposed authority
P1  downstream world/render/quality work lacks session fencing
P2  detached diagnostics do not expose lifecycle truth
```

## Non-goals of this documentation run

```txt
no runtime code changed
no renderer behavior changed
no package scripts changed
no dependencies changed
no workflow or deployment changed
no lifecycle correctness claim made
```
