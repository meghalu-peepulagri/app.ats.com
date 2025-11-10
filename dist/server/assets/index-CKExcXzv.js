import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useNavigate, useRouterState, useSearch, useRouter } from "@tanstack/react-router";
import * as React from "react";
import { useState, useEffect } from "react";
import { c as getApplicantById, g as getListRolesAPI, u as uploadFileAPI, e as uploadTos3, f as createUserAPI, h as updateUserAPI, i as addUserRoleAPI } from "./applicants-CwxTDbvI.js";
import { XIcon, Plus, LoaderCircle, TrashIcon } from "lucide-react";
import { B as Button } from "./button-r8v9fEsh.js";
import { b as CardTitle, C as Card, a as CardContent } from "./card-C_27feJs.js";
import { I as Input } from "./input-C0QjszdI.js";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import { c as cn } from "./utils-H80jjgLf.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Drk_WKlp.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-hsd05QV0.js";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import "js-cookie";
import "@radix-ui/react-slot";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-select";
import "@radix-ui/react-tooltip";
function BackIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className,
      viewBox: "0 0 32 33",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M25.9043 17.6242C25.9043 17.4302 25.824 17.2441 25.6812 17.107C25.5383 16.9698 25.3445 16.8927 25.1424 16.8927H10.22L15.7771 11.5591C15.8478 11.4912 15.904 11.4105 15.9422 11.3217C15.9806 11.2329 16.0003 11.1378 16.0003 11.0417C16.0003 10.9456 15.9806 10.8504 15.9422 10.7616C15.904 10.6728 15.8478 10.5922 15.7771 10.5242C15.7062 10.4563 15.6222 10.4024 15.5297 10.3656C15.4372 10.3288 15.338 10.3099 15.2379 10.3099C15.1378 10.3099 15.0388 10.3288 14.9463 10.3656C14.8538 10.4024 14.7697 10.4563 14.699 10.5242L7.84197 17.1067C7.77127 17.1746 7.71504 17.2552 7.67664 17.3441C7.63839 17.4329 7.61858 17.528 7.61858 17.6242C7.61858 17.7203 7.63839 17.8154 7.67664 17.9042C7.71504 17.9931 7.77127 18.0737 7.84197 18.1416L14.699 24.724C14.8419 24.8613 15.0359 24.9384 15.2379 24.9384C15.4401 24.9384 15.6341 24.8613 15.7771 24.724C15.92 24.5869 16.0003 24.4007 16.0003 24.2067C16.0003 24.0126 15.92 23.8264 15.7771 23.6892L10.22 18.3556H25.1424C25.3445 18.3556 25.5383 18.2785 25.6812 18.1413C25.824 18.0042 25.9043 17.8181 25.9043 17.6242Z",
          fill: "black"
        }
      )
    }
  );
}
const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
);
const Label = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  LabelPrimitive.Root,
  {
    ref,
    className: cn(labelVariants(), className),
    ...props
  }
));
Label.displayName = LabelPrimitive.Root.displayName;
function Dialog({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Root, { "data-slot": "dialog", ...props });
}
function DialogPortal({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Portal, { "data-slot": "dialog-portal", ...props });
}
function DialogClose({
  ...props
}) {
  return /* @__PURE__ */ jsx(DialogPrimitive.Close, { "data-slot": "dialog-close", ...props });
}
function DialogOverlay({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Overlay,
    {
      "data-slot": "dialog-overlay",
      className: cn(
        "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50",
        className
      ),
      ...props
    }
  );
}
function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}) {
  return /* @__PURE__ */ jsxs(DialogPortal, { "data-slot": "dialog-portal", children: [
    /* @__PURE__ */ jsx(DialogOverlay, {}),
    /* @__PURE__ */ jsxs(
      DialogPrimitive.Content,
      {
        "data-slot": "dialog-content",
        className: cn(
          "bg-background data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg",
          className
        ),
        ...props,
        children: [
          children,
          showCloseButton && /* @__PURE__ */ jsxs(
            DialogPrimitive.Close,
            {
              "data-slot": "dialog-close",
              className: "ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
              children: [
                /* @__PURE__ */ jsx(XIcon, {}),
                /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Close" })
              ]
            }
          )
        ]
      }
    )
  ] });
}
function DialogHeader({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-header",
      className: cn("flex flex-col gap-2 text-center sm:text-left", className),
      ...props
    }
  );
}
function DialogFooter({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "dialog-footer",
      className: cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      ),
      ...props
    }
  );
}
function DialogTitle({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    DialogPrimitive.Title,
    {
      "data-slot": "dialog-title",
      className: cn("text-lg leading-none font-semibold", className),
      ...props
    }
  );
}
const AddRoleDialog = ({
  open,
  onOpenChange,
  onSave,
  loading,
  message
}) => {
  const [newRole, setNewRole] = useState("");
  const capitalizeWords = (value) => {
    return value.replace(/\b\w/g, (match) => match.toUpperCase());
  };
  const handleSave = () => {
    if (!newRole.trim()) return;
    onSave(newRole);
    setNewRole("");
  };
  const handleOpenChange = (isOpen) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setNewRole("");
    }
  };
  return /* @__PURE__ */ jsx(Dialog, { open, onOpenChange: handleOpenChange, children: /* @__PURE__ */ jsxs(DialogContent, { className: "sm:max-w-md", children: [
    /* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add New Position" }) }),
    /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-3", children: [
      /* @__PURE__ */ jsx(
        Input,
        {
          placeholder: "Enter new position",
          value: newRole,
          onChange: (e) => {
            const nativeEvent = e.nativeEvent;
            if (nativeEvent.inputType === "deleteContentBackward") {
              setNewRole(e.target.value.trimStart());
            } else {
              setNewRole(capitalizeWords(e.target.value.trimStart()));
            }
          },
          disabled: loading
        }
      ),
      message && /* @__PURE__ */ jsx("p", { className: "text-sm text-red-500", children: message })
    ] }),
    /* @__PURE__ */ jsxs(DialogFooter, { className: "flex justify-end gap-2 mt-4", children: [
      /* @__PURE__ */ jsx(DialogClose, { asChild: true, children: /* @__PURE__ */ jsx(Button, { variant: "outline", disabled: loading, className: "cursor-pointer", children: "Cancel" }) }),
      /* @__PURE__ */ jsx(
        Button,
        {
          onClick: handleSave,
          disabled: !newRole.trim() || loading,
          className: "bg-[#05A155] hover:bg-[#05A155] text-white cursor-pointer",
          children: loading ? "Saving..." : "Save"
        }
      )
    ] })
  ] }) });
};
function UploadIcon({ className }) {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      className,
      viewBox: "0 0 18 17",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M17.401 10.6578V16.2576C17.401 16.4433 17.3273 16.6213 17.196 16.7526C17.0647 16.8838 16.8867 16.9576 16.701 16.9576H1.30154C1.11589 16.9576 0.937852 16.8838 0.806581 16.7526C0.67531 16.6213 0.601562 16.4433 0.601562 16.2576V10.6578C0.601562 10.4722 0.67531 10.2941 0.806581 10.1628C0.937852 10.0316 1.11589 9.95782 1.30154 9.95782C1.48719 9.95782 1.66523 10.0316 1.7965 10.1628C1.92777 10.2941 2.00152 10.4722 2.00152 10.6578V15.5576H16.0011V10.6578C16.0011 10.4722 16.0748 10.2941 16.2061 10.1628C16.3373 10.0316 16.5154 9.95782 16.701 9.95782C16.8867 9.95782 17.0647 10.0316 17.196 10.1628C17.3273 10.2941 17.401 10.4722 17.401 10.6578ZM5.5014 5.05798H8.30131V10.6578C8.30131 10.8434 8.37506 11.0215 8.50633 11.1528C8.6376 11.284 8.81564 11.3578 9.00129 11.3578C9.18693 11.3578 9.36498 11.284 9.49625 11.1528C9.62752 11.0215 9.70126 10.8434 9.70126 10.6578V5.05798H12.5012C12.6397 5.05809 12.7751 5.0171 12.8903 4.94019C13.0056 4.86328 13.0954 4.75392 13.1484 4.62595C13.2014 4.49798 13.2153 4.35715 13.1882 4.2213C13.1612 4.08544 13.0944 3.96067 12.9964 3.86277L9.49652 0.362887C9.43151 0.297805 9.35431 0.246176 9.26934 0.21095C9.18436 0.175724 9.09328 0.157593 9.00129 0.157593C8.9093 0.157593 8.81821 0.175724 8.73324 0.21095C8.64826 0.246176 8.57106 0.297805 8.50605 0.362887L5.00617 3.86277C4.90816 3.96067 4.84141 4.08544 4.81435 4.2213C4.7873 4.35715 4.80116 4.49798 4.85419 4.62595C4.90721 4.75392 4.99702 4.86328 5.11223 4.94019C5.22744 5.0171 5.36288 5.05809 5.5014 5.05798Z",
          fill: "#333333"
        }
      )
    }
  );
}
function AddUserCard({
  formData,
  uploadedFile,
  errors,
  message,
  isSubmitting,
  setErrors,
  onChange,
  onSave,
  handleBackNavigate,
  handleFileUpload,
  handleDeleteFile,
  loading = false,
  roleList = [],
  isAdding,
  isEdit = false,
  addRoleMessage,
  setAddRoleMessage = () => {
  },
  onAddRole,
  dialogOpen,
  setDialogOpen
}) {
  const fileName = uploadedFile?.name ?? "";
  const isLong = fileName?.length > 20;
  const handleInputChange = (field, value) => {
    onChange({ [field]: value });
  };
  const getRecentRole = () => {
    const recentRoleId = localStorage.getItem("recentRoleId");
    if (recentRoleId) {
      return roleList.find((r) => r.id === Number(recentRoleId));
    }
    return null;
  };
  return /* @__PURE__ */ jsxs("div", { className: "w-full max-w-3xl 3xl:!max-w-4xl h-full mx-auto", children: [
    /* @__PURE__ */ jsxs(CardTitle, { className: "text-gray-700 flex items-center mb-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "mr-3 text-sm 2xl:text-base 3xl:!text-base cursor-pointer",
          onClick: handleBackNavigate,
          children: /* @__PURE__ */ jsx(BackIcon, { className: "!w-7 !h-7" })
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "text-[#000] font-normal", children: isEdit ? "Edit Applicant" : "Add Applicant" })
    ] }),
    /* @__PURE__ */ jsxs(Card, { className: "w-full bg-white shadow-none rounded-base p-0 pt-3 border border-[#D9D9D9]", children: [
      /* @__PURE__ */ jsx(CardContent, { className: "!px-4", children: /* @__PURE__ */ jsxs("div", { className: "!px-0 flex flex-col gap-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            Label,
            {
              htmlFor: "position",
              className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
              children: "Position"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxs(
              Select,
              {
                value: formData.role_id ? String(formData.role_id) : "",
                onValueChange: (value) => {
                  const roleId = Number(value);
                  onChange({ role_id: roleId });
                },
                children: [
                  /* @__PURE__ */ jsx(SelectTrigger, { className: "w-[49%] !h-9 shadow-none bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0", children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Please select position" }) }),
                  /* @__PURE__ */ jsxs(SelectContent, { className: "max-h-[250px] overflow-y-auto", children: [
                    (() => {
                      const recentRole = getRecentRole();
                      if (recentRole) {
                        return /* @__PURE__ */ jsxs(Fragment, { children: [
                          /* @__PURE__ */ jsx("div", { className: "px-2 py-1 text-xs text-gray-500 font-medium capitalize tracking-wide", children: "Recently Used" }),
                          /* @__PURE__ */ jsx(
                            SelectItem,
                            {
                              value: String(recentRole.id),
                              className: "font-medium text-blue-700 bg-blue-50 hover:bg-blue-100 border-l-2 border-blue-500",
                              children: recentRole.name
                            },
                            `recent-${recentRole.id}`
                          ),
                          /* @__PURE__ */ jsx("hr", { className: "my-2 border-t border-gray-200" }),
                          /* @__PURE__ */ jsx("div", { className: "px-2 py-1 text-xs text-gray-500 font-medium capitalize tracking-wide", children: "All Positions" })
                        ] });
                      }
                      return null;
                    })(),
                    (() => {
                      const recentRoleId = localStorage.getItem("recentRoleId");
                      return roleList.filter((role) => role.id !== Number(recentRoleId)).map((role) => /* @__PURE__ */ jsx(SelectItem, { value: String(role.id), children: role.name }, role.id));
                    })()
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsx(
              Button,
              {
                className: "bg-[#F6F6F6] hover:bg-[#F6F6F6] text-black cursor-pointer",
                onClick: () => {
                  setDialogOpen(true);
                  setAddRoleMessage("");
                  onChange({});
                  if (errors.role_id) {
                    setErrors((prev) => ({ ...prev, role_id: [] }));
                  }
                },
                children: /* @__PURE__ */ jsx(Plus, {})
              }
            )
          ] }),
          errors.role_id && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.role_id })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[#A05148] font-medium text-base 3xl:!text-lg", children: "Personal & Contact Details" }),
          /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3", children: [
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.75", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "firstName",
                  className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
                  children: "First Name"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "firstName",
                  placeholder: "First name of applicant",
                  value: formData.first_name,
                  onChange: (e) => handleInputChange(
                    "first_name",
                    e.target.value.trimStart()
                  ),
                  className: "!h-9 shadow-none bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0",
                  disabled: loading
                }
              ),
              errors.first_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.first_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.75", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "lastName",
                  className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
                  children: "Last Name"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "lastName",
                  placeholder: "Last name of applicant",
                  value: formData.last_name,
                  onChange: (e) => handleInputChange("last_name", e.target.value.trimStart()),
                  className: "!h-9 shadow-none bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0",
                  disabled: loading
                }
              ),
              errors.last_name && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.last_name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.75", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "email",
                  className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
                  children: "Email ID"
                }
              ),
              /* @__PURE__ */ jsx(
                Input,
                {
                  id: "email",
                  placeholder: "Enter email",
                  type: "email",
                  value: formData.email,
                  onChange: (e) => handleInputChange("email", e.target.value.trimStart()),
                  className: "!h-9 shadow-none bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0",
                  disabled: loading
                }
              ),
              errors.email && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.email })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "space-y-0.75", children: [
              /* @__PURE__ */ jsx(
                Label,
                {
                  htmlFor: "mobile",
                  className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
                  children: "Mobile Number"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 bg-neutral-100 rounded-md border border-neutral-100", children: [
                /* @__PURE__ */ jsx("p", { className: "border-r border-neutral-300 px-2 text-sm", children: "+91" }),
                /* @__PURE__ */ jsx(
                  Input,
                  {
                    id: "mobile",
                    placeholder: "Enter mobile number",
                    value: formData.phone.replace(/^\+91/, ""),
                    onChange: (e) => {
                      const value = e.target.value.trimStart();
                      const digitsOnly = value.replace(/\D/g, "");
                      handleInputChange("phone", digitsOnly);
                    },
                    maxLength: 10,
                    className: "!h-9 shadow-none text-sm border-none px-2 placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0",
                    disabled: loading
                  }
                )
              ] }),
              errors.phone && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.phone })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-3", children: [
            /* @__PURE__ */ jsx(
              Label,
              {
                htmlFor: "experience",
                className: "text-[15px] 3xl:!text-base text-[#333] font-medium",
                children: "Experience"
              }
            ),
            /* @__PURE__ */ jsx(
              Input,
              {
                type: "number",
                id: "experience",
                placeholder: "Enter applicant experience",
                value: formData.experience?.toString(),
                onKeyDown: (e) => {
                  if (["-", "+", "e", "E"].includes(e.key)) {
                    e.preventDefault();
                  }
                },
                onChange: (e) => handleInputChange(
                  "experience",
                  e.target.value === "" ? null : Number(e.target.value.trimStart())
                ),
                min: 0,
                className: "w-[49%] !h-9 shadow-none bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0",
                disabled: loading
              }
            ),
            errors.experience && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.experience })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h3", { className: "text-[#A05148] font-medium text-base 3xl:!text-lg", children: "Attachments" }),
          /* @__PURE__ */ jsxs("div", { className: "space-y-0.75", children: [
            /* @__PURE__ */ jsx(
              Label,
              {
                htmlFor: "upload",
                className: "text-[15px] 3xl:!text-base text-[#333] font-medium after:content-['_*'] after:text-red-500",
                children: "Upload Document"
              }
            ),
            !uploadedFile ? /* @__PURE__ */ jsxs("div", { className: "relative flex items-center justify-center h-20 bg-[#F6F6F6] border border-[#F2F2F2] rounded-[5px] text-sm placeholder:text-[#A3A3AB] text-[#333] font-normal focus:ring-0 focus-visible:ring-0", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "file",
                  accept: ".pdf,.doc,.docx",
                  onChange: handleFileUpload,
                  className: "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
                  id: "file-upload",
                  disabled: loading
                }
              ),
              /* @__PURE__ */ jsxs("span", { className: "mr-3 text-sm 3xl:!text-base text-[#828282] font-normal flex items-center justify-center gap-2", children: [
                /* @__PURE__ */ jsx(UploadIcon, { className: "!w-3.5 !h-3.5" }),
                /* @__PURE__ */ jsx("span", { className: "text-sm 3xl:!text-base text-[#828282] font-medium", children: "Drop files to attach or" }),
                /* @__PURE__ */ jsx("span", { className: "text-[#4F4F4F] font-normal ml-2 cursor-pointer text-sm 3xl:!text-base border border-[#E0E0E0] px-2 rounded py-0.5", children: "Browse" })
              ] })
            ] }) : /* @__PURE__ */ jsx(Card, { className: "bg-white border border-gray-200 rounded p-3 w-full", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(TooltipProvider, { children: isLong ? /* @__PURE__ */ jsxs(Tooltip, { children: [
                  /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: /* @__PURE__ */ jsxs("p", { className: "text-sm font-medium text-gray-900 cursor-help", children: [
                    fileName.slice(0, 40),
                    "..."
                  ] }) }),
                  /* @__PURE__ */ jsx(TooltipContent, { children: /* @__PURE__ */ jsx("p", { children: fileName }) })
                ] }) : /* @__PURE__ */ jsx("p", { className: "text-sm font-medium text-gray-900", children: fileName }) }),
                /* @__PURE__ */ jsxs("p", { className: "text-xs text-gray-500", children: [
                  uploadedFile.type,
                  " - ",
                  uploadedFile.size
                ] })
              ] }) }),
              loading ? /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(LoaderCircle, { className: "text-black animate-spin" }) }) : /* @__PURE__ */ jsx(
                "button",
                {
                  onClick: handleDeleteFile,
                  className: "p-2 bg-red-100 rounded border border-red-200 transition-colors hover:bg-red-200 cursor-pointer",
                  disabled: loading,
                  children: /* @__PURE__ */ jsx(TrashIcon, { className: "w-4 h-4" })
                }
              )
            ] }) }),
            errors.resume_key_path && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs", children: errors.resume_key_path })
          ] })
        ] })
      ] }) }),
      message && /* @__PURE__ */ jsx("p", { className: "text-red-500 text-xs pl-5 p-1", children: message })
    ] }),
    /* @__PURE__ */ jsx(
      AddRoleDialog,
      {
        open: dialogOpen,
        onOpenChange: (isOpen) => {
          setDialogOpen(isOpen);
          if (!isOpen) setAddRoleMessage("");
        },
        onSave: (roleName) => onAddRole(roleName),
        loading: isAdding,
        message: addRoleMessage
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-2 w-full p-3 pr-0", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          variant: "outline",
          className: "text-base 3xl:!text-base px-3 h-8 text-[#4F4F4F] rounded-sm font-normal border border-[rgba(0,0,0,0.21)] shadow-none cursor-pointer",
          onClick: handleBackNavigate,
          disabled: loading,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        Button,
        {
          className: "text-base 3xl:!text-base bg-[#05A155] px-6 h-8 text-white rounded-sm hover:bg-[#05A155] shadow-none font-light cursor-pointer",
          onClick: onSave,
          disabled: isSubmitting,
          children: isSubmitting ? isEdit ? "Updating..." : "Saving..." : isEdit ? "Update" : "Save"
        }
      )
    ] })
  ] });
}
const AddUserContainer = () => {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const search = useSearch({ strict: false });
  const router = useRouter();
  const isEditMode = "id" in search && !!search.id;
  const candidate = routerState.location.state?.candidate;
  const [formData, setFormData] = useState({
    role_id: null,
    first_name: "",
    last_name: "",
    email: "",
    phone: "+91",
    experience: null,
    resume_key_path: ""
  });
  const [uploadedFile, setUploadedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [fileInput, setFileInput] = useState(null);
  const queryClient = useQueryClient();
  const [addRoleMessage, setAddRoleMessage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const getRecentRoleId = () => {
    const recentRoleId = localStorage.getItem("recentRoleId");
    const selectedAt = localStorage.getItem("recentRoleSelectedAt");
    if (selectedAt) {
      const daysSinceSelection = (Date.now() - Number(selectedAt)) / (1e3 * 60 * 60 * 24);
      if (daysSinceSelection > 30) {
        localStorage.removeItem("recentRoleId");
        localStorage.removeItem("recentRoleSelectedAt");
        return null;
      }
    }
    return recentRoleId ? Number(recentRoleId) : null;
  };
  const {
    data: userData,
    isLoading: isLoadingUser,
    refetch
  } = useQuery({
    queryKey: ["user", search.id],
    queryFn: () => getApplicantById(search.id),
    enabled: isEditMode && !!search?.id
  });
  useEffect(() => {
    if (userData && isEditMode) {
      setFormData({
        role_id: userData?.data?.role_id ?? 0,
        first_name: userData?.data?.first_name ?? "",
        last_name: userData?.data?.last_name ?? "",
        email: userData?.data?.email ?? "",
        phone: userData?.data?.phone ?? "",
        experience: userData?.data?.experience ?? null,
        resume_key_path: userData?.data?.resume_key_path ?? ""
      });
      if (userData?.data?.resume_key_path) {
        const fileName = userData.data.resume_key_path.split("/").pop().replace(/_.*/g, "");
        setUploadedFile({
          name: fileName ?? "Uploaded Resume",
          size: userData.resume_file_size ?? "",
          type: userData.resume_file_type ?? "PDF"
        });
      }
    }
  }, [userData, isEditMode]);
  useEffect(() => {
    if (candidate && !userData) {
      setFormData({
        role_id: candidate.role_id ?? void 0,
        first_name: candidate.first_name ?? "",
        last_name: candidate.last_name ?? "",
        email: candidate.email ?? "",
        phone: candidate.phone ?? "",
        experience: candidate.experience ?? null,
        resume_key_path: candidate.resume_key_path ?? ""
      });
      if (candidate.resume_key_path) {
        setUploadedFile({
          name: candidate.resume_file_name ?? "Uploaded Resume",
          size: candidate.resume_file_size ?? "",
          type: candidate.resume_file_type ?? "PDF"
        });
      }
    }
  }, [candidate, userData]);
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    }
  });
  const rolesList = roles?.data?.map((role) => ({
    id: role.id,
    name: role.role
  }));
  useEffect(() => {
    if (!isEditMode && !candidate && roles?.data) {
      const recentRoleId = getRecentRoleId();
      if (recentRoleId) {
        const roleExists = roles.data.some(
          (role) => role.id === recentRoleId
        );
        if (!roleExists) {
          localStorage.removeItem("recentRoleId");
          localStorage.removeItem("recentRoleSelectedAt");
        }
      }
    }
  }, [roles, isEditMode, candidate]);
  const fileUploadMutation = useMutation({
    mutationFn: uploadFileAPI,
    onSuccess: async (data, file) => {
      try {
        const targetUrl = data?.data?.data?.target_url;
        if (!targetUrl) throw new Error("No presigned URL found");
        await uploadTos3({ url: targetUrl, file });
        const fileKey = data?.data?.data?.file_key;
        setFormData((prev) => ({
          ...prev,
          resume_key_path: fileKey
        }));
        setMessage("");
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: [error.message || "Failed to upload to S3"]
        }));
        setUploadedFile(null);
        setFormData((prev) => ({ ...prev, resume_key_path: "" }));
        setMessage(error.message || "Failed to upload to S3");
      }
    },
    onError: (error) => {
      const apiError = error?.data.errors?.file_type || error?.data.message || "File upload failed. Please try again.";
      setErrors((prev) => ({
        ...prev,
        resume_key_path: [apiError]
      }));
      setUploadedFile(null);
      setFormData((prev) => ({ ...prev, resume_key_path: "" }));
    }
  });
  const { mutateAsync: createUser, isPending: isCreating } = useMutation({
    mutationFn: (formData2) => createUserAPI(formData2),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["applicants"] });
      await queryClient.refetchQueries({ queryKey: ["stats"] });
      navigate({ to: "/applicants" });
    },
    onError: (error) => {
      if (error.data.status === 422 && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        setMessage(error.data.message);
      }
    }
  });
  const { mutateAsync: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: (formData2) => updateUserAPI(search.id, formData2),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["applicants"] });
      await queryClient.refetchQueries({ queryKey: ["stats"] });
      navigate({ to: "/applicants" });
      refetch();
    },
    onError: (error) => {
      if (error.data.status === 422 && error.data.errors) {
        setErrors(error.data.errors);
      } else {
        setMessage(error?.data.message);
      }
    }
  });
  const { mutateAsync: addRole, isPending: isAdding } = useMutation({
    mutationFn: (role) => addUserRoleAPI(role),
    onSuccess: async () => {
      await queryClient.refetchQueries({ queryKey: ["roles"] });
      setAddRoleMessage(null);
      setDialogOpen(false);
    },
    onError: (error) => {
      setAddRoleMessage(
        error.data.message || "Failed to add role. Please try again."
      );
    }
  });
  const handleAddRole = async (role) => {
    try {
      const newRoleResponse = await addRole(role);
      const newRole = newRoleResponse?.data;
      if (newRole?.id) {
        setFormData((prev) => ({
          ...prev,
          role_id: newRole.id
        }));
        setErrors((prev) => ({ ...prev, role_id: [] }));
        localStorage.setItem("recentRoleId", String(newRole.id));
        localStorage.setItem("recentRoleSelectedAt", Date.now().toString());
      }
    } catch (error) {
      console.error("Failed to add role", error);
    }
  };
  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };
  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const allowedTypes = ["pdf", "doc", "docx"];
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      if (!fileExtension || !allowedTypes.includes(fileExtension)) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: ["Only PDF, DOC, and DOCX files are allowed."]
        }));
        return;
      }
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        setErrors((prev) => ({
          ...prev,
          resume_key_path: ["File size exceeds 5MB limit."]
        }));
        return;
      }
      setFileInput(file);
      setUploadedFile({
        name: file.name,
        size: formatFileSize(file.size),
        type: fileExtension.toUpperCase()
      });
      setErrors((prev) => ({ ...prev, resume_key_path: [] }));
      fileUploadMutation.mutate(file);
    }
  };
  const handleDeleteFile = () => {
    setUploadedFile(null);
    setFormData((prev) => ({ ...prev, resume_key_path: "" }));
    setErrors((prev) => ({ ...prev, resume_key_path: [] }));
    const fileInput2 = document.getElementById(
      "file-upload"
    );
    if (fileInput2) fileInput2.value = "";
  };
  const handleFormChange = (data) => {
    setFormData((prev) => ({ ...prev, ...data }));
    if (data.role_id) {
      localStorage.setItem("recentRoleId", String(data.role_id));
      localStorage.setItem("recentRoleSelectedAt", Date.now().toString());
    }
    Object.keys(data).forEach((key) => {
      if (errors[key]) {
        setErrors((prev) => ({ ...prev, [key]: [] }));
      }
    });
  };
  const handleSave = () => {
    const normalizedPhone = formData.phone.startsWith("+91") ? formData.phone.replace(/^\+91/, "") : `+91${formData.phone.replace(/^\+91/, "")}`;
    const payload = {
      ...formData,
      phone: normalizedPhone
    };
    if (isEditMode) {
      updateUser(payload);
    } else {
      createUser(payload);
    }
  };
  const handleBackNavigate = () => {
    router.history.back();
  };
  const isLoading = fileUploadMutation.isPending;
  return /* @__PURE__ */ jsx("div", { className: "mt-4", children: /* @__PURE__ */ jsx(
    AddUserCard,
    {
      formData,
      uploadedFile,
      errors,
      setErrors,
      isSubmitting: isCreating || isUpdating,
      onChange: handleFormChange,
      onSave: handleSave,
      handleBackNavigate,
      handleFileUpload,
      handleDeleteFile,
      loading: isLoading,
      message,
      roleList: rolesList,
      onAddRole: handleAddRole,
      isAdding,
      isEdit: isEditMode,
      addRoleMessage: addRoleMessage ?? "",
      setAddRoleMessage,
      dialogOpen,
      setDialogOpen
    }
  ) });
};
const SplitComponent = AddUserContainer;
export {
  SplitComponent as component
};
