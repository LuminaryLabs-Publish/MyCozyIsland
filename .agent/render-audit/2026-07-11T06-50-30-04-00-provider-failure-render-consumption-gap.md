# Render Audit: Provider Failure and Render Consumption Gap

Timestamp: `2026-07-11T06-50-30-04-00`

## Plan ledger

**Goal:** define why provider completeness and pinned-runtime parity must be proven before the cell-aware renderer can replace the global compatibility graph.

- [x] Trace startup snapshot construction.
- [x] Trace later focus updates.
- [x] Compare provider failure visibility with visible resources.
- [x] Define render-admission requirements.

## Current render path

```txt
domains.prepare()
  -> createLegacyRenderSnapshot()
  -> createStylizedWorldRenderer(snapshot)
  -> build one whole-island graph

later frames
  -> updateWorldFocus()
  -> provider stores can change
  -> worldRenderer.update(elapsedSeconds)
  -> no new provider descriptor consumption
```

## Failure masking

The global graph remains visible even when a later Core World transition is incomplete. This currently prevents holes but hides the semantic failure.

```txt
new focus
  -> old semantic cells released
  -> one new critical provider fails
  -> failed cell record can enter world state
  -> wrapper returns true
  -> global render graph remains unchanged
  -> visual output looks healthy
```

The debug surface does not expose a typed focus result, complete/failed cell set, provider-store fingerprint or render admission decision.

## Future cell-render risk

If `renderer-world-cells` is wired before this gap is closed:

```txt
released old descriptors
  -> release old meshes
failed new descriptor
  -> no replacement mesh
result
  -> visible hole, stale resource, duplicate fallback or uncorrelated scene state
```

A renderer cannot infer completeness from `changed=true`.

## Required render admission

```txt
world revision is admitted only when:
  session epoch matches
  runtime identity matches
  focus result is accepted-complete
  every required cell is active
  no critical provider is failed or blocked
  every presentation descriptor is present
  provider/store fingerprint matches the result
```

For an explicit degraded policy:

```txt
accepted-degraded world revision
  -> may update diagnostics and semantic readback
  -> must not release previous visible resources
  -> must not become cell-render authoritative
  -> names failed cells and fallback policy
```

## Required render result linkage

```txt
sessionEpoch
focusCommandId
focusRevision
worldRevision
worldCompleteness
presentationRevision
renderRevision
admissionStatus
admissionReason
renderedCellIds
retainedPreviousCellIds
failedCellIds
fallbackKinds
sourceFingerprint
renderFingerprint
```

## Required fixture

```txt
complete focus transition
  -> one shadow render commit

critical provider failure
  -> world result is not Boolean success
  -> previous shadow resources remain
  -> no released visible cell without replacement

retry succeeds
  -> next complete world revision commits once
  -> old resources release once after replacement exists
```

## Decision

Keep the whole-island compatibility renderer visible. Add session lifecycle first, pinned-runtime/focus authority second, then run the cell renderer in shadow mode until complete, failure and recovery revisions all correlate.
