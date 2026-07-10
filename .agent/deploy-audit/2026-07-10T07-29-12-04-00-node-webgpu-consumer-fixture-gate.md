# Deploy Audit: Node WebGPU Consumer Fixture Gate

Timestamp: 2026-07-10T07-29-12-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current validation

`package.json` exposes:

```txt
npm test
  -> node tests/static-check.mjs
  -> node tests/domain-smoke.mjs
```

The current tests prove route-token/static expectations and deterministic domain smoke rows. They do not prove browser consumer rows or host diagnostics.

## Missing fixture

```txt
scripts/cozy-island-webgpu-consumer-fixture.mjs
```

## Required fixture responsibilities

- Import or construct the source profile without launching WebGPU.
- Validate route fingerprint and kit catalog status.
- Normalize render snapshot rows.
- Simulate representative wheel/pointer/keyboard/resize action rows.
- Assert scenario tick result rows.
- Assert camera frame readback rows.
- Assert volume texture result rows or deterministic stubs.
- Assert performance degrade/recover reason rows.
- Assert render-consumption ledger rows.
- Assert JSON-safe `CozyIslandHost` payload shape.

## Suggested package gate

```json
{
  "scripts": {
    "test": "node tests/static-check.mjs && node tests/domain-smoke.mjs && node scripts/cozy-island-webgpu-consumer-fixture.mjs"
  }
}
```

## Do not require yet

- Real GPU device.
- Browser screenshot.
- WebGPU capture.
- Visual diff.
- Renderer rewrite.

## Next safe ledge

```txt
MyCozyIsland WebGPU Host Proof Ledger Refresh + Node Consumer Fixture Gate
```
