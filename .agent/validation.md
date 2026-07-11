# Validation: MyCozyIsland

Last updated: `2026-07-11T09-08-59-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: new production materialization integration landed after the prior central audit
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
recently changed but centrally stale: MyCozyIsland
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

## Live materialization facts verified from source

```txt
lightweight provider registration: yes
terrain materializes by rows: yes
biome reuses terrain arrays: yes
shoreline reuses terrain shore-distance values: yes
presentation refresh operation: yes
priority: LOD, focus distance, stable cell ID
max cells per frame config: 1
terrain rows per step config: 1
classification rows per step config: 4
world wrapper frame method: yes
live host calls frame method: yes
first host call: after second compatibility render
aggregate progress in debug/global host: yes
session/world/focus command fence: no
cell generation: no
elapsed-time budget: no
typed failure/retry result: no
cell readiness revision: no
provider readiness set: no
renderer consumes ready descriptors: no
visible-frame acknowledgement: no
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

The isolated lazy fixture proves zero heavy work during registration, deterministic priority, configured row stepping, eventual terrain/biome/shoreline readiness, presentation refresh, and scheduler removal of released cells. It does not import or execute the browser route, exercise provider failures, prove revision admission, or correlate ready cells with visible resources.

## Validation not executed in this documentation run

```txt
npm install
npm test
browser launch
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
live provider failure injection
focus/release concurrency
elapsed-time budget
readiness fingerprint
renderer-cell commit
visible-frame correlation
full runtime disposal and restart
```

The GitHub connector was used for source inspection and documentation writes. A runnable checkout and browser were unavailable, so no executable validation claim is made.

## Required fixture matrix

```txt
registration samples zero heavy terrain rows
production host advances work after compatibility frames
candidate and row limits hold
elapsed-time budget stops additional work
priority is deterministic
focus change reprioritizes current cells
released generation cannot publish readiness
reset/dispose rejects old commands
provider exception becomes typed failure
retry/backoff are bounded
ready presentation cites complete provider versions
readiness fingerprint is deterministic
same readiness revision is committed once
renderer update replaces prior resources atomically
failed prepare rolls back to compatibility/prior cell resources
released cells dispose resources once
visible frame cites renderer-cell revision
WebGPU and WebGL2 produce equivalent admission results
```

## Required browser proof

```txt
core mode reports materialization frames > 0
pending cells decline
completed cells increase
provider exception does not terminate animation loop
focus crossing cannot commit released generation
ready descriptor produces a renderer-cell plan
committed cell revision appears in visible-frame readback
legacy mode reports explicit idle materialization state
compatibility world remains visible until cell commit succeeds
```

## Readiness statement

Production lazy materialization now runs, but it is not yet an authoritative or render-consumed system. Do not claim cell-aware Core World rendering until session/world/focus fencing, failure handling, provider readiness versions, atomic renderer commits, disposal, and visible-frame proof exist.