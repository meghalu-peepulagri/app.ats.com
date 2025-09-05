import { FileUploadResponse, UserFormData } from "~/lib/interface/user";
import { $fetch } from "../fetch";

export const uploadFileAPI = async (
  file: File
): Promise<FileUploadResponse> => {
  try {
    const fileExtension = file.name.split(".").pop()?.toLowerCase();
    const fileName = file.name.split(".")[0];

    const data = await $fetch.post("/files/upload", {
      file_type: fileExtension,
      file_name: fileName,
    });

    const { target_url } = data.data.data;
    if (!target_url) {
      throw new Error("Presigned URL is missing");
    }
    return {
      ...data,
      message: data.message || "File uploaded successfully",
    };
  } catch (error) {
    throw error;
  }
};

export const uploadTos3 = async ({ url, file }: { url: string; file: File }) => {
  try {
    const response = await uploadToS3API(url, file);
    if (!response.ok) {
      throw new Error("Failed to upload file to storage");
    }
  } catch (error) {
    throw error;
  }
};

export const uploadToS3API = async (url: string, file: File) => {
  try {
    const options = {
      method: "PUT",
      body: file,
    };
    return await fetch(url, options);
  } catch (err) {
    throw err;
  }
};

export const getDownloadUrlAPI = async ({ file_key }: { file_key: string }) => {
  try {
    const response = await $fetch.post(`/files/download`, {
      file_key,
    });
    return response;
  } catch (err) {
    throw err;
  }
};

export const createUserAPI = async (userData: UserFormData) => {
  try {
    const response = await $fetch.post("/applicants", userData);
    if (!response.success) {
      throw {
        status: response.status,
        message: response.data?.message || response.message || "Request failed",
        errors: response.data?.errors,
      };
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const updateUserAPI = async (id: number, userData: UserFormData) => {
  try {
    const response = await $fetch.patch(`/applicants/${id}`, userData);
    if (!response.success) {
      throw {
        status: response.status,
        message: response.data?.message || response.message || "Request failed",
        errors: response.data?.errors,
      };
    }
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addUserRoleAPI = async(role: string) => {
  try {
    const response = await $fetch.post("/roles", {role});
    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getListRolesAPI = async () => {
  try {
    const response = await $fetch.get("/roles");
    return response.data;
  } catch (error) {
    throw error;
  }
};
