import Cookies from "js-cookie";
import { jsx } from "react/jsx-runtime";
import { Slot } from "@radix-ui/react-slot";
import { cva } from "class-variance-authority";
import { c as cn } from "./utils-H80jjgLf.js";
const arrayToUrlString = (key, value) => {
  let arrayUrl;
  arrayUrl = value.map((item) => {
    return `${key}=${item}`;
  });
  return arrayUrl.join("&");
};
const prepareURLEncodedParams = (url, params) => {
  let paramsArray = Object.keys(params).map((key) => {
    const value = params[key];
    if (value && value.length) {
      if (Array.isArray(value)) {
        return arrayToUrlString(key, value);
      }
      return `${key}=${params[key]}`;
    } else if (value) {
      return `${key}=${params[key]}`;
    } else {
      return "";
    }
  }).filter((e) => e.length);
  let paramsURLs = paramsArray.filter((e) => e).join("&");
  if (paramsURLs) {
    return url + "?" + paramsURLs;
  }
  return url;
};
class FetchService {
  authStatusCodes = [401, 403, 404, 422];
  authErrorURLs = [
    "/auth/login"
  ];
  _fetchType;
  constructor(fetchTypeValue = "json") {
    this._fetchType = fetchTypeValue;
  }
  configureAuthorization(config) {
    let accessToken = Cookies.get("token") || "";
    config.headers["Authorization"] = "Bearer " + accessToken;
  }
  setHeader(config) {
    config.headers = {};
  }
  setDefaultHeaders(config) {
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"] && !(config.body instanceof FormData)) {
      config.headers["Content-Type"] = "application/json";
    }
  }
  checkToLogOutOrNot(path) {
    return this.authErrorURLs.some(
      (arrayUrl) => path.includes(arrayUrl)
    );
  }
  isAuthRequest(path) {
    return this.authErrorURLs.includes(path);
  }
  async refreshAccessToken() {
    const refreshToken = Cookies.get("refreshToken");
    if (!refreshToken) {
      window.location.href = "/";
      return null;
    }
    try {
      const response = await fetch(
        "https://dev-api-ats.up.railway.app/v1.0/auth/refresh",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken })
        }
      );
      if (!response.ok) {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        window.location.href = "/";
        return null;
      }
      const data = await response.json();
      Cookies.set("token", data.access_token);
      return data.access_token;
    } catch (error) {
      window.location.href = "/";
      return null;
    }
  }
  async hit(...args) {
    let [path, config] = args;
    config.headers = config.headers || {};
    if (!config.headers["Content-Type"]) {
      this.setDefaultHeaders(config);
    }
    if (!this.isAuthRequest(path)) {
      this.configureAuthorization(config);
    }
    let url = "https://dev-api-ats.up.railway.app/v1.0" + path;
    let response = await fetch(url, config);
    if (!response.ok) {
      if (response.status === 401 && !this.checkToLogOutOrNot(path)) {
        const newToken = await this.refreshAccessToken();
        if (newToken) {
          config.headers["Authorization"] = "Bearer " + newToken;
          response = await fetch(url, config);
        }
      }
      if (this.authStatusCodes.includes(response.status) && !this.checkToLogOutOrNot(path)) {
        const contentType2 = response.headers.get("Content-Type") || "";
        let errorData2;
        try {
          errorData2 = contentType2.includes("text/html") ? await response.text() : await response.json();
        } catch {
          errorData2 = { message: response.statusText };
        }
        console.log(errorData2);
        throw {
          success: false,
          status: response.status,
          data: errorData2,
          message: response.statusText
        };
      }
      const contentType = response.headers.get("Content-Type") || "";
      let errorData;
      try {
        errorData = contentType.includes("text/html") ? await response.text() : await response.json();
      } catch {
        errorData = { message: response.statusText };
      }
      let err = new Error(errorData.message || response.statusText);
      err.data = errorData;
      err.status = response.status;
      throw err;
    }
    if (this._fetchType === "response") {
      return response;
    } else {
      const contentType = response.headers.get("Content-Type") || "";
      if (contentType.includes("text/html")) {
        return {
          success: true,
          status: response.status,
          data: await response.text()
        };
      }
      return {
        success: true,
        status: response.status,
        data: await response.json()
      };
    }
  }
  async post(url, payload) {
    return await this.hit(url, {
      method: "POST",
      body: payload ? JSON.stringify(payload) : void 0
    });
  }
  async postFormData(url, file) {
    return await this.hit(url, {
      method: "POST",
      body: file
    });
  }
  async get(url, queryParams = {}, contentType) {
    if (Object.keys(queryParams).length) {
      url = prepareURLEncodedParams(url, queryParams);
    }
    const config = {
      method: "GET"
    };
    this.setDefaultHeaders(config);
    if (contentType) {
      config.headers["Content-Type"] = contentType;
      config.headers["Accept"] = contentType;
    }
    return this.hit(url, config);
  }
  async delete(url, payload = {}) {
    return this.hit(url, {
      method: "DELETE",
      body: JSON.stringify(payload)
    });
  }
  async deleteWithOutPayload(url) {
    return this.hit(url, {
      method: "DELETE"
    });
  }
  async put(url, payload = {}) {
    return this.hit(url, {
      method: "PUT",
      body: JSON.stringify(payload)
    });
  }
  async patch(url, payload = {}) {
    return this.hit(url, {
      method: "PATCH",
      body: JSON.stringify(payload)
    });
  }
}
const $fetch = new FetchService();
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-xs hover:bg-primary/90",
        destructive: "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary: "bg-secondary text-secondary-foreground shadow-xs hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button";
  return /* @__PURE__ */ jsx(
    Comp,
    {
      "data-slot": "button",
      className: cn(buttonVariants({ variant, size, className })),
      ...props
    }
  );
}
export {
  $fetch as $,
  Button as B,
  buttonVariants as b
};
