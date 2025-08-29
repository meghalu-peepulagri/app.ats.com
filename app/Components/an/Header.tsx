import { Card, CardContent } from "@/components/ui/card";
import { BellIcon } from "../icons/BellIcon";
import { PeepulAgriIcon } from "../icons/Peepulagri";
import { DropdownIcon } from "../icons/Dropdown";
import { ProfileIcon } from "../icons/Profile";

interface HeaderCardProps {
  adminrole: string;
  adminName: string;
}
export function Header({
  adminrole,
  adminName,
}: HeaderCardProps) {
  return (
    <Card
      className="!gap-0 w-full !py-0 border-none bg-gray-100 shadow-none rounded-none ">
      <CardContent className="flex items-center justify-between px-5">
        <div className="flex items-center text-sm 2xl:text-base 3xl:!text-lg font-(--an-card-font-weight) text-(--an-card-email-color) leading-(--an-card-line-height) space-x-2">
          <PeepulAgriIcon className="w-17 h-17" />
        </div>
        <div className="flex items-center space-x-3">
          <BellIcon className="!w-5 !h-5" />
          <div className="flex items-center space-x-2">
            <ProfileIcon/> 
            <div className="flex items-center space-x-2 leading-tight">
              <div>
                <p className="text-xs 2xl:text-sm 3xl:!text-base text-(--text-admin-color)">
                  {adminName}
                </p>
                <p className="text-lg-t 2xl:text-xs 3xl:!text-xs text-(--an-card-email-color)">
                  {adminrole}
                </p>
              </div>
              <DropdownIcon />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}