# My Cozy Island Next Steps

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-09T02-31-41-04-00`

## Next safe ledge

Build a narrowed browser-consumer proof split around the existing route.

```txt
MyCozyIsland Browser Consumer Proof Split + Cloud/Grass Readback Fixture Gate
```

## Preserve first

```txt
preserve index.html
preserve ./src/main-cloudform.js?v=hero-cloud-4
preserve current Three.js CDN import
preserve current visible island, water, path, campfire, smoke, grass, cloud, and camera rail look
preserve current globalThis.CozyIsland compatibility fields
preserve current wheel, pointer, keyboard, and first-person threshold behavior
preserve current clearing and campfire movement constraints
preserve current grass, smoke, water, flame, and cloud drift visuals
```

## Add fixture-readable records around current behavior

```txt
RouteTokenReadback:
  read index route token hero-cloud-4
  prove active script path and token are stable

SourceProfile:
  list all local source-domain kit outputs used by main-cloudform.js
  include landform, floor, foliage, clearing, fire, smoke, grass, wind, cloud, and hero-cloud records

SourceFingerprint:
  hash route token plus normalized source profile facts
  remain stable for the same source inputs

SceneSourceSnapshot:
  capture descriptor counts and identity keys before Three.js consumption

BrowserInputActionFrame:
  normalize wheel, pointer, keyboard, and first-person threshold decisions

ActionResult:
  record accepted/rejected progress, yaw, pitch, and movement effects

MovementPolicyResult:
  replace valid(next) boolean-only proof with accepted/rejected reason rows
  distinguish clearing-boundary rejection from campfire-keepout rejection

CameraRailSnapshot:
  capture rail control points and sampled camera/look vectors at progress 0, middle, threshold, handoff, and first-person eye

GrassPlacementSnapshot:
  capture requestedCount, patchCount, exclusion policy, path clearance, and batchKey distribution

GrassInstanceSnapshot:
  prove grass placement patch count equals WebGL InstancedMesh count
  preserve source patch metadata for batch promotion later

HeroCloudDescriptorSnapshot:
  prove cloud descriptor values from mattatz/cloudform contract

HeroCloudCacheSnapshot:
  prove cloudCache key, point counts, and savedPointClouds records

CloudDriftResult:
  record x/z drift and y bob deltas without WebGL

RenderHostSnapshot:
  record renderer, scene, camera, mesh consumer, point-cloud, and frame counter facts

CozyIslandHostSnapshot:
  expose additive globalThis.CozyIslandHost.getState() without changing globalThis.CozyIsland

BrowserConsumerFixture:
  prove all rows with plain objects before importing them into the visible route
```

## Recommended implementation order

```txt
1. Add pure host-proof source modules under src/host-proof/.
2. Add scripts/my-cozy-island-browser-consumer-fixture.mjs.
3. Prove route/source/fingerprint/scene snapshot rows without DOM or WebGL.
4. Prove input/action/movement rows using plain objects and deterministic inputs.
5. Prove rail, grass, cloud, and render projection rows using snapshot inputs.
6. Add read-only imports to src/main-cloudform.js.
7. Project records beside existing descriptor construction and frame loop.
8. Expose globalThis.CozyIslandHost.getState() additively.
9. Keep globalThis.CozyIsland unchanged.
10. Add npm script only after the fixture script exists.
```

## Target source files

```txt
src/host-proof/route-token-readback.js
src/host-proof/source-profile.js
src/host-proof/source-fingerprint.js
src/host-proof/scene-source-snapshot.js
src/host-proof/browser-input-action-frame.js
src/host-proof/action-result.js
src/host-proof/input-journal.js
src/host-proof/movement-policy-result.js
src/host-proof/camera-rail-snapshot.js
src/host-proof/grass-placement-snapshot.js
src/host-proof/grass-instance-snapshot.js
src/host-proof/hero-cloud-descriptor-snapshot.js
src/host-proof/hero-cloud-cache-snapshot.js
src/host-proof/cloud-drift-result.js
src/host-proof/render-host-snapshot.js
src/host-proof/cozy-island-host-snapshot.js
src/host-proof/browser-consumer-fixture.js
scripts/my-cozy-island-browser-consumer-fixture.mjs
```

## Fixture rows to require

```txt
01_route_token_readback_reads_hero_cloud_4
02_source_profile_lists_all_local_descriptor_kits
03_source_fingerprint_is_stable_for_same_inputs
04_scene_source_snapshot_counts_landform_floor_foliage_grass_clearing_fire_smoke_clouds
05_wheel_action_result_changes_progress_and_clamps
06_pointer_action_result_changes_pre_fp_yaw_or_fp_yaw_pitch
07_keyboard_action_result_rejects_before_first_person_threshold
08_movement_policy_accepts_inside_clearing_outside_campfire
09_movement_policy_rejects_outside_clearing
10_movement_policy_rejects_inside_campfire_keepout
11_camera_rail_snapshot_matches_progress_samples
12_grass_placement_snapshot_reports_patch_and_batch_counts
13_grass_instance_snapshot_matches_patch_count_and_instance_count
14_hero_cloud_descriptor_snapshot_matches_cloud_contract
15_hero_cloud_cache_snapshot_matches_saved_point_clouds
16_cloud_drift_result_records_x_z_y_delta_without_webgl
17_render_host_snapshot_reports_scene_renderer_camera_consumers
18_cozy_island_host_get_state_exposes_all_projection_sections
19_legacy_global_cozy_island_remains_compatible
```

## Stop conditions

```txt
stop before visual changes
stop before shared-kit promotion
stop before renderer extraction
stop before changing route token
stop before removing legacy globals
stop when fixture rows pass and host projection is additive
```

## Do not do next

```txt
do not rewrite the visible island
do not replace the cloud style
do not remove the current static route
do not make new branches
do not work on TheCavalryOfRome
do not expand shared kits before repo-local proof exists
do not optimize grass/cloud rendering before consumer proof rows exist
```
