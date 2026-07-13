# Known gaps: MyCozyIsland Three.js menu presentation lifecycle

**Timestamp:** `2026-07-13T14-39-40-04-00`  
**Publication status:** `threejs-menu-presentation-lifecycle-authority-audited`

## Summary

The minimal Three.js menu is implemented, but decorative provider and renderer setup gates hidden game preload. Menu frames and resources have no generation or first-frame evidence, and the delayed retirement path does not prove complete callback, listener, geometry, material, renderer, context or canvas retirement.

## Plan ledger

**Goal:** keep menu presentation, preload handoff and retained architecture risks dependency ordered and tied to executable proof.

- [ ] Provider-independent shell and hidden preload start.
- [ ] Menu attempt, provider, renderer, resource, context and scheduler identities.
- [ ] Approved provider manifest and WebGL capability result.
- [ ] Degraded local menu fallback.
- [ ] First menu frame submission and acknowledgement.
- [ ] Single stored RAF ownership and stale-callback rejection.
- [ ] Owned listener registry and exact retirement.
- [ ] Per-geometry and per-material disposal receipts.
- [ ] Renderer, context, canvas and reference retirement result.
- [ ] Explicit menu/game dual-renderer budget and overlap policy.
- [ ] Composition with player entry and first visible game-frame proof.
- [ ] Browser, build and Pages fixtures.
- [ ] Retained preload-handoff, bootstrap, lifecycle, save, input and quality work.

## Identity gaps

```txt
MenuPresentationAttemptId: absent
MenuProviderGeneration: absent
MenuCanvasGeneration: absent
MenuContextGeneration: absent
MenuRendererGeneration: absent
MenuResourceGeneration: absent
MenuSchedulerGeneration: absent
MenuFrameSequence: anonymous
FirstMenuFrameAck: absent
MenuPresentationRetirementResult: absent
```

## Boot and preload coupling gaps

```txt
provider-independent shell bootstrap: absent
iframe preload before menu provider admission: absent
approved provider manifest: absent
provider integrity/API probe: absent
WebGL capability result: absent
degraded local presentation result: absent
menu failure plus game success policy: absent
terminal shell result: absent
```

Current order:

```txt
static Three.js import
  -> WebGLRenderer construction
  -> scene geometry/material construction
  -> recursive RAF
  -> later idle callback starts hidden game preload
```

A failure before the final step can leave Play disabled at `Preparing 1%` without starting factual game preparation.

## Dual-renderer gaps

```txt
menu WebGL renderer generation: absent
hidden game WebGPU/WebGL2 generation correlation: absent
concurrent renderer budget: absent
context count observation: absent
GPU resource overlap result: absent
first game-only frame acknowledgement: absent
```

The parent menu and hidden game can render concurrently through preload and transition. No receipt states whether that overlap is expected, bounded, throttled or complete.

## Menu first-frame gaps

```txt
renderer submission result: absent
canvas generation: absent
viewport/DPR revision: absent
visible eligibility: absent
provider/resource provenance: absent
first menu frame failure result: absent
```

## Retirement gaps

```txt
stored RAF ID: absent
cancelled RAF receipt: absent
late callback count/rejection: absent
resize listener retirement: absent
message listener retirement: absent
keyboard listener retirement: absent
Play listener retirement: absent
sky geometry/material disposal receipt: absent
trunk geometry/material disposal receipt: absent
frond geometry/leaf material disposal receipts: absent
coconut geometry/material disposal receipts: absent
scene graph clearing receipt: absent
renderer disposal result: absent
context retention/release policy: absent
canvas retirement state: absent
cleared reference receipt: absent
partial-retirement result: absent
```

`renderer.dispose()` is present. The gap is repository-level evidence for the complete owned resource and callback graph, not a claim about a specific browser driver leak.

## Validation gaps

```txt
provider rejection fixture: absent
WebGL-disabled fixture: absent
first-menu-frame fixture: absent
dual-renderer observation fixture: absent
resource disposal fixture: absent
listener retirement fixture: absent
late callback fixture: absent
context-loss transition fixture: absent
pagehide/BFCache fixture: absent
built-output lifecycle smoke: absent
Pages lifecycle smoke: absent
```

## Retained handoff gaps

```txt
preload/shell generation binding
simulation and hidden-presentation quiescence leases
revisioned cross-window protocol
stale and duplicate message rejection
entry timeout terminal result
post-resume renderer submission receipt
first visible game-frame acknowledgement
atomic history/focus/menu retirement composition
```

## Retained architecture gaps

```txt
static game-module/provider admission before Core Startup
renderer-derived game startup first-frame proof
BFCache-aware complete page lifecycle
multi-participant resource settlement/recovery
durable storage receipt and readback
bounded public runtime capabilities
browser input generation/focus authority
atomic adaptive quality transitions
```

## Dependency order

```txt
provider-independent shell
  -> independent game preload
  -> menu provider/capability admission
  -> first menu frame
  -> preload readiness and player entry
  -> first visible game frame
  -> complete menu retirement
  -> game-only presentation and page lifecycle
  -> deployment parity
```

## Do not claim

Do not claim provider-independent preload, menu first-frame readiness, bounded GPU overlap, exact scheduler retirement, complete resource disposal, visible entry completion, lifecycle convergence or production readiness until the relevant fixture matrices pass on `main`.