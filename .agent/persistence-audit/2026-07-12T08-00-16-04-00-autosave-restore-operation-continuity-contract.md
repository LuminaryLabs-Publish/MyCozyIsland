# Persistence Audit: Autosave, Restore and Operation Continuity Contract

Timestamp: `2026-07-12T08:00:16-04:00`

## Durable projection

Persist only values required to continue the game:

```txt
schema/version/content fingerprint
runtime or save generation
scenario time and objective revision
inventory items and selected seed
farm plot lifecycle
forage node availability and respawn
player position/view/mode/stamina
transaction continuity state
input operation generation/sequence
world seed and compatible content version
```

Static render graphs and regenerated world descriptors should be referenced by seed/version unless portability requires embedding them.

## Semantic dirty policy

Dirty state changes only after committed durable mutations:

```txt
movement beyond configured save threshold
mode transition
inventory adjustment
seed selection
farm transition or growth checkpoint
forage collection or respawn checkpoint
scenario checkpoint
```

Per-frame presentation and resource revision counters must not force writes.

## Adapter truth

```txt
captured != stored

stored requires:
  adapter capability
  successful serialization
  physical write receipt
  matching slot revision
  committed save result
```

## Atomic restore

Preferred approach: build a replacement engine graph, restore every domain, validate invariants, then transfer authority. Minimum fallback: capture a complete predecessor rollback snapshot before mutating any live owner.

## Continuity

Operation IDs must include a persisted or newly allocated runtime generation and monotonic command sequence. Frame index alone is not durable identity.

## Fixtures

- idle 60-second no-write
- one mutation one write
- quota/private-mode failure
- corrupt checksum
- unsupported schema
- late-domain restore throw with rollback
- repeated restore idempotence
- transaction/input collision after reload
- reset input retirement
- first restored visible frame
