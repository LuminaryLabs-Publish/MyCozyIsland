# Known gaps: MyCozyIsland

**Timestamp:** `2026-07-13T08-04-17-04-00`  
**Publication status:** `resource-settlement-recovery-authority-audited`

## Summary

The active gap is cross-domain resource settlement and recovery. Inventory, Agriculture, Foraging and Core Transaction Ledger expose useful bounded services, but planting, harvesting and wild collection are composed through sequential participant writes without one atomic commit, complete participant receipts, event buffering, evidence-safe recovery or visible-frame proof.

## Plan ledger

**Goal:** keep unresolved risks dependency ordered and tied to executable proof.

- [ ] Resource settlement identity and generation.
- [ ] Expected participant and ledger revisions.
- [ ] Detached Inventory, Agriculture and Foraging candidates.
- [ ] Participant prepare and aggregate commit authority.
- [ ] Event buffering and post-commit release.
- [ ] Partial-attempt classification, recovery and quarantine.
- [ ] Settlement-consistent save and restore.
- [ ] Visible settlement-frame provenance.
- [ ] Fault-injection and deployment-parity fixtures.
- [ ] Public-runtime capability authority.
- [ ] Page lifecycle, input, adaptive quality and durable storage authority.

## Resource-settlement gaps

```txt
SettlementId and generation: absent
expected Inventory revision: absent
expected aggregate ledger sequence: absent
Inventory prepare candidate: absent
Agriculture participant prepare receipt: absent
Foraging participant prepare receipt: absent
participant event buffer: absent
atomic multi-participant commit: absent
aggregate terminal result with participant receipts: absent
partial-attempt classification: absent
divergence quarantine: absent
save-eligible settlement generation: absent
first visible settlement-frame acknowledgement: absent
fault-injection fixtures: absent
source/build/Pages settlement parity: absent
```

## Agriculture consequence

```txt
Inventory applies resource changes
  -> Agriculture commits plot state and may emit event
  -> aggregate product ledger record commits last
```

A catch path loads snapshots, but emitted events cannot be retracted and observers may already have seen intermediate state.

## Agriculture recovery consequence

```txt
aggregate product record missing
  -> inner Agriculture record exists
  -> product code records aggregate success
```

No check proves that the corresponding Inventory operation succeeded, current balances match the plan, participant revisions share one predecessor or a partial state was not saved/rendered.

## Foraging consequence

```txt
outer Foraging applyOnce
  -> Inventory add coconut
  -> optional Inventory add sprout
  -> node depletion
  -> outer record
```

Nested Inventory results are ignored. No shared rollback or participant receipt joins resource addition to node depletion.

## Persistence and rendering consequence

```txt
save capture reads participant snapshots sequentially
restore writes participant snapshots sequentially
render revision concatenates participant revisions
```

Neither surface carries SettlementId, aggregate ledger sequence, participant receipts or settlement-generation acknowledgement.

## Retained public capability gaps

```txt
raw engine and presentation owners remain publicly exposed
channel policy and capability grants absent
caller/source identity and expected revision absent
host revocation and visible-effect acknowledgement absent
```

## Retained lifecycle, save, input and quality gaps

```txt
BFCache-aware suspend/resume classification absent
complete retirement participant registry absent
durable storage write/readback receipt absent
browser input focus/gesture/generation authority incomplete
adaptive quality atomic transition and DPR recovery incomplete
source/build/Pages fixture coverage incomplete
```

## Dependency order

```txt
runtime and settlement generation
  -> participant prepare adapters
  -> atomic settlement result
  -> event release
  -> recovery evidence and quarantine
  -> save eligibility
  -> visible-frame acknowledgement
  -> deployment proof
```

## Do not claim

Do not claim atomic resource exchange, event rollback, evidence-complete recovery, settlement-consistent saves, visible settlement provenance or production readiness until the fixture matrix passes on `main`.
