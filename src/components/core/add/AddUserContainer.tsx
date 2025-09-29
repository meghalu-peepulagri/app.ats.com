import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
import React, { useEffect, useState } from "react";
import {
  addUserRoleAPI,
  createUserAPI,
  getListRolesAPI,
  updateUserAPI,
  uploadFileAPI,
  uploadTos3,
} from "~/http/services/users";
import { AddUserCard } from "../../an/AddUser";
import { getApplicantById } from "~/http/services/applicants";
import { UserFormData } from "~/lib/interface/user";
import { useRouter } from "@tanstack/react-router";
import { toast } from "sonner";

export const AddUserContainer: React.FC = () => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const search = useSearch({ strict: false }) as any;
  const router = useRouter();
  const isEditMode = "id" in search && !!search.id;
  const candidate = (routerState.location.state as any)?.candidate;

  const [formData, setFormData] = useState<UserFormData>({
    role_id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "+91",
    experience: null,
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
  const [addRoleMessage, setAddRoleMessage] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const getRecentRoleId = (): number | null => {
    const recentRoleId = localStorage.getItem("recentRoleId");
    const selectedAt = localStorage.getItem("recentRoleSelectedAt");
    if (selectedAt) {
      const daysSinceSelection = (Date.now() - Number(selectedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceSelection > 30) {
        localStorage.removeItem("recentRoleId");
        localStorage.removeItem("recentRoleSelectedAt");
        return null;
      }
    }
    return recentRoleId ? Number(recentRoleId) : null;
  };

  const {
    data: userData,
    isLoading: isLoadingUser,
    refetch,
  } = useQuery({
    queryKey: ["user", search.id],
    queryFn: () => getApplicantById(search.id),
    enabled: isEditMode && !!search?.id,
  });

  useEffect(() => {
    if (userData && isEditMode) {
      setFormData({
        role_id: userData?.data?.role_id ?? 0,
        first_name: userData?.data?.first_name ?? "",
        last_name: userData?.data?.last_name ?? "",
        email: userData?.data?.email ?? "",
        phone: userData?.data?.phone ?? "",
        experience: userData?.data?.experience ?? null,
        resume_key_path: userData?.data?.resume_key_path ?? "",
      });

      if (userData?.data?.resume_key_path) {
        const fileName = userData.data.resume_key_path
          .split("/")
          .pop()
          .replace(/_.*/g, "");
        setUploadedFile({
          name: fileName ?? "Uploaded Resume",
          size: userData.resume_file_size ?? "",
          type: userData.resume_file_type ?? "PDF",
        });
      }
    }
  }, [userData, isEditMode]);

  useEffect(() => {
    if (candidate && !userData) {
      setFormData({
        role_id: candidate.role_id ?? undefined,
        first_name: candidate.first_name ?? "",
        last_name: candidate.last_name ?? "",
        email: candidate.email ?? "",
        phone: candidate.phone ?? "",
        experience: candidate.experience ?? null,
        resume_key_path: candidate.resume_key_path ?? "",
      });

      if (candidate.resume_key_path) {
        setUploadedFile({
          name: candidate.resume_file_name ?? "Uploaded Resume",
          size: candidate.resume_file_size ?? "",
          type: candidate.resume_file_type ?? "PDF",
        });
      }
    }
  }, [candidate, userData]);

  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    },
  });

  const rolesList = roles?.data?.map((role: any) => ({
    id: role.id,
    name: role.role,
  }));

  useEffect(() => {
    if (!isEditMode && !candidate && roles?.data) {
      const recentRoleId = getRecentRoleId();
      if (recentRoleId) {
        const roleExists = roles.data.some((role: any) => role.id === recentRoleId);
        if (!roleExists) {
          localStorage.removeItem("recentRoleId");
          localStorage.removeItem("recentRoleSelectedAt");
        }
      }
    }
  }, [roles, isEditMode, candidate]);
  const fileUploadMutation = useMutation({
    mutationFn: uploadFileAPI,
    onSuccess: async (data, file) => {
      try {
        const targetUrl = data?.data?.data?.target_url;
        if (!targetUrl) throw new Error("No presigned URL found");

        await uploadTos3({ url: targetUrl, file });

        const fileKey = data?.data?.data?.file_key;
        setFormData((prev) => ({
          ...prev,
          resume_key_path: fileKey,
        }));
        setMessage("");
      } catch (error: any) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: [error.message || "Failed to upload to S3"],
        }));
        setUploadedFile(null);
        setFormData((prev) => ({ ...prev, resume_key_path: "" }));
        setMessage(error.message || "Failed to upload to S3");
      }
    },
    onError: (error: any) => {
      const apiError =
        error?.data.errors?.file_type ||
        error?.data.message ||
        "File upload failed. Please try again.";
      setErrors((prev) => ({
        ...prev,
        resume_key_path: [apiError],
      }));
      setUploadedFile(null);
      setFormData((prev) => ({ ...prev, resume_key_path: "" }));
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
      if (error.data.status === 422 && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        setMessage(error.data.message);
      }
    },
  });

  const { mutateAsync: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (formData: UserFormData) => updateUserAPI(search.id, formData),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["applicants"] });
      await queryClient.refetchQueries({ queryKey: ["stats"] });
      navigate({ to: "/applicants" });
      refetch();
    },
    onError: (error: any) => {
      if (error.data.status === 422 && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        setMessage(error?.data.message);
      }
    },
  });

  const { mutateAsync: addRole, isPending: isAdding } = useMutation({
    mutationFn: (role: string) => addUserRoleAPI(role),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["roles"] });
      setAddRoleMessage(null);
      setDialogOpen(false);
    },
    onError: (error: any) => {
      setAddRoleMessage(
        error.data.message || "Failed to add role. Please try again."
      );
    },
  });

  const handleAddRole = async (role: string) => {
    try {
      const newRoleResponse = await addRole(role);
      const newRole = newRoleResponse?.data;
      if (newRole?.id) {
        setFormData((prev) => ({
          ...prev,
          role_id: newRole.id,
        }));
        setErrors((prev) => ({ ...prev, role_id: [] }));
        localStorage.setItem("recentRoleId", String(newRole.id));
        localStorage.setItem("recentRoleSelectedAt", Date.now().toString());
      }
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
      const allowedTypes = ["pdf", 'doc', 'docx'];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: ["Only PDF, DOC, and DOCX files are allowed."],
        }));
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: ["File size exceeds 5MB limit."],
        }));
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
    if (fileInput) fileInput.value = "";
  };

  const handleFormChange = (data: Partial<UserFormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
      if (data.role_id) {
      localStorage.setItem("recentRoleId", String(data.role_id));
      localStorage.setItem("recentRoleSelectedAt", Date.now().toString());
    }
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: [] }));
      }
    });
  };

  const handleSave = () => {
    const normalizedPhone = formData.phone.startsWith("+91") ? formData.phone.replace(/^\+91/, "") : `+91${formData.phone.replace(/^\+?91/, "")}`;
    const payload = {
      ...formData,
      phone: normalizedPhone,
    };
    if (isEditMode) {
      updateUser(payload);
    } else {
      createUser(payload);
    }
  };

  const handleBackNavigate = () => {
      router.history.back();
  };
  
  const isLoading = fileUploadMutation.isPending;

  return (
    <div className="mt-4">
      <AddUserCard
        formData={formData}
        uploadedFile={uploadedFile}
        errors={errors}
        setErrors={setErrors}
        isSubmitting={isCreating || isUpdating}
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
        isEdit={isEditMode}
        addRoleMessage={addRoleMessage ?? ""}
        setAddRoleMessage={setAddRoleMessage}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};
