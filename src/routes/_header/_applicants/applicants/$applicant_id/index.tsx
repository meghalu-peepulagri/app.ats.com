import { Resume } from '~/components/MainPage/ApplicantDetails'
import { createFileRoute, redirect } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_header/_applicants/applicants/$applicant_id/',
)({
  component: Resume,
})
