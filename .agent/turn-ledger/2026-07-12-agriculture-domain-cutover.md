# Turn Ledger: Agriculture Domain Cutover

Date: 2026-07-12

## Goal

Replace the product-specific farming authority with the official service-driven Agriculture DSK while keeping wild resources, inventory, rendering, and product content in their proper domains.

## Implemented

- Removed `src/adventure/life-domains.js` and the installed `cozy-farming-domain-kit`.
- Installed `n:production:agriculture` from immutable NexusEngine-Kits source.
- Added tropical soil and crop configuration.
- Added land, soil, cultivation, water, growth, harvest, and perennial services through one DSK.
- Added product settlement of Agriculture `resourceChanges` through Inventory.
- Kept wild coconuts in `cozy-foraging-domain-kit`.
- Made cultivated coconut palms perennial and regrowing.
- Added operation IDs that include target revision and frame identity.
- Added Agriculture save schema v2 and legacy farming-save migration.
- Added Agriculture renderer descriptors and frame state.
- Added deterministic integration tests for annual crops, perennial palms, wild forage, save v2, and v1 migration.
- Pinned NexusEngine and NexusEngine-Kits dependencies to immutable commits.

## Domain result

```txt
n:production                 catalog family only
└─ n:production:agriculture  executable official DSK
```

No `production-domain-kit`, `watering-domain-kit`, `soil-domain-kit`, `growth-domain-kit`, or `harvest-domain-kit` was created.

## Validation gate

```txt
npm install --ignore-scripts
npm test
```

The test must prove the Agriculture domain path exists, the farming domain path does not, planted coconut palms regrow, wild coconuts stay under Foraging, v2 saves round-trip, and v1 farming saves migrate.
