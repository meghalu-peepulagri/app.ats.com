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
import { useEffect, useMemo, useRef, useState } from "react";
import { EmailIcon } from "../icons/Email";
import { PhoneIcon } from "../icons/Phone";
import { getStatusColor } from "~/lib/helper/getColorStatus";
import { renderAsync } from  'docx-preview';
import { Button } from "../ui/button";
import { Download } from "lucide-react";

interface ProfileProps {
  avatarImg: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  applyTime: string;
  updatedTime: string | null;
  updatedBy: string | null;
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
  updatedTime,
  updatedBy,
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
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [fileType, setFileType] = useState<"pdf" | "docx" | "unknown">("unknown");

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

  useEffect(() => {
    if (!pdfSrc) return;
    if (pdfSrc.toLowerCase().includes(".pdf")) {
      setFileType("pdf");
    } else if (pdfSrc.toLowerCase().includes(".docx")) {
      setFileType("docx");
    } else {
      fetch(pdfSrc, { method: "HEAD" })
        .then((res) => {
          const type = res.headers.get("content-type");
          if (type?.includes("pdf")) setFileType("pdf");
          else if (type?.includes("word")) setFileType("docx");
          else setFileType("unknown");
        })
        .catch(() => setFileType("unknown"));
    }
  }, [pdfSrc]);

  useEffect(() => {
    if (fileType === "docx" && pdfSrc && docxContainerRef.current) {
      fetch(pdfSrc)
        .then((res) => res.blob())
        .then((blob) => renderAsync(blob, docxContainerRef.current!, undefined, { className: "docx-preview" }))
        .catch((err) => console.error("DOCX render error:", err));
    }
  }, [fileType, pdfSrc]);

  const handleDownload = () => {
    if (!pdfSrc) {
      console.error("No document URL provided");
      return;
    }
    const link = document.createElement("a");
    link.href = pdfSrc;
    link.download = `${name.replace(/\s+/g, "_")}_resume.${fileType === "pdf" ? "pdf" : "docx"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="border rounded-lg p-2">
      <Card className="w-full bg-[#F8F8F8]  shadow-none rounded-lg gap-0 border-none">
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
            <div className="flex items-center gap-2">
            <p className="text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
              Applied On
            </p>
            <p className="text-[13px] 3xl:!text-base  text-[#454545] font-normal">
              {applyTime}
            </p>
            </div>
            <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
            <p className="text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
              Updated On
            </p>
            <p className="text-[13px] 3xl:!text-base  text-[#454545] font-normal">
              {updatedTime}
            </p>
            </div>
            <div className="flex items-center gap-2">
            <p className="text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal">
              Updated By
            </p>
            <p className="text-[13px] 3xl:!text-base  text-[#454545] font-normal">
              {updatedBy}
            </p>
            </div>
            </div>
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
                {roleOptions?.map((role : any) => (
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
                {resumeOptions?.map((option, index) => (
                  <SelectItem key={index} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="border rounded-t-md bg-zinc-50 mt-1">
        <div className="bg-white border-t">
        {pdfSrc && (
            <div className="relative h-[calc(100vh-288px)] overflow-auto">
              {fileType === "pdf" ? (
                <iframe
                  src={pdfSrc}
                  className="w-full h-full border-none"
                  title="Resume PDF"
                />
              ) : fileType === "docx" ? (
                <div className="relative w-full h-full">
                  <Button
                    onClick={handleDownload}
                    className="absolute top-1 right-8 bg-transparent p-2 shadow-none hover:bg-transparent cursor-pointer"
                    title="Download Resume"
                  >
                    <Download strokeWidth={2} className="!w-5 !h-5"/>
                  </Button>
                  <div
                    ref={docxContainerRef}
                    className="docx-container w-full h-full p-2 bg-white overflow-auto"
                  />
                </div>
              ) : (
                <p className="text-center text-gray-500 mt-4">
                  Unsupported file format
                </p>
              )}
        </div>
        )}
        </div>
      </div>
    </div>
  );
}
