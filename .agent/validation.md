# Validation: MyCozyIsland

Last updated: `2026-07-11T11-10-29-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible documented repository after confirming no new, ledger-missing, or root-.agent-missing repo
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
oldest eligible central record before this pass: MyCozyIsland at 2026-07-11T09-08-59-04-00
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

## Reset facts verified from source

```txt
world definition registered during construction: yes
prepare registers definition: no
prepare sets focus and updates world: yes
product reset calls coreWorld.resetWorlds: yes
pinned resetWorlds clears runtime definitions: yes
product reset clears materializer and wrapper fields: yes
product reset re-registers world definition: no
product reset returns typed result: no
world generation exists: no
provider release/reset result reaches product: no
product checkpoint/rollback exists: no
terminal disposed state exists: no
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

Current tests prove initial prepare, 49 active cells, seven provider layers, portable coordination snapshots, focus-driven retain/prepare/release behavior, isolated lazy materialization, and renderer utility behavior. They do not call `reset()` followed by `prepare()` on the same product wrapper.

## Validation not executed in this documentation run

```txt
npm install
npm test
browser launch
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
reset/re-prepare execution
provider failure injection
browser restart
renderer generation correlation
```

The GitHub connector was used for source inspection and documentation writes. A runnable checkout and browser were unavailable, so no executable validation claim is made.

## Required fixture matrix

```txt
initial prepare produces 49 active cells
partial materialization exists before reset
reset advances world generation
all prior active cells release exactly once
all provider stores reach zero before re-prepare
materializer old jobs are cancelled
world definition is retained or re-registered
re-prepare returns 49 active cells
provider order remains identical
same seed/config produce deterministic fresh descriptors
old focus command is rejected
old materialization completion is rejected
provider release failure is typed
provider reset failure is typed
registration failure rolls back or blocks
prepare failure rolls back or blocks
terminal dispose is idempotent
prepare after terminal dispose is rejected
browser restart creates one active loop/listener set
visible frame cites new world generation
```

## Required browser proof

```txt
reset command freezes world updates
compatibility renderer remains stable during reset
fresh prepare completes before updates resume
debug state exposes world generation and recovery status
no old-generation materialization counters increase after reset
pagehide and explicit dispose do not double-release resources
restart produces one renderer, one animation loop, and one global host
```

## Readiness statement

The current wrapper is safe for one startup and terminal disposal, but it is not safe to advertise reusable reset/restart behavior. Do not call `reset()` and then `prepare()` until world-definition retention or re-registration, provider/materializer release results, world generation, stale-work rejection, and reset/re-prepare fixtures exist.
