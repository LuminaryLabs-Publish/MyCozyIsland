# Known gaps: menu preload-to-ready presentation handoff

## Current focus

- [ ] Ready messages have no preload session identity.
- [ ] Ready messages have no iframe document revision.
- [ ] Ready admission has no typed terminal result.
- [ ] Duplicate ready settlement retains no explicit result.
- [ ] Stale ready messages have no generation-based rejection path.
- [ ] The menu presentation has no generation identity.
- [ ] The preload-to-ready DPR change has no typed transition result.
- [ ] The preload-to-ready frame-mode change has no typed transition result.
- [ ] Viewport and DPR revisions are not bound to ready admission.
- [ ] The first ready render has no commit result.
- [ ] No `FirstReadyMenuFrameAck` exists.
- [ ] Play does not wait for a matching ready frame.
- [ ] Pointer, touch and keyboard activation have no shared Play-admission result.
- [ ] Entry does not bind the ready presentation generation.
- [ ] The entry fallback timer has no apply-once result identity.
- [ ] Menu retirement does not reject later handoff work through a typed result.
- [ ] No real-browser ready-handoff fixture exists.
- [ ] No artifact or Pages parity proof exists.

## Implemented performance state

- [x] Direct ACES render path.
- [x] Full-screen bloom removed.
- [x] Dynamic shadow maps disabled.
- [x] Palm fronds merged into one batch.
- [x] Wind motes, water sparkles and petals merged into one particle batch.
- [x] Preload frame target set to 24 FPS.
- [x] Idle-ready frame target set to 30 FPS.
- [x] Interactive frame target set to 60 FPS for 900 ms.
- [x] Preload DPR capped at one.
- [x] Ready DPR restored to the selected quality cap.
- [x] Visibility can suspend the menu renderer.

## Retained unresolved work

The broader runtime adaptive-quality authority from `2026-07-16T21-38-30-04-00` remains unresolved. The pointer-look gesture ownership authority from `2026-07-16T18-41-23-04-00` also remains unresolved.

## Non-findings

- No claim is made that a player observed a ready-transition hitch.
- No claim is made that entry currently fails.
- No runtime handoff implementation was added.
- No browser or deployment fixture was run.
- No production-readiness claim is made.