# Validation: MyCozyIsland

Last updated: `2026-07-11T08-41-02-04-00`

## Documentation pass result

```txt
selected repository: LuminaryLabs-Publish/MyCozyIsland
selection reason: next stable oldest eligible repository after active same-minute writes were detected on IntoTheMeadow
runtime source changed by this pass: no
rendering output changed by this pass: no
package scripts changed by this pass: no
dependencies changed by this pass: no
deployment configuration changed by this pass: no
branch created: no
pull request created: no
repo-local documentation pushed to main: yes
```

## Selection verification

```txt
accessible Publish repositories: 10
eligible non-Cavalry repositories: 9
new or ledger-missing eligible repositories: 0
root-.agent-missing eligible repositories: 0
nominal oldest entry: IntoTheMeadow
active same-minute documentation writes on nominal oldest: yes
selected stable repository: MyCozyIsland
excluded: TheCavalryOfRome
```

## Source identity verified

```txt
route: src/main-cloudform.js?v=core-world-1
Three.js: 0.185.0
NexusEngine: 38229f59c22cb40024ffd13a9f48040de759f5d7
world default: core
world rollback: ?world=legacy
world id: world:cozy-island-webgpu-v3
initial active cells: 49
local kit descriptors: 50
Core World providers: 7
```

## Focus facts verified from source

```txt
prepare sets prepared before commitFocus: yes
commitFocus mutates wrapper lastFocus before setFocus/updateWorld complete: yes
production setFocus commits independently: yes
production updateWorld commits cells separately: yes
wrapper checkpoint before focus: absent
provider-store checkpoint before focus: absent
wrapper rollback after focus failure: absent
provider-store rollback result exposed: absent
world revision exposed: absent
provider revision set exposed: absent
updateWorldFocus result: Boolean
initial prepare retry proof: absent
focus command/session/epoch/revision admission: absent
```

## Production Core World facts verified

```txt
selection shape: required / updated / retained / released
selection validation: present
provider phase ordering: present
provider matches admission: present
provider capability admission: present
provider statuses: present
failed-cell state: present
new-cell prepared-provider rollback: present
release order: reverse provider order
async provider methods: rejected
focusChanged and cellsChanged: separate commits
```

## Fake runtime differences verified

```txt
selection shape: flat array
selection validation: absent
provider matching: absent
capability admission: absent
diagnostics: minimal/absent
failed-cell state: absent
production-equivalent rollback result: absent
separate focus/cell commits: absent
provider failure matrix: absent
```

## Existing test surface identified

```txt
npm test
  -> static-check
  -> domain-smoke
  -> world-baseline
  -> core-world-runtime
  -> world-provider-order
  -> world-query-parity
  -> world-population-parity
  -> world-snapshot-portability
  -> world-cell-lifecycle
  -> renderer-cell-cache
  -> renderer-resource-disposal
```

`core-world-runtime.mjs` and `world-cell-lifecycle.mjs` inject `createFakeNexusWorldRuntime()` and cover only normal success behavior.

## Validation not executed in this documentation run

```txt
npm install
npm test
exact pinned Core World Node fixture
production/fake parity matrix
initial prepare failure injection
focus failure after setFocus commit
provider capability failure
critical provider rollback fixture
noncritical degraded commit fixture
provider release failure fixture
provider-store checkpoint/restore fixture
focus retry fixture
world revision monotonicity fixture
stale session/epoch/revision fixture
browser smoke
WebGPU initialization
WebGL2 fallback initialization
Pages smoke
```

The GitHub connector was used for source inspection and documentation writes. A runnable checkout and browser were unavailable, so no executable pass claim is made.

## Required focus fixture matrix

Run each scenario against both the exact pinned runtime and the test adapter:

```txt
initial origin prepare
same-cell no-op
movement below timing threshold
movement below distance threshold
one-cell crossing
multi-cell jump
invalid partition selection
provider not-applicable
missing provider capability
noncritical provider prepare failure
critical provider prepare failure
provider update failure
provider release failure
async provider rejection
failure immediately after focusChanged commit
reset during focus
retry after failed initial prepare
retry after failed movement
repeat command ID
stale session epoch
stale expected world revision
```

For every row prove:

```txt
result status and reason are explicit
wrapper and Core World focus agree
accepted world revision is monotonic
active-cell IDs match accepted selection
provider-store counts match policy
provider transition rows are complete
rollback identifies restored and residual state
portable result fingerprint is deterministic
failed initial prepare remains retriable
stale commands cannot mutate state
production and test classifications match
```

## Required browser proof

```txt
WebGPU core mode crosses a cell boundary with accepted revision readback
WebGL2 core mode crosses a cell boundary with accepted revision readback
provider failure is projected without corrupting the previous visible revision
failed initial prepare can retry without reload
focus command from an old session epoch is rejected
visible render commit references the accepted world revision
legacy mode remains explicitly separate
```

## Readiness statement

Normal-path world preparation and cell movement are covered through a simplified fake runtime. Production/fake contract parity, retriable initial prepare, atomic focus/world/provider revision handling and failure classification remain unproved. Runtime Session Lifecycle Authority remains the prerequisite; Pinned Core World Focus Transaction Authority is the fully documented second gate.
