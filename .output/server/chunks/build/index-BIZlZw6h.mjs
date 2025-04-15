import { jsxs, jsx } from 'react/jsx-runtime';
import { useRouter } from '@tanstack/react-router';
import * as n from '@radix-ui/react-accordion';
import { ChevronDownIcon } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { w, e as ee } from '../_/nitro.mjs';
import { createServerFn } from '@tanstack/start-client-core';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:async_hooks';
import 'vinxi/lib/invariant';
import 'vinxi/lib/path';
import 'node:url';
import 'node:fs';
import '@tanstack/router-core';
import 'tiny-invariant';
import '@tanstack/start-server-core';
import 'node:stream';
import 'isbot';
import 'react-dom/server';
import 'node:path';
import 'node:crypto';

function a(...e) {
  return twMerge(clsx(e));
}
function f({ ...e }) {
  return jsx(n.Root, { "data-slot": "accordion", ...e });
}
function h({ className: e, ...o }) {
  return jsx(n.Item, { "data-slot": "accordion-item", className: a("border-b last:border-b-0", e), ...o });
}
function v({ className: e, children: o, ...r }) {
  return jsx(n.Header, { className: "flex", children: jsxs(n.Trigger, { "data-slot": "accordion-trigger", className: a("focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", e), ...r, children: [o, jsx(ChevronDownIcon, { className: "text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" })] }) });
}
function b({ className: e, children: o, ...r }) {
  return jsx(n.Content, { "data-slot": "accordion-content", className: "data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm", ...r, children: jsx("div", { className: a("pt-0 pb-4", e), children: o }) });
}
const g = ee("app_routes_index_tsx--updateCount_createServerFn_handler", "/_server"), x = createServerFn({ method: "POST" }).validator((e) => e).handler(g), D = function() {
  const o = useRouter(), r = w.useLoaderData();
  return jsxs("div", { children: [jsx(f, { type: "single", collapsible: true, children: jsxs(h, { value: "item-1", children: [jsx(v, { children: "Is it accessible?" }), jsx(b, { children: "Yes. It adheres to the WAI-ARIA design pattern." })] }) }), jsxs("button", { type: "button", onClick: () => {
    x({ data: 1 }).then(() => {
      o.invalidate();
    });
  }, children: ["Add 1 to ", r, "?"] })] });
};

export { D as component };
//# sourceMappingURL=index-BIZlZw6h.mjs.map
