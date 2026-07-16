# Known gaps: MyCozyIsland renderer device and context loss recovery

**Timestamp:** `2026-07-16T00-59-16-04-00`

## Summary

Renderer startup is explicit, but renderer lifetime health, loss, recovery and recovered-frame proof remain outside the product's owned domain model.

## Plan ledger

**Goal:** keep renderer-loss risks explicit until backend adapters, reconstruction and executable proof exist.

- [ ] No product-owned renderer-generation identity.
- [ ] No product-owned WebGPU device-loss observation result.
- [ ] No WebGL context lost/restored contract.
- [ ] No duplicate or stale loss-evidence rejection.
- [ ] No explicit render suspension result.
- [ ] No declared simulation policy during renderer loss.
- [ ] No declared input policy or held-action clearing during renderer loss.
- [ ] Hidden preload resumes the prior animation callback without renderer-health re-admission.
- [ ] Hidden preload does not revoke readiness while renderer recovery is pending.
- [ ] No stable GPU resource reconstruction registry.
- [ ] No renderer and post-pipeline reconstruction command.
- [ ] No atmosphere, ocean, foam, cloud, fog, world or gameplay resource rehydration result.
- [ ] No recovery deadline, retry budget or supersession policy.
- [ ] No stale renderer-generation callback rejection proof.
- [ ] No WebGPU-to-WebGL2 fallback admission result.
- [ ] No semantic runtime renderer-failure surface.
- [ ] No `RenderRecoveryResult` or `RenderFallbackResult`.
- [ ] No `FirstRecoveredFrameAck`.
- [ ] No forced-loss browser, artifact or Pages fixture.

## Important distinction

The absence of a product-owned contract does not prove Three.js or the browser performs no internal recovery. Internal provider behavior is not sufficient product evidence because it does not bind route, simulation, input, renderer resources and one accepted visible frame to stable revisions.