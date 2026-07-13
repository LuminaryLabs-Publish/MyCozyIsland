# Deploy audit: page lifecycle browser fixture gate

**Timestamp:** `2026-07-13T01-31-36-04-00`

## Summary

Static source checks cannot prove BFCache suspension, pageshow resume, complete retirement or resource cleanup. Deployment readiness requires real browser navigation fixtures against source, served output and GitHub Pages for both WebGPU and WebGL2 paths where available.

## Plan ledger

**Goal:** gate lifecycle claims on executable browser evidence and source/build/Pages parity.

- [x] Identify lifecycle behaviors that Node/static checks cannot observe.
- [x] Define BFCache, repeated navigation and terminal-retirement cases.
- [x] Define visible-state and resource evidence.
- [x] Define backend and deployed-origin parity requirements.
- [ ] Implement and run the fixture matrix.

## Required fixture matrix

```txt
source server
  WebGPU-capable browser
  forced WebGL2 fallback

production-like static server
  WebGPU-capable browser
  forced WebGL2 fallback

GitHub Pages
  supported backend
  fallback backend when available
```

## BFCache round-trip cases

```txt
navigate away and return after planting
navigate away and return after watering
navigate away and return after harvest
navigate away and return after wild forage collection
return while an interaction target is active
repeat back/forward navigation at least three times
```

Each case must prove:

```txt
pagehide persisted classification
no destructive participant retirement during suspension
pageshow resume result
new input and frame generations
reset wall-time baseline
complete gameplay renderer indexes
HUD/world/target-marker parity
first resumed visible-frame acknowledgement
```

## Terminal retirement cases

```txt
explicit host stop
non-persisted pagehide when observable
renderer initialization failure after partial construction
pagehide during save activity
pagehide during adaptive-quality transition
```

Each case must prove:

```txt
animation loop stopped
listeners detached
save flush result recorded
all registered participants retired once
no post-retirement frames or commands
incomplete cleanup reported as Degraded/Failed
```

## Evidence to capture

```txt
lifecycle command and result journal
participant receipts
save write/readback result
frame and input generations
first resumed frame screenshot and fingerprint
renderer memory/resource counters where available
console errors and unhandled rejections
source/build/Pages commit identity
```

## Gate

Do not mark MyCozyIsland BFCache-safe, lifecycle-complete, leak-free or deployment-ready until the full matrix passes on `main` and the deployed artifact is tied to the audited commit.