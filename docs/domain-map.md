# Cozy Island Domain Kit Map

Source route mapped from:

```txt
https://luminarylabs-agents.github.io/NexusEngine-Experiments/experiments/cozy-island/
```

## Domain kits used by Cozy Island

```txt
ocean-island-landform-domain
  needs: island heightfield, masks, shoreline, foam boundary
  local path: src/kits/ocean-island-landform-domain/index.js

island-foliage-domain
  needs: central grove, path network, foliage object graph
  local path: src/kits/island-foliage-domain/index.js

ocean-floor-domain
  needs: noisy sea floor, island underwater mound, reefs, rocks, boulders, coral
  local path: src/kits/ocean-floor-domain/index.js

grass-object-domain
  needs: grass patches, green-mask placement, path/fence clearing avoidance
  local path: src/kits/grass-object-domain/index.js

grass-wind-domain
  needs: shared wind descriptor for grass and smoke
  local path: src/kits/grass-wind-domain/index.js

campfire-object-domain
  needs: campfire object graph, logs, embers, flame, warm light, collision radius
  local path: src/kits/campfire-object-domain/index.js

smoke-particle-domain
  needs: wind-reactive smoke emitter descriptor
  local path: src/kits/smoke-particle-domain/index.js

fenced-clearing-domain
  needs: fence ring, collision boundary, invisible player anchor, grass/tree exclusion zones
  local path: src/kits/fenced-clearing-domain/index.js

mattatz-clouds-domain
  needs: cloud layer descriptors consumed by cached point-cloud renderer
  local path: src/kits/mattatz-clouds-domain/index.js
```

## Standalone app wiring

```txt
index.html
  loads: src/main.js

src/main.js
  imports all local domain kits
  renders terrain / ocean / foliage / grass / fence / campfire / smoke / clouds
  owns Three.js renderer adapter only
```

## Current renderer features

```txt
scroll-driven sky-to-invisible-player-eye camera rail
first-person controls only at final scroll depth
large cached point-cloud clouds
low clouds near island
high clouds overhead
cozy cloud loading bar
no persistent HUD text
```
