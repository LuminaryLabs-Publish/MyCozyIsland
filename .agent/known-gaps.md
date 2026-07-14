# Known gaps: MyCozyIsland dual-surface GPU handoff and retirement

**Timestamp:** `2026-07-13T23-58-48-04-00`  
**Publication status:** `dual-surface-gpu-handoff-retirement-authority-audited`

## Summary

The product now owns two WebGPU-first presentation stacks during preload and entry. Readiness and source markers exist, but the runtime lacks presentation generations, backend/device correlation, typed sleep/resume leases, overlap policy, complete menu retirement receipts and first resumed game-frame proof.

## Plan ledger

**Goal:** keep the open work dependency ordered and separate source facts from unimplemented guarantees.

- [ ] Surface, backend and device/context generations.
- [ ] Menu, sleeping-game and active-game presentation leases.
- [ ] Resource manifests for compute, pipeline, scene, listeners, timers and public capability.
- [ ] Attempt-bound game resume and rollback.
- [ ] First resumed game-frame acknowledgement.
- [ ] Bounded overlap and explicit degraded policy.
- [ ] Complete menu retirement result.
- [ ] Browser WebGPU/WebGL2 fixtures and deployment parity.

## Identity and lease gaps

```txt
MenuSurfaceGeneration: absent
GameSurfaceGeneration: absent
BackendGeneration: absent
DeviceContextGeneration: absent
MenuPresentationLease: absent
SleepingGamePresentationLease: implicit only
ActiveGamePresentationLease: implicit only
PresentationHandoffId: absent
OverlapGeneration: absent
```

## Game resume gaps

```txt
ExpectedReadyRevision: absent
GameResumeAttemptId: absent
simulation freeze receipt: absent
presentation sleep receipt: absent
resume preparation result: absent
player before/after fingerprint: absent
input clear receipt: absent
rollback to sleeping-ready: absent
first resumed game frame: absent
```

The bridge restores engine functions and the animation callback, catches player-preparation errors as warnings and posts entered immediately.

## Overlap gaps

```txt
overlap budget: absent
menu/game active-frame counters: absent
overlap start/end result: absent
GPU time or pressure evidence: absent
entry fallback classification: absent
```

The normal fade keeps the menu active for up to 780 ms after the game resumes. The parent also has a separate 900 ms reveal fallback.

## Menu retirement gaps

```txt
application resource manifest: absent
compute stop receipt: absent
frame stop receipt: absent
scene traversal disposal: absent
geometry/material receipt: absent
wind storage/compute receipt: absent
listener registry and removal: absent
timer registry and cancellation: absent
CozyMenu capability revocation: absent
terminal retirement result: absent
```

`renderPipeline.dispose()` and `renderer.dispose()` exist, but the application does not prove the terminal state of every resource participant.

## Public capability gaps

```txt
CozyMenu exposes raw renderer: yes
CozyMenu exposes raw scene: yes
CozyMenu exposes raw camera: yes
CozyMenu exposes raw palm: yes
retired descriptor: absent
capability generation: absent
revocation result: absent
```

## Browser lifecycle gaps

```txt
resize after retirement fencing: absent
message/keydown/click listener retirement: absent
late timeout fencing: absent
pagehide handoff cancellation: absent
BFCache restoration policy: absent
stale animation callback classification: absent
```

## Validation gaps

```txt
real WebGPU menu fixture: absent
real WebGL2 fallback fixture: absent
two-surface preload fixture: absent
sleep/resume fixture: absent
first resumed frame fixture: absent
overlap-budget fixture: absent
compute-stop fixture: absent
partial-retirement fixture: absent
post-retirement resize fixture: absent
capability-revocation fixture: absent
source/build/Pages parity fixture: absent
```

## Retained protocol gaps

```txt
protocol version and envelopes
inbound event.origin checks
message IDs and sequences
shell, iframe, preload and entry generations
payload schemas and replay suppression
explicit timeout/degraded result
atomic reveal/history/focus commit
```

## Retained architecture gaps

```txt
browser page lifecycle
adaptive render-quality transitions
portable save durability
browser input authority
bounded public runtime capabilities
provider-independent hidden preload
```

## Dependency order

```txt
protocol and presentation generations
  -> resource manifests and leases
  -> game resume preparation
  -> first resumed frame
  -> overlap policy
  -> menu retirement
  -> reveal/history/focus settlement
  -> browser/build/Pages parity
```

## Do not claim

Do not claim complete cleanup, bounded overlap, stale-callback fencing, capability revocation, first-frame entry completion or production readiness until the relevant fixtures pass on `main`.