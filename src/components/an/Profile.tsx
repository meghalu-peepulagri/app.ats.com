import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useEffect, useMemo, useState } from "react";
import { EmailIcon } from "../icons/Email";
import { PhoneIcon } from "../icons/Phone";
import { getStatusColor } from "~/lib/helper/getColorStatus";
import { NoResumeIcon } from "../icons/NoResumeIcon";

interface ProfileProps {
  avatarImg: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  applyTime: string;
  resumeOptions: string[];
  roleOptions: string[];
  statusValue: string;
  roleValue: string;
  downloadUrl?: string;
  resume_key_path?: string;
  onStatusChange?: (newStatus: string) => void;
  onRoleChange?: (newRoles: string) => void;
}

export default function Profile({
  avatarImg,
  name,
  email,
  phone,
  applyTime,
  resumeOptions,
  statusValue,
  roleValue,
  downloadUrl,
  resume_key_path,
  onStatusChange,
  onRoleChange,
  roleOptions,
}: ProfileProps) {
  const [status, setStatus] = useState(statusValue);
  const [roles, setRoles] = useState(roleValue ?? '');

  useEffect(() => {
    setStatus(statusValue);
  }, [statusValue]);

  useEffect(() => {
    setRoles(roleValue);
  }, [roleValue]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };

  const handleRolesChange = (newRole: string) => {
    setRoles(newRole);
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };

  const pdfSrc = useMemo(() => {
    let src = null;
    if (downloadUrl) {
      src = downloadUrl;
    } else if (resume_key_path) {
      src = `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${resume_key_path}`;
    }
    return src;
  }, [downloadUrl, resume_key_path]);

  return (
    <div className="border rounded-lg p-2 w-[90%]">
      <Card className="w-full bg-[#F8F8F8] shadow-none rounded-lg gap-0 border-none">
        <CardHeader className="p-1 shadow-[0px_0px_11px_rgba(0,0,0,0.12)] bg-white rounded-md mx-1">
          <div className="flex justify-between bg-white  rounded-[5px] items-center px-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#2F6846] rounded-full flex items-center justify-center text-white font-normal text-sm 3xl:text-base">
                {avatarImg}
              </div>
              <CardTitle className="text-sm 3xl:!text-base text-(--an-card-profile-color) font-normal">
                {name}
              </CardTitle>
            </div>
            <CardDescription className="text-sm !pb-0 text-gray-500">
              <span className="flex items-center text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
                <EmailIcon />
                {email}
              </span>
              <span className="flex items-center mt-1 text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
                <PhoneIcon />
                {phone}
              </span>
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-2 py-1">
          <div className="flex justify-between items-center">
            <p className="text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
              Applied Job
            </p>
            <p className="text-[13px] 3xl:!text-base  text-[#454545] font-normal">
              {applyTime}
            </p>
          </div>
          <div className="flex  justify-between items-center mt-1">
            <Select
              value={roles}
              onValueChange={handleRolesChange}
            >
              <SelectTrigger className="px-3 rounded border border-black/30 shadow-none !h-8 w-45 text-sm 3xl:!text-base font-normal focus:ring-0 focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                {roleOptions.map((role : any) => (
                  <SelectItem key={role.id} value={String(role.id)}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={status} onValueChange={handleStatusChange}>
              <SelectTrigger
                className={`px-3 rounded border-none !h-8 w-45 text-sm 3xl:!text-base  font-normal focus:ring-0 focus-visible:ring-0 ${getStatusColor(status.toUpperCase()).bg} ${getStatusColor(status.toUpperCase()).text}`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                {resumeOptions.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="border rounded-t-md bg-[#F9F9F9] mt-1">
        <div className="bg-white border-t">
          {pdfSrc ? (
            <div className="relative h-[calc(100vh-263px)]">
              <iframe
                src={`${pdfSrc}`}
                className="w-full h-full border-none"
                title="Resume PDF"
                onLoad={() => {
                  console.log("PDF loaded successfully");
                }}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[calc(100vh-263px)]">
              <NoResumeIcon />
              <p className="text-sm 3xl:!text-base text-[#828282] font-normal">
                No Resume
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
