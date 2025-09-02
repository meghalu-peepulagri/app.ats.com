import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getCommentsAPI, updateCommentById } from "~/http/services/applicants";
import CommentsSection from "../an/CommentSection";
import { useEffect, useRef } from "react";

export function CommentDetails({ applicant_id }: { applicant_id: number }) {
  const queryClient = useQueryClient();

  const { data: comments, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", applicant_id],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getCommentsAPI(applicant_id, pageParam);
        return response.data;
      },
      getNextPageParam: (lastPage) => {
        const nextPage = lastPage?.paginationInfo?.next_page;
        return nextPage || undefined;
      },
      initialPageParam: 1,
    });

  const addCommentMutation = useMutation({
    mutationFn: async (newComment: string) => {
      const response = await updateCommentById(applicant_id, {
        comment_description: newComment,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", applicant_id] });
    },
  });

  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!hasNextPage || isFetchingNextPage) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          fetchNextPage();
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const commentsData = comments?.pages
    ?.flatMap((page: any) => page.records ?? [])
    .map((comment: any) => ({
      id: comment?.id,
      name: comment?.user?.name,
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
        .replace(/\//g, ".")
        .replace(/, /g, " "),
    }));

  return (
    <div className="w-[41%]">
      {commentsData && (
        <CommentsSection
          key={`comments-${applicant_id}`}
          comments={commentsData}
          onSubmitComment={(newComment) => addCommentMutation.mutate(newComment)}
        />
      )}
      
      {hasNextPage && (
        <div ref={loadMoreRef} className="w-full bg-transparent flex items-center justify-center">
          {isFetchingNextPage && (
            <div className="text-sm text-gray-500">Loading more comments...</div>
          )}
        </div>
      )}
    </div>
  );
}