import { defineStore } from "pinia";
import router from "@/router";
import authMerchantService from "@/services/merchant/auth/auth.merchant.service";

export const useAuthMerchantStore = defineStore("AuthMerchant", {
  state: () => ({
    record: null,
    isLoading: false
  }),
  getters: {},
  actions: {
    loginMerchant: async function (user) {
      this.isLoading = true;
      try {
        const { data } = await authMerchantService.login(user);
        this.record = data.user;

        // Save token to cookies
        $cookies.set("merchant_khadamat_token", data.token);
        $cookies.set("merchant_khadamat_user", data.user);

        router.push({ name: "merchant-dashboard" });
      } catch (error) {
        console.error(error);
      } finally {
        this.isLoading = false;
      }
    },

    logoutMerchant: async function () {
      try {
        await authMerchantService.logout();

        // Remove token from cookies
        $cookies.remove("merchant_khadamat_token");
        $cookies.remove("merchant_khadamat_user");

        router.push({ name: "merchant-login" });
      } catch (error) {
        console.error(error);
      }
    },

    checkCookie: function () {
      const token = $cookies.get("merchant_khadamat_token");
      const user = $cookies.get("merchant_khadamat_user");

      if (token && user) {
        this.record = user;
      } else {
        router.push({ name: "merchant-login" });
      }
    }
  }
});
