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
  if (router.currentRoute.value.path.includes("admin")) {
    const token = window.$cookies.get("admin_khadamat_token");
    config.headers.Authorization = `Bearer ${token}`;
  } else if (router.currentRoute.value.path.includes("merchant")) {
    const token = window.$cookies.get("merchant_khadamat_token");
    config.headers.Authorization = `Bearer ${token}`;
  } else if (router.currentRoute.value.path.includes("service-provider")) {
    const token = window.$cookies.get("service_provider_khadamat_token");
    config.headers.Authorization = `Bearer ${token}`;
  } else if (router.currentRoute.value.path.includes("client")) {
    const token = window.$cookies.get("client_khadamat_token");
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
      // if (router.currentRoute.value.path.includes("admin")) {
      //   window.$cookies.remove("admin_khadamat_token");
      //   window.$cookies.remove("admin_khadamat_user");
      //   router.push({ name: "admin-login" });
      // } else if (router.currentRoute.value.path.includes("merchant")) {
      //   window.$cookies.remove("merchant_khadamat_token");
      //   window.$cookies.remove("merchant_khadamat_user");
      //   router.push({ name: "merchant-login" });
      // } else if (router.currentRoute.value.path.includes("service-provider")) {
      //   window.$cookies.remove("service_provider_khadamat_token");
      //   window.$cookies.remove("service_provider_khadamat_user");
      //   router.push({ name: "service-provider-login" });
      // }
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
