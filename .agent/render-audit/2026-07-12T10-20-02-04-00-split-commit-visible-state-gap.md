# Render Audit: Split Transaction and Visible-State Gap

Timestamp: `2026-07-12T10-20-02-04-00`

## Finding

The renderer-neutral frame snapshot reads live inventory, farming, foraging, interaction and camera owners after the engine tick. Those owners do not expose one shared adventure-transaction revision.

A nested product operation can therefore expose intermediate state:

```txt
inventory child operation committed
parent farm/forage operation not recorded yet
plot or node still on predecessor state
render snapshot reads the mixed graph
HUD/world can display the split outcome
```

Examples:

```txt
plant interruption
  -> seed balance decreased
  -> plot still tilled

harvest interruption
  -> crop reward added
  -> plot still ready

forage interruption
  -> coconuts added
  -> node still available
```

The next frame can render those combinations because no transaction barrier or frame admission result rejects them.

## Missing render evidence

```txt
committed adventure transaction revision
participant revision parity
render snapshot transaction identity
split-state rejection
transaction-to-frame correlation
first committed-frame acknowledgement
failed-transaction frame suppression
save/render revision parity
```

## Required render contract

```txt
AdventureTransactionCommitResult
  -> committed participant revisions
  -> transaction render revision
  -> renderer-neutral frame snapshot
  -> physical WebGPU/WebGL2 frame
  -> FirstTransactionFrameAck
```

A failed or rolled-back transaction must not advance the render revision. A frame may cite only a fully committed transaction revision.

## Proof fixtures

- Inject a failure after inventory seed removal and before plot commit.
- Inject a failure after harvest reward and before plot reset.
- Inject a failure after coconut reward and before node depletion.
- Assert that no frame snapshot exposes the partial participant state.
- Assert WebGPU and WebGL2 acknowledge the same committed transaction revision.
- Assert save capture cannot serialize a failed or in-progress revision.

## Current validation

No runtime render behavior changed. No browser or GPU fixture was run. The repository has no executable split-state frame proof.