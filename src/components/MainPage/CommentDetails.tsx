import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getCommentsAPI, updateCommentById } from "~/http/services/applicants";
import CommentsSection from "../an/CommentSection";
import { toast } from "sonner";
import dayjs from "dayjs";

export function CommentDetails({ applicant_id }: { applicant_id: number }) {
  const queryClient = useQueryClient();

  const { data: comments, isError, error } =
    useQuery({
      queryKey: ["comments", applicant_id],
      queryFn: async () => {
        const response = await getCommentsAPI(applicant_id);
        return response.data;
      },
    });

    if(isError){
      toast.error(error.message);
    }

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await updateCommentById(applicant_id, {
        comment_description: newComment,
      });
      return response.data;
    },
    onSuccess: (newCommentResponse) => {
      queryClient.invalidateQueries({ queryKey: ["comments", applicant_id] });
  
      queryClient.setQueryData(["comments", applicant_id], (oldData: any) => {
        return {
          ...oldData,
          records: [...(oldData?.records || []), newCommentResponse],
        };
      });
    },
    onError: (error: any) => {
      toast.error(error.data.message);
    }
  });

  const name = Cookies.get("name");

  const commentsData = comments?.records.map((comment: any) => ({
      id: comment?.id,
      name: comment?.user?.name === name ? "You" : comment?.user?.name,
      msg: comment?.comment_description || "",
      time: dayjs(comment?.commented_at).format("DD-MM-YYYY hh:mm A"),
    }));

  return (
    <div>
      {commentsData && (
        <CommentsSection
          key={`comments-${applicant_id}`}
          comments={commentsData}
          onSubmitComment={(newComment) => addCommentMutation.mutate(newComment)}
          isLoading={addCommentMutation.isPending}
        />
      )}
    </div>
  );
}