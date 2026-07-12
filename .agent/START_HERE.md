# START HERE: MyCozyIsland

Last aligned: `2026-07-11T20-51-14-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make the public world wrapper expose one explicit lifecycle contract across legacy and Core modes, with reusable reset, terminal disposal, generation fencing, query leases and typed results.

## Summary

`MyCozyIsland` selects either a legacy or Core world wrapper at startup. Both wrappers expose `prepare()`, `reset()`, `dispose()`, query and state methods, but their lifecycle semantics diverge. Legacy disposal only clears a Boolean and is reversible. Core reset clears registered world definitions, and Core disposal additionally resets the domain, while the wrapper remains callable and exposes no terminal phase.

The result is a structural compatibility API without behavioral compatibility. Restart, recovery, page lifecycle and future mode fallback cannot rely on the same method names until phase, generation, admission, results and read-model validity are authoritative.

## Plan ledger

**Goal:** document the mode-parity defect and define one lifecycle authority that makes reset reusable, disposal terminal and stale references rejectable.

- [x] Compare all 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have root `.agent` state.
- [x] Skip active runtime work in nominal-oldest `PrehistoricRush`.
- [x] Select only `MyCozyIsland` as the oldest stable eligible repository.
- [x] Trace the active route and both world-runtime branches.
- [x] Identify the interaction loop, domains, all 50 local kits, imported services and providers.
- [x] Compare prepare/reset/dispose/query semantics across modes.
- [x] Define lifecycle phases, generations, command results, leases and parity fixtures.
- [x] Add architecture, render, gameplay, interaction, world-lifecycle and deploy audits.
- [x] Change documentation only and push directly to `main`.
- [ ] Implement lifecycle authority and execute fixtures.

## Read this pass first

```txt
.agent/trackers/2026-07-11T20-51-14-04-00/project-breakdown.md
.agent/current-audit.md
.agent/next-steps.md
.agent/known-gaps.md
.agent/validation.md
.agent/architecture-audit/2026-07-11T20-51-14-04-00-world-lifecycle-mode-parity-dsk-map.md
.agent/render-audit/2026-07-11T20-51-14-04-00-disposed-world-visible-frame-provenance-gap.md
.agent/gameplay-audit/2026-07-11T20-51-14-04-00-prepare-reset-dispose-mode-loop.md
.agent/interaction-audit/2026-07-11T20-51-14-04-00-world-lifecycle-command-result-map.md
.agent/world-lifecycle-audit/2026-07-11T20-51-14-04-00-legacy-core-phase-generation-contract.md
.agent/deploy-audit/2026-07-11T20-51-14-04-00-world-lifecycle-mode-parity-fixture-gate.md
.agent/turn-ledger/2026-07-11T20-51-14-04-00.md
.agent/kit-registry.json
```

## Interaction loop

```txt
module boot
  -> choose `legacy` or `core` from URL
  -> create one structurally compatible wrapper
  -> prepare
  -> build persistent render graph
  -> expose wrapper/query through globalThis.CozyIsland

legacy lifecycle
  -> reset/dispose only clear prepared
  -> later prepare is accepted

core lifecycle
  -> reset clears definitions/provider coordination
  -> dispose resets the world domain
  -> wrapper remains callable
  -> no disposed phase rejects later operations
```

## Main findings

```txt
lifecycle phase: absent
world generation: absent
reusable reset policy: implicit and mode-dependent
terminal disposal state: absent
typed prepare/reset/dispose results: absent
legacy/core result parity: absent
query/diagnostic leases: absent
post-dispose command rejection: absent
frame/world-generation correlation: absent
```

## Domains in use

```txt
browser startup and DOM projection
world-mode selection and compatibility API
world lifecycle phase and generation
Core World definition/focus/providers/cells
legacy semantic composition
world query and active-cell projection
lazy materialization and provider stores
camera, scenario and environment clock
terrain, biome, shoreline and population
ocean, foam, cloud, fog and post rendering
adaptive quality and diagnostics
browser callbacks, globals and page lifecycle
validation and Pages deployment
```

## Implemented kits and services

The source-backed catalog remains exactly 50 local kits. Services cover renderer backends and atmosphere, camera/scenario control, deterministic terrain/environment composition, Core World registration/focus/materialization/query, browser hosting, performance adaptation, diagnostics, tests and Pages delivery. Six NexusEngine construction services and seven ordered world providers remain active.

## Required authority domain

```txt
cozy-island-world-lifecycle-contract-authority-domain
  -> world-lifecycle-phase-kit
  -> world-runtime-generation-kit
  -> world-mode-contract-kit
  -> world-lifecycle-command-kit
  -> world-lifecycle-admission-kit
  -> world-prepare-result-kit
  -> world-reset-policy-kit
  -> world-reset-result-kit
  -> world-dispose-result-kit
  -> world-definition-lease-kit
  -> world-query-lease-kit
  -> stale-world-generation-rejection-kit
  -> terminal-use-after-dispose-rejection-kit
  -> legacy-core-lifecycle-adapter-kit
  -> world-lifecycle-observation-kit
  -> world-lifecycle-journal-kit
  -> world-mode-parity-fixture-kit
  -> world-use-after-dispose-fixture-kit
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Core World Reset / Re-prepare Authority
5. Pinned Core World Focus Transaction Authority
6. Live Materialization Readiness Commit Authority
7. Core World Render Commit Authority
8. Camera Rail Baseline Authority
9. Dynamic Environment Frame Authority
10. Adaptive Quality Transaction Authority
```

## Next safe ledge

```txt
MyCozyIsland World Lifecycle Contract and Legacy/Core Mode Parity Authority
+ Reset/Re-prepare / Terminal-Dispose / Query-Lease / First-Replacement-Frame Fixture Gate
```
