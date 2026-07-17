# Known gaps: menu frame-budget adaptive quality

## Current focus

- [ ] Menu quality is admitted only during renderer initialization.
- [ ] Runtime frame cost is not sampled into a bounded evidence window.
- [ ] GPU completion evidence is not admitted.
- [ ] Missed-frame evidence is not classified.
- [ ] Resize does not re-run quality admission.
- [ ] DPR changes do not produce a quality revision.
- [ ] Tier-bound water and horizon geometry are not replaced after admission.
- [ ] Particle and shadow budgets are not transitioned after admission.
- [ ] Bloom/post budget has no transition contract.
- [ ] No overload or recovery hysteresis exists.
- [ ] No transition cooldown or oscillation guard exists.
- [ ] No quality generation or resource-generation identity exists.
- [ ] No typed quality admission result exists.
- [ ] No typed transition result exists.
- [ ] No stale-resource rejection exists.
- [ ] No `FirstMenuQualityBoundFrameAck` exists.
- [ ] No real-browser adaptive-quality fixture exists.
- [ ] No artifact or Pages parity proof exists.

## Retained unresolved work

The prior pointer-look gesture ownership, capture settlement and mixed-pointer fixture gaps remain unresolved and are tracked in the `2026-07-16T18-41-23-04-00` audit family.

## Non-findings

- No claim is made that the menu currently misses frame targets on a specific device.
- No runtime adaptive-quality implementation was added.
- No browser performance capture was run.
- No production-readiness claim is made.