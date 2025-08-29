import { AddUserContainer } from '@/app/Components/core/add/AddUserContainer'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_header/add_user/')({
  component: AddUserContainer,
})
