# Interaction audit — Page lifecycle command/result map

**Timestamp:** `2026-07-17T08-01-59-04-00`

## Event admission

| Browser fact | Required command | Required result |
|---|---|---|
| `visibilitychange` hidden | `PageLifecycleAdmissionCommand` | hidden/suspend/no-op classification |
| `pagehide` with `persisted=true` | `RuntimeSuspensionCommand` | `RuntimeSuspensionResult` |
| `pagehide` with `persisted=false` | `RuntimeRetirementCommand` | `RuntimeRetirementResult` |
| `pageshow` with `persisted=true` | `RuntimeResumeCommand` | `RuntimeResumeResult` |
| first resumed presentation | frame commit | `FirstResumedFrameAck` |

## Required identities

```txt
HostSessionId
RuntimeGeneration
RendererGeneration
SaveGeneration
LifecycleTransitionId
ExpectedPredecessorTransitionId
```

## Input settlement

Suspension and retirement must:

- clear held keys;
- clear queued one-shot commands;
- release pointer capture where owned;
- clear active drag;
- prevent hidden-page pointer/keyboard samples from entering a retired generation.

Resume must not revive predecessor held state.

## Apply-once rules

- Duplicate `pagehide` is retained but not applied twice.
- Terminal retirement dominates later suspension requests.
- A stale `pageshow` cannot revive a retired generation.
- Save settlement and resource retirement share one transition identity but remain separate results.
- First resumed-frame proof must bind the same runtime and renderer generation.
