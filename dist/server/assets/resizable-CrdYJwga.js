import { jsx } from "react/jsx-runtime";
import { c as cn } from "./utils-H80jjgLf.js";
import { GripVerticalIcon } from "lucide-react";
import * as ResizablePrimitive from "react-resizable-panels";
const getStatusColor = (status) => {
  switch (status) {
    case "SCREENED":
      return {
        bg: "bg-[rgba(130,0,222,0.10)]",
        text: "text-[#8200DE]"
      };
    case "REJECTED":
      return {
        bg: "bg-red-100",
        text: "text-red-800"
      };
    case "JOINED":
      return {
        bg: "bg-[rgba(0,130,54,0.10)]",
        text: "text-[#008236]"
      };
    case "HIRED":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-800"
      };
    case "APPLIED":
      return {
        bg: "bg-cyan-100",
        text: "text-cyan-800"
      };
    case "SCHEDULE_INTERVIEW":
    case "SCHEDULE INTERVIEW":
      return {
        bg: "bg-yellow-100",
        text: "text-yellow-800"
      };
    case "INTERVIEWED":
      return {
        bg: "bg-pink-100",
        text: "text-pink-800"
      };
    case "PIPELINE":
      return {
        bg: "bg-orange-100",
        text: "text-orange-800"
      };
    case "NOT YET RESPONDED":
    case "NOT_YET_RESPONDED":
      return {
        bg: "bg-red-100",
        text: "text-red-800"
      };
    default:
      return {
        bg: "bg-gray-100",
        text: "text-gray-800"
      };
  }
};
function Skeleton({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "skeleton",
      className: cn("bg-accent animate-pulse rounded-md", className),
      ...props
    }
  );
}
function ResizablePanelGroup({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelGroup,
    {
      "data-slot": "resizable-panel-group",
      className: cn(
        "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
        className
      ),
      ...props
    }
  );
}
function ResizablePanel({
  ...props
}) {
  return /* @__PURE__ */ jsx(ResizablePrimitive.Panel, { "data-slot": "resizable-panel", ...props });
}
function ResizableHandle({
  withHandle,
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    ResizablePrimitive.PanelResizeHandle,
    {
      "data-slot": "resizable-handle",
      className: cn(
        "bg-border focus-visible:ring-ring relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-offset-1 focus-visible:outline-hidden data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 data-[panel-group-direction=vertical]:after:-translate-y-1/2 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        className
      ),
      ...props,
      children: withHandle && /* @__PURE__ */ jsx("div", { className: "bg-border z-10 flex h-4 w-3 items-center justify-center rounded-xs border", children: /* @__PURE__ */ jsx(GripVerticalIcon, { className: "size-2.5" }) })
    }
  );
}
export {
  ResizablePanelGroup as R,
  Skeleton as S,
  ResizablePanel as a,
  ResizableHandle as b,
  getStatusColor as g
};
