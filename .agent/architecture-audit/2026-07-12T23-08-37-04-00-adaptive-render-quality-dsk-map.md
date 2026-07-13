# Architecture audit: adaptive render-quality DSK map

**Timestamp:** `2026-07-12T23-08-37-04-00`

## Summary

The current host owns adaptive quality as direct callbacks over renderer, clouds, fog and post-processing. There is no domain authority that plans, admits, commits, verifies or rolls back the complete transition.

## Plan ledger

**Goal:** define one DSK boundary for quality-level and render-generation consistency.

- [x] Map current participants.
- [x] Identify missing identities, revisions and results.
- [x] Define the parent domain and candidate kits.
- [ ] Implement the domain.

## Current ownership

```txt
webgpu-performance-budget-kit
  -> calculates level
  -> invokes host callback

host callback
  -> cloudRenderer.setStepScale
  -> fogRenderer.setStepScale
  -> postPipeline.setFogResolutionScale
  -> renderer.setPixelRatio on degrade only
```

## Required parent domain

```txt
cozy-island-adaptive-render-quality-transition-authority-domain
```

## Required services

```txt
transition command and source classification
quality-level and render-generation revisions
participant registry and capabilities
current-value readback
detached target planning
stale/unsupported rejection
atomic commit and rollback
typed transition result
bounded observation journal
diagnostic projection
first-visible-frame acknowledgement
```

## Candidate kits

```txt
quality-transition-command-id-kit
quality-transition-source-kit
quality-level-revision-kit
render-surface-generation-kit
adaptive-quality-plan-kit
quality-participant-registry-kit
quality-participant-capability-kit
quality-participant-readback-kit
renderer-pixel-ratio-participant-kit
cloud-step-participant-kit
fog-step-participant-kit
fog-resolution-participant-kit
quality-transition-admission-kit
quality-transition-commit-kit
quality-transition-rollback-kit
stale-quality-transition-rejection-kit
quality-transition-result-kit
quality-transition-observation-kit
quality-transition-journal-kit
quality-diagnostics-projection-kit
quality-visible-frame-ack-kit
```

## Transaction

```txt
signal
  -> expected revision admission
  -> detached multi-participant plan
  -> capability validation
  -> atomic mutation
  -> readback verification
  -> rollback on mismatch
  -> terminal result
  -> visible-frame acknowledgement
```

Documentation only.