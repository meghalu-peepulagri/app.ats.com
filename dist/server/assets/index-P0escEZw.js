import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import Cookies from "js-cookie";
import { $ as $fetch, B as Button } from "./button-r8v9fEsh.js";
import { b as CardTitle, c as CardDescription } from "./card-C_27feJs.js";
import { I as Input } from "./input-C0QjszdI.js";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import { P as PeepulAgriIcon } from "./Peepulagri-BxK9--yh.js";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
const loginAPI = async ({ email, password }) => {
  try {
    const response = await $fetch.post("/auth/login", { email, password });
    return response.data;
  } catch (err) {
    throw err;
  }
};
function LoginCard({ onLogin, isLoading = false, error = "", clearError }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const validateForm = () => {
    const errors = {};
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!password) {
      errors.password = "Password is required";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    return errors;
  };
  const handleLoginClick = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setValidationErrors(errors);
    if (Object.keys(errors).length === 0) {
      onLogin({ email, password });
    }
  };
  const handleEmailChange = (value) => {
    setEmail(value);
    if (validationErrors.email) {
      setValidationErrors((prev) => ({ ...prev, email: void 0 }));
    }
    if (error && clearError) clearError();
  };
  const handlePasswordChange = (value) => {
    setPassword(value);
    if (validationErrors.password) {
      setValidationErrors((prev) => ({ ...prev, password: void 0 }));
    }
    if (error && clearError) clearError();
  };
  return /* @__PURE__ */ jsx("div", { className: "relative overflow-hidden h-screen w-full bg-[url('/Login.webp')] bg-cover bg-fixed bg-no-repeat", children: /* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid grid-cols-2 items-center justify-items-center", children: /* @__PURE__ */ jsx("div", { className: "w-full max-w-sm px-6", children: /* @__PURE__ */ jsxs("div", { className: "space-y-4 flex flex-col justify-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex justify-start mb-2", children: /* @__PURE__ */ jsx(PeepulAgriIcon, { className: "w-30 h-30 3xl:!w-24 3xl:!h-24" }) }),
    /* @__PURE__ */ jsxs("div", { className: "text-center lg:text-left mb-6", children: [
      /* @__PURE__ */ jsx(CardTitle, { className: "text-3xl 3xl:text-4xl text-[#000] font-normal", children: "Login" }),
      /* @__PURE__ */ jsx(CardDescription, { className: "mt-1 text-xs 3xl:text-sm text-[#333]", children: "Please Enter Login Details Below" })
    ] }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleLoginClick, className: "space-y-5 flex-1 max-w-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsx(
          Input,
          {
            id: "email",
            type: "email",
            placeholder: "Email",
            value: email,
            onChange: (e) => handleEmailChange(e.target.value),
            className: "bg-white rounded-md py-2.5 px-3 w-full text-sm h-12",
            disabled: isLoading
          }
        ),
        validationErrors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: validationErrors.email })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsx(
            Input,
            {
              id: "password",
              type: showPassword ? "text" : "password",
              placeholder: "Password",
              value: password,
              onChange: (e) => handlePasswordChange(e.target.value),
              className: "bg-white rounded-md py-2.5 px-3 pr-10 w-full text-sm !h-12",
              disabled: isLoading
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => setShowPassword(!showPassword),
              className: "absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700",
              disabled: isLoading,
              children: showPassword ? /* @__PURE__ */ jsx(EyeOff, { size: 20 }) : /* @__PURE__ */ jsx(Eye, { size: 20 })
            }
          )
        ] }),
        validationErrors.password && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: validationErrors.password })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "text-red-600 text-sm", children: error }),
      /* @__PURE__ */ jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsx(
        Button,
        {
          type: "submit",
          disabled: isLoading,
          className: "w-full py-2.5 bg-[#45A845] hover:bg-[#3c903c] h-12 text-white text-base 3xl:!text-lg rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer",
          children: isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
            /* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
            "Logging in..."
          ] }) : "LOG IN"
        }
      ) })
    ] })
  ] }) }) }) });
}
function LoginContainer() {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mutate: login, isPending: isLoadingPhone } = useMutation({
    mutationFn: ({ email, password }) => {
      const response = loginAPI({ email, password });
      return response;
    },
    onSuccess: (response) => {
      if (response?.success) {
        if (response?.data?.access_token) {
          Cookies.set("token", response?.data?.access_token);
        }
        if (response?.data?.user) {
          Cookies.set("user_data", JSON.stringify(response.data.user));
          if (response.data.user.name) {
            Cookies.set("name", response.data.user.name);
          }
          if (response.data.user.user_type) {
            Cookies.set("user_type", response.data.user.user_type);
          }
        }
        navigate({ to: "/applicants" });
        setError("");
      }
    },
    onError: (err) => {
      setError(
        err?.data?.errData?.email?.[0] || err?.message || "Something went wrong"
      );
    }
  });
  return /* @__PURE__ */ jsx(
    LoginCard,
    {
      onLogin: login,
      isLoading: isLoadingPhone,
      error,
      clearError: () => setError("")
    }
  );
}
const SplitComponent = LoginContainer;
export {
  SplitComponent as component
};
