# Validation: MyCozyIsland Browser Input Ownership Audit

Last updated: `2026-07-12T17-01-09-04-00`

## Summary

This run changes documentation only. It records the current browser input ownership and gesture-admission gaps without changing runtime, gameplay, rendering, dependencies or deployment.

## Change boundary

```txt
runtime source changed: no
input behavior changed: no
player or interaction behavior changed: no
Agriculture or Inventory behavior changed: no
save behavior changed: no
render output changed: no
package scripts changed: no
dependencies changed: no
deployment changed: no
branch created: no
pull request created: no
```

## Plan ledger

**Goal:** state exactly what source was reviewed and avoid claiming executable browser proof that was not run.

- [x] Compare the full accessible Publish inventory.
- [x] Compare central ledger timestamps.
- [x] Select only `MyCozyIsland`.
- [x] Review browser input handlers in `src/main-adventure.js`.
- [x] Review input queue and frame admission in `src/adventure/runtime-domains.js`.
- [x] Review input consumers in player, interaction and camera domains.
- [x] Review active composition in `src/adventure/composition-runtime.js`.
- [x] Preserve the complete kit and service census.
- [x] Add the timestamped input audit family.
- [x] Refresh required root `.agent` files.
- [x] Push only to `main` and create no branch or pull request.
- [ ] Execute browser input fixtures after implementation.

## Source review

```txt
index.html
src/main-adventure.js
src/adventure/composition-runtime.js
src/adventure/runtime-domains.js
package.json
README.md
.agent/kit-registry.json
```

## Source-backed checks

```txt
window keydown and keyup listeners exist
canvas pointerdown, pointermove, pointerup and pointercancel listeners exist
drag stores pointerId
pointermove does not compare event.pointerId with drag.pointerId
pointerup clears drag without a pointerId match
pointerdown has no primary-button or isPrimary check
lostpointercapture handler is absent
input commands use generation 1
input frame processes later commands after clear
duplicate command IDs are not rejected
rejectedCommands is not incremented
player and interaction consume the admitted frame
camera derives from player state
```

## Commands and executable tests

```txt
npm test: not run
browser keyboard smoke: not run
browser pointer smoke: not run
multi-pointer smoke: not run
blur/visibility smoke: not run
WebGPU smoke: not run
WebGL2 smoke: not run
Pages smoke: not run
```

The GitHub connector provided repository reads and writes but no runnable browser checkout. No command success is claimed.

## Missing proof

```txt
focus ownership fixture
editable-control exclusion fixture
primary button and primary pointer fixture
pointer-ID isolation fixture
lost-capture cleanup fixture
clear-generation fence fixture
duplicate-command fixture
input-to-player consumer receipt fixture
input-to-visible-frame acknowledgement fixture
```

## Conclusion

The source proves that normalized input exists, but browser ownership and gesture admission are not authoritative. This audit does not claim focus safety, pointer isolation, stale-command rejection, duplicate suppression, lifecycle fencing or visible-frame provenance is implemented.