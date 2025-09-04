import { cn } from "~/lib/utils";

const LoadingComponent = ({
  loading,
  message,
  className,
}: { loading: boolean; message?: string; className?: string }) => {
  if (!loading) return null;
  return (
    <div
      role="alert"
      aria-live="assertive"
      className={cn(
        "absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-80 z-50",
        className
      )}
    >
      {/* <object data="public/loading-icon.svg" type="svg" ></object> */}
      <img src="/public/loading-icon.svg" alt="loading" />
    </div>
  );
};
export default LoadingComponent;