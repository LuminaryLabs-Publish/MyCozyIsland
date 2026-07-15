# Deploy audit: multi-document save fixture gate

**Timestamp:** `2026-07-15T15-01-22-04-00`

## Summary

Node save tests cannot prove browser storage arbitration. Release proof needs real same-origin documents.

## Plan ledger

**Goal:** block save-writer readiness claims until source, built output and Pages behave identically.

- [ ] Open two game tabs from the same origin.
- [ ] Open two menu pages with hidden preloads.
- [ ] Verify only entered gameplay documents can acquire a writer lease.
- [ ] Advance A, persist R2, then trigger stale B pagehide.
- [ ] Verify B is rejected and R2 remains the head.
- [ ] Verify storage events update non-writer documents.
- [ ] Verify lease expiry and takeover after an unclean close.
- [ ] Verify quota, security and readback failure results.
- [ ] Verify HUD status binds to accepted durable revision.
- [ ] Repeat against source server, built artifact and GitHub Pages.

## Gate

No multi-tab safety, preload safety, stale-write rejection, durable conflict handling, artifact parity or production readiness is claimed until these fixtures pass.
