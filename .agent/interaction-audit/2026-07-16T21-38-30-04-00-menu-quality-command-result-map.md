# Interaction Audit — Menu Quality Command/Result Map

## Commands

### `MenuQualityAdmissionCommand`
Inputs: backend, viewport, DPR, hardware, recipe and lifecycle revisions.  
Result: accepted initial tier, budgets, quality generation and rejection reason.

### `MenuFrameBudgetEvidenceCommand`
Inputs: CPU frame duration, GPU completion, missed-frame count, visibility and entry state.  
Result: bounded evidence window excluding inactive periods.

### `MenuQualityTransitionCommand`
Inputs: accepted evidence, current quality generation and policy revision.  
Result: no-op, downgrade, upgrade or rejection with exact target budgets.

### `MenuQualityFrameCommitCommand`
Inputs: accepted resource generation, camera/viewport revision and frame revision.  
Result: `FirstMenuQualityBoundFrameAck` after the first matching visible frame.

## Rejection classes

- stale viewport or DPR revision;
- hidden, disposed or entering renderer;
- insufficient sustained evidence;
- transition cooldown active;
- unavailable backend capability;
- stale resource generation;
- duplicate transition result.

Browser events and frame callbacks should submit evidence only. They must not independently own quality truth.