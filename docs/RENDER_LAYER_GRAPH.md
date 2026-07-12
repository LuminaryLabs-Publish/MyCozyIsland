# Cozy Island Render-Layer Graph

## Ownership boundary

Core World owns semantic state and provider lifecycle. Core Graphics owns portable render-pass contracts. The Three.js WebGPU adapter owns actual layer masks, render passes, depth, blending, and GPU submission.

## Semantic terrain providers

```txt
foundation
  cozy-island-terrain-provider
  cozy-seafloor-terrain-provider

classification
  biome-classification-provider
  shoreline-classification-provider
  seafloor-material-provider
```

The island and sea floor are independent terrains. The island includes land plus a six-meter submerged shelf ending near -5 meters. The sea floor remains at least -7 meters at the coast and descends into the ocean basin.

## Render pass order

```txt
00 background
10 opaque-world
20 water-composite
30 atmosphere-composite
40 foam-overlay
90 output-transform
```

Foam is the final authored scene-content pass. Only the technical output transform is allowed after it.

## Depth and blend contracts

| Layer | Depth test | Depth write | Blend |
|---|---:|---:|---|
| Island terrain | yes | yes | none |
| Sea-floor terrain | yes | yes | none |
| Anime water | yes | no | premultiplied alpha |
| Rolling fog | depth sampled | no | atmosphere composite |
| Shoreline foam | yes | no | premultiplied alpha |

## Anime water

The water is one physical mesh. Transmission, depth absorption, Fresnel reflection, clearcoat, specular shine, and wave displacement are shader concerns rather than coplanar overlay meshes. This prevents depth fighting and recursive refraction.

## Foam boundary

Foam renders in a dedicated scene and pass after the atmosphere composite. It does not enter the water refraction source, write depth, publish terrain state, or modify fog density. Distance haze is represented by foam-side transmittance rather than another fog pass after foam.

## Debug surface

`CozyIsland.renderLayerGraph` exposes the validated graph. `CozyIsland.postPipeline.getPassOrder()` returns the renderer order actually used by the host.

## Adapter pass fusion

The portable graph keeps background, opaque world, and water as separate logical contracts. The Three.js adapter fuses those three into one base scene pass so physical transmission can see the opaque scene and standard opaque/transparent sorting remains correct. The remaining physical passes are atmosphere, foam, and output. `getPassOrder()` reports logical order; `getPhysicalPassOrder()` reports the compiled WebGPU pass order.
