# Validation: MyCozyIsland

Last updated: `2026-07-11T16-10-58-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: oldest eligible aligned repository after full Publish/ledger comparison
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Plan ledger

**Goal:** distinguish source-backed findings from executable proof and define the exact fixture gate required before claiming adaptive-quality correctness.

- [x] Inspect startup quality selection.
- [x] Inspect performance-budget sampling and thresholds.
- [x] Inspect all degrade/recover callback consumers.
- [x] Inspect cloud/fog step mutation and post fog-resolution mutation.
- [x] Confirm pixel ratio is skipped on level-0 recovery.
- [x] Document transaction, rollback, cadence and visible-frame gaps.
- [x] Change documentation only.
- [ ] Add and run adaptive-quality behavioral fixtures.
- [ ] Run browser and deployed Pages quality smokes.

## Source-backed checks

```txt
startup quality descriptor is immutable: yes
performance level range is 0..2: yes
slow threshold uses movingAverage > target * 1.26: yes
fast threshold uses movingAverage < target * 0.86: yes
degrade threshold counts 90 qualifying frames: yes
recovery threshold counts 360 qualifying frames: yes
cloud steps are mutated: yes
fog steps are mutated: yes
fog render-target scale is mutated: yes
pixel ratio is mutated at levels 1 and 2: yes
pixel ratio is explicitly restored at level 0: no
transition ID/revision exists: no
consumer result/rollback exists: no
visible-frame acknowledgement exists: no
```

## Existing validation surface

```txt
static architecture checks: present
semantic domain tests: present
Core World/provider tests: present
materialization utility tests: present
renderer cache/disposal utility tests: present
adaptive performance budget unit fixture: not confirmed
browser quality transition fixture: absent
full recovery fixture: absent
partial failure rollback fixture: absent
visible-frame quality fixture: absent
Pages adaptive-quality smoke: absent
```

## Required fixture matrix

```txt
1. cadence parity
   equivalent wall-time streams at 30, 60 and 120 Hz

2. baseline recovery
   level 0 -> 1 -> 0 restores cloud, fog, fog-resolution and pixel ratio

3. two-level recovery
   level 0 -> 1 -> 2 -> 1 -> 0 restores all mutable baseline fields

4. partial failure
   inject failure at each consumer and prove reverse rollback

5. visibility and stalls
   hidden-tab and long-stall samples follow a typed policy

6. resize
   degraded and recovering pixel-ratio policy survives viewport resize

7. stale revision
   delayed old transition result cannot overwrite the new revision

8. visible frame
   first frame after commit carries the committed quality revision and fingerprint

9. backend capability
   WebGPU and WebGL2 declare supported mutable fields explicitly

10. deployment
   Pages smoke records transitions, applied values, console failures and frame receipt
```

## Commands not run

```txt
npm test
browser/WebGPU smoke
browser/WebGL2 smoke
Playwright or equivalent browser fixture
Pages live smoke
GPU capture or frame timing capture
```

## Reason executable validation was not claimed

This run used repository-source inspection and documentation writes. No local browser/GPU execution surface was available through the GitHub connector, and the required adaptive-quality fixtures do not yet exist in the repository.

## Acceptance gate

```txt
performance level equals the complete applied consumer state
level 0 restores every mutable baseline value
transition timing is cadence-independent by declared policy
hidden/stalled samples are classified
partial failure leaves no committed partial quality state
stale transitions cannot commit
first visible frame acknowledges the new quality revision
diagnostics report actual applied values
```
