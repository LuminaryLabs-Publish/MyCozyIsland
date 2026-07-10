# Validation: My Cozy Island

**Repository:** `LuminaryLabs-Publish/MyCozyIsland`

**Updated:** `2026-07-10T02-31-58-04-00`

## Validation performed

```txt
repository selection:
  checked the current public LuminaryLabs-Publish repository page
  compared eligible repositories against central repo-ledger recency and sampled root .agent state
  excluded TheCavalryOfRome
  selected MyCozyIsland as the oldest eligible documented fallback

source inspection:
  read package.json
  read index.html
  read src/main-cloudform.js imports, descriptor composition, renderer adapters, input handlers, rail camera, movement policy, grass instancing, cloud cache, drift, frame loop, and legacy diagnostics
  read grass-object-domain placement/batch source
  read mattatz-clouds-domain and cozy-hero-cloud-form-kit source

agent documentation:
  refreshed required root .agent files
  added timestamped tracker and turn ledger
  added architecture, render, interaction, grass, cloud, host-proof, and deploy audits
  refreshed kit registry

central documentation:
  central repo ledger update planned in this pass
  central internal change-log entry planned in this pass
```

## Source-backed checks

```txt
active script token: ./src/main-cloudform.js?v=hero-cloud-4
Three.js version: 0.160.0
explicit source kits imported by active route: 9 plus nested cozy-hero-cloud-form-kit
configured grass request count: 140
configured smoke particle count: 96
configured cloud point count: 420
rail/first-person threshold: 0.985
pointer rail-yaw upper threshold: 0.85
movement maximum radius source: central clearing collision boundary
movement campfire keepout: 2.35
legacy host object: globalThis.CozyIsland
```

## Commands not run

```txt
npm install: not run
npm start: not run
npm run check: unavailable
browser smoke: not run
DOM-free fixture: not run because proof modules do not exist yet
GPU/render capture: not run
```

## Git rules

```txt
runtime source changed: no
branch created: no
pull request created: no
repo-local docs pushed to main: yes
central docs pushed to main: pending this pass
```

## Validation conclusion

This is a documentation-only architecture pass. It verifies the current source and consumer boundaries by inspection, but it does not claim runtime, browser, visual, or fixture proof. The next implementation must create the missing proof modules and make `npm run check` executable before claiming source/consumer parity.
