# Next steps: MyCozyIsland

**Timestamp:** `2026-07-13T04-10-37-04-00`

## Summary

Replace the raw browser-global ownership graph with a narrow public projection and an opt-in debug/support gateway. Every mutating operation should be admitted against a runtime generation, return a typed result, record changed participants and correlate the effect with a visible frame.

## Plan ledger

**Goal:** establish least-authority browser diagnostics without removing useful inspection and support workflows.

- [ ] Define production, development, test and support host-channel policy.
- [ ] Define `PublicHostId`, `PublicHostGeneration`, `CapabilityId` and grant expiry.
- [ ] Publish an immutable read-only summary by default.
- [ ] Remove raw renderer, scene, camera, adventure, engine and domain-service references from the public surface.
- [ ] Route permitted mutations through typed capability commands.
- [ ] Require caller/source, command ID, sequence, expected runtime generation and expected domain revision.
- [ ] Reject duplicate, stale, unknown and revoked commands with zero mutation.
- [ ] Separate inspect, capture-save, input-injection, reset and renderer-debug capabilities.
- [ ] Require explicit confirmation and participant scope for reset.
- [ ] Return changed-domain, save, renderer and frame receipts.
- [ ] Revoke the host during Suspend/Retire and reissue only under a new generation.
- [ ] Expose a bounded observation journal without raw mutable owners.
- [ ] Add source, production-build and Pages fixtures.

## Immediate safe ledge

1. Replace `globalThis.CozyIsland` with a read-only frozen projection containing backend, quality, domain paths, object count and the last committed frame revision.
2. Keep a development-only gateway behind an explicit host-channel flag.
3. Map each allowed operation to one capability ID and typed command.
4. Do not expose `engine`, renderer, scene, camera or domain API objects.
5. Add `inspectState()` and `captureSave()` as non-mutating commands with immutable results.
6. Add reset only as `requestReset({commandId, expectedGeneration, confirmation})`.
7. Record accepted, rejected, stale, duplicate and revoked results.
8. Correlate accepted mutations with the first renderer frame carrying the resulting revision.
9. Revoke all grants on page lifecycle retirement and runtime restart.
10. Prove production builds omit mutating debug capabilities.

## Target files

```txt
src/main-adventure.js
src/adventure/composition-runtime.js
src/adventure/persistence-render-domains.js
src/adventure/runtime-domains.js
src/adventure/resource-domains.js
src/adventure/public-capability-domain.js
src/adventure/public-host-adapter.js
tests/public-capability.fixture.mjs
scripts/smoke-public-host-browser.mjs
package.json
```

## Required fixtures

```txt
production build -> read-only projection only
development grant -> declared capabilities only
raw engine/renderer/scene/camera -> absent from public projection
unknown capability -> rejected with zero mutation
duplicate command -> one result and one effect
stale generation/revision -> rejected
revoked grant -> rejected
concurrent host tick -> prohibited
reset without confirmation -> rejected
reset with capability -> participant receipts and new generation
page retirement -> host revoked
accepted mutation -> first matching visible-frame acknowledgement
source/build/Pages -> equivalent policy
```

## Dependency order

```txt
runtime session and lifecycle generation
  -> host channel policy
  -> capability manifest and grants
  -> typed command admission
  -> participant results and journal
  -> visible-frame correlation
  -> production and Pages proof
```

## Do not claim

Do not claim a safe public host, least authority, deterministic external control, reset safety, revocation or visible-effect provenance until the fixture matrix passes on `main`.
