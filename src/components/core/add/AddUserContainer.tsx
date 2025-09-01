import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import React, { useState } from 'react';
import { AddUserCard } from '../../an/AddUser';
import { createUserAPI, uploadFileAPI, uploadToS3API, UserFormData, } from '~/http/services/users';

export const AddUserContainer: React.FC = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<UserFormData>({
    role: '',
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    experience: '',
    resume_key_path: '',
  });

  const [uploadedFile, setUploadedFile] = useState<{
    name: string;
    size: string;
    type: string;
  } | null>(null);

  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [fileInput, setFileInput] = useState<File | null>(null);

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
      setErrors((prev) => ({
        ...prev,
        resume_key_path: [error?.message || 'File upload failed'],
      }));
    },
  });

  const uploadToS3 = async ({ url, file } : { url: string; file: File }) => {
    try { 
      const response = await uploadToS3API(url, file);
      if(!response.ok) {
        throw new Error("Failed to upload file to storage");
      }
    }
    catch (error) {
      throw error;
    }
  };

  const { mutateAsync: createUser, isPending } = useMutation({
    mutationFn: (formData: UserFormData) => createUserAPI(formData),
  
    onSuccess: () => {
      navigate({ to: "/applicants" });
    },
    onError: (error: any) => {
      if (error.status === 422) {
        if (error.errors) setErrors(error.errors);
      }
    },
  });
  

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ['pdf', 'doc', 'docx'];
      const fileExtension = file.name.split('.').pop()?.toLowerCase();

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
    setFileInput(null);
    setFormData((prev) => ({ ...prev, resume_key_path: '' }));
    setErrors((prev) => ({ ...prev, resume_key_path: [] }));

    const fileInput = document.getElementById(
      'file-upload'
    ) as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
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
    navigate({ to: '/applicants' });
  };

  const isLoading =
    fileUploadMutation.isPending 

  return (
    <div className='mt-4'>
    <AddUserCard
      formData={formData}
      uploadedFile={uploadedFile}
      errors={errors}
      isSubmitting={isPending}
      onChange={handleFormChange}
      onSave={handleSave}
      handleBackNavigate={handleBackNavigate}
      handleFileUpload={handleFileUpload}
      handleDeleteFile={handleDeleteFile}
      loading={isLoading}
    />
    </div>
  );
};