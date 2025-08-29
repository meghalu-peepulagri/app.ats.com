import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { BackIcon } from "../icons/BackIcon";
import { UploadIcon } from "../icons/uploadicon";
import { TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface UploadedFile {
  name: string;
  size: string;
  type: string;
}

interface UserFormData {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  experience: string;
  resume_key_path?: string;
}

interface AddUserCardProps {
  formData: UserFormData;
  uploadedFile: UploadedFile | null;
  errors: Record<string, string[]>;
  isSubmitting: boolean;
  onChange: (data: Partial<UserFormData>) => void;
  onSave: () => void;
  handleBackNavigate: () => void;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteFile: () => void;
  loading?: boolean;
}

export function AddUserCard({
  formData = {
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    experience: '',
    resume_key_path: '',
  },
  uploadedFile,
  errors,
  isSubmitting,
  onChange,
  onSave,
  handleBackNavigate,
  handleFileUpload,
  handleDeleteFile,
  loading = false,
}: AddUserCardProps) {
  const fileName = uploadedFile?.name ?? '';
  const isLong = fileName?.length > 20;

  const handleInputChange = (field: keyof UserFormData, value: string) => {
    onChange({ [field]: value });
  };

  return (
    <div className="w-full max-w-2xl h-full mx-auto">
      <CardTitle className="!px-0 text-gray-700 flex items-center mb-2">
        <button
          className="mr-3 text-sm 2xl:text-base 3xl:!text-lg cursor-pointer"
          onClick={handleBackNavigate}
        >
          <BackIcon className="!w-7 !h-7" />
        </button>
        <div className="text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)]">
          Add User
        </div>
      </CardTitle>
      <Card className="w-full bg-white !gap-0 !shadow-none rounded-lg p-0 !py-0">
        <CardHeader></CardHeader>
        <CardContent className="!px-4">
          <div className="space-y-4 !px-0 h-110">
            <div className="space-y-0.75">
              <Label
                htmlFor="role"
                className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)]"
              >
                Role
              </Label>
              <Select
                value={formData?.role ?? ''}
                onValueChange={(value) => handleInputChange('role', value)}
              >
                <SelectTrigger
                  id="role"
                  className="w-77 !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-sm placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                >
                  <SelectValue placeholder="Please select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Product Design">Product Design</SelectItem>
                  <SelectItem value="Developer">Developer</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="QA">QA</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role[0]}</p>
              )}
            </div>

            <div className="space-y-0">
              <h3 className="text-[var(--an-card-adduser-personal-color)] font-[var(--an-card-font-weight)] text-sm 2xl:text-base 3xl:!text-lg">
                Personal & Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.75">
                  <Label
                    htmlFor="firstName"
                    className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)] after:content-['_*'] after:text-red-500"
                  >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name of candidate"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="w-full !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-xs 2xl:text-sm 3xl:!text-base placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                    disabled={loading}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs">{errors.first_name[0]}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="lastName"
                    className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)] after:content-['_*'] after:text-red-500"
                  >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name of candidate"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="w-full !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-xs 2xl:text-sm 3xl:!text-base placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                    disabled={loading}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs">{errors.last_name[0]}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="email"
                    className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)] after:content-['_*'] after:text-red-500"
                  >
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-xs 2xl:text-sm 3xl:!text-base placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="mobile"
                    className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)] after:content-['_*'] after:text-red-500"
                  >
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="w-full !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-xs 2xl:text-sm 3xl:!text-base placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                    disabled={loading}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="space-y-0.75">
              <Label
                htmlFor="experience"
                className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)]"
              >
                Experience
              </Label>
              <Input
                id="experience"
                placeholder="Enter candidate experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-77 !h-7.75 bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] text-xs 2xl:text-sm 3xl:!text-base placeholder:text-[var(--an-card-adduser-placeholder-color)] text-[var(--an-card-adduser-color)] font-[var(--an-card-adduser-placeholder-weight)]"
                disabled={loading}
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-0.75">
              <h3 className="text-sm 2xl:text-base 3xl:!text-lg text-[var(--an-card-adduser-personal-color)] font-[var(--an-card-font-weight)]">
                Attachments
              </h3>
              <div className="space-y-0.75">
                <Label
                  htmlFor="upload"
                  className="text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-color)] font-[var(--an-card-font-weight)] after:content-['_*'] after:text-red-500"
                >
                  Upload Document
                </Label>
                
                {!uploadedFile ? (
                  <div className="flex h-15 items-center justify-center w-full bg-[var(--an-card-adduser-bg-color)] border-none rounded-[5px] p-2 text-sm text-gray-500 relative">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="file-upload"
                      disabled={loading}
                    />
                    <span className="mr-3 text-xs 2xl:text-sm 3xl:!text-base text-[var(--an-card-adduser-drop-color)] font-[var(--an-card-font-weight)]">
                      <UploadIcon className="!w-3.5 !h-3.5" />
                    </span>
                    Drop files to attach or
                    <span className="text-[var(--an-card-adduser-browser-color)] font-[var(--an-card-font-weight)] ml-3 cursor-pointer text-xs 2xl:text-sm 3xl:!text-base border border-gray-200 px-2 rounded py-0.5">
                      Browse
                    </span>
                  </div>
                ) : (
                  <Card className="bg-white border border-gray-200 rounded p-3 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div>
                          <TooltipProvider>
                            {isLong ? (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <p className="text-sm font-medium text-gray-900 cursor-help">
                                    {fileName.slice(0, 20)}...
                                  </p>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{fileName}</p>
                                </TooltipContent>
                              </Tooltip>
                            ) : (
                              <p className="text-sm font-medium text-gray-900">
                                {fileName}
                              </p>
                            )}
                          </TooltipProvider>
                          <p className="text-xs text-gray-500">
                            {uploadedFile.type} - {uploadedFile.size}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={handleDeleteFile}
                        className="p-2 bg-red-100 rounded border border-red-200 transition-colors hover:bg-red-200"
                        disabled={loading}
                      >
                        <TrashIcon className="w-4 h-4" />
                      </button>
                    </div>
                  </Card>
                )}
                
                {errors.resume_key_path && (
                  <p className="text-red-500 text-xs">{errors.resume_key_path}</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
        {errors && (
          <p className="text-red-500 text-xs">{errors.message}</p>
        )}
      </Card>
      
      <div className="flex justify-end gap-2 mt-4 w-full max-w-2xl">
        <Button
          variant="outline"
          className="text-xs 2xl:text-sm 3xl:!text-base !px-3 !h-8 text-[var(--an-card-adduser-browser-color)] rounded-[5px] font-[var(--an-card-font-weight)]"
          onClick={handleBackNavigate}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="text-xs 2xl:text-sm 3xl:!text-base bg-[var(--an-card-adduser-bg-color1)] !px-3 !h-8 text-[var(--an-card-adduser-adduser-color)] rounded-[5px] hover:bg-green-600"
          onClick={onSave}
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? 'Adding User...' : 'Add User'}
        </Button>
      </div>
    </div>
  );
}