import { useMutation, useQuery } from "@tanstack/react-query";
import ApplicantCard from "../an/Profile";
import { getApplicantById, updateCommentById } from "@/app/http/services/applicants";
import CommentsSection from "../an/CommentSection";
import { useParams } from "@tanstack/react-router";

export function Resume() {
  const { applicant_id:id } = useParams({ from: "/_header/_applicants/applicants/$applicant_id/" });

  const {data: resume, isLoading} = useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      const response = await getApplicantById(id);
      return response.data;
    },
  })

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await updateCommentById(id, { comment_description: newComment });
    return response.data;
    },
  })

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const name = resume.first_name.charAt(0).toUpperCase() + resume.first_name.slice(1).toLowerCase() + " " + resume.last_name;
  const avatarImg = resume.first_name.charAt(0).toUpperCase() + resume.last_name.charAt(0);

  const commentsData = resume.comments.map((comment) => ({
    id: comment.applicant_id,
    name: 'Admin',
    msg: comment.comment_description,
    time: new Date(comment.updated_at).toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    }).replace(/\//g, '.').replace(/, /g, ' '),
  }))

  function capitalize(word: string) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "";
  }

    return(
        <div className="flex gap-2 w-[100%]">
        <ApplicantCard
          avatarImg={avatarImg || "A"}
          name={name || ''}
          email={resume.email || ''}
          phone={resume.phone || ''}
          jobTitle={resume.role || ''}
          applyTime={new Date(resume.created_at).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          }).replace(/\//g, '-').replace(/, /g, ' ')}
          resumeOptions={['Screening', 'Interviewed', 'Rejected', 'Pending', 'Joined']}
          value={capitalize(resume.status)}
          resume_key_path={resume.resume_key_path || ''}
          downloadUrl={resume.presignedUrl.download_url || ''}
        />
        <CommentsSection 
          comments={commentsData}
          onSubmitComment={(newComment) => addCommentMutation.mutate(newComment)}
        />
      </div>
    )
}