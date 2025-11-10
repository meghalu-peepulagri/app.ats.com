import { jsx, jsxs } from "react/jsx-runtime";
import { useQueryClient, useQuery, useMutation } from "@tanstack/react-query";
import { useParams } from "@tanstack/react-router";
import * as React from "react";
import { useState, useRef, useEffect, useMemo, forwardRef } from "react";
import { j as getCommentsAPI, k as updateCommentById, c as getApplicantById, l as updateApplicantStatus, m as updateApplicantRole, g as getListRolesAPI } from "./applicants-CwxTDbvI.js";
import { C as Card, d as CardHeader, b as CardTitle, c as CardDescription, a as CardContent } from "./card-C_27feJs.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectContent, d as SelectItem } from "./select-Drk_WKlp.js";
import { g as getStatusColor, S as Skeleton, R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-CrdYJwga.js";
import { renderAsync } from "docx-preview";
import { B as Button } from "./button-r8v9fEsh.js";
import { Minus, Plus, Download, LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { M as MessageIcon, N as NoCommentIcon, C as CommentIcon, I as InitialPage } from "./InitialPage-BN3TdKCt.js";
import Cookies from "js-cookie";
import * as AvatarPrimitive from "@radix-ui/react-avatar";
import { c as cn } from "./utils-H80jjgLf.js";
import dayjs from "dayjs";
import "@radix-ui/react-select";
import "react-resizable-panels";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "clsx";
import "tailwind-merge";
function EmailIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "17",
      height: "17",
      viewBox: "0 0 17 17",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M14.6003 3.5575H2.60034C2.46773 3.5575 2.34056 3.61017 2.24679 3.70394C2.15302 3.79771 2.10034 3.92489 2.10034 4.0575V12.5575C2.10034 12.8227 2.2057 13.0771 2.39323 13.2646C2.58077 13.4521 2.83513 13.5575 3.10034 13.5575H14.1003C14.3656 13.5575 14.6199 13.4521 14.8074 13.2646C14.995 13.0771 15.1003 12.8227 15.1003 12.5575V4.0575C15.1003 3.92489 15.0477 3.79771 14.9539 3.70394C14.8601 3.61017 14.733 3.5575 14.6003 3.5575ZM13.3147 4.5575L8.60034 8.87937L3.88597 4.5575H13.3147ZM14.1003 12.5575H3.10034V5.19437L8.26222 9.92624C8.35446 10.0109 8.47512 10.0579 8.60034 10.0579C8.72556 10.0579 8.84622 10.0109 8.93847 9.92624L14.1003 5.19437V12.5575Z",
          fill: "#4F4F4F"
        }
      )
    }
  );
}
function PhoneIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "17",
      height: "17",
      viewBox: "0 0 17 17",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M11.6003 1.5575H5.60034C5.20252 1.5575 4.82099 1.71553 4.53968 1.99684C4.25838 2.27814 4.10034 2.65967 4.10034 3.0575V14.0575C4.10034 14.4553 4.25838 14.8369 4.53968 15.1182C4.82099 15.3995 5.20252 15.5575 5.60034 15.5575H11.6003C11.9982 15.5575 12.3797 15.3995 12.661 15.1182C12.9423 14.8369 13.1003 14.4553 13.1003 14.0575V3.0575C13.1003 2.65967 12.9423 2.27814 12.661 1.99684C12.3797 1.71553 11.9982 1.5575 11.6003 1.5575ZM12.1003 14.0575C12.1003 14.1901 12.0477 14.3173 11.9539 14.4111C11.8601 14.5048 11.733 14.5575 11.6003 14.5575H5.60034C5.46773 14.5575 5.34056 14.5048 5.24679 14.4111C5.15302 14.3173 5.10034 14.1901 5.10034 14.0575V3.0575C5.10034 2.92489 5.15302 2.79771 5.24679 2.70394C5.34056 2.61017 5.46773 2.5575 5.60034 2.5575H11.6003C11.733 2.5575 11.8601 2.61017 11.9539 2.70394C12.0477 2.79771 12.1003 2.92489 12.1003 3.0575V14.0575ZM9.35034 4.3075C9.35034 4.45583 9.30636 4.60084 9.22394 4.72417C9.14153 4.84751 9.0244 4.94364 8.88735 5.00041C8.75031 5.05717 8.59951 5.07202 8.45402 5.04308C8.30854 5.01415 8.1749 4.94272 8.07001 4.83783C7.96512 4.73294 7.89369 4.5993 7.86475 4.45381C7.83581 4.30833 7.85067 4.15753 7.90743 4.02048C7.9642 3.88344 8.06033 3.7663 8.18366 3.68389C8.307 3.60148 8.45201 3.5575 8.60034 3.5575C8.79925 3.5575 8.99002 3.63651 9.13067 3.77717C9.27132 3.91782 9.35034 4.10858 9.35034 4.3075Z",
          fill: "#4F4F4F"
        }
      )
    }
  );
}
function Profile({
  avatarImg,
  name,
  email,
  phone,
  applyTime,
  updatedTime,
  updatedBy,
  resumeOptions,
  statusValue,
  roleValue,
  downloadUrl,
  resume_key_path,
  onStatusChange,
  onRoleChange,
  roleOptions
}) {
  const [status, setStatus] = useState(statusValue);
  const [roles, setRoles] = useState(roleValue ?? "");
  const docxContainerRef = useRef(null);
  const [fileType, setFileType] = useState(
    "unknown"
  );
  const [zoomLevel, setZoomLevel] = useState(90);
  useEffect(() => {
    if (status !== statusValue) setStatus(statusValue);
    if (roles !== roleValue) setRoles(roleValue ?? "");
  }, [statusValue, roleValue]);
  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    if (onStatusChange) {
      onStatusChange(newStatus);
    }
  };
  const handleRolesChange = (newRole) => {
    setRoles(newRole);
    if (onRoleChange) {
      onRoleChange(newRole);
    }
  };
  const pdfSrc = useMemo(() => {
    let src = null;
    if (downloadUrl) {
      src = downloadUrl;
    } else if (resume_key_path) {
      src = `${process.env.NEXT_PUBLIC_FILE_BASE_URL}/${resume_key_path}`;
    }
    return src;
  }, [downloadUrl, resume_key_path]);
  useEffect(() => {
    if (!pdfSrc) return;
    if (pdfSrc.toLowerCase().includes(".pdf")) {
      setFileType("pdf");
    } else if (pdfSrc.toLowerCase().includes(".docx")) {
      setFileType("docx");
    } else {
      fetch(pdfSrc, { method: "HEAD" }).then((res) => {
        const type = res.headers.get("content-type");
        if (type?.includes("pdf")) setFileType("pdf");
        else if (type?.includes("word")) setFileType("docx");
        else setFileType("unknown");
      }).catch(() => setFileType("unknown"));
    }
  }, [pdfSrc]);
  useEffect(() => {
    if (fileType === "docx" && pdfSrc && docxContainerRef.current) {
      fetch(pdfSrc).then((res) => res.blob()).then(
        (blob) => renderAsync(blob, docxContainerRef.current, void 0, {
          className: "docx-preview"
        })
      ).catch((err) => console.error("DOCX render error:", err));
    }
  }, [fileType, pdfSrc]);
  const handleDownload = () => {
    if (!pdfSrc) {
      console.error("No document URL provided");
      return;
    }
    const link = document.createElement("a");
    link.href = pdfSrc;
    link.download = `${name.replace(/\s+/g, "_")}_resume.${fileType === "pdf" ? "pdf" : "docx"}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 10, 200));
  };
  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 10, 10));
  };
  return /* @__PURE__ */ jsxs("div", { className: "border rounded-lg p-1.5", children: [
    /* @__PURE__ */ jsxs(Card, { className: "w-full bg-[#F8F8F8] shadow-none rounded-lg gap-0 border-none", children: [
      /* @__PURE__ */ jsx(CardHeader, { className: "p-1 shadow-[0px_0px_11px_rgba(0,0,0,0.12)] bg-white rounded-md mx-1", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between bg-white rounded-[5px] items-center px-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
          /* @__PURE__ */ jsx("div", { className: "w-8 h-8 bg-[#2F6846] rounded-full flex items-center justify-center text-white font-normal text-sm 3xl:text-base", children: avatarImg }),
          /* @__PURE__ */ jsx(CardTitle, { className: "text-sm 3xl:!text-base text-(--an-card-profile-color) font-normal", children: name })
        ] }),
        /* @__PURE__ */ jsxs(CardDescription, { className: "text-sm !pb-0 text-gray-500", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal", children: [
            /* @__PURE__ */ jsx(EmailIcon, {}),
            email
          ] }),
          /* @__PURE__ */ jsxs("span", { className: "flex items-center mt-1 text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal", children: [
            /* @__PURE__ */ jsx(PhoneIcon, {}),
            phone
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs(CardContent, { className: "px-2 py-1", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx("p", { className: "text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal", children: "Applied On" }),
            /* @__PURE__ */ jsx("p", { className: "text-[13px] 3xl:!text-base  text-[#454545] font-normal", children: applyTime })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal", children: "Updated On" }),
              /* @__PURE__ */ jsx("p", { className: "text-[13px] 3xl:!text-base  text-[#454545] font-normal", children: updatedTime })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("p", { className: "text-lg 2xl:text-xs 3xl:!text-sm text-[#828282] font-normal", children: "Updated By" }),
              /* @__PURE__ */ jsx("p", { className: "text-[13px] 3xl:!text-base  text-[#454545] font-normal", children: updatedBy })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex  justify-between items-center mt-1", children: [
          /* @__PURE__ */ jsxs(Select, { value: roles, onValueChange: handleRolesChange, children: [
            /* @__PURE__ */ jsx(SelectTrigger, { className: "px-3 rounded border border-black/30 shadow-none !h-8 w-45 text-sm 3xl:!text-base font-normal focus:ring-0 focus-visible:ring-0", children: /* @__PURE__ */ jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsx(SelectContent, { className: "max-h-[250px] overflow-y-auto", children: roleOptions?.map((role) => /* @__PURE__ */ jsx(SelectItem, { value: String(role.id), children: role.name }, role.id)) })
          ] }),
          /* @__PURE__ */ jsxs(Select, { value: status, onValueChange: handleStatusChange, children: [
            /* @__PURE__ */ jsx(
              SelectTrigger,
              {
                className: `px-3 rounded border-none !h-8 w-45 text-sm 3xl:!text-base  font-normal focus:ring-0 focus-visible:ring-0 ${getStatusColor(status.toUpperCase()).bg} ${getStatusColor(status.toUpperCase()).text}`,
                children: /* @__PURE__ */ jsx(SelectValue, {})
              }
            ),
            /* @__PURE__ */ jsx(SelectContent, { className: "max-h-[250px] overflow-y-auto", children: resumeOptions?.map((option, index) => /* @__PURE__ */ jsx(SelectItem, { value: option, children: option }, index)) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "border rounded-t-md mt-1 bg-neutral-700", children: fileType === "pdf" && pdfSrc ? /* @__PURE__ */ jsx(
      "iframe",
      {
        src: pdfSrc,
        className: "w-full h-[calc(100vh-275px)] border-none bg-black",
        title: "Resume PDF"
      }
    ) : fileType === "docx" ? /* @__PURE__ */ jsxs("div", { className: "relative bg-neutral-700", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleZoomOut,
              className: "bg-transparent shadow-none hover:bg-gray-700 cursor-pointer rounded-full !p-1 h-7",
              title: "Zoom Out",
              children: /* @__PURE__ */ jsx(Minus, { strokeWidth: 2, className: "!w-5 !h-5 text-white" })
            }
          ),
          /* @__PURE__ */ jsxs("span", { className: "text-white text-sm", children: [
            zoomLevel,
            "%"
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: handleZoomIn,
              className: "bg-transparent shadow-none hover:bg-gray-700 cursor-pointer rounded-full !p-1 h-7",
              title: "Zoom In",
              children: /* @__PURE__ */ jsx(Plus, { strokeWidth: 2, className: "!w-5 !h-5 text-white" })
            }
          )
        ] }),
        /* @__PURE__ */ jsx(
          Button,
          {
            onClick: handleDownload,
            className: "bg-transparent p-2 shadow-none hover:bg-gray-700 cursor-pointer",
            title: "Download Resume",
            children: /* @__PURE__ */ jsx(Download, { strokeWidth: 2, className: "!w-5 !h-5 text-white" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: `docx-scroll-wrapper overflow-auto bg-zinc-300 flex ${zoomLevel < 100 ? "justify-center" : "justify-start"}`,
          style: { height: "calc(100vh - 320px)" },
          children: /* @__PURE__ */ jsx(
            "div",
            {
              ref: docxContainerRef,
              className: "docx-container transition-all duration-200 w-full",
              style: {
                transform: `scale(${zoomLevel / 100})`,
                transformOrigin: zoomLevel < 100 ? "top center" : "top left"
              }
            }
          )
        }
      )
    ] }) : /* @__PURE__ */ jsx("p", { className: "text-center text-gray-300 py-8", children: "Unsupported file format" }) })
  ] });
}
const Avatar = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Root,
  {
    ref,
    className: cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className
    ),
    ...props
  }
));
Avatar.displayName = AvatarPrimitive.Root.displayName;
const AvatarImage = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Image,
  {
    ref,
    className: cn("aspect-square h-full w-full", className),
    ...props
  }
));
AvatarImage.displayName = AvatarPrimitive.Image.displayName;
const AvatarFallback = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AvatarPrimitive.Fallback,
  {
    ref,
    className: cn(
      "flex h-full w-full items-center justify-center rounded-full bg-muted",
      className
    ),
    ...props
  }
));
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;
const CardComponent = forwardRef(
  ({ name, msg, time }, ref) => {
    return /* @__PURE__ */ jsx(
      Card,
      {
        ref,
        className: "w-full rounded-lg max-w-md shadow-none border-none bg-[#F4F7FC] p-0",
        children: /* @__PURE__ */ jsxs(CardContent, { className: "flex flex-col p-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-2", children: [
            /* @__PURE__ */ jsx(Avatar, { className: "w-7 h-7 rounded-full bg-[#c7c9cd] border flex items-center justify-center text-white", children: /* @__PURE__ */ jsx("p", { className: "text-black text-sm 3xl:!text-base", children: name?.charAt(0)?.toUpperCase?.() ?? "?" }) }),
            /* @__PURE__ */ jsx("h3", { className: "text-[15px] 3xl:!text-lg text-normal text-[#181616] capitalize", children: name }),
            /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:!text-sm text-[#828282] font-normal", children: time })
          ] }),
          /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:!text-sm text-[#4F4F4F] font-normal pl-10 capitalize whitespace-pre-line", children: msg })
        ] })
      }
    );
  }
);
CardComponent.displayName = "CardComponent";
const CommentsSection = ({
  comments,
  onSubmitComment,
  isLoading
}) => {
  const [newComment, setNewComment] = useState("");
  const bottomRef = useRef(null);
  const prevCountRef = useRef(comments.length);
  const handleCommentChange = (e) => setNewComment(e.target.value);
  const handleCommentSubmit = () => {
    if (newComment.trim()) {
      onSubmitComment(newComment);
      setNewComment("");
    }
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleCommentSubmit();
    }
  };
  useEffect(() => {
    if (comments.length > prevCountRef.current) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    prevCountRef.current = comments.length;
  }, [comments]);
  return /* @__PURE__ */ jsxs("div", { className: "w-full", children: [
    /* @__PURE__ */ jsx("div", { className: "flex items-center justify-between mb-2", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx(MessageIcon, {}),
      /* @__PURE__ */ jsxs("span", { className: "text-xs 2xl:text-sm 3xl:!text-base font-normal text-[#000]", children: [
        "Comments",
        " ",
        /* @__PURE__ */ jsx("span", { className: "bg-black text-white rounded-full px-3 ml-3 py-0 text-xs 3xl:!text-sm", children: comments?.length ?? 0 })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxs("div", { className: "h-[calc(100vh-260px)] overflow-y-auto gap-1 flex flex-col", children: [
      comments.length > 0 ? comments.map((comment, index) => /* @__PURE__ */ jsx(
        CardComponent,
        {
          name: comment?.name,
          msg: comment?.msg,
          time: comment?.time
        },
        comment?.id ?? index
      )) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center mt-[30%]", children: [
        /* @__PURE__ */ jsx(NoCommentIcon, {}),
        /* @__PURE__ */ jsx("p", { className: "text-xs 3xl:!text-sm text-[#828282] font-normal", children: "No comments" })
      ] }),
      /* @__PURE__ */ jsx("div", { ref: bottomRef })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "mt-4 flex items-center gap-4", children: /* @__PURE__ */ jsxs("div", { className: "relative w-full", children: [
      /* @__PURE__ */ jsx(
        "textarea",
        {
          className: "w-full p-2 h-20 bg-[#EFEFF1] placeholder:text-[#828282] text-xs 3xl:!text-sm rounded resize-none pr-6 focus:ring-0 focus:outline-none border border-[rgba(0,0,0,0.08)]",
          placeholder: "Write a comment...",
          rows: 3,
          value: newComment,
          onChange: handleCommentChange,
          onKeyDown: handleKeyDown
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          className: "absolute top-2 right-2 bg-[#4F4F4F] w-10.5 h-6.5 rounded flex items-center justify-center cursor-pointer",
          onClick: handleCommentSubmit,
          disabled: isLoading,
          children: isLoading ? /* @__PURE__ */ jsx(LoaderCircle, { className: "text-white animate-spin w-5 h-5" }) : /* @__PURE__ */ jsx(CommentIcon, { className: "!w-3.5 !h-3.5" })
        }
      )
    ] }) })
  ] });
};
function CommentDetails({ applicant_id }) {
  const queryClient = useQueryClient();
  const { data: comments, isError, error } = useQuery({
    queryKey: ["comments", applicant_id],
    queryFn: async () => {
      const response = await getCommentsAPI(applicant_id);
      return response.data;
    }
  });
  if (isError) {
    toast.error(error.message);
  }
  const addCommentMutation = useMutation({
    mutationFn: async (newComment) => {
      const response = await updateCommentById(applicant_id, {
        comment_description: newComment
      });
      return response.data;
    },
    onSuccess: (newCommentResponse) => {
      queryClient.invalidateQueries({ queryKey: ["comments", applicant_id] });
      queryClient.setQueryData(["comments", applicant_id], (oldData) => {
        return {
          ...oldData,
          records: [...oldData?.records || [], newCommentResponse]
        };
      });
    },
    onError: (error2) => {
      toast.error(error2.data.message);
    }
  });
  const name = Cookies.get("name");
  const commentsData = comments?.records.map((comment) => ({
    id: comment?.id,
    name: comment?.user?.name === name ? "You" : comment?.user?.name,
    msg: comment?.comment_description || "",
    time: dayjs(comment?.commented_at).format("DD-MM-YYYY hh:mm A")
  }));
  return /* @__PURE__ */ jsx("div", { children: commentsData && /* @__PURE__ */ jsx(
    CommentsSection,
    {
      comments: commentsData,
      onSubmitComment: (newComment) => addCommentMutation.mutate(newComment),
      isLoading: addCommentMutation.isPending
    },
    `comments-${applicant_id}`
  ) });
}
function Resume() {
  const { applicant_id: id } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const { data: resume, isFetching, isError, error } = useQuery({
    queryKey: [`resume-${id}`, id],
    queryFn: async () => {
      const response = await getApplicantById(id);
      return response.data;
    },
    enabled: !!id,
    retry: false
  });
  if (isError) {
    toast.error(error?.message);
  }
  const updateStatusMutation = useMutation({
    mutationFn: async (newStatus) => {
      return updateApplicantStatus(id, { status: newStatus });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error2) => {
      toast.error(error2.message);
    }
  });
  const updateRoleMutation = useMutation({
    mutationFn: async (newRoleId) => {
      return updateApplicantRole(id, { role_id: newRoleId });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
      queryClient.invalidateQueries({ queryKey: ["applicants"] });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
    },
    onError: (error2) => {
      toast.error(error2.message);
    }
  });
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    }
  });
  const roleOptions = roles?.data?.map((role) => ({
    id: role.id,
    name: role.role
  }));
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: [`resume-${id}`, id] });
  }, [id, queryClient]);
  const name = resume?.first_name.charAt(0).toUpperCase() + resume?.first_name.slice(1).toLowerCase() + " " + resume?.last_name.charAt(0).toUpperCase() + resume?.last_name.slice(1).toLowerCase();
  const avatarImg = resume?.first_name?.charAt(0).toUpperCase() + resume?.last_name?.charAt(0).toUpperCase();
  function capitalize(word) {
    return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "";
  }
  const resumeOptions = [
    "Applied",
    "Screened",
    "Schedule_interview",
    "Interviewed",
    "Pipeline",
    "Rejected",
    "Hired",
    "Joined",
    "Not_yet_responded"
  ].map(
    (option) => option === "Schedule_interview" ? "Schedule Interview" : option === "Not_yet_responded" ? "Not Yet Responded" : option
  );
  if (isFetching) {
    return /* @__PURE__ */ jsxs("div", { className: "flex gap-2 w-full bg-white p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex-1 flex flex-col gap-2 border rounded-md", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-16 w-full rounded-md" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-1/3 rounded-md" }),
          /* @__PURE__ */ jsx(Skeleton, { className: "h-8 w-1/3 rounded-md" })
        ] }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-[calc(100vh-263px)] w-full rounded-md" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "w-[32%] flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md" }),
        /* @__PURE__ */ jsx(Skeleton, { className: "h-10 w-full rounded-md" })
      ] })
    ] });
  }
  if (!resume && !isFetching) {
    return /* @__PURE__ */ jsx(InitialPage, {});
  }
  return /* @__PURE__ */ jsx("div", { className: "flex gap-2 w-full", children: isFetching ? /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 bg-white/60 backdrop-blur-sm flex flex-col gap-2 p-4", children: [
    /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/4 rounded-md" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-1/4 rounded-md" }),
    /* @__PURE__ */ jsx(Skeleton, { className: "h-[calc(100vh-263px)] w-full rounded-md" })
  ] }) : /* @__PURE__ */ jsxs(
    ResizablePanelGroup,
    {
      direction: "horizontal",
      className: "w-full rounded-lg",
      children: [
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 70, minSize: 40, children: /* @__PURE__ */ jsx(
          Profile,
          {
            avatarImg: avatarImg || "A",
            name: name || "",
            email: resume?.email || "",
            phone: resume?.phone || "",
            jobTitle: resume?.role || "",
            applyTime: dayjs(resume?.created_at).format("DD-MM-YYYY hh:mm A"),
            updatedTime: dayjs(resume?.status_updated_at || "--").format("DD-MM-YYYY hh:mm A"),
            updatedBy: resume?.status_updated_by?.name || "--",
            resumeOptions,
            statusValue: resume?.status === "SCHEDULE_INTERVIEW" ? "Schedule Interview" : resume?.status === "NOT_YET_RESPONDED" ? "Not Yet Responded" : capitalize(resume?.status),
            roleValue: resume?.role_id ? String(resume.role_id) : "",
            resume_key_path: resume?.resume_key_path || "",
            downloadUrl: resume?.presignedUrl.download_url || "",
            onStatusChange: (newStatus) => updateStatusMutation.mutate(newStatus),
            onRoleChange: (newRoleId) => updateRoleMutation.mutate(parseInt(newRoleId)),
            roleOptions: roleOptions ?? []
          },
          id
        ) }),
        /* @__PURE__ */ jsx(ResizableHandle, { withHandle: true }),
        /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 30, children: /* @__PURE__ */ jsx(CommentDetails, { applicant_id: resume?.id }) })
      ]
    }
  ) });
}
const SplitComponent = Resume;
export {
  SplitComponent as component
};
