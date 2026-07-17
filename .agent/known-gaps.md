# Known gaps: host save commit durability projection

## Current focus

- [ ] Save capture and durable persistence have no separate generation states.
- [ ] `capture()` marks the domain as captured before the host write settles.
- [ ] Host storage availability has no typed capability result.
- [ ] Browser storage writes have no admitted command.
- [ ] Browser storage writes have no retained terminal result.
- [ ] Failed host writes cannot update authoritative save diagnostics.
- [ ] A failed write can leave the domain status as captured.
- [ ] The HUD can render `Saved` without a durable commit receipt.
- [ ] The last durable digest is not stored separately from the captured checksum.
- [ ] Stale host results have no generation rejection path.
- [ ] Duplicate host results have no apply-once settlement identity.
- [ ] Retry state and retry count are not represented in save state.
- [ ] Pagehide save attempts have no lifecycle result.
- [ ] No `FirstDurableSaveStatusFrameAck` exists.
- [ ] Corrupt or unsupported stored records have no quarantine record.
- [ ] Storage quota, security and unavailability fixtures do not exist.
- [ ] Artifact and Pages save parity are unproved.

## Implemented save state

- [x] Versioned v2 save envelope.
- [x] Stable checksum validation.
- [x] v1 Agriculture migration.
- [x] Multi-domain rollback-safe restore.
- [x] Durable-state fingerprinting.
- [x] Five-second changed-state autosave cadence.
- [x] Pagehide save attempt.
- [x] In-memory capture/restore/migration smoke coverage.

## Retained unresolved work

The menu ready-handoff audit from `2026-07-17T01-39-36-04-00`, adaptive-quality audit from `2026-07-16T21-38-30-04-00`, and pointer-look gesture audit from `2026-07-16T18-41-23-04-00` remain unresolved.

## Non-findings

- No save-loss incident was reproduced.
- No runtime persistence implementation was added.
- No browser storage or deployment fixture was run.
- No production-readiness claim is made.
