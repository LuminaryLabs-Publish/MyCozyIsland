# Known Gaps: MyCozyIsland

Last updated: `2026-07-12T03-39-52-04-00`

## Summary

The visible environment does not have one authoritative time or frame revision. World animation and foam use the scenario clock, ocean/cloud/fog shaders use Three TSL global time, and several environment descriptors remain frozen at startup. Reset restarts only part of the visible environment.

## Clock and frame gaps

```txt
canonical environment clock source: absent
clock source ID: absent
clock revision: absent
environment frame ID: absent
environment frame revision: absent
reset generation: absent
frame fingerprint: absent
bounded environment journal: absent
```

## Dynamic descriptor gaps

```txt
illumination evaluated per frame: no
wind descriptor evaluated per frame: no
vegetation wind updated per frame: no
campfire wind updated per frame: no
cloud weather and lighting updated per frame: no
fog advection updated per frame: no
sky and light state updated from current clock: no
explicit immutable-policy classification: absent
```

## Render consumer gaps

```txt
world and foam use scenario elapsed time: yes
ocean uses renderer-global TSL time: yes
clouds use renderer-global TSL time: yes
fog uses renderer-global TSL time: yes
canonical TSL time uniform: absent
environment render plan: absent
consumer receipts: absent
partial consumer rejection: absent
stale generation rejection: absent
visible environment-frame acknowledgement: absent
```

## Reset gaps

```txt
scenario clock resets to 48 seconds: yes
camera resets: yes
TSL time resets: no
static environment descriptors rebuild: no
ocean phase restarts: no
cloud phase restarts: no
fog phase restarts: no
foam phase restarts: yes
world sway and campfire phase restart: yes
all-consumer reset parity proof: absent
```

## Public readback gaps

```txt
static startup snapshot exposed: yes
dynamic clock exposed separately: yes
environment frame provenance: absent
clock source and revision: absent
reset generation: absent
consumer receipt set: absent
last committed environment frame: absent
visible output acknowledgement: absent
```

## Current test gaps

```txt
deterministic domain construction: present
scenario clock advances: present
CPU versus TSL clock parity fixture: absent
reset phase parity fixture: absent
dynamic descriptor revision fixture: absent
consumer receipt fixture: absent
WebGPU/WebGL2 environment parity fixture: absent
visible environment frame fixture: absent
Pages reset parity smoke: absent
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
adaptive quality transaction
```

## Risk ranking

```txt
P0 reset can restart foam, vegetation and campfire while ocean, clouds and fog continue
P1 one visible frame can combine unrelated scenario and renderer-global times
P1 startup illumination and wind-derived descriptors can become stale against the clock
P1 diagnostics cannot identify which time and descriptor revision produced a frame
P1 no consumer receipt proves all required environment systems committed together
P2 WebGPU and WebGL2 can drift without a shared environment-frame fixture
```

## Non-goals of this documentation run

```txt
no environment implementation changed
no shader time source changed
no reset behavior changed
no render output changed
no package scripts or dependencies changed
no deployment configuration changed
no runtime correctness claim made
```