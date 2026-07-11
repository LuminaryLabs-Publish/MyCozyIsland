# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T06-50-30-04-00`

## Critical

1. The browser ships the pinned NexusEngine Core World runtime, while Node world tests inject a materially simpler fake runtime.
2. The fake does not model production `required`, `retained`, `released`, and `updated` selection results.
3. The fake omits provider matching, capability dependencies, critical-provider failure, portable effect validation, diagnostics and failed-cell states.
4. The fake cannot prove production rollback or release ordering.
5. `prepare()` sets `prepared = true` before the initial focus commit, so one thrown startup update can poison every retry.
6. `updateWorldFocus()` returns only a Boolean and conceals complete, degraded, rejected and partial-failure outcomes.
7. Production Core World commits focus separately, releases old cells before preparing new cells, and can commit failed cell records.
8. No wrapper-level active-cell-set transaction, provider-store checkpoint or explicit degradation policy exists.
9. Core World semantic active cells still do not drive the production renderer.
10. Route startup, rollback, stop, exact disposal, restart and stale-epoch admission remain absent.

## Test-runtime parity gaps

- no exact pinned-runtime module harness in Node
- no runtime commit assertion inside world fixtures
- fake partition returns a bare array instead of the production selection contract
- fake updates every retained cell rather than respecting production update detection
- no provider `matches()` behavior
- no `requires` and `provides` capability graph
- no critical/noncritical failure distinction
- no normalized portable effect validation
- no provider status rows
- no diagnostics and stable failure codes
- no failed-cell retry semantics
- no snapshot-load reconciliation behavior
- no release-failure behavior
- no contract matrix shared by fake and production adapters

## Focus transaction gaps

- no session epoch
- no focus command ID
- no focus revision
- no world revision exposed by the wrapper
- no previous versus requested focus result
- no required/retained/updated/released cell delta in the result
- no failed-cell IDs in the result
- no provider failure list
- no provider-store version/fingerprint checkpoint
- no all-or-nothing active-cell-set commit
- no previous-state-preserved proof
- no explicit accepted-degraded or failed-partial state
- no stale focus-command rejection
- no bounded focus/provider journal

## Provider-store gaps

- stores mutate directly during provider prepare and update
- store versions are not correlated with a world or focus revision
- `remove()` does not advance store version
- no stage, checkpoint, restore or transaction API
- no aggregate provider-store fingerprint
- no proof rollback restores every provider store to the previous accepted state
- no proof release failure leaves a queryable residual record

## Render-consumer gaps

- one whole-island renderer is constructed from the startup compatibility snapshot
- later provider changes are not synchronized into visible resources
- failed provider cells are visually masked by the global render graph
- no render admission policy for incomplete world revisions
- no cell render prepare/update/release transaction
- no rendered-cell readback
- no fallback-kind readback
- no resource counts by cell
- no shared-resource reference counting
- no world/render fingerprint comparison
- no shadow consumer mode

## Compatibility bridge gaps

- vegetation rows are used only when they equal the complete global graph
- rock rows are used only when they equal the complete global graph
- prop rows are used only when they equal the complete global graph
- fallback can hide failed or partial provider transitions
- Core World mode can appear healthy while rendering remains global
- no explicit legacy, shadow or cell-authoritative policy result

## Runtime lifecycle gaps

- no lifecycle state machine or monotonic session epoch
- no startup transaction or partial-failure rollback
- no listener, timeout or animation-loop leases
- no common renderer-consumer disposal contract
- no exact-once identity-deduplicated resource release
- no global-host retirement or tombstone policy
- no stale callback, focus, provider or render command rejection
- no bounded lifecycle/resource journal

## Existing scenario and quality gaps

- pointer drag during rail mode mutates authored rail points and reset does not restore the baseline
- environment clock advances while several semantic descriptors remain startup-frozen
- adaptive-quality level zero can report recovery while renderer DPR remains degraded
- performance sampling is not a direct GPU/render-submit result

## Proof gaps

- no pinned production Core World contract fixture
- no fake-versus-production parity fixture
- no startup provider-failure/retry fixture
- no cross-cell critical-failure preservation fixture
- no provider-store checkpoint/rollback fixture
- no release-failure fixture
- no typed focus-result fixture
- no browser pinned-import failure/recovery smoke
- no provider-to-render commit fixture
- no route lifecycle/restart fixture
- no camera baseline/reset fixture
- no environment-frame coherence fixture
- no adaptive-quality full-recovery fixture

## Secondary risks

- the central-clearing movement bound and island-centered seven-by-seven active set mask transition defects
- a future larger world will make failed-cell and release-order behavior visible
- global compatibility rendering can make provider tests look stronger than they are
- `globalThis.CozyIsland` keeps live renderer and provider objects reachable
- adding cell-owned GPU resources before lifecycle and focus authority increases cleanup risk
- upgrading the pinned engine commit without a shared contract matrix can silently change world semantics

## Not currently blocked by

- repository or runtime identity
- pinned Three.js or NexusEngine URLs
- local 50-kit catalog count
- deterministic world generation
- basic provider order under the fake runtime
- query and population parity under normal success paths
- portable snapshots under normal success paths
- isolated renderer cache and disposal utilities
- visual content availability
- Pages configuration
