# Deploy Audit — Mobile Input Browser Fixture Gate

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Existing validation

`npm test` runs menu-shell, startup-domain, and adventure-domain Node smoke tests. The adventure smoke invokes `cozyInput.enqueueKey()` to exercise intro, interaction, Agriculture, Foraging, seed selection, save, and migration behavior.

No declared fixture opens the production page with a touch-capable browser profile or proves the core gameplay loop without keyboard input.

## Required release evidence — proposed

### Source fixture

- Verify a semantic action API exists independently of DOM key codes.
- Verify all required gameplay actions are mapped for keyboard and touch profiles.
- Verify hotbar controls use interactive semantics and are not blocked by `pointer-events:none`.

### Browser fixture

- Launch production `game.html` with touch enabled and no hardware keyboard.
- Complete intro entry.
- Move to a plot.
- Select a seed.
- Till, plant, water, and harvest.
- Move to a forage node and gather coconuts.
- Exercise sprint or verify its explicit degraded classification.
- Cancel active touches and confirm no stuck movement, sprint, or look state.
- Mix keyboard and touch and confirm one-shot actions settle once.

### Artifact and Pages fixture

- Repeat the touch-only loop against the static deployment artifact.
- Repeat against the published Pages origin.
- Capture `InputCapabilityManifestResult`, semantic action results, input-frame digest, and `FirstInputActionBoundFrameAck`.

## Gate policy

The repository may claim desktop keyboard playability from current evidence. It must not claim touch-complete or mobile-complete gameplay until browser, artifact, and Pages fixtures prove every required action path.

## Current run

Documentation only. No tests, package scripts, workflow, artifact, or deployment behavior changed or ran.