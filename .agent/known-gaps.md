# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T10-41-40-04-00`  
**Publication status:** `core-startup-integrated-bootstrap-admission-gap-audited`

## Summary

Core Startup integration is implemented, but it begins only after the full static browser module graph has loaded. Provider, import-map, parse or evaluation failure can therefore occur before a typed startup result exists. The first-frame fact also proves host call order rather than renderer submission or visible canvas presentation.

## Plan ledger

**Goal:** keep startup and retained architecture risks dependency ordered and tied to executable proof.

- [ ] Static bootstrap attempt identity and generation.
- [ ] Immutable provider manifest and source receipts.
- [ ] Provider-independent early failure projection.
- [ ] Bounded module admission result.
- [ ] Retry, fallback, cancellation and stale-attempt fencing.
- [ ] Core Startup launch binding to accepted module graph.
- [ ] Renderer-derived first-frame result.
- [ ] First visible startup-frame acknowledgement.
- [ ] Startup/bootstrap lifecycle disposal.
- [ ] Browser/build/Pages bootstrap fixtures.
- [ ] Resource settlement and recovery authority.
- [ ] Public capability, page lifecycle, durable save, input and quality authorities.

## Active startup gaps

```txt
BootstrapAttemptId: absent
BootstrapGeneration: absent
ProviderManifestRevision: absent
provider receipt and integrity evidence: absent
static-shell typed failure result: absent
module-load timeout: absent
module export contract: absent
retry and fallback result: absent
stale predecessor rejection: absent
Core Startup launch/module binding: absent
renderer submission ID: absent
visible startup-frame acknowledgement: absent
bootstrap retirement receipt: absent
browser/build/Pages startup fixtures: absent
```

## Static module consequence

```txt
index.html
  -> static import of src/main-adventure.js
  -> remote/local dependency graph must resolve, parse and evaluate
  -> only then createCozyStartupHost()
  -> only then error and unhandled-rejection listeners exist
```

A failure before host creation can leave the static loading shell unchanged with no typed reason or recovery action.

## First-frame consequence

```txt
postPipeline.render()
  -> returns no result
  -> host authors frame ID and pass-order receipt
  -> Core Startup accepts first-frame fact
  -> enter playable
```

No renderer/device generation, submission result, canvas readback or visible-frame receipt joins that fact to the displayed frame.

## Retained resource-settlement gaps

```txt
multi-participant prepare/commit: absent
Agriculture event buffering: absent
Foraging nested Inventory receipt checks: absent
partial settlement recovery and quarantine: absent
settlement-consistent save generation: absent
first visible settlement acknowledgement: absent
```

## Retained lifecycle, capability, save, input and quality gaps

```txt
BFCache-aware suspend/resume classification absent
complete retirement participant registry absent
startupHost.dispose not called by current page retirement
raw engine and presentation owners remain publicly exposed
durable storage write/readback receipt absent
browser input focus/gesture/generation authority incomplete
adaptive quality atomic transition and DPR recovery incomplete
source/build/Pages parity coverage incomplete
```

## Dependency order

```txt
static bootstrap admission
  -> Core Startup launch binding
  -> renderer submission result
  -> visible startup frame
  -> playable entry
  -> lifecycle retirement
  -> deployment parity

then compose retained gameplay, settlement, save, input and quality authorities
```

## Do not claim

Do not claim provider-independent startup handling, retry isolation, first-visible-frame proof, atomic resource settlement, durable lifecycle convergence or production readiness until the relevant fixture matrices pass on `main`.