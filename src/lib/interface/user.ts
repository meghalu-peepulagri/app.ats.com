export interface UploadedFile {
    name: string;
    size: string;
    type: string;
  }
  
  export interface UserFormData {
    role_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    experience: number;
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
    isEdit?: boolean;
    addRoleMessage?: string;
    setAddRoleMessage?: React.Dispatch<React.SetStateAction<string | null>>
    dialogOpen: boolean;
    setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
  }

  export interface FileUploadPayload {
    file_type: string;
    file_name: string;
  }
  
  export interface FileUploadResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
      data: {
        file_path: string;
        file_name: string;
        upload_url?: string;
        file_key: string;
      };
    };
  }
  
  export interface CreateUserResponse {
    status: number;
    success: boolean;
    message: string;
    data: {
      id: number;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      role_id: number;
      resume_key_path: string;
      experience: number;
      created_at: string;
    };
  }
  
  export interface UserErrorResponse {
    status: number;
    success: false;
    message: string;
    errData: {
      role?: string[];
      first_name?: string[];
      last_name?: string[];
      email?: string[];
      phone?: string[];
      experience?: number;
      resume_key_path?: string[];
    };
  }