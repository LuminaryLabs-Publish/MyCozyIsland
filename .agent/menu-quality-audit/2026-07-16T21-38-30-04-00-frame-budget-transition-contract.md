# Menu Quality Audit — Frame-Budget Transition Contract

## Required invariants

1. Exactly one quality generation is authoritative for a presented menu frame.
2. Hidden, disposed and entry-transition periods do not count as overload or recovery evidence.
3. A downgrade requires sustained overload; an upgrade requires a longer sustained recovery period.
4. Upgrades and downgrades use cooldowns to prevent oscillation.
5. DPR-only changes may settle without rebuilding geometry when policy permits.
6. Geometry, particle, shadow or post changes allocate a replacement generation before retiring the old one.
7. Stale resources never render after a transition result commits.
8. The Play gate and Core Startup readiness remain independent from menu quality.
9. Reduced-motion preference remains a presentation policy input, not a performance proxy.
10. Every accepted transition ends with `FirstMenuQualityBoundFrameAck`.

## Minimum transition record

```txt
qualityGeneration
previousTier
targetTier
reason
viewportRevision
dprRevision
recipeRevision
backend
cpuEvidenceDigest
gpuEvidenceDigest
oldResourceGeneration
newResourceGeneration
committedFrameRevision
```

## Non-goals

- Moving Three.js rendering into a simulation DSK.
- Changing island gameplay quality from menu evidence.
- Treating one slow frame as a downgrade command.
- Rebuilding the prepared game iframe during menu adaptation.