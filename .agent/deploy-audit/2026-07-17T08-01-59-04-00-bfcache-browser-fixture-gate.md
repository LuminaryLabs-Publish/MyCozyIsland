# Deploy audit — BFCache browser fixture gate

**Timestamp:** `2026-07-17T08-01-59-04-00`

## Required source fixture

- Verify one stored lifecycle listener set.
- Verify `pagehide.persisted` classification.
- Verify suspension does not destructively dispose retained gameplay presentation.
- Verify terminal retirement does dispose every owned resource.
- Verify stale callbacks are rejected.

## Required browser matrix

```txt
Chromium WebGPU
Chromium WebGL2 fallback
Firefox WebGL2 where supported
Safari/WebKit lifecycle observation where available
```

For each:

1. Start from menu.
2. Enter the game.
3. Hold movement, begin pointer drag and mutate save state.
4. Navigate away through a BFCache-eligible route.
5. Navigate back.
6. Verify input is neutral, clock is rebased and gameplay presentation is intact.
7. Capture `FirstResumedFrameAck`.
8. Repeat at least three times.
9. Perform terminal reload/close navigation.
10. Verify one retirement result and bounded resource/listener counts.

## Artifact and Pages gate

The same lifecycle result schema, first-frame identifiers and resource-count expectations must pass from source, packaged static artifact and GitHub Pages origin. Configuration alone is not proof.

## Current status

No browser lifecycle, artifact or Pages fixture was executed in this documentation run.
