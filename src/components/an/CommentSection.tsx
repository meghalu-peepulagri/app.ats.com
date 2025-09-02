import { useEffect, useState } from "react";
import { CommentIcon } from "../icons/Commenticon";
import { MessageIcon } from "../icons/MessageIcon";
import { NoCommentIcon } from "../icons/NoCommentIcon";
import { Avatar } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";

const CardComponent = ({ name, msg, time } : {name: string, msg: string, time: string}) => {
  return (
    <Card className="w-full rounded-lg max-w-md shadow-none border-none bg-[#F4F7FC] p-0">
      <CardContent className="flex flex-col p-1">
      <div className="flex items-center gap-2 px-2">
      <Avatar className="w-7 h-7 rounded-full bg-[#c7c9cd] border flex items-center justify-center text-white">
          <p className="text-black text-sm 3xl:!text-base">{name.charAt(0).toUpperCase()}</p>
        </Avatar>
          <h3 className="text-[15px] 3xl:!text-lg text-normal text-[#181616]">{name}</h3>
          <p className="text-xs 3xl:!text-sm text-[#828282] font-normal">
            {time}
          </p>
        </div>
        <p className="text-xs 3xl:!text-sm text-[#4F4F4F] font-normal pl-10">{msg}</p>
      </CardContent>
    </Card>
  );
};

const CommentsSection = ({ comments, onSubmitComment }: { comments: any[], onSubmitComment: (comment: string) => void}) => {
  const [newComment, setNewComment] = useState("");
  const [commentList, setCommentList] = useState(comments);

  useEffect(() => {
    setCommentList(comments || []);
  }, [comments]);

  const handleCommentChange = (e: any) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onSubmitComment(newComment); 
      const newCommentObj = { 
        name: "Hr", 
        msg: newComment, 
        time: new Date().toLocaleString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        }).replace(/\//g, '.').replace(/, /g, ' ')
      };
      setCommentList(prev => [...prev, newCommentObj]);
      setNewComment("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MessageIcon />
          <span className="text-xs 2xl:text-sm 3xl:!text-base font-normal text-[#000]">Comments <span className="bg-black text-white rounded-full px-3 ml-3 py-0 text-xs 3xl:!text-sm">{commentList?.length}</span></span>
        </div>
      </div>
      <div className="h-[calc(100vh-260px)] overflow-y-auto gap-1 flex flex-col">
        {commentList?.length > 0 ? (
          commentList?.map((comment: any, index: number) => (
            <CardComponent key={index} name={comment?.name} msg={comment?.msg} time={comment?.time} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center mt-[30%]">
          <NoCommentIcon />
          <p className="text-xs 3xl:!text-sm text-[#828282] font-normal">No comments</p>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-full">
          <textarea
            className="w-full p-2 h-20 bg-[#EFEFF1] placeholder:text-[#828282] font-(--an-card-comments-weight) text-xs 3xl:!text-sm rounded resize-none pr-12 focus:ring-0 focus:outline-none border border-[rgba(0,0,0,0.08)]"
            placeholder="Write a comment..."
            rows={3}
            value={newComment}
            onChange={handleCommentChange}
            onKeyPress={handleKeyPress}
          ></textarea>
          <div
            className="absolute top-2 right-2 bg-[#4F4F4F] w-10.5 h-6.5 rounded flex items-center justify-center cursor-pointer"
            onClick={handleCommentSubmit}
          >
            <CommentIcon className="!w-3.5 !h-3.5" />
          </div>
        </div>
      </div>
    </div>
  );
};
export default CommentsSection;