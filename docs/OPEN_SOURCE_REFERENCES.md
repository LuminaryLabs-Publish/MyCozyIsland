# Open-Source References

The rebuild was designed after reviewing upstream implementations. No third-party project was copied wholesale; the application uses its own NexusEngine domain contracts and scene composition.

## NexusEngine Core World and Core Graphics

Repository: `LuminaryLabs-Dev/NexusEngine`  
Pinned commit: `481cbf6df742e81279bd42245c4238c6a1fc69f2`

Imported browser capabilities:

- `createEngine`
- `createCoreWorldDomain`
- `createUniformGridPartition`
- `createFlatWorldSurface`
- `defineWorldEffectProvider`

The same pinned NexusEngine commit contains the renderer-agnostic Core Graphics `render-layer-graph-kit`, pass contracts, dependency ordering, resource-flow validation, transparent-depth policy, and final scene-content boundary used as the reusable engine contract for this application-specific composition.

Core World coordinates portable world identity, cells, focus, provider phases, lifecycle, and snapshots. MyCozyIsland retains ownership of terrain generation, island/sea-floor classification, population data, Three.js objects, GPU buffers, and renderer-adapter effects.

The browser imports the pinned `src/engine.js` and `src/core-domains/core-world-domain/index.js` entry points directly. It intentionally avoids the broad root index because that surface also exports Node-only headless-editor modules.

## Three.js

Repository: `mrdoob/three.js`  
License: MIT, copyright the Three.js authors.

Reviewed implementation areas:

- `examples/webgpu_volume_cloud.html`: bounded volume raymarching and early termination.
- `examples/webgpu_compute_texture_3d.html`: storage 3D textures and compute dispatch.
- `examples/webgpu_volume_lighting.html`: depth-aware reduced-resolution volumetrics and denoising.
- `examples/webgpu_compute_water.html`: TSL displacement and normal reconstruction.
- `examples/jsm/tsl/utils/Raymarching.js`: bounded box traversal.

The runtime pins Three.js `0.185.0` through the browser import map.

## Sebastian Lague — Clouds

Repository: `SebLague/Clouds`  
License: MIT, copyright Sebastian Lague.

Reviewed as a conceptual reference for readable raymarched cloud volumes and the separation between large-scale cloud shape and density detail. The production implementation here is written in Three.js TSL/WebGPU and follows the project’s own cloud-domain descriptors.

## Attribution rule

The application retains this reference record and the upstream license information. Three.js and NexusEngine remain external pinned dependencies; their source files are not vendored into this repository.
