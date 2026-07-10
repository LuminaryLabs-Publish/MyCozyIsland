/**
 * Minimal Nexus-style domain catalog validation used by the standalone demo.
 * The game remains descriptor-driven: domain manifests declare capabilities,
 * while renderer kits consume immutable snapshots.
 */
export function defineDomainKit(manifest) {
  const normalized = {
    version: "0.2.0",
    status: "protokit",
    layer: "mid-domain",
    parentDomain: null,
    extendsBase: "DomainServiceKit",
    provides: [],
    requires: [],
    ownsLoop: false,
    rendererSpecific: false,
    snapshotPolicy: "descriptor-only",
    resetPolicy: "recreate-from-seed",
    ...manifest
  };

  normalized.provides = Object.freeze([...(normalized.provides ?? [])]);
  normalized.requires = Object.freeze([...(normalized.requires ?? [])]);
  return Object.freeze(normalized);
}

export function validateKitCatalog(kits = []) {
  const errors = [];
  const ids = new Set();
  const providers = new Map();

  for (const kit of kits) {
    if (!kit || typeof kit !== "object") {
      errors.push("Catalog contains a non-object entry.");
      continue;
    }
    if (!kit.id || typeof kit.id !== "string") errors.push("A kit is missing a stable id.");
    else if (ids.has(kit.id)) errors.push(`Duplicate kit id: ${kit.id}`);
    else ids.add(kit.id);

    if (kit.extendsBase !== "DomainServiceKit") {
      errors.push(`${kit.id ?? "unknown"} must extend DomainServiceKit.`);
    }
    if (!kit.description || kit.description.length < 24) {
      errors.push(`${kit.id ?? "unknown"} needs a clear boundary description.`);
    }

    for (const capability of kit.provides ?? []) {
      if (providers.has(capability)) {
        errors.push(`Capability ${capability} is provided by both ${providers.get(capability)} and ${kit.id}.`);
      } else {
        providers.set(capability, kit.id);
      }
    }
  }

  for (const kit of kits) {
    for (const requirement of kit.requires ?? []) {
      if (!providers.has(requirement)) {
        errors.push(`${kit.id} requires missing capability ${requirement}.`);
      }
    }
  }

  return Object.freeze({
    valid: errors.length === 0,
    errors: Object.freeze(errors),
    kitCount: kits.length,
    capabilityCount: providers.size,
    capabilities: Object.freeze([...providers.keys()].sort())
  });
}
