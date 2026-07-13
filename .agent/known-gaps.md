# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T12-38-45-04-00`  
**Publication status:** `menu-game-preload-handoff-scheduler-authority-audited`

## Summary

The dedicated menu and background game preload are implemented, but menu presentation, hidden game presentation, simulation quiescence, cross-window entry, history/focus transfer, and visible completion are not governed by one generation-bound authority.

## Plan ledger

**Goal:** keep handoff and retained architecture risks dependency ordered and tied to executable proof.

- [ ] Shell, preload, scheduler, and entry identities.
- [ ] Single menu RAF-chain ownership.
- [ ] Explicit hidden presentation policy.
- [ ] Simulation and presentation quiescence leases.
- [ ] Revisioned cross-window protocol.
- [ ] Stale, duplicate, timeout, cancellation, and retirement results.
- [ ] Renderer-derived post-resume submission receipt.
- [ ] First visible game-frame acknowledgement.
- [ ] Atomic history, focus, visibility, and menu retirement.
- [ ] BFCache, pagehide, iframe reload, direct route, build, and Pages fixtures.
- [ ] Retained static-bootstrap, settlement, save, input, quality, and public-capability work.

## Active handoff gaps

```txt
MenuShellGeneration: absent
MenuSchedulerId: absent
single recursive RAF guard: absent
PreloadSurfaceGeneration: absent
hidden presentation policy: implicit
SimulationQuiescenceLease: absent
PresentationQuiescenceLease: absent
cross-window protocol version: absent
PlayerEntryAttemptId: absent
stale/duplicate message rejection: absent
entry timeout result: absent
post-resume state revision: absent
renderer submission receipt: absent
first visible game-frame acknowledgement: absent
atomic history/focus/menu retirement result: absent
lifecycle-composed retirement receipt: absent
browser/build/Pages fixtures: absent
```

## Dual-loop consequence

```txt
menu RAF
  -> continues until delayed retirement after reveal

hidden game animation loop
  -> continues while iframe opacity is zero
  -> freeze replaces engine tick/step only
  -> world/gameplay/foam/HUD/quality/post/autosave work continues
```

No receipt explains whether hidden presentation is intentionally running, throttled, paused, or retired.

## Message and completion consequence

```txt
Play
  -> send cozy-game-enter
  -> bridge resumes and posts cozy-game-entered immediately
  -> parent reveals game

or

900 ms expires without entered
  -> parent reveals game anyway
```

There is no proof that a post-resume game frame was submitted or displayed before the menu loses ownership.

## Visibility consequence

The menu recursive RAF retains its own successor callback. The `visibilitychange` listener requests another callback when the page becomes visible, with no scheduler token proving the predecessor chain is absent.

## Retained gaps

```txt
static module/provider admission before Core Startup
renderer-derived startup first-frame proof
BFCache-aware complete page lifecycle
multi-participant resource settlement/recovery
durable storage receipt and readback
bounded public runtime capabilities
browser input generation/focus authority
atomic adaptive quality transitions
```

## Dependency order

```txt
static bootstrap admission
  -> Core Startup readiness
  -> preload generation and quiescence
  -> player entry admission
  -> post-resume render and visible frame
  -> history/focus/menu retirement
  -> page lifecycle and deployment parity
  -> retained gameplay and persistence authorities
```

## Do not claim

Do not claim single-loop scheduling, hidden-render efficiency, deterministic freeze/resume, message race isolation, visible entry completion, lifecycle convergence, or production readiness until the relevant fixture matrices pass on `main`.