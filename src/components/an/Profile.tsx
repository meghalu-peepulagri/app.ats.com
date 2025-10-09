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
import { renderAsync } from "docx-preview";
import { Button } from "../ui/button";
import { Download, Minus, Plus } from "lucide-react";
import { ProfileProps } from "~/lib/interface/user";

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
  const [roles, setRoles] = useState(roleValue ?? "");
  const docxContainerRef = useRef<HTMLDivElement>(null);
  const [fileType, setFileType] = useState<"pdf" | "docx" | "unknown">(
    "unknown"
  );
  const [zoomLevel, setZoomLevel] = useState(90);

  useEffect(() => {
    if (status !== statusValue) setStatus(statusValue);
    if (roles !== roleValue) setRoles(roleValue ?? "");
  }, [statusValue, roleValue]);

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
        .then((blob) =>
          renderAsync(blob, docxContainerRef.current!, undefined, {
            className: "docx-preview",
          })
        )
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

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 10));
  };

  return (
    <div className="border rounded-lg p-1.5">
      <Card className="w-full bg-[#F8F8F8] shadow-none rounded-lg gap-0 border-none">
        <CardHeader className="p-1 shadow-[0px_0px_11px_rgba(0,0,0,0.12)] bg-white rounded-md mx-1">
          <div className="flex justify-between bg-white rounded-[5px] items-center px-1">
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
            <Select value={roles} onValueChange={handleRolesChange}>
              <SelectTrigger className="px-3 rounded border border-black/30 shadow-none !h-8 w-45 text-sm 3xl:!text-base font-normal focus:ring-0 focus-visible:ring-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="max-h-[250px] overflow-y-auto">
                {roleOptions?.map((role: any) => (
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
      <div className="border rounded-t-md mt-1 bg-neutral-700">
        {fileType === "pdf" && pdfSrc ? (
          <iframe
            src={pdfSrc}
            className="w-full h-[calc(100vh-275px)] border-none bg-black"
            title="Resume PDF"
          />
        ) : fileType === "docx" ? (
          <div className="relative bg-neutral-700">
            <div className="flex items-center justify-end gap-2">
              <div className="flex items-center gap-2">
                <Button
                  onClick={handleZoomOut}
                  className="bg-transparent shadow-none hover:bg-gray-700 cursor-pointer rounded-full !p-1 h-7"
                  title="Zoom Out"
                >
                  <Minus strokeWidth={2} className="!w-5 !h-5 text-white" />
                </Button>
                <span className="text-white text-sm">{zoomLevel}%</span>
                <Button
                  onClick={handleZoomIn}
                  className="bg-transparent shadow-none hover:bg-gray-700 cursor-pointer rounded-full !p-1 h-7"
                  title="Zoom In"
                >
                  <Plus strokeWidth={2} className="!w-5 !h-5 text-white" />
                </Button>
              </div>
              <Button
                onClick={handleDownload}
                className="bg-transparent p-2 shadow-none hover:bg-gray-700 cursor-pointer"
                title="Download Resume"
              >
                <Download strokeWidth={2} className="!w-5 !h-5 text-white" />
              </Button>
            </div>

            <div
              className={`docx-scroll-wrapper overflow-auto bg-zinc-300 flex ${
                zoomLevel < 100 ? "justify-center" : "justify-start"
              }`}
              style={{ height: "calc(100vh - 320px)" }}
            >
              <div
                ref={docxContainerRef}
                className="docx-container transition-all duration-200 w-full"
                style={{
                  transform: `scale(${zoomLevel / 100})`,
                  transformOrigin: zoomLevel < 100 ? "top center" : "top left",
                }}
              />
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-300 py-8">
            Unsupported file format
          </p>
        )}
      </div>
    </div>
  );
}
