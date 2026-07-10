# Validation: MyCozyIsland

Last updated: 2026-07-10T16-08-56-04-00

## This pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
Node adaptive-quality fixture: not run because it does not exist yet
repo-local documentation pushed to main: yes
central ledger update required: yes
```

## Current available gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## Current tests prove

- static route and Three/WebGPU token expectations
- exactly 50 valid DomainServiceKit manifests
- broad capability ownership and dependency closure
- deterministic terrain, shoreline, vegetation, rock, foam, cloud, fog, camera, and scenario composition
- selected renderer source tokens exist

## Current tests do not prove

- the semantic source of the sampled frame cost
- callback interval versus CPU submit versus GPU timestamp behavior
- degrade/recover hysteresis sequences
- complete absolute quality settings per level
- exact DPR restoration on recovery to level `0`
- idempotent same-level application
- cloud/fog/post/renderer apply-result parity
- transition ordering and frame/render correlation
- bounded performance history and deterministic eviction
- JSON-safe performance host serialization
- browser WebGPU timestamp-query behavior

## Next required gate

```txt
node scripts/cozy-island-adaptive-quality-fixture.mjs
npm test
```

The fixture must run without a DOM, real GPU, screenshot, or WebGPU capture and must assert:

```txt
stable initial quality state
0 -> 1 degradation
1 -> 2 degradation
2 -> 1 recovery
1 -> 0 full recovery
exact DPR restoration
exact cloud/fog/post restoration
same-level idempotency
invalid metric rejection or explicit fallback
transition-result serialization
bounded history and deterministic reset
```

Browser GPU timing validation remains a separate optional integration gate after the pure fixture exists.