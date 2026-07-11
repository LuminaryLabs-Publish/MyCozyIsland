# Validation: MyCozyIsland

Last updated: `2026-07-10T22-29-21-04-00`

## Documentation pass result

```txt
runtime source changed: no
package scripts changed: no
dependencies changed: no
route behavior changed: no
rendering output changed: no
deployment configuration changed: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
central ledger update: yes
```

## Existing declared gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The tests assert the 50-kit catalog, deterministic domain composition, renderer feature tokens, import-map pin, route script, and basic scenario state. They do not import `main-cloudform.js` in a browser-like host and do not test runtime lifecycle or adaptive-quality control application.

## Source-level facts verified in this pass

```txt
startup pixel ratio:
  min(devicePixelRatio, quality.pixelRatioCap)

level 1 target:
  activeScale 0.78
  fog resolution multiplier 0.82
  pixel ratio multiplier 0.88

level 2 target:
  activeScale 0.62
  fog resolution multiplier 0.68
  pixel ratio multiplier 0.76

level 0 recovery:
  activeScale restored to 1
  fog resolution restored to startup scale
  renderer.setPixelRatio not called

performance state:
  level, movingAverage, fps, target only

debug state:
  startup tier, fps, cloud steps, fog steps, kit count
```

## Validation not executed

```txt
npm install
npm test
browser smoke
WebGPU initialization
WebGL2 fallback
GPU compute dispatch
full degrade/recover cycle
pixel-ratio recovery
transition rollback
runtime stop/dispose/restart
```

The execution environment could not reach GitHub through a shell clone, so no local Node test run is claimed. Repository inspection and writes used the GitHub connector.

## Required adaptive-quality fixture

A future fixture must prove:

```txt
budget transitions 0 -> 1 -> 2 -> 1 -> 0 deterministically
every transition resolves one immutable target
every control is applied exactly once per changed target
level 0 restores startup pixel ratio
applied state equals observed renderer/control state
duplicate target application is a typed no-op
partial failure rolls back prior control changes
quality override policy is explicit and tested
transition journal is bounded and JSON-safe
```

## Readiness statement

This pass proves documentation alignment and a source-level recovery asymmetry. Runtime correctness remains unproven until the lifecycle and adaptive-quality fixtures exist and run successfully.
