# Interaction Audit: Environment Frame Admission and Result Map

Timestamp: `2026-07-11T12-58-06-04-00`

## Current command path

```txt
animation callback
  -> scenario.tick(dt)
  -> clock mutates immediately
  -> consumers read mixed live and frozen state
  -> render proceeds
```

There is no command identity, expected revision, session admission, consumer result or rollback.

## Required path

```txt
EnvironmentFrameCommand
  -> validate session/generation/tick/reset phase
  -> derive candidate frame
  -> compare expected environment revision
  -> prepare all consumers
  -> commit all consumers or rollback
  -> return EnvironmentFrameResult
  -> render and acknowledge frame
```

## Required rejection reasons

```txt
session-retired
wrong-generation
stale-clock-sample
duplicate-frame
unexpected-revision
consumer-prepare-rejected
consumer-commit-failed
reset-in-progress
renderer-detached
```

The public host should expose detached observations and typed commands, not raw mutable clock, scenario or renderer objects.
