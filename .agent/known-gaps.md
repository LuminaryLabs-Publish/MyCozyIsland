# Known gaps: pointer-look gesture ownership

## Plan ledger

**Goal:** keep unresolved pointer ownership and capture work explicit until executable evidence closes it.

- [ ] No pointer gesture authority domain.
- [ ] No active owner lease.
- [ ] No gesture or capture revision.
- [ ] Pointermove does not compare `event.pointerId` with the stored drag owner.
- [ ] Pointerup clears the drag without owner comparison.
- [ ] Pointercancel clears the drag without owner comparison.
- [ ] No `lostpointercapture` settlement.
- [ ] Secondary pointers can overwrite the shared drag coordinates.
- [ ] Secondary-pointer policy is implicit.
- [ ] Input pointer commands contain no pointer ID.
- [ ] Input pointer commands contain no gesture ID.
- [ ] Input pointer commands contain no route or canvas revision.
- [ ] No stale-event rejection after gesture settlement.
- [ ] No typed pointer admission result.
- [ ] No typed pointer delta result.
- [ ] No typed terminal settlement result.
- [ ] No exact capture-release receipt.
- [ ] No `FirstPointerLookFrameAck`.
- [ ] No mouse, pen, touch or mixed-pointer fixture.
- [ ] No lost-capture or lifecycle-retirement fixture.
- [ ] No source/build/Pages pointer-gesture proof.

## Non-findings

- No claim is made that a visible multi-touch failure occurs on every device.
- No change to player, camera or input architecture was implemented.
- No pointer gesture was reproduced in a real browser during this documentation run.
- No accessibility, deployment or production-readiness claim is made.