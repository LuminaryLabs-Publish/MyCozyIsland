# Interaction Audit: Quality Override and Runtime Admission

Timestamp: `2026-07-10T22-29-21-04-00`

## Current user-facing quality input

The route accepts:

```txt
?quality=low
?quality=medium
?quality=high
?quality=ultra
```

`chooseRenderQuality()` marks valid values as `source: "url-override"` and returns the selected startup profile.

## Current runtime behavior

The adaptive budget still runs for URL-selected profiles. No policy states whether the URL value means:

```txt
hard lock
maximum ceiling
minimum floor
startup hint
```

The H key toggles diagnostics, but the overlay shows the startup tier and not the dynamic applied level or control values.

## Admission gaps

- no typed override policy
- no runtime transition admission result
- no indication that a forced tier has been degraded
- no indication that full recovery left pixel ratio below startup
- no control to reset adaptation to the selected startup target
- no host row tying query source to applied target

## Required interaction result

```txt
qualitySource
overrideValue
overridePolicy
requestedLevel
admittedLevel
result
reason
appliedControlSummary
```

## Decision

Treat the current URL override as an unresolved contract. Preserve its existing behavior until an explicit policy and fixture are introduced.
