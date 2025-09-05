import { cn } from "../utils";

const LoadingComponent = ({
  loading,
  className,
}: { loading: boolean; message?: string; className?: string }) => {
  if (!loading) return null;
  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur">
    //   <div className="flex flex-col items-center justify-center gap-8">
    //   <object data={"/loading-icon.svg"} className="w-80 h-80"></object>
    //   </div>
    // </div>
    <div
    role="alert"
    aria-live="assertive"
    className={cn(
      "absolute inset-0 flex flex-col items-center justify-center bg-opacity-80 z-50",
      className
    )}
  >
    <object data={"/loading-icon.svg"} className="w-80 h-80"></object>
  </div>
  );
};
export default LoadingComponent;