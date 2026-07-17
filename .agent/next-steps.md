# Next steps: menu frame-budget adaptive quality

## Checklist

- [ ] Add one product-level menu quality authority without moving Three.js rendering into simulation.
- [ ] Give initial quality admission stable viewport, DPR, backend, hardware and recipe revisions.
- [ ] Measure bounded CPU frame duration and missed-frame evidence.
- [ ] Add backend-appropriate GPU completion evidence where available.
- [ ] Exclude hidden, disposed and entry-transition periods from evidence.
- [ ] Define frame-budget targets for high, balanced and low tiers.
- [ ] Require sustained overload before downgrade.
- [ ] Require a longer sustained recovery window before upgrade.
- [ ] Add transition cooldown and oscillation prevention.
- [ ] Re-admit policy after viewport-shape and DPR changes.
- [ ] Separate DPR-only transitions from resource-rebuild transitions.
- [ ] Stage replacement shadow, particle, geometry and post resources before retirement.
- [ ] Reject stale resource generations after commit.
- [ ] Preserve reduced-motion policy independently from performance policy.
- [ ] Preserve Core Startup as the only factual Play-readiness source.
- [ ] Publish `MenuQualityAdmissionResult` and `MenuQualityTransitionResult`.
- [ ] Publish `FirstMenuQualityBoundFrameAck`.
- [ ] Add WebGPU, WebGL2, resize, DPR, overload, recovery and oscillation fixtures.
- [ ] Validate source, built artifact and deployed Pages parity.
- [ ] Retain prior pointer-gesture work as a separate unresolved authority.

## Implementation order

1. Quality identity and evidence schema.
2. Frame-budget sampler and lifecycle filtering.
3. Hysteresis and cooldown policy.
4. DPR-only transition path.
5. Resource-generation replacement path.
6. Visible-frame acknowledgement.
7. Browser, artifact and Pages fixtures.