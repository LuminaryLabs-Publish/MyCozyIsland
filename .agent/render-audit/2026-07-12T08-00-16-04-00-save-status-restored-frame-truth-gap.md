# Render Audit: Save Status and Restored-Frame Truth Gap

Timestamp: `2026-07-12T08:00:16-04:00`

## Current projection

`updateHud(frame)` maps `frame.save.status === "captured"` to `Saved`. The save domain reaches `captured` during in-memory capture, before the host performs `localStorage.setItem`.

## Failure sequence

```txt
five-second check
  -> capture snapshot
  -> save domain status = captured
  -> localStorage.setItem throws
  -> host returns failure
  -> save domain remains captured
  -> next frame HUD renders Saved
```

## Restore projection gap

The frame snapshot contains domain state but no:

```txt
save command ID
storage write receipt
restore command ID
restore commit revision
candidate graph identity
restored session generation
first restored frame ID
```

The canvas, HUD and debug overlay cannot prove they display the state committed by a successful storage write or restore.

## Required render contract

```txt
save-status projection
  -> pending only after admission
  -> saved only after adapter receipt
  -> failed with retryable typed reason

restored-frame projection
  -> frame cites restore result, checksum and runtime generation
  -> camera, HUD, farm plots, forage nodes and inventory share that revision
  -> first rendered acknowledgement closes the restore transaction
```
