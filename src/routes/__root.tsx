import type { ReactNode } from "react";
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
// import tailwindCss from "../styles/app.css";
import '../styles/app.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { authMiddleware } from "../lib/helper/middleware";
import { Toaster } from "sonner";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      staleTime: 1000 * 60 * 5,
      retry: false,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "ATS",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: "../styles/app.css",
      },
      { rel: "icon", type: "image/png", href: "/favicon_io/favicon-32x32.png" },
    ],
  }),
  component: RootComponent,
  beforeLoad: authMiddleware,
});

function RootComponent() {
  return (
    <RootDocument>
      <QueryClientProvider client={queryClient}>
        <Outlet />
      </QueryClientProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <Toaster position='top-center' richColors closeButton/>
      </body>
    </html>
  );
}
