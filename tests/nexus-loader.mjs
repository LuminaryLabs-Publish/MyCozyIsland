import { pathToFileURL } from "node:url";
import { resolve as resolvePath } from "node:path";

const mappings = new Map([
  ["nexusengine/engine", "node_modules/nexusengine/src/engine.js"],
  ["nexusengine/ecs", "node_modules/nexusengine/src/ecs.js"],
  ["nexusengine/domain-service-kit", "node_modules/nexusengine/src/domain-service-kit.js"],
  ["nexusengine/core-object", "node_modules/nexusengine/src/core-kits/core-object-kit/index.js"],
  ["nexusengine/core-transaction-ledger", "node_modules/nexusengine/src/core-kits/core-transaction-ledger-kit/index.js"]
]);

export async function resolve(specifier, context, nextResolve) {
  const mapped = mappings.get(specifier);
  if (mapped) return { url: pathToFileURL(resolvePath(mapped)).href, shortCircuit: true };
  return nextResolve(specifier, context);
}
