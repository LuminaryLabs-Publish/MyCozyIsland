# Project Breakdown: MyCozyIsland Pinned Core World Contract Parity

Timestamp: `2026-07-11T06-50-30-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

## Plan ledger

**Goal:** compare the test harness with the exact pinned Core World implementation and document the focus transaction required to prevent hidden provider failures from reaching future cell rendering.

- [x] Enumerate all ten accessible Publish repositories.
- [x] Exclude `TheCavalryOfRome`.
- [x] Compare the nine eligible repositories with the central ledger.
- [x] Confirm all nine have root `.agent` state.
- [x] Select only `MyCozyIsland` by the oldest documented timestamp.
- [x] Read the browser host and world wrapper.
- [x] Read provider stores and representative providers.
- [x] Read the local fake runtime and world fixtures.
- [x] Read the pinned Core World README and world-builder implementation.
- [x] Map interaction loop, domains, services and all 50 local kits.
- [x] Identify contract differences and failure paths.
- [x] Define candidate DSKs, fixture rows and implementation order.
- [x] Update required root `.agent` guidance.
- [x] Change no product runtime or deployment behavior.
- [x] Push only to `main`; create no branch or pull request.

## Selection comparison

```txt
MyCozyIsland       2026-07-11T05-10-36-04-00  selected
TheOpenAbove       2026-07-11T05-25-29-04-00
HorrorCorridor     2026-07-11T05-28-29-04-00
PrehistoricRush    2026-07-11T05-39-11-04-00
PhantomCommand     2026-07-11T05-50-43-04-00
ZombieOrchard      2026-07-11T06-02-00-04-00
TheUnmappedHouse   2026-07-11T06-21-57-04-00
AetherVale         2026-07-11T06-29-11-04-00
IntoTheMeadow      2026-07-11T06-38-59-04-00
TheCavalryOfRome   excluded
```

No new, ledger-missing, root-`.agent`-missing or otherwise undocumented eligible repository took precedence.

## Interaction loop

```txt
route startup
  -> validate 50-kit catalog
  -> create WebGPU/WebGL2 host
  -> create legacy semantic composition
  -> import pinned Core World runtime
  -> register world, grid, surface and providers
  -> prepare active cells
  -> build one compatibility render graph
  -> browser input and scenario tick
  -> focus threshold/cell-boundary admission
  -> setFocus commit
  -> updateWorld release/update/prepare/commit
  -> Boolean wrapper result
  -> elapsed-time renderer update
  -> post render and diagnostics
```

## Domains

```txt
browser route and lifecycle
input and camera sequence
scenario and environment clock
deterministic terrain/biome/shoreline
vegetation/rocks/props/campfire
ocean/cloud/fog/lighting
Core World identity/partition/focus/cell lifecycle
provider capability graph and effects
world query and compatibility bridge
Three/WebGPU rendering and performance
validation, test doubles and Pages deployment
missing focus transaction and contract parity authority
```

## Kit and service census

The existing catalog contains exactly 50 local descriptors. They offer deterministic seed/time, terrain, classification, placement, ocean, atmosphere, render descriptor, renderer adapter, scenario, performance and diagnostic services.

Imported runtime services:

```txt
createEngine
createCoreWorldDomain
createUniformGridPartition
createFlatWorldSurface
createTerrainProviderAdapter
defineWorldEffectProvider
```

Product providers:

```txt
terrain
biome
shoreline
vegetation
rocks
props
presentation
```

## Main finding

Normal-path Node tests inject a fake Core World runtime that does not reproduce production selection, capability, failure, rollback or diagnostic semantics. The product wrapper then reduces production focus transitions to Boolean success and can poison startup retries by setting `prepared` before the first world update succeeds.

The immediate contract risk is:

```txt
focus accepted
  -> old cells released
  -> new provider fails
  -> failed cell record committed
  -> wrapper returns changed=true
  -> future cell renderer cannot distinguish complete from incomplete world state
```

## Required order

```txt
1. runtime lifecycle and resource ownership
2. pinned-runtime contract parity and focus transaction
3. provider-to-render commit authority
4. camera baseline
5. environment frame
6. adaptive quality transaction
```

## Validation boundary

This was a documentation-only pass. Source was inspected through GitHub; no runnable checkout, Node test, browser smoke, WebGPU session or failure injection was executed.
