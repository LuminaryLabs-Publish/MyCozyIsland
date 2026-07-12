# Validation: MyCozyIsland

Last updated: `2026-07-12T03-39-52-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible synchronized central entry
runtime source changed by this pass: no
environment behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed environment timing defects from executable proof and define the exact clock, frame, reset, consumer, backend, and visible-output gate.

- [x] Inspect the active route and package version.
- [x] Inspect environment clock construction, tick, pause and reset.
- [x] Inspect wind and illumination services.
- [x] Inspect one-time environment descriptor construction.
- [x] Inspect scenario render snapshot construction.
- [x] Inspect world and shoreline foam updates.
- [x] Inspect ocean, cloud and fog TSL time use.
- [x] Inspect sky, scene fog, exposure and light initialization.
- [x] Inspect public host readback.
- [x] Inspect the current test chain and domain smoke.
- [x] Confirm multiple visible time authorities exist.
- [x] Confirm reset does not restart renderer-global TSL time.
- [x] Document environment frame, receipt, reset, backend and visible-frame fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run the new executable fixtures.

## Source-backed checks

```txt
package version: 0.4.1
route cache key: foam-depth-camera-1
environment clock initial seconds: 48
environment clock resettable: yes
scenario advances environment clock: yes
world renderer uses scenario elapsedSeconds: yes
shoreline foam uses scenario elapsedSeconds: yes
ocean shader uses TSL global time: yes
cloud shader uses TSL global time: yes
fog shader uses TSL global time: yes
illumination sampled once at startup: yes
vegetation wind sampled once at startup: yes
campfire wind sampled once at startup: yes
cloud weather/lighting sampled once at startup: yes
fog advection sampled once at startup: yes
scenario reset resets TSL time: no
environment frame revision exists: no
consumer receipt exists: no
visible environment frame acknowledgement exists: no
```

## Existing test surface

```txt
npm test chain: present
domain-smoke.mjs: present
world/runtime tests: present
render graph and terrain tests: present
camera tests: present
foam and renderer resource tests: present
```

## Existing tests prove

```txt
domain construction is deterministic for matching seeds
terrain and shoreline samples are stable
vegetation and rock placement are deterministic
cloud and fog texture sizes follow quality
scenario tick advances the repository environment clock
camera state is projected into the render snapshot
```

## Existing tests do not prove

```txt
CPU and GPU environment consumers use one canonical time
TSL time can be reset with the scenario
wind and illumination descriptors match the current clock
all required consumers cite one environment revision
stale old-generation environment updates are rejected
WebGPU and WebGL2 receive equivalent environment snapshots
public readback identifies the committed environment frame
first visible frame after reset uses one reset generation
```

## Required fixture matrix

```txt
1. clock source identity
   every environment consumer receives the same clock source ID and time

2. normal frame parity
   world, foam, ocean, clouds, fog, vegetation, campfire, sky and lights cite one revision

3. reset phase parity
   all CPU and GPU animation phases restart under one reset generation

4. dynamic descriptor revision
   wind, illumination, cloud, fog and campfire descriptors match committed clock state

5. stale frame rejection
   an old environment revision cannot mutate current uniforms or objects

6. partial consumer failure
   a frame without all required receipts does not become the committed visible environment frame

7. backend parity
   WebGPU and WebGL2 consume equivalent canonical environment time and descriptors

8. public observation
   readback exposes clock, reset, environment and frame revisions without live mutable authority

9. visible frame
   first frame after reset cites the new reset generation and all required receipts

10. deployed route
    Pages reproduces the same environment reset and clock parity
```

## Commands not run

```txt
npm test
environment clock source divergence fixture
environment reset phase parity fixture
dynamic descriptor revision fixture
consumer receipt fixture
WebGPU browser smoke
WebGL2 browser smoke
Pages environment smoke
```

## Acceptance gate

```txt
one canonical clock source owns every dynamic environment consumer
scenario reset restarts CPU and GPU phases together
no direct renderer-global time bypass remains
one immutable EnvironmentFrameSnapshot owns one revision
all required render consumers publish accepted receipts
stale generations cannot update current environment state
backend adapters consume equivalent frame data
public readback exposes environment frame provenance
first visible reset frame cites the committed reset generation
```