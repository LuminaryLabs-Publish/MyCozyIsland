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

## Application shell

```txt
index.html
  redirects to the menu route

menu.html
  owns a lightweight living palm-tree scene
  starts game.html in a hidden same-origin frame
  shows factual Core Startup progress capped at 99%
  enables Play only after the full game presents its first frame

game.html
  owns the complete NexusEngine adventure and renderer
  freezes simulation after background readiness
  resumes the same running game when Play is pressed
  restarts the authored aerial entry before revealing gameplay
```

The Play transition does not navigate away and rebuild the world. The menu reveals the already-running `game.html` frame, then updates browser history to the game route. A direct visit or reload of `game.html` still launches the game normally.

## Runtime architecture

```txt
NexusEngine Realtime Core
├─ Core Startup                         n:core-startup
│  ├─ launch truth
│  ├─ required preparation facts
│  ├─ continuation choice
│  ├─ structured failure
│  └─ first-frame playable readiness
├─ Core Object
├─ Core Transaction Ledger
├─ Cozy World DSK
├─ Cozy Input DSK
├─ Cozy Inventory DSK
├─ Agriculture DSK                      n:production:agriculture
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
Browser startup, menu, preload, and input adapters
        ↓
Canvas menu scene and Three.js WebGPU game presentation
```

There is no `cozy-farming-domain-kit` in the installed composition. `n:production` is a catalog family, not an executable parent kit.

## Startup contract

Core Startup records factual application state:

```txt
NexusEngine available
→ presentation backend ready
→ adventure composition installed
→ new or restored island selected
→ world presentation ready
→ player controls ready
→ first successful frame presented
→ player may enter
```

The loader cannot disappear merely because JavaScript finished or the renderer object exists. The game becomes playable only after one successful presented frame.

MyCozyIsland owns the human-facing copy such as “Growing your island.” Core Startup contains no product strings, splash ordering, tips, or visual layout. The browser adapter renders the descriptor and exposes structured failures and bounded initialization timeouts.

The menu uses the same descriptor but intentionally caps visible progress at `99%`. The final one percent is the player pressing Play and crossing into the already-prepared game.

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

- Inventory coordinates Agriculture `resourceChanges`; full multi-participant atomic settlement remains tracked separately.
- Interaction chooses nearby agriculture or wild-resource targets.
- World provides the shared procedural island and farm layout.
- Save migrates `cozy-island-adventure-save/1` farming state into Agriculture schema v2.
- Render Snapshot publishes Agriculture as the authoritative crop state.
- Startup Host translates Core Startup facts into product copy and DOM presentation.
- Menu Scene presents the lightweight palm-tree view and owns the Play gate.
- Game Preload Bridge freezes and resumes the prepared game without duplicating world construction.

## Pinned reusable sources

```txt
NexusEngine Core Startup
4fac5c2eea315ec6cf439c6a41b8f6ed0faba044

NexusEngine-Kits Agriculture
2218856ccd729744140d153d738ba8db638b3359

NexusEngine-ProtoKits Agriculture proof
91319aa221bb3b69948a6152b74c11d3c7c219bf
```

## Controls

```txt
Menu
  Enter / Space   start after the island is ready

Game
  W A S D         walk
  Shift           sprint
  Drag            look
  E               prepare, plant, water, harvest, or gather
  Q               cycle selected seed
  1–4             select crop seed
  Space/Enter     finish the aerial introduction
  H               diagnostics
```

## Rendering

```txt
menu canvas
→ palm tree, sky, sea, distant island
→ hidden full game preparation
→ seamless reveal

full game
→ background
→ opaque island, sea floor, agriculture, crops, vegetation, props, landmarks
→ transparent anime water
→ rolling depth-aware fog
→ depth-admitted shoreline foam
→ output transform
```

The renderers read descriptors. They do not own Startup, Agriculture, Inventory, or Foraging state.

## Persistence

The active schema is:

```txt
cozy-island-adventure-save/2
```

It stores Agriculture state under `agriculture` and migrates legacy v1 `farming` payloads. The save remains portable and contains no Three.js, DOM, GPU, or browser objects.

Background preload freezes simulation after readiness, so waiting on the menu does not advance the player or generate autosave churn.

## Development

```bash
npm install
npm test
npm run serve
```

Then open:

```txt
http://localhost:8080/            root redirect
http://localhost:8080/menu.html   menu scene
http://localhost:8080/game.html   direct game scene
```

## Debug surface

```js
CozyIsland.getState()
CozyIsland.engine.n.paths()
CozyIsland.startup.getDescriptor()
CozyIsland.startup.getSnapshot()
CozyIsland.engine.n.agriculture.getState()
CozyIsland.engine.n.agriculture.getDescriptors()
CozyIsland.inventory.getState()
CozyIsland.foraging.listNodes()
CozyIsland.captureSave()
```

## Source-of-truth rule

NexusEngine supplies neutral mechanisms. Core Startup owns factual launch readiness. Product sequences and adapters own the waiting experience. The menu owns the Play gate. The official Agriculture DSK owns reusable agricultural meaning. MyCozyIsland supplies tropical content, world configuration, cross-domain settlement, sequences, and presentation.
