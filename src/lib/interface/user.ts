export interface UploadedFile {
    name: string;
    size: string;
    type: string;
  }
  
  export interface UserFormData {
    role: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    experience: string;
    resume_key_path?: string;
  }
  
  export interface AddUserCardProps {
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
    message?: string;
    roleList?: string[];
    onAddRole: (role: string) => void;
    isAdding?: boolean;
  }