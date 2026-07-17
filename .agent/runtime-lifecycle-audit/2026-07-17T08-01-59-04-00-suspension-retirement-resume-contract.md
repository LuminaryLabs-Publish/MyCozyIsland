# Runtime lifecycle audit — Suspension, retirement and resume contract

**Timestamp:** `2026-07-17T08-01-59-04-00`  
**Parent authority:** `cozy-island-page-lifecycle-runtime-suspension-retirement-authority-domain`

## State machine

```txt
active
  -> suspending
  -> suspended
  -> resuming
  -> active

active|suspended
  -> retiring
  -> retired
```

`retired` is terminal. A new page/game session must allocate a new host and runtime generation.

## Suspension settlement

A successful `RuntimeSuspensionResult` records:

- accepted lifecycle transition identity;
- stopped renderer-loop generation;
- cleared input generation;
- retained resource manifest and digest;
- last committed simulation/frame identifiers;
- pending or settled save generation;
- reason and timestamp.

## Resume settlement

A successful `RuntimeResumeResult` records:

- exact predecessor suspension;
- retained resource validation;
- fresh clock baseline;
- restored loop/listener generation;
- rejected stale callbacks;
- pending first resumed-frame identity.

The runtime is not visibly converged until `FirstResumedFrameAck`.

## Terminal retirement settlement

A successful `RuntimeRetirementResult` records apply-once disposal of:

- animation loop and callbacks;
- input and browser listeners;
- startup-host listeners;
- world and gameplay objects;
- sky and environment textures;
- atmosphere volume/compute textures;
- cloud and fog resources;
- ocean and foam resources;
- post pipeline and depth scenes;
- renderer and public host publication.

Partial or failed disposal must be retained as diagnostics rather than silently promoted to retired-success.

## Adapter boundary

Browser events remain host adapter facts. The lifecycle domain owns classification and settlement. Gameplay, save and renderer domains participate through typed results and do not independently infer page lifecycle.
