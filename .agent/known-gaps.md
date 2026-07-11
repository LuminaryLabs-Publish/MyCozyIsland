# Known Gaps: MyCozyIsland

Last updated: `2026-07-11T12-58-06-04-00`

## Summary

The production route advances a clock but does not produce one authoritative environment frame. Dynamic and startup-frozen consumers coexist without shared revision, rollback, reset or visible-frame proof.

The earlier lifecycle, Core World, render-commit and adaptive-quality gaps remain active prerequisites or downstream dependencies.

## Environment-frame gaps

```txt
versioned EnvironmentFrame schema: absent
environmentFrameId: absent
environment revision/fingerprint: absent
session/generation/tick admission: absent
monotonic clock sample identity: absent
canonical effective environment state: absent
bounded environment journal: absent
```

## Live-source projection gaps

```txt
clock: live
wind service: live only when queried
illumination service: live only when queried
weather: immutable preset
scenario refreshes clock: yes
scenario refreshes wind: no
scenario refreshes illumination: no
scenario refreshes cloud/fog descriptors: no
```

## Startup-frozen consumer gaps

```txt
sky gradient
hemisphere intensity
sun direction/color/intensity
renderer exposure
scene fog descriptor
vegetation wind descriptor
campfire smoke wind direction/response
cloud weather/lighting/shadow/horizon
fog density/advection/placement
```

## Consumer transaction gaps

```txt
consumer plan: absent
prepare phase: absent
atomic commit: absent
rollback: absent
typed consumer receipt: absent
stale/duplicate rejection: absent
partial-failure recovery: absent
```

## Reset gaps

```txt
canonical baseline EnvironmentFrame: absent
reset frame revision: absent
consumer baseline prepare/commit: absent
old-frame retirement: absent
reset result/fingerprint: absent
first visible reset frame receipt: absent
```

## Render-proof gaps

```txt
environmentRevision on render frame: absent
environmentFingerprint on render frame: absent
consumer acknowledgement set: absent
first visible frame receipt: absent
debug overlay environment parity: absent
public host effective environment state: absent
```

Elapsed seconds are not proof that sky, sun, wind, clouds, fog, ocean, vegetation and campfire agree.

## Lifecycle interaction gaps retained

- The animation loop has no session generation admission.
- Reset, stop and disposal do not fence environment updates.
- The global host exposes raw mutable runtime and renderer objects.
- Pagehide does not retire the complete render graph.
- Old environment callbacks cannot be revoked after restart.

## Core World and render gaps retained

- Reset clears world definitions without a complete re-registration transaction.
- Focus updates return Boolean rather than a typed revision.
- Materialization lacks session/world/focus generation fencing.
- Provider readiness is not a canonical version set.
- Cell resources have no prepare/commit/rollback transaction.
- Visible cell rendering remains disconnected from prepared descriptors.
- No committed frame correlates world, renderer, environment and quality revisions.

## Adaptive quality gaps retained

- Dwell thresholds are frame-count based.
- Quality consumer mutations are not atomic.
- Recovery to level zero does not restore pixel ratio.
- Effective quality state and frame acknowledgement are absent.

## Validation gaps

```txt
deterministic environment frame replay
wind consumer parity
illumination consumer parity
cloud/fog consumer parity
reset baseline replay
stale session/generation/tick/revision rejection
duplicate frame handling
consumer prepare rejection
consumer commit failure rollback
WebGPU/WebGL2 parity
first visible frame acknowledgement
```

## Deployment blockers

```txt
mixed live and startup-frozen environment state
no environment frame identity or fingerprint
no consumer transaction or rollback
no reset baseline result
no visible environment-frame acknowledgement
no executable environment coherence fixtures
```

## Not currently blocked by

- deterministic clock and seed services;
- live wind and illumination functions;
- existing scene, cloud, fog, ocean and foam consumers;
- the 50 local kit catalog;
- the seven provider order;
- pinned Three.js and NexusEngine revisions;
- GitHub Pages configuration.
