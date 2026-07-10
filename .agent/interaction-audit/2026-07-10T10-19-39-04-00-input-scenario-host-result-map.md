# Interaction Audit: Input Scenario Host Result Map

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current interaction inputs

```txt
wheel input
pointer drag input
keyboard input
blur clear
resize input
debug toggle / overlay update
```

## Current behavior

Browser input consumers update camera, scenario, and runtime state directly. This is normal for the live route, but it leaves fixtures without accepted/rejected/no-change reason rows.

## Missing result vocabulary

```txt
accepted
rejected_no_active_renderer
rejected_invalid_payload
no_change_duplicate_input
no_change_disabled
clamped_scroll
clamped_pitch
accepted_quality_degraded
accepted_quality_recovered
accepted_resize
accepted_debug_toggle
accepted_blur_clear
```

## Needed next interaction proof

- Wrap wheel, pointer, keyboard, blur, resize, and debug input in additive result rows.
- Preserve current visual behavior.
- Add stable input action frames.
- Add an input result journal exposed through `globalThis.CozyIslandHost`.
- Prove representative accepted, rejected, clamped, and no-change rows in a Node fixture.

## Not next

- camera feel retune
- new controls
- pointer UX rewrite
- route-token churn
