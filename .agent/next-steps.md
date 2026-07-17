# Next steps: host save commit durability projection

## Checklist

- [ ] Add one product-level save-durability authority without moving browser storage into simulation.
- [ ] Allocate a monotonic save generation and immutable envelope digest.
- [ ] Make envelope capture return `SaveEnvelopeCaptureResult` without claiming durability.
- [ ] Add a browser storage capability result for availability, origin and payload budget.
- [ ] Admit one `HostSaveCommitCommand` with expected predecessor digest.
- [ ] Return `HostSaveCommitResult` as persisted, failed or indeterminate.
- [ ] Advance the durable fingerprint only from the matching persisted result.
- [ ] Preserve the previous durable digest when a write fails.
- [ ] Retain host persistence errors in authoritative save state.
- [ ] Reject stale host results after a newer save generation is pending.
- [ ] Retain duplicate results without applying them twice.
- [ ] Add bounded retry policy without hiding the active failure.
- [ ] Project saving, saved, failed and unavailable states into the HUD.
- [ ] Publish `FirstDurableSaveStatusFrameAck` for the matching generation.
- [ ] Route `pagehide` and visibility retirement through the same command/result path.
- [ ] Add corrupt-JSON and checksum-failure quarantine behavior.
- [ ] Add localStorage success, quota, security and unavailability fixtures.
- [ ] Add rapid-mutation, retry, stale-result and duplicate-result fixtures.
- [ ] Add pagehide, reload and back-forward-cache fixtures.
- [ ] Validate source, static artifact and Pages-origin parity.
- [ ] Retain menu ready-handoff, adaptive-quality and pointer-gesture work as separate unresolved authorities.

## Implementation order

1. Save generation, envelope result and durable-digest state.
2. Browser storage capability and commit adapter.
3. Host result admission and apply-once settlement.
4. Retry, stale-result and duplicate-result policy.
5. HUD projection and first matching frame acknowledgement.
6. Page lifecycle settlement and corrupt-save quarantine.
7. Browser, artifact and Pages fixtures.
