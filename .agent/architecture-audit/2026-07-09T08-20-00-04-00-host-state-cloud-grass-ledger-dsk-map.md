# Architecture Audit: Host State Cloud/Grass Ledger DSK Map

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Timestamp:** `2026-07-09T08-20-00-04-00`

## Route authority

```txt
index.html
  -> src/main-cloudform.js?v=hero-cloud-4
  -> Three.js CDN
  -> local descriptor kits under src/kits
  -> inline browser consumer
  -> legacy globalThis.CozyIsland
```

## Interaction loop

```txt
load route
  -> create source descriptors
  -> create Three renderer/scene/camera
  -> project descriptors into meshes/point clouds
  -> capture wheel/pointer/keyboard input
  -> update rail or first-person camera
  -> update smoke/flame/cloud drift/sea bob
  -> render frame
  -> expose legacy diagnostic state
```

## Domain decomposition

```txt
static-browser-route-domain
route-token-domain
source-descriptor-domain
island-landform-domain
ocean-floor-domain
foliage-object-graph-domain
fenced-clearing-domain
grass-placement-domain
grass-wind-domain
campfire-object-domain
smoke-particle-domain
mattatz-cloud-source-domain
hero-cloud-geometry-cache-domain
cloud-drift-domain
input-action-domain
movement-policy-domain
camera-rail-domain
render-host-domain
host-state-readback-domain
fixture-validation-domain
central-ledger-sync-domain
```

## Current kits

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

## Services offered by current kits

```txt
landform heightfield and masks
shoreline render contract
ocean floor render contract
foliage graph placement
clearing/fence/campfire collision zones
grass patch placement contract
grass wind descriptor
campfire object graph
smoke particle descriptor
Mattatz-style cloud state/render contract
hero cloud point descriptor/cache shape
```

## Missing proof kits

```txt
RouteTokenReadback
SourceProfile
SourceFingerprint
SceneSourceSnapshot
BrowserInputActionFrame
ActionResult
InputJournal
MovementPolicyResult
CameraRailSnapshot
GrassPlacementSnapshot
GrassInstanceSnapshot
HeroCloudDescriptorSnapshot
HeroCloudCacheSnapshot
CloudDriftResult
RenderHostSnapshot
CozyIslandHostSnapshot
BrowserConsumerFixture
CentralLedgerReadback
```

## Architecture call

Do not split the renderer first. Add source-owned records and fixture rows, then splice the browser route into those records additively.
