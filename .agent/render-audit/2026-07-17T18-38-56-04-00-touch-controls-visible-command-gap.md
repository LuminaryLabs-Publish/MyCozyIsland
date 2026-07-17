# Render Audit — Touch Controls and Visible Command Coverage

**Timestamp:** `2026-07-17T18-38-56-04-00`

## Visible surface

`game.html` declares a responsive viewport and `touch-action:none` on the game canvas. The HUD projects objective, inventory, stamina, interaction prompt, and four seed slots.

## Gap

- The seed slots are `div` elements rather than interactive controls.
- `#bottom-hud` has `pointer-events:none`, so its visible seed slots cannot admit pointer or touch actions.
- No visible movement, sprint, or contextual-interaction controls exist.
- The compact-screen media rule hides `#controls`, removing the only visible control legend on small screens.
- Pointer input on the canvas is consumed as camera-look motion, not as a complete touch gameplay surface.

The rendered interface therefore communicates gameplay state without projecting a complete command surface for touch-only players.

## Required projection contract — proposed

```txt
TouchControlProjectionCommand
  -> bind DeviceProfileId, InputContextId, ControlLayoutRevision,
     safe-area insets, viewport, action availability, and focus state
  -> project movement, look, sprint, interact, cycle/select seed, and intro-skip controls
  -> publish TouchControlProjectionResult

SemanticInputFrameCommitCommand
  -> bind accepted control generation to InputFrameDigest
  -> publish FirstInputActionBoundFrameAck
```

## Render invariants

- Controls do not obscure the center interaction prompt or critical resource HUD.
- Controls remain reachable in portrait, landscape, and safe-area-constrained viewports.
- Visible enabled/disabled state matches action admission.
- Seed selection exposes button semantics, selected state, and accessible labels.
- Control removal retires active touches before the next input frame.
- Rendered control evidence and accepted semantic action evidence share one generation.

## Validation boundary

No UI, CSS, input adapter, or renderer was changed. No touch-layout usability, accessibility conformance, frame convergence, artifact parity, or Pages parity is claimed.