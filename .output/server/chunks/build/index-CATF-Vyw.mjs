import * as i$1 from 'node:fs';
import { o } from './index-ujMS-7Qz.mjs';
import { createServerFn } from '@tanstack/start-client-core';
import 'tiny-invariant';

const a = "count.txt";
async function c() {
  return parseInt(await i$1.promises.readFile(a, "utf-8").catch(() => "0"));
}
const s = o("app_routes_index_tsx--updateCount_createServerFn_handler", "/_server", (e, t) => i.__executeServer(e, t)), i = createServerFn({ method: "POST" }).validator((e) => e).handler(s, async ({ data: e }) => {
  const t = await c();
  await i$1.promises.writeFile(a, `${t + e}`);
});

export { s as updateCount_createServerFn_handler };
//# sourceMappingURL=index-CATF-Vyw.mjs.map
