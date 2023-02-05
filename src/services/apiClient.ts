import axios from "axios";

export const API = {
  url: import.meta.env.VITE_API_URL,
  key: import.meta.env.VITE_API_KEY,
};

export const axiosClient = axios.create({
  baseURL: API.url,
  headers: { apikey: API.key, Authorization: `Bearer ${API.key}` },
});

axiosClient.interceptors.request.use(
  (config) => {
    const { user } = JSON.parse(localStorage.getItem("user") || "{}");
    
    if (user) {
      config.headers.Authorization = `Bearer ${user.accessToken}`;
    } else {
      delete axiosClient.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);
