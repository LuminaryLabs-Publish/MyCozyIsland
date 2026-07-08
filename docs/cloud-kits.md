# Cozy Island Cloud Kit Stack

## Existing Nexus / Realtime cloud kits

```txt
mattatz-clouds-domain
  main cloud suite / composite domain

mattatz-cloud-core-kit
  single cloud primitive descriptor

mattatz-cloud-layer-kit
  low / mid / high cloud layer composition

mattatz-cloud-weather-kit
  presets like clear, scattered, overcast, storm-front, sunrise-haze

mattatz-cumulonimbus-kit
  storm tower / anvil / rain shaft descriptors

mattatz-cloud-lighting-kit
  rim light, silver lining, underside darkness

mattatz-cloud-lod-kit
  near / mid / far cloud LOD policy

mattatz-cloud-render-contract
  renderer handoff for cloud descriptors

mattatz-cloud-horizon-band
  far horizon cloud band descriptor
```

## Cozy Island missing kit added

```txt
cozy-hero-cloud-form-kit
  creates one simple readable puff cloud over the island
  keeps cloud out of the camera corridor
  gives renderer a cached point-cloud puff descriptor
```

## Correct cloud work order

```txt
1. cozy-hero-cloud-form-kit
   get one cloud silhouette right

2. mattatz-cloud-core-kit
   treat that cloud as the primitive descriptor

3. mattatz-cloud-layer-kit
   place it above / near island

4. mattatz-cloud-lighting-kit
   tune soft white top and mild underside shadow

5. mattatz-cloud-lod-kit
   only after shape reads correctly
```
