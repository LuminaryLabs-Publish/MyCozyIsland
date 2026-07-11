# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T14-41-28-04-00`

## Summary

Browser startup is not an authoritative transaction. Static CDN imports can fail before the route error handler exists, and later failures can leave partially allocated renderer, world and DOM resources alive without rollback, retry or a first-frame readiness receipt.

The earlier runtime-session, Core World, render-commit, environment and adaptive-quality gaps remain dependent work.

## Module admission gaps

```txt
immutable ModuleSourceManifest: absent
module graph fingerprint: absent
module fetch/parse/evaluation result: absent
source integrity metadata: absent
capability declaration per module: absent
module failure projection before main(): absent
alternate source policy: absent
```

## Startup transaction gaps

```txt
startupId: absent
startup generation: absent
ordered stage plan: implicit only
typed stage results: absent
expected-stage admission: absent
startup journal: absent
single commit point: absent
```

## Renderer backend gaps

```txt
backend candidate record: absent
capability negotiation: absent
admitted backend result: absent
fallback reason: absent
consumer/backend compatibility proof: absent
quality fingerprint tied to backend: absent
WebGPU/WebGL2 parity fixture: absent
```

## Partial allocation and rollback gaps

```txt
resource ledger: absent
reverse cleanup stack: absent
renderer-init rollback: absent
Core World prepare rollback: absent
volume texture rollback: absent
cloud/fog/ocean/post rollback: absent
listener and timer rollback: absent
startup host revocation: absent
```

## Loader and interaction gaps

```txt
loader state is authoritative: no
loader stage revision: absent
loader failure code: absent
retry control: absent
retry generation: absent
first user-input admission result: absent
loader completion tied to first frame: no
```

## First-frame readiness gaps

```txt
firstFrameId: absent
startup configuration fingerprint: absent
world revision on ready receipt: absent
backend/quality revision on ready receipt: absent
consumer readiness set: absent
visible frame acknowledgement: absent
```

## Lifecycle interactions retained

- `pagehide` is installed only after startup completes.
- `pagehide` calls `domains.dispose()` but does not stop the renderer animation loop.
- Loader timers are not retained or cancelled.
- Input and resize listeners have no removal leases.
- The global host exposes raw mutable renderer, scene, camera and runtime objects.
- Renderer and atmosphere resources lack one ordered session-owned disposal result.

## Core World and render gaps retained

- Reset clears world definitions without a complete re-registration transaction.
- Focus updates return Boolean rather than a typed world revision.
- Materialization lacks session/world/focus generation fencing.
- Provider readiness is not represented by a canonical version set.
- Cell render resources have no prepare/commit/rollback transaction.
- No committed frame correlates startup, world, environment, quality and render revisions.

## Dynamic environment gaps retained

- The environment clock advances while most dependent descriptors remain startup-frozen.
- There is no shared EnvironmentFrame, revision, fingerprint or consumer receipt set.
- Reset does not commit a canonical baseline environment frame.

## Adaptive quality gaps retained

- Dwell thresholds are frame-count based.
- Quality consumer mutations are not atomic.
- Recovery to level zero does not restore pixel ratio.
- Effective quality state and frame acknowledgement are absent.

## Validation gaps

```txt
module fetch failure before main()
module parse/evaluation failure
renderer.init rejection
backend capability rejection
Core World prepare rejection
cloud/fog volume creation rejection
post-pipeline construction rejection
partial allocation rollback order
loader failure and retry generation
stale prior-generation callback rejection
first-frame readiness receipt
WebGPU/WebGL2 startup parity
Pages cold-load browser smoke
```

## Deployment blockers

```txt
no source-manifest or module-graph proof
no startup stage journal
no backend admission result
no rollback after partial allocation
no explicit retry contract
no first-frame readiness receipt
no executable startup failure fixtures
```

## Not currently blocked by

- a pinned Three.js version and NexusEngine commit;
- a valid 50-kit catalog;
- existing WebGPU/WebGL2 renderer policies;
- deterministic world descriptors;
- existing Core World providers;
- the current static test suite;
- GitHub Pages configuration.