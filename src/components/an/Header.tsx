import { Card, CardContent } from "../ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { PeepulAgriIcon } from "src/components/icons/Peepulagri";
import { BellIcon } from "src/components/icons/BellIcon";
import { ProfileIcon } from "src/components/icons/Profile";
import { DropdownIcon } from "src/components/icons/Dropdown";

interface HeaderCardProps {
  adminrole: string;
  adminName: string;
  onLogout: () => void
}
export function Header({
  adminrole,
  adminName,
  onLogout
}: HeaderCardProps) {
  return (
    <Card
      className="!gap-0 w-full !py-0 border-none bg-gray-100 shadow-none rounded-none ">
      <CardContent className="flex items-center justify-between !px-5 p-0">
        <div className="flex items-center text-sm 2xl:text-base 3xl:!text-lg font-(--an-card-font-weight) text-(--an-card-email-color) leading-(--an-card-line-height) space-x-2">
          <PeepulAgriIcon className="w-12 h-12" />
        </div>
         <div className="flex items-center gap-2 m-2 rounded-sm">
        <div className="relative group">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-3">
          <BellIcon className="!w-5 !h-5" />
          <div className="flex items-center space-x-2">
            <ProfileIcon className="w-8 h-8"/> 
            <div className="flex items-center space-x-2 leading-tight">
              <div>
                <p className="text-[13px] 3xl:!text-sm text-[#333]">
                  {adminName}
                </p>
                <p className="text-[11px] 3xl:!text-xs text-[#444C5E]">
                  {adminrole}
                </p>
              </div>
              <DropdownIcon />
            </div>
          </div>
        </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="min-w-32 border-none shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-sm p-1"
              >
                  <DropdownMenuItem onClick={onLogout}>
                    <div className="flex items-center gap-2">
                      <LogOut className="text-red-600 w-4 h-4" strokeWidth={1.5}/>
                      <p className="text-sm 3xl:!text-base font-normal text-gray-600">
                        logout
                      </p>
                      </div>
                  </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}