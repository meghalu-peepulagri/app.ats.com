import { useEffect, useRef, useState, forwardRef } from "react";
import { CommentIcon } from "../icons/Commenticon";
import { MessageIcon } from "../icons/MessageIcon";
import { NoCommentIcon } from "../icons/NoCommentIcon";
import { Avatar } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { LoaderCircle } from "lucide-react";

const CardComponent = forwardRef<HTMLDivElement, { name: string; msg: string; time: string }>(
  ({ name, msg, time }, ref) => {
    return (
      <Card
        ref={ref}
        className="w-full rounded-lg max-w-md shadow-none border-none bg-[#F4F7FC] p-0"
      >
        <CardContent className="flex flex-col p-1">
          <div className="flex items-center gap-2 px-2">
            <Avatar className="w-7 h-7 rounded-full bg-[#c7c9cd] border flex items-center justify-center text-white">
              <p className="text-black text-sm 3xl:!text-base">
                {name?.charAt(0)?.toUpperCase?.() ?? "?"}
              </p>
            </Avatar>
            <h3 className="text-[15px] 3xl:!text-lg text-normal text-[#181616] capitalize">
              {name}
            </h3>
            <p className="text-xs 3xl:!text-sm text-[#828282] font-normal">{time}</p>
          </div>
          <p className="text-xs 3xl:!text-sm text-[#4F4F4F] font-normal pl-10 capitalize">
            {msg}
          </p>
        </CardContent>
      </Card>
    );
  }
);
CardComponent.displayName = "CardComponent";

const CommentsSection = ({
  comments,
  onSubmitComment,
  isLoading,
}: {
  comments: Array<{ id?: string | number; name: string; msg: string; time: string }>;
  onSubmitComment: (comment: string) => void;
  isLoading: boolean;
}) => {
  const [newComment, setNewComment] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(comments.length);

  const handleCommentChange = (e: any) => setNewComment(e.target.value);

  const handleCommentSubmit = () => {
    const trimmed = newComment.trim();
    if (!trimmed) return;
    onSubmitComment(trimmed);
    setNewComment("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  useEffect(() => {
    if (comments.length > prevCountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevCountRef.current = comments.length;
  }, [comments]);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MessageIcon />
          <span className="text-xs 2xl:text-sm 3xl:!text-base font-normal text-[#000]">
            Comments{" "}
            <span className="bg-black text-white rounded-full px-3 ml-3 py-0 text-xs 3xl:!text-sm">
              {comments?.length ?? 0}
            </span>
          </span>
        </div>
      </div>

      <div className="h-[calc(100vh-260px)] overflow-y-auto gap-1 flex flex-col">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <CardComponent
              key={comment?.id ?? index}
              name={comment?.name}
              msg={comment?.msg}
              time={comment?.time}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-[30%]">
            <NoCommentIcon />
            <p className="text-xs 3xl:!text-sm text-[#828282] font-normal">
              No comments
            </p>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-full">
          <textarea
            className="w-full p-2 h-20 bg-[#EFEFF1] placeholder:text-[#828282] text-xs 3xl:!text-sm rounded resize-none pr-6 focus:ring-0 focus:outline-none border border-[rgba(0,0,0,0.08)]"
            placeholder="Write a comment..."
            rows={3}
            value={newComment}
            onChange={handleCommentChange}
            onKeyDown={handleKeyDown}
          />
          <button
            type="button"
            className="absolute top-2 right-2 bg-[#4F4F4F] w-10.5 h-6.5 rounded flex items-center justify-center cursor-pointer"
            onClick={handleCommentSubmit}
            disabled={isLoading}
          >
            {/* {isLoading ? (
              <LoaderCircle className="text-white animate-spin w-5 h-5" />
            ) : (
              <CommentIcon className="!w-3.5 !h-3.5" />
            )} */}
            <CommentIcon className="!w-3.5 !h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentsSection;
