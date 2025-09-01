import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CommentsSection from "../an/CommentSection";
import { useParams } from "@tanstack/react-router";
import { useEffect } from "react";
import Profile from "../an/Profile";
import { getApplicantById, updateApplicant, updateCommentById } from "~/http/services/applicants";

export function Resume() {
  const { applicant_id:id } = useParams({ from: "/_header/_applicants/applicants/$applicant_id/" });
  const queryClient = useQueryClient();

  const {data: resume, isLoading} = useQuery({
    queryKey: ['resume', id],
    queryFn: async () => {
      const response = await getApplicantById(id);
      return response.data;
    },
  })

  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus: string) => {
      return updateApplicant(id, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["applicant", id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
    },
  });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await updateCommentById(id, { comment_description: newComment });
    return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resume', id] });
    },
  })

  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ['resume', id] });
  }, [id, queryClient]);

  if (isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  const name = resume.first_name.charAt(0).toUpperCase() + resume.first_name.slice(1).toLowerCase() + " " + resume.last_name;
  const avatarImg = resume.first_name.charAt(0).toUpperCase() + resume.last_name.charAt(0);

  const commentsData = resume.comments.map((comment: any) => ({
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
        <Profile
          key={id}
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
          resumeOptions={['Screening', 'Interviewed', 'Rejected', 'Pending', 'Joined', 'Hired','Applied','Approved','Shortlisted']}
          value={capitalize(resume.status)}
          resume_key_path={resume.resume_key_path || ''}
          downloadUrl={resume.presignedUrl.download_url || ''}
          onStatusChange={(newStatus) => updateStatusMutation.mutate(newStatus)}
        />
        <CommentsSection 
          key={`comments-${id}`}
          comments={commentsData}
          onSubmitComment={(newComment) => addCommentMutation.mutate(newComment)}
        />
      </div>
    )
}