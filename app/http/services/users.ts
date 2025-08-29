import { $fetch } from "../fetch";

export interface UserFormData {
  role: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  experience: string;
  resume_key_path?: string;
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
    file_path: string;
    file_name: string;
    upload_url?: string;
    file_key: string;
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
    role: string;
    resume_key_path: string;
    experience: string;
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
    experience?: string[];
    resume_key_path?: string[];
  };
}

export const uploadFileAPI = async (
  file: File
): Promise<FileUploadResponse> => {
  try {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileName = file.name.split(".")[0];

    const uploadConfig = await $fetch.post("/files/upload", {
      file_type: fileExtension,
      file_name: fileName,
    });

    if (uploadConfig.data.upload_url) {
      const formData = new FormData();
      formData.append("file", file);

      const uploadResponse = await fetch(uploadConfig.data.upload_url, {
        method: "PUT",
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error("Failed to upload file to storage");
      }
    }

    return uploadConfig.data;
  } catch (error) {
    throw error;
  }
};

export const createUserAPI = async (
  userData: UserFormData
): Promise<CreateUserResponse> => {
  try {
    const response = await $fetch.post("/applicants", userData);
    return response.data;
  } catch (error) {
    return {
      status: 500,
      success: false,
      message: error.message,
      data: {
        id: 0,
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        role: "",
        resume_key_path: "",
        experience: "",
        created_at: "",
      },
    };
  }
};
