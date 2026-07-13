# Render audit: BFCache resume visible-state gap

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

The page lifecycle path can destructively clear the gameplay renderer’s state indexes before a retained page resumes. No render generation or first-resumed-frame receipt proves that Agriculture, Foraging, HUD and target-marker presentation still describe the same authoritative snapshot.

## Plan ledger

**Goal:** require resumed rendering to use a complete retained or reconstructed presentation generation before a visible frame is accepted.

- [x] Trace gameplay renderer construction, update and disposal.
- [x] Identify every index cleared by disposal.
- [x] Trace pagehide and the absent pageshow reconstruction path.
- [x] Define resumed-frame provenance and parity requirements.
- [ ] Add executable BFCache rendering fixtures.

## Current render path

```txt
startup
  -> build plotEntries from static farm layout
  -> build forageEntries from static forage layout
  -> build cropGroups
  -> attach gameplay group to scene

frame update
  -> use plotEntries to update soil and crop meshes
  -> use forageEntries to update coconut visibility
  -> use both maps to position interaction target marker

pagehide
  -> gameplayRenderer.dispose
  -> dispose geometry and materials
  -> clear plotEntries
  -> clear forageEntries
  -> clear cropGroups

retained-page resume
  -> no reconstruction
  -> no map repopulation
  -> no presentation generation change
  -> no first resumed visible-frame acknowledgement
```

## Visible mismatch risks

```txt
Agriculture simulation advances while plot visual indexes are empty
Foraging state changes while forage visual indexes are empty
HUD can continue to show new counts while world objects remain stale
interaction target remains authoritative while target marker lookup fails
renderer diagnostics can continue without identifying a resumed render generation
```

## Required render contract

```txt
ResumeRenderPlan {
  lifecycleGeneration
  predecessorRenderGeneration
  participantRevision
  gameplayPresentationMode: retained | reconstructed
  authoritativeFrameFingerprint
}
```

A resumed frame is admissible only when:

```txt
gameplay renderer indexes are complete
plot and forage descriptors match the static snapshot
current Agriculture and Foraging state has been projected
camera and target marker use the same frame snapshot
post pipeline and backend participants are ready
the visible frame cites the resumed lifecycle/render generation
```

## Required receipts

```txt
GameplayPresentationRetainResult
GameplayPresentationRebuildResult
RenderParticipantResumeResult
ResumedVisibleFrameAck
```

## Do not claim

Do not claim BFCache visual continuity, renderer retention, reconstruction correctness, HUD/world parity or target-marker continuity until a real browser round trip proves the first resumed frame.