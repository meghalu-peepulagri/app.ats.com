import { createFileRoute } from '@tanstack/react-router'
import { AddUserContainer } from '~/components/core/add/AddUserContainer'

export const Route = createFileRoute('/_header/add_user/')({
  component: AddUserContainer,
})
