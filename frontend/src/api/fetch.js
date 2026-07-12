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
    "Content-Type": "application/json",
    ...options.headers,
  };

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

  let data;
  try {
    data = await response.json();
  } catch (error) {
    data = null;
    alert("Failed to parse response JSON:", error);
  }

  if (!response.ok) {
    throw new Error(data?.message || "An error occurred");
  }

  return data;
};
