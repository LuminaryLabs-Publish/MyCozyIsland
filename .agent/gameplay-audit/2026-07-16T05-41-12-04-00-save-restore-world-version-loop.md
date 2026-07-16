# Gameplay audit: save restore and world-version loop

**Timestamp:** `2026-07-16T05-41-12-04-00`

## Summary

Gameplay restore accepts checksum-valid v2 state into the current adventure without proving that the saved world topology and content rules remain compatible with current movement, targeting, Agriculture and Foraging.

## Plan ledger

**Goal:** make restore an explicit gameplay admission rather than an unconditional participant load.

- [x] Trace boot-to-restore gameplay flow.
- [x] Trace world, Agriculture and Foraging topology ownership.
- [x] Trace player position, targeting and render-snapshot adoption.
- [x] Identify migration and fallback result classes.
- [ ] Add changed-world and changed-content fixtures.

## Current loop

```txt
create current island
  -> install current Agriculture plots and Foraging nodes
  -> read save
  -> checksum and schema validation
  -> load participant snapshots
  -> reset interaction
  -> start at restored player position
  -> current surface queries constrain movement
  -> current model descriptors drive targeting and rendering
```

## Missing gameplay decisions

```txt
Is the saved player position valid in the current terrain?
Do saved plot IDs and crop instances exist in the current farm layout?
Do saved forage node IDs map to current procedural palms?
Do saved items and crops still exist with compatible meaning?
Are saved transaction records valid for the installed domain versions?
Should the world be rebuilt, migrated, quarantined or replaced?
```

No typed result currently answers those questions before play resumes.

## Required loop

```txt
save discovered
  -> compatibility admission
  -> exact restore, migration, rebuild, quarantine or new-island fallback
  -> participant topology validation
  -> player-position validation and safe relocation if authored
  -> interaction target reset
  -> first matching restored frame
  -> playable restore acknowledgement
```

This audit does not prescribe a balance or content migration. It requires explicit policy and evidence before restored gameplay is called coherent.