import { createFileRoute } from '@tanstack/react-router'
import { Home } from '~/components/mainPage/Home'

export const Route = createFileRoute('/_header/_applicants')({
  component: Home,
})
