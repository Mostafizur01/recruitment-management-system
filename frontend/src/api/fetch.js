import apiClient from "./axiosClient.js";

export const fetchApi = async (endpoint, options = {}) => {
  try {
    const config = {
      url: endpoint,
      ...options,
    };

    if (config.body) {
      config.data = config.body;
      delete config.body;
    }

    const response = await apiClient(config);
    return response.data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      error.response?.statusText ||
      error.message ||
      "An error occurred while fetching data.";
    throw new Error(message, { cause: error });
  }
};
