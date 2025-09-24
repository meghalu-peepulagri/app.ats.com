import { createFileRoute } from '@tanstack/react-router'
import { InitialPage } from '~/components/mainPage/InitialPage'

export const Route = createFileRoute('/_header/_applicants/applicants/')({
  component: InitialPage,
})
