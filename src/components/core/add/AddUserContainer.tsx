  import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
  import { useNavigate, useRouterState, useSearch } from "@tanstack/react-router";
  import React, { useEffect, useState } from "react";
  import {
    addUserRoleAPI,
    createUserAPI,
    getListRolesAPI,
    updateUserAPI,
    uploadFileAPI,
  } from "~/http/services/users";
  import { AddUserCard } from "../../an/AddUser";
  import { getApplicantById } from "~/http/services/applicants";
  import { UserFormData } from "~/lib/interface/user";

  export const AddUserContainer: React.FC = () => {
    const navigate = useNavigate();
    const routerState = useRouterState();
    const search = useSearch({ strict: false }) as any;

    const isEditMode = 'id' in search && !!search.id;
    const candidate = (routerState.location.state as any)?.candidate;

    const [formData, setFormData] = useState<UserFormData>({
      role_id: 0,
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      experience: 0,
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

    const { data: userData, isLoading: isLoadingUser } = useQuery({
      queryKey: ["user", search.id],
      queryFn: () => getApplicantById(search.id ),
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
          experience: userData?.data?.experience,
          resume_key_path: userData?.data?.resume_key_path ?? "",
        });

        if (userData?.data?.resume_key_path) {
          setUploadedFile({
            name: userData.resume_file_name ?? "Uploaded Resume",
            size: userData.resume_file_size ?? "",
            type: userData.resume_file_type ?? "PDF",
          });
        }
      }
    }, [userData, isEditMode]);
    console.log(userData, 'userData');

    useEffect(() => {
      if (candidate && !userData) {
        setFormData({
          role_id: candidate.role_id ?? undefined,
          first_name: candidate.first_name ?? "",
          last_name: candidate.last_name ?? "",
          email: candidate.email ?? "",
          phone: candidate.phone ?? "",
          experience: candidate.experience,
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
    console.log(candidate,'candidate');

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
        if (error.status === 422 && error.errors) {
          setErrors(error.errors);
        } else {
          setMessage(error?.message);
        }
      },
    });

    const { mutateAsync: updateUser, isPending: isUpdating } = useMutation({
      mutationFn: (formData: UserFormData) =>
        updateUserAPI(search.id, formData),
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ["applicants"] });
        await queryClient.refetchQueries({ queryKey: ["stats"] });
        navigate({ to: "/applicants" });
      },
      onError: (error: any) => {
        if (error.status === 422 && error.errors) {
          setErrors(error.errors);
        } else {
          setMessage(error?.message);
        }
      },
    });

    const { mutateAsync: addRole, isPending: isAdding } = useMutation({
      mutationFn: (role:string) => addUserRoleAPI(role),
      onSuccess: async () => {
        await queryClient.refetchQueries({ queryKey: ["roles"] });
        setAddRoleMessage(null);
      setDialogOpen(false);
      },
      onError: (error: any) => {
        console.log(error);
        setAddRoleMessage(
          error.message || "Failed to add role. Please try again."
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
        const allowedTypes = ["pdf", "doc", "docx"];
        const fileExtension = file.name.split(".").pop()?.toLowerCase();
        if (!fileExtension || !allowedTypes.includes(fileExtension)) return;

        const maxSize = 5 * 1024 * 1024;
        if (file.size > maxSize) return;

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

      const fileInput = document.getElementById("file-upload") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
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
      if (isEditMode) {
        updateUser(formData);
      } else {
        createUser(formData);
      }
    };

    const handleBackNavigate = () => {
      navigate({ to: "/applicants" });
    };

    const isLoading = fileUploadMutation.isPending || isCreating || isUpdating || isLoadingUser;

    return (
      <div className="mt-4">
        <AddUserCard
          formData={formData}
          uploadedFile={uploadedFile}
          errors={errors}
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
          addRoleMessage={addRoleMessage ?? ''}
          setAddRoleMessage={setAddRoleMessage}
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
        />
      </div>
    );
  };
