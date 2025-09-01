import { createFileRoute } from '@tanstack/react-router'
import { Home } from '~/components/MainPage/Home'

export const Route = createFileRoute('/_header/_applicants')({
  component: Home,
})
