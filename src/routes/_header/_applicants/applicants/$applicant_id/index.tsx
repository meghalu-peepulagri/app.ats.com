import { Resume } from '~/components/MainPage/ApplicantDetails'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute(
  '/_header/_applicants/applicants/$applicant_id/',
)({
  component: Resume,
})
