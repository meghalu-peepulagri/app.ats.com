import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function ResumeCard() {
  const [resumeFileName, setResumeFileName] = useState("Caroline Smith"); // Initial placeholder
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // For PDF preview
  const [fileInputKey, setFileInputKey] = useState(Date.now()); // Key to reset file input

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setResumeFileName(file.name);
      if (file.type === "application/pdf") {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);
      } else {
        setPreviewUrl(null); // Clear preview for non-PDF files
        alert("Preview is only supported for PDF files.");
      }
      setFileInputKey(Date.now()); // Reset input
    }
  };

  return (
    <Card className="w-full sticky top-0 z-10 bg-white shadow-md rounded-lg">
      <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
        <CardTitle className="text-sm font-semibold text-gray-700">
          Resume 1/2 | - 100%
        </CardTitle>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon" aria-label="Download">
            {/* <DownloadIcon className="h-5 w-5" /> */}
          </Button>
          <Button variant="ghost" size="icon" aria-label="Print">
            {/* <PrintIcon className="h-5 w-5" /> */}
          </Button>
          <Button variant="ghost" size="icon" aria-label="More options">
            {/* <MoreVerticalIcon className="h-5 w-5" /> */}
          </Button>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        {previewUrl ? (
          <div className="w-full">
            <iframe
              src={previewUrl}
              title="Resume Preview"
              className="w-full h-64 border border-gray-300 rounded-md"
            />
          </div>
        ) : (
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium text-gray-900">{resumeFileName}</span>
            <input
              key={fileInputKey}
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
              id="resume-upload"
            />
            <Button
              variant="outline"
              size="sm"
              onClick={() => document.getElementById("resume-upload")?.click()}
              className="text-sm"
            >
              Upload Resume
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
