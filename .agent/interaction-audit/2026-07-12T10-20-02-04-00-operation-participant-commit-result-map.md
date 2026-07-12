# Interaction Audit: Operation, Participant, and Commit Result Map

Timestamp: `2026-07-12T10-20-02-04-00`

## Current command path

```txt
browser E key
  -> cozyInput frame edge
  -> cozyInteraction nearest target
  -> operationId = interaction:<frame-index>:<target-id>
  -> farming.interact or foraging.harvest
  -> nested inventory operations
  -> interaction lastAction projection
```

## Current evidence carried

```txt
input frame index
target ID
actor ID
parent ledger ID
child operation suffixes
product result
```

## Missing command evidence

```txt
runtime session ID
run/generation ID
transaction ID distinct from input-frame ID
participant set
predecessor revisions
candidate revisions
commit barrier ID
commit/rollback result
retry classification
save revision
render revision
visible-frame acknowledgement
```

## Required command/result map

```txt
AdventureActionCommand
  commandId
  sessionId
  generation
  inputRevision
  targetId
  targetRevision
  actorId
  actionKind

AdventureTransactionPlan
  transactionId
  participants
  predecessorRevisions
  mutation candidates
  validation results

AdventureTransactionCommitResult
  status: committed | rejected | rolled-back | indeterminate
  transactionId
  participantReceipts
  ledgerReceipts
  committedRevision
  retryPolicy

FirstTransactionFrameAck
  transactionId
  committedRevision
  frameSequence
  backend
```

## Admission rules

- Reject stale input, target, player, inventory, plot and node revisions.
- One command ID may produce at most one terminal transaction result.
- Browser repeat cannot manufacture a second semantic action.
- Parent and child operation IDs must derive from one transaction ID.
- A failed candidate does not consume the action identity unless policy marks the failure terminal.
- Save and render projection may observe only committed revisions.

## Adapter parity

Future keyboard, controller, touch, editor and automation adapters should submit the same `AdventureActionCommand`. None should call farm, forage or inventory APIs directly.