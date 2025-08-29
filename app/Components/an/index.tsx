import { useState } from "react";
import {
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginBackGroundIcon } from "../icons/loginbackground";
import { PeepulAgriIcon } from "../icons/Peepulagri";

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginCard({ onLogin, isLoading = false, error = "" }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    const errors: ValidationErrors = {};
    
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

  const handleLoginClick = (e: React.FormEvent) => {
    e.preventDefault();
    
    const errors = validateForm();
    setValidationErrors(errors);
    
    if (Object.keys(errors).length === 0) {
      onLogin({ email, password });
    }
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      <LoginBackGroundIcon />
      <div className="absolute inset-0 grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center lg:justify-items-start">
        <div className="w-full max-w-sm px-6 lg:pl-12 xl:pl-16 2xl:pl-24">
          <div className="space-y-4 max-h-[80vh] flex flex-col justify-center">
            <div className="flex justify-center lg:justify-start mb-2">
              <PeepulAgriIcon className="w-16 h-16 lg:w-20 lg:h-20" />
            </div>
            <div className="text-center lg:text-left mb-4">
              <CardTitle className="text-xl lg:text-2xl 2xl:text-3xl text-(--an-card-login-color) font-(--an-card-login-color)">
                Login
              </CardTitle>
              <CardDescription className="mt-1 text-(--an-card-login-below-color) font-(--an-card-login-color) text-xs lg:text-sm">
                Please Enter Login Details Below
              </CardDescription>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLoginClick} className="space-y-3 flex-1 max-w-sm">
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white rounded-md py-2.5 px-3 w-full text-sm"
                  disabled={isLoading}
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-xs">{validationErrors.email}</p>
                )}
              </div>
              <div className="space-y-1">
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-white rounded-md py-2.5 px-3 pr-10 w-full text-sm"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs">{validationErrors.password}</p>
                )}
                <div className="flex justify-end pt-1">
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:text-[#45A845] transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>

              <div className="pt-2">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#45A845] hover:bg-[#3c903c] text-white text-sm rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Logging in...
                    </>
                  ) : (
                    "LOG IN"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}