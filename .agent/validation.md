# Validation: MyCozyIsland

Last updated: `2026-07-12T02-10-14-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest fully synchronized eligible central entry
runtime source changed by this pass: no
camera behavior changed by this pass: no
render output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed camera defects from executable proof and define the exact baseline, command, reset, revision, browser, and visible-frame gate.

- [x] Inspect the active route and package version.
- [x] Inspect browser wheel, pointer, keyboard, blur, resize, and RAF adapters.
- [x] Inspect camera baseline construction and interpolation.
- [x] Inspect rail-mode drag mutation.
- [x] Inspect first-person movement and threshold handoff.
- [x] Inspect camera and scenario reset.
- [x] Inspect public camera readback.
- [x] Inspect both existing camera tests.
- [x] Confirm rail positions are mutable point objects.
- [x] Confirm pre-threshold drag mutates every rail point x value.
- [x] Confirm reset does not restore the rail point array.
- [x] Document baseline, command, result, revision, and browser fixture contracts.
- [x] Change documentation only.
- [ ] Implement and run the new executable fixtures.

## Source-backed checks

```txt
package version: 0.4.1
route cache key: foam-depth-camera-1
initial progress: 0.14
first-person threshold: 0.985
rail point count: 8
look-target count: 8
rail drag mutates yaw: yes
rail drag mutates pitch: yes
rail drag mutates railPositions x: yes
rail drag mutates railLooks: no
mutation is cumulative: yes
reset restores progress: yes
reset restores yaw and pitch: yes
reset clears pressed keys: yes
reset restores player position: yes
reset restores railPositions: no
reset returns typed result: no
camera descriptor includes baseline/path/reset revisions: no
```

## Existing test surface

```txt
npm test chain: present
camera-rail-ground-clearance.mjs: present
camera-first-person-contract.mjs: present
static architecture tests: present
world/runtime tests: present
render tests: present
```

## Existing camera tests prove

```txt
sampled rail camera positions remain above terrain
sampled rail look targets remain above terrain
rail FOV remains finite and between 55 and 80
first-person mode uses 80-degree FOV
first-person eye remains two meters above terrain
forward movement updates terrain-relative player height
```

## Existing camera tests do not prove

```txt
authored rail points remain immutable
initial and post-reset descriptors are identical
repeated drag/reset cycles have zero cumulative drift
wheel and drag commands are admitted in order
stale commands cannot mutate a later reset generation
rail-to-first-person transition is exactly once
multi-pointer browser input is isolated
public readback identifies baseline and path revisions
first visible frame after reset uses the restored camera revision
```

## Required fixture matrix

```txt
1. baseline determinism
   same terrain revision produces the same baseline fingerprint

2. baseline immutability
   wheel, drag, key, tick, descriptor and reset do not mutate baseline points

3. reset fidelity
   initial and post-reset descriptor fingerprints match exactly

4. repeated drift
   100 maximum rail drags followed by reset produce zero cumulative displacement

5. transition
   one command owns the rail-to-first-person mode and FOV handoff

6. stale input
   old camera revision and reset-generation commands are rejected

7. multi-pointer
   unrelated pointer events cannot replace or terminate the active drag lease

8. headless/browser parity
   direct commands and browser adapters produce equivalent typed results

9. visible frame
   first frame after reset cites baseline, path, reset, camera and frame revisions

10. deployed route
    Pages reproduces reset fidelity on wheel, mouse, pen and touch-capable paths
```

## Commands not run

```txt
npm test
camera baseline fixture
camera reset-fidelity fixture
repeated drag/reset fixture
stale command fixture
multi-pointer browser fixture
WebGPU browser smoke
WebGL2 browser smoke
Pages camera smoke
```

## Acceptance gate

```txt
one admitted immutable baseline owns one fingerprint
session input never mutates authored baseline points
reset recreates the exact initial descriptor
repeated drag/reset cannot accumulate path drift
one command produces one typed camera transition result
old-generation commands cannot mutate current camera state
browser and headless input share one admission path
public descriptor exposes baseline, path, reset and camera revisions
first visible reset frame cites the committed camera revision
```