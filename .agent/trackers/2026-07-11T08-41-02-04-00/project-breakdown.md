# Project Breakdown: MyCozyIsland Core World Focus Transaction

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

This pass documents the authority gap between camera-driven focus movement, the pinned Core World runtime, seven provider stores and the visible world. No runtime source changed.

## Plan ledger

**Goal:** identify the exact transaction needed to make focus movement retriable, typed and revision-safe across wrapper, Core World and provider state.

- [x] Compare the full Publish inventory with the central ledger.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all eligible repositories are tracked and have root `.agent` state.
- [x] Avoid active same-minute writes on the nominal oldest target.
- [x] Select only `LuminaryLabs-Publish/MyCozyIsland`.
- [x] Read route, wrapper, pinned production Core World and fake runtime sources.
- [x] Identify interaction loop, domains, services and kits.
- [x] Trace initial prepare, normal focus commit and failure splits.
- [x] Define candidate DSKs and fixture gates.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped system audits.
- [x] Push only to `main`.

## Interaction loop

```txt
boot -> create world wrapper -> prepare origin -> build startup render snapshot
-> start frame loop -> scenario/camera update -> throttled focus update
-> Core World cell/provider transition -> static presentation update -> render
```

## Domains in use

```txt
route and browser host
input and scenario
NexusEngine Core World
product world wrapper and query
terrain provider
biome provider
shoreline provider
vegetation provider
rock provider
prop provider
cell presentation provider
terrain/biome/shoreline/population semantics
ocean/cloud/fog/lighting semantics
WebGPU/WebGL2 rendering
performance/debug
validation and Pages deployment
```

## Services and kits

The repo contains 50 declared local kits. Their services span deterministic seed/time, terrain and fields, biome and shoreline classification, placement and population, ocean and atmosphere, render descriptors, WebGPU/WebGL2 adapters, camera/scenario, performance and diagnostics. The wrapper imports six Core World construction services and registers seven ordered providers.

The complete kit list and service groups are retained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Main finding

`commitFocus()` mutates wrapper state, commits `setFocus()` and only then calls `updateWorld()`. `prepare()` also sets `prepared = true` before this operation succeeds. Production provider work is richer than the fake test runtime and has no wrapper checkpoint or typed result.

## Next safe ledge

```txt
MyCozyIsland Pinned Core World Focus Transaction Authority
+ Production/Fake Contract Parity and Failure Fixture Gate
```

## Validation state

```txt
runtime changed: no
npm test run: no
browser smoke run: no
production parity fixture: absent
focus failure fixture: absent
branch created: no
pull request created: no
```
