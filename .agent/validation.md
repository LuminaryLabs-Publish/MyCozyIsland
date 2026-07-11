# Validation: MyCozyIsland

Last updated: `2026-07-11T14-41-28-04-00`

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

**Goal:** record source-backed startup facts and the executable proof required before browser boot, backend fallback, rollback or readiness can be described as authoritative.

- [x] Verify the complete Publish selection comparison.
- [x] Verify route, dependency, world, provider and kit identities.
- [x] Verify static module imports execute before `main()`.
- [x] Verify `main().catch(fail)` cannot catch a failed static module graph.
- [x] Verify renderer, world and render resources are allocated in ordered stages.
- [x] Verify `fail()` projects text but performs no resource rollback.
- [x] Verify pagehide cleanup is installed only after startup completes.
- [x] Verify loader completion is timer-driven rather than first-frame acknowledged.
- [x] Verify no startup transaction, generation, resource ledger, retry result or backend admission record exists.
- [ ] Execute startup fixtures after implementation exists.

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
oldest eligible central entry: MyCozyIsland at 2026-07-11T12-58-06-04-00
excluded: TheCavalryOfRome
```

## Source identity verified

```txt
route: src/main-cloudform.js?v=core-world-3
Three.js: 0.185.0
NexusEngine: 38229f59c22cb40024ffd13a9f48040de759f5d7
world default: core
world rollback query: ?world=legacy
local kit descriptors: 50
Core World providers: 7
package version: 0.3.1
```

## Startup facts verified

```txt
import map loads Three.js and NexusEngine from pinned CDN URLs
Three.js imports are static and resolve before main()
main().catch(fail) exists only after route module evaluation succeeds
renderer.init() is awaited
backend is inferred after init as webgpu or webgl2
quality is selected once from the inferred backend
Core World prepare is awaited
scene and GPU resources are allocated incrementally
loader completion uses nested timers
animation loop starts before pagehide handler installation
pagehide calls only domains.dispose()
fail() does not roll back acquired resources
first-frame readiness result is absent
startup retry command is absent
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

The static test asserts pinned import strings and route tokens. It does not execute the browser module graph, renderer initialization, backend fallback, loader state, partial-startup rollback, retry or first-frame readiness.

## Validation not executed

```txt
npm install
npm test
browser launch
CDN cold-load
module-fetch failure injection
WebGPU initialization
WebGL2 fallback initialization
renderer.init rejection
Core World prepare rejection
GPU resource allocation failure
startup rollback
startup retry
first-frame capture
Pages smoke
```

The GitHub connector was used for source inspection and documentation writes. No runnable browser checkout was available, so no executable startup or rendering claim is made.

## Required startup fixture matrix

```txt
Three.js fetch failure is projected visibly
Three.js parse/evaluation failure is classified
NexusEngine dynamic import failure is classified
renderer.init failure rolls back renderer state
WebGPU rejection can admit a supported WebGL2 candidate
no-compatible-backend produces a terminal result
Core World prepare failure releases world and renderer resources
atmosphere volume failure releases prior GPU resources
post-pipeline failure releases the complete render graph
loader timers are cancelled on failure
listeners and callbacks are retired on rollback
retry uses a new generation
stale prior-generation completions reject
duplicate retry is idempotent
first visible frame acknowledges startup/backend/world fingerprints
Pages cold-load succeeds with truthful loader transitions
```

## Required proof fields

```txt
startupId
startupGeneration
moduleManifestFingerprint
stageId
stageRevision
backendCandidate
admittedBackend
backendCapabilityFingerprint
qualityFingerprint
acquiredResources[]
cleanupReceipts[]
worldRevision
firstFrameId
status
failureCode
failedStage
startedAt
committedAt
```

## Readiness statement

The successful startup path is source-backed, but startup authority is not. Do not claim reliable WebGPU/WebGL2 fallback, recoverable boot, leak-free partial failure or application readiness until module admission, staged resource ownership, backend selection, rollback, retry and first-frame acknowledgement are executable and observable.