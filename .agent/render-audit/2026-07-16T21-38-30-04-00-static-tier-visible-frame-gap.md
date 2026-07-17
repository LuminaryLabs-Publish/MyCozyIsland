# Render Audit — Static Tier Visible-Frame Gap

The menu renderer selects one tier during initialization and immediately allocates tier-bound DPR, shadows, particles, water geometry and horizon geometry. The rendered frame can later experience a different viewport, DPR or workload without a new quality decision.

## Source-backed state

- WebGPU/WebGL2 backend detection exists.
- Initial `high`, `balanced` and `low` tiers exist.
- ACES tone mapping, bloom, shadows, GPU wind and procedural scene content exist.
- Resize updates renderer dimensions and responsive camera/palm framing.
- Resize retains the original tier and resource budgets.
- The frame loop does not publish measured frame cost or a quality generation.

## Visible proof gap

There is no result binding the visible frame to:

- the evidence that justified its quality tier;
- a current viewport/DPR revision;
- a settled resource-generation transition;
- a first frame rendered after a downgrade or upgrade.

Proposed terminal proof: `FirstMenuQualityBoundFrameAck` containing quality generation, viewport revision, DPR budget, resource-generation digest and presented-frame revision.