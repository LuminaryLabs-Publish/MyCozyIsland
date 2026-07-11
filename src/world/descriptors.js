function clonePortable(value) {
  if (value == null) return value;
  if (typeof structuredClone === "function") return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
}

export function inspectPortableValue(value, path = "value", issues = []) {
  if (value == null || ["string", "number", "boolean"].includes(typeof value)) return { portable: true, issues };
  if (["function", "symbol", "bigint", "undefined"].includes(typeof value)) {
    issues.push(`${path}:${typeof value}`);
    return { portable: false, issues };
  }
  if (ArrayBuffer.isView(value) || value instanceof ArrayBuffer || value instanceof Map || value instanceof Set) {
    issues.push(`${path}:non-portable-container`);
    return { portable: false, issues };
  }
  if (Array.isArray(value)) {
    value.forEach((entry, index) => inspectPortableValue(entry, `${path}[${index}]`, issues));
    return { portable: issues.length === 0, issues };
  }
  if (typeof value === "object") {
    const prototype = Object.getPrototypeOf(value);
    if (prototype !== Object.prototype && prototype !== null) {
      issues.push(`${path}:non-plain-object`);
      return { portable: false, issues };
    }
    for (const [key, entry] of Object.entries(value)) inspectPortableValue(entry, `${path}.${key}`, issues);
    return { portable: issues.length === 0, issues };
  }
  issues.push(`${path}:unsupported`);
  return { portable: false, issues };
}

export function assertPortableValue(value, label = "descriptor") {
  const result = inspectPortableValue(value, label, []);
  if (!result.portable) throw new TypeError(`${label} is not portable: ${result.issues.join(", ")}`);
  return value;
}

export function createCellEffectDescriptor({
  schema,
  id,
  worldId,
  cell,
  providerId,
  version = 1,
  seed,
  capabilities = [],
  runtimeHandleId,
  data = {}
} = {}) {
  if (!schema || !id || !worldId || !cell?.id || !providerId || !runtimeHandleId) {
    throw new TypeError("Cell effect descriptors require schema, id, worldId, cell, providerId, and runtimeHandleId.");
  }
  const descriptor = {
    schema: String(schema),
    id: String(id),
    worldId: String(worldId),
    cellId: String(cell.id),
    providerId: String(providerId),
    version: Math.max(1, Number(version) || 1),
    bounds: clonePortable(cell.bounds ?? {}),
    lod: Number(cell.lod ?? 0),
    level: Number(cell.level ?? 0),
    seed: String(seed ?? cell.seed ?? ""),
    capabilities: [...capabilities].map(String),
    runtimeHandleId: String(runtimeHandleId),
    ...clonePortable(data)
  };
  assertPortableValue(descriptor, `${providerId}:${cell.id}`);
  return Object.freeze(descriptor);
}
