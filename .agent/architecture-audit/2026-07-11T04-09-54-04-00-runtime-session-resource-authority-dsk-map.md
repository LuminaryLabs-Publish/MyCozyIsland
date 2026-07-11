# Architecture Audit: Runtime Session Resource Authority DSK Map

Timestamp: `2026-07-11T04-09-54-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** define the smallest domain boundary that can own route startup, running, failure rollback, stop, disposal, restart, and resource provenance without rewriting existing world or renderer kits.

- [x] Map current startup composition.
- [x] Map acquired browser, Three, WebGPU, timing, listener, and global resources.
- [x] Identify current owners and missing release services.
- [x] Preserve all existing 50 source-backed kits.
- [x] Define candidate authority kits around the current factories.
- [x] Keep visual and simulation behavior out of this documentation pass.

## Current composition

```txt
main-cloudform.js
  -> validates kitCatalog
  -> creates WebGPURenderer
  -> creates deterministic domain snapshot
  -> creates scene/camera/sky/lights
  -> creates world/ocean/foam/volume/cloud/fog/post consumers
  -> creates performance/debug services
  -> installs browser side effects
  -> starts animation loop
  -> publishes global host
```

This is a composition function, but it is not a runtime-session domain. It exposes no explicit lifecycle state or result and returns no handle.

## Current ownership map

```txt
resource                            current effective owner             release path
WebGPURenderer                      main() local                        none
renderer animation loop             renderer internal callback         none
scene and camera                     main() local                        none
sky geometry/material/texture        scene child                         none
lights and shadow resources          scene children                      none
world geometry/materials/textures    world renderer closure/group        none
layered grass atlas/geometry/material discarded inner handle             none
ocean geometry/material              ocean renderer handle               none
foam geometries/materials            foam renderer closure/group         none
cloud geometry/materials             cloud renderer closure/group        none
fog geometry/material                fog renderer handle                 none
3D/storage textures and compute nodes volumeTextures object               none
post pipeline, passes and uniforms   postPipeline object                 none
performance callbacks                performanceBudget closure            none
debug DOM state                      debugOverlay closure                 none
canvas listeners                     anonymous callbacks                 none
window listeners                     anonymous callbacks                 none
loader timeouts                      anonymous nested timeouts           none
globalThis.CozyIsland                global assignment                    no tombstone/unpublish
```

## Missing lifecycle states

```txt
idle
starting
running
stopping
disposed
failed
restarting
```

The route has no monotonic session epoch, startup attempt ID, terminal reason, resource count, acquisition journal, disposal journal, or stale-callback admission policy.

## Proposed parent domain

```txt
cozy-island-runtime-session-domain
```

Owns:

```txt
sessionEpoch
status
startupAttempt
terminalReason
acquiredResourceRegistry
listenerLeaseRegistry
timeoutLeaseRegistry
animationLoopLease
hostPublicationLease
startupResult
stopResult
disposeResult
restartResult
bounded lifecycle journal
```

## Candidate kits

### Session state and admission

```txt
route-session-state-kit
runtime-session-epoch-kit
runtime-command-admission-kit
runtime-session-result-kit
runtime-lifecycle-observation-kit
```

Services:

```txt
create epoch
admit/reject command by epoch and status
transition lifecycle state
emit typed result
publish JSON-safe observation
```

### Transactional startup

```txt
startup-transaction-kit
resource-registration-kit
startup-rollback-kit
```

Services:

```txt
record each acquisition in order
commit only after all required resources are ready
rollback acquired resources in reverse order on error
emit accepted/failed/rolled-back rows
```

### Browser side-effect ownership

```txt
listener-lease-kit
timeout-lease-kit
animation-loop-lease-kit
global-host-publication-kit
```

Services:

```txt
register removable listener identity
track and clear timeout IDs
start and clear exactly one renderer animation loop
publish, replace, tombstone, and unpublish the global host by epoch
```

### GPU and Three resource ownership

```txt
renderer-resource-owner-kit
three-resource-disposal-kit
atmosphere-volume-disposal-kit
post-pipeline-disposal-kit
```

Services:

```txt
own renderer/backend lifetime
traverse and dispose geometry, materials and textures once
dispose cloud/fog 3D textures and compute resources
dispose or release post passes and pipeline resources
report acquired/disposed counts and duplicate-dispose attempts
```

### Proof

```txt
runtime-lifecycle-fixture-kit
browser-webgpu-restart-smoke-kit
```

Services:

```txt
headless fake-resource acquisition and rollback proof
listener/timer/loop leak assertions
idempotent stop/dispose assertions
same-seed restart fingerprint parity
browser/WebGPU memory and duplicate-loop smoke
```

## Command contract

```txt
start(options)
stop(reason)
dispose(reason)
restart(options)
getState()
```

Each command returns:

```txt
commandId
sessionEpoch
status: accepted | unchanged | rejected | failed
reason
beforeStatus
afterStatus
acquiredCount
disposedCount
remainingCount
startedAtFrame
completedAtFrame
fingerprint
```

## Dependency order

```txt
runtime session lifecycle
  -> camera baseline/reset
  -> terrain revision/consumers
  -> dynamic environment frame
  -> adaptive quality transactions
```

Every later authority boundary needs a stable epoch and disposal path so stale callbacks, snapshots, and GPU resources cannot cross restart.

## Non-goals

- no renderer replacement
- no visual tuning
- no terrain or atmosphere algorithm change
- no new content
- no kit-count change until the authority contract is proven
- no public promotion before fixture proof
