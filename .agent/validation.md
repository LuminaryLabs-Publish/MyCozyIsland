# Validation: MyCozyIsland Host Save Persistence Audit

Last updated: `2026-07-12T14-51-49-04-00`

## Change boundary

```txt
runtime source changed in this audit run: no
save behavior changed in this audit run: no
Agriculture behavior changed: no
Inventory behavior changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Plan ledger

**Goal:** record exactly what was inspected and avoid claiming browser durability that has not been executed.

- [x] Inspect the full accessible Publish inventory.
- [x] Inspect current central ledger timestamps.
- [x] Confirm root `.agent` coverage for the selected repository.
- [x] Inspect active composition and 13 installed engine kits.
- [x] Inspect `cozy-save-domain-kit` capture, checksum, migration, restore, rollback and reset.
- [x] Inspect browser `loadSave`, `storeSave`, autosave cadence, HUD status, pagehide and global reset surfaces.
- [x] Inspect renderer-neutral save projection.
- [x] Inspect package scripts and existing Node smoke.
- [x] Add the `2026-07-12T14-51-49-04-00` tracker and audit family.
- [x] Refresh required root `.agent` files.
- [ ] Execute runtime/browser persistence fixtures after implementation.

## Source review completed

```txt
src/main-adventure.js
  SAVE_KEY
  loadSave
  storeSave
  updateHud
  renderer animation loop
  autosave fingerprint and accumulator
  pagehide listener
  public CozyIsland save/reset surfaces

src/adventure/persistence-render-domains.js
  SaveState
  v1/v2 schema handling
  checksum validation
  capture
  sequential restore
  rollback catch path
  reset
  durableFingerprint
  frame save projection

src/adventure/composition-runtime.js
  installed kit order
  save/render domain installation
  compatibility alias

tests/adventure-domains-smoke.mjs
  engine-level v2 capture/restore
  synthetic v1 migration
  no browser storage coverage

package.json
  npm test -> Node adventure smoke only
```

## Existing source proof

```txt
portable save-v2 capture exists
checksum validation exists
save-v1 farming-state migration exists
engine participant restore exists
engine participant reset exists
host retries later after localStorage write failure
Node smoke covers engine v2 round trip
Node smoke covers synthetic v1 migration
```

## Source-backed negative proof

```txt
capture mutates SaveState before localStorage write
HUD Saved depends on captured state
failed storage write leaves captured state
restore rollback failure is logged but rolledBack remains true
corrupt active record is not quarantined
.v1 key stores /2 schema without key migration receipt
no staging/readback/pointer/backup protocol
no writer lease or predecessor admission
pagehide is once-only and pageshow is absent
reset does not immediately update durable storage
no storage/restore generation in render frame
```

## Commands in this documentation run

```txt
npm install: not run
npm test: not run
browser smoke: not run
multi-tab smoke: not run
bfcache smoke: not run
Pages smoke: not run
```

The GitHub connector provided source reads and writes but no runnable repository checkout. No command success is claimed.

## Missing executable proof

```txt
quota/security write failure fixture: unavailable
serialization/readback failure fixture: unavailable
staged commit and predecessor backup fixture: unavailable
corrupt active and valid backup fixture: unavailable
legacy key migration fixture: unavailable
multi-tab predecessor conflict fixture: unavailable
writer lease fixture: unavailable
pagehide/bfcache/pageshow fixture: unavailable
reset-crash-reload fixture: unavailable
restore rollback-failure fixture: unavailable
save-status HUD truth fixture: unavailable
restore-to-first-frame fixture: unavailable
WebGPU/WebGL2 save provenance parity: unavailable
Pages persistence round-trip/recovery smoke: not run
```

## Current conclusion

The portable engine save domain is source-backed, but browser persistence is not an authoritative transaction. This audit documents the missing host boundary and does not claim verified durability, conflict safety, corrupt-record recovery, bfcache-safe flushing, truthful rollback reporting, immediate reset durability or first-visible-frame provenance.