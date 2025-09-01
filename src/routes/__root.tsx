import type { ReactNode } from 'react'
import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from '@tanstack/react-router'
import '../styles/app.css'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { authMiddleware } from '../lib/helper/middleware'
const queryclient = new QueryClient()

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: 'ATS',
      },
    ],
  }),
  component: RootComponent,
  beforeLoad: authMiddleware
})

function RootComponent() {
  return (
       <RootDocument>
     <QueryClientProvider client={queryclient}>
        <Outlet />
      </QueryClientProvider>
    </RootDocument>
  )
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html>
      <head>
        <HeadContent />
      </head>
      <body className=''>
        {children}
        <Scripts />
      </body>
    </html>
  )
}