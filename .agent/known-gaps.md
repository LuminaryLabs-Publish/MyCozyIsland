# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T05-10-36-04-00`

## Critical

1. Core World owns semantic active-cell lifecycle, but the production renderer consumes only the startup compatibility snapshot.
2. `updateWorldFocus()` can advance world and provider state without a corresponding presentation or render commit.
3. The production host does not wire the available cell-aware renderer controller.
4. The presentation provider is not the visible renderer input.
5. Compatibility fallback from provider rows to global vegetation, rock, or prop graphs is silent.
6. No world revision, presentation revision, render revision, or correlation result exists.
7. No cell-owned versus shared render-resource registry exists.
8. Route-session startup, rollback, stop, exact disposal, restart, and stale-epoch admission remain absent.
9. `pagehide` disposes Core World state only, not the animation loop, listeners, timers, Three/WebGPU graph, renderer/backend, or global host.
10. Camera baseline, dynamic environment-frame, and adaptive-quality authority remain incomplete behind the lifecycle and world-render gates.

## Core World and provider gaps

- no public world revision or focus revision
- no typed focus admission result
- no ordered provider result journal
- no provider revision by ID
- no presentation descriptor revision
- no presentation/source fingerprint exposed by the host
- no proof every active presentation descriptor has one render-consumer result
- no proof every released descriptor has one release result
- provider reset/dispose does not quarantine outstanding render work because no render command identity exists
- legacy mode and core mode do not expose a common typed parity result

## Render-consumer gaps

- one whole-island renderer is constructed from the startup snapshot
- later active-cell changes are not synchronized into visible resources
- no cell render prepare/update/release transaction
- no rendered-cell readback
- no fallback-kind readback
- no resource counts by cell
- no shared-resource reference counting
- no world/render fingerprint comparison
- no shadow consumer mode
- no browser proof for cell release and re-entry

## Compatibility bridge gaps

- vegetation provider rows are used only when their count equals the complete global vegetation graph
- rock provider rows are used only when their count equals the complete global rock graph
- prop provider rows are used only when their count equals the complete global prop graph
- fallback preserves visuals but can hide partial provider consumption
- no explicit policy identifies legacy, shadow, or cell-authoritative presentation

## Runtime lifecycle gaps

- no lifecycle state machine or monotonic session epoch
- no startup transaction or partial-failure rollback
- no listener, timeout, or animation-loop leases
- no common renderer-consumer disposal contract
- no exact-once identity-deduplicated resource release
- no global-host retirement/tombstone policy
- no stale callback, focus, provider, or render command rejection
- no bounded lifecycle/resource journal

## Existing scenario and quality gaps

- pointer drag during rail mode mutates authored rail points and reset does not restore the baseline
- environment clock advances while several semantic descriptors remain startup-frozen
- adaptive-quality level zero can report recovery while renderer DPR remains degraded
- performance sampling is not a direct GPU/render-submit result

## Proof gaps

- no provider-to-render commit fixture
- no shadow cell-consumer parity fixture
- no production-host cell lifecycle fixture
- no browser focus-movement resource proof
- no WebGPU/WebGL2 cell-consumer matrix
- no route lifecycle/restart fixture
- no partial-startup rollback fixture
- no listener/timer/loop leak fixture
- no camera baseline/reset fixture
- no environment-frame coherence fixture
- no adaptive-quality full-recovery fixture

## Secondary risks

- the central-clearing movement bound and island-centered seven-by-seven active set mask streaming discrepancies
- expanding movement or world size before render cutover would expose semantic/visual divergence
- silent compatibility fallback can make Core World diagnostics look authoritative while rendering remains global
- `globalThis.CozyIsland` keeps live renderer and provider objects reachable
- adding dynamic cell resources before session lifecycle ownership increases disposal complexity

## Not currently blocked by

- pinned NexusEngine or Three.js source identity
- local kit catalog count
- deterministic world generation
- Core World provider ordering
- query parity fixtures
- snapshot portability fixtures
- isolated renderer cell-cache and disposal utility fixtures
- missing visual content
- Pages configuration