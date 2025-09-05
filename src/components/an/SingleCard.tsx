export const CandidateCountCard = ({ name, number, lineColor, iconBgColor, icon } : { name: string, number: string, lineColor: string, iconBgColor: string, icon: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-between bg-white border !h-14 w-65 border-gray-200 rounded-[5px] p-3 shadow-none relative">
      <div className={`absolute left-0 top-0 bottom-0 !h-9 mt-2 ml-3 border-2 ${lineColor} rounded`}></div>
      <div className="pl-4">
        <h4 className="text-sm 3xl:!text-base text-[#444D5E] font-normal overflow-hidden text-ellipsis leading-[120%] py-0">{name}</h4>
        <p className="text-lg 3xl:!text-xl text-[#0E0E0E] font-normal">{number}</p>
      </div>
      <div className={`${iconBgColor} rounded-full p-2`}>
        {icon}
      </div>
    </div>
  );
};
