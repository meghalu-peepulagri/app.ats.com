import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useCallback, useRef } from "react";
import { getCommentsAPI, updateCommentById } from "~/http/services/applicants";
import CommentsSection from "../an/CommentSection";

export function CommentDetails({ applicant_id }: { applicant_id: number }) {
  const queryClient = useQueryClient();

  const { data: comments, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } =
    useInfiniteQuery({
      queryKey: ["comments", applicant_id],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await getCommentsAPI(applicant_id, pageParam);
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.paginationInfo) return undefined;
        if (lastPage.paginationInfo.current_page < lastPage.paginationInfo.total_pages) {
          return lastPage.paginationInfo.current_page + 1;
        }
        return undefined;
      },
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000,
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

  const observer = useRef<IntersectionObserver | null>(null);
  const lastRowRef = useCallback(
    (node: HTMLTableRowElement | null) => {
      if (isFetching || isFetchingNextPage || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { root: null, rootMargin: "0px", threshold: 0.1 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]
  );

  const name = Cookies.get("name");
  const commentsTotal =
  comments?.pages?.[0]?.paginationInfo?.total_records ?? 0;

  const commentsData = comments?.pages
    ?.flatMap((page: any) => page?.records ?? [])
    .map((comment: any) => ({
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
        .replace(/\//g, ".")
        .replace(/, /g, " "),
    }));

  return (
    <div className="w-[42%]">
      {commentsData && (
        <CommentsSection
          key={`comments-${applicant_id}`}
          comments={commentsData}
          onSubmitComment={(newComment) => addCommentMutation.mutate(newComment)}
          isLoading={isFetching || addCommentMutation.isPending}
          isFetchingNextPage={isFetchingNextPage}
          lastRowRef={lastRowRef}
          commentsTotal = {commentsTotal}
        />
      )}
    </div>
  );
}