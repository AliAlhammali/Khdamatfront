import router from "@/router";
import axios from "axios";
const URL = import.meta.env.VITE_BASE_API_URL;
const LANG = localStorage.getItem("locale");
const axiosClient = axios.create({
  baseURL: URL,
  headers: {
    Accept: "application/json",
    local: LANG,
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
  }
});

axiosClient.interceptors.request.use((config) => {
  const token = window.$cookies.get("admin_khadamat_token");
  if (router.currentRoute.value.path.includes("admin")) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// if 401 remove cookie and redirect to login
axiosClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      // window.$cookies.remove("token-pharmacy");
      // window.$cookies.remove("user-pharmacy");
      // router.push({ name: "Login" });
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
