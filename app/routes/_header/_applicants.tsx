import { Home } from '@/app/Components/MainPage/Home'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_header/_applicants')({
  component: Home,
})
