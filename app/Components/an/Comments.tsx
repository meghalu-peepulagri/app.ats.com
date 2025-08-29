import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { ProfileIcon } from "../icons/Profile";
const CardComponent = ({ name, avatar, msg }) => {
  return (
    <Card className="w-full !gap-0.5 !pt-2 pb-2  !px-0 max-w-md shadow-none border-none  bg-[#F4F7FC]">
      <CardHeader className="flex items-center gap-2 !px-2 ">
        <Avatar>
           <ProfileIcon/> 
        </Avatar>
         <div className="flex items-center gap-3">
          <h3 className="text-sm font-medium">{name}</h3>
          <p className="text-xs text-gray-500">
            {new Date().toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" })}
          </p>
        </div>
      </CardHeader>
      <CardContent className="px-10">
        <p className="text-sm">{msg}</p>
      </CardContent>
    </Card>
  );
};

export default CardComponent;