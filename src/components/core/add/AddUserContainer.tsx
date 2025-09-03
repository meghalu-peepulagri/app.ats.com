import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import React, { useState } from "react";
import {
  addUserAPI,
  createUserAPI,
  getListRolesAPI,
  uploadFileAPI,
  UserFormData,
} from "~/http/services/users";
import { AddUserCard } from "../../an/AddUser";

export const AddUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    role: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    experience: "",
    resume_key_path: "",
  });
  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [message, setMessage] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);
  const queryClient = useQueryClient();

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    },
  });

  const rolesList = roles?.data?.map((role: any) => role.role);

  const fileUploadMutation = useMutation({
    mutationFn: uploadFileAPI,
    onSuccess: (data) => {
      const fileKey = data?.data?.data?.file_key;
      setFormData((prev) => ({
        ...prev,
        resume_key_path: fileKey,
      }));
    },
    onError: (error: any) => {
      setMessage(error?.message);
      setErrors((prev) => ({
        ...prev,
        resume_key_path: [error?.message || "File upload failed"],
      }));
    },
  });

  const { mutateAsync: createUser, isPending: isCreating } = useMutation({
    mutationFn: (formData: UserFormData) => createUserAPI(formData),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["applicants"] });
      await queryClient.refetchQueries({ queryKey: ["stats"] });
      navigate({ to: "/applicants" });
    },
    onError: (error: any) => {
      if (error.status === 422) {
        if (error.errors) setErrors(error.errors);
      } else {
        setMessage(error?.message);
      }
    },
  });

  const { mutateAsync: addRole, isPending: isAdding } = useMutation({
    mutationFn: (role: string) => addUserAPI({ role }),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["roles"] });
    },
  })

  const handleAddRole = async (role: string) => {
    try {
      await addRole(role);
      setFormData((prev) => ({ ...prev, role }));
    } catch (error) {
      console.error("Failed to add role", error);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        return;
      }
      setFileInput(file);
      setUploadedFile({
        name: file.name,
        size: formatFileSize(file.size),
        type: fileExtension.toUpperCase(),
      });
      setErrors((prev) => ({ ...prev, resume_key_path: [] }));
      fileUploadMutation.mutate(file);
    }
  };

  const handleDeleteFile = () => {
    setUploadedFile(null);
    setFormData((prev) => ({ ...prev, resume_key_path: "" }));
    setErrors((prev) => ({ ...prev, resume_key_path: [] }));

    const fileInput = document.getElementById(
      "file-upload"
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = "";
    }
  };

  const handleFormChange = (data: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: [] }));
      }
    });
  };
  const handleSave = () => {
    createUser(formData);
  };

  const handleBackNavigate = () => {
    navigate({ to: "/applicants" });
  };

  const isLoading = fileUploadMutation.isPending || isCreating;

  return (
    <div className="mt-4">
      <AddUserCard
        formData={formData}
        uploadedFile={uploadedFile}
        errors={errors}
        isSubmitting={isCreating}
        onChange={handleFormChange}
        onSave={handleSave}
        handleBackNavigate={handleBackNavigate}
        handleFileUpload={handleFileUpload}
        handleDeleteFile={handleDeleteFile}
        loading={isLoading}
        message={message}
        roleList={rolesList}
        onAddRole={handleAddRole}
        isAdding={isAdding}
      />
    </div>
  );
};
