# Startup Audit: Module, Backend and Rollback Contract

Timestamp: `2026-07-11T14-41-28-04-00`

## Summary

Startup needs one transaction spanning browser module admission, renderer backend selection, Core World preparation, render-resource acquisition, loader state and first-frame readiness. The current route has no common identity or rollback path across those stages.

## Plan ledger

**Goal:** define the exact contract that prevents stranded loaders, partial GPU graphs and stale retry completions.

- [x] Define module-source authority.
- [x] Define backend candidate and admission authority.
- [x] Define resource acquisition and reverse cleanup.
- [x] Define retry generation and first-frame commit.

## Module contract

```txt
ModuleSourceManifest {
  routeRevision
  sources[] { id, url, version, integrity, requiredExports[] }
  fingerprint
}
```

The route shell must own module loading so fetch, parse and evaluation failures can be classified and projected before the product module is evaluated.

## Backend contract

```txt
RendererBackendCandidate {
  id
  capabilities
  limitations
  source
}

BackendAdmissionResult {
  status
  admittedBackend
  rejectedCandidates[]
  capabilityFingerprint
  qualityCandidate
}
```

A non-WebGPU backend must not be labeled `webgl2` without verified capability evidence.

## Resource contract

Each successful startup stage registers an idempotent cleanup lease:

```txt
renderer
Core World runtime
scene objects
materials and geometry
cloud/fog storage or data textures
cloud renderer
fog renderer
ocean renderer
foam renderer
post pipeline
debug overlay
performance budget
input listeners
resize listener
loader timers
animation loop
global host
```

## Rollback order

```txt
fence generation
  -> stop first-frame/animation callbacks
  -> revoke public host
  -> cancel loader timers
  -> retire listeners
  -> dispose post/cloud/fog/ocean/foam/world resources
  -> dispose textures, materials and geometry
  -> dispose/reset Core World
  -> dispose renderer
  -> publish rollback receipts
  -> enter FAILED
```

## Retry contract

```txt
FAILED + rollbackComplete
  -> RetryStartupCommand
  -> startupGeneration + 1
  -> new resource ledger
  -> no reuse of failed renderer/world/texture objects
```

## Commit condition

Startup commits only after:

```txt
module graph admitted
backend and quality admitted
world prepared
all required render consumers prepared
listeners and loop leased
first visible frame acknowledged
loader projection updated from committed result
```

## Non-goals

- Do not implement another renderer framework.
- Do not move Core World behavior into startup kits.
- Do not treat loader percentages as progress authority.
- Do not add silent infinite retry.
- Do not retain raw error objects in public observations.