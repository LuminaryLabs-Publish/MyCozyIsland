# Validation: MyCozyIsland

Last updated: `2026-07-11T02-02-59-04-00`

## Documentation pass result

```txt
runtime source changed: no
rendering output changed: no
package scripts changed: no
dependencies changed: no
deployment configuration changed: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
central ledger update: pending after repo-local documentation
```

## Existing test surface

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The static check validates 50 kit descriptors, deterministic-source constraints, renderer feature tokens, the Three/WebGPU import map, route script, and error markup.

The domain smoke now composes deterministic world snapshots, compares terrain/shoreline/vegetation/rock data, and checks the new clearing plateau at the center plus twelve points on a ring at `0.68 × clearingRadius`.

## Source-level facts verified

```txt
natural height and clearing flattening are separate: yes
clearing source sample count: 12
source sample radius: 1.32 × clearingRadius
inner blend threshold: 0.78 × clearingRadius
outer blend threshold: 1.16 × clearingRadius
fence radius: 1.14 × clearingRadius
surface variation scale: 0.14
current clearing test radius: 0.68 × clearingRadius
current flatness threshold: less than 0.5 meters
plateau determinism assertion: yes
plateau descriptor/fingerprint exposed: no
edge continuity assertion: no
fence/campfire seating assertion: no
biome continuity assertion: no
render-consumption correlation: no
```

## Validation not executed in this documentation run

```txt
npm install
npm test
browser smoke
WebGPU initialization
WebGL2 fallback
GPU compute dispatch
runtime stop/dispose/restart
camera drag/reset fixture
terrain edge/seating/layer-coherence fixture
environment-frame coherence fixture
adaptive-quality full recovery fixture
```

Repository inspection and writes used the GitHub connector. No runtime-completion claim is made.

## Required terrain fixture

A future fixture must prove:

```txt
descriptor determinism and fingerprint stability
source-sample aggregate equals plateau height
bounded center, inner-ring, fence-edge, blend-edge, and source-ring behavior
bounded normal, slope, curvature, and biome transitions
normalized biome weights at all probes
campfire and every fence post cite one terrain revision
fence rails remain seated without edge gaps
placement and render snapshots reject stale terrain revisions
terrain grid probe vertices match terrain-service samples
bounded JSON observation contains no live functions or Three objects
```

## Readiness statement

The runtime improvement removes the artificial crater and adds a useful deterministic inner-clearing test. Terrain-layer authority is not complete until the plateau descriptor, transition edge, dependent placement, and render consumption share one revision and pass deterministic fixtures.
