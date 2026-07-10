# Known Gaps: MyCozyIsland

Last updated: 2026-07-10T11-38-03-04-00

## Highest-priority gap

The current WebGPU route has deterministic source kits and `npm test` static/domain smoke coverage, but it lacks a JSON-safe host journal readback ledger.

## Specific gaps

- No normalized WebGPU route source profile.
- No stable source fingerprint for `webgpu-volumetric-2`.
- No host-readable kit catalog status block beyond the live `kitCatalogStatus` object.
- No serializable source snapshot reconciling kit catalog, domain source rows, render snapshot, runtime consumers, and route token.
- Wheel, pointer, keyboard, blur, and resize mutate directly without accepted/rejected/no-change/clamped result rows.
- No stable input reason vocabulary.
- No scenario tick result row.
- No camera frame readback row.
- No render-consumption ledger mapping source families to WebGPU consumers.
- No render snapshot normalizer for fixture assertions.
- No atmosphere/cloud/fog volume texture result rows.
- No performance degrade/recover reason rows.
- `globalThis.CozyIsland` exposes live Three/WebGPU objects and aggregate state.
- No additive JSON-safe `globalThis.CozyIslandHost` surface.
- No DOM-free / Node WebGPU consumer fixture.

## Deferred work

Do not prioritize these until host proof exists:

- visual rewrite
- cloud rewrite
- ocean rewrite
- fog rewrite
- camera retune
- renderer replacement
- route-token churn
- new route content
- WebGPU capture or screenshot automation

## Safe next ledge

```txt
MyCozyIsland WebGPU Host Journal Readback Refresh + Node Consumer Fixture Gate
```
