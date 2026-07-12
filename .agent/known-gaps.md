# Known Gaps: MyCozyIsland Browser Input Ownership

Last updated: `2026-07-12T17-01-09-04-00`

## Summary

Browser events are normalized before gameplay consumption, but event ownership, focus, pointer gesture identity, generation fencing and visible-frame proof are incomplete.

## Critical

1. **Keyboard input is globally admitted:** window listeners enqueue gameplay commands even when the canvas does not own focus.
2. **Pointer identity is not enforced:** drag state stores a pointer ID, but move and release handlers do not require a match.
3. **Primary-input policy is absent:** secondary mouse buttons and additional touch pointers can start or disturb look gestures.
4. **Input generation never changes:** every command is labeled generation `1`, so lifecycle boundaries cannot reject stale commands.
5. **Clear is not a generation fence:** commands later in the same queue can reactivate input after blur or visibility loss.
6. **Duplicate command IDs are accepted:** no idempotency or duplicate-result contract protects one-shot actions.

## Major

7. `lostpointercapture` has no explicit cleanup or result.
8. `rejectedCommands` exists but is not incremented for ignored or malformed commands.
9. The browser command envelope lacks surface, focus, pointer, gesture and event-time identity.
10. `KeyH` mutates debug state outside the DSK command/result path.
11. Wheel input has no focus generation or gesture ownership.
12. The input frame has accepted IDs but no typed per-command admission results.
13. Player, interaction and camera publish no input-consumption receipts.
14. Renderer-neutral frames contain no input session or generation provenance.
15. No first-visible-frame acknowledgement proves which input frame became visible.

## Proof gaps

```txt
real keyboard focus fixture: absent
editable-control exclusion fixture: absent
primary-button fixture: absent
multi-pointer isolation fixture: absent
lost-pointer-capture fixture: absent
blur/visibility generation fence fixture: absent
duplicate command fixture: absent
WebGPU browser input smoke: not run
WebGL2 browser input smoke: not run
GitHub Pages input smoke: not run
```

## Retained upstream gaps

The Agriculture recovery, browser save durability and adaptive-quality findings remain valid. This audit does not supersede those records.