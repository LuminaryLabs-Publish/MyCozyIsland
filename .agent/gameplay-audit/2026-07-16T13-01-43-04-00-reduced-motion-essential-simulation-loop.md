# Gameplay audit: reduced motion and essential simulation loop

## Plan ledger

**Goal:** reduce optional presentation while preserving deterministic adventure outcomes.

- [x] Identify authoritative systems.
- [x] Identify automatic presentation motion.
- [x] Define parity expectations.
- [ ] Execute normal/reduced parity fixtures.

## Preserve

```txt
input command admission
player movement and grounding
stamina use and recovery
scenario time
Agriculture growth and settlement
Foraging respawn and harvest
Inventory transactions
interaction targeting and results
save capture and restore
```

## Adapt

```txt
automatic aerial camera rail
menu palm and water motion
menu/game transition duration
ocean displacement speed and amplitude
foam opacity and vertical oscillation
cloud, fog and world-wind presentation
nonessential loading and HUD transitions
```

## Proposed reduced loop

```txt
accepted reduced policy
  -> authoritative tick remains unchanged
  -> intro resolves to first-person or a static establishing frame
  -> render snapshot carries policy revision
  -> presentation adapters apply reduced descriptors
  -> gameplay result revisions equal normal-mode fixtures
  -> reduced frame acknowledgement is published
```

## Parity fixture

For the same seed and accepted input sequence, normal and reduced modes must produce equal player, Inventory, Agriculture, Foraging, scenario, interaction and save snapshots. Only presentation descriptors and frame receipts may differ.
