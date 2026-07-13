# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-12T20-40-56-04-00`

## Summary

The newest gap is durable-save commit truth. The save DSK can capture, validate, migrate and restore portable state, but browser persistence has no verified commit receipt, predecessor-slot authority or truthful rollback result. The previous browser-input ownership gaps remain unresolved.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Runtime session and run-generation authority.
- [ ] Browser input surface, focus, gesture and command ownership.
- [ ] Durable save commit and storage receipt authority.
- [ ] Restore participant barrier and truthful rollback authority.
- [ ] Page lifecycle save completion policy.
- [ ] Save-status visible-frame provenance.
- [ ] Agriculture recovery and cross-domain transaction proof.
- [ ] Adaptive quality transaction and render-generation proof.
- [ ] Browser and Pages parity fixtures.

## Durable-save gaps

```txt
candidate capture separated from durable commit: no
save command ID and commit generation: absent
storage slot identity and revision: absent
write result owned by save authority: absent
write/readback verification: absent
last-known-good predecessor slot: absent
storage error classification: absent
bounded retry/backoff policy: absent
pagehide completion result: absent
rollback participant receipts: absent
post-rollback fingerprint: absent
truthful rollback failure result: absent
visible DurableSaveReceipt: absent
first visible save frame acknowledgement: absent
```

## Concrete consequences

- `cozySave.capture()` marks state `captured` before `localStorage.setItem()` succeeds.
- The HUD renders `Saved` from `captured`, so quota or security failures can display false success.
- A failed write leaves the predecessor storage slot unchanged but does not expose that fact in SaveState.
- Autosave retries because the host fingerprint is not advanced, but retry count and backoff are unbounded and unobserved.
- Pagehide calls the same synchronous adapter without a completion receipt or policy.
- If restore and rollback both fail, the caller still receives `rolledBack: true`.
- No browser or deployed fixture proves durable progress survives reload after a reported save.

## Retained browser-input gaps

```txt
global keyboard ownership
missing editable-target exclusion
mismatched pointer move/up admission
missing primary pointer/button policy
missing lostpointercapture handling
permanent input generation 1
clear does not close a generation
duplicate commands accepted
rejection diagnostics inert
consumer receipts absent
first visible input-frame acknowledgement absent
```

## Other retained gaps

### Runtime and lifecycle

- Renderer and browser listeners lack one explicit retirement transaction.
- Public `globalThis.CozyIsland` exposes raw engine and domain capabilities.
- Save, input, render and page lifecycle do not share one runtime generation.

### Agriculture and transactions

- Agriculture cutover recovery and failure injection remain incompletely proven in browser/Pages surfaces.
- Cross-domain Inventory, Agriculture and Foraging settlement still depends on broader transaction fixtures.

### Rendering and quality

- Adaptive-quality changes have no atomic render-generation result.
- WebGPU/WebGL2 and deployed parity evidence remains incomplete.

## Required save fixtures

```txt
quota failure
SecurityError
storage unavailable
serialization failure
write/readback corruption
late commit generation
last-known-good preservation
v1 migration durable rewrite
participant restore failure
rollback participant failure
pagehide save result
HUD Saved withheld until receipt
reload after reported save
WebGPU/WebGL2/Pages parity
```

## Dependency order

```txt
runtime session and run generation
  -> save command and storage generation
  -> detached candidate capture
  -> durable write/readback and predecessor preservation
  -> restore participant barrier and rollback proof
  -> visible receipt projection
  -> browser and Pages parity
```

## Do not claim

Do not claim durable autosave, crash safety, truthful rollback, pagehide persistence, visible save correctness or deployed save reliability until the required fixtures pass on `main`.