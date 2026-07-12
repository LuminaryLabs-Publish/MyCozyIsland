# Known Gaps: MyCozyIsland

Last updated: `2026-07-12T05-00-19-04-00`

## Summary

Adaptive quality has no authoritative active descriptor or transition revision. It samples RAF spacing, accepts transitions after refresh-rate-dependent frame counts, changes only part of the renderer, and does not restore base pixel ratio when recovery reaches level zero.

## Policy and identity gaps

```txt
quality policy ID: absent
fixed versus adaptive mode: absent
base quality revision: absent
active quality descriptor: absent
quality transition ID: absent
quality transition revision: absent
expected predecessor revision: absent
URL override semantics: ambiguous
```

## Measurement gaps

```txt
RAF callback spacing sampled: yes
CPU frame timing identified: no
GPU timing identified: no
presentation latency identified: no
visibility state admitted: no
first-frame/discontinuity rejection: no
sample ID and validity result: absent
time-based observation window: absent
```

## Transition gaps

```txt
degrade threshold: 90 qualifying frames
recover threshold: 360 qualifying frames
refresh-rate-independent dwell: no
transactional consumer plan: absent
partial-application rollback: absent
stale transition rejection: absent
transition reason/result: absent
bounded transition journal: absent
```

## Consumer gaps

```txt
cloud steps adapt: yes
fog steps adapt: yes
fog resolution adapts: yes
DPR degrades above level zero: yes
DPR restores at level zero: no
shadow map adapts: no
volume texture size adapts: no
ocean geometry adapts: no
terrain resolution adapts: no
vegetation density adapts: no
mutable versus immutable classification: absent
consumer receipts: absent
```

## Resize and lifecycle gaps

```txt
resize updates renderer size: yes
resize updates camera aspect: yes
resize re-evaluates base quality: no
resize creates quality revision: no
page visibility suspends samples: no
pagehide disposes domains only: yes
performance budget reset/disposal result: absent
new runtime generation fencing: absent
```

## Diagnostics and frame gaps

```txt
debug base tier: present
debug active level: indirect through FPS only
active DPR: not projected
quality transition revision: absent
transition reason: absent
consumer receipt set: absent
public active-quality descriptor: absent
first visible quality-frame acknowledgement: absent
```

## Test gaps

```txt
performance-budget unit fixture: absent
30/60/120 Hz cadence parity fixture: absent
pixel-ratio recovery fixture: absent
override-policy fixture: absent
hidden-tab sample fixture: absent
resize transaction fixture: absent
partial consumer failure fixture: absent
WebGPU/WebGL2 transition parity fixture: absent
visible quality-frame smoke: absent
```

## Related retained gaps

```txt
browser startup transaction and rollback
runtime session ownership and callback leases
legacy/Core world lifecycle parity
render graph and physical resource binding
foam proxy topology and lifecycle
Core World reset/reprepare
focus transaction authority
materialization generation/readiness
renderer cell commit/disposal
camera rail baseline fidelity
dynamic environment frame coherence
```

## Risk ranking

```txt
P0 recovery to level zero can retain reduced DPR indefinitely
P1 transition dwell changes materially with display refresh rate
P1 hidden-tab or callback discontinuity samples can influence quality
P1 forced quality override has no explicit lock/adaptive contract
P1 diagnostics can label base tier while active renderer settings differ
P1 partial consumer mutation has no rollback or receipt proof
P2 resize does not reconsider capability policy
P2 startup-only quality resources are not explicitly classified
```

## Non-goals of this documentation run

```txt
no quality implementation changed
no renderer settings changed
no tests or package scripts changed
no dependencies changed
no deployment configuration changed
no runtime correctness claim made
```