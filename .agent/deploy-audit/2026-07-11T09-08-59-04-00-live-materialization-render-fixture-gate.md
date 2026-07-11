# Deploy Audit: Live Materialization and Render Fixture Gate

Timestamp: `2026-07-11T09-08-59-04-00`

## Summary

Static tests prove isolated scheduler behavior, but deployment confidence now depends on browser proof that live materialization progresses, failures are contained, ready cells reach renderer commits, and compatibility visuals remain stable until acknowledgement.

## Existing checks

```txt
static-check
domain-smoke
world-baseline
core-world-runtime
world-provider-order
world-query-parity
world-population-parity
world-snapshot-portability
world-cell-lifecycle
lazy-world-materialization
renderer-cell-cache
renderer-resource-disposal
```

## Missing deploy gates

```txt
production route imports and starts successfully
materialization frames advance after compatibility render
pending cells decline and completed cells increase
provider exception does not stop animation loop
stale generation result is rejected
readiness result cites provider versions
renderer-cell prepare/update/release commits are typed
failed renderer prepare rolls back
visible frame cites renderer revision
WebGPU and WebGL2 admission parity
Pages route reports the pinned engine revision
```

## Proposed scripts

```txt
npm run test:materialization-live
npm run test:provider-readiness
npm run test:renderer-cell-commit
npm run test:browser-webgpu
npm run test:browser-webgl2
npm run test:pages-smoke
```

## Fixture sequence

```txt
start core route
  -> wait for first compatibility frame
  -> assert materialization frames > 0
  -> assert workSteps > 0
  -> inject deterministic provider failure
  -> assert typed failure and continued rendering
  -> complete one cell readiness set
  -> assert renderer plan and commit
  -> assert visible frame acknowledgement
  -> move focus and release prior cell
  -> assert stale result rejection and one disposal
```

## Promotion gate

Do not retire the compatibility renderer or increase materialization budgets until all of these are true:

```txt
live progress is deterministic
failure is contained
stale work cannot commit
provider versions are joined
renderer commit can roll back
resource disposal is idempotent
visible frame correlation exists
both backend routes pass
```
