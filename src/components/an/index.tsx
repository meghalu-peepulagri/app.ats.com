import { useState } from "react";
import {
  CardDescription,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { LoginBackGroundIcon } from "src/components/icons/loginbackground";
import { PeepulAgriIcon } from "src/components/icons/Peepulagri";

interface ValidationErrors {
  email?: string;
  password?: string;
}

export default function LoginCard({ onLogin, isLoading = false, error = "" } : any) {
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
    <div className="relative overflow-hidden h-screen w-full bg-[url('/Login.webp')] bg-cover bg-fixed bg-no-repeat">
       <div className="absolute inset-0 grid grid-cols-2 items-center justify-items-center">
        <div className="w-full max-w-sm px-6">
          <div className="space-y-4 flex flex-col justify-center">
            <div className="flex justify-start mb-2">
              <PeepulAgriIcon className="w-30 h-30 3xl:!w-24 3xl:!h-24" />
            </div>
            <div className="text-center lg:text-left mb-6">
              <CardTitle className="text-2xl 3xl:text-3xl text-[#000]">
                Login
              </CardTitle>
              <CardDescription className="mt-1 text-xs 3xl:text-sm text-[#333]">
                Please Enter Login Details Below
              </CardDescription>
            </div>
            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-600 text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleLoginClick} className="space-y-5 flex-1 max-w-sm">
              <div className="space-y-1">
                <Input
                  id="email"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white rounded-md py-2.5 px-3 w-full text-sm h-12"
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
                    className="bg-white rounded-md py-2.5 px-3 pr-10 w-full text-sm !h-12"
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs">{validationErrors.password}</p>
                )}
                {/* <div className="flex justify-end pt-1">
                  <a
                    href="#"
                    className="text-xs text-gray-500 hover:text-[#45A845] transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div> */}
              </div>

              <div className="pt-2">
                <Button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 bg-[#45A845] hover:bg-[#3c903c] h-12 text-white text-base 3xl:!text-lg rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
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