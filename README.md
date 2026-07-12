# My Cozy Island

**My Cozy Island** is a procedural golden-hour farming and foraging adventure built with NexusEngine Domain Service Kits.

The player can:

```txt
walk across the island beyond the central clearing
prepare and tend twelve procedural farm plots
plant taro, sweet potatoes, pineapple, and coconut palms
water crops and watch visible growth stages
harvest food into a persistent inventory
gather coconuts from procedural palm nodes
explore a dense but friendly tropical forest
save and restore the complete adventure state
```

The visual target remains a warm, highly readable island at golden hour with rolling volumetric clouds, low terrain fog, transparent anime water, shoreline foam, broad beaches, friendly forest density, and a small island home.

## Runtime architecture

```txt
NexusEngine Realtime Core
├─ Core Object Kit
├─ Core Transaction Ledger Kit
├─ Cozy World DSK
├─ Cozy Input DSK
├─ Cozy Scenario DSK
├─ Cozy Inventory DSK
├─ Cozy Farming DSK
├─ Cozy Foraging DSK
├─ Cozy Player DSK
├─ Cozy Interaction DSK
├─ Cozy Camera DSK
├─ Cozy Save DSK
└─ Cozy Render Snapshot DSK
        ↓
Three.js WebGPU presentation adapters
```

The game has **one authoritative seeded island model**. Terrain rendering, player grounding, camera clearance, farm plots, coconut nodes, shoreline data, biome data, and population placement derive from the same model and the same canonical `surfaceAt()` query.

There is no legacy/core dual mode, compatibility render snapshot, background 49-cell materializer, or second copy of the island world in the supported runtime.

## Domain boundaries

### NexusEngine core

- Realtime Core advances deterministic ticks.
- Core Object supplies stable procedural object identity.
- Core Transaction Ledger deduplicates durable operations after retries and save/restore.

### Product Domain Service Kits

- `cozy-world-domain-kit` owns the seeded island model, terrain queries, farm layout, forage layout, landmarks, and static render base.
- `cozy-input-domain-kit` queues raw host input and admits one normalized frame of intent per Realtime Core tick.
- `cozy-player-domain-kit` owns free island walking, terrain grounding, view state, and stamina.
- `cozy-inventory-domain-kit` owns seeds, tools, food, coconuts, and item transactions.
- `cozy-farming-domain-kit` owns tilling, planting, watering, growth, and harvesting.
- `cozy-foraging-domain-kit` owns coconut availability, collection, and deterministic respawn.
- `cozy-interaction-domain-kit` resolves nearby targets and contextual actions.
- `cozy-camera-domain-kit` publishes terrain-safe intro and first-person camera descriptors.
- `cozy-save-domain-kit` captures and validates portable domain snapshots; the browser host owns `localStorage`.
- `cozy-render-snapshot-domain-kit` exposes read-only world, HUD, crop, forage, lighting, and camera descriptors.

## Controls

```txt
W A S D       walk
Shift         sprint
Drag          look around
E             contextual action: till, plant, water, harvest, or gather coconuts
Q             cycle seed selection
1–4           select a seed directly
Space/Enter   finish the aerial introduction
H             toggle NexusEngine diagnostics
```

## Farming loop

A farm plot moves through:

```txt
untilled
→ tilled
→ planted/growing
→ watered growth
→ ready
→ harvested back to tilled
```

Every planting, inventory transfer, harvest, and coconut collection uses a stable operation ID recorded by NexusEngine’s Core Transaction Ledger. Reprocessing an operation cannot duplicate its durable effect.

## Procedural world data

The world seed deterministically produces:

```txt
island height and coastline
biome weights
walkability and slope
separate sea floor
vegetation and friendly forest clearings
rocks and driftwood
twelve farm plots
coconut forage nodes
island landmarks
weather, wind, clouds, fog, waves, and foam descriptors
```

Detailed presentation remains renderer-owned. Domain state and saves contain no Three.js objects, GPU handles, DOM nodes, or browser APIs.

## Rendering

The validated render order remains:

```txt
background
opaque island, sea floor, farm, crops, vegetation, props, and landmarks
transparent anime water
rolling depth-aware fog
opaque-depth-admitted shoreline foam
technical output transform
```

The renderer supports WebGPU first and Three.js WebGL2 fallback. Adaptive quality controls volumetric steps, fog resolution, shadow resolution, and device pixel ratio without changing gameplay state.

## Persistence

The browser host stores `cozy-island-adventure-save/1` snapshots in `localStorage`. The save payload includes portable world identity, scenario time, transaction ledgers, inventory, plots, coconut nodes, and player state plus a deterministic checksum.

## Development

```bash
npm install
npm test
npm run serve
```

Open `http://localhost:8080/`.

## Debug surface

```js
CozyIsland.getState()
CozyIsland.engine.getDomainPaths()
CozyIsland.world.surfaceAt(x, z)
CozyIsland.player.getState()
CozyIsland.inventory.getState()
CozyIsland.farming.listPlots()
CozyIsland.foraging.listNodes()
CozyIsland.captureSave()
CozyIsland.renderPassOrder
CozyIsland.physicalRenderPassOrder
```

## Source-of-truth rule

NexusEngine and the product DSKs own state and gameplay meaning. The browser host adapts input, lifecycle, `localStorage`, and frames. Three.js presents descriptors. No gameplay truth is owned by the renderer.
