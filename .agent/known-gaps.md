# Known Gaps: MyCozyIsland Adventure Persistence

Last updated: `2026-07-12T08:00:16-04:00`

## Critical

1. **Idle save churn:** player revision increments every tick and is part of the save fingerprint, causing five-second localStorage writes without semantic gameplay changes.
2. **False saved status:** capture commits `captured` before the storage adapter succeeds.
3. **Partial restore:** restore mutates the live graph sequentially with no staging or rollback.
4. **Reload operation collisions:** the transaction ledger persists but input frame/generation identity does not.
5. **Incomplete reset:** `resetAll()` does not reset `cozyInput`.

## High

- The browser import map references `NexusEngine@main`, so runtime behavior is not commit-pinned.
- Save schema has no migration registry or explicit compatibility policy beyond exact schema equality.
- `stableStringify()` has no canonical-value contract for unsupported JavaScript values.
- Host localStorage capability, quota and privacy failures are not represented in domain state.
- Save writes have no slot revision, compare-and-swap policy, cross-tab conflict result or stale-write rejection.
- Save capture includes static world descriptors that can be regenerated from seed/version, increasing payload size.
- `composition.js` and `composition-runtime.js` contain parallel construction paths with different initialization behavior.
- Pagehide captures and writes without a terminal receipt or guaranteed completion.

## Medium

- Save state is not included in its own durable payload, so save/load counters and adapter diagnostics are session-local.
- Interaction state is reset rather than restored; no policy explains whether target/prompt/last action are transient.
- Autosave cadence uses accumulated simulation delta rather than elapsed wall time or lifecycle-aware scheduling.
- Hidden-tab and page-freeze behavior is not explicitly handled by persistence.
- The HUD has no save command ID, write receipt, failure detail or retry state.
- Global `CozyIsland` exposes direct reset and state owners without a persistence capability boundary.

## Proof gaps

- The new adventure smoke is not included in `npm test`.
- No idle-no-write fixture.
- No localStorage failure fixture.
- No malformed late-domain restore fixture.
- No rollback parity fixture.
- No input/ledger operation-collision fixture.
- No cross-tab conflict fixture.
- No browser reload and first-restored-frame smoke.
