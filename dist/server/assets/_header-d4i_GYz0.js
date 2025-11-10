import { jsxs, jsx } from "react/jsx-runtime";
import { useNavigate, Outlet } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { C as Card, a as CardContent } from "./card-C_27feJs.js";
import { D as DropdownMenu, a as DropdownMenuTrigger, b as DropdownMenuContent, c as DropdownMenuItem } from "./dropdown-menu-HPkNXu5w.js";
import { LogOut } from "lucide-react";
import { P as PeepulAgriIcon } from "./Peepulagri-BxK9--yh.js";
import "./utils-H80jjgLf.js";
import "clsx";
import "tailwind-merge";
import "@radix-ui/react-dropdown-menu";
function ProfileIcon() {
  return /* @__PURE__ */ jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      fill: "#fff",
      width: "18px",
      height: "18px",
      viewBox: "0 0 32 32",
      id: "user",
      children: [
        /* @__PURE__ */ jsx("title", {}),
        /* @__PURE__ */ jsx("path", { d: "M22.56,16.53a9.95,9.95,0,0,1-13.12,0A15,15,0,0,0,1,30a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1A15,15,0,0,0,22.56,16.53Z" }),
        /* @__PURE__ */ jsx("circle", { cx: "16", cy: "9", r: "8" })
      ]
    }
  );
}
function DropdownIcon() {
  return /* @__PURE__ */ jsx(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      width: "12",
      height: "7",
      viewBox: "0 0 12 7",
      fill: "none",
      children: /* @__PURE__ */ jsx(
        "path",
        {
          d: "M11.2548 1.57114L6.06834 6.75763C6.02017 6.80585 5.96297 6.8441 5.90001 6.8702C5.83704 6.89631 5.76955 6.90974 5.70139 6.90974C5.63324 6.90974 5.56575 6.89631 5.50278 6.8702C5.43982 6.8441 5.38262 6.80585 5.33445 6.75763L0.147963 1.57114C0.0753461 1.4986 0.0258839 1.40615 0.00583789 1.30549C-0.0142081 1.20483 -0.00393645 1.10048 0.0353525 1.00566C0.0746414 0.910841 0.141181 0.829809 0.226547 0.772825C0.311914 0.715841 0.412268 0.685466 0.514907 0.685547H10.8879C10.9905 0.685466 11.0909 0.715841 11.1762 0.772825C11.2616 0.829809 11.3281 0.910841 11.3674 1.00566C11.4067 1.10048 11.417 1.20483 11.3969 1.30549C11.3769 1.40615 11.3274 1.4986 11.2548 1.57114Z",
          fill: "#333333"
        }
      )
    }
  );
}
function Header({
  adminrole,
  adminName,
  onLogout
}) {
  return /* @__PURE__ */ jsx(
    Card,
    {
      className: "!gap-0 w-full !py-0 border-none bg-gray-100 shadow-none rounded-none ",
      children: /* @__PURE__ */ jsxs(CardContent, { className: "flex items-center justify-between !px-5 p-0", children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center text-sm 2xl:text-base 3xl:!text-lg font-(--an-card-font-weight) text-(--an-card-email-color) leading-(--an-card-line-height) space-x-2", children: /* @__PURE__ */ jsx(PeepulAgriIcon, { className: "w-12 h-12" }) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-2 m-2 rounded-sm", children: /* @__PURE__ */ jsx("div", { className: "relative group", children: /* @__PURE__ */ jsxs(DropdownMenu, { children: [
          /* @__PURE__ */ jsx(DropdownMenuTrigger, { asChild: true, children: /* @__PURE__ */ jsx("div", { className: "flex items-center space-x-3", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2", children: [
            /* @__PURE__ */ jsx("div", { className: "w-8 h-8 border border-black/30 rounded-full flex items-center justify-center bg-black/30", children: /* @__PURE__ */ jsx(ProfileIcon, {}) }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center space-x-2 leading-tight", children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx("p", { className: "text-[13px] 3xl:!text-sm text-[#333] capitalize", children: adminName }),
                /* @__PURE__ */ jsx("p", { className: "text-[11px] 3xl:!text-xs text-[#444C5E] capitalize", children: adminrole })
              ] }),
              /* @__PURE__ */ jsx(DropdownIcon, {})
            ] })
          ] }) }) }),
          /* @__PURE__ */ jsx(
            DropdownMenuContent,
            {
              align: "end",
              className: "min-w-32 border-none shadow-[0px_0px_10px_rgba(0,0,0,0.15)] rounded-sm p-1",
              children: /* @__PURE__ */ jsx(DropdownMenuItem, { onClick: onLogout, children: /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsx(LogOut, { className: "text-red-600 w-4 h-4", strokeWidth: 1.5 }),
                /* @__PURE__ */ jsx("p", { className: "text-sm 3xl:!text-base font-normal text-gray-600", children: "logout" })
              ] }) })
            }
          )
        ] }) }) })
      ] })
    }
  );
}
function Stats({ adminName, adminrole }) {
  const [userData, setUserData] = useState({
    name: adminName || "",
    user_type: adminrole || ""
  });
  const navigate = useNavigate();
  useEffect(() => {
    const storedUserData = Cookies.get("user_data");
    if (storedUserData) {
      try {
        const parsedUserData = JSON.parse(storedUserData);
        setUserData({
          name: parsedUserData.name || adminName || "",
          user_type: parsedUserData.user_type || adminrole || ""
        });
      } catch (error) {
        const userName = Cookies.get("name");
        const userType = Cookies.get("user_type");
        setUserData({
          name: userName || adminName || "",
          user_type: userType || adminrole || ""
        });
      }
    } else {
      const userName = Cookies.get("name");
      const userType = Cookies.get("user_type");
      if (userName || userType) {
        setUserData({
          name: userName || adminName || "",
          user_type: userType || adminrole || ""
        });
      }
    }
  }, [adminName, adminrole]);
  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user_data");
    Cookies.remove("name");
    Cookies.remove("user_type");
    navigate({ to: "/" });
  };
  return /* @__PURE__ */ jsxs("div", { children: [
    /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(Header, { adminrole: userData.user_type, adminName: userData.name, onLogout: handleLogout }) }),
    /* @__PURE__ */ jsx(Outlet, {})
  ] });
}
const SplitComponent = Stats;
export {
  SplitComponent as component
};
