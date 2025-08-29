export type LoginPageProps = {
  step: "login" | "otp";
  setStep: React.Dispatch<React.SetStateAction<"login" | "otp">>;
  phoneNumber: string;
  setPhoneNumber: (val: string) => void;
  error: string;
  setError: (val: string) => void;
  otp: string;
  setOtp: (val: string) => void;
  otpError: string;
  setOtpError: (val: string) => void;
  onSubmitPhone: () => void;
  onSubmitOtp: () => void;
  isLoadingPhone: boolean;
  isLoadingOtp: boolean;
};
