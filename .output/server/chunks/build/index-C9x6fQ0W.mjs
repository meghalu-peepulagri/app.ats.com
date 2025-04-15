import { createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import * as i$1 from 'node:fs';
import { o } from './index-ujMS-7Qz.mjs';
import { createServerFn } from '@tanstack/start-client-core';
import 'tiny-invariant';

const p = () => import('./index-BdG24594.mjs'), m = "count.txt";
async function i() {
  return parseInt(await i$1.promises.readFile(m, "utf-8").catch(() => "0"));
}
const u = o("app_routes_index_tsx--getCount_createServerFn_handler", "/_server", (t, r) => e.__executeServer(t, r)), e = createServerFn({ method: "GET" }).handler(u, () => i()), _ = createFileRoute("/")({ component: lazyRouteComponent(p, "component", () => _.ssr), loader: async () => await e() });

export { u as getCount_createServerFn_handler };
//# sourceMappingURL=index-C9x6fQ0W.mjs.map
