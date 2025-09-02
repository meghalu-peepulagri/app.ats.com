import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { BackIcon } from "../icons/BackIcon";
import { UploadIcon } from "../icons/uploadicon";
import { TrashIcon } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

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
      <Card className="w-full bg-white shadow-none rounded-lg p-0 pt-3">
        <CardContent className="!px-4">
          <div className="!px-0 flex flex-col gap-2">
            <div className="space-y-0.75">
              <Label
                htmlFor="role"
                className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
              >
                Role
              </Label>
              <Select
                value={formData?.role ?? ''}
                onValueChange={(value) => handleInputChange('role', value)}
              >
                <SelectTrigger
                  id="role"
                  className="w-78 !h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"
                >
                  <SelectValue placeholder="Please select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Manufacturing Engineer">Manufacturing Engineer</SelectItem>
                  <SelectItem value="IOT  & Robotics">IOT  & Robotics</SelectItem>
                  <SelectItem value="EV">EV</SelectItem>
                  <SelectItem value="Product design">Product design</SelectItem>
                  <SelectItem value="Hardware">Hardware</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-red-500 text-xs">{errors.role}</p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="text-[#A05148] font-medium text-base 3xl:!text-lg">
                Personal & Contact Details
              </h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-0.75">
                  <Label
                    htmlFor="firstName"
                    className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
                    >
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    placeholder="First name of candidate"
                    value={formData.first_name}
                    onChange={(e) => handleInputChange('first_name', e.target.value)}
                    className="!h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"                    
                    disabled={loading}
                  />
                  {errors.first_name && (
                    <p className="text-red-500 text-xs">{errors.first_name}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="lastName"
                    className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
                    >
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    placeholder="Last name of candidate"
                    value={formData.last_name}
                    onChange={(e) => handleInputChange('last_name', e.target.value)}
                    className="!h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"                    
                    disabled={loading}
                  />
                  {errors.last_name && (
                    <p className="text-red-500 text-xs">{errors.last_name}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="email"
                    className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
                    >
                    Email ID
                  </Label>
                  <Input
                    id="email"
                    placeholder="Enter email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="!h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"                    
                    disabled={loading}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs">{errors.email}</p>
                  )}
                </div>
                <div className="space-y-0.75">
                  <Label
                    htmlFor="mobile"
                    className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
                    >
                    Mobile Number
                  </Label>
                  <Input
                    id="mobile"
                    placeholder="Enter mobile number"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="!h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"                   
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
                className="text-sm 3xl:!text-base text-[#333] font-medium"
              >
                Experience
              </Label>
              <Input
                id="experience"
                placeholder="Enter candidate experience"
                value={formData.experience}
                onChange={(e) => handleInputChange('experience', e.target.value)}
                className="w-78 !h-7.75 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"              
                disabled={loading}
              />
              {errors.experience && (
                <p className="text-red-500 text-xs">{errors.experience}</p>
              )}
            </div>

            <div className="space-y-0.75">
              <h3 className="text-[#A05148] font-medium text-base 3xl:!text-lg">
                Attachments
              </h3>
              <div className="space-y-0.75">
                <Label
                  htmlFor="upload"
                className="text-sm 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500"
                >
                  Upload Document
                </Label>
                
                {!uploadedFile ? (
                  <div 
                  className="relative flex items-center justify-center h-18 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0"              
                  >
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="file-upload"
                      disabled={loading}
                    />
                    <span className="mr-3 text-sm 3xl:!text-base text-[#828282] font-normal flex items-center justify-center gap-2">
                      <UploadIcon className="!w-3.5 !h-3.5" />
                      <span className="text-sm 3xl:!text-base text-[#828282] font-medium">Drop files to attach or</span>
                    <span className="text-[#4F4F4F] font-normal ml-2 cursor-pointer text-sm 3xl:!text-base border border-[#E0E0E0] px-2 rounded py-0.5">
                      Browse
                    </span>
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
          className="text-sm 3xl:!text-base px-3 h-8 text-[#4F4F4F] rounded-sm font-normal border border-[rgba(0,0,0,0.21)] shadow-none cursor-pointer"
          onClick={handleBackNavigate}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          className="text-sm 3xl:!text-base bg-[#05A155] px-3 h-8 text-white rounded-sm hover:bg-[#05A155] shadow-none font-light cursor-pointer"
          onClick={onSave}
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? 'Adding User...' : 'Add User'}
        </Button>
      </div>
    </div>
  );
}