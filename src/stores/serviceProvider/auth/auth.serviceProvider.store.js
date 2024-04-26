import { defineStore } from "pinia";
import router from "@/router";
import authServiceProviderService from "@/services/serviceProvider/auth/auth.serviceProvider.service";

export const useAuthServiceProviderStore = defineStore("AuthServiceProvider", {
  state: () => ({
    record: null,
    isLoading: false,
  }),
  getters: {},
  actions: {
    loginServiceProvider: async function(user) {
      this.isLoading = true;
      try {
        const { data } = await authServiceProviderService.login(user);
        this.record = data.user;
        console.log(data, "data");

        // Save token to cookies
        $cookies.set("service_provider_khadamat_token", data.token, "1m");
        $cookies.set("service_provider_khadamat_user", data.user, "1m");

        router.push({ name: "service-provider-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    logoutServiceProvider: async function() {
      try {
        await authServiceProviderService.logout();

        // Remove token from cookies
        $cookies.remove("service_provider_khadamat_token");
        $cookies.remove("service_provider_khadamat_user");

        router.push({ name: "service-provider-login" });
        window.location.reload();
      } catch (error) {
        console.error(error);
      }
    },

    checkCookie: function() {
      const token = $cookies.get("service_provider_khadamat_token");
      const user = $cookies.get("service_provider_khadamat_user");

      if (token && user) {
        this.record = user;
      } else {
        router.push({ name: "service-provider-login" });
      }
    },
  },
});
