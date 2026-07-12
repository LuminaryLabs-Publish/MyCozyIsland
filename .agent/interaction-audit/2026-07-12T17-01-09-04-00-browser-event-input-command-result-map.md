# Interaction Audit: Browser Event to Input Command Result Map

Timestamp: `2026-07-12T17-01-09-04-00`

## Summary

The current route has browser events and normalized commands, but no typed result between them. This map defines the required evidence and result for each input source.

## Plan ledger

**Goal:** make every browser input event produce one accepted, rejected, duplicate, stale or cancelled result before gameplay consumption.

- [x] Map keyboard, pointer, wheel and clear sources.
- [x] Map current payloads and missing evidence.
- [x] Define command and result contracts.
- [ ] Implement the mapped results.

## Current map

| Browser source | Current command | Missing admission evidence |
|---|---|---|
| `keydown` | `{type:key, code, down:true, repeat}` | surface, focus, editable target, command result |
| `keyup` | `{type:key, code, down:false}` | surface, focus generation, stale-release policy |
| `pointerdown` | host drag only | primary pointer/button, gesture ID, capture result |
| `pointermove` | `{type:pointer, deltaX, deltaY}` | matching pointer ID, gesture ID, capture generation |
| `pointerup` | host drag clear only | matching gesture and terminal result |
| `pointercancel` | host drag clear only | gesture identity and cancellation result |
| `wheel` | `{type:wheel, deltaY, deltaMode, pageSize}` | focus generation and surface revision |
| `blur` | `{type:clear, reason}` | closed generation and released-state receipt |
| `visibilitychange` | `{type:clear, reason}` | lifecycle generation and stale queue rejection |

## Required command result states

```txt
accepted
rejected-unfocused
rejected-wrong-surface
rejected-editable-target
rejected-secondary-pointer
rejected-secondary-button
rejected-pointer-mismatch
rejected-capture-lost
rejected-stale-generation
duplicate
cancelled
cleared
```

## Required zero-mutation rule

Every non-accepted result must leave held keys, one-shot actions, player position, player view, Inventory selection, Agriculture/Foraging state and camera descriptor unchanged by that command.

## Required correlation

```txt
browser sample ID
-> input command ID
-> InputAdmissionResult
-> InputFrame index/revision
-> consumer receipts
-> visible frame ID
```

## Validation boundary

No interaction or input implementation changed. No event-dispatch fixture was run.