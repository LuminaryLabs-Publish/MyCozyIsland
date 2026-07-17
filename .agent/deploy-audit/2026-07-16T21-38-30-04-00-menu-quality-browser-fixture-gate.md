# Deploy Audit — Menu Quality Browser Fixture Gate

A release claim for adaptive menu quality requires real-browser evidence, not source-token checks alone.

## Required fixtures

- WebGPU high-tier startup on a capable desktop.
- WebGL2 fallback admission and low-tier constraints.
- Portrait and short-landscape resize after startup.
- Device-pixel-ratio change after startup.
- Sustained CPU overload causing one downgrade.
- Sustained GPU completion delay causing one downgrade.
- Recovery window causing one controlled upgrade.
- Oscillation resistance under alternating load.
- Hidden-tab evidence exclusion.
- Entry-transition evidence exclusion and renderer retirement.
- Preload contention while Play readiness remains factual.
- First matching frame acknowledgement after every accepted transition.
- Built artifact and GitHub Pages origin parity.

## Release gate

Fail closed when a quality transition is accepted without a replacement resource generation, when stale resources render, when the Play gate changes independently of Core Startup readiness, or when no `FirstMenuQualityBoundFrameAck` is observed.