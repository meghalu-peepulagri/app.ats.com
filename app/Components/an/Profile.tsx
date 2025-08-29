import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useMemo, useState } from "react";
import { EmailIcon } from "../icons/Email";
import { PhoneIcon } from "../icons/Phone";
import { getStatusColor } from "@/app/lib/helper/getColorStatus";

export default function Profile({
  avatarImg,
  name,
  email,
  phone,
  jobTitle,
  applyTime,
  resumeOptions,
  value,
  downloadUrl,
  resume_key_path
}) {
  const [status, setStatus] = useState(value);

  useEffect(() => {
    setStatus(value);
  }, [value]);

  const pdfSrc = useMemo(() => {
    if (downloadUrl) {
      return downloadUrl; 
    } else if (resume_key_path) {
      return `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${resume_key_path}`;
    }
    return null;
  }, [downloadUrl, resume_key_path]);

  return (
    <div className="border rounded-lg p-2 w-[80%]">
    <Card className="w-full !pt-1 pb-2 bg-[#F8F8F8] shadow-none rounded-lg gap-0 border-none">
      <CardHeader className="p-1 shadow-[0px_0px_11px_rgba(0,0,0,0.12)] bg-white rounded-md mx-1">
        <div className="flex justify-between bg-white  rounded-[5px] items-center px-1">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#2F6846] rounded-full flex items-center justify-center text-white font-normal text-sm 3xl:text-base">
              {avatarImg}
            </div>
            <CardTitle className="text-sm 3xl:!text-base text-(--an-card-profile-color) font-(--an-card-profile-font-weight)">
              {name}
            </CardTitle>
          </div>
          <CardDescription className="text-sm !pb-0 text-gray-500">
            <span className="flex items-center text-lg 2xl:text-xs 3xl:!text-sm text-(--an-card-profile-email-color) font-(--an-card-profile-font-weight)">
              <EmailIcon />
              {email}
            </span>
            <span className="flex items-center mt-1 text-lg 2xl:text-xs 3xl:!text-sm text-(--an-card-profile-email-color) font-(--an-card-profile-font-weight)">
              <PhoneIcon />
              {phone}
            </span>
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="p-2">
        <div className="flex justify-between items-center">
          <p className="text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-(--an-card-profile-font-weight)">
            Applied Job
          </p>
          <p className="text-[13px] 3xl:!text-base  text-[#454545] font-(--an-card-profile-font-weight)">
            {applyTime}
          </p>
        </div>
        <div className="flex  justify-between items-center mt-2">
          <p className="text-base 3xl:!text-lg text-[#454545] font-(--an-card-profile-font-weight)">
            {jobTitle}
          </p>
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className={`px-3 rounded border-none !h-8 w-45 text-sm 3xl:!text-base  font-(--an-card-profile-font-weight) focus:ring-0 focus-visible:ring-0 ${getStatusColor(status.toUpperCase()).bg} ${getStatusColor(status.toUpperCase()).text}`}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
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
    <div className="border rounded-t-md bg-[#F9F9F9] mt-2">
        <div className="bg-white border-t">
          {pdfSrc ? (
            <div className="relative">
              <iframe
                src={`${pdfSrc}`}
                className="w-150 h-100 border-none"
                title="Resume PDF"
                onLoad={() => {
                  console.log("PDF loaded");
                }}
              />
            </div>
          ) : (
            <div className="h-96 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <p className="mb-2">No resume available</p>
                <p className="text-sm">PDF will be displayed here when available</p>
              </div>
            </div>
          )}
        </div>
    </div>
    </div>
  );
}
