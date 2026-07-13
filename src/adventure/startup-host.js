import { createEngine } from "nexusengine/engine";
import { createCoreStartupKit } from "nexusengine/core-startup";
import { createBrowserStartupPresentationAdapter } from "nexusengine/hosts/browser/startup-presentation";

export const COZY_STARTUP_PREPARATIONS = Object.freeze([
  Object.freeze({ id: "runtime", label: "NexusEngine runtime", weight: 1 }),
  Object.freeze({ id: "renderer", label: "Presentation backend", weight: 2 }),
  Object.freeze({ id: "composition", label: "Adventure services", weight: 2 }),
  Object.freeze({ id: "continuation", label: "Island continuation", weight: 1 }),
  Object.freeze({ id: "world", label: "Island presentation", weight: 4 }),
  Object.freeze({ id: "input", label: "Player controls", weight: 1 })
]);

const DEFAULT_COPY = Object.freeze({
  runtime: "Starting NexusEngine",
  renderer: "Preparing the golden-hour view",
  composition: "Installing island adventure services",
  continuation: "Choosing where your island continues",
  world: "Growing your island",
  input: "Preparing player controls"
});

export function formatCozyStartupDescriptor(descriptor) {
  if (descriptor.failure) {
    return {
      label: "Could not start My Cozy Island",
      error: `${descriptor.failure.code}: ${descriptor.failure.message}`,
      complete: false
    };
  }
  if (descriptor.playable) {
    return {
      label: descriptor.continuation.mode === "restored"
        ? "Your island is ready · save restored"
        : "Your island is ready",
      error: null,
      complete: true
    };
  }
  const active = descriptor.activePreparation;
  return {
    label: active?.detail ?? DEFAULT_COPY[active?.id] ?? "Preparing My Cozy Island",
    error: null,
    complete: false
  };
}

export function createCozyStartupHost(options = {}) {
  const engine = options.engine ?? createEngine({ kits: [createCoreStartupKit()] });
  if (!engine.n?.coreStartup) engine.installKit(createCoreStartupKit());
  const startup = engine.n.coreStartup;

  startup.launch({
    launchId: options.launchId ?? "startup:my-cozy-island:1",
    projectId: "my-cozy-island",
    preparations: COZY_STARTUP_PREPARATIONS,
    metadata: { host: "browser", product: "MyCozyIsland" }
  });

  const presentation = createBrowserStartupPresentationAdapter({
    startup,
    loader: options.loader,
    fill: options.fill,
    label: options.label,
    error: options.error,
    format: options.format ?? formatCozyStartupDescriptor
  });

  startup.ready("runtime", { domainPath: "n:core-startup" }, "NexusEngine runtime ready");
  presentation.render();

  function working(id, progress, detail) {
    const result = startup.working(id, progress, detail);
    presentation.render();
    return result;
  }

  function ready(id, receipt = null, detail = null) {
    const result = startup.ready(id, receipt, detail);
    presentation.render();
    return result;
  }

  function selectContinuation(result = {}) {
    const selection = result.ok
      ? {
          mode: "restored",
          sourceId: result.checksum ? `save:${result.checksum}` : "save:browser",
          receipt: result
        }
      : {
          mode: "new",
          sourceId: null,
          receipt: { reason: result.reason ?? "no-restorable-save" }
        };
    startup.selectContinuation(selection);
    ready("continuation", selection.receipt, selection.mode === "restored" ? "Restored your island" : "Starting a new island day");
    return selection;
  }

  function presentFirstFrame(receipt) {
    const result = startup.presentFirstFrame(receipt);
    presentation.render();
    return result;
  }

  function enter(payload = { inputReady: true }) {
    const result = startup.enter(payload);
    presentation.render();
    return result;
  }

  function fail(cause, details = {}) {
    return presentation.reportFailure(cause, {
      code: details.code ?? cause?.code ?? "cozy.startup.failed",
      message: details.message ?? String(cause?.message ?? cause ?? "Could not start My Cozy Island."),
      source: details.source ?? "my-cozy-island-host",
      retryable: details.retryable !== false,
      fallback: details.fallback ?? null,
      metadata: details.metadata ?? {}
    });
  }

  let globalFailureReported = false;
  const onGlobalError = (event) => {
    if (globalFailureReported || startup.getDescriptor().playable) return;
    globalFailureReported = true;
    fail(event?.error ?? event?.message ?? "Browser startup error", {
      code: event?.error?.code ?? "cozy.startup.browser-error",
      source: "browser-error-event"
    });
  };
  const onUnhandledRejection = (event) => {
    if (globalFailureReported || startup.getDescriptor().playable) return;
    globalFailureReported = true;
    fail(event?.reason ?? "Unhandled startup rejection", {
      code: event?.reason?.code ?? "cozy.startup.unhandled-rejection",
      source: "browser-unhandled-rejection"
    });
  };

  if (options.captureGlobalErrors !== false && typeof globalThis.addEventListener === "function") {
    globalThis.addEventListener("error", onGlobalError);
    globalThis.addEventListener("unhandledrejection", onUnhandledRejection);
  }

  function dispose() {
    if (typeof globalThis.removeEventListener === "function") {
      globalThis.removeEventListener("error", onGlobalError);
      globalThis.removeEventListener("unhandledrejection", onUnhandledRejection);
    }
  }

  return Object.freeze({
    engine,
    startup,
    presentation,
    working,
    ready,
    selectContinuation,
    presentFirstFrame,
    enter,
    fail,
    dispose,
    render: presentation.render,
    withTimeout: presentation.withTimeout,
    getDescriptor: startup.getDescriptor
  });
}

export default createCozyStartupHost;
