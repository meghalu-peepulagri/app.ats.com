import { cn } from "~/lib/utils";

const LoadingComponent = ({
  loading,
  className,
}: { loading: boolean; message?: string; className?: string }) => {
  if (!loading) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-opacity-30 z-50",
        className
      )}
    >
      <object data={"/public/loading-icon.svg"} className="w-80 h-80"></object>
    </div>
  );
};
export default LoadingComponent;