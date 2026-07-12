# START HERE: MyCozyIsland

Last aligned: `2026-07-12T03-39-52-04-00`

Repository: `LuminaryLabs-Publish/MyCozyIsland`

Current focus: make one committed environment frame own simulation time, shader time, wind, illumination, atmosphere, ocean motion, reset, diagnostics, and visible-frame provenance.

## Summary

The runtime advances `environment-clock-domain-kit` through `scenario.tick(dt)`, then passes that elapsed time to the world and shoreline-foam renderers. Ocean waves, cloud detail, and fog advection do not use that clock. They use Three TSL's global `time` node, which follows renderer lifetime instead of scenario state.

At the same time, illumination, vegetation wind, campfire wind, cloud weather, cloud lighting, cloud shadows, fog density, and fog advection are evaluated once during composition and frozen into the startup render snapshot. `scenario.reset()` resets the environment clock to 48 seconds, but it does not reset TSL time or rebuild those descriptors.

A reset can therefore restart foam, vegetation sway, and campfire animation while ocean, cloud, and fog phases continue. The visible frame can combine multiple time authorities without an environment frame ID, clock revision, reset generation, consumer receipt, or visible-frame acknowledgement.

## Plan ledger

**Goal:** preserve the cozy environment while replacing mixed ambient time with one deterministic, resettable, revisioned environment-frame transaction.

- [x] Compare all 10 accessible Publish repositories with central tracking.
- [x] Exclude `TheCavalryOfRome`.
- [x] Confirm all nine eligible repositories have ledger and root `.agent` coverage.
- [x] Select only `MyCozyIsland` as the oldest eligible synchronized repository.
- [x] Trace environment composition, clock tick/reset, wind sampling, static descriptors, renderer updates, TSL time, public readback, and tests.
- [x] Identify the interaction loop, all domains, all 50 cataloged kits, one extra runtime kit, nine providers, and five imported NexusEngine services.
- [x] Confirm world and foam updates use scenario elapsed time.
- [x] Confirm ocean, clouds, and fog use renderer-global TSL time.
- [x] Confirm dynamic environment descriptors are captured once during composition.
- [x] Define environment frame, clock source, reset, consumer receipt, journal, fixture, and visible-frame contracts.
- [x] Add timestamped architecture and system-specific audits.
- [x] Refresh required root `.agent` files and the machine registry.
- [x] Push only to `main`; create no branch or pull request.
- [ ] Runtime implementation and executable environment-frame fixtures remain future work.

## Selection comparison

```txt
MyCozyIsland       2026-07-12T02-10-14-04-00  selected
PrehistoricRush    2026-07-12T02-21-55-04-00
TheOpenAbove       2026-07-12T02-29-50-04-00
IntoTheMeadow      2026-07-12T02-38-23-04-00
HorrorCorridor     2026-07-12T02-49-19-04-00
PhantomCommand     2026-07-12T03-00-46-04-00
ZombieOrchard      2026-07-12T03-11-51-04-00
TheUnmappedHouse   2026-07-12T03-21-27-04-00
AetherVale         2026-07-12T03-28-44-04-00
TheCavalryOfRome   excluded
```

## Runtime identity

```txt
route:               index.html -> src/main-cloudform.js?v=foam-depth-camera-1
package:             0.4.1
Three.js:            0.185.0
NexusEngine commit:  481cbf6df742e81279bd42245c4238c6a1fc69f2
world id:            world:cozy-island-webgpu-v4
cataloged kits:      50
extra runtime kits:  1
providers:           9
default world mode:  core
fallback mode:       legacy
```

## Read this pass first

```txt
.agent/trackers/2026-07-12T03-39-52-04-00/project-breakdown.md
.agent/architecture-audit/2026-07-12T03-39-52-04-00-dynamic-environment-frame-authority-dsk-map.md
.agent/render-audit/2026-07-12T03-39-52-04-00-mixed-clock-visible-frame-gap.md
.agent/environment-frame-audit/2026-07-12T03-39-52-04-00-clock-descriptor-consumer-commit-contract.md
.agent/gameplay-audit/2026-07-12T03-39-52-04-00-reset-environment-phase-divergence-loop.md
.agent/interaction-audit/2026-07-12T03-39-52-04-00-environment-tick-reset-command-result-map.md
.agent/deploy-audit/2026-07-12T03-39-52-04-00-environment-clock-parity-fixture-gate.md
.agent/turn-ledger/2026-07-12T03-39-52-04-00.md
```

## Interaction loop

```txt
startup
  -> create environment clock at 48 seconds
  -> sample wind and illumination
  -> freeze vegetation, campfire, cloud, fog, and lighting descriptors
  -> create ocean, cloud, and fog shaders using Three TSL global time

frame
  -> renderer callback supplies now and dt
  -> scenario advances the environment clock
  -> world renderer and foam consume scenario elapsedSeconds
  -> ocean, cloud, and fog shaders consume renderer-global TSL time
  -> static sky, lights, fog parameters, and environment descriptors remain unchanged
  -> post pipeline submits one visually mixed frame

reset
  -> scenario resets environment clock to 48 seconds
  -> world, foam, vegetation, and campfire phase restart from scenario time
  -> ocean, cloud, and fog TSL time continues
  -> static descriptors are not regenerated
```

## Main finding

```txt
canonical environment frame: absent
authoritative clock-source ID: absent
environment frame ID and revision: absent
reset generation: absent
static descriptor revision: absent
dynamic wind and illumination evaluation: absent
scenario-to-TSL time binding: absent
environment consumer receipts: absent
stale frame rejection: absent
visible environment-frame acknowledgement: absent
```

The existing test chain proves deterministic domain construction and that the scenario clock advances. It does not prove that every visible environment consumer uses the same time, that reset restores all phases, that static descriptors match the current clock, or that a rendered frame cites one committed environment revision.

## Implemented surface

```txt
50 catalog-admitted DomainKit entries
1 source-backed composition kit outside the catalog
9 ordered Core World providers
5 imported NexusEngine services
```

The complete per-kit service map is in `.agent/current-audit.md`, `.agent/kit-registry.json`, and the current tracker.

## Required parent domain

```txt
cozy-island-dynamic-environment-frame-authority-domain
```

## Ordered implementation queue

```txt
1. Browser Startup Admission and Failure Rollback Authority
2. Runtime Session Lifecycle Authority
3. World Lifecycle Contract and Legacy/Core Mode Parity Authority
4. Render Layer Graph Admission and Physical Resource Binding Authority
4a. Foam Depth Proxy Topology and Lifecycle Authority
5. Core World Reset / Re-prepare Authority
6. Pinned Core World Focus Transaction Authority
7. Live Materialization Readiness Commit Authority
8. Core World Render Commit Authority
9. Camera Rail Baseline Authority
10. Dynamic Environment Frame Authority
11. Adaptive Quality Transaction Authority
```

## Validation boundary

```txt
runtime source changed by this pass: no
environment behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
npm test: not run
environment clock parity fixture: unavailable
reset phase parity fixture: unavailable
WebGPU/WebGL2 frame parity smoke: not run
visible environment-frame receipt: unavailable
```