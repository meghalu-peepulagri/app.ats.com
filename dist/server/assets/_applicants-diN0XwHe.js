import { jsx, jsxs } from "react/jsx-runtime";
import { useQuery, useQueryClient, useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { useParams, useSearch, useNavigate, Outlet } from "@tanstack/react-router";
import { useReactTable, getCoreRowModel, flexRender, createColumnHelper } from "@tanstack/react-table";
import { ListFilter, Check, Search, MoreVertical, Pencil, Trash2 } from "lucide-react";
import * as React from "react";
import { useRef, useState, useLayoutEffect, useEffect, useCallback } from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import { c as cn } from "./utils-H80jjgLf.js";
import { g as getListRolesAPI, a as getStatsAPI, b as getAllApplicants, d as deleteApplicant } from "./applicants-CwxTDbvI.js";
import { S as Skeleton, g as getStatusColor, R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-CrdYJwga.js";
import { T as TooltipProvider, a as Tooltip, b as TooltipTrigger, c as TooltipContent } from "./tooltip-hsd05QV0.js";
import { B as Button, b as buttonVariants } from "./button-r8v9fEsh.js";
import { I as Input } from "./input-C0QjszdI.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, d as DropdownMenuSub, c as DropdownMenuItem, e as DropdownMenuSubTrigger, f as DropdownMenuSubContent, g as DropdownMenuSeparator } from "./dropdown-menu-HPkNXu5w.js";
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog";
import { toast } from "sonner";
import "clsx";
import "tailwind-merge";
import "react-resizable-panels";
import "@radix-ui/react-tooltip";
import "js-cookie";
import "@radix-ui/react-slot";
import "class-variance-authority";
import "@radix-ui/react-dropdown-menu";
function Popover({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Root, { "data-slot": "popover", ...props });
}
function PopoverTrigger({
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Trigger, { "data-slot": "popover-trigger", ...props });
}
function PopoverContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}) {
  return /* @__PURE__ */ jsx(PopoverPrimitive.Portal, { children: /* @__PURE__ */ jsx(
    PopoverPrimitive.Content,
    {
      "data-slot": "popover-content",
      align,
      sideOffset,
      className: cn(
        "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-72 origin-(--radix-popover-content-transform-origin) rounded-md border p-4 shadow-md outline-hidden",
        className
      ),
      ...props
    }
  ) });
}
const TruncatedText = ({ text }) => {
  const textRef = useRef(null);
  const [isTruncated, setIsTruncated] = useState(false);
  useLayoutEffect(() => {
    if (!textRef.current) return;
    const checkTruncation = () => {
      if (textRef.current) {
        setIsTruncated(textRef.current.scrollWidth > textRef.current.offsetWidth);
      }
    };
    checkTruncation();
    const resizeObserver = new ResizeObserver(checkTruncation);
    resizeObserver.observe(textRef.current);
    return () => resizeObserver.disconnect();
  }, [text]);
  const span = /* @__PURE__ */ jsx(
    "span",
    {
      ref: textRef,
      className: "text-sm truncate max-w-[120px] cursor-default pl-1 inline-block align-middle",
      children: text
    }
  );
  return isTruncated ? /* @__PURE__ */ jsx(TooltipProvider, { children: /* @__PURE__ */ jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsx(TooltipTrigger, { asChild: true, children: span }),
    /* @__PURE__ */ jsx(TooltipContent, { side: "top", children: /* @__PURE__ */ jsx("p", { children: text }) })
  ] }) }) : span;
};
function NoTableDataIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      width: "250",
      height: "161",
      viewBox: "0 0 270 181",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      children: [
        /* @__PURE__ */ jsxs("g", { "clip-path": "url(#clip0_654_714)", children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M204.865 99.5103V56.8281C204.865 30.1845 198.65 23.5071 173.659 23.5071H123.678C98.6876 23.5071 92.4731 30.1845 92.4731 56.8281V131.271C92.4731 148.857 102.126 153.022 113.828 140.46L113.894 140.394C119.315 134.642 127.579 135.105 132.273 141.386H159.406",
              stroke: "#E1E4E5",
              "stroke-width": "7.2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M214.782 155.733L208.17 149.121M131.824 56.5637H184.714M131.824 91.4711H184.714M131.824 74.0174H171.491M131.824 109.507H153.72M189.659 151.766C201.343 151.766 210.815 142.294 210.815 130.61C210.815 118.926 201.343 109.454 189.659 109.454C177.975 109.454 168.503 118.926 168.503 130.61C168.503 142.294 177.975 151.766 189.659 151.766Z",
              stroke: "#E1E4E5",
              "stroke-width": "7.2",
              "stroke-linecap": "round",
              "stroke-linejoin": "round"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M89.618 105.382C72.2667 105.382 58.2008 91.3163 58.2008 73.9651C58.2008 56.6138 72.2667 42.5479 89.618 42.5479C106.969 42.5479 121.035 56.6138 121.035 73.9651C121.035 91.3163 106.969 105.382 89.618 105.382Z",
              fill: "#05A155"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              "fill-rule": "evenodd",
              "clip-rule": "evenodd",
              d: "M100.451 84.9567V86.5027C100.451 86.9129 100.288 87.3062 99.9976 87.5961C99.7074 87.8859 99.3139 88.0487 98.9037 88.0485H80.3319C79.9217 88.0486 79.5282 87.8858 79.238 87.596C78.9478 87.3061 78.7846 86.9128 78.7842 86.5027V84.9321C78.7842 80.2542 84.1362 77.2149 89.6178 77.2149C95.0997 77.2149 100.451 80.2557 100.451 84.9321M93.4482 63.6346C95.5635 65.7499 95.5635 69.1795 93.4482 71.2948C91.3326 73.4104 87.903 73.4104 85.7877 71.2948C83.6721 69.1795 83.6721 65.7499 85.7877 63.6346C87.903 61.519 91.3326 61.519 93.4482 63.6346Z",
              fill: "white"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M67.3975 33.6169C72.5857 36.1906 79.4719 32.8813 79.4719 32.8813C79.4719 32.8813 77.9416 25.4008 72.7504 22.8307C67.5619 20.2567 60.6787 23.5627 60.6787 23.5627C60.6787 23.5627 62.209 31.0432 67.3975 33.6169Z",
              fill: "url(#paint0_linear_654_714)"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M49.6651 42.5475C51.6111 42.5475 53.1886 44.125 53.1886 46.071C53.1886 48.017 51.6111 49.5945 49.6651 49.5945C47.7191 49.5945 46.1416 48.017 46.1416 46.071C46.1416 44.125 47.7191 42.5475 49.6651 42.5475Z",
              fill: "#05A155"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M219.689 26.0459C223.349 26.0459 226.316 29.0128 226.316 32.6726C226.316 36.3324 223.349 39.2993 219.689 39.2993C216.03 39.2993 213.063 36.3324 213.063 32.6726C213.063 29.0128 216.03 26.0459 219.689 26.0459Z",
              fill: "#05A155"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M222.297 100.048C224.242 100.048 225.818 98.4716 225.818 96.5266C225.818 94.5816 224.242 93.0049 222.297 93.0049C220.352 93.0049 218.775 94.5816 218.775 96.5266C218.775 98.4716 220.352 100.048 222.297 100.048Z",
              fill: "#05A155"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M43.1859 80.4294C45.9351 80.4294 48.1638 78.2008 48.1638 75.4515C48.1638 72.7023 45.9351 70.4736 43.1859 70.4736C40.4367 70.4736 38.208 72.7023 38.208 75.4515C38.208 78.2008 40.4367 80.4294 43.1859 80.4294Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M124.117 164.227C127.573 164.227 130.375 161.425 130.375 157.97C130.375 154.514 127.573 151.713 124.117 151.713C120.662 151.713 117.86 154.514 117.86 157.97C117.86 161.425 120.662 164.227 124.117 164.227Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M221.013 135.251C220.303 137.903 221.876 140.628 224.527 141.338C227.178 142.048 229.903 140.475 230.614 137.824C231.324 135.173 229.751 132.448 227.1 131.737C224.448 131.027 221.723 132.6 221.013 135.251Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M53.1313 114.788C55.94 114.788 58.2169 112.966 58.2169 110.719C58.2169 108.472 55.94 106.65 53.1313 106.65C50.3226 106.65 48.0457 108.472 48.0457 110.719C48.0457 112.966 50.3226 114.788 53.1313 114.788Z",
              fill: "#E1E4E5"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              d: "M58.2004 147.454C58.2004 151.937 61.8345 155.571 66.3175 155.571C70.8004 155.571 74.4346 151.937 74.4346 147.454C74.4346 142.971 70.8004 139.337 66.3175 139.337C61.8345 139.337 58.2004 142.971 58.2004 147.454Z",
              fill: "#E1E4E5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("defs", { children: [
          /* @__PURE__ */ jsxs(
            "linearGradient",
            {
              id: "paint0_linear_654_714",
              x1: "87.3211",
              y1: "41.6449",
              x2: "44.5276",
              y2: "7.79528",
              gradientUnits: "userSpaceOnUse",
              children: [
                /* @__PURE__ */ jsx("stop", { "stop-color": "white" }),
                /* @__PURE__ */ jsx("stop", { offset: "1", "stop-color": "#EEEEEE" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("clipPath", { id: "clip0_654_714", children: /* @__PURE__ */ jsx(
            "rect",
            {
              width: "270",
              height: "180",
              fill: "white",
              transform: "translate(0 0.778564)"
            }
          ) })
        ] })
      ]
    }
  );
}
const TanstackTable = ({
  columns: columns2,
  data,
  loading = false,
  lastRowRef,
  onRowClick,
  isFetchingNextPage
}) => {
  const { applicant_id } = useParams({ strict: false });
  const table = useReactTable({
    data,
    columns: columns2,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: "onChange"
  });
  const selectedRow = applicant_id ? parseInt(applicant_id) : null;
  return /* @__PURE__ */ jsxs("div", { className: "pl-2 w-full overflow-auto h-[calc(100vh-180px)]", children: [
    /* @__PURE__ */ jsxs("table", { className: "w-full border-none overflow-auto", children: [
      /* @__PURE__ */ jsx("thead", { className: "sticky top-0 z-30 text-left h-10 bg-[#DBFCD9] font-normal rounded-sm", children: table.getHeaderGroups().map((headerGroup) => /* @__PURE__ */ jsx("tr", { children: headerGroup.headers.map((header) => /* @__PURE__ */ jsx(
        "th",
        {
          colSpan: header.colSpan,
          style: { width: header.getSize() },
          className: "text-[#333] text-[13px] 3xl:!text-base font-medium leading-[100%] p-1",
          children: header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())
        },
        header.id
      )) }, headerGroup.id)) }),
      /* @__PURE__ */ jsx("tbody", { children: loading && !isFetchingNextPage ? Array.from({ length: 12 }).map((_, rowIndex) => /* @__PURE__ */ jsx("tr", { className: "border-b border-[#F1F1F1] h-10", children: columns2.map((_2, colIndex) => /* @__PURE__ */ jsx("td", { className: "p-2", children: /* @__PURE__ */ jsx(Skeleton, { className: "h-6 w-full rounded-md" }) }, `skeleton-cell-${colIndex}`)) }, `skeleton-${rowIndex}`)) : table.getRowModel().rows.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", { colSpan: columns2.length, className: "text-center py-[30%]", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center", children: [
        /* @__PURE__ */ jsx(NoTableDataIcon, {}),
        /* @__PURE__ */ jsx("p", { className: "text-sm 3xl:!text-base text-[#828282] font-normal", children: "No applicants found" })
      ] }) }) }) : table.getRowModel().rows.map((row, idx) => {
        const isLast = idx === data.length - 1;
        return /* @__PURE__ */ jsx(
          "tr",
          {
            ref: isLast && lastRowRef ? lastRowRef : void 0,
            className: `border-b border-[#F1F1F1] h-10 cursor-pointer ${selectedRow === row.original.id ? "bg-[#f4f3f3]" : ""}`,
            onClick: () => onRowClick?.(row),
            children: row.getVisibleCells().map((cell) => /* @__PURE__ */ jsx(
              "td",
              {
                style: { width: cell.column.getSize() },
                className: "text-[#454545] text-[13px] 3xl:!text-base font-normal leading-[100%]",
                children: flexRender(cell.column.columnDef.cell, cell.getContext())
              },
              cell.id
            ))
          },
          row.id
        );
      }) })
    ] }),
    isFetchingNextPage && /* @__PURE__ */ jsx("div", { className: "text-center py-2 text-gray-500", children: "Loading more..." })
  ] });
};
function AddUploadIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "16",
      height: "17",
      viewBox: "0 0 16 17",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M13 2.5575H3C2.73478 2.5575 2.48043 2.66285 2.29289 2.85039C2.10536 3.03792 2 3.29228 2 3.5575V13.5575C2 13.8227 2.10536 14.0771 2.29289 14.2646C2.48043 14.4521 2.73478 14.5575 3 14.5575H13C13.2652 14.5575 13.5196 14.4521 13.7071 14.2646C13.8946 14.0771 14 13.8227 14 13.5575V3.5575C14 3.29228 13.8946 3.03792 13.7071 2.85039C13.5196 2.66285 13.2652 2.5575 13 2.5575ZM13 3.5575V10.0575H11.2063C11.075 10.0572 10.945 10.0829 10.8237 10.1332C10.7025 10.1835 10.5924 10.2574 10.5 10.3506L9.29313 11.5575H6.70687L5.5 10.3506C5.40748 10.2574 5.29734 10.1834 5.17599 10.1331C5.05464 10.0828 4.9245 10.0571 4.79313 10.0575H3V3.5575H13ZM13 13.5575H3V11.0575H4.79313L6 12.2644C6.09252 12.3576 6.20266 12.4316 6.32401 12.4819C6.44536 12.5322 6.5755 12.5579 6.70687 12.5575H9.29313C9.4245 12.5579 9.55464 12.5322 9.67599 12.4819C9.79734 12.4316 9.90748 12.3576 10 12.2644L11.2069 11.0575H13V13.5575ZM5.64625 7.41125C5.59976 7.36481 5.56288 7.30966 5.53772 7.24897C5.51256 7.18827 5.49961 7.1232 5.49961 7.0575C5.49961 6.99179 5.51256 6.92672 5.53772 6.86602C5.56288 6.80533 5.59976 6.75018 5.64625 6.70374L7.64625 4.70374C7.69269 4.65726 7.74783 4.62038 7.80853 4.59522C7.86923 4.57005 7.93429 4.5571 8 4.5571C8.06571 4.5571 8.13077 4.57005 8.19147 4.59522C8.25217 4.62038 8.30731 4.65726 8.35375 4.70374L10.3538 6.70374C10.4002 6.7502 10.4371 6.80535 10.4622 6.86605C10.4873 6.92674 10.5003 6.9918 10.5003 7.0575C10.5003 7.12319 10.4873 7.18825 10.4622 7.24894C10.4371 7.30964 10.4002 7.36479 10.3538 7.41125C10.3073 7.4577 10.2521 7.49455 10.1914 7.51969C10.1308 7.54483 10.0657 7.55777 10 7.55777C9.9343 7.55777 9.86925 7.54483 9.80855 7.51969C9.74786 7.49455 9.6927 7.4577 9.64625 7.41125L8.5 6.26437V10.0575C8.5 10.1901 8.44732 10.3173 8.35355 10.411C8.25979 10.5048 8.13261 10.5575 8 10.5575C7.86739 10.5575 7.74021 10.5048 7.64645 10.411C7.55268 10.3173 7.5 10.1901 7.5 10.0575V6.26437L6.35375 7.41125C6.30731 7.45773 6.25217 7.49461 6.19147 7.51977C6.13077 7.54494 6.06571 7.55789 6 7.55789C5.93429 7.55789 5.86923 7.54494 5.80853 7.51977C5.74783 7.49461 5.69269 7.45773 5.64625 7.41125Z",
          fill: "white"
        }
      )
    }
  );
}
function FilterMenu({ roleList, statusList, onFilterChange, selectedRole, selectedStatus }) {
  const [localStatus, setLocalStatus] = useState(selectedStatus ?? "");
  const [localRole, setLocalRole] = useState(selectedRole ?? "");
  useEffect(() => {
    setLocalStatus(selectedStatus ?? "");
    setLocalRole(selectedRole ?? "");
  }, [selectedStatus, selectedRole]);
  const handleStatusChange = (value) => {
    const newStatus = value === "All" ? "" : value;
    setLocalStatus(newStatus);
    onFilterChange({ status: newStatus, role: localRole });
  };
  const handleRoleChange = (value) => {
    const newRole = value === "All" ? "" : value;
    setLocalRole(newRole);
    onFilterChange({ status: localStatus, role: newRole });
  };
  const selectedCount = [localRole, localStatus].filter(Boolean).length;
  const handleClear = () => {
    setLocalStatus("");
    setLocalRole("");
    onFilterChange({ status: "", role: "" });
  };
  return /* @__PURE__ */ jsxs(DropdownMenu, { children: [
    /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, className: "focus:ring-0 focus-visible:ring-0 rounded h-7", children: /* @__PURE__ */ jsxs(
      Button,
      {
        variant: "outline",
        size: "sm",
        className: "gap-2 bg-[rgba(0,0,0,0.08)] relative",
        children: [
          /* @__PURE__ */ jsx(ListFilter, { className: "h-4 w-4" }),
          /* @__PURE__ */ jsx("span", { className: "text-neutral-500", children: "Filter" }),
          selectedCount > 0 && /* @__PURE__ */ jsx("span", { className: "text-[10px] rounded-full bg-red-600 text-white h-4 w-4 absolute -top-3 -right-1 flex items-center justify-center", children: selectedCount })
        ]
      }
    ) }),
    /* @__PURE__ */ jsxs(DropdownMenuContent, { align: "start", className: "w-40", children: [
      /* @__PURE__ */ jsx(DropdownMenuSub, { children: /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: handleClear, className: "text-neutral-500 px-2 py-0 flex items-center justify-end w-fit cursor-pointer ml-auto text-xs", children: "Clear" }) }),
      /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
        /* @__PURE__ */ jsx(DropdownMenuSubTrigger, { children: "Status" }),
        /* @__PURE__ */ jsxs(DropdownMenuSubContent, { className: "w-50 h-50 overflow-auto", children: [
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: () => handleStatusChange("All"),
              className: selectedStatus === "" ? "bg-muted" : "",
              children: [
                "All",
                selectedStatus === "" && /* @__PURE__ */ jsx(Check, { className: "ml-auto h-4 w-4" })
              ]
            }
          ),
          statusList.map((status) => /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: () => handleStatusChange(String(status.id)),
              className: localStatus === String(status.id) ? "bg-muted" : "",
              children: [
                status.name,
                localStatus === String(status.id) && /* @__PURE__ */ jsx(Check, { className: "ml-auto h-4 w-4" })
              ]
            },
            status.id
          ))
        ] })
      ] }),
      /* @__PURE__ */ jsx(DropdownMenuSeparator, {}),
      /* @__PURE__ */ jsxs(DropdownMenuSub, { children: [
        /* @__PURE__ */ jsx(DropdownMenuSubTrigger, { children: "Position" }),
        /* @__PURE__ */ jsxs(DropdownMenuSubContent, { className: "w-50 h-50 overflow-auto", children: [
          /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: () => handleRoleChange("All"),
              className: localRole === "" ? "bg-muted" : "",
              children: [
                "All",
                localRole === "" && /* @__PURE__ */ jsx(Check, { className: "ml-auto h-4 w-4" })
              ]
            }
          ),
          roleList.map((role) => /* @__PURE__ */ jsxs(
            DropdownMenuItem,
            {
              onClick: () => handleRoleChange(String(role.id)),
              className: localRole === String(role.id) ? "bg-muted" : "",
              children: [
                role.name,
                localRole === String(role.id) && /* @__PURE__ */ jsx(Check, { className: "ml-auto h-4 w-4" })
              ]
            },
            role.id
          ))
        ] })
      ] })
    ] })
  ] });
}
const columnHelper = createColumnHelper();
const ActionCell = ({
  candidate,
  onDeleteId
}) => {
  const navigate = useNavigate();
  const handleDelete = (e) => {
    e.stopPropagation();
    onDeleteId(candidate);
  };
  const handleEdit = (e) => {
    e.stopPropagation();
    navigate({
      to: "/add_user",
      search: { id: candidate.id },
      state: {
        candidate: {
          id: candidate.id,
          role: candidate.position,
          first_name: candidate.name.split(" ")[0],
          last_name: candidate.name.split(" ").slice(1).join(" "),
          email: candidate.email,
          phone: candidate.phone,
          experience: candidate.experience,
          resume_key_path: candidate.resume_key_path
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(Popover, { children: [
    /* @__PURE__ */ jsx(PopoverTrigger, { asChild: true, children: /* @__PURE__ */ jsx(
      Button,
      {
        variant: "ghost",
        className: "h-8 w-8 p-0",
        onClick: (e) => e.stopPropagation(),
        children: /* @__PURE__ */ jsx(MoreVertical, { className: "w-4 h-4" })
      }
    ) }),
    /* @__PURE__ */ jsxs(PopoverContent, { className: "w-25 p-1", onClick: (e) => e.stopPropagation(), children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm hover:bg-gray-100 cursor-pointer",
          onClick: handleEdit,
          children: [
            /* @__PURE__ */ jsx(Pencil, { className: "w-4 h-4" }),
            " Edit"
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "button",
        {
          className: "flex w-full items-center gap-2 rounded-md px-2 py-1 text-sm text-red-600 hover:bg-red-100 cursor-pointer",
          onClick: handleDelete,
          children: [
            /* @__PURE__ */ jsx(Trash2, { className: "text-red-500 w-4 h-4", strokeWidth: 1.5 }),
            "Delete"
          ]
        }
      )
    ] })
  ] });
};
const columns = (onDeleteId) => [
  columnHelper.accessor("avatar", {
    header: () => /* @__PURE__ */ jsx("span", { className: "pl-1", children: "Name" }),
    cell: ({ row }) => /* @__PURE__ */ jsx(TruncatedText, { text: row.original?.name ?? "" }),
    enableSorting: false,
    size: 120
  }),
  columnHelper.accessor("position", {
    header: () => /* @__PURE__ */ jsx("span", { children: "Position" }),
    cell: ({ row }) => /* @__PURE__ */ jsx(TruncatedText, { text: row.original?.position ?? "" }),
    enableSorting: true,
    size: 140
  }),
  columnHelper.accessor("status", {
    header: () => /* @__PURE__ */ jsx("span", { children: "Status" }),
    cell: ({ row }) => {
      const status = row.original?.status;
      const statusColor = getStatusColor(status);
      return /* @__PURE__ */ jsx(
        "span",
        {
          className: `px-2 py-0.5 rounded-full text-[13px] text-ellipsis overflow-hidden ${statusColor.bg} ${statusColor.text}`,
          children: status ? status.toLowerCase().split("_").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ") : "--"
        }
      );
    },
    enableSorting: false,
    size: 200
  }),
  columnHelper.display({
    id: "actions",
    header: () => /* @__PURE__ */ jsx("span", { children: "Actions" }),
    cell: ({ row }) => /* @__PURE__ */ jsx(ActionCell, { candidate: row.original, onDeleteId }),
    enableSorting: false,
    size: 10
  })
];
function CandidateTable({
  candidatesData,
  isLoading,
  onDeleteId,
  lastRowRef,
  isFetchingNextPage
}) {
  const search = useSearch({
    from: "/_header/_applicants"
  });
  const navigate = useNavigate();
  const { applicant_id: id } = useParams({ strict: false });
  const [searchValue, setSearchValue] = useState(search.search_string ?? "");
  const [selectedRole, setSelectedRole] = useState(search.role);
  const [debouncedValue, setDebouncedValue] = useState(searchValue);
  const [selectedStatus, setSelectedStatus] = useState("");
  useEffect(() => {
    setSearchValue(search.search_string ?? "");
    setSelectedRole(search.role ?? "");
    setSelectedStatus(search.status ?? "");
  }, [search.search_string, search.role, search.status]);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchValue);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);
  const { data: roles } = useQuery({
    queryKey: ["roles"],
    queryFn: async () => {
      const response = await getListRolesAPI();
      return response;
    }
  });
  const roleList = roles?.data?.map((role) => ({
    id: role.id,
    name: role.role
  }));
  const handleFilterChange = (filters) => {
    setSelectedStatus(filters.status);
    setSelectedRole(filters.role);
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      navigate({
        to: id !== void 0 ? `/applicants/${id}` : `/applicants`,
        search: {
          ...debouncedValue ? { search_string: debouncedValue } : {},
          ...selectedRole ? { role: selectedRole } : {},
          ...selectedStatus ? { status: selectedStatus } : {}
        },
        replace: true
      });
    }, 500);
    return () => clearTimeout(handler);
  }, [debouncedValue, selectedRole, selectedStatus, navigate, id]);
  const handleSearchChange = (value) => {
    setSearchValue(value);
  };
  const handleRowClick = (row) => {
    const candidate = row.original;
    navigate({ to: `/applicants/${candidate.id}`, search, replace: true });
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-white rounded-lg w-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between p-2 pr-1", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3 text-sm font-medium", children: [
        /* @__PURE__ */ jsx(
          FilterMenu,
          {
            roleList: roleList ?? [],
            statusList: [
              { id: "APPLIED", name: "Applied" },
              { id: "SCREENED", name: "Screened" },
              { id: "SCHEDULE_INTERVIEW", name: "Schedule Interview" },
              { id: "INTERVIEWED", name: "Interviewed" },
              { id: "PIPELINE", name: "Pipeline" },
              { id: "REJECTED", name: "Rejected" },
              { id: "HIRED", name: "Hired" },
              { id: "JOINED", name: "Joined" },
              { id: "NOT_YET_RESPONDED", name: "Not Yet Responded" }
            ],
            onFilterChange: handleFilterChange,
            selectedRole,
            selectedStatus
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative flex items-center", children: [
          /* @__PURE__ */ jsx(Search, { className: "w-4.5 h-4.5 pl-1 text-gray-500" }),
          /* @__PURE__ */ jsx(
            Input,
            {
              type: "search",
              placeholder: "Search by name",
              value: searchValue,
              onChange: (e) => handleSearchChange(e.target.value),
              className: "border rounded !h-7 text-[#4F4F4F] bg-[rgba(0,0,0,0.08)] font-normal py-1 pl-6 text-sm w-42 absolute focus:ring-0 border-none"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs(
        Button,
        {
          onClick: () => navigate({ to: "/add_user" }),
          className: "flex items-center gap-1 h-7 text-white bg-[#05A155] hover:bg-[#05A155] rounded-sm cursor-pointer",
          children: [
            /* @__PURE__ */ jsx(AddUploadIcon, {}),
            "Add"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsx(
      TanstackTable,
      {
        data: candidatesData ?? [],
        columns: columns(onDeleteId),
        onRowClick: handleRowClick,
        lastRowRef,
        loading: isLoading,
        isFetchingNextPage
      }
    )
  ] });
}
const CandidateCountCard = ({ name, number, lineColor, iconBgColor, icon }) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between bg-white border !h-14 w-65 border-gray-200 rounded-[5px] p-3 shadow-none relative", children: [
    /* @__PURE__ */ jsx("div", { className: `absolute left-0 top-0 bottom-0 !h-9 mt-2 ml-3 border-2 ${lineColor} rounded` }),
    /* @__PURE__ */ jsxs("div", { className: "pl-4", children: [
      /* @__PURE__ */ jsx("h4", { className: "text-sm 3xl:!text-base text-[#444D5E] font-normal overflow-hidden text-ellipsis leading-[120%] py-0", children: name }),
      /* @__PURE__ */ jsx("p", { className: "text-lg 3xl:!text-xl text-[#0E0E0E] font-normal", children: number })
    ] }),
    /* @__PURE__ */ jsx("div", { className: `${iconBgColor} rounded-full p-2`, children: icon })
  ] });
};
const AlertDialog = AlertDialogPrimitive.Root;
const AlertDialogPortal = AlertDialogPrimitive.Portal;
const AlertDialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Overlay,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName;
const AlertDialogContent = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsx(
    AlertDialogPrimitive.Content,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName;
const AlertDialogHeader = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col space-y-2 text-center sm:text-left",
      className
    ),
    ...props
  }
);
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({
  className,
  ...props
}) => /* @__PURE__ */ jsx(
  "div",
  {
    className: cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2",
      className
    ),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Title,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName;
const AlertDialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Description,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName;
const AlertDialogAction = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Action,
  {
    ref,
    className: cn(buttonVariants(), className),
    ...props
  }
));
AlertDialogAction.displayName = AlertDialogPrimitive.Action.displayName;
const AlertDialogCancel = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  AlertDialogPrimitive.Cancel,
  {
    ref,
    className: cn(
      buttonVariants({ variant: "outline" }),
      "mt-2 sm:mt-0",
      className
    ),
    ...props
  }
));
AlertDialogCancel.displayName = AlertDialogPrimitive.Cancel.displayName;
const DeleteDialog = ({
  openOrNot,
  label,
  onCancelClick,
  onOKClick,
  deleteLoading,
  buttonLable
}) => {
  return /* @__PURE__ */ jsx(AlertDialog, { open: openOrNot, children: /* @__PURE__ */ jsxs(AlertDialogContent, { className: "bg-white text-gray-700 max-w-110 gap-10", children: [
    /* @__PURE__ */ jsx(AlertDialogHeader, { children: /* @__PURE__ */ jsxs(AlertDialogTitle, { className: "text-gray-700 text-md leading-relaxed 3xl:text-lg font-normal flex items-center justify-around gap-2", children: [
      label,
      /* @__PURE__ */ jsx(
        "button",
        {
          className: "w-7 h-7 rounded-full hover:bg-gray-100 transition-colors flex items-center justify-center cursor-pointer",
          onClick: onCancelClick,
          children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-4 h-4 text-gray-500",
              fill: "none",
              stroke: "currentColor",
              viewBox: "0 0 24 24",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M6 18L18 6M6 6l12 12"
                }
              )
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxs(AlertDialogFooter, { className: "mt-4", children: [
      /* @__PURE__ */ jsx(
        AlertDialogCancel,
        {
          className: "font-normal h-8 cursor-pointer focus:ring-0 focus-visible:ring-0 focus:outline-0",
          onClick: onCancelClick,
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsx(
        AlertDialogAction,
        {
          className: "bg-red-500 hover:bg-red-500 text-white  h-8 font-normal cursor-pointer",
          onClick: onOKClick,
          children: deleteLoading ? "Deleting..." : buttonLable?.toUpperCase() || "Delete"
        }
      )
    ] })
  ] }) });
};
function HiredIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      id: "Human_Resource-4",
      viewBox: "0 0 64 64",
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      fill: "white",
      children: [
        /* @__PURE__ */ jsx("path", { d: "m26 15c1.65527344 0 3.26855469.26464844 4.796875.78613281.5234375.17773438 1.09082031-.10009766 1.26953125-.62304688s-.10058594-1.09130859-.62304688-1.26953125c-1.73632812-.59277344-3.56835938-.89355469-5.44335938-.89355469-9.37402344 0-17 7.62597656-17 17 0 9.37776732 7.69117608 17 17 17 9.3040139 0 17-7.61748008 17-17 0-.93798828-.07519531-1.87060547-.22363281-2.77197266-.08887569-.54443359-.60449219-.91162109-1.1484375-.82470703-.54492188.08935547-.9140625.60400391-.82421875 1.14892578.12988281.79443359.19628906 1.61816406.19628906 2.44775391 0 3.53649902-1.23724365 6.78533936-3.29217529 9.35253906-1.75915527-2.69995117-4.35516357-4.67370605-7.34954834-5.65289307 2.18908691-1.42895508 3.64172363-3.89611816 3.64172363-6.699646 0-4.41113281-3.58886719-8-8-8s-8 3.58886719-8 8c0 2.80352783 1.45263672 5.27069092 3.64172363 6.699646-2.99438477.97918701-5.59039307 2.95294189-7.34954834 5.65289307-2.05493164-2.56719971-3.29217529-5.81604004-3.29217529-9.35253906 0-8.27099609 6.72851562-15 15-15zm.52008057 29.97363281c-.1741333.00598145-.34454346.02636719-.52008057.02636719s-.34594727-.02038574-.52008057-.02636719l-2.35101318-3.13525391 2.5602417-6.82763672c.1038208-.00268555.206604-.01074219.31085205-.01074219s.20703125.00805664.31085205.01074219l2.5602417 6.82763672zm9.78405762-4.10137939c-1.93023682 1.83026123-4.34002686 3.15374756-7.02490234 3.75549316l1.52056885-2.02764893c.20507812-.27294922.25585938-.63183594.13671875-.95117188l-2.39093018-6.37585449c3.2255249.69689941 6.03704834 2.7019043 7.75854492 5.59918213zm-16.30413818-13.87225342c0-3.30859375 2.69140625-6 6-6s6 2.69140625 6 6-2.69140625 6-6 6-6-2.69140625-6-6zm3.45440674 8.27307129-2.39093018 6.37585449c-.11914062.31933594-.06835938.67822266.13671875.95117188l1.52056885 2.02764893c-2.68487549-.60174561-5.09466553-1.92523193-7.02490234-3.75549316 1.72149658-2.89727783 4.53302002-4.90228271 7.75854492-5.59918213z" }),
        /* @__PURE__ */ jsx("path", { d: "m58.19433594 55.00878906-10.71911621-9.06994629.23181152-.23181152c.71777344-.71777344 1.11328125-1.67919922 1.11328125-2.70703125s-.39550781-1.98925781-1.11328125-2.70703125c-.49334717-.49407959-1.11224365-.82891846-1.77532959-.99414062 1.32403564-2.82659912 2.06829834-5.97674561 2.06829834-9.29882812 0-.74267578-.03515625-1.45996094-.10449219-2.1328125-.05761719-.54882812-.55566406-.95166016-1.09765625-.89160156-.54980469.05664062-.94921875.54833984-.89257812 1.09765625.06347656.60449219.09472656 1.25292969.09472656 1.92675781 0 11.02783203-8.97167969 20-20 20s-20-8.97216798-20-20.00000001 8.97167969-20 20-20c1.73632812 0 3.45800781.22119141 5.11621094.65722656.52832031.13916016 1.08007812-.17822266 1.22070312-.71289062.140625-.53417969-.17871094-1.08105469-.71289062-1.22167969-1.82324219-.47949219-3.71582031-.72265625-5.62402344-.72265625-12.13085938 0-22 9.86914062-22 22s9.86914062 22 22 22c3.32434082 0 6.47668457-.74523926 9.30474854-2.07098389.16455078.66827393.49346924 1.28326416.98822021 1.77801514.72070312.72119141 1.68164062 1.11816406 2.70703125 1.11816406s1.98632812-.39697266 2.70703125-1.11816406l.23138428-.23138428 9.07037354 10.71868896c.97070312 1.14746094 2.38867188 1.80566406 3.89257812 1.80566406 2.81152344 0 5.09863281-2.28759766 5.09863281-5.09912109 0-1.50244141-.65820312-2.92089844-1.80566406-3.89208984zm-16.90136719-5.71582031-1 1c-.68554688.68652344-1.90039062.68652344-2.5859375 0-.33984375-.34033203-.52734375-.79931641-.52734375-1.29296875 0-.0211792.00762939-.04669189.00842285-.0680542 3.18487549-1.8894043 5.85357666-4.55780029 7.74310303-7.74255371.50219727-.02056885 1.00195312.15783691 1.36175537.51763916.33984375.34033203.52734375.79931641.52734375 1.29296875s-.1875.95263672-.52734375 1.29296875l-1 1zm13.60839844 12.70703125c-.9140625 0-1.77539062-.39990234-2.36523438-1.09716797l-9.17871094-10.84619141 2.69921875-2.69873047 10.84570312 9.17724609c.69726562.59033203 1.09765625 1.45263672 1.09765625 2.36572266 0 1.70898438-1.38964844 3.09912109-3.09863281 3.09912109z" }),
        /* @__PURE__ */ jsx("path", { d: "m46 26c7.16796875 0 13-5.83154297 13-13s-5.83203125-13-13-13-13 5.83154297-13 13 5.83203125 13 13 13zm0-24c6.06542969 0 11 4.93457031 11 11s-4.93457031 11-11 11-11-4.93457031-11-11 4.93457031-11 11-11z" }),
        /* @__PURE__ */ jsx("path", { d: "m44.29296875 16.70703125c.1953125.1953125.45117188.29296875.70703125.29296875s.51171875-.09765625.70703125-.29296875l6-6c.390625-.390625.390625-1.0234375 0-1.4140625s-1.0234375-.390625-1.4140625 0l-5.29296875 5.29296875-3.29296875-3.29296875c-.390625-.390625-1.0234375-.390625-1.4140625 0s-.390625 1.0234375 0 1.4140625z" })
      ]
    }
  );
}
function GroupIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      "clip-rule": "evenodd",
      "fill-rule": "evenodd",
      height: "20",
      imageRendering: "optimizeQuality",
      shapeRendering: "geometricPrecision",
      textRendering: "geometricPrecision",
      viewBox: "0 0 512 512",
      width: "20",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "white",
      children: /* @__PURE__ */ jsx("g", { id: "Layer_x0020_1", children: /* @__PURE__ */ jsxs("g", { id: "_346398800", children: [
        /* @__PURE__ */ jsx("g", { id: "_346397000", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637188160",
            d: "m79.9999 237.793c-27.1997 0-49.3005-22.0997-49.3005-49.3005 0-27.1997 22.0997-49.3005 49.3005-49.3005 27.1997 0 49.3005 22.0997 49.3005 49.3005 0 27.1997-22.1009 49.3005-49.3005 49.3005zm0-86.5007c-20.5005 0-37.3005 16.6997-37.3005 37.3005 0 20.5005 16.6997 37.3005 37.3005 37.3005 20.5005 0 37.3005-16.6997 37.3005-37.3005 0-20.5997-16.7008-37.3005-37.3005-37.3005z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399088", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637188496",
            d: "m154.1 345.893h-148.1c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-41.4001c0-40.0997 32.5997-72.6994 72.6994-72.6994h14.7c40.0997 0 72.6994 32.5997 72.6994 72.6994v41.4001c.00118111 3.30001-2.69883 6.00002-5.99884 6.00002zm-142.1-12h136.1v-35.4001c0-33.4997-27.1997-60.7006-60.7006-60.7006l-14.7.00118111c-33.4997 0-60.7006 27.1997-60.7006 60.7006l.00118111 35.3989z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346398992", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187968",
            d: "m432 237.793c-27.1997 0-49.3005-22.0997-49.3005-49.3005 0-27.1997 22.0997-49.3005 49.3005-49.3005 27.1997 0 49.3005 22.0997 49.3005 49.3005-.100394 27.1997-22.2012 49.3005-49.3005 49.3005zm0-86.5007c-20.5005 0-37.3005 16.6997-37.3005 37.3005 0 20.5005 16.6997 37.3005 37.3005 37.3005 20.5005 0 37.3005-16.6997 37.3005-37.3005-.100394-20.5997-16.8012-37.3005-37.3005-37.3005z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399136", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637188352",
            d: "m506 345.893h-148.1c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-41.4001c0-40.0997 32.5997-72.6994 72.6994-72.6994h14.7012c40.0997 0 72.6994 32.5997 72.6994 72.6994v41.4001c0 3.30001-2.70001 6.00002-6.00002 6.00002zm-142.1-12h136.1v-35.4001c0-33.4997-27.1997-60.7006-60.7006-60.7006l-14.6989.00118111c-33.4997 0-60.7006 27.1997-60.7006 60.7006v35.3989z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346396592", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187392",
            d: "m255.6 216.693c-22.9005 0-42.6001-17.8997-46.9005-42.4997-.900003-4.99962-.799609-10.0996 0-15.3 1.09961-6.60002 3.79962-23.2997 4.20001-38.5005-.499608-2.10001-.100394-4.50001 1.6004-6.60002 3.70041-4.39962 10.9996-5.50041 36.4005 2.59961 8.40003 2.70001 17.1001 3.1004 25.3997 1.09961 7.50002-1.80001 10.6004-3.90001 11.7-4.99962 1.69961-1.6004 4.00041-2.10001 6.19963-1.5 2.2004.700396 3.79962 2.40001 4.39962 4.60041.100394.300001 7.00042 31.5001 4.99962 53.8998-2.69883 29.9009-20.1981 47.2005-47.999 47.2005zm-30.6993-94.3999c-.600002 14.8997-2.89962 30.4005-4.30041 38.5997-.700396 3.79962-.700396 7.60042 0 11.2004 3.30001 18.9001 18.0001 32.5997 35.1001 32.5997 21.7997 0 33.9001-12.1996 36.1005-36.3001 1.2-13.3996-1.3004-31.6005-3.19962-42.3001-2.70001 1.2-5.80041 2.2004-9.40042 3.00001-10.3996 2.5004-21.4005 1.99961-31.9005-1.39961-12.9-4.09962-19.3005-5.10002-22.3997-5.40002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399616", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187080",
            d: "m214.6 165.893c-1.39961 0-2.89962-.499608-4.09962-1.6004-.700396-.600002-16.9997-15.9-15.6-38.7001 1.0004-17.7001 12.3-34.3005 33.4005-49.6005.199607-.100394.400395-.300001.600002-.400395 1.2-.600002 28.5001-15.4997 50.8998-5.59962 11.1 4.90041 18.7997 14.7 22.9005 29.2997 4.60041 2.40001 13.0996 7.99963 15.9 18.6001 3.30001 12.4004-2.10001 27.0001-16.2 43.3997-2.2004 2.5004-5.89962 2.8004-8.50042.700396-2.5004-2.2004-2.8004-5.89962-.700396-8.50042 11.1-13.0004 15.9-24.1005 13.6996-32.2997-2.2004-8.40003-11.4-11.8004-11.5004-11.8996-1.9004-.700396-3.30001-2.29961-3.79962-4.20001-3.00001-12.3-8.59963-20.2997-16.8001-24.0001-15.9-7.00042-37.2001 3.60001-40.0005 4.99962-17.8004 13.0004-27.3001 26.5005-28.0997 40.3005-1.09961 16.9997 11.7 29.1001 11.8004 29.2997 2.40001 2.29961 2.59961 6.10041.300001 8.50042-1.0004 1.0004-2.59961 1.70079-4.20001 1.70079z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400168", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187440",
            d: "m230.2 229.492c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-22.3997c0-3.30001 2.70001-6.00002 6.00002-6.00002s6.00002 2.70001 6.00002 6.00002v22.3997c0 3.30001-2.70001 6.00002-6.00002 6.00002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399472", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187368",
            d: "m281.8 229.492c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-20.8997c0-3.30001 2.70001-6.00002 6.00002-6.00002s6.00002 2.70001 6.00002 6.00002v20.8997c0 3.30001-2.70001 6.00002-6.00002 6.00002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399640", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187656",
            d: "m268.4 237.793h-23.7001c-1.0004 0-2.10001-.300001-3.00001-.799609l-14.5997-8.20042c-2.89962-1.6004-3.90001-5.29962-2.29961-8.20042s5.29962-3.90001 8.20042-2.29961l13.2 7.50002h20.3989l11.8996-7.39963c2.8004-1.69961 6.49963-.900003 8.29963 1.99961 1.69961 2.8004.900003 6.49963-1.99961 8.29963l-13.3996 8.20042c-.80079.600002-1.9004.900003-3.00001.900003z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399736", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187176",
            d: "m261.4 256.793h-10.0004c-2.5004 0-4.80001-1.6004-5.70002-4.00041l-6.70041-19.0997c-1.09961-3.1004.499608-6.60002 3.70041-7.60042 3.1004-1.09961 6.60002.499608 7.60042 3.70041l5.29962 15h1.5l5.59962-15.1004c1.09961-3.1004 4.60041-4.69962 7.69963-3.49962 3.1004 1.09961 4.69962 4.60041 3.49962 7.69963l-7.00042 19.0997c-.798428 2.30079-2.99765 3.8008-5.49805 3.8008z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400216", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637186888",
            d: "m241.8 315.693c-2.5004 0-4.90041-1.6004-5.70002-4.20001l-27.1997-85.8995c-1.0004-3.19962.700396-6.49963 3.90001-7.50002 3.19962-1.0004 6.49963.700396 7.50002 3.90001l27.1997 85.8995c1.0004 3.19962-.700396 6.49963-3.90001 7.50002-.499608.199607-1.2.300001-1.80001.300001z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399712", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637187008",
            d: "m270.3 315.693c-.600002 0-1.2-.100394-1.80001-.300001-3.19962-1.0004-4.90041-4.39962-3.90001-7.50002l27.3001-85.8995c1.0004-3.19962 4.39962-4.90041 7.50002-3.90001 3.19962 1.0004 4.90041 4.39962 3.90001 7.50002l-27.3001 85.8995c-.799609 2.5004-3.19962 4.20001-5.70002 4.20001z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400936", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637186672",
            d: "m271.9 310.293c-2.8004 0-5.29962-1.99961-5.89962-4.80001l-10.5-53.5006c-.600002-3.30001 1.5-6.40041 4.69962-7.00042 3.19962-.600002 6.40041 1.5 7.00042 4.69962l10.6004 53.5006c.600002 3.30001-1.5 6.40041-4.69962 7.00042-.401576.100394-.80079.100394-1.20118.100394z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400792", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637186408",
            d: "m240.1 310.093c-.400395 0-.799609 0-1.3004-.100394-3.19962-.700396-5.29962-3.90001-4.60041-7.09963l11.2996-53.2998c.700396-3.19962 3.90001-5.29962 7.09963-4.60041 3.19962.700396 5.29962 3.90001 4.60041 7.09963l-11.1992 53.2998c-.600002 2.8004-3.09922 4.7008-5.89962 4.7008z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400840", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637186840",
            d: "m322.8 345.893c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-56.4002c0-3.30001 2.70001-6.00002 6.00002-6.00002s6.00002 2.70001 6.00002 6.00002v56.4002c0 3.30001-2.59961 6.00002-6.00002 6.00002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400576", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637186048",
            d: "m189.2 345.893c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-56.4002c0-3.30001 2.70001-6.00002 6.00002-6.00002s6.00002 2.70001 6.00002 6.00002v56.4002c0 3.30001-2.70001 6.00002-6.00002 6.00002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346399544", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637185640",
            d: "m199.799 345.893h-45.6994c-3.30001 0-6.00002-2.70001-6.00002-6.00002v-60.1006c0-34.3005 27.9001-62.2998 62.2998-62.2998h19.8001c3.30001 0 6.00002 2.70001 6.00002 6.00002s-2.70001 6.00002-6.00002 6.00002h-19.8001c-27.7005 0-50.2998 22.5001-50.2998 50.2998v54.1006h39.6993c3.30001 0 6.00002 2.70001 6.00002 6.00002s-2.70001 6.00002-6.00002 6.00002z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400552", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637185688",
            d: "m357.9 345.893h-45.6994c-3.30001 0-6.00002-2.70001-6.00002-6.00002s2.70001-6.00002 6.00002-6.00002h39.6993v-54.1006c0-27.7005-22.5001-50.2998-50.2998-50.2998h-19.8001c-3.30001 0-6.00002-2.70001-6.00002-6.00002s2.70001-6.00002 6.00002-6.00002h19.8001c34.3005 0 62.2998 27.9001 62.2998 62.2998v60.1006c0 1.6004-.600002 3.1004-1.80001 4.20001-1.09961 1.2-2.59961 1.80001-4.20001 1.80001z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400264", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637185856",
            d: "m256 445.393c-39.4997 0-71.5998-32.1001-71.5998-71.5998s32.1001-71.5998 71.5998-71.5998 71.5998 32.1001 71.5998 71.5998-32.1001 71.5998-71.5998 71.5998zm0-131.3c-32.8997 0-59.5998 26.8005-59.5998 59.5998 0 32.8997 26.8005 59.5998 59.5998 59.5998 32.8997 0 59.5998-26.8005 59.5998-59.5998s-26.7001-59.5998-59.5998-59.5998z"
          }
        ) }),
        /* @__PURE__ */ jsx("g", { id: "_346400360", children: /* @__PURE__ */ jsx(
          "path",
          {
            id: "_637185496",
            d: "m249.1 409.593c-1.6004 0-3.1004-.600002-4.20001-1.80001l-31.9005-31.9005c-2.29961-2.29961-2.29961-6.10041 0-8.50042l11.2996-11.2996c1.09961-1.09961 2.70001-1.80001 4.20001-1.80001s3.1004.600002 4.20001 1.80001l16.3997 16.3997 30.1005-30.1005c2.29961-2.29961 6.10041-2.29961 8.50042 0l11.2996 11.2996c2.29961 2.29961 2.29961 6.10041 0 8.50042l-45.6001 45.6001c-1.09961 1.10079-2.69883 1.80119-4.29923 1.80119zm-23.4001-37.9005 23.4001 23.4001 37.0997-37.0997-2.8004-2.8004-30.1005 30.1005c-2.29961 2.29961-6.10041 2.29961-8.50042 0l-16.3997-16.3997-2.69883 2.79922z"
          }
        ) })
      ] }) })
    }
  );
}
function ScreenedIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      id: "Layer_1",
      enableBackground: "new 0 0 512 512",
      viewBox: "0 0 512 512",
      width: "20",
      height: "20",
      xmlns: "http://www.w3.org/2000/svg",
      fill: "white",
      children: /* @__PURE__ */ jsx("path", { d: "m466.826 54.324h-421.652c-7.327 0-13.288 5.961-13.288 13.288v237.177c0 4.418 3.582 8 8 8h432.229c4.418 0 8-3.582 8-8v-237.177c-.001-7.327-5.962-13.288-13.289-13.288zm-418.94 16h200.114v226.465h-200.114zm416.228 226.465h-200.114v-226.465h200.114zm1.755-274.351h-419.738c-25.437 0-46.131 20.694-46.131 46.13v262.32c0 25.437 20.694 46.131 46.131 46.131h123.927v44.581h-50.041c-22.341 0-40.517 15.244-40.517 33.98v25.981c0 4.418 3.582 8 8 8h337c4.418 0 8-3.582 8-8v-25.981c0-18.737-18.176-33.98-40.517-33.98h-50.041v-44.581h123.927c25.437 0 46.131-20.694 46.131-46.131v-262.32c0-25.436-20.694-46.13-46.131-46.13zm-49.369 433.143v17.981h-321v-17.981c0-9.747 11.228-17.98 24.517-17.98h271.967c13.288-.001 24.516 8.233 24.516 17.98zm-90.558-33.981h-139.884v-44.581h139.885v44.581zm170.058-90.712c0 16.614-13.517 30.131-30.131 30.131h-419.738c-16.614 0-30.131-13.517-30.131-30.131v-262.32c0-16.614 13.517-30.13 30.131-30.13h419.738c16.614 0 30.131 13.517 30.131 30.13zm-198.003-84.193c4.333 5.879 11.028 9.25 18.368 9.25h95.384c7.34 0 14.034-3.371 18.367-9.249 4.334-5.878 5.574-13.271 3.402-20.283-6.623-21.388-22.254-37.86-42.008-45.851 8.145-7.45 13.262-18.157 13.262-30.038 0-22.45-18.265-40.715-40.715-40.715s-40.715 18.265-40.715 40.715c0 11.881 5.117 22.587 13.261 30.037-19.754 7.99-35.385 24.463-42.008 45.851-2.171 7.012-.931 14.405 3.402 20.283zm66.061-120.884c13.628 0 24.715 11.087 24.715 24.715s-11.087 24.715-24.715 24.715-24.715-11.087-24.715-24.715 11.087-24.715 24.715-24.715zm-54.179 105.335c7.392-23.869 29.164-39.906 54.178-39.906s46.786 16.037 54.179 39.906c.651 2.105.288 4.312-.998 6.056-1.285 1.743-3.285 2.743-5.488 2.743h-95.384c-2.203 0-4.204-1-5.489-2.744s-1.649-3.95-.998-6.055zm-92.475-4.732c-6.624-21.388-22.254-37.861-42.009-45.851 8.144-7.45 13.261-18.156 13.261-30.037 0-22.45-18.265-40.715-40.715-40.715-22.449 0-40.714 18.265-40.714 40.715 0 11.881 5.117 22.588 13.261 30.037-19.754 7.99-35.385 24.463-42.008 45.851-2.171 7.011-.931 14.404 3.402 20.282s11.028 9.25 18.367 9.25h95.385c7.34 0 14.034-3.371 18.367-9.249 4.335-5.879 5.575-13.272 3.403-20.283zm-69.463-100.603c13.628 0 24.715 11.087 24.715 24.715s-11.087 24.715-24.715 24.715c-13.627 0-24.714-11.087-24.714-24.715s11.087-24.715 24.714-24.715zm53.182 111.391c-1.285 1.743-3.285 2.743-5.488 2.743h-95.385c-2.203 0-4.203-1-5.488-2.744-1.286-1.744-1.649-3.951-.998-6.055 7.393-23.87 29.165-39.907 54.179-39.907s46.786 16.037 54.179 39.906c.65 2.106.287 4.313-.999 6.057z" })
    }
  );
}
function InterviewScheduledIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      id: "Layer_1",
      enableBackground: "new 0 0 512 512",
      viewBox: "0 0 512 512",
      xmlns: "http://www.w3.org/2000/svg",
      width: "20",
      height: "20",
      fill: "white",
      children: /* @__PURE__ */ jsx("path", { d: "m464.741 59.513h-8.647v-10.257c0-8.72-7.095-15.814-15.814-15.814h-15.496c-8.72 0-15.814 7.095-15.814 15.814v10.257h-39.765v-10.257c0-8.72-7.095-15.814-15.815-15.814h-15.495c-8.72 0-15.814 7.095-15.814 15.814v10.257h-39.766v-10.257c0-8.72-7.095-15.814-15.814-15.814h-15.496c-8.72 0-15.814 7.095-15.814 15.814v10.257h-39.765v-10.257c0-8.72-7.095-15.814-15.814-15.814h-15.496c-8.72 0-15.814 7.095-15.814 15.814v10.257h-8.647c-9.983 0-19.346 3.707-26.538 10.347-9.624-4.652-20.412-7.262-31.798-7.262-40.429 0-73.319 32.889-73.319 73.315 0 40.427 32.89 73.316 73.315 73.316 6.599 0 12.99-.891 19.077-2.533v20.671h-52.742c-12.218 0-22.157 9.94-22.157 22.158v169.083h-9.493c-4.418 0-8 3.582-8 8v31.085c0 3.889 2.797 7.215 6.628 7.882l73.906 12.865c.453.078.912.118 1.372.118h185.183c.46 0 .919-.04 1.372-.118l73.906-12.865c3.831-.667 6.628-3.993 6.628-7.882v-31.085c0-4.418-3.582-8-8-8h-9.493v-17.227h77.907c10.791 0 20.131-3.869 27.761-11.498l47.332-47.332c7.629-7.63 11.498-16.97 11.498-27.761v-216.019c0-21.647-17.611-39.258-39.259-39.258zm-39.772-10.072h15.125v47.031h-15.125zm-86.89 0h15.125v47.031h-15.125zm-86.891 0h15.125v47.031h-15.125zm-86.889 0h15.125v47.031h-15.125zm-24.648 26.072h8.647v21.146c0 8.72 7.095 15.814 15.814 15.814h15.496c8.72 0 15.814-7.095 15.814-15.814v-21.146h39.765v21.146c0 8.72 7.095 15.814 15.814 15.814h15.496c8.72 0 15.814-7.095 15.814-15.814v-21.146h39.766v21.146c0 8.72 7.095 15.814 15.814 15.814h15.495c8.721 0 15.815-7.095 15.815-15.814v-21.146h39.765v21.146c0 8.72 7.095 15.814 15.814 15.814h15.496c8.72 0 15.814-7.095 15.814-15.814v-21.146h8.647c12.825 0 23.259 10.434 23.259 23.259v28.96h-333.832c-2.189-19.616-12.144-36.915-26.717-48.747 3.617-2.247 7.809-3.472 12.204-3.472zm-115.651 60.4c0-31.604 25.712-57.315 57.315-57.315 31.604 0 57.316 25.712 57.316 57.315 0 31.604-25.712 57.316-57.316 57.316-31.603 0-57.315-25.711-57.315-57.316zm316.995 315.053-66.598 11.593h-183.8l-66.597-11.593v-16.357h316.995zm-299.502-32.358v-169.083c0-3.396 2.762-6.158 6.157-6.158h86.655c-2.286 5.835-3.555 12.175-3.555 18.811 0 16.748 8.004 31.655 20.38 41.119-10.006 3.518-19.419 8.708-27.757 15.399-14.755 11.844-25.665 27.977-31.205 45.918h-11.493c-4.418 0-8 3.582-8 8v30.026c0 4.418 3.582 8 8 8h203.645c4.418 0 8-3.582 8-8v-30.026c0-4.418-3.582-8-8-8h-11.495c-5.541-17.941-16.45-34.074-31.205-45.918-8.336-6.691-17.749-11.881-27.755-15.399 12.376-9.464 20.38-24.371 20.38-41.119 0-6.635-1.269-12.976-3.555-18.811h86.653c3.389 0 6.146 2.752 6.157 6.139l.001 169.102zm340.618-132.63h-42.609v-36.452c0-.013-.001-.026-.001-.039v-6.12h42.61zm-42.609 16h42.609v42.609h-42.609zm58.609-58.611h42.609v42.61h-42.609zm42.61-16h-42.609v-42.609h42.609zm-58.61 0h-42.61v-42.609h42.61zm-58.61 0h-6.157-36.452v-42.609h42.609zm-58.609 0h-42.61v-42.609h42.61zm-82.394 70.558c-19.711 0-35.747-16.036-35.747-35.747s16.036-35.746 35.747-35.746 35.747 16.035 35.747 35.746-16.036 35.747-35.747 35.747zm93.822 82.688v14.026h-187.645v-14.026zm-167.285-16c11.379-30.296 40.282-50.688 73.463-50.688 33.18 0 62.082 20.393 73.461 50.688zm97.246-148.369c-7.126-3.705-15.211-5.812-23.783-5.812-6.641 0-12.987 1.271-18.826 3.561v-29.234h42.609zm133.221 169.138v-24.795h50.609c4.418 0 8-3.582 8-8v-50.609h50.609c4.418 0 8-3.582 8-8v-117.22c0-4.418-3.582-8-8-8h-293.048c-4.418 0-8 3.582-8 8v47.181c-1.195 1.089-2.339 2.233-3.428 3.428h-27.852v-27.091c20.596-11.27 35.218-32.136 37.817-56.545h333.791v171.06c0 1.728-.17 3.372-.489 4.948h-49.339c-8.72 0-15.814 7.095-15.814 15.814v49.339c-1.577.319-3.221.489-4.948.489h-77.908zm98.855-11.315v-38.328h38.328zm-322.031-217.94c-1.481 2.566-4.171 4.001-6.936 4.001-1.357 0-2.732-.346-3.992-1.073l-28.083-16.214c-2.476-1.429-4-4.069-4-6.928v-38.806c0-4.418 3.582-8 8-8s8 3.582 8 8v34.187l24.083 13.905c3.827 2.209 5.138 7.102 2.928 10.928z" })
    }
  );
}
function InterviewedIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      version: "1.1",
      id: "Capa_1",
      xmlns: "http://www.w3.org/2000/svg",
      xmlnsXlink: "http://www.w3.org/1999/xlink",
      x: "0px",
      y: "0px",
      viewBox: "0 0 512 512",
      enableBackground: "new 0 0 512 512",
      xmlSpace: "preserve",
      width: "20",
      height: "20",
      fill: "white",
      children: [
        /* @__PURE__ */ jsxs("g", { children: [
          /* @__PURE__ */ jsx(
            "path",
            {
              id: "XMLID_502_",
              style: {
                fill: "fff",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M111.741,225.675L111.741,225.675c-25.847,0-46.799,20.953-46.799,46.799v11.943c0,25.846,20.953,46.799,46.799,46.799h0\n		c25.846,0,46.799-20.953,46.799-46.799v-11.943C158.54,246.628,137.587,225.675,111.741,225.675z"
            }
          ),
          /* @__PURE__ */ jsx(
            "line",
            {
              id: "XMLID_501_",
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              x1: "163.056",
              y1: "437.853",
              x2: "163.056",
              y2: "396.464"
            }
          ),
          /* @__PURE__ */ jsx(
            "line",
            {
              id: "XMLID_500_",
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              x1: "60.288",
              y1: "437.853",
              x2: "60.288",
              y2: "396.464"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M127.882,331.216H95.461C48.262,331.216,10,369.478,10,416.677V439h203.343v-22.323\n		C213.344,369.478,175.081,331.216,127.882,331.216z"
            }
          ),
          /* @__PURE__ */ jsx(
            "polyline",
            {
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              points: "\n		298.657,502 10,502 10,439 297.657,439 	"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              id: "XMLID_410_",
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M400.397,255.913L400.397,255.913c-25.847,0-46.799,20.953-46.799,46.799v11.943c0,25.846,20.953,46.799,46.799,46.799h0\n		c25.846,0,46.799-20.953,46.799-46.799v-11.943C447.197,276.866,426.244,255.913,400.397,255.913z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M416.539,361.455h-32.421c-47.199,0-85.461,38.262-85.461,85.461V502H502v-55.084C502,399.717,463.738,361.455,416.539,361.455z"
            }
          ),
          /* @__PURE__ */ jsx(
            "path",
            {
              id: "XMLID_18_",
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M475.501,56.761l-131.308,0c-14.635,0-26.499,11.864-26.499,26.499l0,112.123c0,14.635,11.864,26.499,26.499,26.499l82.559,0\n		v31.738l33.412-31.738h15.338c14.635,0,26.499-11.864,26.499-26.499l0-112.123C502,68.625,490.136,56.761,475.501,56.761z"
            }
          ),
          /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsx(
              "path",
              {
                style: {
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 20,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10
                },
                d: "\n			M395.373,116.019c0-10.997,9.255-19.831,20.401-19.14c9.55,0.593,17.323,8.366,17.916,17.916\n			c0.54,8.694-4.717,16.238-12.274,19.136c-4.112,1.577-6.865,5.475-6.865,9.879v5.897"
              }
            ),
            /* @__PURE__ */ jsx(
              "line",
              {
                style: {
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 20,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10
                },
                x1: "414.551",
                y1: "181.769",
                x2: "414.551",
                y2: "181.769"
              }
            )
          ] }),
          /* @__PURE__ */ jsxs("g", { children: [
            /* @__PURE__ */ jsx(
              "line",
              {
                id: "XMLID_499_",
                style: {
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 20,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10
                },
                x1: "55.825",
                y1: "72.56",
                x2: "180.808",
                y2: "72.56"
              }
            ),
            /* @__PURE__ */ jsx(
              "line",
              {
                id: "XMLID_409_",
                style: {
                  fill: "none",
                  stroke: "#fff",
                  strokeWidth: 20,
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeMiterlimit: 10
                },
                x1: "55.825",
                y1: "112.56",
                x2: "115.045",
                y2: "112.56"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            "path",
            {
              id: "XMLID_408_",
              style: {
                fill: "none",
                stroke: "#fff",
                strokeWidth: 20,
                strokeLinecap: "round",
                strokeLinejoin: "round",
                strokeMiterlimit: 10
              },
              d: "\n		M200.114,10L36.519,10C21.884,10,10.02,21.864,10.02,36.499l0,112.123c0,14.635,11.864,26.499,26.499,26.499l114.846,0v31.738\n		l33.412-31.738l15.338,0c14.635,0,26.499-11.864,26.499-26.499l0-112.123C226.613,21.864,214.749,10,200.114,10z"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {}),
        /* @__PURE__ */ jsx("g", {})
      ]
    }
  );
}
const apiApplicantToCandidate = (records) => ({
  id: records.id,
  avatar: records.avatar,
  name: records.firstname.charAt(0).toUpperCase() + records.firstname.slice(1).toLowerCase() + " " + records.lastName.charAt(0).toUpperCase() + records.lastName.slice(1).toLowerCase(),
  position: records.role,
  status: records.status?.toUpperCase() || null
});
function Home() {
  const search = useSearch({
    from: "/_header/_applicants"
  });
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { applicant_id: id } = useParams({ strict: false });
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const {
    data: statsData,
    isError,
    error
  } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      const response = await getStatsAPI();
      return response.data;
    },
    retry: false
  });
  if (isError) {
    toast.error(error.message);
  }
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetching } = useInfiniteQuery({
    queryKey: [
      "applicants",
      search.search_string,
      search.role,
      search.status
    ],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await getAllApplicants({
        pageParam,
        search_string: search.search_string || "",
        role: search.role || "",
        status: search.status || ""
      });
      return response.data;
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage || !lastPage.paginationInfo) return void 0;
      if (lastPage.paginationInfo.current_page < lastPage.paginationInfo.total_pages) {
        return lastPage.paginationInfo.current_page + 1;
      }
      return void 0;
    },
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: 5 * 60 * 1e3
  });
  const deleteApplicantMutation = useMutation({
    mutationKey: ["deleteApplicant"],
    mutationFn: async (id2) => {
      const response = await deleteApplicant(id2);
      return response.data;
    },
    onMutate: async (deletedId) => {
      await queryClient.cancelQueries({
        queryKey: [
          "applicants",
          search.search_string,
          search.role,
          search.status
        ]
      });
      const previousData = queryClient.getQueryData([
        "applicants",
        search.search_string,
        search.role,
        search.status
      ]);
      queryClient.setQueryData(
        ["applicants", search.search_string, search.role, search.status],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              records: page.records.filter(
                (record) => record.id !== deletedId
              )
            }))
          };
        }
      );
      return { previousData };
    },
    onError: (_error, _deletedId, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["applicants", search.search_string, search.role, search.status],
          context.previousData
        );
      }
    },
    onSuccess: (_, deletedId) => {
      queryClient.invalidateQueries({
        queryKey: [
          "applicants",
          search.search_string,
          search.role,
          search.status
        ]
      });
      queryClient.invalidateQueries({ queryKey: ["stats"] });
      setIsDeleteDialogOpen(false);
      if (id && String(id) === String(deletedId)) {
        navigate({ to: "/applicants", replace: true });
      } else if (id) {
        queryClient.invalidateQueries({ queryKey: ["applicant", id] });
      }
    }
  });
  const candidatesData = data?.pages.flatMap(
    (page) => page?.records?.map(apiApplicantToCandidate)
  ) || [];
  const observer = useRef(null);
  const lastRowRef = useCallback(
    (node) => {
      if (isFetching || isFetchingNextPage || !hasNextPage) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasNextPage) {
            fetchNextPage();
          }
        },
        { root: null, rootMargin: "0px", threshold: 1 }
      );
      if (node) observer.current.observe(node);
    },
    [isFetching, isFetchingNextPage, hasNextPage, fetchNextPage]
  );
  const onDeleteId = (field) => {
    setDeleteId(field);
    setIsDeleteDialogOpen(true);
  };
  const handleDeleteConfirm = () => {
    if (deleteId) {
      deleteApplicantMutation.mutate(deleteId.id, {
        onSettled: () => {
          setIsDeleteDialogOpen(false);
        }
      });
    }
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-4 m-2", children: [
      /* @__PURE__ */ jsx(
        CandidateCountCard,
        {
          name: "Total Applicants",
          number: statsData?.totalApplicants || 0,
          lineColor: "border-[#9C1C24]",
          iconBgColor: "bg-[#9C1C24]",
          icon: /* @__PURE__ */ jsx(GroupIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        CandidateCountCard,
        {
          name: "Screened",
          number: statsData?.screened || 0,
          lineColor: "border-[#2F80ED]",
          iconBgColor: "bg-[#2F80ED]",
          icon: /* @__PURE__ */ jsx(ScreenedIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        CandidateCountCard,
        {
          name: "Scheduled Interviews",
          number: statsData?.interview_scheduled || 0,
          lineColor: "border-[#556B2F]",
          iconBgColor: "bg-[#556B2F]",
          icon: /* @__PURE__ */ jsx(InterviewScheduledIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        CandidateCountCard,
        {
          name: "Interviewed",
          number: statsData?.interviewed || 0,
          lineColor: "border-[#F2994A]",
          iconBgColor: "bg-[#F2994A]",
          icon: /* @__PURE__ */ jsx(InterviewedIcon, {})
        }
      ),
      /* @__PURE__ */ jsx(
        CandidateCountCard,
        {
          name: "Hired",
          number: statsData?.hired || 0,
          lineColor: "border-[#556B2F]",
          iconBgColor: "bg-[#556B2F]",
          icon: /* @__PURE__ */ jsx(HiredIcon, {})
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      ResizablePanelGroup,
      {
        direction: "horizontal",
        className: "w-full rounded-lg",
        children: [
          /* @__PURE__ */ jsxs(ResizablePanel, { defaultSize: 30, children: [
            /* @__PURE__ */ jsx("div", { className: "flex-1 flex flex-col", children: /* @__PURE__ */ jsx(
              CandidateTable,
              {
                candidatesData,
                isLoading: isFetching && !isFetchingNextPage,
                onDeleteId,
                lastRowRef,
                isFetchingNextPage
              }
            ) }),
            /* @__PURE__ */ jsx(
              DeleteDialog,
              {
                openOrNot: isDeleteDialogOpen,
                label: "Are you sure you want to delete this Applicant?",
                onCancelClick: () => setIsDeleteDialogOpen(false),
                onOKClick: handleDeleteConfirm,
                deleteLoading: deleteApplicantMutation.isPending,
                buttonLable: "Yes! Delete"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(ResizableHandle, { withHandle: true }),
          /* @__PURE__ */ jsx(ResizablePanel, { defaultSize: 70, children: /* @__PURE__ */ jsx(Outlet, {}) })
        ]
      }
    )
  ] });
}
const SplitComponent = Home;
export {
  SplitComponent as component
};
