import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_header/_applicants/applicants/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}
