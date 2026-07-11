# Render Audit: Focus, World and Render Revision Split

Timestamp: `2026-07-11T08-41-02-04-00`

## Summary

The visible scene is constructed once from the startup compatibility snapshot. Later focus updates alter Core World/provider state but do not update visible cell resources, so focus failures and provider divergence can remain visually hidden.

## Plan ledger

**Goal:** define the render-side proof needed after focus authority, without changing visuals during this documentation pass.

- [x] Trace startup snapshot creation.
- [x] Trace focus updates after renderer creation.
- [x] Confirm the live whole-island graph does not consume later provider revisions.
- [x] Identify the render revision and admission fields required.
- [x] Keep render implementation unchanged.

## Current render flow

```txt
domains.prepare()
  -> domains.createLegacyRenderSnapshot()
  -> createStylizedWorldRenderer(snapshot)
  -> create ocean/foam/cloud/fog/post resources
  -> render same whole-island graph every frame

later updateWorldFocus()
  -> Core World/provider state may change
  -> no new compatibility snapshot
  -> no cell render plan
  -> no visible resource commit
```

## Failure masking

A focus transaction can leave Core World focus and provider stores ahead of the wrapper snapshot while the old global graph continues to render normally. Manual visual testing may therefore report success even when world coordination is split.

## Missing render identity

```txt
worldRevision
providerRevisionSet
renderPlanRevision
renderCommitId
renderedWorldRevision
renderedCellIds
renderedProviderFingerprint
resourceGeneration
frameId
```

## Required future flow

```txt
accepted FocusTransactionResult
  -> validate complete/degraded render policy
  -> build detached provider/cell render plan
  -> preflight resource capacities and ownership
  -> commit prepare/update/release resources atomically
  -> publish RenderCommitResult(worldRevision)
  -> render frame acknowledgement(renderCommitId, worldRevision)
```

## Admission policy

```txt
committed-complete
  -> render eligible

committed-degraded
  -> eligible only under explicit provider degradation policy

rejected or rolled-back
  -> keep previous render revision

partial residual
  -> block new render commit and project diagnostics
```

## Existing utilities

The repository already contains renderer-cell cache, resource-disposal helpers and a cell-aware renderer controller. They are isolated and not wired into `main-cloudform.js`; this pass does not promote them until focus revision authority exists.

## Acceptance

```txt
visible resources identify one accepted world revision
no frame mixes provider rows from multiple revisions
failed focus keeps prior render revision
cell release disposes owned resources exactly once
render readback lists active cell IDs and provider fingerprint
startup compatibility rendering remains an explicit fallback, not proof of live parity
```
