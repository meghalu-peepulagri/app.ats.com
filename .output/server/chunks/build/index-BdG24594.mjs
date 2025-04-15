import { jsxs, jsx } from 'react/jsx-runtime';
import * as i from 'node:fs';
import { useRouter, createFileRoute, lazyRouteComponent } from '@tanstack/react-router';
import * as n from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { createServerFn } from '@tanstack/start-client-core';
import { o } from './index-ujMS-7Qz.mjs';
import 'tiny-invariant';

function c(...e) {
  return twMerge(clsx(e));
}
function b({ ...e }) {
  return jsx(n.Root, { "data-slot": "accordion", ...e });
}
function C({ className: e, ...t }) {
  return jsx(n.Item, { "data-slot": "accordion-item", className: c("border-b last:border-b-0", e), ...t });
}
function y({ className: e, children: t, ...n$1 }) {
  return jsx(n.Header, { className: "flex", children: jsxs(n.Trigger, { "data-slot": "accordion-trigger", className: c("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", e), ...n$1, children: [t, jsx(ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })] }) });
}
function S({ className: e, children: t, ...n$1 }) {
  return jsx(n.Content, { "data-slot": "accordion-content", className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm", ...n$1, children: jsx("div", { className: c("pt-0 pb-4", e), children: t }) });
}
const w = () => Promise.resolve().then(() => j), I = "count.txt";
async function A() {
  return parseInt(await i.promises.readFile(I, "utf-8").catch(() => "0"));
}
const F = o("app_routes_index_tsx--getCount_createServerFn_handler", "/_server", (e, t) => l.__executeServer(e, t)), l = createServerFn({ method: "GET" }).handler(F, () => A()), u = createFileRoute("/")({ component: lazyRouteComponent(w, "component", () => u.ssr), loader: async () => await l() }), m = "count.txt";
async function R() {
  return parseInt(await i.promises.readFile(m, "utf-8").catch(() => "0"));
}
const N = o("app_routes_index_tsx--updateCount_createServerFn_handler", "/_server", (e, t) => p.__executeServer(e, t)), p = createServerFn({ method: "POST" }).validator((e) => e).handler(N, async ({ data: e }) => {
  const t = await R();
  await i.promises.writeFile(m, `${t + e}`);
}), P = function() {
  const t = useRouter(), n = u.useLoaderData();
  return jsxs("div", { children: [jsx(b, { type: "single", collapsible: true, children: jsxs(C, { value: "item-1", children: [jsx(y, { children: "Is it accessible?" }), jsx(S, { children: "Yes. It adheres to the WAI-ARIA design pattern." })] }) }), jsxs("button", { type: "button", onClick: () => {
    p({ data: 1 }).then(() => {
      t.invalidate();
    });
  }, children: ["Add 1 to ", n, "?"] })] });
}, j = Object.freeze(Object.defineProperty({ __proto__: null, component: P }, Symbol.toStringTag, { value: "Module" }));

export { P as component };
//# sourceMappingURL=index-BdG24594.mjs.map
