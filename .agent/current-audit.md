# Current audit: device input action coverage and semantic commands

**Timestamp:** `2026-07-17T18-38-56-04-00`  
**Status:** `device-input-action-coverage-semantic-command-authority-audited`

## Summary

MyCozyIsland was selected through the oldest synchronized documented-selection rule. The current browser adapter provides complete keyboard gameplay controls and touch pointer-drag camera look, but no touch-only movement, sprint, interaction, or seed-selection path.

## Source-backed behavior

```txt
game.html
  -> responsive viewport
  -> #game uses touch-action:none
  -> hotbar uses non-button divs
  -> #bottom-hud uses pointer-events:none
  -> compact-screen CSS hides the control legend

src/main-adventure.js
  -> pointer drag enqueues look deltas
  -> wheel enqueues intro-camera input
  -> keyboard enqueues movement, sprint, interaction, seed, and intro commands
  -> no touch movement/interact/seed controls

n:cozy-input
  -> accepts key, pointer, wheel, and clear command types
  -> interprets gameplay meaning from physical key codes
  -> publishes one normalized frame

tests
  -> domain smoke covers actions through enqueueKey()
  -> no touch-capable browser gameplay fixture
```

## Main gap

The core walk, farm, forage, sprint, and seed-selection loop cannot be completed through touch controls alone. The simulation domains already expose the required gameplay capabilities, but the browser/input boundary has no device capability manifest, source-neutral semantic action command, touch control projection, mixed-source arbitration, or input-frame-to-visible-control proof.

This is an action-coverage and ownership gap, not proof of a desktop input defect or a reproduced mobile incident.

## Required authority — proposed

`cozy-island-device-input-action-coverage-semantic-command-authority-domain`

Required results:

- `InputCapabilityManifestResult`
- `SemanticActionAdmissionResult`
- `TouchControlProjectionResult`
- `InputSourceSettlementResult`
- `InputFrameDigest`
- `FirstInputActionBoundFrameAck`

## Domains and services

The composition contains 14 engine-installed core/adventure kits, 50 cataloged world/render/host kits, one additional composition kit, 16 explicit menu domain/kit surfaces, and four browser/product adapters. Complete IDs and per-kit services are recorded in the timestamped tracker and `.agent/kit-registry.json`.

## Validation boundary

Documentation only. No runtime JavaScript, HTML, CSS, simulation, input, renderer, test, workflow, artifact, or deployment behavior changed.