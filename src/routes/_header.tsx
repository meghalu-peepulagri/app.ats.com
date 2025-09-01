import { createFileRoute } from '@tanstack/react-router'
import { Stats } from '../components/layout/Header'

export const Route = createFileRoute('/_header')({
  component: Stats ,
})
