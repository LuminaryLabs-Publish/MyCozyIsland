# Next steps: live motion preference projection

## Plan ledger

**Goal:** implement one shared motion policy from browser capability through menu and gameplay frame proof.

- [ ] Add `cozy-motion-preference-domain-kit` with system observation, product override, revisions and snapshots.
- [ ] Keep one live `MediaQueryList` and handle its `change` event.
- [ ] Define `system`, `normal` and `reduced` override modes.
- [ ] Publish immutable `MotionPolicyDescriptor` records.
- [ ] Classify direct input and authoritative simulation as preserved behavior.
- [ ] Classify menu wind, menu water, crossfades, aerial camera, ocean, foam, cloud, fog and world wind as policy-controlled presentation.
- [ ] Make menu CSS and JavaScript consume the same resolved policy.
- [ ] Replace the frozen module-level `reducedMotion` boolean.
- [ ] Stop or attenuate menu compute work when reduced motion is active.
- [ ] Freeze or replace menu water shader-time displacement.
- [ ] Skip the aerial rail or present one static establishing frame in reduced mode.
- [ ] Add motion uniforms/descriptors for ocean, foam, cloud, fog and wind.
- [ ] Settle live preference changes without resetting gameplay state.
- [ ] Reject stale callbacks from retired route or policy generations.
- [ ] Publish `MotionProjectionResult` for menu and game.
- [ ] Publish `FirstReducedMotionMenuFrameAck` and `FirstReducedMotionGameplayFrameAck`.
- [ ] Add normal/reduced simulation-parity fixtures.
- [ ] Add live media-query change and product-override fixtures.
- [ ] Run source, built artifact and deployed Pages browser fixtures.
- [ ] Update `.agent` only after executable evidence exists.

## Implementation order

1. Policy and revision authority.
2. Menu projection.
3. Aerial camera policy.
4. Environment projection.
5. Live-change settlement.
6. Frame acknowledgements.
7. Browser and deployment fixtures.
