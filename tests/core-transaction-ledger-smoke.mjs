import assert from "node:assert/strict";
import { createEngine } from "nexusengine/engine";
import { createCoreTransactionLedgerKit } from "nexusengine/core-transaction-ledger";

const engine = createEngine({ kits: [createCoreTransactionLedgerKit()] });
const ledger = engine.n.coreTransactionLedger;
let calls = 0;
const first = ledger.applyOnce("harvest", "plot-1:harvest-1", () => {
  calls += 1;
  return { itemId: "taro-root", amount: 3 };
});
const duplicate = ledger.applyOnce("harvest", "plot-1:harvest-1", () => {
  calls += 1;
  return { itemId: "incorrect", amount: 99 };
});
assert.equal(first.applied, true);
assert.equal(duplicate.applied, false);
assert.equal(calls, 1);
assert.deepEqual(duplicate.result, { itemId: "taro-root", amount: 3 });
const snapshot = ledger.getSnapshot();
const restored = createEngine({ kits: [createCoreTransactionLedgerKit()] });
restored.n.coreTransactionLedger.loadSnapshot(snapshot);
assert.equal(restored.n.coreTransactionLedger.has("harvest", "plot-1:harvest-1"), true);
console.log("installed NexusEngine transaction ledger: ok");
