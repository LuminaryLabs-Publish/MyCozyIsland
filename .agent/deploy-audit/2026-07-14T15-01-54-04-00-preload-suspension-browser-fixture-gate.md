# Deploy audit: preload suspension browser fixture gate

**Timestamp:** `2026-07-14T15-01-54-04-00`  
**Status:** `preload-suspension-lease-resume-frame-authority-audited`

## Summary

Current tests prove source shape only. Production readiness requires a real browser to execute the menu iframe, Core Startup, engine suspension, renderer sleep, entry restoration, fallback handling, and first resumed-frame acknowledgement against both source and deployed artifacts.

## Plan ledger

**Goal:** define the executable gate required before suspension and visible-entry claims can be promoted.

- [x] Inspect package test wiring.
- [x] Inspect source smoke coverage.
- [x] Identify browser-only behaviors.
- [x] Define source, built-output and Pages matrices.
- [ ] Implement and execute the fixtures.

## Required source-browser fixture

```txt
open menu.html
wait for current Core Startup playable revision
capture engine and renderer identities
verify one accepted suspension lease
verify hidden engine time stops
verify hidden renderer submissions stop
send correlated entry command
verify exact method/callback restoration
verify one resumed simulation step
verify one resumed game frame
verify frame matches entry/startup revisions
verify parent reveal waits for frame acknowledgement
```

## Fault injection

```txt
engine replaced while suspended
renderer replaced while suspended
animation callback removed or changed
engine resume throws
renderer resume throws
player intro preparation throws
input clear throws
message duplicated
message delayed
message reordered
wrong origin
wrong source
entry timeout
pagehide/BFCache during suspension
```

## Artifact matrix

```txt
source route
locally assembled deployment artifact
GitHub Pages public URL

WebGPU backend
WebGL2 fallback backend

normal motion
reduced motion

DPR 1
DPR 1.5

wide and narrow viewport
```

## Required artifacts

```txt
ModuleGraphManifest
SuspensionLease
PreloadSuspensionResult
GameEntryResult
participant receipts
first resumed tick receipt
FirstResumedGameFrameAck
screenshot or readback artifact
source/build/Pages hashes
workflow run, job and artifact metadata
```

## Current gate status

```txt
source syntax markers: present
real browser suspension: absent
real browser restoration: absent
fault injection: absent
first resumed-frame proof: absent
built-output parity: absent
Pages parity: absent
```

## Validation boundary

No workflow, test, build or deployment file changed. No deploy or Pages smoke was run.
