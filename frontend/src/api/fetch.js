const getApiBase = () => {
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  if (
    typeof window !== "undefined" &&
    window.location.hostname === "localhost"
  ) {
    return "http://localhost:3000";
  }

  return "https://recruitment-management-system-0wtk.onrender.com";
};

const apiBase = getApiBase();

const buildUrl = (endpoint) => {
  if (!endpoint) return apiBase;
  if (/^https?:\/\//i.test(endpoint)) return endpoint;
  return `${apiBase}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
};

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const { body, headers: customHeaders, ...rest } = options;
    const headers = new Headers(customHeaders || {});
    const hasBody = body !== undefined && body !== null;

    if (hasBody && !(body instanceof FormData)) {
      headers.set("Content-Type", "application/json");
    }

    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    const requestBody =
      hasBody && typeof body !== "string" && !(body instanceof FormData)
        ? JSON.stringify(body)
        : body;

    const response = await fetch(buildUrl(endpoint), {
      ...rest,
      headers,
      body: hasBody ? requestBody : undefined,
    });

    if (response.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/login";
    } else if (response.status === 403) {
      window.location.href = "/unauthorized";
    }

    if (!response.ok) {
      let message = "An error occurred while fetching data.";
      try {
        const errorData = await response.json();
        message = errorData?.message || errorData?.error || message;
      } catch {
        const text = await response.text().catch(() => "");
        if (text) {
          message = text;
        }
      }
      throw new Error(message);
    }

    const contentType = response.headers.get("content-type") || "";
    if (contentType.includes("application/json")) {
      const text = await response.text();
      return text ? JSON.parse(text) : null;
    }

    return response.text();
  } catch (error) {
    const message = error.message || "An error occurred while fetching data.";
    throw new Error(message, { cause: error });
  }
};
