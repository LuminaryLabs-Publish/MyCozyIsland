# Project Breakdown: MyCozyIsland Adaptive Quality Transaction

Timestamp: `2026-07-11T16-10-58-04-00`

## Summary

This documentation-only pass selected `LuminaryLabs-Publish/MyCozyIsland` after comparing the full ten-repository Publish inventory against the central ledger and excluding `TheCavalryOfRome`. Every eligible repository already had root `.agent` coverage; `MyCozyIsland` was the oldest aligned entry.

The audit found that adaptive quality can report level-0 recovery without restoring renderer pixel ratio. It also found frame-count-dependent transition timing, no visibility barrier, no transition revision, sequential partial mutation and no visible-frame acknowledgement.

## Plan ledger

**Goal:** map the complete interaction, domain, kit and service surface and define a reversible adaptive-quality authority contract.

- [x] Compare the full Publish organization inventory with central tracking.
- [x] Exclude Cavalry of Rome.
- [x] Select one repository only.
- [x] Read route startup, render descriptors, performance budget, atmosphere and post renderers.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Inventory all 50 local kits and six imported NexusEngine services.
- [x] Map kit service groups.
- [x] Identify false full recovery and partial-commit risks.
- [x] Define the candidate DSK and fixture gate.
- [x] Refresh required root `.agent` files.
- [x] Add timestamped architecture, render, gameplay, interaction, quality and deploy audits.
- [x] Change no runtime source.
- [x] Push only to `main`.

## Interaction loop

```txt
backend detection
  -> choose startup quality
  -> create render consumers
  -> sample RAF interval each frame
  -> update moving average
  -> count slow/fast frames
  -> degrade or recover numeric level
  -> mutate cloud steps
  -> mutate fog steps
  -> mutate fog resolution
  -> mutate pixel ratio only when level > 0
  -> render
  -> publish periodic diagnostics
```

## Domains

```txt
browser startup and backend admission
runtime session and RAF ownership
render-quality descriptors
frame-time performance budget
adaptive-quality transition authority
cloud/fog/post/pixel-ratio consumers
startup-fixed geometry/shadow/ocean/population quality
Core World and materialization
camera/scenario/input
diagnostics, tests and Pages deployment
```

## Kits

```txt
50 local source-backed kits
7 ordered Core World providers
6 imported NexusEngine construction services
21 candidate adaptive-quality authority/fixture kits
```

The complete inventory is retained in `.agent/current-audit.md` and `.agent/kit-registry.json`.

## Services

```txt
startup quality selection
frame sampling and moving-average FPS estimation
degrade/recover level decisions
cloud and fog raymarch step mutation
fog render-target scale mutation
renderer pixel-ratio mutation
semantic world, atmosphere and scenario composition
Core World focus/provider/materialization services
debug, static validation and Pages deployment
```

## Primary finding

```txt
level 1 -> level 0
  performance level becomes 0
  cloud/fog/fog-resolution return to baseline
  pixel ratio remains degraded
```

## Required parent domain

```txt
cozy-island-adaptive-quality-transaction-authority-domain
```

## Next safe ledge

```txt
MyCozyIsland Adaptive Quality Transaction Authority
+ Cadence Parity / Full Recovery / Partial Failure / Visible-Frame Fixture Gate
```

Implementation remains downstream of startup, runtime-session and committed-frame authority.