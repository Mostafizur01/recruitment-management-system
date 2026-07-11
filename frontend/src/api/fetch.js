const fetchOptions = {
  origin:
    import.meta.env.VITE_BACKEND_URL ||
    "https://recruitment-management-system-backend-5zc4.onrender.com",
  method: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  Credentials: true,
};

export const fetchApi = async (url, options = {}) => {
  const fetchUrl = `${fetchOptions.origin}${url}`;
  const fetchOptionsWithHeaders = {
    ...fetchOptions,
    ...options,
    Headers: {
      "Content-Type": "application/json",
      ...options.Headers,
    },
  };
  const response = await fetch(fetchUrl, fetchOptionsWithHeaders);

  if (!response.ok) {
    throw new Error(`HTTP error! statuse: ${response.status}`);
  }
  return response.json();
};
