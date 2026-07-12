# My Cozy Island

**My Cozy Island** is a procedural golden-hour agriculture and wild-resource adventure built from NexusEngine Domain Service Kits.

## Current loop

```txt
walk the island
→ prepare tropical soil
→ plant taro, sweet potato, pineapple, or coconut palms
→ water and grow crops
→ harvest food through repeat-safe transactions
→ gather wild coconuts from forest palms
→ save and restore the complete adventure
```

Planted coconut palms are perennial Agriculture crops. Wild coconut palms remain Foraging resources.

## Runtime architecture

```txt
NexusEngine Realtime Core
├─ Core Object
├─ Core Transaction Ledger
├─ Cozy World DSK
├─ Cozy Input DSK
├─ Cozy Inventory DSK
├─ Agriculture DSK                 n:production:agriculture
│  ├─ land service
│  ├─ soil service
│  ├─ cultivation service
│  ├─ water service
│  ├─ growth service
│  ├─ harvest service
│  └─ perennial service
├─ Cozy Wild Foraging DSK
├─ Cozy Player DSK
├─ Cozy Scenario DSK
├─ Cozy Interaction DSK
├─ Cozy Camera DSK
├─ Cozy Save DSK
└─ Cozy Render Snapshot DSK
        ↓
Three.js WebGPU presentation adapters
```

There is no `cozy-farming-domain-kit` in the installed composition. `n:production` is a catalog family, not an executable parent kit.

## Ownership

### Agriculture

Owns:

- agricultural plots and field state
- tropical soil preparation, moisture, and fertility
- cultivated crop instances
- watering and growth
- annual harvests
- perennial coconut regrowth
- agriculture snapshots and descriptors

Does not own:

- inventory balances
- wild forage nodes
- weather generation
- calendar generation
- renderer objects
- storage transport

### MyCozyIsland product services

- Inventory settles Agriculture `resourceChanges` atomically.
- Interaction chooses nearby agriculture or wild-resource targets.
- World provides the shared procedural island and farm layout.
- Save migrates `cozy-island-adventure-save/1` farming state into Agriculture schema v2.
- Render Snapshot publishes Agriculture as the authoritative crop state.

## Pinned reusable sources

```txt
NexusEngine
c5548de504072bf09eb68986b98aca0292903803

NexusEngine-Kits Agriculture
2218856ccd729744140d153d738ba8db638b3359

NexusEngine-ProtoKits Agriculture proof
91319aa221bb3b69948a6152b74c11d3c7c219bf
```

## Controls

```txt
W A S D       walk
Shift         sprint
Drag          look
E             prepare, plant, water, harvest, or gather
Q             cycle selected seed
1–4           select crop seed
Space/Enter   finish the aerial introduction
H             diagnostics
```

## Rendering

```txt
background
→ opaque island, sea floor, agriculture, crops, vegetation, props, landmarks
→ transparent anime water
→ rolling depth-aware fog
→ depth-admitted shoreline foam
→ output transform
```

The renderer reads descriptors. It does not own Agriculture, Inventory, or Foraging state.

## Persistence

The active schema is:

```txt
cozy-island-adventure-save/2
```

It stores Agriculture state under `agriculture` and migrates legacy v1 `farming` payloads. The save remains portable and contains no Three.js, DOM, GPU, or browser objects.

## Development

```bash
npm install
npm test
npm run serve
```

Then open `http://localhost:8080/`.

## Debug surface

```js
CozyIsland.getState()
CozyIsland.engine.n.paths()
CozyIsland.engine.n.agriculture.getState()
CozyIsland.engine.n.agriculture.getDescriptors()
CozyIsland.inventory.getState()
CozyIsland.foraging.listNodes()
CozyIsland.captureSave()
```

## Source-of-truth rule

NexusEngine supplies neutral mechanisms. The official Agriculture DSK owns reusable agricultural meaning. MyCozyIsland supplies tropical content, world configuration, cross-domain settlement, sequences, and presentation.
