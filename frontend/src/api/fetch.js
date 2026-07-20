const getBaseUrl = () => {
  return (
    import.meta.env.VITE_BACKEND_URL ||
    import.meta.env.LOCAL_BACKEND_URL ||
    "http://localhost:3000"
  );
};

export const fetchApi = async (endpoint, options = {}) => {
  const url = `${getBaseUrl()}${endpoint}`;

  const headers = {
    ...options.headers,
  };

  if (options.body !== undefined) {
    headers["Content-Type"] = "application/json";
  }

  const token = localStorage.getItem("token");
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (config.body && typeof config.body === "object") {
    config.body = JSON.stringify(config.body);
  }

  const response = await fetch(url, config);
  const text = await response.text();

  let data = null;
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (error) {
      throw new Error("Invalid JSON response from server", { cause: error });
    }
  }

  if (!response.ok) {
    throw new Error(
      data?.message || response.statusText || "An error occurred",
    );
  }
  if (response.status === 401) {
    localStorage.removeItem("token"); // ইনভ্যালিড টোকেন মুছে ফেলুন
    window.location.href = "/login"; // লগইন পেজে পাঠান
    throw new Error("Session expired. Please login again.");
}

  return data;
};
