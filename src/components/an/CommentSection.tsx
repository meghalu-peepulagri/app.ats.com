import { useEffect, useState } from "react";
import { Avatar } from "../ui/avatar";
import { Card, CardContent } from "../ui/card";
import { CommentIcon } from "../icons/Commenticon";
import { MessageIcon } from "../icons/MessageIcon";
import { ProfileIcon } from "../icons/Profile";

const CardComponent = ({ name, msg, time } : {name: string, msg: string, time: string}) => {
  return (
    <Card className="w-full !gap-0.5 !pt-2 pb-2 rounded-lg !px-0 max-w-md shadow-none border-none bg-[#F4F7FC] mb-4">
      <CardContent className="flex flex-col gap-0 px-1 py-0 ">
      <div className="flex items-center gap-3">
      <Avatar>
          <ProfileIcon/>
        </Avatar>
          <h3 className="text-[15px] 3xl:!text-lg text-normal text-[#181616]">{name}</h3>
          <p className="text-xs 3xl:!text-sm text-[#828282] font-(--an-card-comments-weight)">
            {time}
          </p>
        </div>
        <p className="text-xs 3xl:!text-sm text-[#4F4F4F] font-(--an-card-comments-weight) pl-10">{msg}</p>
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
    <div className="w-[50%]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MessageIcon />
          <span className="text-xs 2xl:text-sm 3xl:!text-base font-(--an-card-comments-weight) text-(--an-card-comments-color)">Comments <span className="bg-black text-white rounded-full !px-2 ml-3 !py-0 ">{commentList.length}</span></span>
        </div>
      </div>
      <div className="h-[calc(100vh-300px)] overflow-y-auto ">
        {commentList.map((comment, index) => (
          <CardComponent
            key={index}
            name={comment.name}
            time={comment.time}
            msg={comment.msg} 
          />
        ))}
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