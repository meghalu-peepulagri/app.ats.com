import { redirect, createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { Toaster } from "sonner";
const getIsAuthenticated = () => {
  return Cookies.get("token");
};
const authRoutes = [
  "/"
];
const authMiddleware = async ({
  location
}) => {
  if (typeof window == "undefined") return;
  if (getIsAuthenticated() && authRoutes.includes(location.pathname)) {
    throw redirect({
      to: "/"
    });
  }
  if (!getIsAuthenticated() && !authRoutes.includes(location.pathname)) {
    throw redirect({
      to: "/applicants"
    });
  }
};
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1e3 * 60 * 5,
      retry: false
    }
  }
});
const Route$6 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "ATS"
      }
    ],
    links: [
      {
        rel: "stylesheet",
        href: "../styles/app.css"
      },
      { rel: "icon", type: "image/png", href: "/favicon_io/favicon-32x32.png" }
    ]
  }),
  component: RootComponent,
  beforeLoad: authMiddleware
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsx(Outlet, {}) }) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {}),
      /* @__PURE__ */ jsx(Toaster, { position: "top-center", richColors: true, closeButton: true })
    ] })
  ] });
}
const $$splitComponentImporter$5 = () => import("./_header-d4i_GYz0.js");
const Route$5 = createFileRoute("/_header")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./index-P0escEZw.js");
const Route$4 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./_applicants-diN0XwHe.js");
const Route$3 = createFileRoute("/_header/_applicants")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./index-CKExcXzv.js");
const Route$2 = createFileRoute("/_header/add_user/")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-BwKa1Q-E.js");
const Route$1 = createFileRoute("/_header/_applicants/applicants/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-SkJbcpjV.js");
const Route = createFileRoute("/_header/_applicants/applicants/$applicant_id/")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const HeaderRoute = Route$5.update({
  id: "/_header",
  getParentRoute: () => Route$6
});
const IndexRoute = Route$4.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const HeaderApplicantsRoute = Route$3.update({
  id: "/_applicants",
  getParentRoute: () => HeaderRoute
});
const HeaderAdd_userIndexRoute = Route$2.update({
  id: "/add_user/",
  path: "/add_user/",
  getParentRoute: () => HeaderRoute
});
const HeaderApplicantsApplicantsIndexRoute = Route$1.update({
  id: "/applicants/",
  path: "/applicants/",
  getParentRoute: () => HeaderApplicantsRoute
});
const HeaderApplicantsApplicantsApplicant_idIndexRoute = Route.update({
  id: "/applicants/$applicant_id/",
  path: "/applicants/$applicant_id/",
  getParentRoute: () => HeaderApplicantsRoute
});
const HeaderApplicantsRouteChildren = {
  HeaderApplicantsApplicantsIndexRoute,
  HeaderApplicantsApplicantsApplicant_idIndexRoute
};
const HeaderApplicantsRouteWithChildren = HeaderApplicantsRoute._addFileChildren(HeaderApplicantsRouteChildren);
const HeaderRouteChildren = {
  HeaderApplicantsRoute: HeaderApplicantsRouteWithChildren,
  HeaderAdd_userIndexRoute
};
const HeaderRouteWithChildren = HeaderRoute._addFileChildren(HeaderRouteChildren);
const rootRouteChildren = {
  IndexRoute,
  HeaderRoute: HeaderRouteWithChildren
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  const router = createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true
  });
  return router;
}
export {
  getRouter
};
