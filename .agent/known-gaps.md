# Known Gaps: MyCozyIsland Host Save Persistence

Last updated: `2026-07-12T14-51-49-04-00`

## Critical

1. **Capture is not durable commit:** `cozySave.capture()` marks SaveState captured before localStorage success is known.
2. **HUD can falsely say Saved:** storage failure leaves `status: captured`, and HUD derives its label from that state.
3. **Rollback failure is misreported:** restore returns `rolledBack: true` even when rollback throws.
4. **No predecessor-preserving commit:** one localStorage key is replaced without staging, readback verification, active pointer or verified backup.
5. **No cross-tab conflict authority:** multiple tabs can silently overwrite from stale predecessors.
6. **Reset is not immediately durable:** a crash before later autosave/pagehide can resurrect the old record.
7. **No restore-to-frame proof:** the visible world does not cite storage or restore generation.

## High

- Corrupt JSON, checksum failures and unsupported schemas remain at the active key and are retried on every reload.
- The key `my-cozy-island.adventure-save.v1` stores current `/2` envelopes without an explicit key migration contract.
- No save session ID, command ID, storage generation or dirty revision exists.
- No expected predecessor checksum or compare-and-swap admission exists.
- No browser storage capability, quota or security-error classification exists.
- No tab identity, writer lease or storage-event reconciliation exists.
- SaveState `saveCount` counts captures, including host write failures.
- SaveState `lastHash` can identify a snapshot that was never persisted.
- Autosave cadence advances using clamped simulation dt rather than explicit monotonic wall time.
- The pagehide listener is once-only and no pageshow/bfcache rearm exists.
- Visibility changes clear input but do not trigger a persistence policy.
- No dirty-state status remains visible after write failure or conflict.
- Public `captureSave()` captures only in memory and has no durable-result distinction.

## Medium

- No producer build, dependency, world or source fingerprint is stored in a host envelope.
- No saved-at timestamp or storage commit timestamp exists.
- No bounded backup retention or recovery-slot policy exists.
- No corrupt-record quarantine journal exists.
- No conflict, retry, replacement or fork policy exists.
- No lifecycle flush deadline or result exists.
- No reset tombstone/baseline generation exists.
- No migration receipt identifies legacy key, source schema and target storage generation.
- No first saved, restored or reset frame receipt exists.
- WebGPU and WebGL2 do not receive save provenance beyond engine SaveState.

## Existing Agriculture recovery gaps

- Agriculture events queued before a later failure are not retracted.
- ECS journal rows from candidate/restoration writes are not transaction-classified.
- Parent recovery can accept Agriculture child history without paired Inventory proof.
- Save-v1 migration does not reconcile legacy `cozy-farming` ledger records.
- Portable saves and render snapshots have no Agriculture transaction/recovery revision.

## Proof gaps

- No localStorage quota/security failure fixture.
- No serialization or readback corruption fixture.
- No corrupt-active/valid-backup recovery fixture.
- No unsupported-schema quarantine fixture.
- No two-tab stale-predecessor fixture.
- No writer-lease expiry fixture.
- No storage-event conflict fixture.
- No visibility/pagehide flush fixture.
- No bfcache pageshow and second-pagehide fixture.
- No reset-crash-reload fixture.
- No restore rollback-failure fixture.
- No durable save-status HUD fixture.
- No restore-to-first-visible-frame fixture.
- No WebGPU/WebGL2 save-status parity smoke.
- No deployed Pages save round-trip/recovery smoke.
