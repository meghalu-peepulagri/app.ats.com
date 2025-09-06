import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getCommentsAPI, updateCommentById } from "~/http/services/applicants";
import CommentsSection from "../an/CommentSection";

export function CommentDetails({ applicant_id }: { applicant_id: number }) {
  const queryClient = useQueryClient();

  const { data: comments } =
    useQuery({
      queryKey: ["comments", applicant_id],
      queryFn: async () => {
        const response = await getCommentsAPI(applicant_id);
        return response.data;
      },
    });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      return await updateCommentById(applicant_id, {
        comment_description: newComment,
      });
    },
    onMutate: async (newComment) => {
      await queryClient.cancelQueries({ queryKey: ["comments", applicant_id] });
        const previousComments = queryClient.getQueryData<any>(["comments", applicant_id]);
  
      queryClient.setQueryData(["comments", applicant_id], (old: any) => {
        if (!old) return old;
        return {
          ...old,
          records: [
            ...old.records,
            {
              id: Date.now(),
              comment_description: newComment,
              commented_at: new Date().toISOString(),
              user: { name },
            },
          ],
        };
      });
  
      return { previousComments };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", applicant_id] });
    }
  });
  
  const name = Cookies.get("name");

  const commentsData = comments?.records.map((comment: any) => ({
      id: comment?.id,
      name: comment?.user?.name === name ? "You" : comment?.user?.name,
      msg: comment?.comment_description || "",
      time: new Date(comment?.commented_at)
        .toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(/\//g, "-")
        .replace(/, /g, " "),
    }));

  return (
    <div className="w-[42%]">
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