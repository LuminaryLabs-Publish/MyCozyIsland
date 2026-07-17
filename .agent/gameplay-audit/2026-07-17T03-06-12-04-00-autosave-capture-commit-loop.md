# Gameplay audit — Autosave capture and host commit loop

**Timestamp:** `2026-07-17T03-06-12-04-00`

## Current loop

```txt
every gameplay frame
  -> tick adventure
  -> render and update HUD
  -> accumulate simulated save time

every five simulated seconds
  -> compute durable-state fingerprint
  -> compare with last successful host fingerprint
  -> capture checksum envelope when changed
  -> capture mutates save-domain status to captured
  -> attempt localStorage.setItem
  -> advance host fingerprint only on success
```

A failed write retries after another five simulated seconds, which is useful, but the failed generation is not settled inside the save domain. The player-facing status can claim `Saved` while the host intentionally keeps the previous fingerprint because the new state was not committed.

## Page lifecycle

`pagehide` invokes the same store helper and immediately disposes the gameplay renderer. There is no apply-once lifecycle command, commit result retention, retirement deadline or visible failure projection.

## Required gameplay rule

Gameplay mutations may create save demand, but they must not claim durability. A save becomes durable only after the matching host commit result is admitted and settled.
