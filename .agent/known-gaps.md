# Known gaps: device input action coverage and semantic commands

## Current focus

- [ ] Touch-only movement is not implemented.
- [ ] Touch-only sprint is not implemented.
- [ ] Touch-only contextual interaction is not implemented.
- [ ] Touch-only seed cycling and direct seed selection are not implemented.
- [ ] Intro skip has no direct touch control.
- [ ] Pointer/touch input currently covers camera look only.
- [ ] Visible seed slots are non-button `div` elements.
- [ ] `#bottom-hud` rejects pointer input through `pointer-events:none`.
- [ ] Compact-screen CSS hides the only control legend.
- [ ] `n:cozy-input` interprets gameplay meaning directly from DOM key codes.
- [ ] No source-neutral semantic action command exists.
- [ ] No device capability manifest proves required action coverage before playable entry.
- [ ] No mixed keyboard/touch source arbitration policy exists.
- [ ] No apply-once result prevents duplicate one-shot actions across sources.
- [ ] Touch control removal and layout replacement have no held-action retirement contract.
- [ ] No touch control projection result exists.
- [ ] No input-frame digest binds accepted semantic actions to a visible frame.
- [ ] No `FirstInputActionBoundFrameAck` exists.
- [ ] Node smoke tests cover actions through keyboard commands only.
- [ ] Touch-only browser, artifact, and Pages gameplay fixtures do not exist.

## Implemented input state

- [x] Keyboard movement, sprint, interaction, seed cycling, direct seed selection, and intro skip are implemented.
- [x] Pointer drag camera look is implemented.
- [x] Wheel normalization is implemented.
- [x] Input commands are sequence ordered and frame admitted.
- [x] One-shot keyboard actions reject repeats.
- [x] Held keyboard state clears on blur and hidden visibility.
- [x] The input domain exposes snapshot and reset services.
- [x] Player, interaction, inventory, camera, Agriculture, and Foraging consume the normalized frame.

## Retained unresolved work

The page-lifecycle audit from `2026-07-17T08-01-59-04-00`, save-durability audit from `2026-07-17T03-06-12-04-00`, menu ready-handoff audit from `2026-07-17T01-39-36-04-00`, adaptive-quality audit from `2026-07-16T21-38-30-04-00`, and pointer-look gesture audit from `2026-07-16T18-41-23-04-00` remain unresolved.

## Non-findings

- No desktop keyboard failure was reproduced.
- No touch-user incident was reproduced.
- No semantic input authority or touch UI was implemented.
- No browser or deployment fixture was run.
- No production-readiness claim is made.