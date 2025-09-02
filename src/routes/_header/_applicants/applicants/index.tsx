import { createFileRoute } from '@tanstack/react-router'
import { InitialPage } from '~/components/MainPage/InitialPage'

export const Route = createFileRoute('/_header/_applicants/applicants/')({
  component: InitialPage,
})
