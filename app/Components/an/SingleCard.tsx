import { Calendar } from "lucide-react";

export const CandidateCountCard = ({ color, name, number, lineColor, iconBgColor }) => {
  return (
    <div className="flex items-center justify-between bg-white border !h-15 !w-100 border-gray-200 rounded-[5px] p-3 shadow-none relative">
      <div className={`absolute left-0 top-0 bottom-0 w-0.5 !h-11 mt-2 ml-3  ${lineColor} rounded`}></div>
      <div className="pl-4">
        <h4 className="text-lg-t 2xl:text-xs 3xl:!text-sm text-(--an-card-singlecard-color) font-(--an-card-singlecard-weight)">{name}</h4>
        <p className={`text-sm 2xl:text-base 3xl:!text-lg text-(-an-card-singlecard-count-color) font-(--an-card-singlecard-weight) ${color}`}>{number}</p>
      </div>
      <div className={`${iconBgColor} rounded-full p-2`}>
        <Calendar className="w-5 h-5 text-white" />
      </div>
    </div>
  );
};
