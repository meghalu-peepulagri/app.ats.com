import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useNavigate } from '@tanstack/react-router';
import {
  createUserAPI,
  uploadFileAPI,
  CreateUserResponse,
  UserFormData,
  UserErrorResponse,
} from '@/app/http/services/users';
import { AddUserCard } from '../../an/AddUser';

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
      const fileKey = data?.data?.file_key; 
      setFormData((prev) => ({
        ...prev,
        resume_key_path: fileKey,
      }));
      toast.success('File uploaded successfully!');
    },
    onError: (error: any) => {
      toast.error(error?.message || 'File upload failed');
      setErrors((prev) => ({
        ...prev,
        resume_key_path: [error?.message || 'File upload failed'],
      }));
    },
  });

  

  const { mutateAsync: createUser, isPending } = useMutation({
    mutationFn: (formData: UserFormData) => createUserAPI(formData),
  
    onSuccess: (data) => {
      toast.success("User created successfully!");
      navigate({ to: "/applicants" });
    },
  
    onError: (error: any) => {
      if (error.status === 422) {
        toast.error(error.message || "Failed to create user");
        if (error.errors) setErrors(error.errors);
      } else {
        toast.error(error.message || "Something went wrong");
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
        toast.error('Please upload a PDF, DOC, or DOCX file');
        return;
      }

      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('File size should be less than 5MB');
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