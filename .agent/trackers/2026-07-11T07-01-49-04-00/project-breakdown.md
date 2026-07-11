# Project Breakdown: MyCozyIsland Runtime Session Lifecycle

Timestamp: `2026-07-11T07-01-49-04-00`

## Plan ledger

**Goal:** document the complete runtime-session ownership boundary required to start, run, fail, stop, dispose and restart the pinned Core World/WebGPU route without stale callbacks or residual resources.

- [x] Compare all ten accessible `LuminaryLabs-Publish` repositories with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm nine eligible repositories are tracked and have root `.agent` state.
- [x] Select only `MyCozyIsland` because its newer repo-local audit was not centrally synchronized.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all 50 local kits, imported services and runtime-implied kits.
- [x] Identify browser, world, render, GPU and global resources.
- [x] Trace success, failure, pagehide and missing restart paths.
- [x] Define lifecycle state, command, resource lease and fixture boundaries.
- [x] Update root `.agent` documents and add timestamped audits.
- [x] Change no runtime source or deployment configuration.
- [x] Push only to `main`; create no branch or pull request.

## Selection

```txt
accessible repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing: 0
root-.agent-missing: 0
selected: MyCozyIsland
selection trigger: repo-local 06:50:30 audit newer than central 05:10:36 ledger
excluded: TheCavalryOfRome
```

## Interaction loop

```txt
route load
  -> pinned imports
  -> local kit validation
  -> WebGPU/WebGL2 renderer initialization
  -> Core World and seven-provider preparation
  -> compatibility snapshot
  -> world/ocean/foam/atmosphere/post construction
  -> input, resize, pagehide and timer registration
  -> renderer animation loop
  -> scenario, camera, focus, presentation, performance and render
  -> global host publication
  -> pagehide resets only Core World state
```

## Domain groups

```txt
route and module host
browser input and viewport
loader/error/global projection
runtime lifecycle and callback admission
Core World identity, partition, surface, focus and providers
world wrapper, query and compatibility bridge
scenario, camera rail and first-person exploration
determinism, terrain, biome, shoreline and ground contact
vegetation, rocks, props, campfire and grass
ocean, foam, cloud, fog, weather, wind and illumination
Three/WebGPU world and post rendering
performance and debug diagnostics
validation and Pages deployment
```

## Services

The 50 local kits provide deterministic world semantics, terrain and environment queries, placement graphs, ocean and atmosphere descriptors, render quality/archetypes/snapshots, WebGPU/WebGL2 renderer adapters, camera/scenario state, performance control and debug projection.

The imported Core World services provide engine creation, world registration, grid partitioning, flat surface coordination, terrain-provider adaptation and ordered effect-provider definition.

Runtime-implied services provide provider stores, world query, compatibility bridging, browser input, animation hosting, global diagnostics, renderer-cell caching and isolated graph disposal.

## Main finding

No object owns the complete route session. `main()` acquires resources directly, `main().catch(fail)` does not roll back partial startup, and `pagehide` calls only `domains.dispose()`. Animation, listeners, timers, scene resources, generated textures, post-processing, renderer/backend and the global host have no exact terminal release proof.

## Required boundary

```txt
runtime-session-authority-domain
  -> identity and lifecycle state
  -> typed start/stop/dispose/restart commands and results
  -> acquisition ledger and reverse cleanup stack
  -> listener/timer/animation-loop leases
  -> session-epoch callback fences
  -> render-resource registry and disposal adapters
  -> global-exposure lease
  -> startup rollback and restart handoff
  -> bounded observations and deterministic fixtures
```

## Output

```txt
refreshed:
  .agent/START_HERE.md
  .agent/current-audit.md
  .agent/next-steps.md
  .agent/known-gaps.md
  .agent/validation.md
  .agent/kit-registry.json

added:
  .agent/trackers/2026-07-11T07-01-49-04-00/project-breakdown.md
  .agent/turn-ledger/2026-07-11T07-01-49-04-00.md
  .agent/architecture-audit/2026-07-11T07-01-49-04-00-runtime-session-lifecycle-dsk-map.md
  .agent/render-audit/2026-07-11T07-01-49-04-00-webgpu-resource-ownership-disposal-gap.md
  .agent/gameplay-audit/2026-07-11T07-01-49-04-00-startup-run-stop-restart-loop.md
  .agent/interaction-audit/2026-07-11T07-01-49-04-00-listener-timer-animation-command-map.md
  .agent/lifecycle-audit/2026-07-11T07-01-49-04-00-session-epoch-resource-lease-contract.md
  .agent/deploy-audit/2026-07-11T07-01-49-04-00-lifecycle-restart-fixture-gate.md
```

## Validation status

```txt
runtime changed: no
rendering changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
executable lifecycle fixture: unavailable
browser restart smoke: not run
```
