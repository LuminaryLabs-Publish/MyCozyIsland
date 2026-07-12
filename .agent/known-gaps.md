# Known Gaps: MyCozyIsland

Last updated: `2026-07-12T02-10-14-04-00`

## Summary

The camera rail has no immutable baseline authority. Rail-mode drag mutates authored path points in place, reset does not restore them, and camera descriptors cannot prove which baseline, path revision, reset generation, or input result produced the visible frame.

## Camera baseline gaps

```txt
immutable rail baseline: absent
baseline ID and version: absent
baseline fingerprint: absent
terrain revision binding: absent
path revision: absent
separate mutable session path: absent
in-place authored point mutation: present
reset restores authored points: no
reset descriptor fidelity proof: absent
```

## Camera input gaps

```txt
input command envelope: absent
command ID and sequence: absent
session/runtime generation admission: absent
expected camera revision: absent
pointer drag lease: absent
multi-pointer isolation: absent
wheel result: absent
drag result: absent
key result: absent
clear result: absent
stale command rejection: absent
duplicate classification: absent
bounded input journal: absent
```

## Camera transition and reset gaps

```txt
rail-to-first-person transition result: absent
mode transition revision: absent
reset command: absent
reset result: absent
reset generation: absent
baseline reconstruction: absent
rollback on invalid candidate: absent
first visible reset-frame acknowledgement: absent
```

## Descriptor and public readback gaps

```txt
camera state revision: absent
rail baseline ID: absent
rail baseline fingerprint: absent
rail path revision: absent
terrain revision: absent
reset generation: absent
last command ID: absent
last transition result: absent
committed frame ID: absent
raw scenario and world runtime exposed: yes
```

## Current test gaps

```txt
ground-clearance test: present
first-person eye/FOV test: present
initial versus post-reset descriptor fixture: absent
repeated drag/reset drift fixture: absent
baseline immutability fixture: absent
threshold transition fixture: absent
stale command fixture: absent
multi-pointer browser fixture: absent
visible reset-frame fixture: absent
Pages camera smoke: absent
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
dynamic environment frame coherence
adaptive quality transaction
```

## Risk ranking

```txt
P0 reset can report baseline progress while retaining a mutated rail path
P1 repeated drag/reset cycles can accumulate unbounded path displacement
P1 authored data and session input state share mutable objects
P1 browser inputs mutate camera state without command admission or typed results
P1 no visible-frame proof correlates reset with rendered camera state
P2 multi-pointer events can overwrite or clear the shared drag state
P2 diagnostics cannot identify baseline, path, reset, command, or frame revisions
```

## Non-goals of this documentation run

```txt
no camera implementation changed
no browser event handling changed
no render output changed
no package scripts or dependencies changed
no deployment configuration changed
no runtime correctness claim made
```