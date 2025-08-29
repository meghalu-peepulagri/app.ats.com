import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { loginAPI } from "@/app/http/services/auth";
import LoginCard from "../../an";

interface ApiErrorResponse {
  data?: {
    errData?: {
      email?: string[];
    };
  };
  message?: string;
}

interface LoginResponse {
  success: boolean;
  data?: {
    access_token?: string;
    user?: {
      name?: string;
      user_type?: string;
    }
  }
}

export function LoginContainer() {
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { mutate: login, isPending: isLoadingPhone } = useMutation<
    LoginResponse,
    ApiErrorResponse,
    { email: string; password: string }
  >({
    mutationFn: ({ email, password }) => {
      const response = loginAPI({ email, password });
      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        if (response?.data?.access_token) {
          Cookies.set('token', response?.data?.access_token);
        }
        if (response?.data?.user) {
          Cookies.set('user_data', JSON.stringify(response.data.user));
          
          if (response.data.user.name) {
            Cookies.set('name', response.data.user.name);
          }
          if (response.data.user.user_type) {
            Cookies.set('user_type', response.data.user.user_type);
          }
        }
        navigate({ to: '/applicants' });
        setError("");
      }
    },
    onError: (err) => {
        setError(
        err?.data?.errData?.email?.[0] || err?.message || "Something went wrong"
      );
    },
  });

  return (
    <LoginCard
      onLogin={login}
      isLoading={isLoadingPhone}
      error={error}
    />
  );
}