# Deploy Audit: Foam Proxy Browser Fixture Gate

Timestamp: `2026-07-12T00-20-01-04-00`

## Existing proof

```txt
npm test includes foam-depth-occlusion.mjs
that test reads renderer-post.js as text
it asserts required tokens and source ordering
it does not create a renderer, execute a pass, inspect attachments, mutate topology, dispose resources, or compare pixels
```

## Required fixture matrix

```txt
Node contract
  -> logical graph exposes or adapts the physical foam-depth pass
  -> exact source/proxy membership plan
  -> add/remove topology reconciliation
  -> shared geometry ownership classification
  -> idempotent proxy disposal

Browser WebGPU
  -> opaque terrain, rock, prop and vegetation occlude foam
  -> source/proxy transform parity under animation
  -> topology rebuild produces no stale proxy
  -> disposal leaves no live proxy material/pass

Browser WebGL2 fallback
  -> same result schema and visible occlusion semantics

Fog/water integration
  -> foam appears only in admitted shoreline/water regions
  -> distance/fog treatment matches the declared contract

Frame proof
  -> capture cites graph, physical plan, topology, depth binding, backend and frame revisions
```

## Deployment gate

A Pages deployment may claim depth-aware foam only after both backends pass the topology, disposal, binding and visible-pixel fixtures. Source-token tests remain useful static guards but are not rendering proof.
