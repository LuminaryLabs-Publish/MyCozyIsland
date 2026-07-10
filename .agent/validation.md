# Validation: MyCozyIsland

Last updated: 2026-07-10T08-48-58-04-00

## This pass

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU/GPU validation: not run
DOM-free WebGPU consumer fixture: not run because proof files do not exist yet
repo-local docs pushed to main: yes
central ledger updated: pending in central repo
```

## Current available package gate

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

## What current tests prove

- Static route expectations, including WebGPU token checks.
- Kit catalog shape and count.
- Domain smoke composition.
- Deterministic source behavior for selected rows.

## What current tests do not prove

- Browser WebGPU render consumption.
- Input accepted/rejected/no-change rows.
- Scenario tick result rows.
- Camera frame readback rows.
- Volume texture result rows.
- Performance degrade/recover reason rows.
- JSON-safe `CozyIslandHost` readback.

## Next validation target

```txt
node scripts/cozy-island-webgpu-readback-fixture.mjs
npm test
```

The fixture should run without requiring a real GPU, browser screenshot, or WebGPU capture.
