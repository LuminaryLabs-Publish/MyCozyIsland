# Project Breakdown Tracker: MyCozyIsland

Timestamp: `2026-07-10T19-11-19-04-00`

## Goal

Document the current runtime architecture and define the smallest source-backed change that gives layered grass a single source-consumption authority, explicit resource ownership, deterministic readback, and a fixture gate without changing visual output.

## Plan ledger

- [x] Enumerate the complete accessible `LuminaryLabs-Publish` repository list.
- [x] Compare the list against `LuminaryLabs-Dev/LuminaryLabs/repo-ledger/LuminaryLabs-Publish/`.
- [x] Confirm all nine eligible non-Cavalry repositories are tracked.
- [x] Confirm the selected repository has root `.agent` state.
- [x] Exclude `TheCavalryOfRome`.
- [x] Select only one repository.
- [x] Apply the oldest documented-selection rule.
- [x] Read the current root `.agent` state.
- [x] Read the active route host and renderer facade.
- [x] Read the layered grass renderer and base world renderer.
- [x] Identify the interaction loop.
- [x] Identify all active domains.
- [x] Identify all services offered by the kits.
- [x] Identify all 50 declared kits.
- [x] Identify runtime-implied adapter kits.
- [x] Identify missing candidate kits.
- [x] Refresh required root `.agent` documents.
- [x] Add timestamped turn, architecture, render, grass, resource-lifecycle, interaction, gameplay, and deploy audits.
- [x] Change no runtime source.
- [x] Create no branch and no pull request.
- [x] Push only to `main`.
- [x] Synchronize the central ledger and internal change log.

## Selection

```txt
selected: LuminaryLabs-Publish/MyCozyIsland
reason: oldest eligible documented fallback
excluded: LuminaryLabs-Publish/TheCavalryOfRome
other Publish repos changed: none
```

## Interaction loop

```txt
static route
  -> catalog validation
  -> WebGPU/WebGL2 initialization
  -> deterministic world snapshot
  -> camera/scenario creation
  -> layered world renderer
     -> base world without legacy grass
     -> layered grass from original grass rows
  -> ocean/foam/cloud/fog/post consumers
  -> browser input
  -> scenario and camera tick
  -> world/foam update
  -> performance sample
  -> post render
  -> aggregate diagnostics
```

## Domain groups

```txt
shell and host
catalog and capability validation
determinism and environment
terrain and shoreline
ocean and underwater
vegetation, grass, rocks, props, and campfire
cloud, fog, and aerial perspective
render descriptions and immutable snapshot
camera, movement, and scenario
world, ocean, foam, cloud, fog, and post consumers
performance and adaptive quality
input, resize, loop, and diagnostics
validation
planned grass consumer and resource lifecycle proof
```

## Main finding

The wrapper establishes visual ownership by suppressing legacy grass and adding a new grass group, but it does not establish contractual ownership. The atlas texture is created inside the material factory, the outer renderer discards the inner renderer handle, and neither the inner nor outer renderer exposes disposal or state readback.

## Next safe ledge

```txt
MyCozyIsland Layered Grass Consumer Ledger + Resource Ownership Fixture Gate
```

## Completion state

```txt
runtime source changed: no
branch created: no
pull request created: no
npm test: not run
browser smoke: not run
WebGPU validation: not run
documentation pushed to main: yes
central synchronization: yes
```