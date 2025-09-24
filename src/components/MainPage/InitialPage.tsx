import { CommentIcon } from "../icons/CommentsIcon";
import { MessageIcon } from "../icons/MessageIcon";
import { NoCommentIcon } from "../icons/NoCommentIcon";
import { NoResumeIcon } from "../icons/NoResumeIcon";

export function InitialPage() {
  return (
    <div className="flex items-center justify-around">
      <div className="w-full h-full border rounded-md flex items-center justify-center">
      <div className="flex flex-col items-center justify-center p-1">
        <NoResumeIcon />
        <p className="text-sm 3xl:!text-base text-[#828282] font-normal">
          Please select a applicant to continue
        </p>
      </div>
      </div>
      <div className="w-[50%] h-full pl-2">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <MessageIcon />
          <span className="text-xs 2xl:text-sm 3xl:!text-base font-normal text-[#000]">Comments <span className="bg-black text-white rounded-full px-3 ml-3 py-0 text-xs 3xl:!text-sm">0</span></span>
        </div>
      </div>
      <div className="h-[calc(100vh-260px)] overflow-y-auto gap-1 flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center">
          <NoCommentIcon />
          <p className="text-xs 3xl:!text-sm text-[#828282] font-normal">No comments to display</p>
          </div>
      </div>
      <div className="mt-4 flex items-center gap-4">
        <div className="relative w-full">
          <textarea
            className="w-full p-2 h-20 bg-[#EFEFF1] placeholder:text-[#828282] font-(--an-card-comments-weight) text-xs 3xl:!text-sm rounded resize-none pr-12 focus:ring-0 focus:outline-none border border-[rgba(0,0,0,0.08)]"
            placeholder="Write a comment..."
            rows={3}
           
          ></textarea>
          <div
            className="absolute top-2 right-2 bg-[#4F4F4F] w-10.5 h-6.5 rounded flex items-center justify-center cursor-pointer"
          >
            <CommentIcon className="!w-3.5 !h-3.5" />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
