import { defineStore } from "pinia";
import router from "@/router";
import authClientService from "@/services/client/auth/auth.client.service";

export const useAuthClientStore = defineStore("AuthClient", {
  state: () => ({
    record: null,
    isLoading: false,
  }),
  getters: {},
  actions: {
    loginClient: async function(user) {
      this.isLoading = true;
      try {
        const { data } = await authClientService.login(user);
        this.record = data.user;

        // Save token to cookies
        $cookies.set("client_khadamat_token", data.token, "1m");
        $cookies.set("client_khadamat_user", data.user, "1m");

        router.push({ name: "client-dashboard" });
        return true;
      } catch (error) {
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    registerClient: async function(user) {
      this.isLoading = true;
      try {
        await authClientService.register(user);

        router.push({ name: "client-login" });
        return true;
      } catch (error) {
        return false;
      } finally {
        this.isLoading = false;
      }
    },

    logoutClient: async function() {
      try {
        await authClientService.logout();

        // Remove token from cookies
        $cookies.remove("client_khadamat_token");
        $cookies.remove("client_khadamat_user");
        this.record = null;

        router.push({ name: "client-login" });
        window.location.reload();
      } catch (error) {
        return error;
      }
    },

    checkCookie: function() {
      const token = $cookies.get("client_khadamat_token");
      const user = $cookies.get("client_khadamat_user");

      if (token && user) {
        this.record = user;
      } else {
        router.push({ name: "client-login" });
      }
    },
  },
});
