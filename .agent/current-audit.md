# Current audit: live motion preference and animation projection

**Timestamp:** `2026-07-16T13-01-43-04-00`  
**Status:** `motion-preference-live-animation-projection-authority-audited`

## Summary

MyCozyIsland has partial reduced-motion handling, not a shared motion policy. CSS removes selected transitions. The menu JavaScript reads the media query once, uses that frozen value for palm deformation and entry timing, and still animates its water shader. The game route does not observe the preference and continuously projects an automatic aerial camera, shader-time ocean waves, sine-driven foam and environmental motion.

## Plan ledger

**Goal:** define one live motion policy that adapts optional presentation without changing authoritative gameplay outcomes or direct controls.

- [x] Inspect menu media-query use and transition CSS.
- [x] Inspect menu shader-time frond, trunk and water motion.
- [x] Inspect game camera intro progression.
- [x] Inspect ocean, foam, world and post-processing updates.
- [x] Separate essential simulation from optional presentation.
- [x] Map command, result and frame acknowledgement surfaces.
- [ ] Implement and test the authority.

## Source-backed behavior

### Menu

```txt
const reducedMotion = matchMedia(...).matches
```

The value is captured once. It is not backed by a `MediaQueryList` change listener, preference revision or product override.

```txt
frond and trunk shader amplitude
  -> multiplied by the frozen reducedMotion boolean

water shader
  -> always reads global shader time

entry handoff
  -> uses 0 ms or 780 ms from the frozen boolean
```

CSS independently disables selected DOM transitions. CSS and JavaScript therefore do not consume one shared policy revision.

### Game

```txt
frame
  -> adventure.tick(dt)
  -> camera descriptor
  -> worldRenderer.update(elapsed)
  -> foamRenderer.update(elapsed)
  -> postPipeline.render()
```

The player domain advances the aerial intro automatically. The ocean material derives wave displacement and normals from shader time. Foam opacity and vertical offset use elapsed-time sine functions. No game-route motion observer or reduced-motion descriptor is installed.

## Main gap

```txt
operating-system preference changes
  -> CSS may update immediately
  -> menu JavaScript retains its startup boolean
  -> game JavaScript has no preference state
  -> menu and game motion can diverge
  -> no policy generation identifies the accepted behavior
  -> no matching reduced-motion frame is acknowledged
```

This is a source-backed policy and evidence gap. It is not a claim that the current experience causes harm or fails a specific accessibility standard.

## Required authority

```txt
cozy-island-motion-preference-live-animation-projection-authority-domain
```

### Admission

```txt
MotionPreferenceAdmissionCommand
  documentRevision
  routeRevision
  observedSystemPreference
  requestedProductOverride
  expectedPolicyRevision
```

### Result

```txt
MotionPreferenceAdmissionResult
  accepted
  source: system | product
  mode: normal | reduced
  policyRevision
  routeRevision
  classificationRevision
```

### Projection

```txt
MotionProjectionCommand
  policyRevision
  frameRevision
  surface: menu | game
  descriptorSet
```

```txt
MotionProjectionResult
  appliedDescriptorIds
  preservedSimulationRevision
  presentedFrameRevision
  reducedMotion
```

### First-frame receipts

```txt
FirstReducedMotionMenuFrameAck
FirstReducedMotionGameplayFrameAck
```

## Motion classification

| Surface | Current behavior | Proposed reduced policy |
|---|---|---|
| Direct player look and movement | Input-driven | Preserve |
| Farming, Foraging, growth and scenario | Authoritative simulation | Preserve |
| Menu palm wind | Continuous shader/compute motion | Freeze or strongly attenuate |
| Menu water | Continuous shader-time displacement | Freeze or replace with static surface |
| Menu/game crossfade | Timed transition | Immediate or near-immediate |
| Aerial intro | Automatic camera rail | Skip to first-person or use one static establishing frame |
| Ocean waves | Continuous shader-time displacement | Low-amplitude slow mode or static normal profile |
| Shoreline foam | Sine opacity and vertical motion | Static placement and opacity |
| Cloud/fog/world wind | Continuous environment motion | Policy-driven static or low-motion descriptor |
| Loading/progress transitions | DOM transitions | Immediate while preserving state changes |

## Domains and services

The active composition remains unchanged: 14 engine-installed kits, 50 cataloged environment/render kits, one ocean composition kit and five browser/product adapters. Their full IDs and service families are recorded in the timestamped tracker and machine registry.

## Validation boundary

This run changes documentation only. It does not alter JavaScript, shaders, CSS, dependencies, tests, workflows or deployment.
