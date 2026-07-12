# Next Steps: MyCozyIsland Host Save Persistence

Last updated: `2026-07-12T14-51-49-04-00`

## Goal

Implement one browser-host persistence authority that distinguishes portable snapshot capture from verified durable commit and makes restore, reset, conflict, lifecycle and save-status results truthful.

## Plan ledger

- [ ] Add `cozy-island-host-save-persistence-authority-domain` as a host adapter around `cozy-save-domain-kit`.
- [ ] Define save session, command, storage generation and dirty revision identity.
- [ ] Stop mutating committed SaveState during candidate capture.
- [ ] Add an immutable host save envelope with producer, world, dependency, predecessor and dirty-revision fingerprints.
- [ ] Add a canonical save-key registry and explicit migration from `my-cozy-island.adventure-save.v1`.
- [ ] Add browser storage capability and quota classification.
- [ ] Add tab identity and writer lease ownership.
- [ ] Require expected predecessor checksum and storage generation for commit.
- [ ] Write candidates to a staging generation.
- [ ] Read back and verify serialized bytes, schema and checksums.
- [ ] Commit through an active pointer or equivalent predecessor-preserving protocol.
- [ ] Retain a bounded verified backup generation.
- [ ] Add committed, unchanged, rejected, conflicted and failed save results.
- [ ] Keep dirty state pending after every failed or conflicted write.
- [ ] Derive HUD `Saved` only from a verified `SaveCommitResult`.
- [ ] Add corrupt-record quarantine and fallback-to-backup policy.
- [ ] Add restore-preparation admission before mutating live participants.
- [ ] Add `restore-rollback-failed` and `restore-indeterminate` outcomes.
- [ ] Add restore command and storage generation to render snapshots.
- [ ] Add first visible restored-frame acknowledgement.
- [ ] Replace simulation-dt-only autosave cadence with an explicit monotonic policy.
- [ ] Add visibility/pagehide flush commands with lifecycle generations.
- [ ] Add pageshow/bfcache rearm and stale-callback rejection.
- [ ] Make reset immediately durable through a baseline, tombstone or explicit erase commit.
- [ ] Revoke or reconcile stale multi-tab writers through storage events.
- [ ] Add a bounded save, conflict, quarantine and lifecycle journal.
- [ ] Add quota/security failure fixtures.
- [ ] Add readback corruption and backup recovery fixtures.
- [ ] Add two-tab predecessor conflict fixtures.
- [ ] Add pagehide -> bfcache -> pageshow -> pagehide fixtures.
- [ ] Add reset-then-crash-reload fixtures.
- [ ] Add restore rollback-failure fixtures.
- [ ] Add WebGPU/WebGL2 save-status and first-frame parity smoke.
- [ ] Add deployed Pages save round-trip and recovery smoke.

## Agriculture recovery dependency

The previous Agriculture cutover recovery work remains required after host save truth is established:

- [ ] Add event-queue and ECS-journal segmentation.
- [ ] Prove Inventory and Agriculture child-record parity before parent recovery.
- [ ] Reconcile or quarantine legacy `cozy-farming` ledger records.
- [ ] Add transaction/recovery revisions to portable saves and render snapshots.
- [ ] Add first visible Agriculture transaction-frame acknowledgement.

## Acceptance criteria

```txt
successful autosave
  -> immutable candidate captured
  -> storage candidate staged and read back
  -> predecessor still matches
  -> active generation committed once
  -> HUD cites the commit ID and storage generation

storage failure
  -> predecessor remains active
  -> dirty revision remains pending
  -> HUD never says Saved
  -> retry is typed and idempotent

corrupt active record
  -> invalid record is quarantined
  -> verified backup remains available
  -> restore result identifies fallback generation

multi-tab conflict
  -> stale predecessor cannot silently overwrite
  -> conflict result exposes expected and actual generations

restore failure
  -> rollback outcome is truthful
  -> rollback failure enters recovery/indeterminate state
  -> gameplay does not claim a restored session

reset
  -> engine reset and durable baseline/tombstone commit complete together
  -> crash/reload cannot resurrect predecessor state

visible frame
  -> first restored/reset frame cites the same storage and command generation
```

Keep gameplay state in its existing domains. Keep portable payload rules in `cozy-save-domain-kit`. The new authority coordinates browser durability only.