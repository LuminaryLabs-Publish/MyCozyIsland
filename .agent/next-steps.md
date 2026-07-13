# Next steps: MyCozyIsland public runtime capability authority

**Timestamp:** `2026-07-13T04-21-10-04-00`  
**Publication status:** `public-runtime-capability-publication-central-reconciled`

## Summary

Replace the raw browser-global ownership graph with a narrow public projection and an opt-in debug/support gateway. Every mutating operation must be admitted against a runtime generation, return a typed result, record changed participants and correlate the effect with a visible frame.

## Plan ledger

**Goal:** establish least-authority browser diagnostics without removing useful inspection and support workflows.

- [ ] Define production, development, test and support host-channel policy.
- [ ] Define `PublicHostId`, `PublicHostGeneration`, `CapabilityId` and grant expiry.
- [ ] Publish an immutable detached read-only summary by default.
- [ ] Remove raw renderer, scene, camera, adventure, engine and domain-service references from the public surface.
- [ ] Route permitted mutations through typed capability commands.
- [ ] Require caller/source, command ID, sequence and expected runtime/domain/render revisions.
- [ ] Reject duplicate, stale, unknown, expired and revoked commands with zero mutation.
- [ ] Separate inspect, capture-save, input-injection, reset and renderer-debug capabilities.
- [ ] Require explicit confirmation and participant scope for reset.
- [ ] Return changed-domain, save, renderer and frame receipts.
- [ ] Revoke the host during terminal lifecycle retirement and reissue only under a successor generation.
- [ ] Expose a bounded observation journal without raw mutable owners.
- [ ] Add source, production-build and Pages fixtures.

## Minimal implementation order

```txt
1. runtime session and lifecycle generation
2. host identity, generation and channel policy
3. detached production projection
4. capability manifest, grants, expiry and revocation
5. typed command admission and stale/duplicate rejection
6. participant adapters and commit/rollback receipts
7. reset confirmation and successor-generation policy
8. bounded observation journal
9. first visible capability-effect acknowledgement
10. source/build/Pages proof
```

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

## Required acceptance cases

```txt
production build publishes read-only projection only
development grant exposes only declared capabilities
raw engine/renderer/scene/camera and domain API objects are absent
unknown capability is rejected with zero mutation
duplicate command creates one result and one effect
stale generation or revision is rejected
expired or revoked grant is rejected
concurrent host tick is prohibited
reset without confirmation is rejected
accepted reset returns participant receipts and successor generation
terminal page lifecycle revokes the host
accepted mutation receives first matching visible-frame acknowledgement
source, built output and Pages expose equivalent policy
```

## Retained work

Page-lifecycle authority, adaptive-quality transitions, durable-save commits, browser-input ownership, Agriculture recovery and broader deployed parity remain open.

## Do not claim

Do not claim a safe public host, least authority, deterministic external control, reset safety, revocation or visible-effect provenance until the fixture matrix passes on `main`.