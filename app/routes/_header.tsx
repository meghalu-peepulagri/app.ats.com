import { createFileRoute } from '@tanstack/react-router'
import { Stats } from '../Components/layout/Stats'

export const Route = createFileRoute('/_header')({
  component: Stats,
})
