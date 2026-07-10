# Grass / Vegetation System Audit: Fixture Ledger

Timestamp: 2026-07-10T10-19-39-04-00
Repo: LuminaryLabs-Publish/MyCozyIsland

## Current vegetation domains

```txt
vegetation-archetype-catalog
ground-contact-service
vegetation-placement-graph
vegetation-wind
vegetation-lod
rock-graph
prop-graph
campfire-atmosphere
```

## Current consumer state

Vegetation and ground-contact source rows exist, and render consumers can place visible island objects. The missing piece is host-readable proof that source rows were consumed into render instances as expected.

## Gap

No fixture ledger currently maps:

```txt
vegetation source row -> ground contact row -> placement row -> LOD row -> render instance row -> host readback row
```

## Needed next rows

- vegetation archetype row
- ground contact row
- placement accepted/rejected row
- LOD decision row
- wind influence row
- render instance consumption row
- host readback row

## Not next

- grass art tuning
- vegetation density retune
- new prop content
- renderer extraction
