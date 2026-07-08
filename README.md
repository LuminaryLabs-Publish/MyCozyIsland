# My Cozy Island

Standalone Nexus-style Cozy Island app.

## App

Open `index.html` through GitHub Pages or any static server.

## Domain kits included

The app vendors the domain kits it needs under `src/kits/` so it does not depend on `NexusEngine-Experiments` or `NexusRealtime-ProtoKits` at runtime.

```txt
ocean-island-landform-domain
island-foliage-domain
ocean-floor-domain
grass-object-domain
grass-wind-domain
campfire-object-domain
smoke-particle-domain
fenced-clearing-domain
mattatz-clouds-domain
cozy-hero-cloud-form-kit
```

## Runtime needs covered

```txt
terrain heightfield
shoreline and foam
ocean floor and reef/rock objects
island foliage placement
grass patch placement
wind descriptor
fenced clearing and invisible player anchor
campfire object graph
wind-reactive smoke particles
cached high-fidelity point-cloud clouds
single readable hero cloud form descriptor
scroll-driven sky-to-first-person camera rail
```

## Cloud kit docs

```txt
docs/cloud-kits.md
```

## Local development

```bash
python3 -m http.server 8080
```

Then open:

```txt
http://localhost:8080/
```
